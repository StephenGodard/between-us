// Run with Playwright installed (or NODE_PATH pointing to a runtime containing it).
// Synthetic microphone input verifies WebRTC transport/cleanup, not audible phone acceptance.
const { chromium } = require('playwright');
const assert = require('node:assert/strict');
const base = process.env.DEMO_URL || 'https://localhost:8443';
const marker = `Fiction-${Date.now()}`;
(async () => {
  const browser = await chromium.launch({ channel: process.env.PLAYWRIGHT_CHANNEL || 'chrome', headless: true, args: ['--use-fake-device-for-media-stream', '--use-fake-ui-for-media-stream'] });
  const failures = [];
  const contexts = [];
  async function page() {
    const context = await browser.newContext({ ignoreHTTPSErrors: true, permissions: ['microphone'], viewport: { width: 390, height: 844 } });
    contexts.push(context);
    await context.addInitScript(() => {
      window.demoTracks = [];
      window.demoPeers = [];
      const original = navigator.mediaDevices.getUserMedia.bind(navigator.mediaDevices);
      navigator.mediaDevices.getUserMedia = async (...args) => {
        const stream = await original(...args);
        window.demoTracks.push(...stream.getTracks());
        return stream;
      };
      const Peer = window.RTCPeerConnection;
      window.RTCPeerConnection = class extends Peer {
        constructor(...args) { super(...args); window.demoPeers.push(this); }
      };
    });
    const p = await context.newPage();
    p.setDefaultTimeout(15000);
    p.on('pageerror', error => failures.push(error.message));
    await p.goto(base);
    await p.getByText('Prêt pour un échange', { exact: true }).waitFor();
    return p;
  }
  async function send(p, text) {
    await p.getByLabel('Votre message', { exact: true }).fill(text);
    await p.getByRole('button', { name: 'Envoyer' }).click();
    await p.getByText(text, { exact: true }).waitFor();
  }
  async function cleared(p) {
    await p.waitForFunction(() => window.demoTracks.every(t => t.readyState === 'ended') && window.demoPeers.every(p => p.connectionState === 'closed'));
  }
  try {
    const a = await page(), b = await page(), c = await page();
    await a.getByLabel('Votre sujet', { exact: true }).fill(marker);
    await a.getByRole('button', { name: 'Ouvrir mon sujet' }).click();
    await b.getByRole('button', { name: 'Je suis disponible pour écouter' }).click();
    await b.getByRole('button', { name: `Rejoindre : ${marker}`, exact: true }).click();
    await a.getByText('Vous êtes deux pour échanger', { exact: true }).waitFor();
    for (let i = 0; i < 2; i++) {
      await send(a, `${marker} A${i}`);
      await b.getByText(`${marker} A${i}`, { exact: true }).waitFor();
      await send(b, `${marker} B${i}`);
      await a.getByText(`${marker} B${i}`, { exact: true }).waitFor();
    }
    assert.equal(await a.evaluate(() => window.demoTracks.length), 0, 'text-only path must not request microphone');
    // Audio actions are exercised below once the actual UI is available.
    if (process.env.SKIP_AUDIO !== '1') {
      await a.getByRole('button', { name: 'Proposer un appel', exact: true }).click();
      await b.getByRole('button', { name: 'Décliner', exact: true }).click();
      await a.getByText('Invitation déclinée. La conversation écrite continue.', { exact: true }).waitFor();
      await cleared(a); await cleared(b);
      await b.getByRole('button', { name: 'Proposer un appel', exact: true }).click();
      await a.getByRole('button', { name: 'Accepter', exact: true }).click();
      await a.getByText('Appel en cours', { exact: true }).first().waitFor();
      await b.getByText('Appel en cours', { exact: true }).first().waitFor();
      await a.getByRole('button', { name: 'Raccrocher', exact: true }).click();
      await cleared(a); await cleared(b);
      await send(b, `${marker} Après appel`);
      await a.getByText(`${marker} Après appel`, { exact: true }).waitFor();
    }
    if (process.env.SKIP_AUDIO !== '1') {
      // Deliberate permission rejection, then restore the instrumented browser API.
      await a.evaluate(() => {
        window.demoGetUserMedia = navigator.mediaDevices.getUserMedia;
        navigator.mediaDevices.getUserMedia = () => Promise.reject(new DOMException('Denied', 'NotAllowedError'));
      });
      await a.getByRole('button', { name: 'Proposer un appel', exact: true }).click();
      await a.getByText('Le microphone n’est pas accessible. L’appel est arrêté, vous pouvez continuer par écrit.', { exact: true }).waitFor();
      await b.getByText('L’appel n’a pas pu aboutir. Vous pouvez continuer par écrit.', { exact: true }).waitFor();
      await cleared(a); await cleared(b);
      await a.evaluate(() => { navigator.mediaDevices.getUserMedia = window.demoGetUserMedia; });
      await a.getByRole('button', { name: 'Proposer un appel', exact: true }).click();
      await b.getByRole('button', { name: 'Accepter', exact: true }).click();
      await a.getByRole('button', { name: 'Raccrocher', exact: true }).waitFor();
      await b.getByRole('button', { name: 'Raccrocher', exact: true }).waitFor();
    }
    await b.getByRole('button', { name: 'Quitter l’échange', exact: true }).click();
    await cleared(a); await cleared(b);
    await a.getByText('En attente d’une personne', { exact: true }).waitFor();
    assert.equal(await a.getByText(`${marker} A0`, { exact: true }).count(), 0);
    await c.getByRole('button', { name: 'Je suis disponible pour écouter' }).click();
    await c.getByRole('button', { name: `Rejoindre : ${marker}`, exact: true }).click();
    await c.getByText('Un premier mot suffit.', { exact: true }).waitFor();
    await send(c, `${marker} Nouvel échange`);
    await a.getByText(`${marker} Nouvel échange`, { exact: true }).waitFor();
    if (process.env.SKIP_AUDIO !== '1') {
      await c.getByRole('button', { name: 'Proposer un appel', exact: true }).click();
      await a.getByRole('button', { name: 'Accepter', exact: true }).click();
      await a.getByRole('button', { name: 'Raccrocher', exact: true }).waitFor();
      await c.getByRole('button', { name: 'Raccrocher', exact: true }).waitFor();
    }
    await a.getByRole('button', { name: 'Terminer l’échange', exact: true }).click();
    await cleared(a); await cleared(c);
    for (const p of [a, c]) {
      await p.getByText('Cet échange est terminé. Les messages ne sont plus affichés.', { exact: true }).waitFor();
      assert.equal(await p.getByText(`${marker} Nouvel échange`, { exact: true }).count(), 0);
      assert.deepEqual(await p.evaluate(() => ({ local: localStorage.length, session: sessionStorage.length })), { local: 0, session: 0 });
    }
    await a.getByLabel('Votre sujet', { exact: true }).fill(`${marker} annulation`);
    await a.getByRole('button', { name: 'Ouvrir mon sujet' }).click();
    await a.getByRole('button', { name: 'Annuler mon sujet', exact: true }).click();
    await a.getByText('Cet échange est terminé. Les messages ne sont plus affichés.', { exact: true }).waitFor();
    assert.deepEqual(failures, []);
    console.log('PASS: three independent contexts; reciprocal chat, no text-only microphone, audio decline/connect/hangup (unless skipped), leave/fresh join, close/cancel, empty browser storage, no page errors.');
    console.log(`Log inspection marker: ${marker}`);
  } catch (error) {
    console.error('Page errors:', failures);
    for (const [i, context] of contexts.entries()) {
      const p = context.pages()[0];
      if (p) console.error(`Page ${i}:`, await p.locator('body').innerText());
    }
    throw error;
  } finally { await browser.close(); }
})().catch(error => { console.error(error); process.exitCode = 1; });

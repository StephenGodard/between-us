(() => {
  'use strict';

  const $ = (id) => document.getElementById(id);
  const scenarios = {
    separation: [
      { role: 'speaker', text: 'Since our separation, I come home and no longer know who to tell about my day.' },
      { role: 'listener', text: 'I’m here. Take your time. What feels hardest right now?' },
      { role: 'speaker', text: 'The silence, mostly. It feels like no one really understands.' },
      { role: 'listener', text: 'I remember that silence after a separation. Talking without looking for an immediate solution helped me. Would you like me just to listen?' },
      { role: 'speaker', text: 'Yes. I mostly needed to say it to someone.' },
    ],
    deuil: [
      { role: 'speaker', text: 'Since my father died, everyone asks if I’m okay. I say yes, but I’m not.' },
      { role: 'listener', text: 'Thank you for telling me. You do not have to pretend here.' },
      { role: 'speaker', text: 'I do not even know where to begin.' },
      { role: 'listener', text: 'When I went through grief, words came slowly for me too. We can stay with what you feel now without trying to fix it.' },
      { role: 'speaker', text: 'It helps not to feel I have to be better right away.' },
    ],
  };

  const params = new URLSearchParams(window.location.search);
  const room = params.get('room');
  const role = params.get('role');
  const validRoom = /^[a-z0-9-]{8,64}$/.test(room || '');
  const validRole = role === 'speaker' || role === 'listener';

  $('create-session').addEventListener('click', () => {
    const bytes = new Uint8Array(8);
    crypto.getRandomValues(bytes);
    const roomId = Array.from(bytes, (byte) => byte.toString(16).padStart(2, '0')).join('');
    window.location.assign(`/?room=${roomId}&role=speaker`);
  });

  if (!validRoom || !validRole || !('BroadcastChannel' in window)) {
    if (validRoom && validRole) $('welcome').querySelector('.welcome-footnote').textContent = 'This browser does not support the local communication between tabs required for the demo.';
    return;
  }

  $('welcome').classList.add('hidden');
  $('session').classList.remove('hidden');

  const peerRole = role === 'speaker' ? 'listener' : 'speaker';
  const peerUrl = new URL(window.location.href);
  peerUrl.searchParams.set('role', peerRole);
  $('invite-link').textContent = peerUrl.href;
  $('open-peer').href = peerUrl.href;
  $('copy-link').addEventListener('click', async () => {
    try {
      await navigator.clipboard.writeText(peerUrl.href);
      notice('Link copied. Paste it into a second tab of the same browser.');
    } catch {
      notice('Select and copy the link shown above.');
    }
  });
  $('role-name').textContent = role === 'speaker' ? 'I need to talk' : 'I can listen';
  $('role-icon').textContent = role === 'speaker' ? '◎' : '✳';
  $('partner-name').textContent = role === 'speaker' ? 'Someone available to listen' : 'Someone who wants to talk';
  $('partner-avatar').textContent = role === 'speaker' ? '✳' : '◌';

  const tabId = Math.random().toString(36).slice(2);
  const channel = new BroadcastChannel(`entre-nous-demo-${room}`);
  const remoteAudio = $('remote-audio');
  let peerReady = false;
  let ended = false;
  let messages = [];
  let callState = 'idle';
  let peerConnection = null;
  let localStream = null;
  let incomingOffer = null;
  let pendingIce = [];

  function broadcast(type, data = {}) {
    if (!ended || type === 'end') channel.postMessage({ type, ...data, from: tabId, role });
  }

  function notice(text) {
    let toast = document.querySelector('.toast');
    if (!toast) {
      toast = document.createElement('div');
      toast.className = 'toast';
      toast.setAttribute('role', 'status');
      document.body.appendChild(toast);
    }
    toast.textContent = text;
    toast.classList.add('visible');
    clearTimeout(notice.timer);
    notice.timer = setTimeout(() => toast.classList.remove('visible'), 4500);
  }

  function updateControls() {
    const available = peerReady && !ended;
    $('peer-status').textContent = ended ? 'Session ended' : peerReady ? 'Both people present' : 'Waiting for the other tab';
    document.querySelector('.session-pill').classList.toggle('connected', available);
    $('message-input').disabled = !available;
    $('send-button').disabled = !available;
    $('call-button').disabled = !available || callState !== 'idle';
    document.querySelectorAll('.scenario-button').forEach((button) => { button.disabled = !available; });
  }

  function addMessage(message) {
    if (ended || !message || typeof message.text !== 'string' || !['speaker', 'listener'].includes(message.role)) return;
    const cleanText = message.text.trim().slice(0, 500);
    if (!cleanText) return;
    messages.push({ role: message.role, text: cleanText });
    $('empty-state').classList.add('hidden');
    const row = document.createElement('div');
    row.className = `message-row ${message.role === role ? 'mine' : 'theirs'}`;
    const avatar = document.createElement('span');
    avatar.className = 'bubble-avatar';
    avatar.textContent = message.role === 'speaker' ? '◎' : '✳';
    const bubble = document.createElement('div');
    bubble.className = 'bubble';
    bubble.textContent = cleanText;
    row.append(avatar, bubble);
    $('message-area').append(row);
    $('message-area').scrollTop = $('message-area').scrollHeight;
  }

  function loadScenario(name, fromPeer = false) {
    if (ended || !scenarios[name]) return;
    messages = [];
    $('message-area').replaceChildren($('empty-state'));
    $('empty-state').classList.remove('hidden');
    scenarios[name].forEach(addMessage);
    $('topic-chip').textContent = name === 'deuil' ? 'Grief' : 'Separation';
    if (!fromPeer) broadcast('scenario', { name });
  }

  function renderCall() {
    const showing = callState !== 'idle' && !ended;
    $('call-banner').classList.toggle('hidden', !showing);
    $('accept-call').classList.toggle('hidden', callState !== 'incoming');
    $('call-title').textContent = callState === 'incoming' ? 'Incoming call' : callState === 'connected' ? 'You are on a call' : 'Audio call';
    $('call-detail').textContent = callState === 'incoming' ? 'Someone wants to talk with you.' : callState === 'connected' ? 'The conversation is ongoing.' : callState === 'preparing' ? 'Allow microphone access in your browser…' : 'Waiting for an answer…';
    $('end-call').textContent = callState === 'incoming' ? 'Decline' : 'End call';
    updateControls();
  }

  function createPeerConnection() {
    const connection = new RTCPeerConnection({ iceServers: [] });
    connection.onicecandidate = (event) => {
      if (event.candidate) broadcast('ice', { candidate: event.candidate.toJSON() });
    };
    connection.ontrack = (event) => {
      remoteAudio.srcObject = event.streams[0] || new MediaStream([event.track]);
      remoteAudio.play().catch(() => notice('Click the page to allow audio playback.'));
    };
    connection.onconnectionstatechange = () => {
      if (ended) return;
      if (connection.connectionState === 'connected') {
        callState = 'connected';
        renderCall();
      } else if (connection.connectionState === 'failed') {
        notice('The audio connection failed. You can end this session and create another.');
      }
    };
    peerConnection = connection;
    return connection;
  }

  async function useMicrophone(connection) {
    if (!navigator.mediaDevices?.getUserMedia) throw new Error('Microphone unavailable in this browser.');
    localStream = await navigator.mediaDevices.getUserMedia({ audio: true, video: false });
    if (ended) {
      localStream.getTracks().forEach((track) => track.stop());
      localStream = null;
      throw new Error('This session has already ended.');
    }
    localStream.getTracks().forEach((track) => connection.addTrack(track, localStream));
  }

  async function flushIce() {
    if (!peerConnection?.remoteDescription) return;
    const candidates = pendingIce;
    pendingIce = [];
    for (const candidate of candidates) {
      try { await peerConnection.addIceCandidate(candidate); } catch { /* Ignore stale local candidates. */ }
    }
  }

  function stopMedia() {
    if (peerConnection) {
      peerConnection.onicecandidate = null;
      peerConnection.ontrack = null;
      peerConnection.onconnectionstatechange = null;
      peerConnection.close();
      peerConnection = null;
    }
    if (localStream) {
      localStream.getTracks().forEach((track) => track.stop());
      localStream = null;
    }
    remoteAudio.pause();
    remoteAudio.srcObject = null;
    pendingIce = [];
    incomingOffer = null;
    callState = 'idle';
  }

  function endSession(fromPeer = false) {
    if (ended) return;
    if (!fromPeer) broadcast('end');
    ended = true;
    stopMedia();
    messages = [];
    $('message-area').replaceChildren();
    $('message-input').value = '';
    $('invite-link').textContent = '';
    $('open-peer').removeAttribute('href');
    $('open-peer').classList.add('hidden');
    $('copy-link').classList.add('hidden');
    $('call-banner').classList.add('hidden');
    $('ended-overlay').classList.remove('hidden');
    updateControls();
    channel.close();
  }

  async function startCall() {
    if (ended || !peerReady || callState !== 'idle') return;
    try {
      callState = 'preparing';
      renderCall();
      const connection = createPeerConnection();
      await useMicrophone(connection);
      const offer = await connection.createOffer();
      await connection.setLocalDescription(offer);
      callState = 'calling';
      renderCall();
      broadcast('offer', { description: connection.localDescription.toJSON() });
    } catch (error) {
      stopMedia();
      renderCall();
      notice(error.name === 'NotAllowedError' ? 'Allow microphone access to start the call.' : `Could not start the call: ${error.message}`);
    }
  }

  async function answerCall() {
    if (ended || callState !== 'incoming' || !incomingOffer) return;
    try {
      callState = 'preparing';
      renderCall();
      const connection = createPeerConnection();
      await useMicrophone(connection);
      await connection.setRemoteDescription(incomingOffer);
      await flushIce();
      const answer = await connection.createAnswer();
      await connection.setLocalDescription(answer);
      callState = 'connecting';
      renderCall();
      broadcast('answer', { description: connection.localDescription.toJSON() });
      incomingOffer = null;
    } catch (error) {
      stopMedia();
      renderCall();
      notice(error.name === 'NotAllowedError' ? 'Allow microphone access to answer.' : `Could not answer: ${error.message}`);
      broadcast('decline');
    }
  }

  channel.onmessage = async ({ data }) => {
    if (ended || !data || data.from === tabId || data.role !== peerRole) return;
    try {
      switch (data.type) {
        case 'hello':
          peerReady = true;
          updateControls();
          broadcast('ready');
          break;
        case 'ready':
          peerReady = true;
          updateControls();
          break;
        case 'leave':
          peerReady = false;
          updateControls();
          break;
        case 'chat':
          addMessage({ role: peerRole, text: data.text });
          break;
        case 'scenario':
          loadScenario(data.name, true);
          break;
        case 'offer':
          if (callState !== 'idle') break;
          incomingOffer = data.description;
          callState = 'incoming';
          renderCall();
          break;
        case 'answer':
          if (!peerConnection || callState !== 'calling') break;
          await peerConnection.setRemoteDescription(data.description);
          await flushIce();
          callState = 'connecting';
          renderCall();
          break;
        case 'ice':
          if (!data.candidate) break;
          if (peerConnection?.remoteDescription) await peerConnection.addIceCandidate(data.candidate);
          else pendingIce.push(data.candidate);
          break;
        case 'decline':
          stopMedia();
          renderCall();
          notice('The call was declined. The text conversation remains open.');
          break;
        case 'end':
          endSession(true);
          break;
        default:
          break;
      }
    } catch (error) {
      notice(`A call step failed: ${error.message}`);
    }
  };

  $('composer').addEventListener('submit', (event) => {
    event.preventDefault();
    if (!peerReady || ended) return;
    const text = $('message-input').value.trim();
    if (!text) return;
    addMessage({ role, text });
    broadcast('chat', { text: text.slice(0, 500) });
    $('message-input').value = '';
    $('message-input').focus();
  });
  document.querySelectorAll('.scenario-button').forEach((button) => button.addEventListener('click', () => loadScenario(button.dataset.scenario)));
  $('call-button').addEventListener('click', startCall);
  $('accept-call').addEventListener('click', answerCall);
  $('end-call').addEventListener('click', () => {
    if (callState === 'incoming') {
      broadcast('decline');
      stopMedia();
      renderCall();
    } else endSession();
  });
  $('close-session').addEventListener('click', () => endSession());
  $('new-session').addEventListener('click', () => window.location.assign('/'));
  window.addEventListener('beforeunload', () => {
    if (!ended) broadcast('leave');
    stopMedia();
    channel.close();
  });

  updateControls();
  broadcast('hello');
})();

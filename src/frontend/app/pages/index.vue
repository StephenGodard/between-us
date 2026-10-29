<script setup lang="ts">
const {
  audio,
  subjects,
  member,
  messages,
  connected,
  connecting,
  peerAvailable,
  busy,
  error,
  notice,
  open,
  join,
  send,
  end,
} = useConversation();
const {
  call,
  status: audioStatus,
  live,
  playbackBlocked,
  pending: audioPending,
} = audio;
const intention = ref<"talk" | "listen">("talk");
const subject = ref("");
const canAct = computed(() => connected.value && !busy.value);
async function create() {
  if (subject.value.trim()) {
    await open(subject.value);
    if (member.value) subject.value = "";
  }
}
async function sendMessage(text: string, done: (sent: boolean) => void) {
  done(await send(text));
}
</script>

<template>
  <div class="app-shell">
    <header class="site-header">
      <div class="wordmark">
        <span class="brand-mark" aria-hidden="true"><i /><i /></span>between
        us<span class="brand-dot">.</span>
      </div>
      <span class="demo-label">Démo fictive</span>
    </header>
    <main id="main-content">
      <div v-if="error" class="feedback error" role="alert">{{ error }}</div>
      <div v-if="notice" class="feedback" role="status">{{ notice }}</div>
      <template v-if="!member">
        <section class="intro">
          <span class="eyebrow">Un sujet. Deux personnes. Un moment.</span>
          <h1>Un peu de place<br />pour <em>se parler.</em></h1>
          <p>
            Parfois, on a besoin de parler. Parfois, on peut écouter.<br
              class="desktop-break"
            />
            Ici, on prend le temps d’échanger, simplement.
          </p>
        </section>
        <section class="entry-card" aria-label="Commencer un échange">
          <div class="intentions" role="group" aria-label="Votre intention">
            <button
              :class="{ selected: intention === 'talk' }"
              :aria-pressed="intention === 'talk'"
              @click="intention = 'talk'"
            >
              <span aria-hidden="true">↗</span> J’ai besoin de parler
            </button>
            <button
              :class="{ selected: intention === 'listen' }"
              :aria-pressed="intention === 'listen'"
              @click="intention = 'listen'"
            >
              <span aria-hidden="true">♡</span> Je suis disponible pour écouter
            </button>
          </div>
          <form
            v-if="intention === 'talk'"
            class="entry-body"
            @submit.prevent="create"
          >
            <span class="step-label">Ouvrir une conversation</span>
            <h2>De quoi aimeriez-vous parler ?</h2>
            <p>
              Quelques mots pour que l’autre personne sache ce qui vous amène.
            </p>
            <label for="subject">Votre sujet</label>
            <input
              id="subject"
              v-model="subject"
              maxlength="120"
              placeholder="Ce que vous avez envie de partager"
              :disabled="!canAct"
              required
              autocomplete="off"
            />
            <div class="field-help">
              <span>Un sujet de votre choix, pour cette démo fictive.</span
              ><span>{{ subject.length }} / 120</span>
            </div>
            <button
              class="primary-action"
              :disabled="!canAct || !subject.trim()"
            >
              Ouvrir mon sujet <span aria-hidden="true">↗</span>
            </button>
          </form>
          <div v-else class="entry-body">
            <span class="step-label">Rejoindre une conversation</span>
            <h2>Un sujet vous parle ?</h2>
            <p>
              Choisissez la conversation à laquelle vous souhaitez prendre part.
            </p>
            <div v-if="!subjects.length" class="empty-subjects">
              <span aria-hidden="true">☀</span>
              <h3>Aucun sujet pour le moment</h3>
              <p>
                Les nouveaux sujets apparaîtront ici.<br />Vous pouvez aussi en
                proposer un.
              </p>
            </div>
            <ul v-else class="subjects">
              <li v-for="item in subjects" :key="item.id">
                <div>
                  <span class="available">Une personne attend</span>
                  <h3>{{ item.subject }}</h3>
                </div>
                <button
                  :disabled="!canAct"
                  :aria-label="`Rejoindre : ${item.subject}`"
                  @click="join(item.id)"
                >
                  Rejoindre <span aria-hidden="true">↗</span>
                </button>
              </li>
            </ul>
          </div>
        </section>
        <p class="connection-status" role="status">
          <span :class="{ online: connected }" />{{
            connecting
              ? "Connexion en cours…"
              : connected
                ? "Prêt pour un échange"
                : "Service indisponible"
          }}
        </p>
        <p class="shared-thought">
          On est tous aidants<span aria-hidden="true"> ✳</span>
        </p>
      </template>
      <section v-else class="session-card">
        <header class="session-header">
          <div>
            <span class="step-label">{{
              member.state === "waiting"
                ? "Votre sujet est ouvert"
                : "Votre conversation"
            }}</span>
            <h1>{{ member.subject }}</h1>
            <span class="session-status"
              ><i
                :class="{
                  online:
                    connected && (member.state === 'waiting' || peerAvailable),
                }"
              />{{
                !connected || !peerAvailable
                  ? "Connexion interrompue"
                  : member.state === "waiting"
                    ? "En attente d’une personne"
                    : "Vous êtes deux pour échanger"
              }}</span
            >
          </div>
          <button class="quiet-button" :disabled="!canAct" @click="end">
            {{
              member.role === "joiner"
                ? "Quitter l’échange"
                : member.state === "waiting"
                  ? "Annuler mon sujet"
                  : "Terminer l’échange"
            }}
          </button>
        </header>
        <div v-if="member.state === 'waiting'" class="waiting">
          <div class="waiting-art" aria-hidden="true">
            <span>“</span><span>”</span>
          </div>
          <h2>Votre sujet a sa place ici.</h2>
          <p>
            Il est visible par les autres participants de la démo.<br />La
            conversation commencera quand quelqu’un vous rejoindra.
          </p>
          <span class="waiting-note"
            >Vous pouvez garder cette page ouverte.</span
          >
        </div>
        <div v-if="member.state === 'active'" class="audio-bar">
          <div>
            <strong>{{
              live
                ? "Vous êtes en appel"
                : call
                  ? "Un moment de vive voix"
                  : "Envie de se parler de vive voix ?"
            }}</strong>
            <p v-if="audioStatus" role="status">{{ audioStatus }}</p>
          </div>
          <div class="audio-actions">
            <template
              v-if="
                call?.state === 'ringing' && call.initiatorRole !== member.role
              "
            >
              <button
                :disabled="!canAct || audioPending"
                @click="audio.respond(true)"
              >
                Accepter
              </button>
              <button
                class="quiet-button"
                :disabled="!canAct || audioPending"
                @click="audio.respond(false)"
              >
                Décliner
              </button>
            </template>
            <button
              v-else-if="call"
              class="quiet-button"
              @click="audio.finish('hangup')"
            >
              {{ live ? "Raccrocher" : "Annuler l’appel" }}
            </button>
            <button
              v-else
              :disabled="!canAct || !peerAvailable || audioPending"
              @click="audio.request()"
            >
              Proposer un appel
            </button>
            <button v-if="playbackBlocked" @click="audio.playAudio()">
              Activer le son
            </button>
          </div>
        </div>
        <ConversationPanel
          v-if="member.state === 'active'"
          :member="member"
          :messages="messages"
          :disabled="!connected || !peerAvailable"
          :busy="busy"
          @send="sendMessage"
        />
      </section>
    </main>
    <footer class="site-footer">
      <span>Démonstration locale · Échanges fictifs uniquement</span
      ><span>Un moment partagé, sans historique enregistré.</span>
    </footer>
  </div>
</template>

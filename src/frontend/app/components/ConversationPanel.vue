<script setup lang="ts">
import type { Membership, ChatMessage } from "~/lib/session-client";
const props = defineProps<{
  member: Membership;
  messages: ChatMessage[];
  disabled: boolean;
  busy: boolean;
}>();
const emit = defineEmits<{
  send: [text: string, done: (sent: boolean) => void];
}>();
const draft = ref("");
const bottom = ref<HTMLElement | null>(null);
watch(
  () => props.messages.length,
  async () => {
    await nextTick();
    bottom.value?.scrollIntoView({ block: "nearest", behavior: "smooth" });
  },
);
watch(
  () => props.member.exchangeId,
  () => {
    draft.value = "";
  },
);
function send() {
  if (!draft.value.trim() || props.disabled || props.busy) return;
  emit("send", draft.value, (sent) => {
    if (sent) draft.value = "";
  });
}
</script>

<template>
  <section class="conversation" aria-label="Conversation">
    <div
      class="messages"
      role="log"
      aria-live="polite"
      aria-label="Messages échangés"
    >
      <div v-if="!messages.length" class="conversation-empty">
        <span class="conversation-symbol" aria-hidden="true">“</span>
        <h2>Un premier mot suffit.</h2>
        <p>
          Vous êtes deux, et chacun peut écrire.<br />La conversation commence
          avec vous.
        </p>
      </div>
      <article
        v-for="message in messages"
        :key="message.id"
        class="message"
        :class="{ mine: message.role === member.role }"
      >
        <span class="message-author">{{
          message.role === member.role ? "Vous" : "L’autre personne"
        }}</span>
        <p>{{ message.text }}</p>
      </article>
      <div ref="bottom" />
    </div>
    <form class="composer" @submit.prevent="send">
      <label class="sr-only" for="message">Votre message</label>
      <textarea
        id="message"
        v-model="draft"
        :disabled="disabled || busy"
        maxlength="2000"
        rows="2"
        placeholder="Écrivez quelques mots…"
        @keydown.ctrl.enter.prevent="send"
        @keydown.meta.enter.prevent="send"
      />
      <div class="composer-actions">
        <span>{{ draft.length }} / 2 000</span
        ><button type="submit" :disabled="disabled || busy || !draft.trim()">
          Envoyer <span aria-hidden="true">↗</span>
        </button>
      </div>
    </form>
  </section>
</template>

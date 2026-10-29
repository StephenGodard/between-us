<script setup lang="ts">
const secure = ref(false);
const status = ref("Aucun accès au microphone demandé.");
const checking = ref(false);
let disposed = false;
onMounted(() => {
  secure.value = window.isSecureContext;
});
onBeforeUnmount(() => {
  disposed = true;
});
async function checkMicrophone() {
  checking.value = true;
  try {
    if (!window.isSecureContext || !navigator.mediaDevices)
      throw new Error("insecure");
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    stream.getTracks().forEach((track) => track.stop());
    if (!disposed)
      status.value =
        "Microphone accessible. Toutes les pistes ont été immédiatement arrêtées. Aucun appel n’a été lancé.";
  } catch {
    if (!disposed)
      status.value =
        "Microphone non accessible. Vérifiez HTTPS, la confiance du certificat et l’autorisation du navigateur.";
  } finally {
    if (!disposed) checking.value = false;
  }
}
</script>
<template>
  <main class="diagnostic">
    <NuxtLink to="/">← Revenir à l’application</NuxtLink>
    <h1>Diagnostic opérateur</h1>
    <p>
      Origine sécurisée : <strong>{{ secure ? "oui" : "non" }}</strong>
    </p>
    <p>
      Ce contrôle demande le microphone puis le libère immédiatement. Il ne
      vérifie pas un appel audio entre deux appareils.
    </p>
    <button :disabled="checking" @click="checkMicrophone">
      {{
        checking
          ? "Vérification en cours…"
          : "Tester puis libérer le microphone"
      }}
    </button>
    <p role="status">{{ status }}</p>
  </main>
</template>

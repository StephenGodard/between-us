export default defineNuxtConfig({
  compatibilityDate: "2026-10-25",
  ssr: false,
  devtools: { enabled: false },
  css: ["~/assets/css/main.css"],
  runtimeConfig: { public: { hubPath: "/hubs/sessions" } },
  app: {
    head: {
      htmlAttrs: { lang: "fr" },
      title: "Between Us — un moment pour se parler",
      meta: [
        {
          name: "description",
          content: "Démonstration fictive de conversations éphémères.",
        },
      ],
    },
  },
});

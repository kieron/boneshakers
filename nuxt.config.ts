// Decides before first paint whether the home page plays its opening sequence,
// so the intro starts with the HTML instead of waiting for hydration.
const introScript = `(function(){try{if(location.pathname!=='/'||sessionStorage.getItem('bs-intro'))return;sessionStorage.setItem('bs-intro','1');document.documentElement.setAttribute('data-intro',matchMedia('(prefers-reduced-motion: reduce)').matches?'fade':'play')}catch(e){}})()`

export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  css: ['~/assets/css/main.css', '~/assets/css/studio.css'],
  app: {
    pageTransition: { name: 'page', mode: 'out-in' },
    head: {
      title: 'Boneshakers Tattoo Studio',
      htmlAttrs: { lang: 'en-GB' },
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'theme-color', content: '#03032b' }
      ],
      link: [
        { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' },
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
        { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Space+Mono:wght@400;700&display=swap' }
      ],
      script: [
        { innerHTML: introScript, tagPosition: 'head' }
      ]
    }
  },
})

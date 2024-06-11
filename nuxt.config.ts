export default defineNuxtConfig({
  runtimeConfig: {
    public: {
      BASE_URL: process.env.BASE_URL
    }
  },
  devtools: { enabled: true },
  app: {
    head: {
      title: 'Permata Mutiara Maja',
      meta: [
        { name: 'description', content: 'Permata Mutiara Maja' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { charset: 'utf-8' },
      ],
      link: [
        // Hapus link tag untuk CSS Bootstrap CDN dan gunakan dari node_modules
        {
          rel: 'stylesheet',
          href: 'https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css',
        },
        { rel: 'stylesheet',  href: 'https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css' },
        { rel: 'stylesheet', href: 'https://manage.adaradev.com/libs/quill/quill.snow.css' },
        { rel: 'stylesheet',  href: 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css' },
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
      ],
      script: [
        {
          src: 'https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js',
        },
        {
          hid: 'gtm', 
          innerHTML: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
          })(window,document,'script','dataLayer','GTM-P6B5TV7V');`,
          type: 'text/javascript',
          async: true
        },
        {
          src: 'https://www.googletagmanager.com/gtag/js?id=G-1941VJMTN6',
          async: true
        },
        {
          src: 'https://www.googletagmanager.com/gtag/js?id=G-2XKESRL290',
          async: true
        },
        {
          innerHTML: `window.dataLayer = window.dataLayer || []; function gtag(){dataLayer.push(arguments);} gtag('js', new Date()); gtag('config', 'G-1941VJMTN6'); gtag('config', 'G-2XKESRL290');`,
          type: 'text/javascript'
        }
      ],
    }
  },
  css: [
    'bootstrap/dist/css/bootstrap.min.css', // Import Bootstrap CSS dari node_modules
    '~/assets/css/main.css',
    '~/assets/scss/style.scss',
  ],
  modules: [
    'nuxt-aos',
    'vue3-carousel-nuxt'
  ],
  carousel: {
    prefix: 'MyPrefix'
  },
  components: true,
})
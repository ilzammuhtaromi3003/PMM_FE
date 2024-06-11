<template>
  <div>
    <NuxtLoadingIndicator/>
    <Navbar/>
    <NuxtLayout>
      <NuxtPage class="all-page"/>
    </NuxtLayout>
    <Footer/>
    <!-- Floating WhatsApp Button -->
    <a href="https://wa.me/628119270050?text=Saya+tertarik+dengan+perumahan+Permata+Mutiara+Maja+dari+Website" class="whatsapp-float" target="_blank">
      <i class="bi bi-whatsapp"></i>
      <span class="notification">1</span>
    </a>
  </div>
</template>

<script>

export default {
  head() {
    return {
      // Google Tag Manager and Google Analytics
      script: [
        {
          hid: 'gtm-script',
          innerHTML: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GTM-P6B5TV7V');`,
          type: 'text/javascript',
          async: true
        },
        {
          hid: 'gtm-config',
          innerHTML: `window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-1941VJMTN6');
            gtag('config', 'G-2XKESRL290');`,
          type: 'text/javascript'
        }
      ],
      noscript: [
        {
          hid: 'gtm-noscript',
          innerHTML: `<iframe src="https://www.googletagmanager.com/ns.html?id=GTM-P6B5TV7V"
            height="0" width="0" style="display:none;visibility:hidden"></iframe>`
        }
      ]
    }
  },
  mounted() {
    this.animateFloatingButton(); 
  },
  methods: {
    animateFloatingButton() {
      const floatingButton = document.querySelector('.whatsapp-float');
      floatingButton.style.animation = 'jiggle 1s infinite alternate'; 
    }
  }
}
</script>

<style>
.whatsapp-float {
  position: fixed;
  width: 60px;
  height: 60px;
  bottom: 40px;
  right: 40px;
  background-color: #25d366;
  color: #fff !important;
  border-radius: 50px;
  text-align: center;
  font-size: 30px;
  box-shadow: 2px 2px 3px #999;
  z-index: 100;
  display: flex;
  justify-content: center;
  align-items: center;
  text-decoration: none;
}
.notification {
  position: absolute;
  top: -5px; /* Sesuaikan posisi notifikasi */
  right: -5px; /* Sesuaikan posisi notifikasi */
  background-color: red;
  color: white;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  font-size: 14px;
  display: flex;
  justify-content: center;
  align-items: center;
}

@keyframes jiggle {
  0% {
    transform: translateY(0); /* Mulai dari posisi awal */
  }
  50% {
    transform: translateY(-20px); /* Bergerak ke atas */
  }
  100% {
    transform: translateY(0); /* Kembali ke posisi awal */
  }
}
</style>

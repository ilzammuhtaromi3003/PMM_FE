<template>
  <div>
    <div v-if="isLoading" class="spinner-container">
      <div class="loader"></div>
    </div>
    <div v-else>
      <div class="container-fluid py-5" style="background: #0E406D;">
        <div class="container text-white">
          <h6 class="text-secondary text-white py-2 fw-normal">News</h6>
          <h1 class="text-white">{{ newsEvent.article_title }}</h1>
          <h5 class="text-secondary text-white py-2 fw-normal">{{ formatDate(newsEvent.article_date) }}</h5>
        </div>
      </div>
      <div class="container">
        <img :src="getImageUrl(newsEvent.article_image)" class="img-fluid w-100 py-5" alt="">
        <div class="container wrapper-description">
          <div v-html="newsEvent.article_description" class="wrapper-description"></div>
        </div>
      </div>
      <h3 class="m-5" id="element"></h3>
      <div class="container">
        <h1>Other Articles</h1>
      </div>
      <div class="container back mb-5 pb-5">
        <div class="row justify-content-center">
          <div v-for="(otherEvent, index) in randomOtherEvents" :key="index" class="col-md-4 col-lg-4 col-sm-1 my-2">
            <nuxt-link :to="getNewsLink(otherEvent)" class="text-decoration-none text-dark">
              <div class="row bg-white text-dark">
                <div class="col-md-12 col-lg-12">
                  <div class="position-relative ratio ratio-1x1">
                    <img :src="getImageUrl(otherEvent.article_image)" class="img-fluid w-100 h-100 py-2 img-crop-center" alt="Other Image">
                  </div>
                </div>
                <div class="detail col-md-12 col-lg-12 d-flex align-items-center">
                  {{ truncateString(otherEvent.article_title, 50) }}
                </div>
                <div class="date col-md-12 col-lg-12 d-flex align-items-center">
                  {{ formatDate(otherEvent.article_date) }}
                </div>
                <div class="read-more col-md-12 col-lg-12 d-flex align-items-center my-3">
                  Read more
                </div>
              </div>
            </nuxt-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, watch } from 'vue'
import { useRuntimeConfig } from '#app'
import axios from 'axios'

export default {
  name: 'NewsDetail',
  setup() {
    const config = useRuntimeConfig()
    const baseUrl = computed(() => config.public.BASE_URL)
    return { baseUrl }
  },

  data() {
    return {
      newsEvent: {}, // Menyimpan data news event dari API
      otherNewsEvents: [], // Menyimpan data artikel lainnya dari API
      metaKeywords: '', // Menyimpan meta keyword dari API
      metaDescription: '', // Menyimpan meta description dari API
      pageTitle: '',
      isLoading: true // Untuk mengontrol visibilitas loading spinner
    };
  },
  mounted() {
    // Panggil method untuk mengambil data news event dari API
    this.fetchNewsEvent();
    // Panggil method untuk mengambil data artikel lainnya dari API
    this.fetchOtherNewsEvents();
  },
  watch: {
    // Memanggil method untuk mengambil data news event dari API setiap kali $route berubah
    '$route'() {
      this.fetchNewsEvent();
    },
    newsEvent: {
      handler(newValue) {
        this.metaKeywords = newValue.meta_keyword;
        this.metaDescription = newValue.meta_description;
        this.pageTitle = newValue.article_title;
      },
      immediate: true
    }
  },
  methods: {
    // Method untuk mengambil data news event dari API
    async fetchNewsEvent() {
      this.isLoading = true; // Tampilkan spinner sebelum memulai fetch
      try {
        // Mengambil data news event dari API berdasarkan ID
        const newsEventSlug = this.$route.params.slug;

        const response = await axios.get(`${this.baseUrl}/api/news_events/${newsEventSlug}`);
        this.newsEvent = response.data.newsEvent;
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } catch (error) {
        console.error('Error fetching news event:', error);
      } finally {
        this.isLoading = false; // Sembunyikan spinner setelah data diterima atau jika terjadi error
      }
    },
    // Method untuk mengambil data artikel lainnya dari API
    async fetchOtherNewsEvents() {
      try {
        // Mengambil data artikel lainnya dari API
        const response = await axios.get(`${this.baseUrl}/api/news_events`);
        this.otherNewsEvents = response.data.newsEvents;
      } catch (error) {
        console.error('Error fetching other news events:', error);
      }
    },
    // Method untuk memformat tanggal menjadi format yang diinginkan
    formatDate(dateString) {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
    },
    // Method untuk mendapatkan URL lengkap gambar
    getImageUrl(imagePath) {
      return imagePath ? `${this.baseUrl}/storage/${imagePath}` : ''; // Menyediakan URL lengkap untuk gambar
    },
    truncateString(text, length) {
      if (text.length > length) {
        return text.substring(0, length) + '...';  // Memotong teks dan menambahkan '...'
      }
      return text;
    },
    getNewsLink(item) {
      return `/news/${item.slug}`; // Mengembalikan URL halaman berita dengan slug yang sesuai
    }
  },
  head() {
    return {
      title: this.pageTitle, // Menggunakan nilai pageTitle
      meta: [
        { hid: 'keywords', name: 'keywords', content: this.metaKeywords },
        { hid: 'description', name: 'description', content: this.metaDescription }
      ]
    };
  },
  computed: {
    // Mengambil 3 artikel lainnya secara acak
    randomOtherEvents() {
      return this.otherNewsEvents.sort(() => Math.random() - 0.5).slice(0, 3);
    }
  }
};
</script>

<style scoped>
#element::after {
  content: "";
  display: block;
  width: 20%;
  height: 1px;
  background-color: #595959;
  margin: 10px auto;
}

.wrapper-description img {
  width: 100% !important;
  /* Membuat gambar tidak melebihi lebar container */
  height: auto !important;
  /* Memastikan tinggi gambar tetap proporsional */
  display: block !important;
  /* Memperbaiki masalah rendering pada beberapa browser */
  margin: auto !important;
  /* Opsi tambahan untuk memusatkan gambar jika perlu */
}

@media (max-width: 768px) {

  /* Atur batas untuk perangkat mobile */
  .wrapper-description img {
    width: 70% !important;
    height: auto !important;
  }

}
.img-crop-center {
  object-fit: cover; /* Memotong gambar agar mengisi area container */
  object-position: center; /* Memusatkan gambar */
}

/* Styles for the loading spinner */
.spinner-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh; /* Sesuaikan dengan tinggi yang diinginkan */
}

.loader {
  width: 50px;
  padding: 8px;
  aspect-ratio: 1;
  border-radius: 50%;
  background: #17284A;
  --_m: 
    conic-gradient(#0000 10%,#000),
    linear-gradient(#000 0 0) content-box;
  -webkit-mask: var(--_m);
          mask: var(--_m);
  -webkit-mask-composite: source-out;
          mask-composite: subtract;
  animation: l3 1s infinite linear;
}
@keyframes l3 {to{transform: rotate(1turn)}}
</style>

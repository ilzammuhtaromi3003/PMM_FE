<template>
  <div class="container-fluid bg-secondary-subtle py-5">
    <div v-if="isLoading" class="spinner-container">
      <div class="loader"></div>
    </div>
    <div v-else class="container">
      <!-- Judul "Commercial" -->
      <h1 class="text-center py-3 fs-1">Facilities</h1>

      <!-- Deskripsi -->
      <div class="col-lg-8 col-md-8 col-sm-8 mx-auto">
        <h2 class="description text-center fs-5" id="description">
          Permata Mutiara Maja menyediakan berbagai macam fasilitas yang memudahkan para penghuni untuk melakukan
          aktivitas.
        </h2>
      </div>

      <h3 class="py-5" id="element"></h3>
      <!-- Grid column -->
      <div class="container mb-5 pb-5 col-md-8 col-lg-8 col-sm-8">
        <div class="row justify-content-between">
          <!-- Loop through categories and display them -->
          <div v-for="category in categories" :key="category.id" class="col-md-6 col-lg-6 col-sm-6 p-3">
            <nuxt-link :to="`/facilities/${category.slug}`" class="text-decoration-none text-dark">
              <div class="row">
                <div class="col-md-4 col-lg-4 col-sm-4 bg bg-white p-0 img-container"
                  :class="{ 'rounded-top-left': isMobile }">
                  <!-- Menggunakan cat_image sebagai gambar -->
                  <img :src="getImageUrl(category.cat_image)" class="img-fluid w-100"
                    :class="{ 'rounded-top-left': isMobile }" style="height: 100%; display: block;"
                    :alt="category.cat_title">
                </div>
                <div class="col-md-8 col-lg-8 col-sm-8 bg bg-white d-flex flex-column justify-content-center"
                  style="border-bottom-right-radius: 50px;">
                  <!-- Menggunakan cat_title sebagai judul -->
                  <p class="news-nav pt-3 mb-0">{{ category.cat_title }}</p>
                  <p class="read-more pb-3 mb-0">{{ category.facilities.length }} Places</p>
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
import { computed } from 'vue'
import { useRuntimeConfig } from '#app'
import axios from 'axios'

export default {
  name: 'Facilities',
  setup() {
    const config = useRuntimeConfig()
    const baseUrl = computed(() => config.public.BASE_URL)
    return { baseUrl }
  },
  data() {
    return {
      isMobile: false,
      categories: [],
      metaKeywords: '',
      metaDescription: '',
      pageTitle: '',
      isLoading: true // Untuk mengontrol visibilitas loading spinner
    }
  },
  mounted() {
    this.isMobile = window.innerWidth <= 576
    window.addEventListener('resize', () => {
      this.isMobile = window.innerWidth <= 576
    })
    this.fetchData()
  },
  methods: {
    async fetchData() {
      this.isLoading = true; // Tampilkan spinner sebelum memulai fetch
      try {
        const responseCategories = await axios.get(`${this.baseUrl}/api/facilities_categories_with_facilities`)
        this.categories = responseCategories.data.categories

        const responseSettings = await axios.get(`${this.baseUrl}/api/setting/1`)
        const settings = responseSettings.data.settings
        const facilitiesSetting = settings.find(setting => setting.page_title === 'facilities')

        this.metaKeywords = facilitiesSetting.page_meta_keyword
        this.metaDescription = facilitiesSetting.page_meta_description
        this.pageTitle = facilitiesSetting.page_title
      } catch (error) {
        console.error('Error fetching data:', error)
      } finally {
        this.isLoading = false; // Sembunyikan spinner setelah data diterima atau jika terjadi error
      }
    },
    getImageUrl(imagePath) {
      return imagePath ? `${this.baseUrl}/storage/${imagePath}` : ''
    }
  },
  head() {
    return {
      title: this.pageTitle,
      meta: [
        { hid: 'keywords', name: 'keywords', content: this.metaKeywords },
        { hid: 'description', name: 'description', content: this.metaDescription }
      ]
    }
  }
}
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

.rounded-top-left {
  border-top-left-radius: 100px;
}

/* Styles for the loading spinner */
.spinner-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh; /* Sesuaikan dengan tinggi yang diinginkan */
}

/* HTML: <div class="loader"></div> */
/* HTML: <div class="loader"></div> */
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

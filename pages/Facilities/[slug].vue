<template>
    <div class="container-fluid bg-secondary-subtle p-5">
      <div v-if="isLoading" class="spinner-container">
        <div class="loader"></div>
      </div>
      <div v-else class="container">
        <!-- Judul menggunakan cat_title -->
        <h1 class="text-center py-4 border fs-1">{{ category.cat_title }}</h1>
  
        <!-- Deskripsi menggunakan cat_subtitle -->
        <div class="col-md-8 col-lg-8 col-sm-8 mx-auto">
          <h2 class="description text-center mx-5 px-5 border fs-5 fw-normal" id="description">{{ category.cat_subtitle }}</h2>
        </div>
        
        <h3 class="py-5" id="element"></h3>
  
        <!-- Grid column -->
        <div class="container back mb-5 pb-5">
          <div class="row justify-content-center">
            <!-- Loop through facilities and display them -->
            <div v-for="facility in facilities" :key="facility.id" class="col-md-4 col-lg-4 col-sm-1 my-2">
              <div class="row m-1 bg-white text-dark">
                <div class="col-md-12 col-lg-12">
                  <div class="position-relative p-2 ratio ratio-1x1">
                    <!-- Menggunakan facilities_image sebagai gambar -->
                    <img :src="getImageUrl(facility.facilities_image)" class="img-fluid w-100 img-equal py-2" :alt="facility.facilities_name">
                  </div>
                </div>
                <div class="detail col-md-12 col-lg-12 d-flex align-items-center justify-content-center px-4 py-2 text-center">
                  <!-- Menggunakan facilities_name sebagai detail -->
                  {{ facility.facilities_name }}
                </div>
              </div>
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
    name: 'FacilitiesDetail',
    setup() {
      const config = useRuntimeConfig()
      const baseUrl = computed(() => config.public.BASE_URL)
      return { baseUrl }
    },
    data() {
      return {
        category: {}, // Menyimpan data kategori dari API
        facilities: [], // Menyimpan data fasilitas dari API
        metaKeywords: '', // Menyimpan meta keyword dari API
        metaDescription: '', // Menyimpan meta description dari API
        pageTitle: '',
        isLoading: true // Untuk mengontrol visibilitas loading spinner
      };
    },
    mounted() {
      // Panggil method untuk mengambil data kategori dan fasilitas dari API
      this.fetchFacilitiesDetail();
    },
    methods: {
      // Method untuk mengambil data kategori dan fasilitas dari API
      async fetchFacilitiesDetail() {
        this.isLoading = true; // Tampilkan spinner sebelum memulai fetch
        const categorySlug = this.$route.params.slug; // Menggunakan slug karena slug ada di URL
        try {
          // Mengambil data kategori dan fasilitas dari API
          const response = await axios.get(`${this.baseUrl}/api/facilities/${categorySlug}`);
          this.category = {
            cat_title: response.data.cat_title,
            cat_subtitle: response.data.cat_subtitle
          };
          this.facilities = response.data.facilities; // Menyimpan fasilitas dari respons API
        } catch (error) {
          console.error('Error fetching facilities detail:', error);
        } finally {
          this.isLoading = false; // Sembunyikan spinner setelah data diterima atau jika terjadi error
        }
      },
      // Method untuk mendapatkan URL lengkap gambar
      getImageUrl(imagePath) {
        return imagePath ? `${this.baseUrl}/storage/${imagePath}` : ''; // Menyediakan URL lengkap untuk gambar
      },
      async fetchData() {
        try {
          const response = await axios.get(`${this.baseUrl}/api/setting/13`);
          const settings = response.data.settings;
          const facilitiesSetting = settings.find(setting => setting.page_title === 'facilities');
  
          // Set nilai meta keywords, meta description, dan pageTitle
          this.metaKeywords = facilitiesSetting.page_meta_keyword;
          this.metaDescription = facilitiesSetting.page_meta_description;
          this.pageTitle = facilitiesSetting.page_title;
        } catch (error) {
          console.error('Error fetching data:', error);
        }
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
  
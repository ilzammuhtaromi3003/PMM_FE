<template>
    <div>
      <div v-if="isLoading" class="spinner-container">
        <div class="loader"></div>
      </div>
      <div v-else>
        <div v-if="careerData" class="container-fluid p-5" style="background: #0E406D;">
          <div class="container text-white">
            <!-- Judul menggunakan career_title -->
            <h1 class="text-white p-2">{{ careerData.career_title }}</h1>
            <!-- Tanggal menggunakan career_date -->
            <h5 class="text-secondary text-white p-2 fw-normal">{{ formatDate(careerData.career_date) }}</h5>
          </div>
        </div>
        <div v-if="careerData" class="container">
          <div class="container py-5">
            <!-- Deskripsi menggunakan career_description -->
            <div v-html="careerData.career_description"></div>
          </div>
          <!-- Gunakan gambar karier jika diperlukan -->
          <!-- <img v-if="careerData.career_image" :src="getImageUrl(careerData.career_image)" class="img-fluid w-100 p-5" :alt="careerData.career_title"> -->
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import { computed } from 'vue'
  import { useRuntimeConfig } from '#app'
  import axios from 'axios'
  
  export default {
    name: 'CareerDetail',
    setup() {
      const config = useRuntimeConfig()
      const baseUrl = computed(() => config.public.BASE_URL)
      return { baseUrl }
    },
    data() {
      return {
        careerData: null,
        metaKeywords: '', // Menyimpan meta keyword dari API
        metaDescription: '', // Menyimpan meta description dari API
        pageTitle: '',
        isLoading: true // Untuk mengontrol visibilitas loading spinner
      };
    },
    methods: {
      // Method untuk memformat tanggal
      formatDate(date) {
        if (!date) return '';
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(date).toLocaleDateString('en-US', options);
      },
      async fetchCareerDetail() {
        this.isLoading = true; // Tampilkan spinner sebelum memulai fetch
        try {
          const careerSlug = this.$route.params.slug;
          const response = await axios.get(`${this.baseUrl}/api/career/${careerSlug}`);
          this.careerData = response.data.career;
        } catch (error) {
          console.error('Error fetching career detail:', error);
        } finally {
          this.isLoading = false; // Sembunyikan spinner setelah data diterima atau jika terjadi error
        }
      },
      async fetchData() {
        try {
          const response = await axios.get(`${this.baseUrl}/api/setting/7`);
          const settings = response.data.settings;
          const facilitiesSetting = settings.find(setting => setting.page_title === 'facilities');
  
          // Set nilai meta keywords, meta description, dan pageTitle
          this.metaKeywords = facilitiesSetting.page_meta_keyword;
          this.metaDescription = facilitiesSetting.page_meta_description;
          this.pageTitle = facilitiesSetting.page_title;
          // Ambil data about dari API about
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
    },
    created() {
      this.fetchCareerDetail();
    }
  }
  </script>
  
  <style scoped>
  #element::after {
    content: "";
    display: block;
    width: 70%;
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
  
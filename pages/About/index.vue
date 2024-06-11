<template>
    <div class="container-fluid bg-secondary-subtle">
      <div class="container" v-if="!isLoading">
        <!-- Judul "Commercial" -->
        <h1 class="text-center pt-5 pb-3 fs-1">About Permata Mutiara Maja</h1>
  
        <!-- Deskripsi -->
        <h2 class="text-center px-5 mx-5 fs-5" id="description">{{ aboutData ? aboutData.headline : '' }}</h2>
  
        <h3 class="m-5" id="element"></h3>
  
      </div>
      <div class="container" v-if="!isLoading">
        <div class="row border border-success row py-5">
          <div class="col-md-4 col-lg-4 col-sm-4 bg bg-white p-0">
            <img :src="aboutData ? getImageUrl(aboutData.image_primary) : ''" class="img-fluid w-100"
              style="height: 100%; display: block;" :alt="aboutData ? aboutData.caption_image : ''">
          </div>
  
          <div class="about col-md-8 col-lg-8 col-sm-8 bg bg-white py-5">
            <p class="about font-secondary">{{ aboutData ? aboutData.description : '' }}</p>
          </div>
        </div>
      </div>
      <div class="map container-fluid py-5" v-if="!isLoading">
        <div class="container ratio ratio-16x9">
          <iframe width="100%" :src="youtubeUrl" frameborder="0" allowfullscreen></iframe>
        </div>
      </div>
      <div class="map container-fluid bg-secondary-subtle my-5" id="location" v-if="!isLoading">
        <iframe
          :src="googleMap"
          width="100%" height="100%" style="border:0;" allowfullscreen="false" loading="lazy"
          referrerpolicy="no-referrer-when-downgrade"></iframe>
      </div>
      <div class="container-fluid " style="background-color: #0E406D;" v-if="!isLoading">
        <div class="container">
          <div class="row py-5 text-white text-center">
            <div class="container-fluid " style="background-color: #0E406D;">
              <div class="row text-white justify-content-center">
                <div class="about col-6 col-md-6 col-lg-6 d-flex flex-column align-items-center">
                  <p class="about fs-1 font-primary mb-0">{{ aboutData ? aboutData.total_hectare : '' }}Ha</p>
                  <p class="about font-primary">Hectare</p>
                </div>
                <div class="about col-6 col-md-6 col-lg-6 d-flex flex-column align-items-center">
                  <p class="about fs-1 font-primary mb-0">{{ aboutData ? aboutData.total_housebuild : '' }}K
                  </p>
                  <p class="about font-primary">House Build</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div v-if="isLoading" class="spinner-container">
        <div class="loader"></div>
      </div>
    </div>
  </template>
  
  <script>
  import { computed } from 'vue'
  import { useRuntimeConfig } from '#app'
  import axios from 'axios'
  
  export default {
    setup() {
      const config = useRuntimeConfig()
      const baseUrl = computed(() => config.public.BASE_URL)
      return { baseUrl }
    },
    name: 'About',
    data() {
      return {
        aboutData: null,
        youtubeUrl: '', // URL video YouTube akan diatur setelah data diambil dari API
        googleMap: '',
        showVideo: false, // Untuk mengontrol apakah iframe akan ditampilkan atau tidak
        categories: [], // Menyimpan data kategori dari API
        metaKeywords: '', // Menyimpan meta keyword dari API
        metaDescription: '', // Menyimpan meta description dari API
        pageTitle: '',
        isLoading: true // Untuk mengontrol visibilitas loading spinner
      };
    },
    mounted() {
      this.fetchAboutData();
    },
    methods: {
      async fetchAboutData() {
        this.isLoading = true; // Tampilkan spinner sebelum memulai fetch
        try {
          const responseAbout = await fetch(`${this.baseUrl}/api/about`);
          if (!responseAbout.ok) {
            throw new Error(`HTTP error! status: ${responseAbout.status}`);
          }
          const dataAbout = await responseAbout.json();
          this.aboutData = dataAbout.aboutCompanies[0];
  
          const responseDetail = await fetch(`${this.baseUrl}/api/detail_company`);
          if (!responseDetail.ok) {
            throw new Error(`HTTP error! status: ${responseDetail.status}`);
          }
          const dataDetail = await responseDetail.json();
          const detailCompany = dataDetail.detailCompany[0];
  
          this.googleMap = detailCompany.co_google_map;
          this.youtubeUrl = `https://www.youtube.com/embed/${this.extractVideoID(detailCompany.co_linkyoutube)}`;
        } catch (error) {
          console.error('Error fetching data:', error);
        } finally {
          this.isLoading = false; // Sembunyikan spinner setelah data diterima atau jika terjadi error
        }
      },
      extractVideoID(url) {
        const regExp = /^.*(youtu.be\/|v\/|e\/|u\/\w+\/|embed\/|v=)([^#\&\?]*).*/;
        const match = url.match(regExp);
        return (match && match[2].length == 11) ? match[2] : null;
      },
      getImageUrl(imagePath) {
        return `${this.baseUrl}/storage/` + imagePath;
      },
      toggleVideo() {
        this.showVideo = !this.showVideo;
      },
      async fetchData() {
        try {
          const response = await axios.get(`${this.baseUrl}/api/setting/2`);
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
      },
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
  /* Tambahkan CSS sesuai kebutuhan */
  .image-button {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: transparent;
    color: white;
    font-family: 'Niramit', sans-serif;
    font-weight: 600;
  }
  
  #element::after {
    content: "";
    display: block;
    width: 20%;
    height: 1px;
    background-color: #595959;
    margin: 10px auto;
  }
  
  #location iframe {
    height: 600px;
  }
  
  .video-link {
    cursor: pointer;
    transition: background-color 0.3s ease;
  }
  
  /* Tambahkan styling hover untuk class "video-link" */
  .video-link:hover {
    background-color: #0056b3;
  }
  
  @media screen and (max-width: 576px) {
    .about {
      font-size: 12px;
      padding-top: 5px !important;
      padding-bottom: 5px !important;
      padding-left: 5px !important;
      padding-right: 5px !important;
    }
  }
  
  #location iframe {
    height: 600px;
  }
  
  @media screen and (max-width: 576px) {
    #location iframe {
      height: 300px;
    }
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
  
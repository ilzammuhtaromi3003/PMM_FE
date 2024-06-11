<template>
  <div>
    <div v-if="isLoading" class="spinner-container">
      <div class="loader"></div>
    </div>
    <div v-else class="container-fluid bg-secondary-subtle py-5">
      <div class="container">
        <!-- Judul "Commercial" -->
        <h1 class="text-center py-4 fs-1 capitalize">{{ devCategory }}</h1>

        <div class="col-md-8 col-lg-8 col-sm-8 mx-auto">
          <h2 class="text-center px-5 fs-5" id="description">Tersedia berbagai type unit rumah komersial siap huni yang dapat anda beli baik secara tunai maupun kredit dengan DP ringan dan cicilan sesuai kemampuan anda.</h2>
        </div>
        <!-- Deskripsi -->

        <h3 class="m-5" id="element"></h3>
        <!-- Judul "Cluster" -->
        <h1 class="text-center my-4 fs-3">Flexy House</h1>

        <!-- Grid column -->
        <div class="row justify-content-center">
          <div v-for="development in commercialDevelopments" :key="development.id" class="col-md-6 col-lg-4 my-2">
            <div class="position-relative ratio ratio-1x1">
              <!-- Menggunakan dev_image sebagai gambar -->
              <img :src="`${this.baseUrl}/storage/` + development.dev_image" class="img-fluid img-crop-center" :alt="development.dev_name">
              <nuxt-link :to="`/development/commercial/${development.slug}`" class="image-link"></nuxt-link>
              <!-- Tautan Nuxt -->
              <div class="container button-overlay">
                <!-- Button -->
                <button @click="navigateToDevelopment(development.slug)" class="image-button btn btn-primary fs-6 border-2 border-white text-white" id="image-button">{{ development.dev_name }}</button>
                <!-- Label Subsidi -->
                <span v-if="development.is_subsidi === 1" class="label-subsidi">
                  <img src="~/assets/img/SUBSIDI.png" alt="Subsidi" class="label-icon img-fluid">
                </span>
                <!-- Label Sold -->
                <span v-if="development.is_sold === 1" class="label-sold">
                  <img src="~/assets/img/SOLD.png" alt="Sold" class="label-icon img-fluid">
                </span>
                <span v-if="development.coming_soon === 1" class="label-coming-soon">
                  <h6 class="text-white text-center font-primary fs-5">COMING SOON</h6>
                </span>
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
  setup() {
    const config = useRuntimeConfig()
    const baseUrl = computed(() => config.public.BASE_URL)
    return { baseUrl }
  },

  name: 'Commercial',
  data() {
    return {
      commercialDevelopments: [],
      devCategory: '',
      devDescription: '',
      metaKeywords: '',
      metaDescription: '',
      pageTitle: '',
      isLoading: true // Untuk mengontrol visibilitas loading spinner
    }
  },
  created() {
    this.fetchDevelopments();
    this.fetchData();
  },
  methods: {
    fetchDevelopments() {
      this.isLoading = true; // Tampilkan spinner sebelum memulai fetch
      fetch(`${this.baseUrl}/api/developments`)
        .then(response => response.json())
        .then(data => {
          const activeDevelopments = data.developments
            .filter(development => development.dev_category === 'commercial' && development.is_active === 1);

          // Sort developments
          const sortedDevelopments = activeDevelopments.sort((a, b) => {
            // Determine priority
            const getPriority = (development) => {
              if (development.is_sold === 1) return 9999; // Lowest priority for sold items
              if (development.coming_soon === 1) return 1; // Higher priority for coming soon items
              return development.sort; // Use 'sort' field for other items
            };

            // Compare priorities
            return getPriority(a) - getPriority(b);
          });

          // Ensure 'coming_soon' items appear before the last 'is_sold' item
          const comingSoonItems = sortedDevelopments.filter(dev => dev.coming_soon === 1);
          const otherItems = sortedDevelopments.filter(dev => dev.coming_soon !== 1);
          const soldItems = otherItems.filter(dev => dev.is_sold === 1);
          const availableItems = otherItems.filter(dev => dev.is_sold !== 1);

          this.commercialDevelopments = [...availableItems, ...comingSoonItems, ...soldItems];

          const firstDevelopment = this.commercialDevelopments.length > 0 ? this.commercialDevelopments[0] : {};
          this.devCategory = firstDevelopment.dev_category || '';
          this.devDescription = firstDevelopment.dev_description || '';
        })
        .catch(error => console.error('Error fetching data:', error))
        .finally(() => {
          this.isLoading = false; // Sembunyikan spinner setelah data diterima atau jika terjadi error
        });
    },
    navigateToDevelopment(developmentSlug) {
      this.$router.push(`/development/commercial/${developmentSlug}`);
    },
    async fetchData() {
      try {
        const response = await axios.get(`${this.baseUrl}/api/setting/6`);
        const settings = response.data.settings;
        const facilitiesSetting = settings.find(setting => setting.page_title === 'facilities');

        this.metaKeywords = facilitiesSetting.page_meta_keyword;
        this.metaDescription = facilitiesSetting.page_meta_description;
        this.pageTitle = facilitiesSetting.page_title;
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    },
  },
  head() {
    return {
      title: this.pageTitle,
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

.capitalize {
  text-transform: capitalize;
}
@keyframes pulse {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.1);
  }
  100% {
    transform: scale(1);
  }
}
.label-subsidi {
  position: absolute;
  top: 5%;
  right: 60%;
  color: black;
}

.label-sold {
  position: absolute;
  bottom: 0%;
  left: 76%;
  color: black;
}

.label-coming-soon {
  position: absolute;
  bottom: 5%;
  left: 27%;
  animation: pulse 2s infinite;
}

.position-relative:hover .label-coming-soon {
  display: none;
}

.position-relative {
  overflow: hidden;
  /* Memastikan bagian gambar yang melewati batas terpotong */
}

.position-relative img {
  filter: brightness(50%);
  /* Ubah filter untuk membuat gambar sedikit lebih gelap */
  transition: filter 0.3s ease, transform 0.3s ease;
  /* Tambahkan efek transisi untuk filter dan transform */
  transform-origin: center;
  /* Set titik transformasi di tengah gambar */
}

.position-relative:hover img {
  opacity: 1;
  /* Set opacity to 1 when hovering over the parent container */
  filter: brightness(100%);
  /* Remove filter on hover to make the image brighter */
  transform: scale(1.05);
  /* Sedikit zoom in saat gambar dihover */
}

.position-relative .image-button {
  opacity: 1;
  /* Set opacity to 1 for the button by default */
  transition: opacity 0.3s ease;
  /* Add transition effect */
}

.position-relative:hover .image-button {
  opacity: 0;
  /* Set opacity to 0 when hovering over the parent container */
}

.image-link {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
  /* Let the link cover the image */
  background: transparent;
  /* Make the link transparent */
}

.image-button {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 2;
  /* Put the button above the link */
}

.position-relative:hover .label-icon {
  transform: scale(1.15);
  /* Meningkatkan ukuran gambar saat hover */
  transition: transform 0.3s ease;
  /* Menambahkan transisi untuk efek smooth */
}

.img-crop-center {
  object-fit: cover;
  /* Memotong gambar agar mengisi area container */
  object-position: center;
  /* Memusatkan gambar */
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

<template>
  <div>
    <div id="carouselExampleCaptions" class="carousel slide" data-bs-ride="carousel"
      v-if="!loading && apiImages.length > 0" @swiped-left="goToNext" @swiped-right="goToPrev">
      <div class="carousel-indicators">
        <button v-for="(image, index) in apiImages" :key="index" :data-bs-target="'#carouselExampleCaptions'"
          :data-bs-slide-to="index" :class="{ active: index === 0 }" :aria-current="index === 0 ? 'true' : undefined"
          :aria-label="'Slide ' + (index + 1)">
        </button>
      </div>
      <div class="carousel-inner">
        <div v-for="(image, index) in apiImages" :key="index" :class="['carousel-item', { active: index === 0 }]">
          <img :src="getImageUrl(isMobile ? image.image_path_mobile : image.image_path)" :alt="image.caption_image"
            class="d-block w-100 carousel-image" />
          <!-- <div class="carousel-caption">
            <nuxt-link v-if="imageBanner && imageBanner.text_button" to="/about">
              <button class="button-home btn btn-primary p-4 font-primary" id="image-button">
                {{ imageBanner.text_button }}
              </button>
            </nuxt-link>
          </div> -->
        </div>
      </div>
      <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleCaptions"
        data-bs-slide="prev">
        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Previous</span>
      </button>
      <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleCaptions"
        data-bs-slide="next">
        <span class="carousel-control-next-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Next</span>
      </button>
    </div>

    <div v-if="loading" class="spinner-container">
      <div class="loader"></div>
    </div>
    <div v-else-if="apiImages.length === 0" class="no-images">
      <p>No images available</p>
    </div>
  </div>
</template>


<script setup>
import { ref, computed, onMounted } from 'vue';
import { useRuntimeConfig } from '#app';
import axios from 'axios';

const config = useRuntimeConfig();
const baseUrl = computed(() => config.public.BASE_URL);

const apiImages = ref([]);
const imageBanners = ref([]);
const imageBanner = ref(null);
const isMobile = ref(false);
const loading = ref(true);

const getImageUrl = (imagePath) => {
  return `${baseUrl.value}/storage/` + imagePath;
};

const fetchApiImages = async () => {
  try {
    const apiImageResponse = await axios.get(`${baseUrl.value}/api/image_home`);
    console.log('Images:', apiImageResponse.data.images);  // Tambahkan ini untuk melihat respon di konsol
    apiImages.value = apiImageResponse.data.images;
  } catch (error) {
    console.error(error);
  }
};

const fetchImageBanners = async () => {
  try {
    const imageBannerResponse = await axios.get(`${baseUrl.value}/api/image_banner`);
    console.log('Image Banners:', imageBannerResponse.data.imageBanners);  // Tambahkan ini untuk melihat respon di konsol
    imageBanners.value = imageBannerResponse.data.imageBanners;
    if (imageBanners.value.length > 0) {
      imageBanner.value = imageBanners.value[0];
    }
  } catch (error) {
    console.error(error);
  }
};

const handleResize = () => {
  if (typeof window !== 'undefined') {
    isMobile.value = window.innerWidth <= 576;
  }
};

const goToNext = () => {
  if (typeof window !== 'undefined') {
    const carouselElement = document.getElementById('carouselExampleCaptions');
    const carousel = new bootstrap.Carousel(carouselElement);
    carousel.next();
  }
};

const goToPrev = () => {
  if (typeof window !== 'undefined') {
    const carouselElement = document.getElementById('carouselExampleCaptions');
    const carousel = new bootstrap.Carousel(carouselElement);
    carousel.prev();
  }
};

onMounted(async () => {
  if (typeof window !== 'undefined') {
    try {
      const SwipedEvents = (await import('swiped-events')).default;
      new SwipedEvents();
    } catch (error) {
      console.error('Failed to load swiped-events:', error);
    }
    handleResize(); // Initial check
    await fetchApiImages();
    await fetchImageBanners();
    window.addEventListener('resize', handleResize);
    loading.value = false;  // Atur loading ke false setelah kedua API dipanggil
  }
});
</script>


<style scoped>
.carousel-image {
  height: 90vh;
  /* Tinggi tetap untuk desktop */
  object-fit: cover;
}

.button-home {
  margin-top: -80vh;
}

@media (max-width: 576px) {
  .carousel-image {
    height: 45vh;
    /* Tinggi tetap untuk mobile */
  }
  .button-home {
    font-size: 14px !important;
    margin-top: -28vh;
  }
}

@media (min-width: 577px) and (max-width: 1024px) {
  .carousel-image {
    height: 80vh; /* Tinggi tetap untuk tablet */
  }
  .button-home {
    font-size: 16px !important;
    margin-top: -65vh;
  }
}

.spinner-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh; /* Sesuaikan dengan tinggi yang diinginkan */
}

/* Loader Styles */
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

/* CSS untuk membuat indikator menjadi bulat */
.carousel-indicators button {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background-color: #ddd;
  transition: background-color 0.3s;
}

.carousel-indicators .active {
  background-color: #3498db;
}
</style>

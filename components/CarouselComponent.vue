<template>
  <div>
    <!-- Bagian Carousel -->
    <section v-if="development && activeUnit && activeUnit.galleries" class="section-content">
      <div class="container">
        <div class="col-lg-8 col-md-8 col-sm-8 mx-auto">
          <h1 class="font-primary text-blue-light fs-1 fw-normal py-4">Gallery</h1>
          <div id="carouselExampleIndicators" class="carousel slide d-md-none">
            <div class="carousel-indicators">
              <button v-for="(gallery, index) in sortedGalleries" :key="gallery.id" type="button"
                data-bs-target="#carouselExampleIndicators" :data-bs-slide-to="index"
                :class="{ 'active': index === 0 }" aria-current="true"
                :aria-label="'Slide ' + (index + 1)" @click="setActiveIndex(index)"></button>
            </div>
            <div class="carousel-inner">
              <div v-for="(gallery, index) in sortedGalleries" :key="gallery.id"
                :class="{ 'carousel-item': true, 'active': index === activeImageIndex }" class="ratio ratio-4x3">
                <img :src="`${baseUrl}/storage/` + gallery.gallery_image" class="d-block w-100"
                  :alt="gallery.caption_image">
                <div class="carousel-caption d-none d-md-block">
                  <h5>{{ gallery.caption_image }}</h5>
                </div>
              </div>
            </div>
            <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators"
              data-bs-slide="prev" @click="prevImage">
              <span class="carousel-control-prev-icon" aria-hidden="true"></span>
              <span class="visually-hidden">Previous</span>
            </button>
            <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators"
              data-bs-slide="next" @click="nextImage">
              <span class="carousel-control-next-icon" aria-hidden="true"></span>
              <span class="visually-hidden">Next</span>
            </button>
          </div>
        </div>
      </div>
    </section>

    <!-- Bagian Gambar Aktif Besar -->
    <section v-if="development && activeUnit && activeUnit.galleries && activeUnit.galleries.length"
      class="active-image-display d-none d-md-block">
      <div class="container py-3">
        <div class="col-lg-8 col-md-8 col-sm-8 mx-auto">
          <img :src="`${baseUrl}/storage/` + activeUnit.galleries[activeImageIndex].gallery_image"
            class="img-fluid w-100 fixed-height" :alt="activeUnit.galleries[activeImageIndex].caption_image">
        </div>
      </div>
    </section>

    <!-- Bagian Thumbnail Carousel -->
    <section v-if="development && activeUnit && activeUnit.galleries && activeUnit.galleries.length > 0 && activeUnit.galleries.some(gallery => gallery.gallery_image)"
      class="section-thumbnail-carousel d-none d-md-block py-5">
      <div class="container">
        <div class="col-lg-8 col-md-8 col-sm-8 mx-auto pt-3" style="background-color: #ECECEC;">
          <Carousel :itemsToShow="itemsToShow" :wrapAround="wrapAround" :transition="500">
            <Slide v-for="(gallery, index) in sortedGalleries" :key="gallery.id">
              <div class="thumbnail-item" :class="{ 'active': index === activeImageIndex }" :style="thumbnailStyle">
                <img :src="`${baseUrl}/storage/` + gallery.gallery_image" class="img-fluid thumbnail-fixed-height"
                  :alt="gallery.caption_image" @click="setActiveIndex(index)">
              </div>
            </Slide>
          </Carousel>
        </div>
      </div>
    </section>

    <!-- Message when no gallery images are available -->
    <section v-else class="section-thumbnail-carousel pt-3">
      <div class="container">
        <div class="col-lg-8 col-md-8 col-sm-8 mx-auto text-center" style="background-color: #ECECEC; padding: 20px;">
          <p class="font-primary fs-6">Saat ini belum tersedia.</p>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { computed } from 'vue'
import { useRuntimeConfig } from '#app'
import { Carousel, Slide } from 'vue3-carousel'
import 'vue3-carousel/dist/carousel.css'

export default {
  name: 'CarouselComponent',
  components: {
    Carousel,
    Slide
  },
  props: {
    development: Object,
    activeUnit: Object
  },
  setup() {
    const config = useRuntimeConfig()
    const baseUrl = computed(() => config.public.BASE_URL)
    return { baseUrl }
  },
  data() {
    return {
      activeImageIndex: 0
    }
  },
  computed: {
    sortedGalleries() {
      if (this.activeUnit && this.activeUnit.galleries) {
        return this.activeUnit.galleries.sort((a, b) => a.sort - b.sort)
      }
      return []
    },
    itemsToShow() {
      return this.sortedGalleries.length < 3 ? this.sortedGalleries.length : 3.95;
    },
    wrapAround() {
      return this.sortedGalleries.length >= 3;
    },
    thumbnailStyle() {
      let width = '80%';
      switch (this.sortedGalleries.length) {
        case 1:
          width = '20%';
          break;
        case 2:
          width = '40%';
          break;
        case 3:
          width = '60%';
          break;
        default:
          width = '80%';
          break;
      }
      return {
        width,
        margin: '0 2%'
      };
    }
  },
  methods: {
    setActiveIndex(index) {
      this.activeImageIndex = index
    },
    prevImage() {
      if (this.activeImageIndex > 0) {
        this.activeImageIndex -= 1
      } else {
        this.activeImageIndex = this.sortedGalleries.length - 1
      }
    },
    nextImage() {
      if (this.activeImageIndex < this.sortedGalleries.length - 1) {
        this.activeImageIndex += 1
      } else {
        this.activeImageIndex = 0
      }
    },
    handleSlideChange({ currentIndex }) {
      this.activeImageIndex = currentIndex
    }
  },
  watch: {
    activeUnit(newUnit) {
      if (newUnit && newUnit.galleries) {
        this.activeImageIndex = 0
      }
    }
  }
}
</script>

<style scoped>
.active-image-display img {
  width: 100%;
  height: 500px; /* Set a fixed height */
  object-fit: cover;
}

.thumbnail-carousel {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
}

.thumbnail-item {
  flex: none;
  height: 100px; /* Set a fixed height for thumbnails */
  cursor: pointer;
}

.thumbnail-item img {
  width: 100%;
  height: 100%; /* Ensure the image fills the thumbnail */
  object-fit: cover; /* Ensure the image maintains its aspect ratio */
  opacity: 0.6;
}

.thumbnail-item.active img {
  opacity: 1;
}
</style>

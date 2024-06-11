<template>
  <footer id="footer" class="bg-secondary-subtle mt-3">
    <NuxtLoadingIndicator v-if="isLoading" />
    <div v-else>
      <div class="container border">
        <div class="row g-5 py-3">
          <div class="col-12 col-md-4 text-center">
            <img :src="getImageUrl(detailCompany.logo_footer)" alt="PMM-Logo" class="img-fluid">
            <ul class="px-2">
              <!-- Menggunakan v-for untuk menampilkan data sosial media -->
              <li v-for="media in filteredSocialMedia" :key="media.id" class="d-inline-block fs-1 px-2">
                <!-- Gunakan link_sosmed untuk href -->
                <a target="_blank" :href="media.link_sosmed">
                  <i :class="`bi bi-${media.name_sosmed.toLowerCase()} icon`"></i>
                </a>
              </li>
            </ul>
          </div>
          <div class="col-12 col-md-4 text-center text-md-start">
            <h5 class="mb-3">Marketing Office</h5>
            <p id="co-address" class="co-address" v-html="detailCompany.co_address"></p>
            <h5 class="py-2">For Inquiry</h5>
            <div>
              <ul class="list-unstyled text-center text-md-start">
                <li class="d-inline-block fs-6 me-3"><a target="_blank"
                    :href="'https://wa.me/' + detailCompany.co_whatsapp"><i class="bi bi-whatsapp"></i></a></li>
                <li class="d-inline-block fs-6 me-3"><a target="_blank" class="fw-normal text-footer"
                    style="text-decoration: none;" :href="'https://wa.me/' + detailCompany.co_whatsapp">{{
                      detailCompany.co_whatsapp }}</a></li>
              </ul>
              <ul class="list-unstyled text-center text-md-start">
                <li class="d-inline-block fs-6 me-3"><a href="#"><i class="bi bi-telephone-fill"></i></a>
                </li>
                <li class="d-inline-block fs-6 me-3"><a class="fw-normal text-footer" style="text-decoration: none;"
                    :href="'tel:' + detailCompany.co_telp">{{ detailCompany.co_telp }}</a></li>
              </ul>
            </div>
          </div>
          <div class="col-12 col-md-4 text-center text-md-start">
            <h5 class="mb-3">Quick Links</h5>
            <div class="row pb-2">
              <div class="col-6 col-md-6 col-sm-6 mb-1">
                <nuxt-link class="fw-normal font-secondary text-footer" style="text-decoration: none;" to="/">
                  Home
                </nuxt-link>
              </div>
              <div class="col-6 col-md-6 col-sm-6 mb-1">
                <nuxt-link class="fw-normal font-secondary text-footer" style="text-decoration: none;"
                  to="/facilities">Facilities</nuxt-link>
              </div>
            </div>
            <div class="row pb-2">
              <div class="col-6 col-md-6 col-sm-6 mb-1">
                <nuxt-link class="fw-normal font-secondary text-footer" style="text-decoration: none;" to="/about">About
                  Us</nuxt-link>
              </div>
              <div class="col-6 col-md-6 col-sm-6 mb-1">
                <nuxt-link class="fw-normal font-secondary text-footer" style="text-decoration: none;" to="/news">News &
                  Event</nuxt-link>
              </div>
            </div>
            <div class="row pb-2">
              <div class="col-6 col-md-6 col-sm-6 mb-1">
                <nuxt-link class="fw-normal font-secondary text-footer" style="text-decoration: none;"
                  to="/development/residential">Residential</nuxt-link>
              </div>
              <div class="col-6 col-md-6 col-sm-6 mb-1">
                <nuxt-link class="fw-normal font-secondary text-footer" style="text-decoration: none;"
                  to="/contact">Contact Us</nuxt-link>
              </div>
            </div>
            <div class="row pb-2">
              <div class="col-6 col-md-6 col-sm-6 mb-1">
                <nuxt-link class="fw-normal font-secondary text-footer" style="text-decoration: none;"
                  to="/development/commercial">Commercial</nuxt-link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="container-fluid pt-3 pb-1" style="background-color: #999999;">
        <div class="col-12 col-md-12 col-sm-12 text-center">
          <p class="text-center" style="font-size: 12px;">© 2024 Permata Mutiara Maja</p>
        </div>
      </div>
    </div>
  </footer>
</template>

<script>
import { computed } from 'vue'
import { useRuntimeConfig } from '#app'
import axios from 'axios'
import NuxtLoadingIndicator from './NuxtLoadingIndicator.vue'

export default {
  setup() {
    const config = useRuntimeConfig()
    const baseUrl = computed(() => config.public.BASE_URL)
    return { baseUrl }
  },

  name: 'Footer',
  components: {
    NuxtLoadingIndicator
  },
  data() {
    return {
      detailCompany: {},
      socialMedia: [],
      isLoading: true // Menambahkan state untuk melacak loading
    };
  },
  created() {
    this.fetchDetailCompany();
    this.fetchSocialMedia();
  },
  methods: {
    async fetchDetailCompany() {
      this.$root.$emit('start-loading'); // Memulai loading indicator
      try {
        const response = await axios.get(`${this.baseUrl}/api/detail_company`);
        if (response.data.detailCompany && response.data.detailCompany.length > 0) {
          this.detailCompany = response.data.detailCompany[0];
        }
      } catch (error) {
        console.error('Error fetching detail company:', error);
      } finally {
        this.$root.$emit('stop-loading'); // Menghentikan loading indicator
        this.isLoading = false; // Set isLoading ke false setelah data siap
      }
    },
    async fetchSocialMedia() {
      this.$root.$emit('start-loading'); // Memulai loading indicator
      try {
        const response = await axios.get(`${this.baseUrl}/api/social_media`);
        this.socialMedia = response.data.socialMedia;
      } catch (error) {
        console.error('Error fetching social media:', error);
      } finally {
        this.$root.$emit('stop-loading'); // Menghentikan loading indicator
      }
    },
    getImageUrl(imagePath) {
      return imagePath ? `${this.baseUrl}/storage/${imagePath}` : ''; // Menyediakan URL lengkap untuk gambar
    }
  },
  computed: {
    // Membuat computed property untuk menyaring data sosial media yang aktif
    filteredSocialMedia() {
      return this.socialMedia.filter(media => media.is_active);
    }
  },
}
</script>

<style scoped>
.icon {
  color: black;
  font-size: 0.6em;
}
/* Meningkatkan specificity dengan menambahkan lebih banyak konteks */
.co-address {
  line-height: 0.7rem;
}
</style>

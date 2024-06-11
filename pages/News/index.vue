<template>
  <div class="container-fluid bg-secondary-subtle py-5">
    <div v-if="isLoading" class="spinner-container">
      <div class="loader"></div>
    </div>
    <div v-else class="container">
      <h1 class="text-center py-3 fs-1">News & Events</h1>
      <div class="text-center py-5">
        <a href="#" class="news-nav mx-2" style="text-decoration: none;" :class="{ 'active': isActive === null }"
          @click="filterNewsEvents(null)">All</a>
        <a href="#" class="news-nav mx-2" style="text-decoration: none;" :class="{ 'active': isActive === 1 }"
          @click="filterNewsEvents(1)">Media</a>
        <a href="#" class="news-nav mx-2" style="text-decoration: none;" :class="{ 'active': isActive === 2 }"
          @click="filterNewsEvents(2)">News</a>
      </div>
      <div class="container back pb-5">
        <div class="row justify-content-center">
          <div v-if="filteredNewsEvents.length === 0" class="col-md-12 text-center">
            <p class="text-muted">Saat ini belum tersedia</p>
          </div>
          <div v-else v-for="(item) in paginatedNewsEvents" :key="item.id" class="col-md-4 col-lg-4 col-sm-1 my-2">
            <nuxt-link :to="getNewsLink(item)" class="text-decoration-none text-dark">
              <div class="row m-1 bg-white text-dark">
                <div class="col-md-12 col-lg-12">
                  <div class="position-relative ratio ratio-1x1">
                    <img :src="getImageUrl(item.article_image)" class="img-fluid w-100 py-2 img-crop-center"
                      :alt="item.article_caption">
                  </div>
                </div>
                <div class="detail col-md-12 col-lg-12 d-flex align-items-center">
                  {{ truncateString(item.article_title, 50) }}
                </div>
                <div class="date col-md-12 col-lg-12 d-flex align-items-center">
                  {{ formatDate(item.article_date) }}
                </div>
                <div class="read-more col-md-12 col-lg-12 d-flex align-items-center my-3">
                  Read more
                </div>
              </div>
            </nuxt-link>
          </div>
        </div>
        <nav aria-label="Page navigation example" v-if="filteredNewsEvents.length > 0">
          <ul class="pagination justify-content-center">
            <li class="page-item" :class="{ 'disabled': currentPage <= 1 }">
              <a class="page-link" href="#" @click="changePage(currentPage - 1)">Previous</a>
            </li>
            <li v-for="page in totalPages" :key="page" :class="{ 'active': currentPage === page }" class="page-item">
              <a class="page-link" href="#" @click="changePage(page)">{{ page }}</a>
            </li>
            <li class="page-item" :class="{ 'disabled': currentPage >= maxPage }">
              <a class="page-link" href="#" @click="changePage(currentPage + 1)">Next</a>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  </div>
</template>

<script>
import { computed } from 'vue'
import { useRuntimeConfig } from '#app'
import axios from 'axios'

export default {
  name: 'News',
  setup() {
    const config = useRuntimeConfig()
    const baseUrl = computed(() => config.public.BASE_URL)
    return { baseUrl }
  },
  data() {
    return {
      newsEvents: [],
      filteredNewsEvents: [],
      isActive: null,
      currentPage: 1,
      itemsPerPage: 9,
      metaKeywords: '',
      metaDescription: '',
      pageTitle: '',
      isLoading: true // Untuk mengontrol visibilitas loading spinner
    };
  },
  mounted() {
    this.fetchNewsEvents();
  },
  methods: {
    async fetchData() {
      try {
        const response = await axios.get(`${this.baseUrl}/api/setting/8`);
        const settings = response.data.settings;
        const facilitiesSetting = settings.find(setting => setting.page_title === 'facilities');

        // Set nilai meta keywords, meta description, dan pageTitle
        this.metaKeywords = facilitiesSetting.page_meta_keyword;
        this.metaDescription = facilitiesSetting.page_meta_description;
        this.pageTitle = facilitiesSetting.page_title;
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    },
    async fetchNewsEvents() {
      this.isLoading = true; // Tampilkan spinner sebelum memulai fetch
      try {
        const response = await axios.get(`${this.baseUrl}/api/news_events`);
        this.newsEvents = response.data.newsEvents;
        this.filteredNewsEvents = [...this.newsEvents];
      } catch (error) {
        console.error('Error fetching news events:', error);
      } finally {
        this.isLoading = false; // Sembunyikan spinner setelah data diterima atau jika terjadi error
      }
    },
    getImageUrl(imagePath) {
      return imagePath ? `${this.baseUrl}/storage/${imagePath}` : '';
    },
    formatDate(dateString) {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
    },
    filterNewsEvents(categoryId) {
      this.isActive = categoryId;
      this.filteredNewsEvents = categoryId ? this.newsEvents.filter(event => event.article_category_id === categoryId) : [...this.newsEvents];
      this.currentPage = 1;
    },
    truncateString(text, length) {
      return text.length > length ? text.substring(0, length) + '...' : text;
    },
    getNewsLink(item) {
      return `/news/${item.slug}`;
    },
    changePage(page) {
      if (page > 0 && page <= this.maxPage) {
        this.currentPage = page;
      }
    }
  },
  computed: {
    paginatedNewsEvents() {
      const startIndex = (this.currentPage - 1) * this.itemsPerPage;
      const endIndex = startIndex + this.itemsPerPage;
      return this.filteredNewsEvents.slice(startIndex, endIndex);
    },
    maxPage() {
      return Math.ceil(this.filteredNewsEvents.length / this.itemsPerPage);
    },
    totalPages() {
      return Array.from({ length: this.maxPage }, (_, i) => i + 1);
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

.img-crop-center {
  object-fit: cover; /* Memotong gambar agar mengisi area container */
  object-position: center; /* Memusatkan gambar */
}

.news-nav {
  padding: 10px 20px;
  font-size: 1.2em;
  transition: border-bottom 0.3s ease, color 0.3s ease;
}

.news-nav.active {
  border-bottom: 3px solid #0E406D;
  color: #0E406D;
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

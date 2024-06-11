<template>
    <div class="container-fluid bg-secondary-subtle p-5">
        <div v-if="isLoading" class="spinner-container">
            <div class="loader"></div>
        </div>
        <div v-else class="container">
            <!-- Judul "Commercial" -->
            <h1 class="text-center fs-1 py-2">Career</h1>

            <!-- Grid column -->
            <div class="row justify-content-center py-5">
                <!-- Loop through careers and display them -->
                <div v-for="career in careers" :key="career.id" class="col-lg-6 col-md-6 col-sm-6 text-center p-2">
                    <nuxt-link :to="`/career/${slugify(career.career_title)}`" class="position-relative text-decoration-none">
                        <div class="position-relative ratio ratio-1x1">
                            <!-- Menggunakan career_image sebagai gambar -->
                            <img :src="getImageUrl(career.career_image)" class="img-fluid img-crop-center" :alt="career.career_title">
                            <div class="container button-overlay">
                                <!-- Navigasi ke CareerDetail saat tombol ditekan -->
                                <span class="text-button btn btn-primary fs-6 border-2 border-white text-white image-button"
                                    id="image-button">{{ career.career_title }}</span>
                            </div>
                        </div>
                    </nuxt-link>
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
    name: 'Career',
    setup() {
        const config = useRuntimeConfig()
        const baseUrl = computed(() => config.public.BASE_URL)
        return { baseUrl }
    },
    data() {
        return {
            careers: [],
            metaKeywords: '', // Menyimpan meta keyword dari API
            metaDescription: '', // Menyimpan meta description dari API
            pageTitle: '',
            isLoading: true // Untuk mengontrol visibilitas loading spinner
        };
    },
    async created() {
        this.isLoading = true; // Tampilkan spinner sebelum memulai fetch
        try {
            // Mengambil data karier dari API
            const response = await axios.get(`${this.baseUrl}/api/career`);
            this.careers = response.data.careers;
        } catch (error) {
            console.error(error);
        } finally {
            this.isLoading = false; // Sembunyikan spinner setelah data diterima atau jika terjadi error
        }
    },
    async fetchData() {
        try {
            const response = await axios.get(`${this.baseUrl}/api/setting/10`);
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
    head() {
        return {
            title: this.pageTitle, // Menggunakan nilai pageTitle
            meta: [
                { hid: 'keywords', name: 'keywords', content: this.metaKeywords },
                { hid: 'description', name: 'description', content: this.metaDescription }
            ]
        };
    },
    methods: {
        slugify(title) {
            return title.toLowerCase().replace(/[\s]+/g, '-').replace(/[^\w\-]+/g, '').replace(/\-\-+/g, '-');
        },
        getImageUrl(imagePath) {
            return imagePath ? `${this.baseUrl}/storage/${imagePath}` : ''; // Menyediakan URL lengkap untuk gambar
        }
    }
};
</script>

<style scoped>
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
@media screen and (max-width: 576px) {
    .text-button {
        font-size: 12px !important;
    }
}

.position-relative {
    overflow: hidden; /* Memastikan bagian gambar yang melewati batas terpotong */
}

.position-relative img {
    filter: brightness(50%);
    /* Ubah filter untuk membuat gambar sedikit lebih gelap */
    transition: filter 0.3s ease, transform 0.3s ease; /* Tambahkan efek transisi untuk filter dan transform */
    transform-origin: center; /* Set titik transformasi di tengah gambar */
}

.position-relative:hover img {
    opacity: 1;
    /* Set opacity to 1 when hovering over the parent container */
    filter: brightness(100%);
    /* Remove filter on hover to make the image brighter */
    transform: scale(1.05); /* Sedikit zoom in saat gambar dihover */
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

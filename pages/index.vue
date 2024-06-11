<template>
    <IndexHome />

    <section class="section-2 py-5">
        <div class="container">
            <div v-if="isLoading" class="text-center">
                <div class="spinner-border" role="status">
                    <span class="visually-hidden">Loading...</span>
                </div>
            </div>
            <div v-else>
                <h1 v-html="imageBanner.headline"
                    class="text-center pt-5 fs-1 font-weight-bold font-primary text-light-brown" id="title">
                </h1>
                <p class="text-center px-5 fs-5 font-secondary text-more-light-brown" id="subtitle">
                    {{ imageBanner.subheadline }}
                </p>
                <div class="row justify-content-center p-3 ">
                    <div class="col-lg-6 col-md-6 col-sm-6 p-3 d-flex flex-row-reverse ">
                        <div class="position-relative">
                            <img src="~/assets/img/home-residential.jpg" class="img-fluid img-crop-center" alt="Image 1">
                            <div class="container button-overlay">
                                <nuxt-link to="/development/residential">
                                    <button class="image-button btn btn-primary fs-6 border-2 border-white"
                                        id="image-button">Residential</button>
                                </nuxt-link>
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-6 col-md-6 col-sm-6 p-3 d-flex ">
                        <div class="position-relative">
                            <img src="~/assets/img/home-commercial.jpg" class="img-fluid img-crop-center" alt="Image 1">
                            <div class="container button-overlay">
                                <nuxt-link to="/development/commercial">
                                    <button class="image-button btn btn-primary fs-6 border-2 border-white"
                                        id="image-button">Commercial</button>
                                </nuxt-link>
                            </div>
                        </div>
                    </div>
                </div>
                <h1 class="text-center  fs-5 font-weight-light font-primary text-light-brown">
                    Let’s Explore
                </h1>
                <div class="container text-center d-flex justify-content-center">
                    <!-- Menggunakan nuxt-link untuk navigasi ke halaman Our Facilities -->
                    <nuxt-link to="/facilities"
                        class="px-4 pb-5 pt-3 font-secondary text-more-light-brown font-weight-light"
                        style="text-decoration: none;">Our Facilities</nuxt-link>
                    <!-- Menggunakan nuxt-link untuk navigasi ke halaman Our Access -->
                    <nuxt-link to="/access" class="px-4 pb-5 pt-3 font-secondary text-more-light-brown font-weight-light"
                        style="text-decoration: none;">Our Access</nuxt-link>
                </div>
            </div>
        </div>
    </section>

    <section class="section-3 container-fluid darken-background"
        style="background-position: center center; background-size: cover; position: relative;  height: 600px;">
        <div class="overlay"
            style="position: absolute; top: 0; left: 0; right: 0; bottom: 0; background-color: rgba(0, 0, 0, 0.5); z-index: 1;">
        </div>
        <div class="h-full w-full flex justify-center items-center" style="position: relative; z-index: 2;">
            <div class="masterplan container" style="padding-top: 150px;">
                <div class="text-center">
                    <h1 class="title p-4 font-weight-bold font-primary text-white" id="title">Masterplan</h1>
                    <p class="subtitle p-4 font-secondary text-white" id="subtitle">
                        Harmony in life, learning, recreation, and sports, designed in a neutral landscape and lifestyle
                        in five <br>
                        continent, which is depicted in the design of houses, amusement parks, community centers and
                        gates in <br>
                        each Cluster. That's the City of Tourism.
                    </p>
                    <nuxt-link to="/development/masterplan">
                        <button class="button-home btn btn-primary p-3 font-primary" id="image-button">
                            View Our Masterplan
                        </button>
                    </nuxt-link>
                </div>
            </div>
        </div>
    </section>
    <section class="on-progress py-5">
        <div class="col-lg-8 col-md-8 col-sm-8 mx-auto">
            <h1 class="text-center pt-5 fs-1 font-weight-bold font-primary text-light-brown pb-4">ON PROGRESS
                DEVELOPMENT</h1>
        </div>
        <div class="container-fluid py-2">
            <div class="container">
                <!-- iframe untuk menampilkan video YouTube -->
                <iframe class="youtube" width="100%" height="600" :src="youtubeUrl" frameborder="0"
                    allowfullscreen></iframe>
            </div>
        </div>
    </section>

    <section class="section-4">
        <div class="container-fluid bg-secondary-subtle">
            <div class="container py-5">
                <div class="d-flex justify-content-between align-items-center header-section py-5">
                    <h1 class="m-0 font-weight-bold font-primary" style="color: #17284A;">News & Events</h1>
                    <nuxt-link to="/news"
                        class="font-primary text-decoration-none fs-5 d-none d-sm-block" style="color: #17284A;">Show More
                        ></nuxt-link>
                </div>
                <div v-if="isLoading" class="text-center">
                    <div class="spinner-border" role="status">
                        <span class="visually-hidden">Loading...</span>
                    </div>
                </div>
                <div v-else class="container">
                    <div class="row justify-content-center">
                        <!-- Check if otherNewsEvents is empty -->
                        <!-- If empty, display "Saat ini belum tersedia" -->
                        <!-- Otherwise, display news events -->
                        <div v-if="otherNewsEvents.length === 0" class="col-md-12 text-center">
                            <p class="text-muted">Saat ini belum tersedia</p>
                        </div>
                        <div v-for="(otherEvent, index) in randomOtherEvents" :key="index"
                            class="col-md-4 col-lg-4 col-sm-1 my-2 px-4">
                            <nuxt-link :to="getNewsLink(otherEvent)" class="text-decoration-none text-dark">
                                <div class="row bg-white text-dark">
                                    <div class="col-md-12 col-lg-12">
                                        <div class="ratio ratio-1x1">
                                            <img :src="getImageUrl(otherEvent.article_image)"
                                                class="img-fluid w-100 py-2 img-crop-center" alt="Other Image">
                                        </div>
                                    </div>
                                    <div class="detail col-md-12 col-lg-12 d-flex align-items-center ">
                                        {{ truncateString(otherEvent.article_title, 50) }}
                                    </div>
                                    <div class="date col-md-12 col-lg-12 d-flex align-items-center ">
                                        {{ formatDate(otherEvent.article_date) }}
                                    </div>
                                    <div class="read-more col-md-12 col-lg-12 d-flex align-items-center my-3 ">
                                        Read more
                                    </div>
                                </div>
                            </nuxt-link>
                        </div>
                    </div>
                </div>
                <nuxt-link to="/news"
                    class="font-primary text-decoration-none fs-5 d-flex justify-content-center text-centerd-block d-sm-none text-end pt-3 pb-5 " style="color: #17284A">Show
                    More</nuxt-link>
            </div>
        </div>
    </section>

   

</template>

<script>
import { computed } from 'vue'
import { useRuntimeConfig } from '#app'
import axios from 'axios'
import IndexHome from '../pages/Home/index.vue'


export default {
    name: 'Home',
    components: {
        IndexHome
    },
    setup() {
        const config = useRuntimeConfig()
        const baseUrl = computed(() => config.public.BASE_URL)
        return { baseUrl }
    },
    data() {
        return {
            imageBanner: {},
            metaKeywords: '', // Menyimpan meta keyword dari API
            metaDescription: '', // Menyimpan meta description dari API
            pageTitle: '',
            otherNewsEvents: [],
            youtubeUrl: '',
            isLoading: true // State untuk melacak status loading
        };
    },
    async created() {
        try {
            const imageBannerResponse = await axios.get(`${this.baseUrl}/api/image_banner`);
            this.imageBanner = imageBannerResponse.data.imageBanners[0];
            // Tambahkan data lainnya yang ingin Anda tampilkan dari API di sini
            await this.fetchYoutubeData();
            await this.fetchOtherNewsEvents();
            this.isLoading = false; // Set isLoading ke false setelah data siap
        } catch (error) {
            console.error(error);
        }
    },
    methods: {
        async fetchYoutubeData() {
            try {
                const response = await axios.get(`${this.baseUrl}/api/detail_company`);
                const data = response.data.detailCompany[0];
                this.youtubeUrl = `https://www.youtube.com/embed/${this.extractVideoID(data.co_linkyoutube)}`;
            } catch (error) {
                console.error('Error fetching YouTube data:', error);
            }
        },
        extractVideoID(url) {
            const regExp = /^.*(youtu.be\/|v\/|e\/|u\/\w+\/|embed\/|v=)([^#\&\?]*).*/;
            const match = url.match(regExp);
            return (match && match[2].length == 11) ? match[2] : null;
        },
        getImageUrl(imagePath) {
            // Ubah URL imagePath menjadi URL lengkap untuk digunakan sebagai background image
            return `${this.baseUrl}/storage/` + imagePath;
        },
        async fetchData() {
            try {
                const response = await axios.get(`${this.baseUrl}/api/setting/4`);
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
        async fetchOtherNewsEvents() {
            try {
                // Mengambil data artikel lainnya dari API
                const response = await axios.get(`${this.baseUrl}/api/news_events`);
                this.otherNewsEvents = response.data.newsEvents;
            } catch (error) {
                console.error('Error fetching other news events:', error);
            }
        },
        formatDate(dateString) {
            const date = new Date(dateString);
            return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
        },
        truncateString(text, length) {
            if (text.length > length) {
                return text.substring(0, length) + '...';  // Memotong teks dan menambahkan '...'
            }
            return text;
        },
        getNewsLink(item) {
            return `/news/${item.slug}`; // Mengembalikan URL halaman berita dengan slug yang sesuai
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
    mounted() {
        // Panggil method untuk mengambil data artikel lainnya dari API
        this.fetchData();
    },

    computed: {
        // Mengambil 3 artikel lainnya secara acak
        randomOtherEvents() {
            return this.otherNewsEvents.sort(() => Math.random() - 0.5).slice(0, 3);
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

.position-relative {
    overflow: hidden;
    /* Memastikan bagian gambar yang melewati batas terpotong */
}

.position-relative img {
    filter: brightness(80%);
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

@media screen and (max-width: 576px) {
    .section1 {
        padding-top: 200px !important;
    }

    .masterplan {
        padding-top: 100px !important;
    }

}

.img-crop-center {
    object-fit: cover;
    /* Memotong gambar agar mengisi area container */
    object-position: center;
    /* Memusatkan gambar */
}

.darken-background {
    position: relative;
    height: 870px;
    background-position: center center;
    background-size: cover;
    background-repeat: no-repeat;
}

.darken-background::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: inherit;
    background-image: url('/masterplan-home.png');
    /* Pastikan menggunakan path yang benar */
    background-position: center center;
    background-size: cover;
    background-repeat: no-repeat;
    filter: grayscale(100%);
    z-index: -1;
}

.overlay {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 1;
    /* Pastikan z-index overlay di atas ::before tetapi di bawah konten */
}


.content {
    position: relative;
    z-index: 2;
    /* Ini membuat konten berada di atas overlay */
}

.header-section {
    padding-top: 5rem;
    /* Sesuaikan dengan padding-top yang sebelumnya pada <h1> */
    padding-left: 0.75rem;
    /* Sesuaikan jika perlu */
    padding-right: 0.75rem;
    /* Sesuaikan jika perlu */
}

/* Mengatur link 'Show More' */
.header-section a {
    white-space: nowrap;
    /* Pastikan teks tidak pindah baris */
    display: flex;
    /* Membantu dalam penyesuaian padding dan margin */
    align-items: center;
    /* Vertikal align */
}

@media screen and (max-width: 576px) {
    .header-section {
        flex-direction: column;
        /* Stacking vertikal untuk tampilan mobile */
        align-items: flex-start;
        /* Align items ke kiri */
    }

    .header-section a {
        margin-top: 20px;
        /* Tambahkan margin top untuk memberi ruang antara judul dan link */
        align-self: center;
        /* Pusatkan link pada tampilan mobile */
    }

    .youtube {
        height: 300px;
    }
}
</style>
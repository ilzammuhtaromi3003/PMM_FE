<!-- c:/Users/sutoy/Documents/GitHub/percobaan/pages/index.vue -->
<template>
    <div class="container-fluid bg-secondary-subtle py-4">
        <div class="container">
            <h1 class="text-center m-4 px-5 fs-1">Contact </h1>
            <div class="col-md-8 col-lg-8 col-sm-8 mx-auto">
                <div class="col-md-8 col-lg-8 col-sm-8 mx-auto">
                    <h2 class="description text-center fs-5 fw-light pb-3" id="description">Apakah Anda memiliki
                        pertanyaan atau komentar?
                        Hubungi kami dan tim kami akan menghubungi Anda sesegera mungkin
                    </h2>
                </div>

            </div>
        </div>
    </div>
    <div class="container-fluid py-5">
        <div class="container col-lg-6 col-md-6 col-sm-6 mx-auto">
            <form class="row g-3">
                <div class="col-12">
                    <div class="form-check">
                        <input class="form-check-input" type="checkbox" id="gridCheck"
                            v-model="formData.residentStatus">
                        <label class="form-check-label text-light-brown font-secondary" for="gridCheck">
                            Penghuni Permata Mutiara Maja
                        </label>
                    </div>
                </div>

                <div class="col-12">
                    <label for="form-name" class="form-label text-light-brown font-secondary">Name</label>
                    <input type="text" class="form-control" id="form-name" v-model="formData.name">
                </div>
                <div class="col-md-6">
                    <label for="form-email" class="form-label text-light-brown font-secondary">Email</label>
                    <input type="email" class="form-control" id="form-email" v-model="formData.email">
                </div>
                <div class="col-md-6">
                    <label for="Phone Number" class="form-label text-light-brown font-secondary">Phone Number</label>
                    <input type="text" class="form-control" id="Phone Number" v-model="formData.phoneNumber">
                </div>
                <div class="form-group">
                    <label for="exampleFormControlTextarea1" class="text-light-brown font-secondary">Message</label>
                    <textarea class="form-control" id="exampleFormControlTextarea1" rows="7"
                        v-model="formData.message"></textarea>
                </div>
                <div class="col-12 d-grid">
                    <button type="button" class="button-submit btn btn-primary btn-lg"
                        @click="submitForm">Submit</button>
                </div>
            </form>
        </div>
    </div>
    <div class="map container-fluid" id="location">
        <div class="container-fluid">
            <iframe
            :src="googleMap"
            width="100%" height="100%" style="border:0;" allowfullscreen="false" loading="lazy"
            referrerpolicy="no-referrer-when-downgrade"></iframe>
        </div>
    </div>
    <div class="container-fluid " style="background-color: #0E406D;">
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

</template>

<script>
import { computed } from 'vue'
import { useRuntimeConfig } from '#app'
import axios from 'axios'

export default {
    name: 'Contact',
    setup() {
        const config = useRuntimeConfig()
        const baseUrl = computed(() => config.public.BASE_URL)
        return { baseUrl }
    },
    data() {
        return {
            metaKeywords: '', // Menyimpan meta keyword dari API
            metaDescription: '', // Menyimpan meta description dari API
            pageTitle: '',
            aboutData: null,
            googleMap: '',
            formData: {
                name: '',
                email: '',
                phoneNumber: '',
                message: '',
                residentStatus: false
            },
        };
    },
    mounted() {
        this.fetchAboutData();
    },
    methods: {
        async submitForm() {
            try {
                await axios.post(`${this.baseUrl}/api/send-email`, this.formData);
                alert('Your message has been sent successfully!');
            } catch (error) {
                console.error('Error sending form data:', error);
                alert('Failed to send message.');
            }
        },
        async fetchAboutData() {
            try {
                // Ambil data about dari API about
                const responseAbout = await fetch(`${this.baseUrl}/api/about`);
                const dataAbout = await responseAbout.json();
                this.aboutData = dataAbout.aboutCompanies[0];

                // Ambil data co_linkyoutube dari API detail_company
                const responseDetail = await fetch(`${this.baseUrl}/api/detail_company`);
                const dataDetail = await responseDetail.json();
                const detailCompany = dataDetail.detailCompany[0];

                this.googleMap = detailCompany.co_google_map;
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        },
        async fetchContactUsData() {
            try {
                const response = await axios.get(`${this.baseUrl}/api/setting/3`);
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
#element::after {
    content: "";
    display: block;
    width: 20%;
    height: 1px;
    background-color: #595959;
    margin: 10px auto;
}

.button-submit {
    background-color: #345D89;
}

#location iframe {
    height: 600px;
}

@media screen and (max-width : 576px) {
    #location iframe {
        height: 300px;
    }

}
</style>
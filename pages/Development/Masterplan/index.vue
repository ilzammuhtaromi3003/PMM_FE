<template>
    <div class="container-fluid bg-secondary-subtle p-5">
        <div class="container border ">
            <!-- Judul "Commercial" -->
            <h1 class="text-center py-4 border fs-1 ">Masterplan</h1>

            <h3 class="m-5" id="element"></h3>
            <!-- Judul "Cluster" -->

            <!-- Grid column -->
            <div class="row justify-content-center border ">
                <div class="">
                    <div class="position-relative">
                        <img src="~/assets/img/masterplan.png" class="img-fluid w-100" alt="Image 1">
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

    name: 'Masterplan',
    data() {
        return {
            metaKeywords: '', // Menyimpan meta keyword dari API
            metaDescription: '', // Menyimpan meta description dari API
            pageTitle: ''
        };
    },
    method:{
        async fetchData() {
            try {
                const response = await axios.get(`${this.baseUrl}/api/setting/5`);
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

#element::after {
    content: "";
    display: block;
    width: 20%;
    height: 1px;
    background-color: #595959;
    margin: 10px auto;
}
</style>
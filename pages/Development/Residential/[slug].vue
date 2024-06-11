<template>
  <div class="container-fluid bg-secondary-subtle">
    <h1 class="text-center p-5 fs-1 text-center-mobile custom-title">{{ development ? development.dev_name :
      'Loading...' }}</h1>
    <div class="col-md-8 col-lg-8 col-sm-8 mx-auto">
      <h2 class="text-center px-5 mx-5 fs-5 pb-5" id="description">{{ development ? development.dev_description :
        'Loading...' }}</h2>
    </div>
    <div class="col-md-6 col-lg-6 col-sm-6 mx-auto d-grid pb-5">
      <button @click="scrollToInformation" type="button"
        class="button-submit btn btn-primary btn-lg d-grid gap-2 col-6 mx-auto font-secondary fs-5 fw-bold text-button">
        Get more information
      </button>
    </div>
  </div>

  <!-- Bagian navigasi type -->
  <section v-if="development && development.unit_types && development.unit_types.length > 0"
  class="section-button pb-3 d-md-none d-lg-block d-sm-none d-md-block ">
  <div class="container d-none d-sm-block py-5">
    <nav class="permata-navbar navbar navbar-expand-lg col-md-8 mx-auto" style="background-color: #345D89;">
      <div class="container">
        <div class="collapse navbar-collapse">
          <ul class="navbar-nav mx-auto">
            <li v-for="unit in development.unit_types" :key="unit.id" :class="{ 'active-unit': activeUnit && activeUnit.id === unit.id }" class="nav-item px-4">
              <a @click="fetchUnitData(unit.id)" class="nav-link fw-bolder font-secondary text-white" style="cursor: pointer;">{{ unit.unit_title }}</a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  </div>
</section>


<section v-if="development && development.unit_types && development.unit_types.length > 0"
  class="section-button py-3 d-lg-none d-xl-block d-xl-none d-xxl-block d-xxl-none">
  <div class="container">
    <div class="col-md-8 col-lg-8 col-sm-8 text-center mx-auto position-relative">
      <div class="dropdown select-type-container">
        <button class="btn btn-primary dropdown-toggle select-type-button" style="background-color: #345D89;" type="button"
          data-bs-toggle="dropdown" aria-expanded="false">
          Select Type
        </button>
        <ul class="dropdown-menu select-type position-absolute">
          <li v-for="unit in development.unit_types" :key="unit.id">
            <a @click="fetchUnitData(unit.id)" class="dropdown-item select-type-content">{{ unit.unit_title }}</a>
          </li>
        </ul>
      </div>
    </div>
  </div>
</section>

  <!-- Menggunakan CarouselComponent -->
  <CarouselComponent :development="development" :activeUnit="activeUnit" />

  <!-- Bagian Floor Plan -->
  <section v-if="development && activeUnit && activeUnit.unit_floorplan" class="section-content py-2">
    <div class="container">
      <div class="col-lg-8 col-md-8 col-sm-8 mx-auto">
        <h1 class="font-primary text-blue-light fs-1 fw-normal py-4">Floor Plan</h1>
        <div class="col-12 mx-auto">
          <img :src="`${this.baseUrl}/storage/` + activeUnit.unit_floorplan" class="img-fluid w-100" alt="">
        </div>
      </div>
    </div>
  </section>

  <!-- Bagian Spesifikasi Unit -->
  <section v-if="development && activeUnit && activeUnit.unit_spec" class="section-content py-5">
    <div class="container">
      <div class="col-lg-8 col-md-8 col-sm-8 mx-auto">
        <h1 class="font-primary text-blue-light fs-1 fw-normal py-4">Specifications</h1>
        <div v-html="activeUnit.unit_spec" class="justify-content-center font-secondary fw-light fs-6"></div>
      </div>
    </div>
  </section>

  <!-- Bagian Form Informasi -->
  <section ref="informationSection" class="section-information">
    <div class="container-fluid bg-secondary-subtle py-5">
      <div class="container col-lg-6 col-md-6 col-sm-6 mx-auto">
        <h1 class="font-primary text-blue-light fs-1 fw-normal py-4 text-center">Get More Information</h1>
        <h3 class="font-secondary fw-light fs-6 pb-4 text-center">Permata Mutiara Maja will never sell or share your information with a third party</h3>
        <form @submit.prevent="submitForm" class="col-lg-8 col-md-8 col-sm-8 mx-auto">
          <div class="my-2">
            <label for="form-name" class="form-label">Name <span class="required">*</span></label>
            <input type="text" class="form-control" id="form-name" v-model="formData.name">
          </div>
          <div class="my-2">
            <label for="mail-to" class="form-label">Email</label>
            <input type="email" class="form-control" id="mail-to" v-model="formData.email">
          </div>
          <div class="my-2">
            <label for="phone-number" class="form-label">No.HP/WhatsApp<span class="required">*</span></label>
            <input type="text" class="form-control" id="phone-number" v-model="formData.phone">
          </div>
          <div class="form-group my-2">
            <label for="exampleFormControlTextarea1" class="form-label">Message</label>
            <textarea class="form-control" id="exampleFormControlTextarea1" v-model="formData.message" rows="7"></textarea>
          </div>
          <div class="d-grid gap-2 d-md-flex justify-content-md-end pt-5">
            <button type="submit" class="button-submit btn btn-primary btn-lg">Submit</button>
          </div>
        </form>
      </div>
    </div>
  </section>
</template>

<script>
import { computed } from 'vue'
import { useRuntimeConfig } from '#app'
import axios from 'axios'
import CarouselComponent from '~/components/CarouselComponent.vue'

export default {
  setup() {
    const config = useRuntimeConfig()
    const baseUrl = computed(() => config.public.BASE_URL)
    console.log('Base URL:', baseUrl.value)  // Debugging
    return { baseUrl }
  },
  

  name: 'ResidentialDetail',
  components: {
    CarouselComponent
  },
  data() {
    return {
      development: null,
      activeUnit: null, // Menyimpan data unit yang sedang aktif
      metaKeywords: '', // Menyimpan meta keyword dari API
      metaDescription: '', // Menyimpan meta description dari API
      pageTitle: '',
      formData: {
        name: '',
        email: '',
        phone: '',
        message: ''
      }
    }
  },
  created() {
    console.log('Created Hook')  // Debugging
    this.fetchDevelopment();
    this.fetchData();
  },
  methods: {
    fetchDevelopment() {
      const developmentSlug = this.$route.params.slug;
      console.log('Fetching Development:', developmentSlug)  // Debugging
      fetch(`${this.baseUrl}/api/development/unit-galleries-and-types/${developmentSlug}`)
        .then(response => response.json())
        .then(data => {
          console.log('Development Fetched:', data)  // Debugging
          this.development = data.development;
          if (this.development && this.development.unit_types && this.development.unit_types.length > 0) {
            this.activeUnit = this.development.unit_types[0];
          }
        })
        .catch(error => {
          console.error('Error fetching data:', error);
        });
    },
    fetchUnitData(unitId) {
      console.log('Fetching Unit Data:', unitId)  // Debugging
      this.activeUnit = this.development.unit_types.find(unit => unit.id === unitId);
    },
    async fetchData() {
      try {
        const response = await axios.get(`${this.baseUrl}/api/setting/9`);
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
    submitForm() {
      console.log('Submitting Form:', this.formData)  // Debugging
      axios.post(`${this.baseUrl}/api/project/submit`, this.formData)
        .then(response => {
          if (response.data.status === 'success') {
            alert('Information submitted successfully!');
            this.formData = { name: '', email: '', phone: '', message: '' }; // Clear form
          } else {
            alert(`Error: ${response.data.message}`); // Handle non-success responses
          }
        })
        .catch(error => {
          console.error('Submission failed:', error.response);
          if (error.response && error.response.data && error.response.data.message) {
            alert(`Error: ${error.response.data.message}`);
          } else {
            alert('An unknown error occurred.');
          }
        });
    },
    scrollToInformation() {
      const infoSection = this.$refs.informationSection;
      if (infoSection) {
        infoSection.scrollIntoView({ behavior: 'smooth' });
      }
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
}
</script>

<style scoped>
.button-submit {
  background-color: #345D89;
}

@media screen and (max-width: 576px) {
  .text-button {
    font-size: 12px !important;
  }
}

.custom-title::first-letter {
  text-transform: uppercase;
}

.required {
  color: red;
}
/* Tambahkan kelas ini ke dalam style scoped atau global CSS Anda */
/* Tambahkan kelas ini ke dalam style scoped atau global CSS Anda */
.active-unit .nav-link {
  color: #ffffff; /* Warna teks yang berbeda untuk item yang aktif */
  font-size: 18px;
}

.select-type-container {
  width: 100%; /* Atur container dropdown agar mengambil lebar penuh */
}

.select-type-button {
  width: 100%; /* Atur lebar tombol dropdown agar sesuai dengan container */
}

.select-type {
  background-color: #345D89;
  border-radius: 6px;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  width: 100%; /* Atur lebar dropdown agar sesuai dengan container */
}

.select-type-content {
  color: white !important;
  width: 100%; /* Atur lebar konten dropdown agar sesuai dengan dropdown */
  text-align: center;
}

</style>

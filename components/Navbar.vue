<!-- c:/Users/sutoy/Documents/GitHub/percobaan/components/Navbar.vue -->

<template>
  <div class="container wrapper-navbar" style="margin-bottom: 60px;">
    <nav class="navbar navbar-expand-lg bg-white fixed-top">
      <div class="container ">
        <div class="logo-wrapper">
          <nuxt-link class="nav-link active" aria-current="page" to="/" @click="closeNavbar"><img
            :src="getImageUrl(detailCompany.logo_header)" class="logo img-fluid" style="width: 200px" alt=""></nuxt-link>
        </div>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown"
          aria-controls="navbarNavDropdown" aria-expanded="isNavbarOpen" aria-label="Toggle navigation" @click="isNavbarOpen = !isNavbarOpen">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" :class="{'show': isNavbarOpen}" id="navbarNavDropdown">
          <ul class="navbar-nav">
            <li class="nav-item px-1">
              <nuxt-link class="nav-link active fw-medium" aria-current="page" to="/"  @click="closeNavbar">Home</nuxt-link>
            </li>
            <li class="nav-item dropdown px-1">
              <a class="nav-link dropdown-toggle fw-medium" href="#" role="button" data-bs-toggle="dropdown"
                aria-expanded="false" @click="toggleAboutNavbar">
                About Us
              </a>
              <ul class="permata dropdown-menu wrapper-dropdown" v-if="showAboutNavbar">
                <nuxt-link class="nav-link fw-medium" to="/about" @click="closeNavbar">About Us</nuxt-link>
                <nuxt-link class="nav-link fw-medium" to="/access" @click="closeNavbar">Access</nuxt-link>
              </ul>
            </li>
            <li class="nav-item dropdown px-1">
              <a class="nav-link dropdown-toggle fw-medium" href="#" role="button" data-bs-toggle="dropdown"
                aria-expanded="false" @click="togglePermataNavbar">
                Developments
              </a>
              <ul class="permata dropdown-menu wrapper-dropdown" v-if="showPermataNavbar">
                <nuxt-link class="nav-link fw-medium" to="/development/residential" @click="closeNavbar">Residential</nuxt-link>
                <nuxt-link class="nav-link fw-medium" to="/development/commercial" @click="closeNavbar">Commercial</nuxt-link>
                <nuxt-link class="nav-link fw-medium" to="/development/masterplan" @click="closeNavbar">Masterplan</nuxt-link>
              </ul>
            </li>
            <li class="nav-item px-1">
              <nuxt-link class="nav-link fw-medium" to="/facilities" @click="closeNavbar">Facilities</nuxt-link>
            </li>
            <li class="nav-item px-1">
              <nuxt-link class="nav-link fw-medium" to="/news" @click="closeNavbar">News & Events</nuxt-link>
            </li>
            <li class="nav-item px-1">
              <nuxt-link class="nav-link fw-medium" to="/career" @click="closeNavbar">Career</nuxt-link>
            </li>
            <li class="contact p-1">
              <nuxt-link class="button btn text-white" to="/contact" @click="closeNavbar">Contact Us</nuxt-link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  </div>

  <nav v-if="showPermataNavbar" class="permata-navbar navbar navbar-expand-lg d-none d-lg-block"
    style="margin-top: 68px; background-color: #0A2E4F;">
    <div class="container">
      <div class="collapse navbar-collapse">
        <ul class="navbar-nav mx-auto">
          <li class="nav-item px-4">
            <nuxt-link class="nav-link fw-medium font-secondary text-white"
              to="/development/residential" @click="closePermataNavbar">Residential</nuxt-link>
          </li>
          <li class="nav-item px-5">
            <nuxt-link class="nav-link fw-medium font-secondary text-white"
              to="/development/commercial" @click="closePermataNavbar">Commercial</nuxt-link>
          </li>
          <li class="nav-item px-5">
            <nuxt-link class="nav-link fw-medium font-secondary text-white"
              to="/development/masterplan" @click="closePermataNavbar">Masterplan</nuxt-link>
          </li>
        </ul>
      </div>
    </div>
  </nav>
  <nav v-if="showAboutNavbar" class="permata-navbar navbar navbar-expand-lg d-none d-lg-block"
    style="margin-top: 68px; background-color: #0A2E4F;">
    <div class="container">
      <div class="collapse navbar-collapse">
        <ul class="navbar-nav mx-auto">
          <li class="nav-item px-4">
            <nuxt-link class="nav-link fw-medium font-secondary text-white"
              to="/about" @click="closeAboutNavbar">About Us</nuxt-link>
          </li>
          <li class="nav-item px-5">
            <nuxt-link class="nav-link fw-medium font-secondary text-white"
              to="/access" @click="closeAboutNavbar">Access</nuxt-link>
          </li>
        </ul>
      </div>
    </div>
  </nav>

</template>

<script>
import { computed } from 'vue'
import { useRuntimeConfig } from '#app'

export default {
  setup() {
    const config = useRuntimeConfig()
    const baseUrl = computed(() => config.public.BASE_URL)
    return { baseUrl }
  },
  name: 'NavbarItem',
  data() {
    return {
      showPermataNavbar: false,
      showAboutNavbar: false,
      detailCompany: {},
      isNavbarOpen: false, // Untuk mengontrol status pembukaan navbar
    }
  },
  created() {
    this.fetchDetailCompany();
  },
  methods: {
    closePermataNavbar() {
    this.showPermataNavbar = false;
  },
  togglePermataNavbar() {
    this.showPermataNavbar = !this.showPermataNavbar;
    if (this.showPermataNavbar) { // Ketika showPermataNavbar diaktifkan
      this.showAboutNavbar = false; // Matikan showAboutNavbar
    }
  },
  closeAboutNavbar() {
    this.showAboutNavbar = false;
  },
  toggleAboutNavbar() {
    this.showAboutNavbar = !this.showAboutNavbar;
    if (this.showAboutNavbar) { // Ketika showAboutNavbar diaktifkan
      this.showPermataNavbar = false; // Matikan showPermataNavbar
    }
  },
  closeNavbar() {
    this.isNavbarOpen = false; // Menutup navbar utama
    this.showPermataNavbar = false; // Menutup navbar dropdown 'Permata'
    this.showAboutNavbar = false; // Menutup navbar dropdown 'About'
  },
    fetchDetailCompany() {
      fetch(`${this.baseUrl}/api/detail_company`)
        .then(response => response.json())
        .then(data => {
          if (data.detailCompany && data.detailCompany.length > 0) {
            this.detailCompany = data.detailCompany[0];
          }
        })
        .catch(error => console.error('Error fetching detail company:', error));
    },
    getImageUrl(imagePath) {
      return imagePath ? `${this.baseUrl}/storage/${imagePath}` : ''; // Menyediakan URL lengkap untuk gambar
    }
  }


}
</script>

<style scoped>
.navbar-nav .nav-link {
  font-size: 16px;
  color: black;
  /* Warna teks font menjadi #595959 */
}

.logo {
  display: block;
  max-width: 100%;
  height: auto;
}

.contact {
  background-color: #0E406D;
  border-radius: 6px;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
}

.permata-navbar {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 1000;

}

@media (max-width: 992px) {
  .permata.dropdown-menu {
    display: block !important;
    /* Menampilkan dropdown pada ukuran layar tertentu */
  }
  .wrapper-navbar{
    margin-bottom: 50px !important;
  }
}
@media screen and (max-width: 576px) {
  .wrapper-navbar{
    margin-bottom: 50px !important;
  }
}

.wrapper-dropdown{
  border:none;
}
.navbar {
  display: flex;
  justify-content: space-between; /* Menyebarkan konten ke kiri dan kanan */
  align-items: center; /* Menyelaraskan item secara vertikal */
}


.navbar-collapse {
  flex-grow: 2; /* Navigasi mengambil ruang yang lebih besar di sisi kanan */
  justify-content: flex-end; /* Menempatkan item navigasi di pojok kanan */
}


</style>

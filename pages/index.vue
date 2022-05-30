<template>
  <section>

    <div class="drawer">
      <input id="my-drawer" type="checkbox" class="drawer-toggle"/>
      <div class="drawer-content">
        <!-- Page content here -->

        <!--Hero Section-->
        <div class="bg-daraz-dark text-light-blue min-w-screen h-[600px] 2xl:h-[650px]">
          <!--shows logo & app drawer-->
          <TopBar/>
          <HeroSection/>
          <Slide/>
        </div>

        <!--application section-->
        <ApplicationSection/>

        <!--other things we do-->
        <other-work></other-work>
        <!--footer-->
        <Footer/>

      </div>

      <div class="drawer-side">
        <label for="my-drawer" class="drawer-overlay"></label>
        <ul class="menu p-4 overflow-y-auto w-64 md:w-80 bg-base-100 text-base-content">
          <!-- Sidebar content here -->
          <li>
            <NuxtLink to="/">Home</NuxtLink>
          </li>

          <li v-if="isLoggedIn">
            <NuxtLink to="/applications/create">Add New</NuxtLink>
          </li>

          <hr class="mt-2">

          <li>
            <NuxtLink v-if="!isLoggedIn" to="/login">Login</NuxtLink>
            <span v-else @click="logout">Logout</span>
          </li>

        </ul>
      </div>
    </div>

  </section>


</template>

<script>

import TopBar from "@/components/front-page/TopBar";
import HeroSection from "@/components/front-page/HeroSection";
import Slide from "@/components/front-page/Slide";
import ApplicationSection from "@/components/front-page/ApplicationSection";
import OtherWork from "@/components/front-page/other-work";
import Footer from "@/components/front-page/Footer";

export default {
  name: "IndexPage",
  layout: 'FrontPageLayout',
  components: {TopBar, Slide, HeroSection, ApplicationSection, OtherWork, Footer},

  computed: {
    isLoggedIn() {
      return this.$store.state.auth.authToken
    },
  },

  methods: {
    logout() {
      this.dropdownProfile = false

      this.$store.dispatch('auth/logout')
    },
  },
};
</script>

<style scoped>
.menu :where(li:not(.menu-title):not(:empty)) > :where(:not(ul).active), .menu :where(li:not(.menu-title):not(:empty)) > :where(*:not(ul):active) {
  background-color: #3F0686;
  color: #FFFFFF;
}
</style>

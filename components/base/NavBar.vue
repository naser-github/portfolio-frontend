<template>

  <div class="px-4 md:px-40 2xl:px-64 py-4 navbar bg-base-100">
    <div class="navbar-start">
      <div class="dropdown">
        <label tabindex="0" class="btn btn-ghost lg:hidden">
          <NuxtLink to="/">
            <img :src="require('~/assets/image/sharingan.svg')" class="w-24" alt="Logo"/>
          </NuxtLink>
        </label>
        <!--        <ul tabindex="0" class="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">-->
        <!--          <li><a>Item 1</a></li>-->
        <!--          <li tabindex="0">-->
        <!--            <a class="justify-between">-->
        <!--              Parent-->
        <!--              <svg class="fill-current" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">-->
        <!--                <path d="M8.59,16.58L13.17,12L8.59,7.41L10,6L16,12L10,18L8.59,16.58Z"/>-->
        <!--              </svg>-->
        <!--            </a>-->
        <!--            <ul class="p-2">-->
        <!--              <li><a>Submenu 1</a></li>-->
        <!--              <li><a>Submenu 2</a></li>-->
        <!--            </ul>-->
        <!--          </li>-->
        <!--          <li><a>Item 3</a></li>-->
        <!--        </ul>-->
      </div>
      <NuxtLink to="/">
        <img :src="require('~/assets/image/sharingan.svg')" class="w-24 invisible md:visible" alt="Logo"/>
      </NuxtLink>
    </div>

    <div class="navbar-end">
      <div class="navbar-center lg:flex">
        <ul class="menu menu-horizontal dropdown-end p-0">
          <li>
            <label tabindex="0" class="btn btn-circle btn-ghost">
              <div class="avatar">
                <div class="w-10 rounded-xl">
                  <img :src="require('~/assets/image/avatar.jpg')" alt=""/>
                </div>
              </div>
            </label>
            <ul tabindex="0" class="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-32 md:w-52">
              <li>
                <span class="justify-between"> Profile </span>
              </li>
              <li>
                <span class="justify-between" @click="logout"> Logout </span>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </div>

  </div>
</template>

<script>
export default {
  computed: {
    isLoggedIn() {
      return this.$store.state.auth.authToken
    },

    userName() {
      return this.$store.state.auth.userName
    },
  },
  methods: {
    logout() {
      this.$store.dispatch('auth/logout')
    },
  },
}
</script>

<style scoped>
.menu :where(li:not(.menu-title):not(:empty)) > :where(:not(ul).active), .menu :where(li:not(.menu-title):not(:empty)) > :where(*:not(ul):active) {
  background-color: #3F0686;
  color: #FFFFFF;
}
</style>

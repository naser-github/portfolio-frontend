<template>
  <section>
    <div>
      <img :src="require('~/assets/image/daraz.svg')" class="w-24 xl:w-28 mx-auto" alt="Logo"/>
      <p class="my-4 text-lg md:text-2xl font-extrabold text-dark-blue">Enter your credential</p>
    </div>

    <form @submit.prevent="onSubmit">
      <!-- email -->
      <div class="my-3 form-control">
        <input v-model.trim="email" type="email" placeholder="email" required
               class="input input-bordered focus:outline-none focus:border-dark-blue  focus:ring-1 focus:ring-dark-blue w-full max-w-xs"/>
      </div>


      <!-- password -->
      <div class="my-3 form-control">
        <input v-model.trim="password" type="password" placeholder="password" required
               class="input input-bordered focus:outline-none focus:border-dark-blue  focus:ring-1 focus:ring-dark-blue w-full max-w-xs"/>
      </div>

      <!-- check box -->
      <div class="form-control">
        <label class="label cursor-pointer">
          <span class="label-text">Remember me</span>
          <input v-model="rememberMe" type="checkbox" checked="checked" class="checkbox"/>
        </label>
      </div>

      <button class="my-3 btn btn-wide w-full bg-dark-blue hover:bg-daraz">Log in</button>

    </form>
  </section>
</template>

<script>
export default {
  layout: 'LoginLayout',
  middleware: 'isLogged',

  data() {
    return {
      email: '',
      password: '',
      rememberMe: false,
    }
  },

  methods: {
    onSubmit() {
      this.$store
        .dispatch('auth/login', {
          email: this.email,
          password: this.password,
          rememberMe: this.rememberMe,
        })
        .then(() => {
          this.$router.replace('/')
        })
        .catch(() => {
          this.$toast.show({
            type: 'danger',
            title: 'Error',
            message: 'wrong username or password !!',
          })
        })
    },
  },
}
</script>

<style>
</style>

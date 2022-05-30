<template>
  <div>
    <NavBar/>
    <main>
      <Nuxt/>
    </main>
  </div>

</template>
<script>
import NavBar from "@/components/base/NavBar";

export default {
  name: 'DefaultLayout',
  components: {NavBar},
}
</script>

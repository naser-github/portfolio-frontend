<template>
  <div class="py-16 mx-4 md:mx-32 2xl:mx-64">
    <div class="space-y-4"><h2 class="text-lg font-bold sm:text-xl">Application List</h2>
      <div class="mx-8 grid gap-4 sm:grid-cols-2 md:grid-cols-4">
        <div v-for="app in applications.data" :key="app.id" class="relative block group">
          <label :for="app.id" class="modal-button">
            <span class="absolute inset-0 border-2 border-black border-dashed rounded-lg" aria-hidden="true"></span>
            <div
              class="transition bg-white border-2 border-black rounded-lg group-hover:-translate-x-2 group-hover:-translate-y-2">
              <div class="p-6">
                <img
                  class="w-8 h-8"
                  :src="backendUrl + app.application_thumbnail"
                  alt="logo"
                />
                <p class="mt-4 text-lg font-medium">{{ app.application_name }}</p>
                <p class="mt-1 text-xs">{{ app.application_summary.substring(0, 30) + "......." }}</p></div>
            </div>
          </label>

          <!-- Put this part before </body> tag -->
          <input type="checkbox" :id="app.id" class="modal-toggle"/>
          <label :for="app.id" class="modal cursor-pointer">
            <label class="modal-box relative W-11/12 h-3/4 max-w-5xl">
              <label :for="app.id" class="btn btn-sm btn-circle absolute right-2 top-2">✕</label>

              <div class="grid grid-cols-3 mx-12 mt-12">
                <div class="col-span-2">
                  <h1 class="mt-8 font-bold text-3xl md:text-5xl">{{ app.application_name }}</h1>

                  <div class="my-6 text-base font-bold flex items-center justify-center lg:justify-start">
                    <NuxtLink :to="'applications/'+app.id+'/edit'"
                              class="inline-block mx-2 p-[2px] rounded-full bg-gradient-to-r from-purple-500 to-orange-500 hover:text-white active:text-opacity-75 focus:outline-none focus:ring"
                    >
                      <span class="block px-8 py-1 text-sm font-medium bg-white rounded-full hover:bg-transparent">
                        Edit
                      </span>
                    </NuxtLink>
                  </div>
                </div>
                <div>
                  <img :src="backendUrl + app.application_thumbnail"
                       class="w-32 h-32"
                  />
                </div>

                <div class="col-span-3">
                  <p class="pt-8 text-sm break-all">
                    {{ app.application_body }}
                  </p>
                </div>
              </div>

            </label>
          </label>
        </div>
      </div>

      <pagination class="flex justify-end" :data="applications" @pagination-change-page="getResults">
        <template #prev-nav>
          <span>&lt;</span>
        </template>

        <template #next-nav>
          <span>&gt;</span>
        </template>
      </pagination>
    </div>
  </div>
</template>

<script>
export default {

  data() {
    return {
      backendUrl: process.env.backendUrl,
      applications: {},
    }
  },

  created() {
    // paginate function
    this.getResults()
  },

  methods: {
    getResults(page = 1) {
      this.$axios.$get('/applications?page=' + page)
        .then(response => {
          this.applications = response.application;
        })
        .catch((err) => console.error(err))
    }
  },
}
</script>

<template>

  <div class="mt-2 md:mt-10 mx-4 md:mx-56 2xl:mx-80">
    <form files="true" enctype="multipart/form-data" @submit.prevent="onSubmit">
      <div class="shadow-xl overflow-hidden sm:rounded-md">

        <p class="mx-4 mt-8 my-4 font-bold">
          Application Create Form
        </p>
        <hr class="ml-6 mr-4 border-b-2 border-grey-200"/>

        <div class="px-4 py-5 bg-white sm:p-6">
          <div class="grid grid-cols-6 gap-6">

            <!-- application name -->
            <div class="col-span-6 md:col-span-3">
              <label for="title" class="block text-sm font-medium text-gray-700">Application Name</label>
              <input type="text" v-model.trim="title" id="title" autocomplete="given-name"
                     class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                     required
              >
            </div>

            <!-- Website link -->
            <div class="col-span-6 md:col-span-3">
              <label for="website" class="block text-sm font-medium text-gray-700">Website Address</label>
              <input type="text" v-model.trim="website" id="website" autocomplete="website"
                     class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
              >
            </div>

            <!-- thumbnail -->
            <div class="col-span-6 md:col-span-4">
              <label for="thumbnail" class="block text-sm font-medium text-gray-700">Thumbnail</label>
              <input type="file" id="thumbnail" ref="fileInput" accept=".jpg,.jpeg,.png,.svg"
                     class="mt-1 bg-gray-200 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                     @change="getThumbnail()" required
              >
            </div>

            <!--show uploaded image-->

            <div v-if="thumbnailPreview" class="col-span-2 md:col-span-6">
              <div class="flex justify-center">
                <img
                  class="object-cover w-24 h-auto my-4 rounded-t-lg md:rounded-none md:rounded-l-lg"
                  :src="thumbnailPreview" alt="invalid url" @click="chooseFile"
                />
              </div>
            </div>

            <!-- application status -->
            <div class="col-span-4 md:col-span-3">
              <label for="status" class="block text-sm font-medium text-gray-700">Application Status</label>
              <select id="status" v-model.trim="status" autocomplete="country"
                      class="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                <option value="live" selected>Live</option>
                <option value="ongoing">Ongoing</option>
              </select>
            </div>

            <!--applications-->
            <div class="col-span-6">
              <label for="app_body" class="block text-sm font-medium text-gray-700">
                Application Body
              </label>

              <textarea id="app_body" v-model.trim="app_body" rows="4"
                        class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
              />
            </div>

            <!-- summary -->
            <div class="col-span-6">
              <label for="summary" class="block text-sm font-medium text-gray-700">
                Application Summary
              </label>

              <textarea type="text" v-model.trim="summary" id="summary"
                        class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                        required
              />
            </div>
          </div>
        </div>

        <div class="px-4 py-3 bg-gray-50 text-right sm:px-6">
          <button type="submit"
                  class="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-dark-blue hover:bg-dark-blue focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
            Save
          </button>
        </div>
      </div>
    </form>
  </div>

</template>

<script>
export default {

  middleware: 'isAuthorized',

  data() {
    return {
      title: '',
      website: '',
      summary: '',
      app_body: '',
      status: 'live',
      thumbnail: '',
      thumbnailPreview: '',
      photos: [],
      error: 0,
    }
  },

  computed: {
    token() {
      return this.$store.state.auth.authToken
    },
  },

  methods: {

    getThumbnail() {
      this.thumbnail = this.$refs.fileInput.files[0]

      if (this.thumbnail.size > 3072000) {
        this.$toast.show({
          type: 'danger',
          title: 'Error',
          message: 'file size exceeded!!',
        })
        this.thumbnail = ''
      }
      this.preview();
    },

    chooseFile() {
      this.$refs.fileInput.click()
    },
    preview() {
      let fileInput = this.$refs.fileInput
      let imgFile = fileInput.files

      if (imgFile && imgFile[0]) {
        let reader = new FileReader
        reader.onload = e => {
          this.thumbnailPreview = e.target.result
        }
        reader.readAsDataURL(imgFile[0])
        this.$emit('fileInput', imgFile[0])
      }
    },


    onSubmit() {
      this.$store
        .dispatch('application/createApp', {
          title: this.title,
          website: this.website,
          summary: this.summary,
          app_body: this.app_body,
          status: this.status,
          thumbnail: this.thumbnail,
          token: this.token,
        })
        .then(() => {
          this.$toast.show({
            type: 'success',
            title: 'Success',
            message: 'application has been added',
          })
          this.$router.push('/')
        })
        .catch(() => {
          this.$toast.show({
            type: 'danger',
            title: 'Error',
            message: 'Something went wrong!!!',
          })
        })
    },
  },
}
</script>


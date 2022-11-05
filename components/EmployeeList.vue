<script>
export default {
  name: 'EmployeeList',
  data: () => ({
    input: '',
    posts: [],
    items: [
      {
        label: 'Update',
        icon: 'pi pi-refresh',
      },
      {
        label: 'Delete',
        icon: 'pi pi-times',
      },
      {
        label: 'Vue Website',
        icon: 'pi pi-external-link',
        command: () => {
          window.location.href = 'https://vuejs.org/'
        },
      },
      {
        label: 'Upload',
        icon: 'pi pi-upload',
        command: () => {
          window.location.hash = '/fileupload'
        },
      },
    ],
  }),
  computed: {
    searchedProducts() {
      return this.posts.filter((product) => {
        return (product.jobType.toLowerCase().includes('Archyvas'))
      })
    },
  },

  async mounted() {
    const client = useSupabaseClient()
    const { data, error } = await client
      .from('posts')
      .select('id, name, phone, jobType, classroom, photo')
      .filter('jobType', 'in', '("Archyvas")')

    if (error) {
      console.error(error)
      alert('Unable to fetch records!')
    }
    else {
      this.posts = data
    }
  },
  methods: {
    onChange(input) {
      this.input = input
    },
    onKeyPress(button) {
      // eslint-disable-next-line no-console
      console.log('button', button)
    },
    onInputChange(input) {
      this.input = input.target.value
    },
  },
}
</script>

<template>
  <div id="app">
    <div
      class="surface-ground px-4 py-5 md:px-6 lg:px-8"
    >
      <div class="grid">
        <div
          v-for="post of posts" :key="post.id"
          class="col-12 md:col-6"
        >
          <div class="surface-card shadow-2 p-3 border-round">
            <div class="card">
              <p class="text-2xl text-left ml-5 mb-0 mt-0 text-bluegray-500 font-bold">
                {{ post.jobType }}
              </p>
              <div class="flex flex-nowrap overflow-hidden card-container green-container" style="max-width: 700px">
                <div class="flex align-items-center justify-content-center font-bold text-white m-2 border-round" style="min-width: 150px; min-height: 100px">
                  <img width="100" :src="post.photo">
                </div>
                <div class="flex align-items-center text-gray-600 m-2 border-round text-2xl text-left" style="min-width: 350px; min-height: 100px">
                  {{ post.name }}<br>
                  Tel. +370 624 22869<br>
                  208 kab. <br>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.p-button,
.p-splitbutton {
  margin-bottom: 0.5rem;
}
.p-inputtext{
  width: 750px!important;
}
</style>

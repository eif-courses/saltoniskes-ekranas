<script>
import SimpleKeyboard from '../components/SimpleKeyboard'

export default {
  name: 'App',
  components: {
    SimpleKeyboard,
  },
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
        return (
          product.title.toLowerCase().includes(this.input.toLowerCase())
            || product.jobType.toLowerCase().includes(this.input.toLowerCase())
            || product.phone.toLowerCase().includes(this.input.toLowerCase())
            || product.classroom.toLowerCase().includes(this.input.toLowerCase())
        )
      })
    },
  },

  async mounted() {
    const client = useSupabaseClient()
    const { data, error } = await client.from('posts').select('id, title, phone, jobType, classroom, photo')

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
    <div>
      <Toolbar>
        <template #start>
          <a href="/"><Button label="Atgal" icon="pi pi-arrow-left" class="mr-8 mt-2 p-button-lg" /></a>

          <div>
            <span class="p-input-icon-left">
              <i class="pi pi-search" />
              <InputText
                type="text" :value="input"
                class="input p-inputtext-lg"
                placeholder="Ieškokite..." @input="onInputChange"
              />
            </span>
          </div>
        </template>

        <template #end>
          <Button icon="pi pi-search" class="mr-2" />
          <Button icon="pi pi-calendar" class="p-button-success mr-2" />
          <Button icon="pi pi-times" class="p-button-danger" />
        </template>
      </Toolbar>
    </div>

    <div
      class="surface-ground px-4 py-5 md:px-6 lg:px-8"
    >
      <div class="grid">
        <div
          v-for="post of searchedProducts" :key="post.id"
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
                  {{ post.title }}<br>
                  Tel. +370 624 22869<br>
                  208 kab. <br>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <SimpleKeyboard :input="input" @on-change="onChange" @on-key-press="onKeyPress" />
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

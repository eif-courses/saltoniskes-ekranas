<script>
import SimpleKeyboard from '../components/SimpleKeyboard'
import EmployeeList from '~/components/EmployeeList.vue'
// https://vue-i18n.intlify.dev/guide/integrations/nuxt3.html#optimize-with-intlify-unplugin-vue-i18n
export default {
  name: 'App',
  components: {
    EmployeeList,
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
          product.name.toLowerCase().includes(this.input.toLowerCase())
            || product.jobType.toLowerCase().includes(this.input.toLowerCase())
            || product.phone.toLowerCase().includes(this.input.toLowerCase())
            || product.classroom.toLowerCase().includes(this.input.toLowerCase())
        )
      })
    },
  },

  async mounted() {
    const client = useSupabaseClient()
    const { data, error } = await client.from('posts').select('id, name, phone, jobType, classroom, photo')

    if (error) {
      console.error(error)
      alert('Unable to fetch records!')
    }
    else {
      const arr = []
      for (const d of data)
        arr.push(d.jobType)

      this.posts = [...new Set(arr)]
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
    display(input) {
      this.input = input
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
          v-for="post of posts" :key="post"
          class="col-12 md:col-6"
        >
          <div class="surface-card shadow-2 p-3 border-round">
            <div class="card">
              <p class="text-2xl text-left ml-5 mb-0 mt-0 text-bluegray-500 font-bold">
                {{ post }}
              </p>
              <button @click="display(post)">
                OPEN
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <EmployeeList />
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
.simple-keyboard{
  visibility: hidden!important;
}
</style>

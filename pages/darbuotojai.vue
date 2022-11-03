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
    <span class="p-input-icon-left">
      <i class="pi pi-search" />
      <InputText
        type="text" :value="input"
        class="input"
        placeholder="Ieškokite..." @input="onInputChange"
      />
    </span>

    <div
      class="surface-ground px-4 py-5 md:px-6 lg:px-8" style="  background-image: linear-gradient(180deg, #2af598 0%, #009efd 100%);
"
    >
      <div class="grid">
        <div
          v-for="post of searchedProducts" :key="post.id"
          class="col-12 md:col-6"
        >
          <div class="surface-card shadow-2 p-3 border-round">
            <div class="flex justify-content-between mb-3">
              <div>
                <div class="text-900 font-medium text-3xl">
                  {{ post.name }}
                </div>
                <span class="block text-900 font-medium mb-1 mt-3 text-3xl">Tel. {{ post.phone }}</span>
              </div>
            </div>

            <span class="text-green-500 font-medium text-2xl">{{ post.classroom }} </span> &nbsp;
            <span class="text-green-500 font-medium text-2xl">{{ post.jobType }} </span>
          </div>
        </div>
      </div>
    </div>
    <SimpleKeyboard :input="input" @on-change="onChange" @on-key-press="onKeyPress" />
  </div>
</template>

<style>

</style>


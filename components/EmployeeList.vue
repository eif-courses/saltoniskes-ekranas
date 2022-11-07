<script setup>
import { onMounted, ref } from 'vue'
const props = defineProps(['category'])

const posts = ref([])
const client = useSupabaseClient()
onMounted(async () => {
  const {
    data,
    error,
  } = await client.from('posts').select('*').filter('category', 'in', `(${props.category})`)
  if (error) {
    console.error(error)
    alert('Unable to fetch records!')
  }
  else {
    posts.value = data
  }
})
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
              <p class="text-2xl text-left ml-2 mb-0 mt-0 text-bluegray-500 font-bold">
                {{ post.jobType }}
              </p>
              <div class="flex flex-nowrap overflow-hidden card-container green-container" style="max-width: 700px">
                <div
                  class="flex align-items-center text-gray-600 m-2 border-round text-2xl text-left"
                  style="min-width: 350px; min-height: 100px"
                >
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

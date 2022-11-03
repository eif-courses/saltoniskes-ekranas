<script>
export default {
  data() {
    return {
      time: '',
    }
  },
  methods: {
    onidle() {
      this.$router.push('/')
    },
  },
}
</script>

<template>
  <main class="py-20 px-10 text-center">
    <slot />
    <v-idle
      :loop="true"
      :wait="5"
      :duration="30"
      style="color: transparent;"
      @idle="onidle"
    />
  </main>
</template>

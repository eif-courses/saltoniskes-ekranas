<script>
import { useCurrentTime } from '../composables/useCurrentTime'
export default {
  name: 'DigitalClock',
  setup() {
    const { currentTime } = useCurrentTime()
    // console.log(currentTime.value)
    return { currentTime }
  },
}
</script>

<template>
  <div>
    <!-- <p class="font-bold text-white text-lg">{{ currentTime.toLocaleString() }}</p> -->
    <p class="font-bold text-white text-8xl">
      {{ currentTime.toLocaleTimeString("lt-LT") }} val. <br/>
      <span class="text-5xl">{{ currentTime.toLocaleDateString("lt-LT", { weekday: 'long', year: 'numeric', month: 'numeric', day: 'numeric' }) }}</span>
    </p>
  </div>
</template>

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
    <div class="font-bold mt-5 text-white text-8xl">
      {{ currentTime.toLocaleTimeString("lt-LT") }}
    </div>
    <div class="text-4xl mt-1 mb-4 text-white">
      {{ currentTime.toLocaleDateString("lt-LT", { weekday: 'long', year: 'numeric', month: 'numeric', day: 'numeric' }) }}
    </div>
  </div>
</template>

<style scoped>
/* CSS */
.button-17 {
  align-items: center;
  appearance: none;
  background-color: #fff;
  border-radius: 24px;
  border-style: none;
  box-shadow: rgba(0, 0, 0, .2) 0 3px 5px -1px,rgba(0, 0, 0, .14) 0 6px 10px 0,rgba(0, 0, 0, .12) 0 1px 18px 0;
  box-sizing: border-box;
  color: #3c4043;
  cursor: pointer;
  display: inline-flex;
  fill: currentcolor;
  font-family: "Google Sans",Roboto,Arial,sans-serif;
  font-size: 14px;
  font-weight: 500;
  height: 48px;
  justify-content: center;
  letter-spacing: .25px;
  line-height: normal;
  max-width: 100%;
  overflow: visible;
  padding: 2px 24px;
  position: relative;
  text-align: center;
  text-transform: none;
  transition: box-shadow 280ms cubic-bezier(.4, 0, .2, 1),opacity 15ms linear 30ms,transform 270ms cubic-bezier(0, 0, .2, 1) 0ms;
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
  width: auto;
  will-change: transform,opacity;
  z-index: 0;
}

.button-17:hover {
  background: #F6F9FE;
  color: #174ea6;
}

.button-17:active {
  box-shadow: 0 4px 4px 0 rgb(60 64 67 / 30%), 0 8px 12px 6px rgb(60 64 67 / 15%);
  outline: none;
}

.button-17:focus {
  outline: none;
  border: 2px solid #4285f4;
}

.button-17:not(:disabled) {
  box-shadow: rgba(60, 64, 67, .3) 0 1px 3px 0, rgba(60, 64, 67, .15) 0 4px 8px 3px;
}

.button-17:not(:disabled):hover {
  box-shadow: rgba(60, 64, 67, .3) 0 2px 3px 0, rgba(60, 64, 67, .15) 0 6px 10px 4px;
}

.button-17:not(:disabled):focus {
  box-shadow: rgba(60, 64, 67, .3) 0 1px 3px 0, rgba(60, 64, 67, .15) 0 4px 8px 3px;
}

.button-17:not(:disabled):active {
  box-shadow: rgba(60, 64, 67, .3) 0 4px 4px 0, rgba(60, 64, 67, .15) 0 8px 12px 6px;
}

.button-17:disabled {
  box-shadow: rgba(60, 64, 67, .3) 0 1px 3px 0, rgba(60, 64, 67, .15) 0 4px 8px 3px;
}                 /* CSS */
                                                   .button-46 {
                                                     align-items: center;
                                                     background-color: rgba(240, 240, 240, 0.26);
                                                     border: 1px solid #DFDFDF;
                                                     border-radius: 0px;
                                                     box-sizing: border-box;
                                                     color: #000000;
                                                     cursor: pointer;
                                                     display: flex;
                                                     font-family: Inter, sans-serif;
                                                     font-size: 18px;
                                                     justify-content: center;
                                                     line-height: 100px;
                                                     max-width: 100%;
                                                     padding: 14px 22px;
                                                     text-decoration: none;
                                                     transition: all .2s;
                                                     user-select: none;
                                                     -webkit-user-select: none;
                                                     touch-action: manipulation;
                                                     width: 100%;
                                                   }
@media (min-width: 768px) {
  .button-46 {
    font-size: 20px;
    min-width: 200px;
    padding: 14px 16px;
  }
}
                                                     /* CSS */
                                                   .button-84 {
                                                     align-items: center;
                                                     background-color: initial;
                                                     background-image: linear-gradient(#00a0b4, #b2ddb4);
                                                     border-radius: 8px;
                                                     border-width: 0;
                                                     box-shadow: 0 10px 20px rgba(0, 0, 0, .1),0 3px 6px rgba(0, 0, 0, .05);
                                                     box-sizing: border-box;
                                                     color: #fff;
                                                     cursor: pointer;
                                                     display: inline-flex;
                                                     flex-direction: column;
                                                     font-family: expo-brand-demi,system-ui,-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,"Noto Sans",sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol","Noto Color Emoji";
                                                     font-size: 18px;
                                                     height: 150px;
                                                     justify-content: center;
                                                     line-height: 1;
                                                     margin: 0;
                                                     outline: none;
                                                     overflow: hidden;
                                                     padding: 0 32px;
                                                     text-align: center;
                                                     text-decoration: none;
                                                     transform: translate3d(0, 0, 0);
                                                     transition: all 150ms;
                                                     vertical-align: baseline;
                                                     white-space: nowrap;
                                                     user-select: none;
                                                     -webkit-user-select: none;
                                                     touch-action: manipulation;
                                                   }

.button-84:hover {
  box-shadow: rgba(0, 1, 0, .2) 0 2px 8px;
  opacity: .85;
}

.button-84:active {
  outline: 0;
}

.button-84:focus {
  box-shadow: rgba(0, 0, 0, .5) 0 0 0 3px;
}

@media (max-width: 420px) {
  .button-84 {
    height: 48px;
  }
}                  /* CSS */
                                                   .button-85 {
                                                     padding: 0.6em 2em;
                                                     border: none;
                                                     outline: none;
                                                     color: rgb(255, 255, 255);
                                                     background:transparent!important;
                                                     cursor: pointer;
                                                     position: relative;
                                                     z-index: 0;
                                                     border-radius: 10px;
                                                     user-select: none;
                                                     -webkit-user-select: none;
                                                     touch-action: manipulation;
                                                   }

.button-85:before {
  content: "";
  background: linear-gradient(
      45deg,
      #48ff00,
      #00ffd5,
      #002bff
  );
  position: absolute;
  top: -2px;
  left: -2px;
  background-size: 400%;
  z-index: -1;
  filter: blur(5px);
  -webkit-filter: blur(5px);
  width: calc(100% + 4px);
  height: calc(100% + 4px);
  animation: glowing-button-85 25s linear infinite;
  transition: opacity 0.3s ease-in-out;
  border-radius: 10px;
}

@keyframes glowing-button-85 {
  0% {
    background-position: 0 0;
  }
  50% {
    background-position: 400% 0;
  }
  100% {
    background-position: 0 0;
  }
}

.button-85:after {
  z-index: -1;
  content: "";
  position: absolute;
  width: 100%;
  height: 100%;
  background: transparent!important;
  left: 0;
  top: 0;
  border-radius: 10px;
}
</style>

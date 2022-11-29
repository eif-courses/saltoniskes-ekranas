<script>
import Keyboard from 'simple-keyboard'
import 'simple-keyboard/build/css/index.css'

export default {
  name: 'SimpleKeyboard',
  props: {
    keyboardClass: {
      default: 'simple-keyboard',
      type: String,
    },
    input: {
      type: String,
    },
  },
  emits: ['onChange', 'onKeyPress'],
  data: () => ({
    keyboard: null,
  }),
  watch: {
    input(input) {
      this.keyboard.setInput(input)
    },
  },
  mounted() {
    this.keyboard = new Keyboard(this.keyboardClass, {
      onChange: this.onChange,
      onKeyPress: this.onKeyPress,
      preventMouseDownDefault: true,
      layout: {
        default: [
          '\u0105 \u010D \u0119 \u0117 \u012F \u0161 \u0173 \u016B \u017E {bksp}',
          'q w e r t y u i o p 7 8 9',
          'a s d f g h j k l  4 5 6',
          'z x c v b n m . , 0 1 2 3',
          '{space}',
        ],
      },
      display: {
        '{enter}': 'submit',
        '{bksp}': '&#x232b',
        '{lock}': 'lock',
        '{shift}': 'shift',
        '{tab}': 'tab',
        '{space}': 'space',
      },
    })
  },
  methods: {
    onChange(input) {
      this.$emit('onChange', input)
    },
    onKeyPress(button) {
      this.$emit('onKeyPress', button)

      /**
       * If you want to handle the shift and caps lock buttons
       */
      if (button === '{shift}' || button === '{lock}')
        this.handleShift()
    },
    handleShift() {
      const currentLayout = this.keyboard.options.layoutName
      const shiftToggle = currentLayout === 'default' ? 'shift' : 'default'

      this.keyboard.setOptions({
        layoutName: shiftToggle,
      })
    },
  },
}
</script>

<template>
  <div :class="keyboardClass" />
</template>

<style>
.simple-keyboard {
  bottom: 0;
  left: 0;
  right: 0;
  font-size: 25pt;
  position: fixed;
}

.simple-keyboard .hg-button {
  height: 67px;
  width: 99px;
}
</style>


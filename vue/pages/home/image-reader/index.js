import { render, staticRenderFns } from './render.pug'
export default {
  render,
  staticRenderFns,
  props: [],
  data () {
    return {
    }
  },
  mounted () {
  },
  methods: {
    onPaste (e) {
      // console.log('on paste', e.clipboardData)
      const files = [...e.clipboardData.files]
      files.forEach((file) => {
        this.parseImg(file)
      })
    },
    onDrop (e) {
      // console.log('on drop', e.dataTransfer)
      const files = [...e.dataTransfer.files]
      files.forEach((file) => {
        this.parseImg(file)
      })
    },
    parseImg: function (file) {
      const self = this
      const reader = new window.FileReader()
      reader.addEventListener('load', function () {
        const url = reader.result
        const img = new window.Image()
        img.onload = function () {
          self.$emit('load', img, self)
        }
        img.src = url
      }, false)

      if (!file) {
        return
      }
      reader.readAsDataURL(file)
    }
  }
}

import { render, staticRenderFns } from './render.pug'
export default {
  render,
  staticRenderFns,
  props: [],
  data () {
    return {
      id: ''
    }
  },
  mounted () {
    this.id = `img-${this._uid}`
  },
  methods: {
    parseFile (e) {
      const self = this
      const input = e.srcElement
      const file = input.files[0]
      input.value = ''
      const reader = new window.FileReader()
      reader.addEventListener('load', function () {
        const url = reader.result
        const img = new window.Image()
        img.onload = function () {
          self.$emit('load', img)
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

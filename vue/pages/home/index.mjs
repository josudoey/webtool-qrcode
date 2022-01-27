import Qrcode from './qrcode/index.js'
import ImagerReader from './image-reader/index.js'
import OpenImage from './open-image/index.js'
import ZbarProvider from './zbar-provider/index.js'
import { render, staticRenderFns } from './render.pug'

export default {
  render,
  staticRenderFns,
  components: {
    Qrcode,
    ImagerReader,
    OpenImage,
    ZbarProvider
  },
  data: () => {
    return {
      text: '',
      result: ''
    }
  },
  methods: {}
}

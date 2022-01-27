import { render, staticRenderFns } from './render.pug'
import QRCode from 'qrcode'

export default {
  render,
  staticRenderFns,
  props: ['value'],
  watch: {
    value: function (val) {
      this.text = val
      this.draw()
    }
  },
  data: function () {
    return {
      text: this.value || ''
    }
  },
  mounted: function () {
    this.draw()
  },
  methods: {
    draw: function () {
      QRCode.toCanvas(this.$refs.qr, this.text, { errorCorrectionLevel: 'H' }, function (error) {
        if (error) console.error(error)
      })
    }
  }
}

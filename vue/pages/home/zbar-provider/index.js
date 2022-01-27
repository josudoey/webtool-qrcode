import { render, staticRenderFns } from './render.pug'
import zbarScan from './zbar-scan.js'

export default {
  render,
  staticRenderFns,
  props: ['originImagePortal', 'locImagePortal'],
  data () {
    return {
      img: null,
      locImageUrl: ''
    }
  },
  mounted () {
  },
  methods: {
    async scanImage (img) {
      this.img = img
      const { width, height } = img
      const canvas = document.createElement('canvas')
      Object.assign(canvas, {
        width, height
      })
      const bitmap = await window.createImageBitmap(img)
      const ctx = canvas.getContext('2d')
      ctx.drawImage(bitmap, 0, 0, width, height)
      const imageData = ctx.getImageData(0, 0, width, height)
      const result = await zbarScan(imageData)
      this.$emit('result', result.slice())
      this.makeLocImageUrl(imageData, result)
    },
    makeLocImageUrl (imageData, result) {
      const canvas = document.createElement('canvas')
      const code = result.shift()
      if (!code) {
        this.locImageUrl = canvas.toDataURL('image/png')
        return
      }

      const ctx = canvas.getContext('2d')
      const { width } = imageData
      const W = 512
      const H = 512

      const p = code.loc

      Object.assign(canvas, {
        width: W, height: H
      })

      const locImage = ctx.createImageData(W, H)
      const a = (p[3].x - p[0].x) / W
      const b = (p[1].x - p[0].x) / H
      const c = (p[2].x + p[0].x - p[3].x - p[1].x) / (W * H)
      const d = p[0].x
      const e = (p[3].y - p[0].y) / W
      const f = (p[1].y - p[0].y) / H
      const g = (p[2].y + p[0].y - p[3].y - p[1].y) / (W * H)
      const h = p[0].y

      for (let y = 0; y < H; y++) {
        for (let x = 0; x < W; x++) {
          const index = (y * W + x) * 4
          const srcX = parseInt(a * x + b * y + c * x * y + d)
          const srcY = parseInt(e * x + f * y + g * x * y + h)
          const srcIndex = (srcY * width + srcX) * 4
          locImage.data[index] = imageData.data[srcIndex]
          locImage.data[index + 1] = imageData.data[srcIndex + 1]
          locImage.data[index + 2] = imageData.data[srcIndex + 2]
          locImage.data[index + 3] = imageData.data[srcIndex + 3]
        }
      }
      ctx.putImageData(locImage, 0, 0)
      this.locImageUrl = canvas.toDataURL('image/png')
    }
  }
}

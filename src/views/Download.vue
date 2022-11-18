<template>
  <canvas id="canvas" class="border border-solid border-gray-300"></canvas>
  <button
    type="button"
    class="flex items-center mt-4 px-7 py-3 bg-green-600 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-green-700 hover:shadow-lg focus:bg-green-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-green-800 active:shadow-lg transition duration-150 ease-in-out"
    @click="download"
  >
    <svg
      aria-hidden="true"
      focusable="false"
      data-prefix="fas"
      data-icon="download"
      class="w-3 mr-2"
      role="img"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 512 512"
    >
      <path
        fill="currentColor"
        d="M216 0h80c13.3 0 24 10.7 24 24v168h87.7c17.8 0 26.7 21.5 14.1 34.1L269.7 378.3c-7.5 7.5-19.8 7.5-27.3 0L90.1 226.1c-12.6-12.6-3.7-34.1 14.1-34.1H192V24c0-13.3 10.7-24 24-24zm296 376v112c0 13.3-10.7 24-24 24H24c-13.3 0-24-10.7-24-24V376c0-13.3 10.7-24 24-24h146.7l49 49c20.1 20.1 52.5 20.1 72.6 0l49-49H488c13.3 0 24 10.7 24 24zm-124 88c0-11-9-20-20-20s-20 9-20 20 9 20 20 20 20-9 20-20zm64 0c0-11-9-20-20-20s-20 9-20 20 9 20 20 20 20-9 20-20z"
      ></path>
    </svg>
    完成簽署
  </button>
</template>

<script setup>
import { onMounted } from 'vue'
import { useStore } from '@/stores/main'

const store = useStore()

let canvas = null

const download = () => {
  const pdf = new jsPDF()
  const image = canvas.toDataURL('image/png')
  const width = pdf.internal.pageSize.width
  const height = pdf.internal.pageSize.height
  pdf.addImage(image, 'png', 0, 0, width, height)
  pdf.save('download.pdf')
}

onMounted(() => {
  canvas = new fabric.Canvas('canvas') // 'canvas' is the id of the canvas element
  canvas.requestRenderAll()

  // 調整canvas大小
  canvas.setWidth(window.pdfImage.width / window.devicePixelRatio)
  canvas.setHeight(window.pdfImage.height / window.devicePixelRatio)
  canvas.setBackgroundImage(window.pdfImage, canvas.renderAll.bind(canvas))

  fabric.Image.fromURL(store.sign, image => {
    image.top = 400
    image.scaleX = 0.5
    image.scaleY = 0.5
    canvas.add(image)
  })
})
</script>

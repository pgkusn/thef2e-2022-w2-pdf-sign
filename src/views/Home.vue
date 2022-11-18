<template>
  <input
    class="hidden form-control w-full px-2 py-1.5 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
    id="file"
    type="file"
    accept="application/pdf"
    @change="onChange"
  />
  <label
    class="inline-block px-7 py-3 bg-green-600 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-green-700 hover:shadow-lg focus:bg-green-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-green-800 active:shadow-lg transition duration-150 ease-in-out cursor-pointer"
    for="file"
  >
    選擇檔案
  </label>
</template>

<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

const Base64Prefix = 'data:application/pdf;base64,'
pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://mozilla.github.io/pdf.js/build/pdf.worker.js'

// 取得 base64
const readBlob = blob => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.addEventListener('load', () => resolve(reader.result))
    reader.addEventListener('error', reject)
    reader.readAsDataURL(blob)
  })
}

// 取得 canvas
const printPDF = async pdfData => {
  pdfData = await readBlob(pdfData) // 取得 base64
  const data = atob(pdfData.substring(Base64Prefix.length))

  // Using DocumentInitParameters object to load binary data.
  const pdfDoc = await pdfjsLib.getDocument({ data }).promise
  const pdfPage = await pdfDoc.getPage(1)

  const viewport = pdfPage.getViewport({ scale: window.devicePixelRatio })
  const canvas = document.createElement('canvas')
  const context = canvas.getContext('2d')

  // 控制顯示PDF的寬高
  canvas.height = viewport.height
  canvas.width = viewport.width
  const renderContext = {
    canvasContext: context,
    viewport,
  }
  const renderTask = pdfPage.render(renderContext)

  // 回傳做好的canvas
  return renderTask.promise.then(() => canvas)
}

// 取得圖片
const pdfToImage = async pdfData => {
  const scale = 1 / window.devicePixelRatio
  return new fabric.Image(pdfData, {
    scaleX: scale,
    scaleY: scale,
  })
}

const onChange = async e => {
  const pdfData = await printPDF(e.target.files[0])
  window.pdfImage = await pdfToImage(pdfData)
  router.push('/sign')
}
</script>

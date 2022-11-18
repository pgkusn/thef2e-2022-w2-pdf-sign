<template>
  <canvas
    width="500"
    height="300"
    class="border border-solid border-gray-300"
    ref="$canvas"
    @mousemove="draw"
    @mousedown="mousedownHandler"
    @mouseup="isDrawing = false"
    @mouseleave="isDrawing = false"
  ></canvas>
  <button
    type="button"
    class="mt-4 inline-block px-7 py-3 bg-green-600 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-green-700 hover:shadow-lg focus:bg-green-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-green-800 active:shadow-lg transition duration-150 ease-in-out"
    @click="createSign"
  >
    建立簽名
  </button>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from '@/stores/main'

const router = useRouter()
const store = useStore()

let ctx, lastX, lastY
const $canvas = ref(null)
const isDrawing = ref(false)

const draw = e => {
  if (!isDrawing.value) return
  ctx.beginPath()
  ctx.moveTo(lastX, lastY)
  ctx.lineTo(e.offsetX, e.offsetY)
  ctx.stroke()
  ;[lastX, lastY] = [e.offsetX, e.offsetY]
}
const mousedownHandler = e => {
  isDrawing.value = true
  ;[lastX, lastY] = [e.offsetX, e.offsetY]
}
const createSign = () => {
  store.sign = $canvas.value.toDataURL('image/ong')
  router.push('/download')
}

onMounted(() => {
  ctx = $canvas.value.getContext('2d')
})
</script>

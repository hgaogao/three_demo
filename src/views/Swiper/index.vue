<script>
export default {
	name: 'App',
}
</script>
<script setup>
import { onMounted, ref } from 'vue'
import { init, render } from './scene.js'
import Swiper from '@/components/Swiper.vue'
const domEl = ref(null)
onMounted(() => {
	init(domEl.value)
	render()
})
</script>
<template>
	<Swiper></Swiper>
	<div ref="domEl"></div>
</template>

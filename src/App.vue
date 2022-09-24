<script>
export default {
	name: 'App',
}
</script>
<script setup>
import { init, render } from './scene.js'
import SwiperNav from './components/swiper.vue'
init()
render()
</script>
<template>
	<SwiperNav></SwiperNav>
</template>

<script>
export default {
	name: 'SwiperNav',
}
</script>
<script setup>
import { Lazy, Thumbs, FreeMode } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/vue'
import 'swiper/css'
import 'swiper/css/free-mode'
import 'swiper/css/thumbs'
import 'swiper/css/lazy'
import { ref } from 'vue'

const thumbsSwiper = ref(null)
const setThumbsSwiper = (swiper) => {
	thumbsSwiper.value = swiper
}
const data = [
	{
		slide: 'https://swiperjs.com/demos/images/nature-1.jpg',
	},
	{
		slide: 'https://swiperjs.com/demos/images/nature-2.jpg',
	},
	{
		slide: 'https://swiperjs.com/demos/images/nature-3.jpg',
	},
	{
		slide: 'https://swiperjs.com/demos/images/nature-4.jpg',
	},
	{
		slide: 'https://swiperjs.com/demos/images/nature-5.jpg',
	},
	{
		slide: 'https://swiperjs.com/demos/images/nature-6.jpg',
	},
	{
		slide: 'https://swiperjs.com/demos/images/nature-7.jpg',
	},
	{
		slide: 'https://swiperjs.com/demos/images/nature-8.jpg',
	},
]
</script>
<template>
	<!-- Main Swiper -> pass thumbs swiper instance -->
	<swiper
		:modules="[Lazy, Thumbs, FreeMode]"
		:thumbs="{ swiper: thumbsSwiper }"
	>
		<SwiperSlide v-for="slide in data" :key="slide.id"></SwiperSlide>
	</swiper>

	<!-- Thumbs Swiper -> store swiper instance -->
	<!-- It is also required to set watchSlidesProgress prop -->
	<swiper
		:modules="[Thumbs, FreeMode]"
		watch-slides-progress
		:lazy="true"
		:slides-per-view="4"
		:loop="true"
		:free-mode="true"
		@swiper="setThumbsSwiper"
	>
		<SwiperSlide v-for="slide in data" :key="slide.id">
			<img :src="slide.slide" />
		</SwiperSlide>
	</swiper>
</template>
<style scoped>
.swiper-slide {
	text-align: center;
	font-size: 18px;
	background: #fff;
	display: flex;
	justify-content: center;
	align-items: center;
	height: 100%;
	width: 100%;
}
img {
	width: 100%;
	height: 100%;
	object-fit: cover;
}
</style>

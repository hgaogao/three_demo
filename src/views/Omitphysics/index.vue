<script>
export default {
	name: 'App',
}
</script>
<script setup>
import { onMounted, ref } from 'vue'
import { createScene } from './scene.js'
import Loading from '../../components/Loading.vue'
const domEl = ref(null)
const isReady = ref(false)
onMounted(async () => {
	isReady.value = await createScene(domEl.value)
})
</script>
<template>
	<Loading v-if="!isReady" />
	<div ref="domEl"></div>
</template>

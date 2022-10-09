<script>
export default {
	name: 'App',
}
</script>
<script setup>
import { onMounted, ref } from 'vue'
import { init, render } from './scene.js'
const domEl = ref(null)
onMounted(() => {
	init(domEl.value)
	render()
})
</script>
<template>
	<div ref="domEl"></div>
</template>

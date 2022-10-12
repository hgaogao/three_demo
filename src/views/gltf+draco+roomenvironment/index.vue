<script>
export default {
	name: 'App',
}
</script>
<script setup>
import { onMounted, ref } from 'vue'
import { init } from './scene.js'
const domEl = ref(null)
onMounted(() => {
	init(domEl.value)
})
</script>
<template>
	<div ref="domEl"></div>
</template>

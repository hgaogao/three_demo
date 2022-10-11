<script>
export default {
	name: 'App',
}
</script>
<script setup>
import { onMounted, ref } from 'vue'
import { init, useAnimations } from './scene.js'
const domEl = ref(null)
const actions = useAnimations()
onMounted(() => {
	init(domEl.value)
})
function onClick(idx) {
	actions.value.forEach((action, i) => {
		if (i === idx) {
			action.play()
		} else {
			action.stop()
		}
	})
}
</script>
<template>
	<div ref="domEl"></div>
	<div class="control">
		<button v-for="(item, idx) in actions" :key="idx" @click="onClick(idx)">
			动作{{ idx + 1 }}
		</button>
	</div>
</template>
<style>
.control {
	position: absolute;
	top: 0;
	left: 100px;
}
</style>

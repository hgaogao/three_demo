<script>
export default {
	name: 'App',
}
</script>
<script setup>
import { onMounted, ref, shallowRef } from 'vue'
import GraphicsContext from './GraphicsContext/GraphicsContext'
import ResourcesManager from './GraphicsContext/utils/ResourcesManager'
const domEl = ref()
const progress = ref(0)
const graphicsContext = shallowRef()
const resourcesManager = new ResourcesManager()
resourcesManager.on('progress', (url, itemsLoaded, itemsTotal) => {
	const _progress = (itemsLoaded / itemsTotal) * 100
	progress.value = _progress
	console.log(progress.value + '%')
})
resourcesManager.on('load', () => {
	console.log('okok')
})
onMounted(() => {
	graphicsContext.value = new GraphicsContext(domEl.value, true)
})
</script>
<template>
	<div class="loading-mask" :class="{ loaded: progress === 100 }">
		<div class="loading">
			<div class="loader"></div>
		</div>
	</div>
	<div style="width: 100vw; height: 100vh; overflow: hidden">
		<canvas ref="domEl"></canvas>
	</div>
</template>

<style>
.loading-mask {
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	background-color: #000;
	transition: opacity 0.8s ease;
	opacity: 1;
	z-index: 100;
}
.loaded {
	display: none;
}
.loading {
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
}
.loader {
	position: relative;
	margin: auto;
	box-sizing: border-box;
	background-clip: padding-box;
	width: 200px;
	height: 200px;
	border-radius: 50%;
	border: 4px solid rgba(255, 255, 255, 0.1);
	-webkit-mask: linear-gradient(
		rgba(24, 24, 24, 0.2),
		rgba(24, 24, 24, 0.9) 90%
	);
	transform-origin: 50% 60%;
	transform: perspective(200px) rotateX(66deg);
}

.loader:before,
.loader:after {
	content: '';
	position: absolute;
	margin: -4px;
	box-sizing: inherit;
	width: inherit;
	height: inherit;
	border-radius: inherit;
	opacity: 0.05;
	border: inherit;
	border-color: transparent;
	animation: spinner-spin 1.2s cubic-bezier(0.6, 0.2, 0, 0.8) infinite,
		spinner-fade 1.2s linear infinite;
}

.loader:before {
	border-top-color: #66e6ff;
}

.loader:after {
	border-top-color: #f0db75;
	animation-delay: 0.3s;
}

@keyframes spinner-spin {
	100% {
		transform: rotate(360deg);
	}
}

@keyframes spinner-fade {
	20% {
		opacity: 0.1;
	}

	40% {
		opacity: 1;
	}

	60% {
		opacity: 0.1;
	}
}
</style>

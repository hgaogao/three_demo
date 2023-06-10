import * as THREE from 'three'

export default class Renderer {
	constructor(canvas, sizes) {
		this.renderer = new THREE.WebGLRenderer({
			canvas: canvas,
			alpha: true,
			antialias: true,
		})

		this.resize(sizes.width, sizes.height, sizes.pixelRatio)
	}

	resize(width, height, pixelRatio) {
		this.renderer.setSize(width, height)
		this.renderer.setPixelRatio(pixelRatio)
	}

	render(scene, camera) {
		this.renderer.render(scene, camera)
	}
}

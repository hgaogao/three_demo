import * as THREE from 'three'

export default class Camera {
	constructor(sizes) {
		this.sizes = sizes
		this.createPerspectiveCamera()
	}

	createPerspectiveCamera() {
		this.perspectiveCamera = new THREE.PerspectiveCamera(
			35,
			1, // Placeholder for aspect ratio
			0.1,
			500
		)
		this.perspectiveCamera.position.z = 200
		this.perspectiveCamera.position.y = 30
		this.resize(this.sizes.aspect)
	}

	resize(aspect) {
		this.perspectiveCamera.aspect = aspect
		this.perspectiveCamera.updateProjectionMatrix()
	}
}

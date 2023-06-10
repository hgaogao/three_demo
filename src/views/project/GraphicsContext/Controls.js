import { OrbitControls } from 'three/addons/controls/OrbitControls.js'

export default class Controls {
	constructor(camera, canvas) {
		this.controls = new OrbitControls(camera, canvas)
	}

	update() {
		this.controls.update()
	}
}

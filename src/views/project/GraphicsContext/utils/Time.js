import EventEmitter from 'events'
import * as THREE from 'three'
import ResourcesManager from './ResourcesManager'

export default class Time extends EventEmitter {
	constructor() {
		super()
		this.time = new THREE.Clock()
		const resourcesManager = new ResourcesManager()
		resourcesManager.on('load', () => {
			this.update()
		})
	}

	update() {
		this.emit('update')
		window.requestAnimationFrame(() => {
			this.update()
		})
	}
}

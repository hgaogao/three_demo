import { LoadingManager } from 'three'
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js'
import { DRACOLoader } from 'three/addons/loaders/DRACOLoader.js'
import EventEmitter from 'events'

export default class ResourcesManager extends EventEmitter {
	static instance = null
	onLoadCallbackList = []
	constructor() {
		super()
		if (ResourcesManager.instance) return ResourcesManager.instance
		ResourcesManager.instance = this

		this.manager = new LoadingManager()
		this.GLTFLoader = new GLTFLoader(this.manager)
		const DRACO = new DRACOLoader()
		DRACO.setDecoderPath('https://www.gstatic.com/draco/v1/decoders/')
		this.GLTFLoader.setDRACOLoader(DRACO)

		this.manager.onProgress = (url, itemsLoaded, itemsTotal) => {
			this.emit('progress', url, itemsLoaded, itemsTotal)
		}
		this.manager.onLoad = () => {
			this.emit('load')
		}
	}
}

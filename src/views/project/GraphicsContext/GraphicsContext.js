import * as THREE from 'three'
import Sizes from './utils/Sizes'
import Renderer from './Renderer'
import Time from './utils/Time'
import Camera from './Camera'
import World from './world/World'
import Controls from './Controls'
import PerformancePanel from './utils/PerformancePanel'
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment'

export default class GraphicsContext {
	constructor(canvas, isDebug = false) {
		this.isDebug = isDebug
		this.canvas = canvas
		this.scene = new THREE.Scene()
		this.sizes = new Sizes()
		this.camera = new Camera(this.sizes)
		this.renderer = new Renderer(this.canvas, this.sizes)
		this.controls = new Controls(this.camera.perspectiveCamera, this.canvas)
		this.time = new Time()
		this.world = new World(this.scene, this.time)
		this.initDevHelper(isDebug)
		this.handlelistener()
		this.setENV()
	}

	setENV() {
		const pmremGenerator = new THREE.PMREMGenerator(this.renderer.renderer)
		this.scene.background = new THREE.Color(0xaaaaaa)
		this.scene.environment = pmremGenerator.fromScene(
			new RoomEnvironment()
		).texture // 重点,设置场景的环境贴图,这里使用了RoomEnvironment 设置了environment就可以不用打环境光了
	}
	handlelistener() {
		this.sizes.on('resize', () => {
			this.resize()
		})

		this.time.on('update', () => {
			this.update()
		})
	}
	update() {
		this.controls.update()
		this.renderer.render(this.scene, this.camera.perspectiveCamera)
		this.isDebug && this.performancePanel.update()
	}

	resize() {
		const aspect = this.sizes.aspect
		const { width, height, pixelRatio } = this.sizes
		this.camera.resize(aspect)
		this.renderer.resize(width, height, pixelRatio)
	}
	initDevHelper(isDebug) {
		if (!isDebug) return
		this.performancePanel = new PerformancePanel()
		this.scene.add(new THREE.AxesHelper(40))
	}
}

import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { initStats, initAxesHelper } from '../../utils/initHelper'
import { initRenderer } from '@/utils/initRenderer'
import { Scene } from 'three'
import { initCamera } from '@/utils/initCamera'
let scene, camera, renderer
let stats
export function init(domEl) {
	renderer = initRenderer(domEl)
	scene = new Scene()
	camera = initCamera(renderer, { x: 5, y: 2, z: 8 })
	initAxesHelper(scene)
	const _controls = new OrbitControls(camera, renderer.domElement)
	stats = initStats(domEl)
}

export function render() {
	renderer.render(scene, camera)
	stats.update()
	requestAnimationFrame(render)
}

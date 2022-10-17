import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { initStats, initAxesHelper } from '../../utils/initHelper'
import { initRenderer } from '@/utils/initRenderer'
import {
	BoxGeometry,
	Color,
	Mesh,
	MeshBasicMaterial,
	Scene,
	TextureLoader,
} from 'three'
import { initCamera } from '@/utils/initCamera'
import { initLight } from '@/utils/initLight'
import crate from '@/assets/texture/crate.gif'
let scene, camera, renderer
let stats, mesh
export function init(domEl) {
	renderer = initRenderer(domEl)
	scene = new Scene()
	scene.background = new Color(0x000000)
	camera = initCamera(renderer, { x: 5, y: 2, z: 8 })
	initAxesHelper(scene)
	const _controls = new OrbitControls(camera, renderer.domElement)
	stats = initStats(domEl)
	initMesh()
	initLight(scene)
}
const initMesh = () => {
	const Loader = new TextureLoader()
	const texture = Loader.load(crate)
	const geometry = new BoxGeometry(3, 3, 3)
	const material = new MeshBasicMaterial({ map: texture })
	mesh = new Mesh(geometry, material)
	scene.add(mesh)
}
export function render() {
	renderer.render(scene, camera)
	stats.update()
	mesh.rotation.x += 0.02
	mesh.rotation.y += 0.01
	requestAnimationFrame(render)
}

import Soldier from '@/static/models/Soldier.glb?url'

import { initCamera } from '@/utils/initCamera'
import { initLight } from '@/utils/initLight'
import { initRenderer } from '@/utils/initRenderer'
import {
	AnimationMixer,
	Clock,
	Color,
	Fog,
	Mesh,
	MeshPhongMaterial,
	PlaneGeometry,
	Scene,
} from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { initAxesHelper, initStats } from '../../utils/initHelper'
import { ref } from 'vue'

const actions = ref([])
let scene, camera, renderer
let stats
let mixer
let clock = new Clock()
let dirLight
let plane
export function useAnimations() {
	return actions
}
export function init(domEl) {
	renderer = initRenderer(domEl)
	scene = new Scene()
	scene.background = new Color(0xa0a0a0)
	scene.fog = new Fog(0xa0a0a0, 10, 50)
	camera = initCamera(renderer, { x: 0, y: 3, z: -5 }, { x: 0, y: 0, z: 0 })
	initAxesHelper(scene)
	const _controls = new OrbitControls(camera, renderer.domElement)
	stats = initStats(domEl)
	dirLight = initLight(scene).dirLight
	initMeshes()
	enableShadow()
	render()
}
function initMeshes() {
	//plane
	const planeGeometry = new PlaneGeometry(100, 100)
	const planeMaterial = new MeshPhongMaterial({ color: 0xffffff })
	plane = new Mesh(planeGeometry, planeMaterial)
	plane.rotation.x = -Math.PI / 2
	scene.add(plane)
	// 加载模型
	const loader = new GLTFLoader()
	loader.load(Soldier, (gltf) => {
		scene.add(gltf.scene)

		gltf.scene.traverse((child) => {
			if (child.isMesh) {
				child.castShadow = true
			}
		})
		mixer = new AnimationMixer(gltf.scene)
		actions.value = gltf.animations.map((clip) => mixer.clipAction(clip))

		actions.value[0].play()
	})
}
function enableShadow() {
	renderer.shadowMap.enabled = true
	plane.receiveShadow = true
	dirLight.castShadow = true
}
function render() {
	let delta = clock.getDelta()
	stats.update()
	if (mixer) {
		mixer.update(delta)
	}
	renderer.render(scene, camera)
	requestAnimationFrame(render)
}

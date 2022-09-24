import {
	BoxGeometry,
	Color,
	DirectionalLight,
	HemisphereLight,
	InstancedMesh,
	Matrix4,
	Mesh,
	MeshLambertMaterial,
	PerspectiveCamera,
	Scene,
	ShadowMaterial,
	Vector2,
	WebGLRenderer,
} from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { initStats, initAxesHelper } from '../../utils/initHelper'
import { OimoPhysics } from 'three/examples/jsm/physics/OimoPhysics'

let scene, camera, renderer, light, boxs, floor, physics
let stats
let domElement
let mouse = new Vector2(1, 1)
export function init(domEl) {
	domElement = domEl
	initRenderer()
	initScene()
	initCamera()
	initLight()
	initMeshes()
	initAxesHelper(scene)
	onWindowResize()
	new OrbitControls(camera, renderer.domElement)
	enbalePhysics()
	stats = initStats(domEl)
	document.addEventListener('mousemove', onDocumentMouseMove, false)
}
function onDocumentMouseMove(event) {
	mouse.x = (event.clientX / window.innerWidth) * 2 - 1 // -1 ~ 1
	mouse.y = -(event.clientY / window.innerHeight) * 2 + 1 // -1 ~ 1
}
async function enbalePhysics() {
	physics = await OimoPhysics()
	physics.addMesh(floor)
	physics.addMesh(boxs, 1)
}
function initMeshes() {
	boxs = new InstancedMesh(
		new BoxGeometry(0.1, 0.1, 0.1),
		new MeshLambertMaterial(),
		100
	)
	const matrix = new Matrix4()
	const color = new Color()
	for (let i = 0; i < 100; i++) {
		matrix.setPosition(
			Math.random() * 2 - 1,
			Math.random() * 2,
			Math.random() - 1
		)
		color.setHex(Math.random() * 0xffffff)
		boxs.setMatrixAt(i, matrix)
		boxs.setColorAt(i, color)
	}

	renderer.shadowMap.enabled = true
	boxs.castShadow = true
	boxs.receiveShadow = true
	scene.add(boxs)

	floor = new Mesh(new BoxGeometry(10, 0.1, 10), new ShadowMaterial())
	floor.position.set(0, -0.05, 0)
	floor.receiveShadow = true
	scene.add(floor)
}
function initLight() {
	light = new HemisphereLight(0xffffff)
	light.intensity = 0.3
	scene.add(light)

	const dirLight = new DirectionalLight(0xffffff)
	dirLight.position.set(7, 40, 0)
	dirLight.castShadow = true
	scene.add(dirLight)
}

function initRenderer() {
	renderer = new WebGLRenderer()
	renderer.setSize(window.innerWidth, window.innerHeight)
	domElement.appendChild(renderer.domElement)
}
function initCamera() {
	camera = new PerspectiveCamera(
		60,
		window.innerWidth / window.innerHeight,
		1,
		1000
	)
	camera.position.set(10, 10, 10)
	camera.lookAt(0, 0, 0)
}

function initScene() {
	scene = new Scene()
	scene.background = new Color(0x888888)
}

function onWindowResize() {
	window.addEventListener('resize', () => {
		camera.aspect = window.innerWidth / window.innerHeight
		camera.updateProjectionMatrix()
		renderer.setSize(window.innerWidth, window.innerHeight)
	})
}
export function render() {
	renderer.render(scene, camera)
	stats.update()
	requestAnimationFrame(render)
}

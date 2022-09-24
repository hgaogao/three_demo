import {
	AmbientLight,
	CylinderGeometry,
	Mesh,
	MeshPhongMaterial,
	PerspectiveCamera,
	PlaneGeometry,
	Scene,
	SpotLight,
	WebGLRenderer,
} from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { initStats, initAxesHelper } from '../../utils/initHelper'

let scene, camera, renderer, plane, cylinder, ambientLight, spotLight
let domElement
let stats
export function init(domEl) {
	domElement = domEl
	initRenderer()
	initScene()
	initCamera()
	initMeshes()
	initAmbientLight()
	initSpotLight()
	initAxesHelper(scene)
	initShadow()
	onWindowResize()
	const _controls = new OrbitControls(camera, renderer.domElement)
	stats = initStats(domEl)
}
function initRenderer() {
	renderer = new WebGLRenderer()
	renderer.setSize(window.innerWidth, window.innerHeight)
	domElement.appendChild(renderer.domElement)
}
function initSpotLight() {
	spotLight = new SpotLight(0xffffff, 1)
	spotLight.position.set(-50, 80, 0)
	spotLight.angle = Math.PI / 6
	spotLight.penumbra = 0.2
	// spotLight.castShadow = true
	scene.add(spotLight)
}
function initAmbientLight() {
	ambientLight = new AmbientLight(0xffffff, 0.5)
	scene.add(ambientLight)
}
function initCamera() {
	camera = new PerspectiveCamera(
		40,
		window.innerWidth / window.innerHeight,
		1,
		1000
	)
	camera.position.set(0, 120, 200)
	camera.lookAt(0, 0, 0)
}
function initScene() {
	scene = new Scene()
}
function initMeshes() {
	const geometryPlane = new PlaneGeometry(2000, 800)
	const materialPlane = new MeshPhongMaterial({ color: 0x808080 })
	plane = new Mesh(geometryPlane, materialPlane)
	plane.rotation.x = -Math.PI / 2
	plane.position.set(0, -10, 0)
	scene.add(plane)

	const geometryCylinder = new CylinderGeometry(5, 5, 2, 32)
	const materialCylinder = new MeshPhongMaterial({ color: 0x4080ff })
	cylinder = new Mesh(geometryCylinder, materialCylinder)
	cylinder.position.set(0, 10, 0)
	Mesh.get
	scene.add(cylinder)
}

function initShadow() {
	cylinder.castShadow = true
	plane.receiveShadow = true
	spotLight.castShadow = true
	renderer.shadowMap.enabled = true
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
	cylinder.rotation.y += 0.01
	cylinder.rotation.x += 0.01
	stats.update()
	requestAnimationFrame(render)
}

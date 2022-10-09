import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { initStats, initAxesHelper } from '../../utils/initHelper'
import { initRenderer } from '@/utils/initRenderer'
import { ShadowMapViewer } from 'three/examples/jsm/utils/ShadowMapViewer.js'
import {
	AmbientLight,
	BasicShadowMap,
	BoxGeometry,
	CameraHelper,
	Clock,
	DirectionalLight,
	Mesh,
	MeshPhongMaterial,
	Scene,
	SpotLight,
	TorusKnotGeometry,
} from 'three'
import { initCamera } from '@/utils/initCamera'
let scene, camera, renderer
let stats
let torusKont, cube, ground
let spotLight, dirLight
const clock = new Clock()
let spotLightShadowMapViewer, dirLightShadowMapViewer

export function init(domEl) {
	renderer = initRenderer(domEl)
	scene = new Scene()
	camera = initCamera(renderer, { x: 0, y: 5, z: 10 }, { x: 0, y: 0, z: 0 })
	initControls()
	initAxesHelper(scene)
	stats = initStats(domEl)

	initLights()
	initMeshes()
	enableShadow()
	initCameraHelper()
	initShadowMapViewer()
}

function initShadowMapViewer() {
	spotLightShadowMapViewer = new ShadowMapViewer(spotLight)
	dirLightShadowMapViewer = new ShadowMapViewer(dirLight)
	resizeShadowMapViewer()
}
function resizeShadowMapViewer() {
	let size = window.innerWidth / 100

	spotLightShadowMapViewer.position.x = 70
	spotLightShadowMapViewer.position.y = 0

	dirLightShadowMapViewer.position.set(300, 0)
	spotLightShadowMapViewer.size.set(size * 10, size * 10)
	dirLightShadowMapViewer.size.set(size * 10, size * 10)

	window.addEventListener('resize', () => {
		size = window.innerWidth / 100
		spotLightShadowMapViewer.size.set(size * 20, size * 20)
		dirLightShadowMapViewer.size.set(size * 20, size * 20)
		spotLightShadowMapViewer.updateForWindowResize()
		dirLightShadowMapViewer.updateForWindowResize()
		console.log(size)
	})
}

function initControls() {
	const _controls = new OrbitControls(camera, renderer.domElement)
	_controls.target.set(0, 1, 0)
	_controls.update()
}
function initLights() {
	scene.add(new AmbientLight(0x404040))

	spotLight = new SpotLight(0xffffff)
	spotLight.name = 'spotLight'
	spotLight.angle = Math.PI / 5
	spotLight.penumbra = 0.3
	spotLight.position.set(10, 10, 5)
	scene.add(spotLight)

	dirLight = new DirectionalLight(0xffffff, 1)
	dirLight.name = 'dirLight'
	dirLight.position.set(0, 15, 0)
	scene.add(dirLight)
}

function initCameraHelper() {
	spotLight.shadow.camera.near = 8 // 灯光的近裁剪面
	spotLight.shadow.camera.far = 30 // 灯光的远裁剪面
	spotLight.shadow.mapSize.width = 1024 // 灯光的阴影贴图的宽度
	spotLight.shadow.mapSize.height = 1024 // 灯光的阴影贴图的高度
	const spotLigtHelper = new CameraHelper(spotLight.shadow.camera)
	scene.add(spotLigtHelper)

	dirLight.shadow.camera.near = 1 // 灯光的近裁剪面
	dirLight.shadow.camera.far = 25 // 灯光的远裁剪面
	dirLight.shadow.camera.left = -15 // 灯光的左裁剪面
	dirLight.shadow.camera.right = 15 // 灯光的右裁剪面
	dirLight.shadow.camera.top = 15 // 灯光的上裁剪面
	dirLight.shadow.camera.bottom = -15 // 灯光的下裁剪面

	const dirLightHelper = new CameraHelper(dirLight.shadow.camera)
	scene.add(dirLightHelper)
}

function enableShadow() {
	renderer.shadowMap.enabled = true
	renderer.shadowMap.type = BasicShadowMap

	torusKont.castShadow = true
	cube.castShadow = true
	ground.receiveShadow = true

	spotLight.castShadow = true
	dirLight.castShadow = true
}

function initMeshes() {
	//torus
	let geometry = new TorusKnotGeometry(25, 8, 200, 20)
	let material = new MeshPhongMaterial({
		color: 0xff0000,
		shininess: 150,
		specular: 0x222222,
	})
	torusKont = new Mesh(geometry, material)
	torusKont.scale.multiplyScalar(1 / 18)
	torusKont.position.y = 3

	// cube
	geometry = new BoxGeometry(3, 3, 3)
	cube = new Mesh(geometry, material)
	cube.position.set(8, 3, 8)

	// ground
	geometry = new BoxGeometry(10, 0.1, 10)
	material = new MeshPhongMaterial({
		color: 0xa0adaf,
		shininess: 150,
		specular: 0x111111,
	})
	ground = new Mesh(geometry, material)
	ground.scale.multiplyScalar(3)

	scene.add(torusKont)
	scene.add(cube)
	scene.add(ground)
}
export function render() {
	animation()
	renderer.render(scene, camera)
	stats.update()
	spotLightShadowMapViewer.render(renderer)
	dirLightShadowMapViewer.render(renderer)
	requestAnimationFrame(render)
}

function animation() {
	const delta = clock.getDelta()
	torusKont.rotation.x += 0.25 * delta
	torusKont.rotation.y += 0.25 * delta
	torusKont.rotation.z += 0.25 * delta
	cube.rotation.x += 0.25 * delta
	cube.rotation.y += 0.25 * delta
	cube.rotation.z += 0.25 * delta
}

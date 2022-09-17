import {
	AxesHelper,
	BoxGeometry,
	Mesh,
	MeshBasicMaterial,
	PerspectiveCamera,
	Scene,
	WebGLRenderer,
} from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import Stats from 'three/examples/jsm/libs/stats.module.js'
let scene, camera, renderer, cube, axesHelper
const stats = new Stats()
stats.domElement.style.position = 'absolute'
stats.domElement.style.top = '0px' //显示在屏幕左上角的地方。
document.body.appendChild(stats.domElement) //添加到container之后

export const init = () => {
	scene = new Scene()
	const geometry = new BoxGeometry(1, 1, 1)
	const material = new MeshBasicMaterial({ color: 0x987 })
	cube = new Mesh(geometry, material)
	scene.add(cube)

	axesHelper = new AxesHelper(3)
	scene.add(axesHelper)
	camera = new PerspectiveCamera(
		75,
		window.innerWidth / window.innerHeight,
		0.1,
		1000
	)
	camera.position.z = 5
	camera.position.x = 2
	camera.position.y = 1
	renderer = new WebGLRenderer()
	renderer.setSize(window.innerWidth, window.innerHeight)
	document.body.appendChild(renderer.domElement)
	new OrbitControls(camera, renderer.domElement)
}

export function render() {
	stats.update()
	renderer.render(scene, camera)
	cube.rotation.x += 0.01
	cube.rotation.y += 0.01
	requestAnimationFrame(render)
}

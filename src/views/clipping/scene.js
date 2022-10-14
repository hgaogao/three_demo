import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { initStats, initAxesHelper } from '../../utils/initHelper'
import { initRenderer } from '@/utils/initRenderer'
import { GUI } from 'three/examples/jsm/libs/lil-gui.module.min.js'
import {
	DirectionalLight,
	Mesh,
	MeshPhongMaterial,
	Plane,
	PlaneGeometry,
	Scene,
	SpotLight,
	TorusKnotGeometry,
	Vector3,
} from 'three'
import { initCamera } from '@/utils/initCamera'
let scene, camera, renderer
let stats
let object, plane
export function init(domEl) {
	renderer = initRenderer(domEl)
	scene = new Scene()
	camera = initCamera(renderer, { x: 5, y: 2, z: 8 })
	initAxesHelper(scene)
	const _controls = new OrbitControls(camera, renderer.domElement)
	stats = initStats(domEl)

	enableClipping()
	initMeshes()
	initLight()
	const gui = new GUI()
	gui.add(plane, 'constant', -0.6, 0.5)
}
const initLight = () => {
	const spotLight = new SpotLight(0xffffff)
	spotLight.angle = Math.PI / 5 //光锥角度
	spotLight.penumbra = 0.5 //光锥渐变
	spotLight.position.set(2, 3, 3)
	spotLight.castShadow = true //产生阴影
	spotLight.shadow.mapSize.width = 1024
	spotLight.shadow.mapSize.height = 1024
	spotLight.shadow.camera.near = 0.5
	spotLight.shadow.camera.far = 10
	scene.add(spotLight)

	const dirLight = new DirectionalLight(0x55505a, 1)
	dirLight.position.set(0, 3, 0)
	dirLight.castShadow = true
	scene.add(dirLight)
}
function initMeshes() {
	//material
	const material = new MeshPhongMaterial({
		color: 0x80ee10,
		shininess: 100, //光滑度
		side: 2, //两面可见

		/* Clipping setup  */
		clippingPlanes: [plane], //裁剪平面
		clipShadows: true, //是否裁剪阴影
	})
	const geometry = new TorusKnotGeometry(0.4, 0.08, 95, 20)
	object = new Mesh(geometry, material)
	object.position.set(0, 1, 0)
	object.castShadow = true
	scene.add(object)

	// ground
	const gounod = new Mesh(
		new PlaneGeometry(9, 9, 1, 1),
		new MeshPhongMaterial({ color: 0x999999, side: 2 })
	)
	gounod.receiveShadow = true
	gounod.rotation.x = -Math.PI / 2
	scene.add(gounod)
}
const enableClipping = () => {
	plane = new Plane(new Vector3(1, 0, 0), 0)
	renderer.localClippingEnabled = true
}
export function render() {
	renderer.render(scene, camera)
	stats.update()
	requestAnimationFrame(render)
}

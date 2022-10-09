import { PerspectiveCamera } from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

/**
 * 初始化相机
 * @param {object} renderer 渲染器
 * @param {object} position 相机位置
 * @param {object} lookAt 相机朝向
 * @returns {object} camera 相机
 */
export function initCamera(
	renderer,
	position = { x: 10, y: 10, z: 10 },
	lookAt = { x: 0, y: 0, z: 0 }
) {
	const camera = new PerspectiveCamera(
		60,
		window.innerWidth / window.innerHeight,
		1,
		1000
	)
	camera.position.set(position.x, position.y, position.z)
	camera.lookAt(lookAt.x, lookAt.y, lookAt.z)

	new OrbitControls(camera, renderer.domElement)
	onWindowResize(camera, renderer)
	return camera
}
function onWindowResize(camera, renderer) {
	window.addEventListener('resize', () => {
		camera.aspect = window.innerWidth / window.innerHeight
		camera.updateProjectionMatrix()
		renderer.setSize(window.innerWidth, window.innerHeight)
	})
}

import { PerspectiveCamera } from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

/**
 * 初始化相机
 * @param {object} renderer 渲染器
 * @returns {object} camera 相机
 */
export function initCamera(renderer) {
	const camera = new PerspectiveCamera(
		60,
		window.innerWidth / window.innerHeight,
		1,
		1000
	)
	camera.position.set(10, 10, 10)
	camera.lookAt(0, 0, 0)

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

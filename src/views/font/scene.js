import { initCamera } from '@/utils/initCamera'
import { initLight } from '@/utils/initLight'
import { initRenderer } from '@/utils/initRenderer'
import { Color, Mesh, MeshNormalMaterial, Scene } from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { initAxesHelper, initStats } from '../../utils/initHelper'
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry.js' // 文字几何体
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js' // 字体加载器
import fontJson from '@/assets/fonts/helvetiker_bold.typeface.json?url'

let scene, camera, renderer
let stats
export function init(domEl) {
	renderer = initRenderer(domEl)
	scene = new Scene()
	scene.background = new Color(0x987654)
	camera = initCamera(renderer, { x: 5, y: 2, z: 90 })
	initAxesHelper(scene)
	const _controls = new OrbitControls(camera, renderer.domElement)
	stats = initStats(domEl)
	initLight(scene)
	initMesh()
}

const initMesh = () => {
	const material = new MeshNormalMaterial({ color: 0x00ff00 })

	const loader = new FontLoader()
	loader.load(fontJson, function (font) {
		const textGeo = new TextGeometry('Hello three.js!', {
			font: font, // 字体
			size: 12, // 字号
			height: 2, // 高度
			curveSegments: 12, // 曲线段数
			bevelEnabled: true, // 是否开启斜角
			bevelThickness: 0.8, // 斜角厚度
			bevelSize: 0.5, // 斜角大小
			bevelOffset: 0, // 斜角偏移
			bevelSegments: 2, // 斜角段数
		})
		textGeo.computeBoundingBox()
		// 计算文字的中心点 textGeo.boundingBox是文字的包围盒,max和min分别是文字的最大最小坐标
		const xOffset =
			-0.5 * (textGeo.boundingBox.max.x - textGeo.boundingBox.min.x)
		const textMesh = new Mesh(textGeo, material)
		textMesh.position.x = xOffset
		scene.add(textMesh)

		const textGeo2 = new TextGeometry('Hello three.js!', {
			font: font, // 字体
			size: 12, // 字号
			height: 1, // 高度
			curveSegments: 12, // 曲线段数
			bevelEnabled: true, // 是否开启斜角
			bevelThickness: 0.4, // 斜角厚度
			bevelSize: 0.4, // 斜角大小
			bevelOffset: 0, // 斜角偏移
			bevelSegments: 5, // 斜角段数
		})
		const material2 = new MeshNormalMaterial({
			color: 0x00ff00,
			transparent: true,
			opacity: 0.5,
		})
		textGeo2.computeBoundingBox()

		const xOffset2 =
			-0.5 * (textGeo2.boundingBox.max.x - textGeo2.boundingBox.min.x)
		const textMesh2 = new Mesh(textGeo2, material2)
		textMesh2.position.x = xOffset2
		textMesh2.position.y = -10
		textMesh2.rotation.x = -Math.PI
		scene.add(textMesh2)
	})
}

export function render() {
	renderer.render(scene, camera)
	stats.update()
	requestAnimationFrame(render)
}

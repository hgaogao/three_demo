import {
	Color,
	HemisphereLight,
	IcosahedronGeometry,
	InstancedMesh,
	Matrix4,
	MeshPhongMaterial,
	Scene,
	Vector2,
} from 'three'

import { initCamera } from '../../utils/initCamera'
import { initStats, initAxesHelper } from '../../utils/initHelper'
import { initRaycaster } from '../../utils/initRaycaster'
import { initRenderer } from '../../utils/initRenderer'

let scene, camera, renderer, light, meshes
let stats, raycaster

let mouse = new Vector2(1, 1)
let count = 1000
export function init(domEl) {
	renderer = initRenderer(domEl)
	scene = new Scene()

	camera = initCamera(renderer)
	initLight()
	initMeshes()
	initAxesHelper(scene)
	raycaster = initRaycaster(camera)
	stats = initStats(domEl)
	document.addEventListener('mousemove', onDocumentMouseMove, false)
}
function onDocumentMouseMove(event) {
	mouse.x = (event.clientX / window.innerWidth) * 2 - 1 // -1 ~ 1
	mouse.y = -(event.clientY / window.innerHeight) * 2 + 1 // -1 ~ 1
}
function initMeshes() {
	const geometry = new IcosahedronGeometry(0.5, 3) //创建一个几何体对象,正十二面体
	const material = new MeshPhongMaterial({ color: 0xffffff }) //材质对象
	meshes = new InstancedMesh(geometry, material, count) //创建一个网格模型组对象
	const amount = 10
	let index = 0
	const offset = (amount - 1) / 2
	let white = new Color().setHex(0xffffff)
	const matrix = new Matrix4()
	for (let i = 0; i < amount; i++) {
		for (let j = 0; j < amount; j++) {
			for (let k = 0; k < amount; k++) {
				matrix.setPosition(offset - i, offset - j, offset - k)
				meshes.setMatrixAt(index, matrix)
				meshes.setColorAt(index, white)
				index++
			}
		}
	}
	scene.add(meshes)
}
function initLight() {
	light = new HemisphereLight(0xffffff, 0x888888)
	light.position.set(0, 1, 0)
	scene.add(light)
}
export function render() {
	renderer.render(scene, camera)
	stats.update()
	changColor()
	requestAnimationFrame(render)
}
function changColor() {
	const intersection = raycaster.intersectObject(meshes) //射线和物体相交
	if (intersection.length > 0) {
		const instanceId = intersection[0].instanceId
		let color = new Color().setHex(0xffffff)
		meshes.getColorAt(instanceId, color)
		if (color.equals(new Color().setHex(0xffffff))) {
			color = new Color().setHex(Math.random() * 0xffffff)
			meshes.setColorAt(instanceId, color)
			meshes.instanceColor.needsUpdate = true
		}
	}
}

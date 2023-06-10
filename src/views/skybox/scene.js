import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { initStats, initAxesHelper } from '../../utils/initHelper'
import { initRenderer } from '@/utils/initRenderer'
import px from '@/assets/cube/pisa/px.png'
import nx from '@/assets/cube/pisa/nx.png'
import py from '@/assets/cube/pisa/py.png'
import ny from '@/assets/cube/pisa/ny.png'
import pz from '@/assets/cube/pisa/pz.png'
import nz from '@/assets/cube/pisa/nz.png'

import {
	CubeTextureLoader,
	InstancedMesh,
	Matrix4,
	MeshBasicMaterial,
	Scene,
	SphereGeometry,
} from 'three'
import { initCamera } from '@/utils/initCamera'
let scene, camera, renderer, texture
let stats
export function init(domEl) {
	renderer = initRenderer(domEl)
	scene = new Scene()
	camera = initCamera(renderer, { x: 5, y: 2, z: 8 })
	initAxesHelper(scene)
	const _controls = new OrbitControls(camera, renderer.domElement)
	stats = initStats(domEl)
	initScene()
	initMesh()
}

const initScene = () => {
	const urls = [px, nx, py, ny, pz, nz]
	texture = new CubeTextureLoader().load(urls)
	scene.background = texture
}

const initMesh = () => {
	const geometry = new SphereGeometry(0.2, 20, 20)
	const material = new MeshBasicMaterial({ color: 0xffffff, envMap: texture }) // 知识点：envMap,环境贴图, 用于反射,数值为CubeTexture对象,一般用于天空盒
	const meshes = new InstancedMesh(geometry, material, 500) //创建一个网格模型组对象
	const matrix = new Matrix4() //创建一个矩阵对象
	// 设置随机位置, 利用矩阵对象设置每个网格模型的位置
	for (let i = 0; i < 500; i++) {
		matrix.setPosition(
			Math.random() * 10 - 5,
			Math.random() * 10 - 5,
			Math.random() * 10 - 5
		)

		meshes.setMatrixAt(i, matrix) //设置网格模型组对象的矩阵
	}
	scene.add(meshes)
}

export function render() {
	const timer = Date.now() * 0.0001
	for (let i = 0; i < 500; i++) {
		const mesh = scene.children[1]
		mesh.rotation.x = Math.sin(timer * 7 + i) * 0.5
		mesh.rotation.y = Math.sin(timer * 3 + i) * 0.5
	}
	renderer.render(scene, camera)
	stats.update()
	requestAnimationFrame(render)
}

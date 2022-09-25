import {
	BoxGeometry,
	Color,
	InstancedMesh,
	Matrix4,
	Mesh,
	MeshLambertMaterial,
	Scene,
	ShadowMaterial,
} from 'three'
import { initStats, initAxesHelper } from '../../utils/initHelper'
import { OimoPhysics } from 'three/examples/jsm/physics/OimoPhysics'
import { initRenderer } from '../../utils/initRenderer'
import { initCamera } from '../../utils/initCamera'
import { initLight } from '../../utils/initLight'

export let scene, camera, renderer, light, boxs, floor, physics
let stats
export function createScene(domEl) {
	return new Promise((resolve) => {
		renderer = initRenderer(domEl)
		scene = new Scene()
		scene.background = new Color(0xaaaaaa)
		camera = initCamera(renderer)
		initLight(scene)

		initMeshes()
		enablePhysics()
		enableShadow()
		initAxesHelper(scene)
		stats = initStats(domEl)

		animation()
		resolve(true)
	})
}

async function enablePhysics() {
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
			Math.random() * 2 + 2,
			Math.random() - 1
		)
		color.setHex(Math.random() * 0xffffff)
		boxs.setMatrixAt(i, matrix)
		boxs.setColorAt(i, color)
	}

	scene.add(boxs)

	floor = new Mesh(new BoxGeometry(10, 0.1, 10), new ShadowMaterial())
	floor.position.set(0, -0.05, 0)
	scene.add(floor)
}
function enableShadow() {
	renderer.shadowMap.enabled = true
	boxs.castShadow = true
	boxs.receiveShadow = true
	floor.receiveShadow = true
}
export function animation() {
	renderer.render(scene, camera)
	stats.update()
	requestAnimationFrame(animation)
}

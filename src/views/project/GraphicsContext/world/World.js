import * as THREE from 'three'
import ResourcesManager from '../utils/ResourcesManager'
import Soldier from '@/assets/models/LittlestTokyo.glb?url'
export default class World {
	#update() {}
	constructor(scene, time) {
		this.scene = scene
		this.time = time
		const resourcesManager = new ResourcesManager()
		this.gltfLoader = resourcesManager.GLTFLoader
		this.setup()
	}

	setup() {
		this.addGLTFModel()
	}
	addCube() {
		const cube = new THREE.Mesh(
			new THREE.BoxGeometry(1, 1, 1),
			new THREE.MeshStandardMaterial({ color: 0xff0000 })
		)
		this.scene.add(cube)

		this.time.on('update', () => {
			cube.rotation.y += 0.01
			cube.rotation.z += 0.01
			cube.rotation.x += 0.01
		})
	}
	addLight() {
		const directionalLight = new THREE.DirectionalLight(0xffffff, 1)
		directionalLight.position.set(0.25, 3, -2.25)
		this.scene.add(directionalLight)
	}
	addAmbientLight() {
		const ambientLight = new THREE.AmbientLight(0xffffff, 1)
		this.scene.add(ambientLight)
	}
	addGLTFModel() {
		this.gltfLoader.load(Soldier, (gltf) => {
			const model = gltf.scene
			model.scale.set(0.1, 0.1, 0.1)
			model.rotation.y = Math.PI
			this.scene.add(model)
			this.enableAnimation(gltf)
		})
	}
	enableAnimation(gltf) {
		const mixer = new THREE.AnimationMixer(gltf.scene)
		const action = mixer.clipAction(gltf.animations[0])
		action.play()
		this.time.on('update', () => {
			mixer && mixer.update(this.time.time.getDelta())
		})
	}
}

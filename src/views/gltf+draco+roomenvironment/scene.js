import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { initStats, initAxesHelper } from '../../utils/initHelper'
import { initRenderer } from '@/utils/initRenderer'
import { AnimationMixer, Clock, Color, PMREMGenerator, Scene } from 'three'
import { initCamera } from '@/utils/initCamera'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js'
import LittlestTokyo from '@/assets/models/LittlestTokyo.glb?url'
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js'
let scene, camera, renderer
let stats
let mixer
const clock = new Clock()
export function init(domEl) {
	renderer = initRenderer(domEl)
	initScene()
	camera = initCamera(renderer, { x: 5, y: 2, z: 6 })
	initAxesHelper(scene)
	const controls = new OrbitControls(camera, renderer.domElement)
	controls.target.set(0, 2, 0)
	controls.update()
	stats = initStats(domEl)
	loadModel()
}
const initScene = () => {
	const pmremGenerator = new PMREMGenerator(renderer)
	scene = new Scene()
	scene.background = new Color(0xaaaaaa)
	scene.environment = pmremGenerator.fromScene(new RoomEnvironment()).texture // 重点,设置场景的环境贴图,这里使用了RoomEnvironment 设置了environment就可以不用打环境光了
}

const enableAnimation = (gltf) => {
	mixer = new AnimationMixer(gltf.scene)
	const action = mixer.clipAction(gltf.animations[0])
	action.play()
}

const loadModel = () => {
	const loader = new GLTFLoader()
	const dracoLoader = new DRACOLoader()
	dracoLoader.setDecoderPath('/draco/')
	loader.setDRACOLoader(dracoLoader)
	loader.load(LittlestTokyo, (gltf) => {
		const model = gltf.scene
		model.position.set(0, 2, 0)
		model.scale.set(0.01, 0.01, 0.01)
		scene.add(model)
		//开启动画
		enableAnimation(gltf)
		//开启渲染
		render()
	})
}

function render() {
	renderer.render(scene, camera)
	stats.update()
	mixer && mixer.update(clock.getDelta())
	requestAnimationFrame(render)
}

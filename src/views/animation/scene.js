import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { initStats, initAxesHelper } from '../../utils/initHelper'
import { initRenderer } from '@/utils/initRenderer'
import {
	AnimationClip,
	AnimationMixer,
	BoxGeometry,
	Clock,
	ColorKeyframeTrack,
	Mesh,
	MeshPhongMaterial,
	NumberKeyframeTrack,
	Quaternion,
	Scene,
	Vector3,
	VectorKeyframeTrack,
} from 'three'
import { initCamera } from '@/utils/initCamera'
import { initLight } from '@/utils/initLight'
let scene, camera, renderer
let stats
let cube
let clip, mixer
const clock = new Clock()

export function init(domEl) {
	renderer = initRenderer(domEl)
	scene = new Scene()
	camera = initCamera(renderer)
	initLight(scene)
	initAxesHelper(scene)
	const _controls = new OrbitControls(camera, renderer.domElement)
	stats = initStats(domEl)

	initMeshes()
	makeClip()
	enableAnimation()
}
function makeClip() {
	// create a keyframe track (i.e. a timed sequence of keyframes) for each animated property
	// Note: the keyframe track type should correspond to the type of the property being animated
	//为每个动画属性创建一个关键帧轨道（即关键帧的定时序列）
	//注意：关键帧轨道类型应与动画属性的类型相对应

	// 创建位置关键帧
	const positionKF = new VectorKeyframeTrack(
		'.position' /* 动画的名字 */,
		[0, 1, 2, 3] /* 时间 */,
		[0, 0, 0 /* 1 */, 5, 0, 0 /* 2 */, 5, 5, 0 /* 3 */, 0, 0, 0 /* 4 */] // 创建动画轨迹
	)

	// 创建缩放关键帧
	const scaleKF = new VectorKeyframeTrack(
		'.scale' /* 动画的名字 */,
		[0, 1, 2, 3] /* 时间 */,
		[1, 1, 1 /* 1 */, 2, 2, 2 /* 2 */, 1, 1, 1 /* 3 */, 1, 1, 1 /* 4 */] // 创建动画轨迹
	)

	// 创建旋转关键帧

	// Rotation should be performed using quaternions, using a THREE.QuaternionKeyframeTrack
	// Interpolating Euler angles (.rotation property) can be problematic and is currently not supported
	// 旋转应使用四元数执行，使用THREE.QuaternionKeyframeTrack
	// 插值欧拉角（.rotation属性）可能会有问题，目前不支持
	const xAxis = new Vector3(1, 0, 0) // 旋转轴
	const qInitial = new Quaternion().setFromAxisAngle(xAxis, 0) // 初始旋转角度
	const qFinal = new Quaternion().setFromAxisAngle(xAxis, Math.PI / 2) // 最终旋转角度
	const quterionKF = new VectorKeyframeTrack(
		'.quaternion' /* 动画的名字 */,
		[0, 1, 2, 3] /* 时间 */,
		[
			...qInitial.toArray() /* 1 */,
			...qFinal.toArray() /* 2 */,
			...qInitial.toArray() /* 3 */,
			...qInitial.toArray() /* 4 */,
		] // 创建动画轨迹
	)

	// 创建颜色关键帧
	const colorKF = new ColorKeyframeTrack(
		'.material.color' /* 动画的名字 */,
		[0, 1, 2, 3] /* 时间 */,
		[0, 1, 0 /* 1 */, 0, 0, 1 /* 2 */, 1, 0, 0 /* 3 */, 0, 1, 0 /* 4 */] // 创建动画轨迹
	)

	//创建透明度关键帧
	const opacityKF = new NumberKeyframeTrack(
		'.material.opacity' /* 动画的名字 */,
		[0, 1, 2, 3] /* 时间 */,
		[1, 0, 0.5, 1]
	)

	clip = new AnimationClip('Action', -1, [
		positionKF,
		scaleKF,
		quterionKF,
		colorKF,
		opacityKF,
	]) // 创建动画剪辑
}
function enableAnimation() {
	mixer = new AnimationMixer(cube) // 给cube添加动画
	const action = mixer.clipAction(clip) // 从clip中提取动画
	action.play() // 播放动画
}

function initMeshes() {
	const geometry = new BoxGeometry(1, 1, 1)
	const material = new MeshPhongMaterial({ color: 0x00ff00, transparent: true })
	cube = new Mesh(geometry, material)
	cube.position.set(0, 0, 0)
	scene.add(cube)
}

export function render() {
	renderer.render(scene, camera)
	const delta = clock.getDelta()
	stats.update()
	if (mixer) {
		mixer.update(delta)
	}
	requestAnimationFrame(render)
}

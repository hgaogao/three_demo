import Stats from 'three/examples/jsm/libs/stats.module.js'
import { AxesHelper } from 'three'

export function initStats(domEl) {
	const stats = new Stats()
	stats.domElement.style.position = 'absolute'
	stats.domElement.style.top = '0px' //显示在屏幕左上角的地方。
	domEl.appendChild(stats.domElement) //添加到container之后
	return stats
}

export function initAxesHelper(scene) {
	const axesHelper = new AxesHelper(50)
	scene.add(axesHelper)
}

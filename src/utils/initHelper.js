import Stats from 'three/examples/jsm/libs/stats.module.js'
import { AxesHelper } from 'three'
/**
 *	初始化性能监控
 * @param {object} domEl dom元素
 * @returns stats 性能监控面板对象
 */
export function initStats(domEl) {
	const stats = new Stats()
	stats.domElement.style.position = 'absolute'
	stats.domElement.style.top = '0px' //显示在屏幕左上角的地方。
	domEl.appendChild(stats.domElement) //添加到container之后
	return stats
}
/**
 * 添加坐标轴
 * @param {object} scene 场景
 */
export function initAxesHelper(scene) {
	const axesHelper = new AxesHelper(50)
	scene.add(axesHelper)
}

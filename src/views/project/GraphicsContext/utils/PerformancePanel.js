import Stats from 'three/examples/jsm/libs/stats.module.js'
export default class PerformancePanel {
	constructor() {
		const stats = new Stats()
		stats.domElement.style.position = 'absolute'
		stats.domElement.style.top = '0'
		stats.domElement.style.left = '0'
		document.body.appendChild(stats.domElement)
		window.performancePanel = stats
		return stats
	}
}

import EventEmitter from 'events'

export default class Sizes extends EventEmitter {
	constructor() {
		super()
		this.onResize = this.onResize.bind(this)
		this.onResize()
		window.addEventListener('resize', this.onResize)
	}

	onResize() {
		this.emit('resize')
		this.width = window.innerWidth
		this.height = window.innerHeight
		this.aspect = this.width / this.height
		this.pixelRatio = Math.min(window.devicePixelRatio, 2)
	}
}

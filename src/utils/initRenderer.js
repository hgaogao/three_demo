import { WebGLRenderer } from 'three'

/**
 *
 * @param {object} domElement dom元素
 * @returns
 */
export function initRenderer(domElement) {
	const renderer = new WebGLRenderer()
	renderer.setSize(window.innerWidth, window.innerHeight)
	domElement.appendChild(renderer.domElement)

	renderer.shadowMap.enabled = true
	return renderer
}

import { DirectionalLight, HemisphereLight } from 'three'

export function initLight(scene) {
	const light = new HemisphereLight(0xffffff)
	light.intensity = 0.3
	scene.add(light)

	const dirLight = new DirectionalLight(0xffffff)
	dirLight.position.set(7, 40, 0)
	dirLight.castShadow = true
	scene.add(dirLight)
}

import { DirectionalLight, HemisphereLight } from 'three'

export function initLight(scene) {
	const light = new HemisphereLight(0x999999, 0x444444)
	scene.add(light)

	const dirLight = new DirectionalLight(0xffffff)
	dirLight.position.set(-5, 10, -10)
	scene.add(dirLight)

	return { light, dirLight }
}

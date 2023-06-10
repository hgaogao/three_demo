// import { Raycaster, Vector2 } from 'three'
// /**
//  * 初始化射线
//  * @param {object} camera 相机
//  * @returns {object} raycaster 射线
//  */
// export function initRaycaster(camera) {
// 	const raycaster = new Raycaster()
// 	document.addEventListener('mousemove', onDocumentMouseMove, false)
// 	const mouse = new Vector2(1, 1)

// 	function onDocumentMouseMove(event) {
// 		mouse.x = (event.clientX / window.innerWidth) * 2 - 1 // -1 ~ 1
// 		mouse.y = -(event.clientY / window.innerHeight) * 2 + 1 // -1 ~ 1
// 		raycaster.setFromCamera(mouse, camera) //从相机发射一条射线,射线的方向是从相机指向鼠标的方向
// 	}
// 	return raycaster
// }

// TODO: 处理射线与物体的交互

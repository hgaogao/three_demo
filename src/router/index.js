import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
const routes = [
	{
		path: '/',
		name: 'Home',
		component: Home,
		meta: {
			title: 'Home',
		},
	},

	{
		path: '/Light',
		name: 'Light',
		component: () => import('@/views/Light/index.vue'),
		meta: {
			title: 'Light',
		},
	},
	{
		path: '/InstancedMesh_And_Raycaster',
		name: 'InstancedMesh_And_Raycaster',
		component: () => import('@/views/InstancedMesh_And_Raycaster/index.vue'),
		meta: {
			title: 'InstancedMesh 和 Raycaster',
		},
	},
]
const router = createRouter({
	history: createWebHistory(),
	routes,
})
export default router

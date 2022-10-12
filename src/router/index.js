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
		path: '/select',
		name: 'select',
		component: () => import('@/views/Select.vue'),
		meta: {
			title: 'select',
		},
	},
	{
		path: '/Swiper',
		name: 'Swiper',
		component: () => import('@/views/Swiper/index.vue'),
		meta: {
			title: 'Swiper',
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
	{
		path: '/Omitphysics',
		name: 'Omitphysics',
		component: () => import('@/views/Omitphysics/index.vue'),
		meta: {
			title: 'Omitphysics物理效果',
		},
	},
	{
		path: '/shadowmap_view',
		name: 'shadowmap_view',
		component: () => import('@/views/shadowmap_view/index.vue'),
		meta: {
			title: 'shadowmap_view',
		},
	},
	{
		path: '/animation',
		name: 'animation',
		component: () => import('@/views/animation/index.vue'),
		meta: {
			title: 'animation',
		},
	},
	{
		path: '/loadGLTF',
		name: 'loadGLTF',
		component: () => import('@/views/loadGLTF/index.vue'),
		meta: {
			title: 'loadGLTF',
		},
	},
	{
		path: '/gltf+draco+roomenvironment',
		name: 'gltf+draco+roomenvironment',
		component: () => import('@/views/gltf+draco+roomenvironment/index.vue'),
		meta: {
			title: 'gltf+draco+roomenvironment',
		},
	},
]
const router = createRouter({
	history: createWebHistory(),
	routes,
})
export default router

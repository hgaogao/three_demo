<script>
export default {
	name: 'HomePage',
}
</script>
<script setup>
import { useRouter } from 'vue-router'
const router = useRouter()
const routeList = router.options.routes
</script>
<template>
	<div>
		<ul>
			<li v-for="route in routeList" :key="route.path">
				<router-link :to="route.path">{{ route.name }}</router-link>
				--{{ route.meta.title }}
			</li>
		</ul>
	</div>
</template>
<style lang="less" scoped></style>

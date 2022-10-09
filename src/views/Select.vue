<script>
export default {
	name: 'SelectPage',
}
</script>
<script setup>
import { nextTick, onMounted, ref } from 'vue'
import { useDraggable, useMouseInElement } from '@vueuse/core'
let mouse = useMouseInElement()
const selectItemRef = ref([])
const selectInput = ref(null)
const selectList = ref([{ id: 1, name: '1', itemData: {} }])
const isLockConfig = ref(false)
onMounted(() => {
	selectItemRef.value.forEach((item, index) => {
		const itemData = useDraggable(item, {
			initialValue: { x: 0, y: 30 },
		})
		selectList.value[index].itemData = itemData
	})
})
function onAdd(count, x = 0, y = 30) {
	const index = selectList.value.length
	selectList.value.push({
		id: index + 1,
		name: index + 1 + '',
		itemData: {},
	})

	nextTick(() => {
		const itemData = useDraggable(selectItemRef.value[index], {
			initialValue: { x, y },
		})
		selectList.value[index].itemData = itemData
	})
	if (--count > 0) {
		onAdd(count)
	}
}
// 按下a键添加一个元素到鼠标所在位置

window.onkeydown = function (e) {
	if (e.key === 'a' && !isLockConfig.value) {
		onAdd(1, mouse.x.value + 1, mouse.y.value + 1)
	}
}

function onRemove() {
	selectList.value.pop()
}
function onRemoveAll() {
	selectList.value.splice(0, selectList.value.length)
}
function onSave() {
	//保存成json文件
	const data = selectList.value.map((item) => {
		console.log(item.itemData.x)
		return {
			id: item.id,
			name: item.name,
			x: item.itemData.x || 0,
			y: item.itemData.y || 0,
		}
	})

	const blob = new Blob([JSON.stringify(data)], { type: 'application/json' })
	const url = URL.createObjectURL(blob)
	const link = document.createElement('a')
	link.href = url
	link.setAttribute('download', 'data.json')
	document.body.appendChild(link)
	link.click()
	document.body.removeChild(link)
}
function onLockConfig() {
	isLockConfig.value = !isLockConfig.value
}
function onSaveData() {
	const data = selectInput.value
		.map((item, index) => {
			return item.checked && index + 1
		})
		.filter((item) => item)
	console.log(data)
}
</script>
<template>
	<div class="control">
		<span v-if="!isLockConfig">
			<button class="control__btn" @click="onAdd">添加一个位置</button>
			<button class="control__btn" @click="onAdd(10)">添加十个位置</button>
			<button class="control__btn" @click="onRemove">删除最后一个</button>
			<button class="control__btn" @click="onRemoveAll">全部清除</button>
			<button class="control__btn" @click="onSave">保存配置</button>
		</span>
		<span v-else>
			<button class="control__btn" @click="onSaveData">收集数据</button>
		</span>
		<button class="control__btn" @click="onLockConfig">
			{{ isLockConfig ? '编辑配置' : '锁定配置' }} | 当前模式:{{
				isLockConfig ? '锁定模式' : '编辑模式'
			}}
		</button>
	</div>
	<div v-show="!isLockConfig" class="config">
		<div
			v-for="(item, index) of selectList"
			:key="item.id"
			ref="selectItemRef"
			:style="selectList[index].itemData.style"
			style="position: fixed"
			class="select-item"
		>
			<input :id="item.id" type="checkbox" />
			<label :for="item.id">{{ item.name }}</label>
		</div>
	</div>
	<div v-show="isLockConfig">
		<div
			v-for="item of selectList"
			:key="item.id"
			:style="{
				position: 'fixed',
				left: item.itemData.x + 'px',
				top: item.itemData.y + 'px',
				cursor: 'default',
			}"
			class="select-item"
		>
			<input :id="item.id" ref="selectInput" type="checkbox" />
			<label :for="item.id">{{ item.name }}</label>
		</div>
	</div>
</template>
<style lang="less" scoped>
.select-item {
	background-color: #dedede;
	max-width: 60px;
	height: 30px;
	padding: 0 6px;
	border: 1px solid #000;
	border-radius: 4px;
	font-size: 20px;
	user-select: none;
	cursor: move;
}
</style>

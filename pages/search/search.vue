<template>
	<view class="main-no-color">
		<nv :config="config"></nv>
		<view class="div-column"
			style="width: 100%;height: 20%;background-color: #2B9939;text-align: center;justify-content: center;">
			<view style="color: #FFFFFF;font-size: x-large;">
				精选推荐
			</view>
			<view style="color: #F0AD4E;font-size: large;">
				有诚意的用户精选推荐
			</view>
			<view style="color: #F0AD4E;font-size: large;">
				查看更多
			</view>
		</view>
		<view class="div-column"
			style="width: 100%;height: 20%;background-color: #ff0000;text-align: center;justify-content: center;">
			<view style="color: #FFFFFF;font-size: x-large;">
				很急专区
			</view>
			<view style="color: #F0AD4E;font-size: large;">
				期望爱情很急
			</view>
			<view style="color: #F0AD4E;font-size: large;">
				查看更多
			</view>
		</view>
	</view>
</template>
<script>
	import axios from "../../common/util/axios.js";
	import '../../static/css/public/style.css';
	export default {
		data() {
			return {
				config: {
					title: '发现',
					bgColor: '#ffffff',
					color: '#000000',
					hideback: true,
					message: '',
				},
			}
		},
		methods: {

		},
		created() {

		},
		mounted() {

		}
	}
</script>
<style>
</style>

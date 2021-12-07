<template>
	<view class="main-no-color" style="background-color: #eaeaea;">
		<nv :config="config"></nv>
		<van-divider hairline customStyle="width:90%;margin: 0 auto;" />
		<image-cropper id="image-cropper" :limit_move="true" :disable_rotate="true" :width="width" :height="height"
			:imgSrc="url" @load="cropperload" @imageload="loadimage" @cut="clickcut"></image-cropper>
	</view>
</template>
<script>
	import infoChange from "@/components/info-change/info-change.vue";
	import axios from "../../common/util/axios.js";
	import config from "../../common/config.js"
	import '../../static/css/public/style.css';
	export default {
		components: {
			infoChange
		},
		data() {
			return {
				config: {
					title: '头像',
					bgColor: '#eaeaea',
					color: '#000000',
					hideback: false,
				},
				url: '',
				width: 250, //宽度
				height: 250, //高度
			}
		},
		methods: {
			cropperload(e) {
				console.log("cropper初始化完成");
			},
			loadimage(e) {
				console.log("图片加载完成", e.detail);
				wx.hideLoading();
				//重置图片角度、缩放、位置
				this.cropper.imgReset();
			},
			clickcut(e) {
				console.log(e.detail);
				//点击裁剪框阅览图片
				wx.previewImage({
					current: e.detail.url, // 当前显示图片的http链接
					urls: [e.detail.url] // 需要预览的图片http链接列表
				})
			},

		},
		onLoad(option) {
			this.cropper = this.selectComponent("#image-cropper");
		}
	}
</script>
<style>
</style>

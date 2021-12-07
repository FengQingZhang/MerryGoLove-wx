<template>
	<view class="main-no-color" style="background-color: #eaeaea;">
		<nv :config="config"></nv>
		<view class='content'>
			<view class='left'>
				<block v-for="(item,index) in leftList" :key="index">
					<view style="height: auto;background-color: #FFFFFF;border-radius: 10rpx;">
						<view class="image-container">
							<image class='pic' :style='{height:item.CoverHeight}' :src='item.Cover'></image>
							<view class="image-mask">会员可见</view>
							<view class="image-font">
								<van-row>
									不是一般的在乎
								</van-row>
								<van-row>
									北京 31岁 165cm
								</van-row>
							</view>
						</view>
						<view class="div-row" style="font-size: small;">
							<view style="margin: 10rpx;">
								我会以结婚为目的跟你谈恋爱，以你为起点,以幸福为终点，相符到老。
							</view>
						</view>
						<br>
						<view class="div-row" style="font-size: smaller;color: #808080;">
							<view style="margin-left: 1rpx;">
								期望一年结婚
							</view>
						</view>
					</view>		
				</block>
			</view>
			<view class='right'>
				<block v-for="(item,index) in rightList" :key="index">
					<view style="height: auto;background-color: #FFFFFF;border-radius: 10rpx;">
						<view class="image-container">
							<image class='pic' :style='{height:item.CoverHeight}' :src='item.Cover'></image>
							<view class="image-mask">会员可见</view>
							<view class="image-font">
								<van-row>
									不是一般的在乎
								</van-row>
								<van-row>
									北京 31岁 165cm
								</van-row>
							</view>
						</view>
						<view class="div-row" style="font-size: small;">
							<view style="margin: 10rpx;">
								简单努力的北漂小女子，希望遇到和我一样的你。
							</view>
						</view>
						<br>
						<view class="div-row" style="font-size: smaller;color: #808080;">
							<view style="margin-left: 1rpx;">
								期望一年结婚
							</view>
						</view>
					</view>			
				</block>
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
					title: '主页',
					bgColor: '#ffffff',
					color: '#000000',
					hideback: true,
					message: '',
				},
				noramalData: [{
						"Cover": "http://dashus.oss-cn-shenzhen.aliyuncs.com/DefaultImage/Game/20190306144842/1001.png",
						"CoverHeight": 467,
						"CoverWidth": 350
					},
					{
						"Cover": "http://dashus.oss-cn-shenzhen.aliyuncs.com/DefaultImage/Game/20190313090409/完美9.png",
						"CoverHeight": 871,
						"CoverWidth": 672
					}
				],
				leftList: [],
				rightList: [],
				leftHight: 0,
				rightHight: 0,
				avatarUrl:'https://img.yzcdn.cn/vant/cat.jpeg',
			}
		},
		methods: {

		},
		onLoad() {
			var that = this;
			var allData = that.noramalData;
			//定义两个临时的变量来记录左右两栏的高度，避免频繁调用setData方法
			var leftH = that.leftHight;
			var rightH = that.rightHight;
			var leftData = [];
			var rightData = [];
			for (let i = 0; i < allData.length; i++) {
				var currentItemHeight = parseInt(Math.round(allData[i].CoverHeight * 345 / allData[i].CoverWidth));
				allData[i].CoverHeight = currentItemHeight + "rpx"; //因为xml文件中直接引用的该值作为高度，所以添加对应单位
				if (leftH == rightH || leftH < rightH) { //判断左右两侧当前的累计高度，来确定item应该放置在左边还是右边
					leftData.push(allData[i]);
					leftH += currentItemHeight;
				} else {
					rightData.push(allData[i]);
					rightH += currentItemHeight;
				}
			}
			//更新左右两栏的数据以及累计高度
			this.leftHight = leftH
			this.rightHight = rightH
			this.leftList = leftData
			this.rightList = rightData
		},
		created() {

		},
		mounted() {

		}
	}
</script>

<style>
</style>

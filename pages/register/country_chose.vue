<template>
	<view class="main-no-color" style="background-color: #eaeaea;">
		<nv :config="config"></nv>
		<van-cell-group title="地区" v-if="type=='0'">
			<van-cell>
				<view slot="title">
					<view v-if="workplace===''" style="color:#808080;" class="van-cell-text">
						请选择地区
					</view>
					<view v-else class="van-cell-text">{{workplace}}</view>
				</view>
			</van-cell>
		</van-cell-group>
		<van-cell-group title="全部地区">
			<van-cell v-for="(item,index) in country" :key="index" @click="chose(item)" :title="item.label" is-link>
			</van-cell>
		</van-cell-group>
		<van-divider hairline customStyle="width:90%;margin: 0 auto;margin-top:10%;" />
	</view>
</template>
<script>
	import axios from "../../common/util/axios.js";
	import '../../static/css/public/style.css';
	export default {
		data() {
			return {
				config: {
					title: '选择地区',
					bgColor: '#eaeaea',
					color: '#000000',
					hideback: false,
				},
				workplace: '',
				country: '',
				type: '',
				code: '',
			}
		},
		methods: {
			chose(data) {
				//获取页面信息通道
				let channel = this.getOpenerEventChannel();
				let that = this;
				//当前页面是国家选项时，点击不是中国大陆时，直接返回上一页，
				if (data.label != '中国大陆' && data.type == 'country') {
					this.workplace = data.label;
					channel.emit('acceptWorkplace', {
						data: that.workplace
					});
					wx.navigateBack({
						delta: 1
					});
				} else if (data.type == 'country') {
					wx.navigateTo({
						url: 'country_chose?type=1',
						events: {
							//接收页面的返回值
							acceptWorkplace: function(res) {
								let temp = res.data;
								channel.emit('acceptWorkplace', {
									data: temp
								});
								wx.navigateBack({
									delta:2
								})
							}
						}
					})
				} else if (data.type == 'province') {
					channel.emit('acceptWorkplace', {
						data: data.label,
					});
				}
			},
			opt() {
				let that = this;
				this.$axios({
					methods: 'get',
					url: '/user/country/opt',
					params: {
						type: that.type,
						code: that.code
					}
				}).then(res => {
					that.country = res.data.data;
				}).catch(error => {
					console.log(error);
				})
			}
		},
		onLoad(option) {
			this.workplace = option.workplace;
			this.type = option.type;
			if (option.code) {
				if (option.code == null||option.code=="") {
					this.code = "";
				} else {
					this.code = this.option.code;
				}
			}
			this.opt();
		}
	}
</script>
<style>
</style>

<template>
	<view class="main">
		<nv :config="config"></nv>
		<van-divider hairline customStyle="width:90%;margin: 0 auto;margin-top:5%;" />
		<van-cell-group inset>
			<van-cell center title="头像" size="large" is-link>
				<van-image @click="upload_header" width="50" height="50" fit="cover" :src="userInfo.head" />
			</van-cell>
			<van-cell title="昵称" @click="field_radio_cell('nickName')" size="large" is-link>
				<span>{{userInfo.nick_name}}</span>
			</van-cell>
			<van-cell @click="field_radio_cell('gender')" title="性别" size="large" is-link>
				<view v-for="(item,index) in genders" :key="index">
					<span v-if="userInfo.gender==item.value">
						{{item.label}}
					</span>
				</view>
			</van-cell>
			<button class="btn" @click="save" type="primary" style="width: 90%;margin-top: 40rpx;">保存</button>
		</van-cell-group>
	</view>
</template>
<script>
	import {
		areaList
	} from "@vant/area-data"
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
					title: '个人信息',
					bgColor: 'linear-gradient(90deg, RGB(122, 120, 255), RGB(103, 220, 225))',
					color: '#ffffff',
					hideback: false,
				},
				module: {
					show: false,
					title: '',
					type: '',
					value_type: '',
					placeholder: '',
				},
				userInfo: {
					id: '',
					head: '',
					nick_name: '',
					gender: '',
					marital_status: '0',
					mongol_level: '4',
					education: '',
					birthday: '',
					height: '',
					weight: '',
					school: '',
					workplace: '',
					work_desc: '',
					hometown: '',
					annual_income: '',
					economy: '',
					character_hobby: '',
					hope_half: '',
					future_plan: ''
				},
				workplace: '',
				nickName: '',
				//性别选项
				genders: [],
				//教育选项
				education: [],
				//婚姻选项
				marriage: [],
				//蒙古语选项
				mongolia: [],
				//身高选项
				height_opt: [],
				weight_opt: [],
				//年收入选项
				annual_income_opt: [],
				//经济实力选项
				economy_opt: [],
				//希望对方选项
				hope_opt: [],
				//未来规划选项
				future_opt: [],
				hobby_opt: [],
				options: [],
			}
		},
		methods: {
			//获取用户手机号
			getPhoneNumber(e) {
				
			},
			//子组件传值接收方法
			finish(data) {
	
			},
			//获取选项
			opt() {
				
			},
			save() {
				let that = this;
				//请求
				uni.setStorageSync('userInfo', this.userInfo);
				this.$axios({
					method:"post",
					url:"/user/save",
					data:{user:that.userInfo},
				}).then(res=>{
					res = res.data;
					if(res.state=='ok'){
						let user = res.data;
						let data={
							openId:user.openid,
							login_flag:true,
							nickName:user.nick_name,
							avatarUrl: user.head
						}
						uni.setStorageSync('userInfo', user);
						wx.showToast({
							title: '保存成功',
							icon: 'success',
							duration: 2000
						})
						wx.switchTab({
							url: "/pages/mine/mine",
							success: (e) => {
								var page = getCurrentPages().pop();
								if (page == undefined || page == null) return;
								//switchTab成功跳转后调用success,此时可以拿到跳转后页面的page对象,
								//从而调用页面onLoad方法重载页面;
								page.onLoad();
							}
						});
					}
					
				}).catch(err=>{
					wx.showToast({
						title:'保存失败',
						icon:'error',
						duration:2000
					})
				})
				
				
			}
		},
		onLoad(option) {

		}
	}
</script>
<style>
</style>

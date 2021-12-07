<template>
	<van-popup :show="show" :round="true"  @click-overlay="closeEmpowerPopup"
		custom-style="width:60%;height:25%;display:flex;align-items:center;justify-content: center;font-size:20px">
		<view style="width: 90%; height: 90%;">
			<view style="top: -1;text-align: right;">
				<van-icon @click="closeEmpowerPopup" name="close" />
			</view>
			<view style="margin: 0 auto;text-align: center;margin-bottom:5%;">登录或注册</view>
			<!-- 获取用户手机号 -->
			<!-- 				<button type="primary" class="btn" open-type="getPhoneNumber"  @getPhoneNumber="getUserInfo" ><van-icon name="wechat"/>微信快速登录</button>
	-->
			<button type="primary" open-type="getUserProfile" class="btn" @tap="getUserProfile">
				<van-icon name="wechat" />微信快速登录
			</button>
			<view class="div-row" style="margin-top: 15%;">
				<van-checkbox :value="checked" shape="square" @change="onChange">
				</van-checkbox>
				<view class="div-row" style="font-size: small;">我同意遵守<a url="clause">《会员服务协议》</a></view>
			</view>
		</view>
	</van-popup>
</template>
<script>
	import Toast from '../../wxcomponents/vant/dist/toast/toast.js'
	import axios from "../../common/util/axios.js";
	import '../../static/css/public/style.css';
	import '../../static/css/icon/iconfont.css';
	export default{
		name:'login-popup',//登录组件
		data(){
			return{
				show:false,
				message:'',
				checked:false
			}
		},
		methods:{
			onChange(event) {
			    this.checked=event.detail;
			},
			popup_show(){
				this.show = true;
			},
			closeEmpowerPopup(){
				this.show = false;
			},
			//获取用户信息
			getUserProfile() {
				if(!this.checked){
					Toast("请先阅读并同意协议");
					return false;
				}
				let that = this;
				wx.getUserProfile({
					desc: "Wexin",
					success: function(res) {
						//用户信息
						const userInfo = res.userInfo;
						//console.log(userInfo)
						//性别 0:未知 1：男 2：女
						const {
							nickName,
							avatarUrl,
							gender,
							province,
							city,
							country
						} = userInfo;
						that.wx_login(userInfo);
					},
					fail: (res) => {
						Toast("需要授权,才能完成注册/登录");
					}
				})
			
			},
			//wx登录，用于获取用户登录凭证，使用 code 换取 openid、unionid、session_key 等信息
			wx_login(userInfo) {
				let that = this;
				let nickName = userInfo.nickName;
				let avatarUrl = userInfo.avatarUrl;
				let gender = userInfo.gender;
				//wx 登录
				wx.login({
					success(res) {
						if (res.code) {
							//发起网络请求
							let code = res.code;
							that.$axios({
								methods: 'get',
								url: '/user/login',
								params: {
									code: code,
									nickName: nickName,
									avatarUrl: avatarUrl,
									gender: gender
								}
							}).then(res => {
								let value = res.data;
								if (value.state == 'ok') {
									let user = value.data.user;
									//第一次注册的用户需要去完善自己的信息。
									if (value.data.first === 1) {
										//是否需要openid?
										wx.navigateTo({
											url: '../register/user_info?type=add&nickName=' + nickName +
												'&avatarUrl=' + avatarUrl + "&gender=" + gender +
												"&title=请完善个人信息&id="+user.id
										})
									} else {
										let data={
											openId:user.openid,
											login_flag:true,
											nickName:user.nick_name,
											avatarUrl: user.head
										}
										that.$emit("change_login_state",data);
										that.$emit("get_info",user);
										uni.setStorageSync('userInfo', user);
										
									}
									//将jwt放入缓存中
									wx.setStorage({
										key: 'jwt',
										data: value.data.jwt
									});
									that.closeEmpowerPopup();
								} else {
									//code 过期时的处理
									//重新获取或弹窗让重新点击授权
								}
							}).catch(err => {
								console.log(err)
							})
						}
					},
				})
			}
		}
	}
</script>
<style>
</style>

<template>
	<view class="main">
		<!-- header -->
		<nv :config="config"></nv>
		<van-toast id="van-toast"/>
		<login-popup ref="loginPopup" @change_login_state="changeState" @get_info="getInfo"></login-popup>
		<van-divider hairline customStyle="width:90%;margin: 0 auto;" />
		<view class="div-row" style="width: 90%;margin: 0 auto;padding: 5%;">
			<view style="padding-left: 1%; padding-right: 5%;">
				<van-image v-if="!login_flag" @click="empower" width="20vw" height="20vw" fit="cover"
					src="https://img.yzcdn.cn/vant/cat.jpeg" round />
				<van-image v-if="login_flag" @click="lookHead" width="20vw" height="20vw" fit="cover" :src="avatarUrl" round />
			</view>
			<view style="display: flex;text-align: left;align-items: center;">
				<view v-if="!login_flag" class="div-column" style="color: #FFFFFF;">
					<view style="font-size: x-large;">
						未登录/注册
					</view>
					<view style="font-size: medium;">
						点击头像可登录/注册
					</view>
				</view>
				<view v-if="login_flag" class="div-column" style="color: #FFFFFF;">
					<view style="font-size:large;">
						{{nickName}}
					</view>
				</view>
			</view>
			<view></view>
		</view>
		<view style="height: 80%;width: 100%;background-color: #FFFFFF;border-radius: 50rpx 50rpx 0 0">
		<!-- 	<van-cell-group custom-class="my-cell-group">
				<view class="div-row"
					style="height:100%;align-items: center;justify-content: space-evenly;margin-top:5%">
					<view @click="mine_info" class="ml-grid div-row" style="width: 48%;height:100%;">
						<div style="width: 70%;height: 100%;">
							<van-row>
								个人资料
							</van-row>
							<van-row style="font-size: smaller;">
								完善资料
							</van-row>
						</div>
						<div class="h-v-center" style="width: 30%;height: 100%;">
							<i class="my-icon icon-test1"></i>
						</div>
					</view>
					<view @click="mine_image" class="ml-grid div-row" style="width: 48%;height:100%;">
						<div style="width: 70%;height: 100%;">
							<van-row>
								我的照片
							</van-row>
							<van-row style="font-size: smaller;">
								上传照片
							</van-row>
						</div>
						<div class="h-v-center" style="width: 30%;height: 100%;">
							<i class="my-icon icon-test"></i>
						</div>
					</view>
				</view>
			</van-cell-group> -->
			<view style="margin-top: 10%;">
				<view style="width: 90%;margin: 0 auto;border-radius: 20rpx;background-image: linear-gradient(270deg,#cec2c2,RGB(103, 220, 225), RGB(122, 120, 255));box-shadow:0 0 9px 3px #999;">
					<van-grid direction="horizontal" :column-num="2">
						<van-grid-item use-slot @click="mine_info">
							<view @click="mine_info" style="display: flex;flex-direction: row;">
								<i @click="mine_info" class="t-icon gerenxinxi1"></i>
								<view @click="mine_info" style="display: flex;align-items: center;color: #FFFFFF;font-weight:800;font-family:'SimSun',Times,serif;">个人信息</view>
							</view>
						</van-grid-item>
						<van-grid-item use-slot  @click="album">
							<view @click="album" style="display: flex;flex-direction: row;">
								<i @click="album" class="t-icon shangchuantupian"></i>
								<view @click="album" style="display: flex;align-items: center;color: #FFFFFF;font-weight:800;font-family:'SimSun',Times,serif;">我的照片</view>
							</view>				
						</van-grid-item>
					</van-grid>
				</view>
				<view style="margin-top: 5%;">
					<van-cell-group >
						<van-cell title="我的举报" size="large" icon="bulb-o" is-link></van-cell>
						<van-cell title="隐私设置" size="large" icon="eye-o" is-link></van-cell>
					</van-cell-group>
					<van-cell-group>
						<van-cell title="联系我们" size="large" icon="phone-o" is-link></van-cell>
						<van-cell title="加入群组" size="large" icon="friends-o" is-link></van-cell>
						<van-cell title="意见反馈" @click="feeback" size="large" icon="info-o" is-link></van-cell>
						<van-cell title="服务协议" @click="clause" size="large" icon="orders-o" is-link></van-cell>
					</van-cell-group>
				</view>	
			</view>
		</view>
	</view>
</template>
<script>
	import loginPopup from '@/components/login-popup/login-popup.vue'
	import Toast from '../../wxcomponents/vant/dist/toast/toast.js'
	import axios from "../../common/util/axios.js";
	import '../../static/css/public/style.css';
	import '../../static/css/icon/iconfont.css';
	import	'../../static/iconfont-weapp/iconfont-weapp-icon.css';
	export default {
		components: {
			loginPopup
		},
		data() {
			return {
				show: false,
				message: '',
				config: {
					title: '我的',
					bgColor: 'linear-gradient(90deg, RGB(122, 120, 255), RGB(103, 220, 225))',
					color: '#ffffff',
					hideback: true,		
				},
				login_flag: false,
				nickName: '',
				avatarUrl: '',
				userInfo:'',
				actions:[{ name: '更换头像' }],
			}
		},
		methods: {
			clause(){
				wx.navigateTo({
					url: 'clause'
				})
			},
			changeState(data){
				this.login_flag = data.login_flag;
				this.nickName = data.nickName;
				this.avatarUrl = data.avatarUrl;
			},
			getInfo(data){
				this.userInfo = data;
			},
			lookHead(){
				let data = this.avatarUrl;
				wx.navigateTo({
					url: 'headerPortrait?url='+ data
				})
			},
			mine_info(){
				if(this.userInfo!=''&&this.userInfo!=null){
					let data = JSON.stringify(this.userInfo);
					wx.navigateTo({
						url: '../register/user_info?type=change&title=个人信息&data='+ data
					})
				}else{
					this.hint();
				}
			},
			album(){
				if(this.userInfo!=''&&this.userInfo!=null){
					let openid = this.userInfo.openid;
					wx.navigateTo({
						url: 'album?openid='+openid
					})
				}else{
					this.hint();
				}
			},
			hint(){
				uni.showToast({
					icon:"none",
					image:"../../static/img/mine/shilian.png",
					title:"与爱情只差登录",
				})
				//Toast.fail('   你和爱情\n只差一步登录');
			},
			feeback() {
				wx.navigateTo({
					url: 'collaboration'
				})
			},
			empower() {
				this.$refs['loginPopup'].popup_show();
			},
			mine_image() {
				console.log("用户图片");
			},
			//获取用户手机号
			getPhoneNumber(e) {
				wx.login({
					success(res) {
						console.log(res);
						if (res.code) {
							//发起网络请求
							console.log(e)
							console.log(e.detail.errMsg)
							console.log(e.detail.iv)
							console.log(e.detail.encryptedData)
						} else {
							console.log('登录失败！' + res.errMsg)
						}
					}
				})
			},

		},
		onLoad(option) {
			let that = this;
			uni.getStorage({
				key: 'userInfo',
				success: function(res) {
					let userInfo = res.data.user;
					if (userInfo != "" && userInfo != null) {
						that.userInfo = res.data.user;
						that.login_flag = true;
						that.nickName = userInfo.nick_name;
						that.avatarUrl = userInfo.head;
					}
				}
			})

		},
		created() {

		},
		mounted() {

		}
	}
</script>
<style>
	.head-img {
		width: 20%;
		height: 100%;
	}

	.head-img-border {
		border-style: solid;
		border-color: #F0F0F0;
		border-width: 2px;
		margin-top: 40rpx;
	}

	.my-cell-group {
		height: 10%;
	}
</style>

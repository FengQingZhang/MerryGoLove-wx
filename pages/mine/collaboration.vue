<template>
	<view class="main-no-color" style="background-color: #dcd5d5;">
		<nv :config="config"></nv>
		<van-toast id="van-toast"/>
		<login-popup ref="loginPopup"></login-popup>
		<van-cell-group title="意见与反馈">
		  <van-field
		    :value="message"
		    type="textarea"
		    placeholder="反馈与意见"
			maxlength="200"
		    autosize
		    border="false"
			show-word-limit="true"
		  />
		</van-cell-group>
		<van-cell-group title="联系电话">
		  <van-field
		    :value="phone"
		    placeholder="选填,便于我们与你联系"
			maxlength="11"
		  />
		</van-cell-group>
		<button class="btn" @click="save" type="primary" style="width: 90%;margin-top: 40rpx;">提交</button>
	</view>
</template>
<script>
	import loginPopup from '@/components/login-popup/login-popup.vue'
	import Toast from '../../wxcomponents/vant/dist/toast/toast.js'
	import axios from "../../common/util/axios.js";
	import '../../static/css/public/style.css'
	export default{
		components:{
			loginPopup
		},
		data(){
			return{
				config: {
					title: '意见反馈',
					bgColor: 'linear-gradient(90deg, RGB(122, 120, 255), RGB(103, 220, 225))',
					color: '#ffffff',
					hideback: false,
					message: '',
				},
				user:'',
				message:'',
				phone:'',
			}
		},
		methods:{
			save(){
				this.$refs['loginPopup'].popup_show();
			}
		},
		onLoad(option) {
			let that = this;
			uni.getStorage({
				key: 'userInfo',
				success: function(res) {
					let userInfo = res.data;
					console.log(res.data);
					if (userInfo != "" && userInfo != null) {
						that.user = userInfo;
					}else{
						that.$refs['loginPopup'].popup_show();
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
</style>

<template>
	<view class="main-no-color">
		<!-- header -->
		<nv :config="config"></nv>
		<van-divider hairline customStyle="width:90%;margin: 0 auto;margin-top:1%;" />
		<view v-for="(item,index) in message_list" :key="index" style="margin-top: 1%;">
			<van-swipe-cell  right-width="65" left-width="0">
				<van-cell-group >
					<view @click="to_chat_with(item)">
						<van-row>
							<van-col span="4">
								<image style='width: 15vw; height: 15vw; border-radius: 35rpx;padding: 1vw;' :src='item.avatarUrl'>
								</image>
							</van-col>
							<van-col span="20">
								<van-row>
									<van-col span="15">
										<view class="font-yahei" style="padding: 1vw;font-weight: 600;">
										{{item.userName}}
									</view>
									</van-col>
									<van-col span="5">
										<view class="font-yahei" style="text-align: end;font-size: x-small;width: 30vw;">
											{{item.time|DataFilter}}
										</view>
									</van-col>
								</van-row>
								<van-row>
									<van-col span="19">
										<view class="font-yahei" style="padding: 1vw;padding-top: 2vw;font-size: 4vw;color:#9a9292ef">
										{{item.lastMsg|msgToLongFilter}}
										</view>
									</van-col>
									<van-col span="1">
										<view style="width: 15vw;text-align: end;">
											<van-tag round type="danger">{{item.unread}}</van-tag>
										</view>
							
									</van-col>
								</van-row>
							</van-col>
						</van-row>
					</view>
				</van-cell-group>
				<view slot="right">
					<van-button @click.stop="del(index)" type="danger">删除</van-button>
				</view>
			</van-swipe-cell>
		</view>

	</view>
</template>
<script>
	import axios from "../../common/util/axios.js";
	import config from "../../common/config.js";
	import '../../static/css/public/style.css';
	import '../../static/css/icon/iconfont.css';
	let p;
	export default {
		data() {
			return {
				show: false,
				config: {
					title: '消息',
					bgColor: '#ffffff',
					color: '#000000',
					hideback: true,
					message: '',
				},
				self_headIcon: '',
				self_openid: '',
				message_list: [{
						avatarUrl: 'https://img.yzcdn.cn/vant/cat.jpeg',
						userName: "廓-KUO",
						lastMsg: "你好，可以认识一下吗你好啊吗啊吗",
						unread: '99+',
						time: 1638780938657,
					},
					{
						avatarUrl: 'https://img.yzcdn.cn/vant/cat.jpeg',
						userName: "小仙女",
						lastMsg: "床前明月光，疑似地上霜，举头",
						unread: '3',
						time: 1638780938657,
					}
				],
				wbs: '', //websocket对象
			}
		},
		methods: {
			//删除聊天对象
			del(index){
				console.log(index);
			},
			//跳转到聊天界面
			to_chat_with(e) {
				let targetUser = e.userName;
				//需要openid建立websocket
				let targetOpenId = 'oLnAw6e6PaF4UiGvZyrJuArkmxqg';
				let that = this;
				this.wbs.close();
				wx.navigateTo({
					url: 'chat?chatWith=' + targetUser + "&openid=" + targetOpenId + "&selfHead=" + that
						.self_headIcon,
				})
			},
			//websocket长链接
			websocketInit() {
				let that = this;
				let socketUrl = config.websocket_address + this.self_openid;
				socketUrl = socketUrl.replace("https", "ws").replace("http", "ws");
				//连接websocket
				this.wbs = wx.connectSocket({
					url: socketUrl,
					success: (res) => {
						console.log("连接成功");
					},
					fail: (error) => {
						console.log("连接失败" + errror);
					}
				});
				//有信息时触发
				this.wbs.onMessage(function(res) {
					that.socketMsgParse(res.data);
				})
			},
			//websocket消息
			async socketMsgParse(data) {
				let jsonData = JSON.parse(data);
				//unix格式的时间戳需要乘1000
				let date = jsonData.time;
				let flag = true;
				//异步需要await一下。
				//消息列表是否含有该好友发的信息不应该，只从前端判断
				for(let i=0;i<this.message_list.length;i++){
					if (this.message_list[i].userName == jsonData.from) {
						this.message_list[i].lastMsg = jsonData.msg;
						this.message_list[i].time = date;
						//如果已经是99+了,不用修改，
						if(this.message_list[i].unread!='99+'){
							let unread_count = Number(this.message_list[i].unread) + 1;
							//未读消息超过100，显示99+；
							if(unread_count>=100){
								this.message_list[i].unread ="99+";
							}else{
								this.message_list[i].unread = unread_count;
							}
						}
						flag = false;
						break;
					}
					
				}

				//如果消息列表没有，则
				if (flag) {
					this.message_list.unshift({
						userName: jsonData.from,
						unread: 1,
						lastMsg: jsonData.msg,
						avatarUrl: jsonData.head,
						time: date
					});
				}

			},
			// 判断时间为今天
			judgeTime(data){
			    var date = data.toString();
			    var year = data.getFullYear();
			    var month = data.getMonth() + 1;
			    var day = data.getDate();
			    var d1 = new Date(year + '/' + month + '/' + day);
			    var dd = new Date();
			    var y = dd.getFullYear();
			    var m = dd.getMonth() + 1;
			    var d = dd.getDate();
			    var d2 = new Date(y + '/' + m + '/' + d);
			    var iday = parseInt(d2 - d1) / 1000 / 60 / 60 / 24;
			    return iday;
			  },

		},
		filters:{
			//消息信息太长的过滤
			msgToLongFilter(val){
				if(val.length>15){
					return val.substring(0,13)+'……';
				}else{
					return val;
				}
			},
			//时间过滤器
			DataFilter(val){
				let date = new Date(val);
				let Y = date.getFullYear();
				let M = date.getMonth() + 1;
				let D = date.getDate();
				let h = date.getHours();
				let m = date.getMinutes();
				let s = date.getSeconds();
				let num = p.judgeTime(date);
				if(num==0){
					return h+":"+m;
				}else if(num==1){
					return "昨天";
				}else{
					return Y+"年"+M+"月"+D+"日";
				}
			}
		},
		onShow() {
			if (this.self_openid != "") {
				if (this.wbs == null || this.wbs == "") {
					this.websocketInit();
				}
			} else {
				let that = this;
				uni.getStorage({
					key: 'userInfo',
					success: function(res) {
						let userInfo = res.data;
						if (userInfo != "" && userInfo != null) {
							that.login_flag = true;
							that.nickName = userInfo.nickName;
							that.self_headIcon = userInfo.head;
							that.self_openid = userInfo.openid;
							that.websocketInit();
						}
					}
				})
			}
		},
		beforeCreate() {
			p=this;
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

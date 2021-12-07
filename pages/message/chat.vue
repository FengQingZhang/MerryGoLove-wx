<template>
	<view class="main-no-color" style="background-color: #f1f1f1;">
		<nv :config="config"></nv>
		<van-divider hairline customStyle="width:90%;margin: 0 auto;margin-top:1%;" />
		<scroll-view :scroll-y="true" :scroll-into-view="toView">
			<block v-for='(item,index) in msgList' :key="index">
				<!-- 单个消息1 客服发出（左） -->
				<view v-if="item.speaker=='others'" :id="'msg-'+index"
					style='display: flex; padding: 2vw 11vw 2vw 2vw;'>
					<view style='width: 11vw; height: 11vw;'>
						<image style='width: 11vw; height: 11vw; border-radius: 10rpx;' :src='othersHeadIcon'></image>
					</view>
					<view class='leftMsg'>
						<view class="left-triangle"></view>
						{{item.content}}
					</view>
				</view>

				<!-- 单个消息2 用户发出（右） -->
				<view v-else :id="'msg-'+index"
					style='display: flex; justify-content: flex-end; padding: 2vw 2vw 2vw 11vw;'>
					<view class='rightMsg'>
						<view class="right-triangle"></view>
						{{item.content}}
					</view>
					<view style='width: 11vw; height: 11vw;'>
						<image style='width: 11vw; height: 11vw; border-radius: 10rpx;' :src='selfHeadIcon'></image>
					</view>
				</view>
			</block>
			<!-- 占位空间 -->
			<view style='width: 100%; height: 18vw;'></view>
		</scroll-view>
		<view id="inputRoom" class='inputRoom' :style="{height:inputHight+'vw'}">
			<view style="display: flex;align-items: center;margin-top: 2vw;">
				<view @click="showEmoji" style="margin-left: 3vw;font-size: 6vw;">☺</view>
				<input v-model="msg" name="input" id="msg-input" :adjust-position='false' @confirm='send'
					confirm-type='send' @focus='focus' @blur='blur'></input>
				<button formType="submit" class="btn" type="primary" @click='sendClick' style='width: 18vw;'
					size="mini">发送</button>
			</view>
			<view v-show="emjioBar">
				<scroll-view class="emjio-view-item" :scroll-y="true">
					<van-grid border="false" :column-num="8">
						<van-grid-item use-slot v-for="(item,index) in face" :key='index'>
							<view style="font-size: 6vw;" @click="emojiChose(item.value)">{{item.value}}</view>
						</van-grid-item>
					</van-grid>
				</scroll-view>
			</view>
		</view>

	</view>
</template>
<script>
	import axios from "../../common/util/axios.js";
	import config from "../../common/config.js";
	import '../../static/css/chat/chat.css';
	import '../../static/css/public/style.css';
	import '../../static/css/icon/iconfont.css';
	export default {
		data() {
			return {
				emjioBar: false,//表情框是否显示
				inputHight: '18',
				config: {
					title: '消息',
					bgColor: '#ffffff',
					color: '#000000',
					hideback: false,
					message: '',
				},
				othersHeadIcon:'https://img.yzcdn.cn/vant/cat.jpeg',//聊天对象的头像
				selfHeadIcon: '',//登录者的头像
				openid: '',//登录者openid
				othersOpenid:'',//聊天对象的openid
				msg: '',//聊天输入框绑定值
				msgList: [{
						speaker: 'others',
						contentType: 'text',
						content: '欢迎来到英雄联盟，敌军还有30秒到达战场，请做好准备！'
					},
					{

						speaker: 'me',
						contentType: 'text',
						content: '我怕是走错片场了...'
					}
				],
				toView: '',
				wbs: '',//websocket对象
				face: [],//表情数据
			}
		},
		methods: {
			//输入框获取焦点时缩小宽度
			focus() {
				//this.inputWidth =70;
				//this.show =true;
			},
			//输入失去焦点时增大宽度。
			blur() {
				//this.inputWidth =89;
				//this.show = false;
			},
			sendClick() {
				let msg = this.msg;
				this.msgList.push({
					speaker: 'me',
					contentType: 'text',
					content: msg,
				});
				this.msg = '';
			},
			send(e) {
				this.msg = '';
				this.msgList.push({
					speaker: 'me',
					contentType: 'text',
					content: e.detail.value,
				});
			},
			//websocket初始化
			webSocketInit() {
				let socketUrl = config.websocket_address + this.openid;
				socketUrl=socketUrl.replace("https", "ws").replace("http", "ws");
				this.wbs = wx.connectSocket({
					url: socketUrl,
					success: (res) => {
						console.log("连接成功");
					},
					fail: (error) => {
						console.log("连接失败"+errror);
					}
				});
			},
			//表情选择
			emojiChose(val){
				this.msg+= val;
			},
			//表情框的显示与隐藏
			showEmoji() {
				if (this.emjioBar) {
					this.emjioBar = false;
					this.inputHight = 18;
				} else {
					this.emjioBar = true;
					this.inputHight = 65;
				}
			},
			//获取表情的数据。
			emojiOpt() {
				let that = this;
				this.$axios({
					methods: 'get',
					url: '/chat/emoji',
					params: {}
				}).then(res => {
					that.face = res.data;
				}).catch(erro => {
					console.log(erro);
				})
			}
		},
		onLoad(option) {
			this.config.title = option.chatWith;
			this.openid = option.openid;
			this.selfHeadIcon = option.selfHead;
			this.emojiOpt();
			this.webSocketInit();
		},
		created() {

		},
		mounted() {

		}
	}
</script>
<style>
</style>

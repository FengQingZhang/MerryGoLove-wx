<template>
	<view class="main-no-color">
		<nv :config="config"></nv>
		<van-toast id="van-toast" />
		<view class="album-div">
			<van-empty v-show="!show" class="custom-image" image="https://img01.yzcdn.cn/vant/custom-empty-image.png"
				description="空空如也,也是一种态度">
				<van-button round type="danger" class="bottom-button" @click='openUploader'>选择照片</van-button>
			</van-empty>
			<view v-show="show">
				<uni-file-picker ref="picker" v-model="images" file-mediatype="image" mode="grid" file-extname="png,jpg"
					:limit="9" :auto-upload="false" @fail="fail" @select="select" @delete="del">
				</uni-file-picker>
				<view style="margin-top: 10%;">
					<button type="warn" @click="upload">确认上传</button>
				</view>
			</view>
		</view>
	</view>
</template>
<script>
	import Toast from '../../wxcomponents/vant/dist/toast/toast.js'
	import axios from "../../common/util/axios.js";
	import config from "../../common/config.js";
	import '../../static/css/public/style.css';
	import '../../static/css/album/album.css';
	export default {
		data() {
			return {
				config: {
					title: '我的照片',
					bgColor: 'linear-gradient(90deg, RGB(122, 120, 255), RGB(103, 220, 225))',
					color: '#ffffff',
					hideback: false,
				},
				openid: '',
				images: [],
				fileList: [],
				show: false,
			}
		},
		methods: {
			//上传相片按钮事件，
			openUploader() {
				this.$refs['picker'].choose();
				this.show = true;
			},
			// 获取上传状态
			select(e) {
				//将文件加入上传list
				for (let i = 0; i < e.tempFiles.length; i++) {
					let parameter = e.tempFiles[i].file;
					let file = {
						cloudPath: parameter.cloudPath,
						fileType: parameter.fileType,
						name: parameter.name,
						filePath: parameter.path,
					}
					this.fileList.push(file);
				}
			},
			del(e) {
				this.fileList = this.fileList.filter(item => {
					return !item == e.tempFile.cloudPath
				})
			},
			fail(e) {
				console.log(e);
			},
			//确认上传
			upload() {
				if (this.fileList.length < 2) {
					Toast('请上传不少于2张照片');
					return false;
				}
				let toast = Toast.loading({
					duration: 0, // 持续展示 toast
					message: '上传中...',
					forbidClick: true,
				});
				//云空间上传
				//this.could_upload();
				//服务器上传
				this.self_upload();

			},
			//服务器上传
			//微信小程序只能单文件上传，目瞪口呆
			self_upload() {
				let openid = this.openid;
				let files = this.fileList;
				let requestArr = [];
				for (let i = 0; i < files.length; i++) {
					requestArr.push(new Promise((resolve,reject)=>{
						wx.uploadFile({
						      url: config.url + '/user/photo',
						      filePath: files[i].filePath,
						      name: 'file',
						      formData: {
						        'openid':openid
						      },
							  header: {
							  	"content-type": "multipart/form-data",
							  },
						      success:(res)=>{
								resolve(res);
						        //do something
						      },
							  fail: (error) => {
							  	reject(error);
							  }
						})
					}));
				}
				Promise.all(requestArr).then((res)=>{
					Toast.success("上传成功");
				}).catch((error)=>{
					Toast.fail("上传失败");
					console.log(error);
				});
				//清空请求队列；
				requestArr=[];
			},
			//上传至云空间
			could_upload() {
				this.fileList.forEach(e => {
					uniCloud.uploadFile({
						cloudPath: e.cloudPath,
						filePath: e.filePath,
						success: (e) => {
							
							console.log(e);
						}
					})
				})
			},
		},
		onLoad(option) {
			this.openid = option.openid;
		}
	}
</script>
<style>
</style>

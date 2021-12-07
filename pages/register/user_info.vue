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
			<van-cell @click="field_radio_cell('marriage')" title="婚姻状况" size="large" is-link>
				<view v-for="(item,index) in marriage" :key="index">
					<span v-if="userInfo.marital_status==item.value">
						{{item.label}}
					</span>
				</view>
			</van-cell>
			<van-cell @click="pick_cell('birthday')" title="出生年月" size="large" is-link>
				{{userInfo.birthday|dateToStr}}
			</van-cell>
			<van-cell @click="field_radio_cell('mongolia')" title="蒙语程度" size="large" is-link>
				<view v-for="(item,index) in mongolia" :key="index">
					<span v-if="userInfo.mongol_level==item.value">
						{{item.label}}
					</span>
				</view>
			</van-cell>
			<van-cell @click="pick_cell('height')" title="身高" size="large" is-link>
				{{userInfo.height}}
			</van-cell>
			<van-cell @click="pick_cell('weight')" title="体重" size="large" is-link>
				{{userInfo.weight}}
			</van-cell>
			<van-cell @click="pick_cell('hometown')" title="家乡" size="large" is-link>
				{{userInfo.hometown}}
			</van-cell>
			<van-cell @click="field_radio_cell('education')" title="最高学历" szie="large" is-link>
				<view v-for="(item,index) in education" :key="index">
					<span v-if="userInfo.education==item.value">
						{{item.label}}
					</span>
				</view>
			</van-cell>
			<van-cell @click="field_radio_cell('school')" title="毕业院校" size="large" is-link>
				{{userInfo.school}}
			</van-cell>
			<van-cell @click="chose_count" title="工作地址" size="large" is-link>
				{{userInfo.workplace}}
			</van-cell>
			<van-cell @click="field_radio_cell('work_desc')" title="工作描述" size="large" is-link>
				{{userInfo.work_desc}}
			</van-cell>
			<van-cell @click="field_radio_cell('economy')" title="经济实力" size="large" is-link>
				{{userInfo.economy}}
			</van-cell>
			<van-cell @click="field_radio_cell('annual_income')" title="年收入水平" size="large" is-link>
				<view v-for="(item,index) in annual_income_opt" :key="index">
					<span v-if="userInfo.annual_income==item.value">
						{{item.label}}
					</span>
				</view>
			</van-cell>
			<van-cell title="性格爱好" @click="field_radio_cell('hobby')" size="large" is-link>
				{{userInfo.character_hobby}}
			</van-cell>
			<van-cell title="希望对方" @click="field_radio_cell('hope')" size="large" is-link>
				{{userInfo.hope_half}}
			</van-cell>
			<van-cell title="未来规划" @click="field_radio_cell('future')" size="large" is-link>
				{{userInfo.future_plan}}
			</van-cell>
			<button class="btn" @click="save" type="primary" style="width: 90%;margin-top: 40rpx;">保存</button>
			<van-divider hairline customStyle="width:90%;margin: 0 auto;margin-top:10%;" />

		</van-cell-group>
		<!-- 自定义组件 -->
		<info-change ref="infoChange" :value_type="module.value_type" :title="module.title" :type="module.type"
			:options="options" :placeholder="module.placeholder" @returnData="finish">
		</info-change>
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
			//点击单元格出现radio或textarea
			field_radio_cell(type) {
				let title;
				let value;
				let that = this;
				switch (type) {
					case "nickName":
						title = "修改昵称";
						value = this.userInfo.nick_name;
						this.module.type = 'field';
						break;
					case "gender":
						title = "性别";
						this.options = this.genders;
						value = this.userInfo.gender;
						this.module.type = 'radio';
						break;
					case "marriage":
						title = "婚姻状况";
						this.options = this.marriage;
						value = this.userInfo.marital_status;
						this.module.type = 'radio';
						break;
					case "mongolia":
						title = "蒙语程度";
						this.options = this.mongolia;
						value = this.userInfo.mongol_level;
						this.module.type = 'radio';
						break;
					case "education":
						title = "最高学历";
						this.options = this.education;
						value = this.userInfo.education;
						this.module.type = 'radio';
						break;
					case "school":
						title = "毕业院校";
						this.$refs['infoChange'].placeholder = "请输入毕业院校";
						if (!this.isEmpty(this.userInfo.school)) {
							value = this.userInfo.school;
						} else {
							this.$refs['infoChange'].textarea_clear();
							value="";
						}
						this.module.type = 'textarea';
						break;
					case "work_desc":
						title = "工作描述";
						this.$refs['infoChange'].placeholder = "工作单位和职位描述";
						if (!this.isEmpty(this.userInfo.work_desc)) {
							value = this.userInfo.work_desc;
						} else {
							this.$refs['infoChange'].textarea_clear();
							value="";
						}
						this.module.type = 'textarea';
						break
					case "annual_income":
						title = "年收入";
						this.options = this.annual_income_opt;
						value = this.userInfo.annual_income;
						this.module.type = 'radio';
						break;
					case "economy":
						title = "经济实力";
						this.options = this.economy_opt;
						this.$refs['infoChange'].placeholder = "自由发挥";
						if (!this.isEmpty(this.userInfo.economy)) {
							value = this.userInfo.economy;
						} else {
							value = "";
						}
						this.module.type = 'tag_textarea';
						break;
					case "hobby":
						title = "性格爱好";
						this.options = this.hobby_opt;
						this.$refs['infoChange'].placeholder = "请输入兴趣爱好";
						if (!this.isEmpty(this.userInfo.character_hobby)) {
							value = this.userInfo.character_hobby;
						} else {
							value = "";
						}
						this.module.type = 'tag_textarea';
						break;
					case "hope":
						title = "希望对方";
						this.options = this.hope_opt;
						this.$refs['infoChange'].placeholder = "请输入希望";
						if (!this.isEmpty(this.userInfo.hope_half)) {
							value = this.userInfo.hope_half;
						} else {
							value = "";
						}
						this.module.type = 'tag_textarea';
						break;
					case "future":
						title = "未来规划";
						this.options = this.future_opt;
						this.$refs['infoChange'].placeholder = "请输入未来规划";
						if (!this.isEmpty(this.userInfo.future_plan)) {
							value = this.userInfo.future_plan;
						} else {
							value = "";
						}
						this.module.type = 'tag_textarea';
						break;
				}
				this.$refs['infoChange'].value = value;
				this.module.value_type = type;
				this.module.title = title;
				this.$refs['infoChange'].action_open();
			},
			//选择国家
			chose_count() {
				let that = this;
				wx.navigateTo({
					url: 'country_chose?type=0&workplace=' + that.userInfo.workplace,
					events: {
						//接收页面的返回值
						acceptWorkplace: function(res) {
							console.log(res);
							that.userInfo.workplace = res.data;
						},
						farAccept: function(res) {
							console.log(res);
						}
					}
				})
			},
			//点击cell出现弹出层
			pick_cell(type) {
				console.log(this.userInfo);
				switch (type) {
					case 'birthday':
						if (this.userInfo.birthday != '' && this.userInfo.birthday != null) {
							let date = this.userInfo.birthday;
							this.$refs['infoChange'].value = date.getTime();
						}
						this.module.type = 'date';
						break;
					case 'height':
						this.options = this.height_opt;
						//如果userinfo.height不为空，给组件默认值
						if (!this.isEmpty(this.userInfo.height)) {
							let height = this.userInfo.height;
							let index = this.height_opt.findIndex((item, index) => {
								return item = height;
							})
							this.$refs['infoChange'].defaultIndex = index;
						}
						this.module.type = 'picker';
						break;
					case "weight":
						this.options = this.weight_opt;
						if (!this.isEmpty(this.userInfo.weight)) {
							let weight = this.userInfo.weight;
							let index = this.weight_opt.findIndex((item, index) => {
								return item = weight;
							})
							this.$refs['infoChange'].defaultIndex = index;
						}
						this.module.type = 'picker';
						break;
					case "hometown":
						this.$refs['infoChange'].areaList = areaList;
						this.module.title = '家乡';
						this.module.type = 'area';
						break;
				}

				this.module.value_type = type;
				this.$refs['infoChange'].showPop();
			},
			isEmpty(param) {
				return param == null || param == '';
			},
			upload_header() {
				let id = this.userInfo.id;
				let that = this;
				wx.chooseImage({
					count: 1,
					sizeType: ['original', 'compressed'],
					sourceType: ['album', 'camera'],
					success(res) {
						// tempFilePath可以作为img标签的src属性显示图片
						var tempFilePaths = res.tempFilePaths;
						wx.uploadFile({
							url: config.url + '/user/upload/header',
							filePath: tempFilePaths[0],
							name: "file",
							formData:{
								userId:id
							},
							header: {
								"content-type": "multipart/form-data",
								"JWTHeaderName": wx.getStorageSync('jwt') //jwt令牌
							},
							success: (res) => {
								if (res.statusCode == 200) {
									console.log(res);
									if(res.data==""){
										wx.showToast({
											title: "上传失败",
											icon: "fail",
											duration: 2000
										})
									}else{
										that.userInfo.head= res.data;
										wx.showToast({
											title: "上传成功",
											icon: "success",
											duration: 1500
										})
									}
									
								}
							},
							fail: (err) => {
								wx.showToast({
									title: "上传失败",
									icon: "fail",
									duration: 2000
								})
							}
						})

					}
				})

			},
			//子组件传值接收方法
			finish(data) {
				switch (data.type) {
					case "nickName":
						this.userInfo.nick_name = data.value;
						break;
					case "gender":
						this.userInfo.gender = data.value;
						break;
					case "marriage":
						this.userInfo.marital_status = data.value;
						break;
					case "mongolia":
						this.userInfo.mongol_level = data.value;
					case "education":
						this.userInfo.education = data.value;
						break;
					case "birthday":
						let date = new Date(data.value);
						this.userInfo.birthday = date;
						break;
					case "school":
						this.userInfo.school = data.value;
						break;
					case "height":
						this.userInfo.height = data.value.value;
						break;
					case "weight":
						this.userInfo.weight = data.value.value;
						break;
					case "hometown":
						let temp = data.value.values;
						let name = temp[0].name + temp[1].name + temp[2].name;
						this.userInfo.hometown = name;
						break
					case "annual_income":
						this.userInfo.annual_income = data.value;
						break;
					case "economy":
						this.userInfo.economy = data.value;
						break;
					case "hobby":
						this.userInfo.character_hobby = data.value;
						break;
					case "hope":
						this.userInfo.hope_half = data.value;
						break;
					case "future":
						this.userInfo.future_plan = data.value;
						break;
					case "work_desc":
						this.userInfo.work_desc = data.value;
						break;
				}
			},
			//获取选项
			opt() {
				this.$axios({
					methods: 'get',
					url: '/user/refine_info/opt',
					params: {}
				}).then(res => {
					let value = res.data;
					this.genders = value.data.gender;
					this.education = value.data.education;
					this.marriage = value.data.marriage;
					this.mongolia = value.data.mongolia;
					this.annual_income_opt = value.data.annual_income;
					this.economy_opt = value.data.economy_tag;
					this.hope_opt = value.data.hope_tag;
					this.hobby_opt = value.data.hobby_tag;
					this.future_opt = value.data.future_tag;
					let height = [];
					for (let i = 150; i <= 200; i++) {
						height.push(i + "cm");
					}
					this.height_opt = height;
					let weight = [];
					for (let i = 30; i <= 130; i++) {
						weight.push(i + "kg");
					}
					this.weight_opt = weight;
				}).catch(err => {
					console.log(err)
				})
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
			if(option.type =="add"){
				this.userInfo.id = option.id;
				this.userInfo.head = option.avatarUrl;
				this.userInfo.nick_name = option.nickName;
				this.userInfo.gender = option.gender;
			}else{
				let object = JSON.parse(option.data);
				this.userInfo = object;
			}
			this.config.title = option.title;
			this.opt();
		},
		filters: {
			dateToStr(val) {
				if (val != null && val != '') {
					let y = val.getFullYear(),
						m = val.getMonth() + 1,
						d = val.getDate();
					return y + "-" + d + "-" + d;
				} else {
					return "";
				}
			}
		},
	}
</script>
<style>
</style>

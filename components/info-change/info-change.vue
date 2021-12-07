<template>
	<!-- 输入框或选择框 -->
	<div>
		<van-action-sheet :show="action_show" :title='title' @close="action_close">
			<view style="width: 100%;">
				<van-cell-group v-if="type==='field'">
					<van-cell>
						<van-field :value="value" :border="false" maxlength="16" @change="onChange"></van-field>
					</van-cell>
				</van-cell-group>
				<van-radio-group v-if="type==='radio'" :value="value" @change="onChange">
					<van-cell-group v-for="(item,index) in options" :key="index">
						<van-cell :title="item.label" clickable :data-name="item.value" @click="choose_value">
							<van-radio slot="right-icon" :name="item.value" />
						</van-cell>
					</van-cell-group>
				</van-radio-group>
				<van-cell-group v-if="type==='textarea'">
					<view style="width: 100%;margin: 0 auto;">
						<form @submit="textareaSubmit">
						<!--textarea需要单独显示用户信息-->
							<view v-if="!textarea_show" @click="textarea_focus"
								style="color:#808080;width: 90%;margin: 0 auto;margin-top: 10rpx;">
								{{placeholder}}
							</view>
							<textarea name="textarea" v-if="textarea_show" :focus="focus"
								style="margin: 0 auto;width: 90%;margin-top: 10rpx;" :value="value" :placeholder="placeholder"
								auto-height />
							<button form-type="submit" class="btn" style="width: 90%;margin-top: 40rpx;">完成</button>
						</form>
					</view>
				</van-cell-group>
				<van-cell-group v-if="type==='tag_textarea'">
					<view style="width: 100%;margin: 0 auto;">
						<!--textarea需要单独显示用户信息-->
						<form @submit="textareaSubmit">
							<view  style="width:90%;margin: 0 auto;">
									<ul>
										<li style="display: inline-block;padding: 1%;">可选标签：</li>
										<li v-for="(item,index) in options" :key="index" style="display: inline-block;padding: 1%;">
											<uni-tag :text="item.label" type="primary" :circle="true" @click="tag_click(index)"></uni-tag>
										</li>	
									</ul>
							</view>
							<view v-if="!textarea_show" @click="textarea_focus"
								style="color:#808080;width: 90%;margin: 0 auto;margin-top: 10rpx;">
								{{placeholder}}
							</view>
							<textarea name="textarea" v-if="textarea_show" :focus="focus"
								style="margin: 0 auto;width: 90%;margin-top: 10rpx;" :value="value" :placeholder="placeholder"
								auto-height />
							<button form-type="submit" class="btn" style="width: 90%;margin-top: 40rpx;">完成</button>
						</form>
					</view>
				</van-cell-group>
				<button v-if="type!='textarea'&&type!='tag_textarea'" class="btn" @click="finish" type="primary"
					style="width: 90%;margin-top: 40rpx;">完成</button>
			</view>
		</van-action-sheet>
		<van-popup :show="popup_show" position="bottom" round custom-style="height:auto">
			<van-datetime-picker v-if="type==='date'" :min-date="minDate" :value="value" type="date" @input="onChange"
				@confirm="finish" @cancel="cancelFn" />
			<van-picker v-if="type==='picker'" show-toolbar="true" :columns="options" @change="onChange"
				@confirm="finish" @cancel="cancelFn" />
			<van-area v-if="type ==='area'" :title="title" :area-list="areaList" @change="onChange" @confirm="finish"
				@cancel="cancelFn" />
		</van-popup>
	</div>
</template>
<script>
	import axios from "../../common/util/axios.js";
	import '../../static/css/public/style.css';
	import '../../static/css/icon/iconfont.css';
	export default {
		name: 'info-change',
		props: [
			'type', 'title', 'options', 'value_type'
		],
		data() {
			return {
				action_show: false,
				popup_show: false, //展示弹出层
				value: '',
				minDate: new Date(1900, 0, 1),
				height: '10',
				defaultIndex: '0',
				areaList: '',
				placeholder: '',
				textarea_show: false,
				focus: false,
			}
		},
		methods: {
			action_open() {
				this.action_show = true;
			},
			//action-sheet 关闭事件
			action_close() {
				this.action_show = false;
			},
			showPop() {
				this.popup_show = true;
			},
			hidePop() {
				this.popup_show = false;
			},
			cancelFn() {
				this.hidePop();
			},
			tag_click(index) {
				console.log(this.options[index].label);
				let val = this.options[index].label;
				if(this.value.indexOf(val)==-1){
					this.value+=val+'，';
					this.textarea_focus();
				}
			},
			textareaSubmit(e) {
				let val = e.detail.value.textarea;
				let data = {
					type: this.value_type,
					value: val
				};
				this.$emit("returnData", data);
				this.action_close();
				this.hidePop();
			},
			onChange(event) {
				this.value = event.detail;
			},
			choose_value(event) {
				const {
					name
				} = event.currentTarget.dataset;
				this.value = name;
			},
			textarea_clear(){
				this.textarea_show = false;
				this.focus = false;
				this.value = "";
			},
			textarea_focus() {
				this.textarea_show = true;
				this.focus = true;
			},
			finish() {
				let data = {
					type: this.value_type,
					value: this.value
				};
				this.$emit("returnData", data);
				this.action_close();
				this.hidePop();
			},
			timeFormat(time) {

			},
		},
		created() {},
		mounted() {
			this.timeFormat(new Date());
		}
	}
</script>
<style>
</style>

<template name="nv">
	<view class="pyh-nv-box" :style="style">
		<view class='nvHeight' :style="[{'height':navigatorHeight+'px'},{'background':(config.fixedAssist&&config.fixedAssist.bgColor)||''}]" v-if="isFixed&&!(config.fixedAssist&&config.fixedAssist.hide)"></view>
		<image :src="config.bgImage" :style="[{'position':config.model?'fixed':'absolute'},{'top':(config.model?(navigatorTop+'px'):0)},{'width':windowWidth+'px','height':navigatorHeight+'px'}]" v-if="config.bgImage" class="bgImage"></image>
		<view :class="['nvBox',{'noModel':!config.model}]" :style="[{'width':windowWidth+'px'},{'color':getTxtColor},{'background':getBgColor},{'opacity':config.transparent&&config.transparent.type=='content'?transparent.opacity:1},{'position':isFixed?'fixed':'relative'},{'top':(isFixed&&config.model?(navigatorTop+'px'):0)}]">
			<view class='nvHeight' :style="[{'height':navigatorHeight+'px'}]"></view>
			<view class='nvFixed' :style="[{'width':windowWidth+'px'}]">
				<!-- 单logo -->
				<view :class="['nvContent','nvLogoBox',{'androidwx':androidwx}]" v-if="config.type=='logo'">
					<image :src="config.logo.src?config.logo.src:'/static/logo.png'" class="nvLogo" :style="config.logo.style" :mode="config.logo.style|getImgMode" @tap.stop="nvLogoTap"></image>
					<view v-if="config.btn&&config.btn.length>0" class="nvBtnGroup">
						<block v-for="(b,n) in config.btn" :key="n">
							<view class="nvBtn" v-if="b.icon" @tap.stop="nvBtnTap" :data-index="n" :data-type="b.type" :style="b.style||''">
								<image :src="b.icon" mode="widthFix" class="nvBtnImg"></image>
								<text class="nvBtnIconTxt" v-if="b.text">{{b.text}}</text>
								<view class="nvBadge" v-if="b.badge&&b.badge.text" :style="b.badge.style||''">{{b.badge.text}}</view>
							</view>		
							<view class="nvBtn" v-else-if="b.text" @tap.stop="nvBtnTap" :data-index="n" :data-type="b.type" :style="b.style||{color:getTxtColor}">
								<text>{{b.text}}</text>
								<view class="nvBadge" v-if="b.badge&&b.badge.text" :style="b.badge.style||''">{{b.badge.text}}</view>
							</view>	
						</block>
					</view>
				</view>
				<!-- 含搜索 -->
				<view :class="['nvContent','nvSearchBox',{'nvHadBack':!config.hideback}]" v-else-if="config.type=='search'">
					<image :src="config.logo.src?config.logo.src:'/static/logo.png'" class="nvLogo nvSearchLogo" :style="config.logo.style" :mode="config.logo.style|getImgMode" @tap.stop="nvLogoTap" v-if="config.logo&&!config.address"></image>
					<view class="nvAddress" :style="[{'background':(config.address.bgColor||config.componentBgColor||'')},{'color':(config.address.color||'')}]" v-if="config.address" @tap.stop="nvAddressTap">
						<text class="iconfont nvAddressIcon" :style="{'color':(config.address.color||'')}">&#xe613;</text>
						
						<view class="nvAddressTextBox">
							<text class="nvAddressText">{{config.address[config.address.fields||'province']||'广东省'}}</text>
						</view>
					</view>
					<view class="nvSForm" >
						<view class="nvSBox" :style="[{'background':(config.search.bgColor||config.componentBgColor||'')},{'border':config.search.border||''}]" @tap.stop="searchTap" data-isInput="true">
							<icon type="search" size="18" class="searchIcon"></icon>
							<input class="nvInput" type="text" :value="inputValue" :focus="config.search.focus" :placeholder="config.search.placeholder" :disabled="!config.search.input" @input="inputChange" @confirm="formSubmit" :confirm-type="config.search.confirmType||'search'" placeholder-class="searchPlac" :placeholder-style="config.search.placeholderStyle||''"/>
							<icon type="clear" size="15" class="nvSClose" @tap.stop="inputClear" v-if="inputValue"></icon>
						</view>
						<text class='nvSBtn' @tap.stop="formSubmit" v-if="config.search.btn&&config.search.input" :style="config.search.btn.style||''">{{config.search.btn.text||'搜索'}}</text>
					</view>
					<view v-if="config.btn&&config.btn.length>0" class="nvBtnGroup nvBtnGroup-static">
						<block v-for="(b,n) in config.btn" :key="n">
							<view class="nvBtn" v-if="b.icon" @tap.stop="nvBtnTap" :data-index="n" :data-type="b.type" :style="b.style||''">
								<image :src="b.icon" mode="widthFix" class="nvBtnImg"></image>
								<text class="nvBtnIconTxt" v-if="b.text">{{b.text}}</text>
								<view class="nvBadge" v-if="b.badge&&b.badge.text" :style="b.badge.style||''">{{b.badge.text}}</view>
							</view>		
							<view class="nvBtn" v-else-if="b.text" @tap.stop="nvBtnTap" :data-index="n" :data-type="b.type" :style="b.style||{color:getTxtColor}">
								<text>{{b.text}}</text>
								<view class="nvBadge" v-if="b.badge&&b.badge.text" :style="b.badge.style||''">{{b.badge.text}}</view>
							</view>	
						</block>
					</view>
				</view>
				<!-- 默认导航栏 -->
				<view class="nvContent nvDefault" v-else>
					<view v-if="config.tabArr&&config.tabArr.length>0" :class="['nvTitle','nvTabBox',{'androidwx':androidwx}]">
						<view :class="['nvTab',{'nvTabHide':t.hide}]" @tap.stop="nvTabTap" :data-index="i" v-for="(t,i) in config.tabArr" :key="i">
							<text :class="[t.active?'nTTxt-ac':'nTTxt']" :style="{'color':(t.active?mainColor:getTxtColor)}">{{t.title}}</text>
							<view :class="[t.active?'nTLine-ac':'nTLine']"></view>
						</view>
					</view>
					<view v-else :class="['nvTitle',{'androidwx':androidwx},{'hideback':config.hideback}]">
						<text :style="{'color': getTxtColor}">{{config.title||title}}</text>
						
					</view>
					<view v-if="config.btn&&config.btn.length>0" class="nvBtnGroup">
						<block v-for="(b,n) in config.btn" :key="n">
							<view class="nvBtn" v-if="b.icon" @tap.stop="nvBtnTap" :data-index="n" :data-type="b.type" :style="b.style||''">
								<image :src="b.icon" mode="widthFix" class="nvBtnImg"></image>
								<text class="nvBtnIconTxt" v-if="b.text">{{b.text}}</text>
								<view class="nvBadge" v-if="b.badge&&b.badge.text" :style="b.badge.style||''">{{b.badge.text}}</view>
							</view>		
							<view class="nvBtn" v-else-if="b.text" @tap.stop="nvBtnTap" :data-index="n" :data-type="b.type" :style="b.style||{color:getTxtColor}">
								<text>{{b.text}}</text>
								<view class="nvBadge" v-if="b.badge&&b.badge.text" :style="b.badge.style||''">{{b.badge.text}}</view>
							</view>			
						</block>
					</view>
				</view>
				
				<!-- 返回键 -->
				<text :class="['iconfont','nvback',{'nvhome':isSharePage&&!config.closeCheckback}]" @tap.stop="backTap" :style="{'background':(isSharePage&&!config.closeCheckback?(config.componentBgColor||''):''),'color':getTxtColor,'border-radius':'26rpx','font-size': isSharePage&&!config.closeCheckback?'36rpx':'54rpx'}" v-if="!config.hideback">{{isSharePage&&!config.closeCheckback?'&#xe605;':'&#xe743;'}}</text>
			</view>
		</view>
		<text class="iconfont nvToTop" :style="(config.toTop&&config.toTop.style)||''" v-if="config.toTop&&showToTop" @tap.stop="toTopTap">&#xe64d;</text>
	</view>
</template>
<script>
	var platform;
	//#ifdef H5
	platform="h5"
	//#endif
	//#ifdef APP-PLUS
	platform="app"
	//#endif
	//#ifdef MP
	platform="mp"
	//#endif
	export default {
		name:"nv",
		props:{
			config:{
				type:Object,
				default(){
					return {}
				}
			},
		},
		data() {
			return {
				title:getApp().globalData.NAME||"pyh-nv",
				h5AutoTitle:true,
				platform:platform||'h5',
				mainColor:getApp().globalData.mainColor||"#2b9939",
				currentPages:getCurrentPages().length||1,
				home:getApp().globalData.HOME||"/pages/index/index",
				inputValue:'',
				showToTop:false,
				transparent:{
					initColor:"#ffffff",
					finishColor:"#000000",
					color:"#ffffff",
					opacity:0
				},
				windowWidth:uni.getSystemInfoSync().windowWidth,
				style:""
			};
		},
		watch:{
			"config.search.value":function(value){
				//监听输入框值得改变
				var e = {detail:{value:value}};
				this.inputValue = e.detail.value;
				if(this.config.type=="search"&&this.config.search.input)this.$emit("nvInput",e);
			}
		},
		filters:{
			getImgMode(style){
				//获取图片mode类型
				if(style&&style.indexOf("height")>-1){
					return 'aspectFill';
				}else{
					return 'widthFix';
				}
			}
		},
		computed:{
			statusHeight(){
				//状态栏高度
				var statusBarHeight = this.config.model?0:uni.getSystemInfoSync().statusBarHeight;
				return statusBarHeight+'px';
			},
			navigatorHeight(){
				//导航栏高度
				var statusBarHeight = this.config.model?0:uni.getSystemInfoSync().statusBarHeight;
				var windowWidth = this.lockWindowWidth&&this.windowWidth>750?375:this.windowWidth;
				return parseInt(88*windowWidth/750)+statusBarHeight;
			},
			navigatorTop(){
				//model类型下的顶部高度
				var windowWidth = this.lockWindowWidth&&this.windowWidth>750?375:this.windowWidth;
				if(this.config.model){
					return parseInt(88*windowWidth/750)+uni.getSystemInfoSync().statusBarHeight;
				}else{
					return 0;
				}
			},
			//安全区域高度
			safeArea(){return this.config.safeArea||uni.getSystemInfoSync().safeArea.height;},
			//固定定位判断
			isFixed(){return this.config.transparent||this.config.position=='fixed'||this.config.position=='absolute'||!this.config.position;},
			//判断分享页
			isSharePage(){return this.currentPages==1;},
			//安卓微信
			androidwx(){
				if(this.config.checkAndroidwx&&this.platform=="mp"&&uni.getSystemInfoSync().platform.indexOf("ios")==-1){
					return true;
				}else{
					return false;
				}
			},
			//获取字体色
			getTxtColor(){
				return ((this.config.transparent&&this.config.transparent.initColor)?this.transparent.color:'')||this.config.color||'';
			},
			//获取/转换背景色
			getBgColor(){
				var that = this;
				if(this.config.bgImage){
					return "transparent";
				}else if(this.config.bgColor&&this.config.bgColor.indexOf("gradient")>-1){
					return this.config.bgColor;
				}else{
					return (this.config.bgColor||this.config.transparent)?'rgba('+getRgbString()+','+(this.config.transparent&&this.config.transparent.type!='content'?this.transparent.opacity:1)+')':'#fff';
				}
				function getRgbString(){
					var bgColor = that.config.bgColor||"#ffffff",returnString=""
					if(bgColor.indexOf(",")>-1){
						returnString = bgColor.split('(')[1].replace(')','').split(',').slice(0,3).join(",")
					}else{
						if(bgColor.length==4)bgColor = bgColor+bgColor.charAt(bgColor.length-1)+bgColor.charAt(bgColor.length-1)+bgColor.charAt(bgColor.length-1)
						var string = bgColor.replace("#",'');
						returnString = parseInt(string.substring(0,2), 16)+','+parseInt(string.substring(2,4), 16)+','+parseInt(string.substring(4,6), 16)
					}
					return returnString
				}
			}
		},
		created() {
			// #ifdef APP-NVUE
				var domModule = weex.requireModule("dom");
			    domModule.addRule('fontFace', {
			        'fontFamily': 'iconfont',
					'src': "url('http://at.alicdn.com/t/font_1687851_vdpjdiddv6.ttf')"
			    })
			// #endif
			
			if(this.config.search&&this.config.search.value)this.inputValue=this.config.search.value;
			if(this.config.transparent&&this.config.transparent.initColor){
				var initColor = this.config.transparent.initColor,finishColor = this.config.color||"#000000";
				if(initColor.indexOf("#")>-1&&initColor.length==4){
					initColor = initColor+initColor.charAt(initColor.length-1)+initColor.charAt(initColor.length-1)+initColor.charAt(initColor.length-1);
				}
				if(finishColor.indexOf("#")>-1&&finishColor.length==4){
					finishColor = finishColor+finishColor.charAt(finishColor.length-1)+finishColor.charAt(finishColor.length-1)+finishColor.charAt(finishColor.length-1);
				}
				if(!((initColor=="#000000"||initColor=="#ffffff")&&(finishColor=="#000000"||finishColor=="#ffffff"))){
					console.log("状态栏颜色只支持，#000000或#ffffff");
				}
				this.transparent.initColor = initColor;
				this.transparent.color = initColor;
				this.transparent.finishColor = finishColor;
			}
			this.deviceOrientation=uni.getSystemInfoSync().windowWidth>750?"landscape":"portrait";
			if(this.deviceOrientation=="portrait")this.lockWindowWidth=true;
			uni.onWindowResize((res)=>{
				if(this.deviceOrientation!=res.deviceOrientation){
					this.deviceOrientation = res.deviceOrientation;
					this.windowWidth = res.size.windowWidth;
				}
			})
		},
		mounted() {
			if(this.config.color){
				var obj = {frontColor:this.config.color,backgroundColor:this.config.bgColor||"#ffffff"};
				uni.setNavigationBarColor(obj);
			}
			if(this.config.transparent&&this.config.transparent.initColor){
				var obj = {frontColor:this.transparent.initColor,backgroundColor:this.config.bgColor||"#ffffff"};
				uni.setNavigationBarColor(obj);
			}
			if(platform=="h5"&&!this.config.model){
				this.config.title&&uni.setNavigationBarTitle({title:this.config.title})
				if(document.title&&this.h5AutoTitle)this.title=document.title
				document.setTitle = function(t) {document.title = t;var i = document.createElement('iframe');/*i.src = '//m.baidu.com/favicon.ico';*/i.style.display = 'none';i.onload = function() {setTimeout(function(){i.remove();}, 9)};document.body.appendChild(i);}
				setTimeout(()=>{document.setTitle(this.config.title||this.title);}, 1);
			}
		},
		onUnload() {uni.offWindowResize();},
		methods:{
			setStyle(object){
				//设置导航栏样式
				var style = "";
				for(var i in object){style += (i+":"+object[i]+";")}
				this.style=style;
			},
			nvLogoTap(e){
				//logo点击
				var url = this.config.logo.url;
				this.$emit("nvLogoTap");
				url&&uni.reLaunch({url:url});
			},
			nvAddressTap(e){
				//地址图标点击
				this.$emit("nvAddressTap");
			},
			searchTap(e){
				//搜索按钮点击
				if(this.config.search.url||this.config.search.linkType){
					this.linkTo({currentTarget:{dataset:{url:this.config.search.url,type:this.config.search.linkType||''}}});
				}else{
					this.$emit("searchTap");
				}
			},
			inputChange(e){
				//输入框输入
				this.inputValue = e.detail.value;
				if(this.config.type=="search"&&this.config.search.input)this.$emit("nvInput",e)
			},
			inputClear(e){
				//输入框清除
				this.inputValue="";
				if(this.config.type=="search"&&this.config.search.input)this.$emit("nvInput",e);
			},
			formSubmit(e){
				//输入框提交
				var e = {detail:{value:this.inputValue}};
				this.$emit("nvFormSubmit",e)
			},
			nvBtnTap(e){
				//右按键点击
				var e = {type:e.currentTarget.dataset.type,index:parseInt(e.currentTarget.dataset.index)};
				this.$emit("nvBtnTap",e);
			},
			nvTabTap(e){
				//中间tab按键点击
				var e = {index:parseInt(e.currentTarget.dataset.index)};
				this.$emit("nvTabTap",e);
			},
			toTopTap(e){
				//回到顶部
				this.showToTop=false
				uni.pageScrollTo({scrollTop:0,duration:this.config.toTop.duration||(this.config.toTop.duration===0?0:300)});
				this.$emit("nvToTop");
			},
			pageScroll(e={scrollTop:0}){
				//页面滚动
				if(!this.config.transparent)return;
				var anchor = this.navigatorHeight;
				if(this.config.transparent.anchor)anchor=this.config.transparent.anchor;
				var op = parseFloat(parseFloat(e.scrollTop/anchor).toFixed(1));
				if(e.scrollTop<=anchor){
					this.transparent.opacity = op;
					if(this.config.transparent.initColor){
						if(op>=.5){
							this.transparent.color=this.transparent.finishColor;
							uni.setNavigationBarColor({frontColor:this.transparent.finishColor,backgroundColor:this.config.bgColor||"#ffffff"});
						}else{
							this.transparent.color=this.transparent.initColor;
							uni.setNavigationBarColor({frontColor:this.transparent.initColor,backgroundColor:this.config.bgColor||"#ffffff"});
						}
					}
				}else{
					this.transparent.opacity = 1;
				}
				if(this.config.toTop){
					if(this.showToTop&&e.scrollTop<this.safeArea){
						this.showToTop=false;
					}
					if(!this.showToTop&&e.scrollTop>=this.safeArea){
						this.showToTop=true;
					}
				}
			},
			backTap(){
				//返回键点击
				if(this.config.backpress){
					this.$emit("backTap");
				}else{
					this.linkTo({currentTarget:{dataset:{type:'navigateBack'}}});
				}
			},
			linkTo(e) {
				//跳转
				var url=e.currentTarget.dataset.url,
				type=e.currentTarget.dataset.type,
				isInput=e.currentTarget.dataset.isInput;
				if(isInput&&this.config.type=="search"&&this.config.search&&this.config.search.input){
					return;
				}
				if(this.$nv){
					this.$nv(url,type);
				}else{
					if(!url&&!type)return;
					if(url=="/"||url==".")return;
					if(typeof(url)=="object"){
						uni.navigateTo(url);
						return
					}
					if(typeof(url)=="number"){
						if(this.currentPages==1){
							uni.reLaunch({url:this.home})
						}else{
							uni.navigateBack({delta:Math.abs(url||1)})
						}
						return;
					}
					if(type){
						if (type.indexOf("ab")>-1) {
							uni.switchTab({ url: url });
						} else if (type=='-1'||type.indexOf("redirect")>-1||type.indexOf("rep")>-1) {
							uni.redirectTo({ url: url });
						} else if (type.indexOf("aunch")>-1) {
							uni.reLaunch({ url: url });
						} else if (type.indexOf("ack")>-1) {
							if(this.currentPages==1){
								uni.reLaunch({url:this.home});
							}else{
								uni.navigateBack();
							}
						}else{
							uni.navigateTo({url:url});
						}
					}else{
						if(url.indexOf("/")==0||url.indexOf(".")==0){
							uni.navigateTo({url:url});
						}else{
							if(url.indexOf("?")>0){url+="&platform="+platform;}else{url+="?platform="+platform;};
							if(platform=="h5"){
								top.location.href=url;
							}else if(platform=="app"){
								plus.runtime.openUrl(url);
							}else{
								uni.navigateTo({url:"/pages/other/webview/webview?src="+url.replace("?","&")});
							}
						}
					}
				}
			}
		}
	}
</script>
<style lang="scss" scoped>
	@font-face {
	    font-family: iconfont;
	    src: url('./iconfont.ttf')
	}
	
	.iconfont {
	  font-family: iconfont;
	  font-size: 30rpx;
	  font-style: normal;
	}
	
	//主色，可以设置uni.scss的$mainColor
	//或
	//uni.scss未定义或定义为null,修改下方$mainColor的默认值
	$mainColor: #2b9939 !default;
	
	.pyh-nv-box{position: relative;}
	.bgImage{position: absolute;left: 0;top: 0;}
	.nvBox{background-color: #fff;z-index: 991;color: #000000;}
	.noModel{z-index: 992;}
	.nvHeight{height: 88rpx;}
	.nvFixed{position: absolute;bottom: 0;height: 88rpx;left: 0;z-index: 992;padding: 0 20rpx;}
	.nvContent{flex: 1;height: 88rpx;align-items: center;}
	.nvInput{font-size: inherit;flex: 1;}
	.searchIcon{
		width: 18px;
		margin-right: 20rpx;
		/* #ifdef MP */
		height: 18px;
		/* #endif */
	}
	.nvTitle{position: absolute;top: 0;left: 0;right: 0;text-align: left;height: 88rpx;line-height: 88rpx;align-items: center;justify-content: center;padding: 0 80rpx;font-size: 32rpx;font-weight: bold;overflow: hidden;text-overflow: ellipsis;}
	.androidwx{text-align: left;padding-left: 80rpx;justify-content: flex-start!important;}
	.nvback{font-size: 54rpx;position: absolute;left: 6rpx;padding-left: 8rpx;bottom: 18rpx;flex-direction: row;align-items: center;z-index: 992;width: 52rpx;height: 52rpx;}
	.nvhome{border-radius: 26rpx;font-size: 36rpx;padding: 0;left: 20rpx;text-align: center;justify-content: center;}
	.nvHadBack{padding-left: 60rpx;}
	
	//logo
	.nvLogoBox{align-items: center;justify-content: center;position: absolute;left: 0;padding-right: 0rpx!important;left: 0;right: 0;}
	.nvLogo{width: 60rpx;}
	
	//含搜索框
	.nvSearchLogo{margin-right: 20rpx;}
	.nvAddress{background-color: #f8f8f8;border-radius: 44rpx;justify-content: center;align-items: center;padding: 0 16rpx 0 10rpx;font-size: 28rpx;line-height: 30rpx;margin-right: 20rpx;color: #000000;height: 60rpx;width: 144rpx;}
	.nvAddressIcon{width: 30rpx;margin-right: 4rpx;font-size: 34rpx;}
	.nvAddressTextBox{width: 84rpx;overflow: hidden;}
	.nvAddressText{flex: 1;font-size: 28rpx;line-height: 30rpx;overflow: hidden;text-overflow: ellipsis;}
	.searchPlac{color: #bbb;}
	.nvSForm{flex: 1;justify-content: space-between;align-items: center;}
	.nvSBox{flex: 1;border-radius: 44rpx;background-color: #f8f8f8;height: 60rpx;line-height: 60rpx;padding: 0 20rpx;align-items: center;}
	.nvSBtn{color: #fff;border-radius: 44rpx;height: 60rpx;line-height: 60rpx;width: 120rpx;padding: 0;text-align: center;font-size: 28rpx;margin-left: 20rpx;background-color: $mainColor;}
	.nvSClose{
		/* #ifdef MP */
		height: 15px;
		/* #endif */
	}
	
	//右边按钮组
	.nvBtnGroup{position: absolute;right: 20rpx;top: 0;height: 88rpx;align-items: center;justify-content: center;z-index: 993;font-size: 28rpx;color: #000000;}
	.nvBtn{display: flex;align-items: center;justify-content: center;flex-direction: column;text-align: center;}
	.nvBtn:first-child{margin-left: 0;}
	.nvBtn,.nvBtnImg{padding: 0;margin-left: 20rpx;background: transparent;border: 0;color: #000000;z-index: 3;font-size: 28rpx;position: relative;}
	.nvBtnImg{width: 48rpx;margin-left: 0;}
	.nvBtnGroup-static{position: relative;padding-left: 20rpx;right: 0;}
	.nvBtn .nvBadge{width: 26rpx;height: 26rpx;position: absolute;top: -8rpx;right: -8rpx;display: flex;align-items: center;justify-content: center;border-radius: 50%;overflow: hidden;background-color: red;color: #fff;font-size: 16rpx;z-index: 4;}
	
	//tab栏
	.nvTabBox{position: absolute!important;}
	.nvTab{flex-direction: column!important;align-items: center;justify-content: flex-end;margin: 0 10rpx;position: relative;}
	.nTTxt,.nTTxt-ac{padding: 0 10rpx;line-height: 88rpx;}
	.nTLine,.nTLine-ac{height: 4rpx;border-radius: 2rpx;background: transparent;position: absolute;bottom: 0;left: 0;right: 0;}
	.nTTxt-ac{color: $mainColor;}
	.nTLine-ac{background: $mainColor;}
	.nvTabHide{width:0;height:0;margin:0;overflow:hidden;}
	
	//回到顶部
	.nvToTop{position: fixed;bottom: 200rpx;right: 40rpx;z-index: 992;background: #fff;border-radius: 50%;width: 80rpx;height: 80rpx;text-align: center;line-height: 80rpx;font-size: 46rpx;box-shadow: 2rpx 2rpx 2rpx 2rpx #ddd;}
	
	//小程序胶囊留位
	/* #ifdef MP-WEIXIN */
	.noModel .nvContent{padding-right: 200rpx;}
	.noModel .nvSBtn,.noModel .nvBtnGroup{display: none;}
	/* #endif */
	
	/* #ifdef APP-NVUE */
	.nvContent,.nvback,.nvLogoBox,.nvSearchBox,.nvAddress,.nvSForm,.nvSBox,.nvBtnGroup,.nvTabBox,.nvTab{flex-direction: row;}
	.nvTitle,.nvAddress,.nvAddressText{lines: 1;}
	.pyh-nv-box,.nvBox,.nvHeight,.nvFixed,.nvTitle,.nvLogoBox,.nvSearchBox,.nTLine,.nTLine-ac{flex: 1;}
	.nvTab{flex-direction: column!important;align-items: center;justify-content: flex-end;line-height: 80rpx;margin: 0 10rpx;}
	/* #endif */
	
	/* #ifndef APP-NVUE */
	.nvContent,.nvback,.nvLogoBox,.nvSearchBox,.nvAddress,.nvSForm,.nvSBox,.nvBtnGroup,.nvTabBox,.nvTab{display: flex;flex-direction: row;}
	.nvTitle,.nvAddressText{white-space: nowrap;}
	.nvBox,.nvBox *,.nvContent,.nvTitle,.nvFixed{box-sizing: border-box;}
	.nvLogo,.nvAddressIcon,.nvBtnImg{height: auto;}
	.pyh-nv-box,.nvBox,.nvHeight,.nvFixed,.nvTitle,.nvLogoBox,.nvSearchBox,.nTLine,.nTLine-ac{width: 100%;}
	/* #endif */
</style>
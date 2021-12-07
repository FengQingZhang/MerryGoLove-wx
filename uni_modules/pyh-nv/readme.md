### pyh-nv 全自定义、全兼容、全功能、多类型、可渐变导航栏

pyh-nv 导航栏组件，组件名：``nv``，代码块： nv。

**使用方式：**

uni_modules:

[uni_modules使用方法](https://uniapp.dcloud.io/uni_modules?id=%e4%bd%bf%e7%94%a8-uni_modules-%e6%8f%92%e4%bb%b6)；

uni_modules在template内的名称为pyh-nv,兼容nv写法，需要在pages.json添加代码：
"easycom": {"nv": "@/uni_modules/pyh-nv/components/pyh-nv/pyh-nv.vue"}

非uni_modules:

复制uni_modules->pyh-nv->components->pyh-nv文件到根目录的components下

在 ``main.js`` 中引用组件 

```javascript

import nv from "@/components/pyh-nv/pyh-nv.vue";
Vue.component("nv",nv)

```

在 ``template`` 中使用组件

```html

<nv></nv>

<nv :config="{'hideback':true}"></nv>

<nv :config="config"></nv>

```

在 ``script`` 中 config 说明

所有配置都为选填,无需要可以不配置,不复杂!!!</br>
所有配置都为选填,无需要可以不配置,不复杂!!!</br>
所有配置都为选填,无需要可以不配置,不复杂!!!</br>

**config 属性说明：**

|属性名				|类型	|默认值	    |说明																			|
|---				|----	|---	    |---																			|
|title				|String	|'pyh-nv' 	|标题,默认值为getApp().globalData.NAME或组件内title写死的字符串；h5端能自动同步标签标题（比如微信标题）；标题可以使用config配置修改|
|position			|String	|'fixed'   	|定位方式,fixed和absoult都是固定定位，其它值为静态导航栏，随页面滚动				|
|hideback			|Boolean|false      |是否隐藏导航栏返回功能															|
|model				|Boolean|false      |是否页面内独立使用模型，如果是固定定位，top为导航栏高度							|
|bgImage			|String	|''			|导航栏背景图,如果使用，则bgColor无效|
|bgColor			|String	|'#ffffff'	|导航栏背景色,如果使用渐变色，transparent渐变属性失效|
|color				|String	|'#000000'	|导航栏和状态栏字体色，也用于渐变完成时字体色（状态栏字体只支持#000000或#ffffff）|
|componentBgColor	|String	|'#f8f8f8'	|导航栏组件背景色(可被覆盖)，如果有设置，回到首页的返回键有背景色|
|type				|String	|'default'	|导航栏类型(默认为通用),还有logo和search											|
|safeArea			|Number	|安全高度	|暂时只用于控制滚动显示，比如回到顶部												|
|toTop				|Object |			|是否使用回到顶部，有该属性就是使用,详细见下方toTop说明}							|
|logo				|Object	|		   	|导航栏logo的配置,仅type为logo或search时有效,详细见下方logo说明					|
|search				|Object	|		    |导航栏含搜索框的配置,仅type为search时有效,详细见下方search说明					|
|transparent		|Object	|		    |导航栏渐变配置,详细见下方transparent说明											|
|fixedAssist		|Object	|    		|固定/绝对定位时辅助容器,{hide:false,bgColor:''}									|
|address			|Object	|		    |搜索导航栏左地址配置,{province:'广东省'}											|
|btn				|Array	|[]		    |导航栏右方按钮组,{text:'点击1',style:''},{icon:'',text:'',badge:{text:'1',style:''}}|
|tabArr				|Array	|[]		    |导航栏中间tab切换,{title:'',active:true,hide:false}								|
**pyh-nv.vue 内配置说明：**
|title				|String	|'pyh-nv' 	|标题默认值,getApp().globalData.NAME或自定义字符串	|
|h5AutoTitle		|Boolean|false	 	|为true时而且config没传入title,h5端自动获取pages.json的navigationBarTitleText|

**config 内 toTop 配置说明：**

|属性名				|类型	|默认值	                    |说明								|
|---				|----	|---	                    |---								|
|duration			|Number	|300   						|回到顶部的滚动动画时间（ms）			|
|style				|String	|''	     					|样式配置							|

**config 内 logo 配置说明：**

|属性名				|类型	|默认值	                    |说明								|
|---				|----	|---	                    |---								|
|src				|String	|'/static/logo.png'   		|logo路径							|
|url				|String	|''						    |如果传值,点击logo会reLaunch到该url	|
|style				|String	|''	     					|样式配置							|

**config 内 search 配置说明：**

|属性名				|类型	|默认值	    |说明													|
|---				|----	|---	    |---													|
|value				|String	|''		    |input的初始值，如需动态赋值，必须初始化					|
|bgColor			|String	|'#f8f8f8'  |组件背景色,覆盖	componentBgColor						|
|input				|Boolean|false	    |输入框提示语样式										|
|url				|String	|''		    |input为false时生效,点击navigateTo到url					|
|focus				|Boolean|false		|是否自动聚焦												|
|border				|String |''			|输入框边框样式											|
|placeholder		|String	|'搜索'	   	|输入框提示语											|
|placeholderStyle	|String	|''		    |输入框提示语样式										|
|btn				|Object	|		    |input为true时生效,搜索框提交按钮,{text:'搜索',style:''}	|
|confirmType		|String	|'search'	|同官方input的confirm-type,设置回车键文字				|

**config 内 transparent 配置说明：**

|属性名						|类型	|默认值	      	|说明													|
|---						|----	|---	      	|---													|
|type						|String	|'background' 	|渐变类型,content为全透明渐变							|
|anchor						|Number	|当前导航栏高度	|最终渐变位置											|
|initColor					|String	|'#ffffff'  	|导航栏与状态栏初始色,（状态栏字体只支持#000000或#ffffff）	|


**组件pyh-nv 事件说明(详情请参考示例项目)：**

|属名				|说明										|
|---				|----										|
|nvLogoTap			|点击logo,仅logo存在时生效					|
|nvAddressTap		|点击地址,仅地址存在时生效					|
|nvInput			|输入框input事件,仅search.input为true时生效	|
|nvFormSubmit		|输入框确认事件,仅search.input为true时生效	|
|nvBtnTap			|右方按钮组点击事件,仅右方按钮存在时生效		|
|nvTabTap			|中间tab组点击事件,仅中间tab按钮存在时生效	|


**ref 事件说明(详情请参考示例项目)：**

|事件名				|参数类型	|参数默认值			|说明				|
|---				|----		|----				|---
|setStyle			|Object		|{}					|直接设置导航栏样式	|
|pageScroll			|Object		|{scrollTop:0}		|传递页面滚动信息	|

**感谢：**

> 有更多优化建议和需求，请联系作者 panyh 。谢谢！
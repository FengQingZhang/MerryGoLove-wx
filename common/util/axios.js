import Vue from 'vue'
import axios from 'axios'
import qs from 'qs'
import config from '../config.js'

//后台地址
var baseURL = config.url;

const service = axios.create({
	// `baseURL` 将自动加在 `url` 前面，除非 `url` 是一个绝对 URL。
	baseURL: baseURL,
	crossDomain: true
})

//request拦截器,每次请求前从cookie中获取jwt，加入请求头部
service.interceptors.request.use(
	config => {
		if (!config.url.includes("/login")) {
			//从缓存中得到jwt
			wx.getStorage({ key: 'jwt', success (res) { 
				config.headers['JWTHeaderName'] = res.data;
			}});
		}
		return config;
	},
	error => {
		Promise.reject(error);
	}
)
//是否正在刷新的标记
let isRefreshing = false;
//重试队列，每一项将是一个待执行的函数形式
let requests = []
//response拦截器
service.interceptors.response.use(
	response => {
		const data = response.data;
		//console.log(data);
		//当token过期时会触发
		if (data.msg == "token past") {
			const config = response.config;
			//判断是否正在刷新token
			if (!isRefreshing) {
				isRefreshing = true;
				return refreshToken().then(res => {
					config.headers['JWTHeaderName'] = res.data.data;
					localStorage.setItem("jwt", res.data.data);
					// 已经刷新了token，将所有队列中的请求进行重试
					requests.forEach(cb => cb(res.data.data));
					requests = [];
					return axios.create(config);
				}).catch(error => {
					window.location.href = '/';
				}).finally(() => {
					isRefreshing = false;
				})
			} else {
				//正在刷新token，将返回一个未执行resolve的Promise
				return new Promise((resolve) => {
					requests.push((token) => {
						config.headers['JWTHeaderName'] = token;
						resolve(axios.create(config));
					})
				})
			}

		}
		return response;
	},
	error => {
		if (error && error.response) {
			switch (error.response.status) {
				case 400:
					error.message = '错误请求';
					break;
				case 401:
					error.message = '请重新登录';
					break;
				case 403:
					error.message = "请登录后访问";
					break;
				case 404:
					error.message = '请求错误,未找到该资源';
					break;
				case 405:
					error.message = '请求方法未允许';
					break;
				case 408:
					error.message = '请求超时';
					break;
				case 500:
					error.message = '服务器端出错';
					break;
				case 501:
					error.message = '网络未实现';
					break;
				case 502:
					error.message = '网络错误';
					break;
				case 503:
					error.message = '服务不可用';
					break;
				case 504:
					error.message = '网络超时';
					break;
				case 505:
					error.message = 'http版本不支持该请求';
					break;
				default:
					error.message = `未知错误${error.response.status}`;

			}
		} else {
			error.message = "连接到服务器失败";
		}
		return Promise.reject(error);
	}
)

// 在main.js中放入这段自定义适配器的代码，就可以实现uniapp的app和小程序开发中能使用axios进行跨域网络请求，并支持携带cookie
axios.defaults.adapter = function(config) {
	return new Promise((resolve, reject) => {
		//console.log(config)
		var settle = require('axios/lib/core/settle');
		var buildURL = require('axios/lib/helpers/buildURL');
		uni.request({
			method: config.method.toUpperCase(),
			url: config.baseURL + buildURL(config.url, config.params, config.paramsSerializer),
			header: config.headers,
			data: config.data,
			dataType: config.dataType,
			responseType: config.responseType,
			sslVerify: config.sslVerify,
			complete: function complete(response) {
				//console.log("执行完成：", response)
				response = {
					data: response.data,
					status: response.statusCode,
					errMsg: response.errMsg,
					header: response.header,
					config: config
				};

				settle(resolve, reject, response);
			}
		})
	})
}

function refreshToken() {
    return new Promise((resolve,reject)=>{
		axios.post("/refreshToken");
		wx.request({
			url:baseURL+'/user/refreshToken',
			header: {
			    'content-type': 'application/json' // 默认值
			},
			success (res) {
			  resolve(res.data);
			}
		})
	});
}
export default service

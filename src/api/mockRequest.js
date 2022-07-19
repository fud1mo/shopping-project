// 需要对axios进行二次封装
import axios from 'axios'
// 引入nprogress进度条
import nprogress from 'nprogress'
// nprogress对象中，start()方法代表进度条开始，done()方法代表进度条结束
// 引入进度条样式
import 'nprogress/nprogress.css';

// 1.利用axios对象的方法create去创建一个axios实例
const requests = axios.create({
  // 配置对象
  // 基础路径，发送请求时，路径当中会默认带/api
  // baseURL: 'http://gmall-h5-api.atguigu.cn/api',
  baseURL: '/mock',
  // 请求超时的时间为5s
  timeout: 5000
});

// 1.请求拦截器：在发送请求之前，请求拦截器可以检测到，可以在请求发出去之前做一些事情
requests.interceptors.request.use(config => {
  // config是配置对象，里面有一个属性很重要，即header请求头
  // 进度条开始动
  nprogress.start();
  return config;
})

// 2.响应拦截器
requests.interceptors.response.use((res) => {
  // 成功的回调函数，服务器响应数据回来以后，响应拦截器可以监测到，可以做一些事情
  // 可以只返回响应体data
  // 进度条结束
  nprogress.done();
  return res.data;
}, (error) => {
  // 响应失败的回调函数
  // 比如可以终止promise链
  return Promise.reject(new Error('fail'));
})

// 对外暴露
export default requests;
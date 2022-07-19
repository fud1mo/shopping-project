import Vue from 'vue'
import App from './App.vue'
import router from './router'
// 引入仓库
import store from './store'

// 三级联动组件，全局组件
import TypeNav from '@/components/TypeNav/TypeNav';
import Carousel from '@/components/Carousel/Carousel';
import Pagination from '@/components/Pagination/Pagination'
// 按需引入饿了么
import { MessageBox } from 'element-ui'
// 引入图片懒加载插件
import VueLazyload from 'vue-lazyload'
// 引入动图
import butterfly from '@/assets/butterfly.gif'
// 注册：第一个参数为全局组件的名字，第二个参数为组件
Vue.component(TypeNav.name, TypeNav);
// 轮播图
Vue.component(Carousel.name, Carousel);
// 分页器
Vue.component(Pagination.name, Pagination);
// 饿了么：挂在原型上，所有组件不用引入都能用
Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$alert = MessageBox.alert;
// 注册插件
Vue.use(VueLazyload, {
  // 懒加载默认的图片
  loading: butterfly
}); //该命令实质是调用了install
// 引入mockServe.js-------用于mock数据
// 这个模块根本没有对外暴露,不需要import A from B,只需要引进来执行一次就可以
import '@/mock/mockServe';
// 引入swiper样式（全局引入，任何组件都能使用）
import 'swiper/css/swiper.css';

// 统一接收api文件夹里面的全部请求函数
import * as API from '@/api'

// 测试
// import { reqGetSearchInfo } from '@/api';
// console.log(reqGetSearchInfo({}));

Vue.config.productionTip = false

// 引入自定义插件
import myPlugin from '@/plugins/myPlugin';
Vue.use(myPlugin, { name: 'upper' });

// 引入表单校验插件
import '@/plugins/validate'

new Vue({
  render: h => h(App),
  // 配置全局事件总线$bus
  beforeCreate() {
    Vue.prototype.$bus = this;
    Vue.prototype.$API = API; //所有组件实例都可以直接使用全部请求函数
  },
  // 注册路由信息：当这里书写router时，组件身上都拥有$router、$route属性
  // $route路由，一般获取路由信息（路径、query、params等）
  // $router路由器，一般进行编程式导航进行路由跳转（push、replace）
  router,
  // 注册仓库,组件实例身上会多一个$store属性
  store,
}).$mount('#app')

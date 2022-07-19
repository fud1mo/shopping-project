import Vue from 'vue';
import Vuex, { Store } from 'vuex';
// 使用插件
Vue.use(Vuex);
// 引入小仓库
import home from './home'
import search from './search'
import detail from './detail'
import shopcart from './shopcart'
import user from './user'
import trade from './trade'

// state:仓库存储数据的地方
// mutations：修改state的唯一手段
// actions:处理action，可以书写自己的业务逻辑，也可以处理异步
// 这里可以书写业务逻辑,但不能修改state
// getters:理解为计算属性，用于简化仓库数据，让组件获取仓库数据更加方便

// 对外暴露一个Store类的实例
export default new Vuex.Store({
  // 实现Vuex仓库模块式开发存储数据
  modules: {
    home,
    search,
    detail,
    shopcart,
    user,
    trade,
  }
});
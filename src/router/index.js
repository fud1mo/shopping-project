import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

import routes from './routes';
// 引入store
import store from '@/store'

// 先把VueRouter原型对象的push保存一份
let originPush = VueRouter.prototype.push;
let originReplace = VueRouter.prototype.replace;
// 重写push与replace
// 第一个参数:location,告诉原来的push方法,往哪里跳转,以及传递哪些参数
// 第二个参数:成功的回调
// 第二个参数:失败的回调
VueRouter.prototype.push = function (location, resolve, reject) {
  if (resolve && reject) {
    originPush.call(this, location, resolve, reject)
  } else {
    originPush.call(this, location, () => { }, () => { })
  }
};
VueRouter.prototype.replace = function (location, resolve, reject) {
  if (resolve && reject) {
    originReplace.call(this, location, resolve, reject)
  } else {
    originReplace.call(this, location, () => { }, () => { })
  }
}

const router = new VueRouter({
  routes,
  // mode: 'history',
  // 滚动行为
  scrollBehavior(to, from, savedPosition) {
    // 始终滚动到顶部
    // vuerouter3用x,y;vuerouter4用left,top
    return { y: 0 }
  },
})

// 全局守卫，前置守卫（在路由跳转前进行判断）
router.beforeEach(async (to, from, next) => {
  console.log(from.path, to.path)
  // to: 要跳转到的路由的信息
  // from: 从哪个路由来
  // next: 放行函数   next();直接放行   next('/login');放行到指定路由  next(false);回到from的位置

  // 用户登录了才会有token
  let token = store.state.user.token;
  // 用户信息(不能通过useInfo判断，因为空对象也为真)
  let name = store.state.user.userInfo.name;
  if (token) {
    // 用户已经登录，就不能去login和register，停留在home
    if (to.path == '/login' || to.path == '/register') {
      next('/');
    } else {
      if (name) {
        // 登录了且有用户信息
        next();
      } else {
        // 登录了但没有获取到用户信息，派发action，让仓库存储用户信息，再跳转
        try {
          // 在路由跳转前发送请求获取用户信息，如果成功，放行
          await store.dispatch("getUserInfo");
          next();
        } catch (error) {
          // 如果没捞到用户信息（token过期了获取不到），此时应清除用户信息，并重新让用户登录
          // 清除token(相当于退出登录)
          await store.dispatch('userLogout');
          next('/login');
        }
      }
    }
  } else {
    // 未登录，不能去交易相关（pay、paysuccess），不能去个人中心
    // 如果去上面这些路由直接跳转到登录
    console.log(to.path)
    if (to.path.includes('/trade') || to.path.includes('/pay') || to.path.includes('/center')) {
      // 把未登录时想去而没去成的信息存储于地址栏的query参数中，即存储于路由中
      next('/login?redirect=' + to.path)
    } else {
      // 如果去的不是上面这些路由，直接放行
      next();
    }
  }
});

export default router;
// 引入路由组件（懒加载），也可以直接写在路由配置信息中，如home
// const Home = () => import('@/views/Home/Home')
const Search = () => import('@/views/Search/Search')
const Login = () => import('@/views/Login/Login')
const Register = () => import('@/views/Register/Register')
const Detail = () => import('@/views/Detail/Detail')
const AddCartSuccess = () => import('@/views/AddCartSuccess/AddCartSuccess')
const ShopCart = () => import('@/views/ShopCart/ShopCart')
const Trade = () => import('@/views/Trade/Trade')
const Pay = () => import('@/views/Pay/Pay')
const PaySuccess = () => import('@/views/PaySuccess/PaySuccess')
const Center = () => import('@/views/Center/Center')
// 引入二级路由组件
const myOrder = () => import('@/views/Center/myOrder')
const groupOrder = () => import('@/views/Center/groupOrder')

// 路由配置信息
export default [
  {
    // 重定向：在项目跑起来的时候，访问/或者*，立马定向到首页
    path: '*',
    redirect: '/home'
  }, {
    path: '/home',
    component: () => import('@/views/Home/Home'),
    meta: { show: true }
  }, {
    // 配置路由时params占位后面加了问号path: '/search/:keyword?',代表params参数可传可不传
    path: '/search/:keyword?',
    component: Search,
    meta: { show: true },
    name: 'search',
    // props: true,
    // props: { a: 1, b: 2 },
    props: ($route) => {
      return {
        keyword: $route.params.keyword,
        k: $route.query.k
      }
    }
  }, {
    path: '/login',
    component: Login,
    meta: { show: false }
  }, {
    path: '/register',
    component: Register,
    meta: { show: false }
  }, {
    path: '/detail/:skuId',
    component: Detail,
    meta: { show: true }
  }, {
    path: '/addcartsuccess',
    name: 'addcartsuccess',
    component: AddCartSuccess,
    meta: { show: true }
  }, {
    path: '/shopcart',
    component: ShopCart,
    meta: { show: true }
  }, {
    path: '/trade',
    component: Trade,
    meta: { show: true },
    // 路由独享守卫
    beforeEnter: (to, from, next) => {
      if (from.path == '/shopcart') {
        next();
      } else {
        next(false);
      }
    }
  }, {
    path: '/pay',
    component: Pay,
    meta: { show: true },
    beforeEnter: (to, from, next) => {
      if (from.path == '/trade') {
        next();
      } else {
        next(false);
      }
    }
  }, {
    path: '/paysuccess',
    component: PaySuccess,
    meta: { show: true }
  }, {
    path: '/center',
    component: Center,
    meta: { show: true },
    // 二级路由组件
    children: [{
      // 重定向
      path: '/center',
      redirect: '/center/myorder'
    }, {
      // 子组件要么不加/，要么写全/center/myorder
      path: 'myorder',
      component: myOrder,
    }, {
      path: 'grouporder',
      component: groupOrder
    }]
  }
];
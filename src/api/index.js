// 当前这个模块:对所有的API进行统一管理
import requests from './request';
import mockRequests from './mockRequest';

// 三级联动的接口 
// /api/product/getBaseCategoryList   get请求   无参数
export const reqCategoryList = () => {
  // 发送请求,axios发请求返回的结果是Promise对象
  return requests({
    url: '/product/getBaseCategoryList',
    method: 'get'
  })
};

// 获取home的banner轮播图的接口
export const reqGetBannerList = () => mockRequests.get('/banner');

// 获取floor轮播图的接口
export const reqFloorList = () => mockRequests.get('/floor');

// 获取搜索模块的数据  地址/api/list  POST  要带参数
// 参数示例
// {
//   "category3Id": "61",
//   "categoryName": "手机",
//   "keyword": "小米",
//   "order": "1:desc",
//   "pageNo": 1,
//   "pageSize": 10,
//   "props": ["1:1700-2799:价格", "2:6.65-6.74英寸:屏幕尺寸"],
//   "trademark": "4:小米"
// }
// 当前这个接口(获取搜索模块的数据)，给服务器传递的参数params，至少是一个空对象
export const reqGetSearchInfo = (params) => requests({
  url: '/list',
  method: 'POST',
  data: params,
})

// 获取产品详情信息的接口  地址/api/item/{ skuId }  GET
export const reqGoodsInfo = (skuId) => requests({
  url: `/item/${skuId}`,
  method: 'GET'
})

// 将产品添加到购物车（或更新购物车中某个产品的个数）
// 地址 /api/cart/addToCart/{ skuId }/{ skuNum }    POST
export const reqAddOrUpdateShopCar = (skuId, skuNum) => requests({
  url: `/cart/addToCart/${skuId}/${skuNum}`,
  method: 'POST'
})

// 获取购物车列表的接口
// 地址 /api/cart/cartList    GET   无参数
export const reqCartList = () => requests({
  url: '/cart/cartList',
  method: 'GET'
})

// 删除购物车产品的接口
// 地址 /api/cart/deleteCart/{skuId}  DELETE  参数：skuId
export const reqDeleteCartByID = (skuId) => requests({
  url: `/cart/deleteCart/${skuId}`,
  method: 'DELETE'
})

// 切换商品选中状态的接口
// 地址 /api/cart/checkCart/{skuId}/{isChecked}  GET  参数:skuId,isChecked
export const reqUpdateCheckedById = (skuId, isChecked) => requests({
  url: `/cart/checkCart/${skuId}/${isChecked}`,
  method: 'GET'
})

// 获取验证码的接口
// /api/user/passport/sendCode/{phone}   GET
export const reqGetCode = (phone) => requests({
  url: `/user/passport/sendCode/${phone}`,
  method: 'GET'
})

// 注册的接口
// /api/user/passport/register  POST  参数:phone,password,code
export const reqUserRegister = (data) => requests({
  url: '/user/passport/register',
  method: 'POST',
  data
})

// 登录接口
// /api/user/passport/login  POST  参数:phone,password
// POST请求可以用请求体data传递参数
export const reqUserLogin = (data) => requests({
  url: '/user/passport/login',
  method: 'POST',
  data
})

// 获取用户信息（带着token向服务器要数据）
// /api/user/passport/auth/getUserInfo   GET  
export const reqUserInfo = () => requests({
  url: '/user/passport/auth/getUserInfo',
  method: 'GET'
})

// 退出登录
// /api/user/passport/logout   GET
export const reqLogout = () => requests({
  url: '/user/passport/logout',
  method: 'GET'
})

// 获取用户地址信息
// /api/user/userAddress/auth/findUserAddressList  GET
export const reqGetAddressInfo = () => requests({
  url: '/user/userAddress/auth/findUserAddressList',
  method: 'GET'
})

// 获取订单交易页商品清单
// /api/order/auth/trade   GET
export const reqOrderInfo = () => requests({
  url: '/order/auth/trade',
  method: 'GET'
})

// 提交订单
// /api/order/auth/submitOrder?tradeNo={tradeNo}   POST  参数:7个
export const reqSubmitOrder = (tradeNo, data) => requests({
  url: `/order/auth/submitOrder?tradeNo=${tradeNo}`,
  method: 'POST',
  data
})

// 获取订单支付信息
// /api/payment/weixin/createNative/{orderId}  GET  参数:orderId
export const reqPayInfo = (orderId) => requests({
  url: `/payment/weixin/createNative/${orderId}`,
  method: 'GET'
})

// 获取支付订单状态
// /api/payment/weixin/queryPayStatus/{orderId}    GET
export const reqPayStatus = (orderId) => requests({
  url: `/payment/weixin/queryPayStatus/${orderId}`,
  method: 'GET'
})

// 获取个人中心的数据
// /api/order/auth/{page}/{limit}  GET
export const reqMyOrderList = (page, limit) => requests({
  url: `/order/auth/${page}/${limit}`,
  method: 'GET'
})

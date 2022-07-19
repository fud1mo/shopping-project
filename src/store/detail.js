import { reqGoodsInfo, reqAddOrUpdateShopCar } from '@/api';
// 封装游客身份的模块uuid：生成一个随机字符串（生成一次不能再变了）
import { getUUID } from '@/utils/uuid_token'

const state = {
  goodInfo: {},
  // 游客的临时身份
  uuid_token: getUUID(),
};
const mutations = {
  GETGOODINFO(state, payload) {
    state.goodInfo = payload;
  }
};
const actions = {
  // 获取产品信息的action
  async getGoodInfo(context, skuId) {
    let result = await reqGoodsInfo(skuId);
    if (result.code === 200) {
      context.commit('GETGOODINFO', result.data)
    }
  },
  // 将产品添加到购物车
  async addOrUpdateShopCar(context, { skuId, skuNum }) {
    // 发请求：前端带一些参数给服务器（需要存储这些数据），这里存储成功，但没有数据需要返回
    // 加入购物车请求后，前台把参数带给服务器，服务器写入数据成功，并没有数据要返回，也就不需要三连环存储数据了
    // 服务器只返回code=200，代表操作成功
    let result = await reqAddOrUpdateShopCar(skuId, skuNum);
    // 当前这个函数执行后返回值是一个Promise
    // async函数一定会返回一个promise对象。如果一个async函数的返回值看起来不是promise，那么它将会被隐式地包装在一个promise中。
    if (result.code == 200) {
      // 服务器加入购物车成功
      return 'ok'
      // 如果返回的是非promise的任意值，新promise变为resolved
    } else {
      // 加入购物车失败
      return Promise.reject(new Error('failed'))
      // 如果返回的是另一个新promise，此promise的结果就会成为新promise的结果
    }
  }
};
// 简化数据
const getters = {
  // 路径导航数据简化
  categoryView(state) {
    // 比如服务器数据还没回来时，state.goodInfo的初始状态是空对象，里面的categoryView属性值是undefined，再获取里面的属性就会报错
    // 但当服务器数据又回来时，又能正常获取属性值，所以这样写会有一个假报错（不影响运行）
    // return state.goodInfo.categoryView;
    // 所以至少返回一个空对象，空对象获取属性是undefined，不会报错
    return state.goodInfo.categoryView || {};
  },
  // 产品信息简化
  skuInfo(state) {
    return state.goodInfo.skuInfo || {};
  },
  // 产品售卖属性简化
  spuSaleAttrList(state) {
    return state.goodInfo.spuSaleAttrList || [];
  }
};

export default {
  state,
  mutations,
  actions,
  getters
}
import { reqGetAddressInfo, reqOrderInfo } from '@/api';
const state = {
  address: [],
  orderInfo: {}
};
const mutations = {
  GETADDRESSINFO(state, payload) {
    state.address = payload;
  },
  GETORDERINFO(state, payload) {
    state.orderInfo = payload
  }
};
const actions = {
  // 获取用户地址信息(前提是登录账号13700000000,111111)
  async getAddressInfo(context) {
    let result = await reqGetAddressInfo();
    if (result.code === 200) {
      context.commit('GETADDRESSINFO', result.data)
    }
  },
  // 获取订单交易页商品清单
  async getOrderInfo(context) {
    let result = await reqOrderInfo();
    if (result.code === 200) {
      context.commit('GETORDERINFO', result.data)
    }
  }
};
const getters = {};
export default {
  state,
  mutations,
  actions,
  getters
}
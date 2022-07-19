import { reqCartList, reqDeleteCartByID, reqUpdateCheckedById } from '@/api';

// shopcart模块的小仓库
const state = {
  cartList: []
};
const mutations = {
  GETCARTLIST(state, payload) {
    state.cartList = payload;
  }
};
const actions = {
  // 获取购物车列表数据
  async getCartList(context) {
    let result = await reqCartList();
    if (result.code === 200) {
      context.commit('GETCARTLIST', result.data);
    }
  },
  // 删除购物车某一个产品
  async deleteCartListBySkuId(context, skuId) {
    let result = await reqDeleteCartByID(skuId);
    // 没有返回result.data，不用三连环。但是要返回成功/失败的promise，组件要用
    if (result.code === 200) {
      return 'OK'
    } else {
      return Promise.reject(new Error('删除失败'))
    }
  },
  // 切换商品选中状态
  async updateCheckedById(context, { skuId, isChecked }) {
    let result = await reqUpdateCheckedById(skuId, isChecked);
    if (result.code === 200) {
      return 'OK'
    } else {
      return Promise.reject(new Error('切换选中失败'))
    }
  },
  // 删除选中的商品
  deleteAllCheckedCart(context) {
    // context小仓库,里面有属性,commit提交mutations,getters计算属性,dispatch派发actions
    // 获取选中的商品
    let PromiseAll = [];
    context.getters.cartList.cartInfoList.forEach(item => {
      let promise = item.isChecked === 1 ? context.dispatch('deleteCartListBySkuId', item.skuId) : '';
      // 将每次删除返回的promise添加到数组中
      PromiseAll.push(promise);
    });
    // 将每次删除的结果(成功\失败)总结,有一个失败即失败
    return Promise.all(PromiseAll);
  },
  // 切换全选
  updateAllCartIsChecked(context, isChecked) {
    let promiseAll = [];
    context.getters.cartList.cartInfoList.forEach(item => {
      let promise = context.dispatch('updateCheckedById', { skuId: item.skuId, isChecked });
      promiseAll.push(promise);
    });
    return Promise.all(promiseAll);
  }
};
const getters = {
  cartList(state) {
    return state.cartList[0] || {};
  }
};
export default {
  state,
  mutations,
  actions,
  getters
}
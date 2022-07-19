import { reqGetSearchInfo } from '@/api';

// search模块的小仓库
const state = {
  searchList: {},
};
const mutations = {
  GETSEARCHLIST(state, payload) {
    state.searchList = payload;
  }
};
const actions = {
  // 获取search模块的数据
  async getSearchList(context, payload = {}) {
    // reqGetSearchInfo函数在调用获取数据时，至少传递一个参数（空对象）
    // payload形参：当用户派发action的时候传递过来，至少是一个空对象
    let result = await reqGetSearchInfo(payload);
    if (result.code === 200) {
      context.commit('GETSEARCHLIST', result.data);
    }
  }
};
// 计算属性
// 项目中getters的主要作用是简化仓库中的数据
// 可以把组件中要用的数据简化，将来组件在获取数据时就方便了
const getters = {
  // 这里的state形参时当前仓库模块的state，并不是大仓库的state
  goodsList(state) {
    // 如果服务器数据回来了，则正常返回；如果网络不给力，为了不让它返回undefined，让它返回一个空数组
    return state.searchList.goodsList || [];
  },
  trademarkList(state) {
    return state.searchList.trademarkList;
  },
  attrsList(state) {
    return state.searchList.attrsList;
  }
};

export default {
  state,
  mutations,
  actions,
  getters,
}
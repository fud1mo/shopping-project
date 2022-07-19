import { reqCategoryList, reqGetBannerList, reqFloorList } from '@/api';

// home模块的小仓库
const state = {
  categoryList: [],
  // 轮播图的数据
  bannerList: [],
  floorList: [],
};
const mutations = {
  CATEGORYLIST(state, payload) {
    state.categoryList = payload;
  },
  BANNERLIST(state, payload) {
    console.log('修改仓库的数据');
    state.bannerList = payload;
  },
  FLOORLIST(state, payload) {
    state.floorList = payload;
  }
};
const actions = {
  // 通过API里面的接口函数调用,向服务器发请求,获取数据
  async getCategoryList(context) {
    let result = await reqCategoryList();
    // console.log(result);
    if (result.code === 200) {
      context.commit('CATEGORYLIST', result.data)
    }
  },
  // 获取首页轮播图的数据
  async getBannerList(context) {
    console.log('向服务器发请求获取轮播图数据');
    let result = await reqGetBannerList();
    // console.log(result);
    if (result.code === 200) {
      context.commit('BANNERLIST', result.data);
    }
  },
  // 获取floor轮播图数据
  // getFloorList这个action要在home组件中发，不能在floor组件内部发，因为两个floor组件里的数据不一样，需要v-for遍历floor组件
  async getFloorList(context) {
    let result = await reqFloorList();
    if (result.code === 200) {
      context.commit('FLOORLIST', result.data);
    }
  },
};
const getters = {};

export default {
  state,
  mutations,
  actions,
  getters,
}
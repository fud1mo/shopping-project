import { reqGetCode, reqUserRegister, reqUserLogin, reqUserInfo, reqLogout } from '@/api';
import { setToken, getToken, removeToken } from '@/utils/token'
// 登录与注册共同的模块
const state = {
  code: '',
  token: getToken(),//一开始获取不到，相当于空串
  userInfo: {},
};
const mutations = {
  GETCODE(state, payload) {
    state.code = payload;
  },
  USERLOGIN(state, payload) {
    state.token = payload;
  },
  GETUSERINFO(state, payload) {
    state.userInfo = payload;
  },
  // 清除本地数据
  CLEAR(state) {
    // 把仓库中相关用户信息清空
    state.token = '';
    state.userInfo = {};
    // 本地存储的token数据清空
    removeToken();
  }
};
const actions = {
  // 获取验证码
  async getCodeNumber(context, phone) {
    // 这个获取验证码的接口把验证码返回了,但正常情况是后台把验证码发到用户手机上
    let result = await reqGetCode(phone);
    if (result.code === 200) {
      context.commit('GETCODE', result.data);
      return 'ok'
    } else {
      return Promise.reject(new Error('验证码获取失败'))
    }
  },
  // 用户注册
  async userRegister(context, user) {
    let result = await reqUserRegister(user);
    console.log('注册结果', result);
    if (result.code === 200) {
      return 'OK'
    } else {
      return Promise.reject(new Error('注册失败'))
    }
  },
  // 用户登录(涉及到token)
  async userLogin(context, user) {
    let result = await reqUserLogin(user);
    // 服务器下发的token是某用户的唯一标识
    // 将来经常通过带token找服务器要用户信息进行展示
    console.log('登录结果', result);
    if (result.code === 200) {
      // 用户登录成功且获取到token
      context.commit('USERLOGIN', result.data.token);
      // 持久化存储token,token本身是字符串,无需转化
      setToken(result.data.token);
      return 'OK'
    } else {
      return Promise.reject(new Error('登录失败'))
    }
  },
  // 获取用户信息
  async getUserInfo(context) {
    let result = await reqUserInfo();
    // console.log(result);
    if (result.code === 200) {
      // 提交用户信息
      context.commit('GETUSERINFO', result.data);
      return 'ok'
    } else {
      return Promise.reject(new Error('fail'))
    }
  },
  // 退出登录
  async userLogout(context) {
    // 只是向服务器发起一次请求，通知服务器清除token
    let result = await reqLogout();
    // action里面不能操作state，要提交mutation去修改state
    if (result.code === 200) {
      context.commit('CLEAR');
      return "ok"
    } else {
      return Promise.reject(new Error('退出失败'))
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
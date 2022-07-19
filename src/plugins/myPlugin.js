// 自定义插件
// vue的插件一定暴露一个对象,且这个对象必须有install方法
let myPlugin = {};
// install方法的第一个参数是 Vue 构造器，第二个参数是一个可选的选项对象
myPlugin.install = function (Vue, options) {
  console.log('调用'); //use的时候调用
  console.log(Vue); // 调用的时候注入一个Vue
  console.log(options);
  // 在插件中利用Vue构造器可以做很多事
  // Vue.prototype.$bus
  // Vue.directive全局指令
  // Vue.component全局组件
  // Vue.filter
  Vue.directive(options.name, (element, params) => {
    console.log('执行!!!!', element, params);
    element.innerHTML = params.value.toUpperCase();
  })
}
export default myPlugin;
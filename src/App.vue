<template>
  <div id="app">
    <!-- <h2 v-upper="msg"></h2> -->
    <Header></Header>
    <router-view />
    <Footer v-show="$route.meta.show"></Footer>
  </div>
</template>

<script>
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";

export default {
  name: "App",
  data() {
    return {
      msg: "abc",
    };
  },
  components: {
    Header,
    Footer,
  },
  mounted() {
    // 当组件挂载完毕,就可以向服务器发请求
    // 派发action,通知Vuex发请求,获取数据,存储到仓库中
    // 获取商品分类的三级列表数据,放在这个根组件中是为了让它只执行一次,且在app.vue中是最先执行的,只发一次性能更好
    // 不能放在main.js,因为this指的是组件,组件中才有$store属性,main.js不是组件
    this.$store.dispatch("getCategoryList");
  },
};
</script>

<style>
</style>

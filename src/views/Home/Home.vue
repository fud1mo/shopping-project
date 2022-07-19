<template>
  <div>
    <!-- 三级联动全局组件，已经在main.js注册为全局组件，无需引入 -->
    <type-nav />
    <list-container />
    <recommend />
    <rank />
    <like />
    <floor v-for="item in floorList" :key="item.id" :list="item" />
    <brand />
  </div>
</template>

<script>
// 引入其余的组件
import ListContainer from "./ListContainer/ListContainer.vue";
import Recommend from "./Recommend/Recommend.vue";
import Rank from "./Rank/Rank.vue";
import Like from "./Like/Like.vue";
import Floor from "./Floor/Floor.vue";
import Brand from "./Brand/Brand.vue";
import { mapState } from "vuex";

export default {
  name: "Home",
  components: {
    ListContainer,
    Recommend,
    Rank,
    Like,
    Floor,
    Brand,
  },
  mounted() {
    // 派发action，获取floor组件的数据
    this.$store.dispatch("getFloorList");
    // 获取用户信息,在首页展示
    // this.$store.dispatch("getUserInfo");
  },
  computed: {
    ...mapState({
      floorList: (state) => state.home.floorList,
    }),
  },
};
</script>

<style scoped>
</style>
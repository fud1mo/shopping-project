<template>
  <div class="swiper-container" ref="mySwiper">
    <div class="swiper-wrapper">
      <div class="swiper-slide" v-for="carousel in list" :key="carousel.id">
        <img :src="carousel.imgUrl" />
      </div>
    </div>
    <!-- 如果需要分页器 -->
    <div class="swiper-pagination"></div>

    <!-- 如果需要导航按钮 -->
    <div class="swiper-button-prev"></div>
    <div class="swiper-button-next"></div>
  </div>
</template>

<script>
import Swiper from "swiper";
export default {
  name: "Carousel",
  props: ["list"],
  watch: {
    list: {
      // 立即监听:该回调将会在侦听开始之后被立即调用.不管数据有没有变化，上来立即监听一次。不然监听不到（数据是父组件给的，没有发生变化）
      immediate: true,
      handler(newValue, oldValue) {
        // 只能监听到数据已经有了，但是v-for动态渲染结构还是没法确定，因此还是要用nextTick
        this.$nextTick(() => {
          var mySwiper = new Swiper(this.$refs.mySwiper, {
            // direction: 'vertical', // 垂直切换选项
            loop: true, // 循环模式选项
            // 如果需要分页器
            pagination: {
              el: ".swiper-pagination",
              clickable: true,
            },
            // 如果需要前进后退按钮
            navigation: {
              nextEl: ".swiper-button-next",
              prevEl: ".swiper-button-prev",
            },
          });
        });
      },
    },
  },
};
</script>

<style scoped>
</style>
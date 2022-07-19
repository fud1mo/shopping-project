<template>
  <div class="swiper-container" ref="cur">
    <div class="swiper-wrapper">
      <div
        class="swiper-slide"
        v-for="(slider, index) in skuImageList"
        :key="slider.id"
      >
        <img
          :src="slider.imgUrl"
          :class="{ active: currentIndex === index }"
          @click="changeIndex(index)"
        />
      </div>
    </div>
    <div class="swiper-button-prev"></div>
    <div class="swiper-button-next"></div>
  </div>
</template>

<script>
import Swiper from "swiper";
export default {
  name: "ImageList",
  data() {
    return {
      currentIndex: 0,
    };
  },
  props: {
    skuImageList: {
      type: Array,
      default() {
        return [{}];
      },
    },
  },
  watch: {
    // 监听数据，可以保证数据一定有，但不能保证v-for是否遍历完毕了
    skuImageList(newValue, oldValue) {
      this.$nextTick(() => {
        // 当数据回来，且v-for遍历完毕（DOM结构都有了）就会执行一次
        new Swiper(this.$refs.cur, {
          // 如果需要前进后退按钮
          navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
          },
          // 设置slider容器能够同时显示的slides数量
          slidesPerView: 3,
          // 定义slides的数量多少为一组（默认一个）
          slidesPerGroup: 1,
        });
      });
    },
  },
  methods: {
    changeIndex(index) {
      this.currentIndex = index;
      // 通知兄弟组件当前的索引值
      this.$bus.$emit("getIndex", this.currentIndex);
    },
  },
};
</script>

<style lang="less" scoped>
.swiper-container {
  height: 56px;
  width: 412px;
  box-sizing: border-box;
  padding: 0 12px;

  .swiper-slide {
    width: 56px;
    height: 56px;

    img {
      width: 100%;
      height: 100%;
      border: 1px solid #ccc;
      padding: 2px;
      width: 50px;
      height: 50px;
      display: block;

      &.active {
        border: 2px solid #f60;
        padding: 1px;
      }
    }
  }

  .swiper-button-next {
    left: auto;
    right: 0;
  }

  .swiper-button-prev {
    left: 0;
    right: auto;
  }

  .swiper-button-next,
  .swiper-button-prev {
    box-sizing: border-box;
    width: 12px;
    height: 56px;
    background: rgb(235, 235, 235);
    border: 1px solid rgb(204, 204, 204);
    top: 0;
    margin-top: 0;
    &::after {
      font-size: 12px;
    }
  }
}
</style>
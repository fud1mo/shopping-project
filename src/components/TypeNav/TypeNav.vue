<template>
  <div class="type-nav">
    <!-- <h1>{{ categoryList }}</h1> -->
    <!-- <h1>{{ $store.state.home.categoryList }}</h1> -->
    <div class="container">
      <div @mouseleave="leaveShow" @mouseenter="enterShow">
        <h2 class="all">全部商品分类</h2>
        <!-- 过渡动画 -->
        <transition name="sort">
          <div class="sort" v-show="show">
            <div class="all-sort-list2" @click="goSearch">
              <div
                class="item"
                v-for="(c1, index) in categoryList.slice(0, 15)"
                :key="c1.categoryId"
              >
                <h3
                  @mouseenter="changeIndex(index)"
                  :class="{ cur: currentIndex === index }"
                >
                  <a
                    :data-categoryName="c1.categoryName"
                    :data-category1Id="c1.categoryId"
                    >{{ c1.categoryName }}</a
                  >
                </h3>
                <div class="item-list clearfix" v-show="currentIndex === index">
                  <div
                    class="subitem"
                    v-for="c2 in c1.categoryChild"
                    :key="c2.categoryId"
                  >
                    <dl class="fore">
                      <dt>
                        <a
                          :data-categoryName="c2.categoryName"
                          :data-category2Id="c2.categoryId"
                          >{{ c2.categoryName }}</a
                        >
                      </dt>
                      <dd>
                        <em v-for="c3 in c2.categoryChild" :key="c3.categoryId">
                          <a
                            :data-categoryName="c3.categoryName"
                            :data-category3Id="c3.categoryId"
                            >{{ c3.categoryName }}</a
                          >
                        </em>
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </transition>
      </div>
      <nav class="nav">
        <a href="###">服装城</a>
        <a href="###">美妆馆</a>
        <a href="###">尚品汇超市</a>
        <a href="###">全球购</a>
        <a href="###">闪购</a>
        <a href="###">团购</a>
        <a href="###">有趣</a>
        <a href="###">秒杀</a>
      </nav>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
// 这里把lodash全部的功能函数引入了
// import _ from "lodash";
// 最好的引入方式:按需引入
import { throttle } from "lodash";

export default {
  name: "TypeNav",
  data() {
    return {
      // 存储用户鼠标移上哪一个一级分类
      currentIndex: -1,
      show: true,
    };
  },
  mounted() {
    // 当组件挂载完毕,让show的值变为false
    if (this.$route.path !== "/home") {
      this.show = false;
    }
    console.log("挂载完毕");
  },
  computed: {
    ...mapState({
      // 对象写法右侧需要的是一个函数,当使用这个计算属性时,右侧的函数会立即执行一次
      // 注入一个参数state,即为大仓库中的state(包括home和search)
      categoryList: (state) => {
        // console.log(state);
        return state.home.categoryList;
      },
    }),
  },
  methods: {
    // 鼠标进入,修改响应式数据currentIndex
    changeIndex: throttle(function (index) {
      // 如果用户行为过快,且回调函数中有大量业务时,可能会出现卡顿,因此需要节流
      this.currentIndex = index;
      // console.log("进入" + index);
    }, 50),
    goSearch(event) {
      // 最好的解决方案:编程式导航+事件委派(把所有子节点的事件委派给父节点)
      // 利用事件委派存在的问题:1.点击a才要跳转,如何确定点击的是否为a标签 2.如何获取参数
      // 即使能确定点击的是a标签,如何区分是一级\二级\三级分类的标签
      // this.$router.push("./search");

      // 1. 第一个问题:把子节点当中的a标签,加上自定义属性data-categoryName,其余的子节点没有
      // 自定义属性需要在定义属性的时候在前面加上 data- 才能被 dataset 函数获取
      let element = event.target;
      // console.log(element);
      // 获取到当前发出这个事件的节点可能是h3,a,dt,dl,需要带有data-categoryname的节点(一定是a标签)
      // 节点有一个属性dataset,可以获取节点的自定义属性与属性值
      // console.log(element.dataset);
      let { categoryname, category1id, category2id, category3id } =
        element.dataset;
      // 解构出categoryname,如果标签身上拥有categoryname,则一定是a标签
      if (categoryname) {
        // 整理路由跳转的参数
        let location = { name: "search" };
        let query = { categoryName: categoryname };
        // 2.区分一级\二级\三级分类的标签
        if (category1id) {
          query.category1Id = category1id;
        } else if (category2id) {
          query.category2Id = category2id;
        } else {
          query.category3Id = category3id;
        }
        // 判断:如果路由跳转的时候带有params参数,也要捎带传递过去
        if (this.$route.params) {
          location.params = this.$route.params;
        }
        // 整理完毕
        location.query = query;
        // 路由跳转
        this.$router.push(location);
      }
    },
    // 鼠标移出时,让typenav收起
    leaveShow() {
      this.currentIndex = -1;
      if (this.$route.path !== "/home") {
        this.show = false;
      }
    },
    // 鼠标移入时,让typenav展开
    enterShow() {
      this.show = true;
    },
  },
};
</script>

<style scoped lang='less'>
.type-nav {
  border-bottom: 2px solid #e1251b;

  .container {
    width: 1200px;
    margin: 0 auto;
    display: flex;
    position: relative;

    .all {
      width: 210px;
      height: 45px;
      background-color: #e1251b;
      line-height: 45px;
      text-align: center;
      color: #fff;
      font-size: 14px;
      font-weight: bold;
    }

    .nav {
      a {
        height: 45px;
        margin: 0 22px;
        line-height: 45px;
        font-size: 16px;
        color: #333;
      }
    }

    .sort {
      position: absolute;
      left: 0;
      top: 45px;
      width: 210px;
      height: 461px;
      position: absolute;
      background: #fafafa;
      z-index: 999;

      .all-sort-list2 {
        .item {
          h3 {
            line-height: 30px;
            font-size: 14px;
            font-weight: 400;
            overflow: hidden;
            padding: 0 20px;
            margin: 0;

            a {
              color: #333;
              text-decoration: none;
            }
          }

          .item-list {
            // display: none;
            position: absolute;
            width: 734px;
            min-height: 460px;
            background: #f7f7f7;
            left: 210px;
            border: 1px solid #ddd;
            top: 0;
            z-index: 9999 !important;

            .subitem {
              float: left;
              width: 650px;
              padding: 0 4px 0 8px;

              dl {
                border-top: 1px solid #eee;
                padding: 6px 0;
                overflow: hidden;
                zoom: 1;

                &.fore {
                  border-top: 0;
                }

                dt {
                  float: left;
                  width: 54px;
                  line-height: 22px;
                  text-align: right;
                  padding: 3px 6px 0 0;
                  font-weight: 700;
                }

                dd {
                  float: left;
                  width: 415px;
                  padding: 3px 0 0;
                  overflow: hidden;

                  em {
                    float: left;
                    height: 14px;
                    line-height: 14px;
                    padding: 0 8px;
                    margin-top: 5px;
                    border-left: 1px solid #ccc;
                  }
                }
              }
            }
          }
        }
        .cur {
          background-color: rgb(255, 152, 152);
          a {
            color: #fff !important;
          }
        }
      }
    }
    // 过渡动画样式
    // 过渡动画进入的开始状态
    .sort-enter,
    .sort-leave-to {
      height: 0px;
    }
    // 过渡动画进入的结束状态
    .sort-enter-to,
    .sort-leave {
      height: 461px;
    }
    // 定义动画的时间,速率
    .sort-enter-active,
    .sort-leave-active {
      transition: all 0.3s;
      overflow: hidden;
    }
  }
}
</style>
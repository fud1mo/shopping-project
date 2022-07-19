<template>
  <div class="cart">
    <h4>全部商品</h4>
    <div class="cart-main">
      <div class="cart-th">
        <div class="cart-th1">全部</div>
        <div class="cart-th2">商品</div>
        <div class="cart-th3">单价（元）</div>
        <div class="cart-th4">数量</div>
        <div class="cart-th5">小计（元）</div>
        <div class="cart-th6">操作</div>
      </div>
      <div class="cart-body">
        <ul class="cart-list" v-for="cart in cartInfoList" :key="cart.id">
          <li class="cart-list-con1">
            <input
              type="checkbox"
              name="chk_list"
              :checked="cart.isChecked === 1"
              @change="updateChecked(cart, $event)"
            />
          </li>
          <li class="cart-list-con2">
            <img :src="cart.imgUrl" />
            <div class="item-msg">{{ cart.skuName }}</div>
          </li>
          <li class="cart-list-con4">
            <span class="price">{{ cart.skuPrice }}.00</span>
          </li>
          <li class="cart-list-con5">
            <a
              href="javascript:void(0)"
              class="mins"
              @click="handler('minus', -1, cart)"
              >-</a
            >
            <input
              autocomplete="off"
              type="text"
              minnum="1"
              class="itxt"
              :value="cart.skuNum"
              @change="handler('change', +$event.target.value, cart)"
            />
            <a
              href="javascript:void(0)"
              class="plus"
              @click="handler('add', 1, cart)"
              >+</a
            >
          </li>
          <li class="cart-list-con6">
            <span class="sum">{{ cart.skuPrice * cart.skuNum }}</span>
          </li>
          <li class="cart-list-con7">
            <a class="sindelet" @click="deleteCartById(cart.skuId)">删除</a>
            <br />
            <a href="#none">移到收藏</a>
          </li>
        </ul>
      </div>
    </div>
    <div class="cart-tool">
      <div class="select-all">
        <input
          class="chooseAll"
          type="checkbox"
          :checked="isAllChecked && cartInfoList.length > 0"
          @change="updateAllCartChecked"
        />
        <span>全选</span>
      </div>
      <div class="option">
        <a @click="deleteAllCheckedCart">删除选中的商品</a>
        <a href="#none">移到我的关注</a>
        <a href="#none">清除下柜商品</a>
      </div>
      <div class="money-box">
        <div class="chosed">已选择 <span>0</span>件商品</div>
        <div class="sumprice">
          <em>总价（不含运费）：</em>
          <i class="summoney">￥{{ totalPrice }}</i>
        </div>
        <div class="sumbtn">
          <router-link class="sum-btn" to="/trade">结算</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { throttle } from "lodash";
export default {
  name: "ShopCart",
  mounted() {
    this.getData(); //为什么不直接写请求代码？在购物车页面修改数量时还要发送请求，因此会多次使用
  },
  methods: {
    // 获取个人购物车数据
    getData() {
      this.$store.dispatch("getCartList");
    },
    // 修改某个产品的个数,detail用过的addOrUpdateShopCar接口再次使用
    // 设置节流
    handler: throttle(async function (type, disNum, cart) {
      // 1.type是为了区分这三个元素
      // 2.目前disNum形参：+为变化量+1，-为变化量-1，input为最终的个数
      // 3.cart：哪一个产品（身上有id）
      // 向服务器发请求，修改数量
      switch (type) {
        case "add":
          disNum = 1;
          break;
        case "minus":
          // 判断产品个数大于1，才可以传递给服务器-1,不然传递给服务器的个数为0（个数不变）
          disNum = cart.skuNum > 1 ? -1 : 0;
          break;
        case "change":
          //用户输入的是最终的量（不是变化量），如果是非法的或者是小于1的个数，则变化量为0
          if (isNaN(disNum) || disNum < 1) {
            disNum = 0;
          } else {
            // 合法数字且大于1也要考虑浮点数，直接去除小数取整
            disNum = parseInt(disNum) - cart.skuNum;
          }
          break;
      }
      try {
        // 代表修改成功
        await this.$store.dispatch("addOrUpdateShopCar", {
          skuId: cart.skuId,
          skuNum: disNum,
        });
        // 再次从服务器获取购物车数据进行展示
        this.getData();
      } catch (error) {
        console.log(error.message);
      }
    }, 1000),
    // 删除某一个产品
    async deleteCartById(skuId) {
      try {
        // 如果删除成功,再次发请求获取数据
        await this.$store.dispatch("deleteCartListBySkuId", skuId);
        this.getData();
      } catch (error) {
        alert(error.message);
      }
    },
    // 切换商品选中状态
    async updateChecked(cart, event) {
      try {
        // 带给服务器的isChecked不是布尔值,而是0\1
        let isChecked = event.target.checked ? 1 : 0;
        await this.$store.dispatch("updateCheckedById", {
          skuId: cart.skuId,
          // kv一致,简写
          isChecked,
        });
        // 如果切换请求成功,再次获取服务器数据
        this.getData();
      } catch (error) {
        alert(error.message);
      }
    },
    // 删除选中的商品
    // deleteAllCheckedCart() {
    //   this.cartInfoList.forEach((cart) => {
    //     if (cart.isChecked === 1) {
    //       this.deleteCartById(cart.skuId);
    //     }
    //   });
    // },//这种方法如果多个删除失败,会提醒多次
    async deleteAllCheckedCart() {
      try {
        // 派发action
        await this.$store.dispatch("deleteAllCheckedCart");
        //  全部删除成功,再次发请求
        this.getData();
      } catch (error) {
        alert(error.message);
      }
    },
    // 切换全选
    async updateAllCartChecked(event) {
      try {
        let isChecked = event.target.checked ? 1 : 0;
        // 派发action
        await this.$store.dispatch("updateAllCartIsChecked", isChecked);
        this.getData();
      } catch (error) {
        alert(error.message);
      }
    },
  },
  computed: {
    ...mapGetters(["cartList"]),
    // 购物车数据
    cartInfoList() {
      return this.cartList.cartInfoList || [];
    },
    // 计算总价
    totalPrice() {
      // let sum = 0;
      // this.cartInfoList.forEach((cart) => {
      //   if (cart.isChecked == 1) {
      //     sum += cart.skuPrice * cart.skuNum;
      //   }
      // });
      let sum = this.cartInfoList
        .filter((cart) => cart.isChecked === 1)
        .map((cart) => cart.skuPrice * cart.skuNum)
        .reduce((pre, cur) => pre + cur, 0);
      return sum;
    },
    // 判断是否全选
    isAllChecked() {
      return this.cartInfoList.every((cart) => cart.isChecked === 1);
    },
  },
};
</script>

<style lang="less" scoped>
.cart {
  width: 1200px;
  margin: 0 auto;

  h4 {
    margin: 9px 0;
    font-size: 14px;
    line-height: 21px;
  }

  .cart-main {
    .cart-th {
      background: #f5f5f5;
      border: 1px solid #ddd;
      padding: 10px;
      overflow: hidden;

      & > div {
        float: left;
      }

      .cart-th1 {
        width: 25%;

        input {
          vertical-align: middle;
        }

        span {
          vertical-align: middle;
        }
      }

      .cart-th2 {
        width: 25%;
      }

      .cart-th3,
      .cart-th4,
      .cart-th5,
      .cart-th6 {
        width: 12.5%;
      }
    }

    .cart-body {
      margin: 15px 0;
      border: 1px solid #ddd;

      .cart-list {
        padding: 10px;
        border-bottom: 1px solid #ddd;
        overflow: hidden;

        & > li {
          float: left;
        }

        .cart-list-con1 {
          width: 15%;
        }

        .cart-list-con2 {
          width: 35%;

          img {
            width: 82px;
            height: 82px;
            float: left;
          }

          .item-msg {
            float: left;
            width: 150px;
            margin: 0 10px;
            line-height: 18px;
          }
        }

        .cart-list-con4 {
          width: 10%;
        }

        .cart-list-con5 {
          width: 17%;

          .mins {
            border: 1px solid #ddd;
            border-right: 0;
            float: left;
            color: #666;
            width: 6px;
            text-align: center;
            padding: 8px;
          }

          input {
            border: 1px solid #ddd;
            width: 40px;
            height: 33px;
            float: left;
            text-align: center;
            font-size: 14px;
          }

          .plus {
            border: 1px solid #ddd;
            border-left: 0;
            float: left;
            color: #666;
            width: 6px;
            text-align: center;
            padding: 8px;
          }
        }

        .cart-list-con6 {
          width: 10%;

          .sum {
            font-size: 16px;
          }
        }

        .cart-list-con7 {
          width: 13%;

          a {
            color: #666;
          }
        }
      }
    }
  }

  .cart-tool {
    overflow: hidden;
    border: 1px solid #ddd;

    .select-all {
      padding: 10px;
      overflow: hidden;
      float: left;

      span {
        vertical-align: middle;
      }

      input {
        vertical-align: middle;
      }
    }

    .option {
      padding: 10px;
      overflow: hidden;
      float: left;

      a {
        float: left;
        padding: 0 10px;
        color: #666;
      }
    }

    .money-box {
      float: right;

      .chosed {
        line-height: 26px;
        float: left;
        padding: 0 10px;
      }

      .sumprice {
        width: 200px;
        line-height: 22px;
        float: left;
        padding: 0 10px;

        .summoney {
          color: #c81623;
          font-size: 16px;
        }
      }

      .sumbtn {
        float: right;

        a {
          display: block;
          position: relative;
          width: 96px;
          height: 52px;
          line-height: 52px;
          color: #fff;
          text-align: center;
          font-size: 18px;
          font-family: "Microsoft YaHei";
          background: #e1251b;
          overflow: hidden;
        }
      }
    }
  }
}
</style>
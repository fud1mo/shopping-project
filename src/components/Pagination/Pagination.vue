<template>
  <div class="pagination">
    <button :disabled="pageNo === 1" @click="$emit('getPageNo', pageNo - 1)">
      上一页
    </button>
    <!-- 上半部分 -->
    <button v-if="startNumAndEndNum.start > 1" @click="$emit('getPageNo', 1)">
      1
    </button>
    <button v-if="startNumAndEndNum.start > 2">···</button>

    <!-- 中间部分 -->
    <button
      v-for="(page, index) in startNumAndEndNum.end"
      :key="index"
      v-show="page >= startNumAndEndNum.start"
      @click="$emit('getPageNo', page)"
      :class="{ active: pageNo === page }"
    >
      {{ page }}
    </button>

    <!-- 下半部分 -->
    <button v-if="startNumAndEndNum.end < totalPage - 1">···</button>
    <button
      v-if="startNumAndEndNum.end < totalPage"
      @click="$emit('getPageNo', totalPage)"
    >
      {{ totalPage }}
    </button>
    <button
      :disabled="pageNo === totalPage"
      @click="$emit('getPageNo', pageNo + 1)"
    >
      下一页
    </button>

    <button style="margin-left: 30px">共 {{ total }} 条</button>
  </div>
</template>

<script>
// 分页器自定义的4个前提:pageNo当前第几页,pageSize每页几条数据,total数据总条数,continues分页连续页码个数
export default {
  name: "Pagination",
  props: ["pageNo", "pageSize", "total", "continues"],
  computed: {
    // 总页数
    totalPage() {
      return Math.ceil(this.total / this.pageSize);
    },
    startNumAndEndNum() {
      let start = 0,
        end = 0;
      if (this.totalPage < this.continues) {
        start = 1;
        end = this.totalPage;
      } else {
        start = this.pageNo - Math.floor(this.continues / 2);
        end = this.pageNo + Math.floor(this.continues / 2);
        if (start < 1) {
          start = 1;
          end = this.continues;
        }
        if (end > this.totalPage) {
          end = this.totalPage;
          start = end - this.continues + 1;
        }
      }
      return { start, end };
    },
  },
};
</script>

<style lang="less" scoped>
.pagination {
  text-align: center;
  button {
    margin: 0 5px;
    background-color: #f4f4f5;
    color: #606266;
    outline: none;
    border-radius: 2px;
    padding: 0 4px;
    vertical-align: top;
    display: inline-block;
    font-size: 13px;
    min-width: 35.5px;
    height: 28px;
    line-height: 28px;
    cursor: pointer;
    box-sizing: border-box;
    text-align: center;
    border: 0;

    &[disabled] {
      color: #c0c4cc;
      cursor: not-allowed;
    }

    &.active {
      cursor: not-allowed;
      background-color: #e43b3b;
      color: #fff;
    }
    &:hover {
      background-color: #ff8e8e;
      color: #fff;
    }
  }
}
</style>

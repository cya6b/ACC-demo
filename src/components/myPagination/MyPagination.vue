<template>
  <div class="my_pagination">
    <el-pagination background
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="page"
      :page-size="size"
      :page-sizes="defaultPageSizes"
      layout="prev, pager, next"
      v-bind="$attrs"
      v-on="$listeners">
    </el-pagination>
  </div>
</template>
<script>
import { ElPagination } from 'element-plus'
export default {
  name: '',
  components: {ElPagination},
  props: {
    updateData: {
      type: Function
    },
    currentPage: {
      type: Number
    },
    pageSize: {
      type: Number
    }
  },
  data () {
    return {
      defaultPageSizes: [10, 20, 30, 40],
      totals: 0,
      page: 1,
      size: 10
    }
  },
  computed: {
  },
  watch: {
    'total': {
      handler (val) {
        this.totals = val
      }
    },
    'currentPage': {
      handler (val) {
        this.page = val
      }
    },
    'pageSize': {
      handler (val) {
        if (isNaN(val)) {
          return
        }
        this.size = val
        if (!this.defaultPageSizes.includes(val)) {
          this.defaultPageSizes.push(val)
          this.defaultPageSizes.sort((a, b) => {
            return a - b
          })
        }
      },
      immediate: true
    }
  },
  created () {},
  mounted () {},
  destroyed () {},
  methods: {
    updatePage () {
      this.$emit('update:currentPage', this.page)
    },
    updateSize () {
      this.$emit('update:pageSize', this.size)
    },
    handleSizeChange (val) {
      this.size = val
      this.page = 1
      this.updateSize()
      this.updatePage()
      this.updateData && this.updateData()
    },
    handleCurrentChange (val) {
      this.page = val
      this.updatePage()
      this.updateData && this.updateData()
    }
  }
}
</script>
<style lang='less' scoped>
.my_pagination{
  float: right;
  margin-top: 10px;
  height: 32px;
}
</style>

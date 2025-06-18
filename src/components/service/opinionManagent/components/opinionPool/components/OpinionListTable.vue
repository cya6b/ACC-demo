<template>
  <el-table
    class="opinion-lib__table"
    :data="tableData"
    height="100%"
    v-loading="loading"
    border
    highlight-current-row
    @current-change="handleCurrentChange">
    <el-table-column label="序号" type="index" width="60"></el-table-column>
    <el-table-column label="规范及条文号" prop="normNumber">
      <template #default="scope">{{scope.row.normNumber || '--'}}</template>
    </el-table-column>
    <el-table-column label="意见内容" prop="reviewContent" min-width="160px">
      <template #default="scope">
        <div class="txt_height" v-html="opinionFormat(scope.row.opinionContent || scope.row.opinion)"></div>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
import {ElTable, ElTableColumn} from 'element-plus'
import util from '../../../../../../plugins/util.js'
export default {
  components: {ElTable, ElTableColumn},
  data () {
    return {
      tableData: [],
      loading: false,
      currentRowData: null
    }
  },
  props: {
    list: {
      type: Array,
      default: () => []
    }
  },
  watch: {
    list: {
      handler (v) {
        this.tableData = v
      },
      immediate: true
    }
  },
  methods: {
    handleCurrentChange(data) {
      this.currentRowData = data
    },
    opinionFormat (str) {
      str = (str || '').replace(/\<br\/>/g, '\n')
      return util.specialSymbolTrans.getHtml(str)
    },
  }
}
</script>

<style>

</style>
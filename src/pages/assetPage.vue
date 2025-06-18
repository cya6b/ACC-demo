<template>
  <div>
    <el-table :data="filesList">
      <el-table-column label="版本">
        <template #default="scope">
          {{ scope.row.label }}
        </template>
      </el-table-column>
      <el-table-column label="日期">
        <template #default="scope">
          {{ scope.row.date }}
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template #default="scope">
          <a :href="`/static/${scope.row.path}`" download>下载</a>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import sdkList from '../../public/static/sdkList.js'
import {ElTable, ElTableColumn} from 'element-plus'
export default {
  components: {ElTable, ElTableColumn},
  data () {
    return {
      filesList: sdkList
    }
  },
  created () {
  },
  methods: {
  }
}
</script>

<style>

</style>
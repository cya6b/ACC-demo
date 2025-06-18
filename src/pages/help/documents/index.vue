<template>
  <div class="doc_wrap">
    <div class="version_select">
      <el-select v-model="currentReferIndex">
        <el-option v-for="(item, itemIndex) in ReferData" :key="itemIndex" :label="item.label" :value="itemIndex"></el-option>
      </el-select>
    </div>
    <aside class="side_bar">
      <div v-for="c in Refers" @click="siedItemClick(c)" :class="`menu_item ${currentKey === c.label ? '__active' : ''}`">
        {{ c.label }}
        <span v-if="c.version" class="version_span"> [{{ c.version }}]</span>
        <span v-if="c.update" class="update_span"> (update) </span>
        <span v-if="c.new" class="update_span"> (new) </span>
      </div>
    </aside>
    <main class="main_content" ref="mainDom">
      <h1 class="title">{{ currentCData.title }}</h1>
      <h3>{{ currentCData.desc }}</h3>
      <div class="container_overview" v-for="item in currentCData.detail">
        <h3>{{ item.title }}</h3>
        <div class="item" v-for="i in item.list">
          <div class="with_back_color">
            {{ i.label }}
            <span v-if="i.update" class="update_span"> (update) </span>
          </div>
          <div class="item_desc">{{ i.desc}}</div>
          <div v-if="i.parameters && i.parameters.length" class="table_title">Parameters:</div>
          <el-table border v-if="i.parameters && i.parameters.length" :data="i.parameters"
            :row-class-name="({row}) => `${row.update ? '__update_row': ''}`">
            <el-table-column label="name" prop="name" width="200"></el-table-column>
            <el-table-column label="type" prop="type" width="80"></el-table-column>
            <el-table-column label="desc" prop="desc" align="center"></el-table-column>
            <el-table-column label="必填" prop="required" width="60" ></el-table-column>
            <el-table-column label="新增" prop="update" width="60" >
            </el-table-column>
          </el-table>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
import ReferData from './js/referIndex'
import {ElTable, ElTableColumn, ElSelect, ElOption} from 'element-plus'
export default {
  components: {ElTable, ElTableColumn, ElSelect, ElOption},
  data () {
    return {
      ReferData,
      currentReferIndex: ReferData.length ? ReferData.length - 1 : 0, // 默认最新的版本
      Refers: [],
      currentKey: ''
    }
  },
  created () {
    this.refreshRefers()
  },
  computed: {
    currentCData () {
      let c = this.Refers.find(c => {
        return c.label === this.currentKey
      })
      if (c) return c.data
      return []
    },
  },
  methods: {
    refreshRefers () {
      this.Refers = this.ReferData[this.currentReferIndex]?.list || []
      if (this.currentKey) {
        let temp = this.Refers.find(item => {
          return item.label === this.currentKey
        })
        if (temp) {
          this.currentKey = temp.label
          return
        }
      }
      this.currentKey = this.Refers[0].label
    },
    siedItemClick(c) {
      this.currentKey = c.label
      this.$refs.mainDom.scrollTop = 0
    }
  },
  watch: {
    currentReferIndex: {
      handler (val) {
        this.refreshRefers()
      }
    }
  }
}
</script>

<style lang="less" scoped>
.doc_wrap{
  position: relative;
  width: 1440px;
  padding-top: 40px;
  height: calc(100vh - 120px);
  margin: 0px auto;
  display: flex;
}
.version_select{
  position: absolute;
  top: 4px;
  right: 0px;
}
.side_bar{
  font-size: 14px;
  background-color: #f5f5f5;
  width: 280px;
  z-index: 10;
  margin: 0;
  box-sizing: border-box;
  border-right: 1px solid #eaecef;
  overflow-y: auto;

  .version_span{
    color: #46464699;
  }
}

.update_span {
  color: #ef0b0ba4;
}

.main_content{
  display: block;
  height: 100%;
  padding: 0px 20px 0px 36px;
  background: #fff;
  overflow: auto;
  flex-grow: 1;
}

.menu_item{
  height: 36px;
  line-height: 36px;
  padding: 0px 12px;
  &:hover{
    cursor: pointer;
    background: rgba(0,102,165,.4);
  }
}
.menu_item.__active{
  background: rgba(0,102,165,.7);
}

.title{
  font-size: 30px;
  margin: 40px 0 20px;
}
.container_overview{
  box-sizing: border-box;
  padding: 0;
  margin: 0;
  .item{
    margin: 24px 0px;
    .item_desc{
      font-size: 14px;
      padding-left: 12px;
    }
    .table_title{
      margin: 12px;
      font-size: 14px;
    }
  }
}

.with_back_color{
  height: auto;
  display: flex;
  align-items: center;
  min-height: 50px;
  padding: 0 10px;
  background-color: #eaeaea;
}
</style>
<style lang="less">
.el-table .__update_row{
  --el-table-tr-bg-color: var(--el-color-warning-light-9);
}
</style>
<template>
  <!-- 近期意见库 -->
  <span class="label" @click.capture.stop="openDialog">{{ title }}</span>
  <div v-if="act.show" ref="dragBox" v-drag class="recent_opinion_pool_box" @click="updateDragBoxZindex">
    <div class="title">
      <span>{{ title }}</span>
      <span class="right_btns">
        <CloseIcon class="close" @click="closeDialog"></CloseIcon>
      </span>
    </div>
    <div class="content">
      <div class="bar">
        <el-input
          @mousedown.native.stop="() => {}"
          placeholder="输入需要搜索的内容,点击回车确定"
          suffix-icon="el-icon-search"
          v-model="act.keyword"
          size="small"
          @keyup.enter.native="getList"
          class="my_input_type1 opinion-lib__search-input"></el-input>
        <el-button
          size="mini"
          class="opinion-lib__search-btn"
          @click="getList"
          >搜索</el-button
        >
      </div>
      <div style="height: calc(100% - 82px)">
        <opinion-list-table ref="opinionList" :list="act.list"></opinion-list-table>
      </div>
      <my-pagination v-if="act.pageInfo.total"
        :total="act.pageInfo.total" v-model:pageSize="act.pageInfo.size" v-model:currentPage="act.pageInfo.page"
        :updateData="getList"></my-pagination>
    </div>
    <div class="footer">
      <el-button
        class="btn"
        size="mini"
        type="primary"
        @click="selectOpinionHandle"
        >选入</el-button>
      <el-button
        class="btn"
        size="mini"
        @click="closeDialog"
        >关闭</el-button>
    </div>
  </div>
</template>

<script>
import { ElButton, ElInput } from 'element-plus'
import OpinionListTable from './components/OpinionListTable.vue'
import MyPagination from '../../../../myPagination/MyPagination.vue'

import { drag } from '../../../../../plugins/directives/index'
import { Close as CloseIcon } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'

import api from '../../api'
import util from '../../../../../plugins/util'

export default {
  components: {CloseIcon, ElButton, ElInput, OpinionListTable, MyPagination},
  data () {
    return {
      title: '近期意见',
      act: {
        show: false,
        list: [],
        keyword: '',
        pageInfo: {
          page: 1,
          total: 0,
          size: 10
        }
      },
    }
  },
  created () {},
  directives: {
    drag
  },
  inject: ['apiHost', 'rewriteInterfaces'],
  watch: {
    'act.show': {
      handler (val) {
        if (val) {
          this.$nextTick(() => {
            this.updateDragBoxZindex()
          })
        }
      }
    }
  },
  methods: {
    openDialog () {
      if (this.act.show) {
        return
      }
      this.act.show = true
      this.getList()
    },
    closeDialog () {
      this.act.show = false

      this.act.keyword = '',
      this.act.pageInfo = {
        page: 1,
        total: 0,
        size: 10
      }
    },
    getList () {
      let params = {
        pageNum: this.act.pageInfo.page,
        pageSize: this.act.pageInfo.size
      }
      if (this.act.keyword) {
        params.keyword = this.act.keyword
      }
      const _this = this
      if (this.rewriteInterfaces?.getRecentOpinionsFunc) {
        this.rewriteInterfaces.getRecentOpinionsFunc(params).then(res => {
          if (res.data.code === 'SUCCESS') {
            _this.act.list = res.data.detail.records || []
            _this.act.pageInfo.total = res.data.detail.total
          } else {
            ElMessage.warning(res.data.message)
          }
        }).catch(err => {
          ElMessage.error('获取数据失败!')
        })
      } else {
        api.getRecentOpinions(params, this.apiHost).then(res => {
          if (res.data.code === 'SUCCESS') {
            _this.act.list = res.data.detail.records || []
            _this.act.pageInfo.total = res.data.detail.total
          } else {
            ElMessage.warning(res.data.message)
          }
        }).catch(err => {
          ElMessage.error('获取数据失败!')
        })
      }
    },
    selectOpinionHandle () {
      let selectRowData = this.$refs.opinionList.currentRowData
      if (!selectRowData) {
        return
      }
      this.$emit('selectOpinionHandle', selectRowData)

      // 选入后关闭对话框
      this.closeDialog()
    },

    updateDragBoxZindex () {
      if (this.$refs.dragBox) {
        this.$refs.dragBox.style.zIndex = util.getMaxZIndex()
      }
    }
  }
}
</script>

<style lang="less" scoped>
@import '../../common.less';
.label{
  color: #126BFF;
  &:hover{
    cursor: pointer;
    color: #3c86fd;
  }
}

.recent_opinion_pool_box{
  display: flex;
  flex-direction: column;

  z-index: 3001;
  position: fixed;
  top: 110px;
  left: calc(50% - 450px);
  width: 900px;
  height: 480px;
  box-sizing: border-box;
  background-color: @backgroundColor;
  color: @textColor;
  box-shadow: 0 0 8px 0 rgba(0,0,0,0.3);
  border-radius: 4px;
  border: solid 1px #212223;

  .title {
    position: relative;
    box-sizing: border-box;
    height: 40px;
    line-height: 40px;
    box-shadow: 0 -1 0 0 #d7dbda;
    margin: 0px 26px;
    font-size: 16px;
    font-weight: normal;
    font-stretch: normal;

    border-bottom: 1px solid #545664;

    .right_btns{
      position: absolute;
      right: -6px;
      width: 22px;
    }

    .close {
      width: 18px;
      color: #9ba1a7;
      margin-right: 24px;
      font-family: element-icons!important;
      speak: none;
      font-style: normal;
      font-weight: 400;
      font-variant: normal;
      text-transform: none;
      vertical-align: baseline;
      display: inline-block;
      -webkit-font-smoothing: antialiased;
      &::before {
        content: "\E60F";
      }
      &:hover, &:active, &:focus {
        color: #0070d2;
      }
    }

    .wrap {
      width: 18px;
      color: #9ba1a7;
      margin-right: 24px;

      font-family: element-icons!important;
      speak: none;
      font-style: normal;
      font-weight: 400;
      font-variant: normal;
      text-transform: none;
      vertical-align: baseline;
      display: inline-block;
      -webkit-font-smoothing: antialiased;
      &::before {
        content: "\E621";
      }
      &:hover, &:active, &:focus {
        color: #0070d2;
      }
    }
  }

  .footer {
    box-sizing: border-box;
    width: 100%;
    height: 60px;
    line-height: 60px;
    padding: 14px 24px;
    .btn {
      margin-left: 12px;
      float: right;
      width: 97px;
      height: 32px;
      border-radius: 4px;
      border: solid 1px #dfe2e5;
      // color: #666;
      &:hover,&:active,&:focus {
        color: #0070d2;
        border: solid 1px #0097d2;
      }
    }
  }

  .content{
    padding: 12px 24px;
    flex-grow: 1;
    overflow-y: auto;
  }

  .bar {
    display: -webkit-flex; /* Safari */
    display: flex;
    flex-flow: row nowrap;
    box-sizing: border-box;
    padding-bottom: 6px;

    .opinion-lib__search-btn {
      width: 120px;
      margin-left: 12px;
    }
  }
}
</style>
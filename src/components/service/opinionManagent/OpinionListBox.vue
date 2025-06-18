<template>
  <!-- 意见列表框 -->
  <div class="__gda_sdk opinion_list_pane">
    <div class="pane_title">
      <div class="title_content">
        <span>{{title}}</span>
        <span v-if="opinionList.length">（{{opinionList.length}}）</span>
      </div>
      <i class="gda_sdk_iconfont icon-guanbi pane_close" @click="close"></i>
    </div>
    <div ref="paneContent" class="pane_content">
      <div v-for="opinionItem in opinionList" class="opinion_item_pane" @click="showOrEditOpinion(opinionItem, false)">
        <opinion-item :editable="editable" :value="opinionItem"
          @editBtnHandle="showOrEditOpinion"
          @removeSuccessHandle="removeItemFormList"></opinion-item>
      </div>

      <div v-if="!opinionList.length" class="comment-list--empty">
        <img src="../../../assets/emptyicon.png" />
        <div>您还没添加过意见</div>
      </div>
    </div>
    <div class="pane_footer">
      <!-- <el-button class="btnCancel" size="mini" @click.native.prevent="close">取消</el-button> -->
    </div>

    <!-- 意见详情 -->
    <opinion-detail ref="opinionDetailRef" v-if="opinionDetail.show" class="opinion_detail"
      :value="opinionDetail.currentData" :editable="opinionDetail.editable"
      @backHandle="hideOpinionDetailPane"
      @updateOpinionSuccessHandle="updateItemInList"></opinion-detail>
  </div>
</template>
<script>
import OpinionItem from './components/opinionList/ListItem.vue'
import OpinionDetail from './components/opinionList/OpinionDetail.vue'
import { ElButton, ElLoading } from 'element-plus'

import api from './api.js'
export default {
  components: { OpinionItem, ElButton, OpinionDetail },
  data () {
    return {
      title: '意见列表',
      loading: false,
      opinionList: [
        // {
        //   problemCategoryId: 1,
        //   problemCategory: '543534543',
        //   normNumber: '553445',
        //   reviewContent: '6434666445[一级钢]',
        //   crops: [{}]
        // }, {
        //   problemCategoryId: 2,
        //   problemCategory: '546564666454546556',
        //   normNumber: '6',
        //   reviewContent: '的方式发大富大贵非官方的的过分过分的[二级钢]',
        //   crops: []
        // }
      ],
      opinionDetail: {
        show: false,
        editable: false,
        currentData: null
      }
    }
  },
  provide () {
    return {
      apiHost: this.apiHost,
      affiliation: this.affiliation,
      outerChin: this.outerChin,
      opinionDetailData: () => this.opinionDetail.currentData,
      getOptView: () => this.getOptView,
      rewriteInterfaces: this.rewriteInterfaces
    }
  },
  computed: {
    opinionFormData () {
      return this.opinionDetail.currentData
    },
    getOptView () {
      let v = null
      if (this.outerChin) {
        if (this.outerChin.getMainModel && this.outerChin.getMainModel()) {
          v = this.outerChin.getMainModel()
        } else if (this.outerChin.mainModel) {
          v = this.outerChin.mainModel
        } else {
          v = this.outerChin
        }
      }
      return v
    }
  },
  props: {
    apiHost: { // 接口host
      default: '',
      type: String
    },
    editable: {
      default: false,
      type: Boolean
    },
    asscessToken: '', // 鉴权token信息
    outerChin: {
      type: Object,
    },
    affiliation: { // 所属信息
      default: () => {
        return {
          spaceId: 780730513899520, // 意见空间id
          reviewProgress: 'REVIEW', // 审查环节 REVIEW | AUDIT | FINAL
          creatorPersonId: null,
          creatorPersonName: '',
          bizType: 'FJ', // 项目类型（房建FJ，市政SZ）
          specialtyCode: null, // 专业code
          buildingInfo: null, // { buildingId: null, buildingName: ''}, // 单体信息
          targetType: '', // 审查对象 draw|model|view|option
          reviewType: 'DESIGN_QUALITY', // 设计质量审查 DESIGN_QUALITY，相符性审查MODEL_QUALITY，应用选项审查OPTION_QUALITY
          optionInfo: null, // 应用选项文件信息
          // {
          //   fileName:  '', //应用选项文件名 ,
          //   optionBizId: null, //应用选项唯一标识id ,
          //   optionName: '', //选项名称 ,
          //   optionType: '', //选项分类 ,
          // },

          models: [
            // {
            //   modelBizId: null,
            //   modelName: "",
            //   viewBizId: "",
            //   viewName: "",
            //   viewType: ""
            // },
          ], // 模型列表
          drawings: [
            // {
            //   drawingBizId: null,
            //   drawingName: "",
            //   drawingNumber: "",
            // },
          ], // 图纸列表
          currentFileInfo: {// 当前展开的模型/图纸/视图信息
            baseFileBizId: null,
            modelBizId: null,
            modelName: '',
            drawingBizId: null,
            drawingName: '',
            drawingNumber: '',
            viewBizId: null,
            viewName: ''
          }
        }
      },
      type: Object
    },
    closeHandle: {
      type: Function,
      default: null
    },
    opinionSaveCallBackHandle: {
      type: Function,
      default: null
    },
    rewriteInterfaces: {
      type: Object,
      default: null
    }
  },
  created () {
    this.getList()
  },
  watch: {
    loading: {
      handler (val) {
        if (val) {
          this.loadingInstance = ElLoading.service({
            target: '.pane_content',
            background: '#282a34',
            text: '加载中...'
          })
        } else {
          if (this.loadingInstance) {
            this.loadingInstance.close()
            this.loadingInstance = null
          }
        }
      }
    },
  },
  methods: {
    getList () {
      if (this.rewriteInterfaces?.getOpinionListFunc) {
        const _this = this
        this.loading = true
        this.rewriteInterfaces.getOpinionListFunc().then(res => {
          if (res.data.code === 'SUCCESS') {
            let detail = res.data.detail
            _this.opinionList = detail || []
          }
        }).finally(() => {
          _this.loading = false
        })
      } else {
        if (!this.affiliation || !this.affiliation.spaceId || !this.affiliation.currentFileInfo) {
          return
        }
        let params = {
          spaceId: this.affiliation.spaceId,
          bizId: this.affiliation.currentFileInfo.baseFileBizId,
          targetType: this.affiliation.targetType,
          reviewType: this.affiliation.reviewType
        }
        if (this.affiliation.reviewProgress === 'REVIEW') {
          params.reviewProgress = 'REVIEW'
          params.reviewPersonId = this.affiliation.creatorPersonId
        }
        if (this.affiliation.reviewProgress === 'AUDIT') {
          params.reviewProgress = 'REVIEW,AUDIT'
          params.authorizedPersonId = this.affiliation.creatorPersonId
        }
        this.loading = true
        api.getOpinionList(params, this.apiHost).then(res => {
          if (res.data.code === 'SUCCESS') {
            let detail = res.data.detail
            this.opinionList = detail || []
          }
        }).finally(() => {
          this.loading = false
        })
      }
    },
    close () {

      this.closeHandle && this.closeHandle()
    },

    removeItemFormList (opinionItem) {
      let index = this.opinionList.findIndex(op => {
        return op.id == opinionItem.id
      })
      if (index != -1) {
        this.opinionList.splice(index, 1)
      }
    },

    updateItemInList(opinionItem) {
      let index = this.opinionList.findIndex(op => {
        return op.id == opinionItem.id
      })
      if (index != -1) {
        this.opinionList.splice(index, 1, opinionItem)
      }
    },

    showOrEditOpinion (data, editable = true) {
      this.opinionDetail.editable = editable
      this.opinionDetail.currentData = data

      this.showOpinionDetailPane()
    },
    hideOpinionDetailPane () {
      this.opinionDetail.show = false
    },
    showOpinionDetailPane () {
      this.opinionDetail.show = true
    },

    showSplitFoldTrigger () {
      let splitFoldTriggerDom = document.getElementsByClassName('split_fold_trigger')
      if (splitFoldTriggerDom[0]) {
        splitFoldTriggerDom[0].style.visibility = 'visible'
        this.hasHidesplitFoldTrigger = false
      }
    }
  },
  beforeUnmount () {
    this.showSplitFoldTrigger()
  },
}
</script>

<style lang="less" scoped>
@import './common.less';

.opinion_list_pane{
  display: flex;
  flex-direction: column;
  color: @textColor;
  background: #282a34;
  height: 100%;
  min-width: 450px;
  width: 100%;
  position: relative;

  font-size: @font-size;
  .pane_title{
    width: calc(100% - 48px);
    padding-top: 14px;
    padding-bottom: 14px;
    margin: 0 auto;
    font-weight: 500;
    font-size: 14px;
    color: #f2f2f8;
    display: -ms-flexbox;
    display: flex;
    border-bottom: 1px solid #545664;
    .title_content{
      flex-grow: 1;
    }
    .pane_close {
      &:hover {
        cursor: pointer;
        color: @blue
      }
    }
  }

  .pane_content{
    flex-grow: 1;
    overflow-y: auto;

    .opinion_item_pane{
      padding: 12px 0px;
      margin: 0px 24px;

      border-bottom: 1px solid #545664;
      &:hover{
        cursor: pointer;
        // border-bottom: 1px solid #126BFF;
      }
    }

    .comment-list--empty {
      padding-top: 152px;
      font-size: 0px;
      text-align: center;

      div {
        text-align: center;
        .font-normal();
        color: #d1d1d1;
      }

      img {
        width: 120px;
        height: 120px;
      }
    }
  }

  .pane_footer{
    padding: 12px 24px;
    display: flex;
    flex-direction: row-reverse;
  }

  .opinion_detail {
    position: absolute;
    width: 100%;
    height: 100%;
    background: inherit;
  }
}
</style>
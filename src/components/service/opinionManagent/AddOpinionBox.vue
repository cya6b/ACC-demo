<template>
  <!-- 添加意见框 -->
  <div class="__gda_sdk opinion_add_pane">
    <div class="pane_title">
      <span class="title_content">
        <template v-if="withBackIcon">
          <i class="gda_sdk_iconfont icon-fanhui" @click="back"></i>
          <span class="split_c">|</span>
        </template>
        {{title}}
      </span>
      <i class="gda_sdk_iconfont icon-guanbi pane_close" @click="close"></i>
    </div>
    <div class="pane_content">
      <opinion-form ref="opinionForm"></opinion-form>
    </div>
    <div class="pane_footer">
      <el-button ref="confirmBtn" v-loading="confirmLoading" class="btnSave" size="mini" type="primary"
        @click.native.prevent="addOpinion">{{ confirmText }}</el-button>
      <el-button class="btnCancel" size="mini" @click.native.prevent="close">取消</el-button>
    </div>
  </div>
</template>

<script>
import OpinionForm from "./components/opinionForm/index.vue"
import {ElButton} from 'element-plus'
import { ElMessage, ElMessageBox, ElLoading } from 'element-plus'

import api from './api'
export default {
  components: { OpinionForm, ElButton },
  data () {
    return {
      confirmLoading: false
    }
  },
  provide () {
    return {
      apiHost: this.apiHost,
      affiliation: this.affiliation,
      outerChin: this.outerChin,
      getOptView: () => this.getOptView,
      rewriteInterfaces: this.rewriteInterfaces
    }
  },
  props: {
    title: {
      type: String,
      default: '添加意见'
    },
    confirmText: {
      type: String,
      default: '保存'
    },
    withBackIcon: {
      type: Boolean,
      default: false
    },
    apiHost: { // 接口host
      default: '',
      type: String
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
    backHandle: {
      type: Function,
      default: null
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
  watch: {
    confirmLoading: {
      handler (val) {
        if (val) {
          let target = this.$refs?.confirmBtn?.ref
          if (target) {
            this.confirmBtnLoading = ElLoading.service({
              lock: true,
              target,
              customClass: '__primary_btn_loading'
            })
          }
        } else {
          if (this.confirmBtnLoading) {
            this.confirmBtnLoading.close()
          }
        }
      }
    }
  },
  computed: {
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
  methods: {
    back () {
      this.backHandle && this.backHandle()
    },
    close () {

      this.closeHandle && this.closeHandle()
    },
    addOpinion () {
      const _this = this
      // 表单校验
      this.$refs.opinionForm.validForm(valid => {
        if (valid) {
          // 保存提交
          _this.opinionSubmit()
        } else {
          // ElMessage.warning('请检查表单必填项!')
        }
      })
    },
    opinionSubmit () {
      if (this.confirmLoading) {
        return
      }
      const _this = this
      let opinion = this.formatOpinionDtoData()
      if (this.rewriteInterfaces?.opinionAddFunc) {
        this.confirmLoading = true
        this.rewriteInterfaces.opinionAddFunc(opinion).then(res => {
          if (res.data.code === 'SUCCESS') {
            // ElMessage.success('保存成功!')

            // 保存成功后清空数据并关闭
            _this.close()

            _this.opinionSaveCallBackHandle && _this.opinionSaveCallBackHandle(opinion)
          } else {
            ElMessage.warning(res.data.message)
          }
        }).finally(() => {
          this.confirmLoading = false
        })
      } else {
        this.confirmLoading = true
        api.opinionAdd(opinion, this.apiHost).then(res => {
          if (res.data.code === 'SUCCESS') {
            ElMessage.success('保存成功!')

            // 保存成功后清空数据并关闭
            _this.close()

            _this.opinionSaveCallBackHandle && _this.opinionSaveCallBackHandle(opinion)
          } else {
            ElMessage.warning(res.data.message)
          }
        }).finally(() => {
          this.confirmLoading = false
        })
      }
    },
    formatOpinionDtoData () {
      let ret = {}
      let f = this.$refs.opinionForm.getFormData()
      // 人员信息赋值
      if (this.affiliation.reviewProgress === 'REVIEW') {
        ret.reviewPersonId = this.affiliation.creatorPersonId
        ret.reviewPersonName = this.affiliation.creatorPersonName
      }
      if (this.affiliation.reviewProgress === 'AUDIT') {
        ret.reviewPersonId = this.affiliation.creatorPersonId
        ret.reviewPersonName = this.affiliation.creatorPersonName
        ret.authorizedPersonId = this.affiliation.creatorPersonId
        ret.authorizedPersonName = this.affiliation.creatorPersonName
      }
      if (this.affiliation.reviewProgress === 'FINAL') {
        ret.reviewPersonId = this.affiliation.creatorPersonId
        ret.reviewPersonName = this.affiliation.creatorPersonName
        ret.authorizedPersonId = this.affiliation.creatorPersonId
        ret.authorizedPersonName = this.affiliation.creatorPersonName
        ret.aggregatorId = this.affiliation.creatorPersonId
        ret.aggregatorName = this.affiliation.creatorPersonName
      }

      // 单体信息
      if (this.affiliation.buildingInfo) {
        ret.buildings = [this.affiliation.buildingInfo]
      }

      // 截图信息
      ret.crops = f.screenShots

      // 表单数据信息
      ret.commonProblem = false
      ret.needReview = f.formData.needReview
      ret.normNumber = f.formData.normNumber
      ret.problemCategory = f.formData.problemCategory
      ret.problemCategoryId = f.formData.problemCategoryId
      ret.reviewContent = f.formData.reviewContent
      if (this.affiliation.reviewType === 'DESIGN_QUALITY') {
        if (this.affiliation.targetType === 'draw') {
          ret.drawings = f.formData.drawings
        }
        if (this.affiliation.targetType === 'model') {
          ret.modelViews = f.formData.modelViews
        }
      }
      if (this.affiliation.reviewType === 'MODEL_QUALITY') {
        ret.drawings = f.formData?.drawings || []
        ret.modelViews = [{
          modelBizId: f.formData.modelId,
          modelName: f.formData.modelName,
          viewBizId: f.formData.sheetId,
          viewName: f.formData.sheetName,
        }]
      }
      // 应用选项信息
      if (this.affiliation.reviewType === 'OPTION_QUALITY') {
        ret.options = []
        if (this.affiliation.optionInfo) {
          ret.options = [this.affiliation.optionInfo]
        }
      }

      ret.reviewType = this.affiliation.reviewType
      ret.targetType = this.affiliation.targetType

      ret.spaceId = this.affiliation.spaceId
      ret.reviewProgress = this.affiliation.reviewProgress

      return ret
    },

    addScreenShot (shotData) {
      this.$refs.opinionForm && this.$refs.opinionForm.addScreenShot && this.$refs.opinionForm.addScreenShot(shotData)
    },

    showSplitFoldTrigger () {
      let splitFoldTriggerDom = document.getElementsByClassName('split_fold_trigger')
      if (splitFoldTriggerDom && splitFoldTriggerDom[0]) {
        splitFoldTriggerDom[0].style.visibility = 'visible'
        this.hasHidesplitFoldTrigger = false
      }
    },

    setOpinionData (data) {
      if (!data) {
        return
      }
      this.$refs.opinionForm.setOpinionData(data)
    }
  },
  beforeUnmount () {
    this.showSplitFoldTrigger()

    if (this.confirmBtnLoading) {
      this.confirmBtnLoading.close()
    }
  },
}
</script>

<style lang="less" scoped>
@import './common.less';
.opinion_add_pane{
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
  }

  .pane_footer{
    padding: 12px 24px 16px 24px;
    display: flex;
  }
}

.split_c{
  padding: 0px 8px;
  line-height: 24px;
  font-size: 16px;
  color: #77787e;
}
</style>
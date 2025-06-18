<template>
  <div class="opinion_comment">
    <div v-if="showNormCategory" class="opinion_norm_and_category opinion_comment_item">
      <span>{{opinionData.problemCategory}}</span>
      <span class="split_c">|</span>
      <span>{{ opinionData.normNumber }}</span>
    </div>
    <!-- 展示本轮次的意见和截图 -->
    <template v-if="opinionData.reviewContent">
      <div class="opinion_text opinion_comment_item" v-html="opinionFormat(opinionData.reviewContent)"></div>
      <div class="screen_shot_list opinion_comment_item">
        <div class="screen_shot_item" v-for="imgItem in opinionData.crops">
          <img :src="imgItem.imgUrl" alt="截图" class="annotation_img"/>
        </div>
      </div>
    </template>
    <!-- 上轮次带过来的意见，且还没编辑，没有本轮意见和截图，则展示上轮意见和截图 -->
    <template v-else>
      <div class="opinion_text opinion_comment_item" v-html="opinionFormat(opinionData.historyOpinions)"></div>
      <div class="screen_shot_list opinion_comment_item">
        <div class="screen_shot_item" v-for="imgItem in opinionData.historyCrops">
          <img :src="imgItem.imgUrl" alt="截图" class="annotation_img"/>
        </div>
      </div>
    </template>
    <div class="footer opinion_comment_item">
      <span class="creator_info">
        <i class="gda_sdk_iconfont icon-yonghushenchazhuanjia"></i>
        {{ creator(opinionData) }}
      </span>
      <span v-if="editable" class="opt_btns">
        <span class="item" @click.stop="edit">
          <i class="gda_sdk_iconfont icon-bianjibianji"></i><span>编辑</span>
        </span>
        <span class="del_btn item" @click.stop="del">
          <i class="gda_sdk_iconfont icon-shanchushanchu"></i><span>删除</span>
        </span>
      </span>
    </div>
  </div>
</template>

<script>
import util from '../../../../../plugins/util.js'
import api from '../../api'

import { ElMessage, ElMessageBox } from 'element-plus'
export default {
  data () {
    return {
      opinionData: {
        problemCategory: '',
        normNumber: '',
        reviewContent: '',
        crops: []
      }
    }
  },
  inject: ["apiHost", "affiliation", 'rewriteInterfaces'],
  props: {
    value: {
      type: Object,
      default: () => {return {}}
    },
    editable: {
      type: Boolean,
      default: true
    }
  },
  computed: {
    showNormCategory () {
      return true
    },
    creator () {
      return data => {
        return data.authorizedPersonName || data.reviewPersonName || data.aggregatorName || '审查人名称'
      }
    },
    delBtnDisabled () {
      if (this.affiliation.reviewProgress === 'FINAL') {
        return false
      }
      return this.opinionData.reviewProgress !== this.affiliation.reviewProgress
    }
  },
  watch: {
    value: {
      handler (val) {
        if (val) {
          this.opinionData = val
        }
      },
      immediate: true
    }
  },
  methods: {
    opinionFormat (str) {
      return util.specialSymbolTrans.getHtml(str)
    },
    edit () {
      this.$emit('editBtnHandle', this.opinionData)
    },
    del () {
      if (this.delBtnDisabled) {
        ElMessage.warning('该条为非当前审查环节的意见，不允许删除！')
        return
      }
      
      ElMessageBox.confirm('是否删除此条意见及相关标注？', '提示', {
        confirmButtonText: '删除',
        cancelButtonText: '取消',
        type: 'warning',
        customClass: 'theme-dark',
        callback: (action) => {
          if (action === 'confirm') {
            this.removeFuc()
          }
        },
      })
    },

    removeFuc () {
      const _this = this
      let params = {
        ids: this.opinionData.id
      }
      if (this.rewriteInterfaces?.deleteOpinionFunc) {
        this.rewriteInterfaces.deleteOpinionFunc(params).then(res => {
          if (res.data.code === 'SUCCESS') {
            ElMessage.success('删除成功!')
            _this.$emit("removeSuccessHandle", _this.opinionData)
          }
        }).catch(err => {
          console.error(err)
          ElMessage.error('删除失败!')
        })
      } else {
        api.deleteOpinion(params, this.apiHost).then(res => {
          if (res.data.code === 'SUCCESS') {
            ElMessage.success('删除成功!')
            _this.$emit("removeSuccessHandle", this.opinionData)
          }
        }).catch(err => {
          console.error(err)
          ElMessage.error('删除失败!')
        })
      }
    }
  }
}
</script>

<style lang="less" scoped>
.opinion_comment{
  .opinion_comment_item{
    margin-top: 4px;
  }
  .opinion_norm_and_category{
    .split_c{
      margin: 0px 8px;
    }
  }
  .footer{
    .opt_btns{
      float: right;

      .item{
        margin-left: 12px;
        cursor: pointer;
        color: #126BFF;
        &:hover{
          color: #3c86fd;
        }
      }

      .del_btn[disabled=true] {
        color: #989899;
        cursor: not-allowed;
      }
    }
  }

  .screen_shot_list{
    display: flex;
    flex-wrap: wrap;

    .screen_shot_item {
      border: 1px solid #40424c;
      border-radius: 2px;
      width: 48px;
      height: 48px;
      position: relative;
      margin-bottom: 8px;
      margin-right: 8px;

      .annotation_img{
        width: 100%;
        height: 100%;
      }
    }
  }
}

@MessageBoxThemeDarkBtnFontColor: hsl(240, 30%, 96%);
@MessageBoxThemeDarkBtnColorDefault: hsl(232, 9%, 36%);
@MessageBoxThemeDarkBtnColorPrimary: hsl(217, 100%, 54%);
@MessageBoxThemeDarkBackgroundColor: hsl(230, 9%, 27%);
:deep(.el-message-box.theme-dark) {
  background: #40424c;
  padding-bottom: 16px;
  border-radius: 4px;
  min-width: 500px;
  border: 1px solid #40424c;
  .el-message-box__header {
    .el-message-box__title {
      color: @MessageBoxThemeDarkBtnFontColor;
    }
    .el-message-box__headerbtn .el-message-box__close {
      color: @MessageBoxThemeDarkBtnFontColor;
      &:hover {
        color: fade(@MessageBoxThemeDarkBtnFontColor, 80%)
      }
    }
  }
  .el-message-box__content {
    color: @MessageBoxThemeDarkBtnFontColor;
    margin-top: 6px;
  }
  .el-message-box__btns {
    padding: 16px 15px 0;
    .el-button.el-button--default.el-button--primary {
      color: @MessageBoxThemeDarkBtnFontColor;
      background-color: @MessageBoxThemeDarkBtnColorPrimary;
      border-color: @MessageBoxThemeDarkBtnColorPrimary;
      &:hover {
        color: fade(@MessageBoxThemeDarkBtnFontColor, 80%);
        background-color: fade(@MessageBoxThemeDarkBtnColorPrimary, 80%);
        border-color: fade(@MessageBoxThemeDarkBtnColorPrimary, 80%);
      }
    }
    .el-button.el-button--default {
      color: @MessageBoxThemeDarkBtnFontColor;
      background: @MessageBoxThemeDarkBtnColorDefault;
      border-color: @MessageBoxThemeDarkBtnColorDefault;
      &:hover {
        color: fade(@MessageBoxThemeDarkBtnFontColor, 80%);
        background: fade(@MessageBoxThemeDarkBtnColorDefault, 80%);
        border-color: fade(@MessageBoxThemeDarkBtnColorDefault, 80%);
      }
    }
  }
}
</style>
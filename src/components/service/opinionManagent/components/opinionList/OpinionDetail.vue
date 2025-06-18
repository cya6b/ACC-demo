<template>
  <div class="opinion_detail_pane">
    <span class="pane_title" @click="back">
      <i class="gda_sdk_iconfont icon-fanhui"></i>
      <span class="split_c">|</span>
      <span class="span_txt">{{ title }}</span>
    </span>
    <div class="pane_content">
      <opinion-form ref="opinionForm" :editable="editable"></opinion-form>

      <!-- 审定批注 -->
      <div v-if="showAuditRemark" class="audit_remark">
        <span>审定批注</span>
        <div class="input_content">
          <el-input v-model="formData.remarkContent" type="textarea" :disabled="!editable"></el-input>
        </div>
      </div>
    </div>
    <div v-if="editable" class="pane_footer">
      <el-button class="btnSave" size="mini" type="primary" @click.native.prevent="saveOpinion">保存</el-button>
      <el-button class="btnCancel" size="mini" @click.native.prevent="cancel">取消</el-button>
    </div>
  </div>
</template>

<script>
/* Copyright (C) <1998-2024> Glodon Company Limited
 * Licensed under the MIT License
 * Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the “Software”), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
 * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
 * THE SOFTWARE IS PROVIDED “AS IS”, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */
import OpinionForm from '../opinionForm/index.vue'
import { ElInput, ElButton, ElMessage } from 'element-plus'

import api from '../../api.js'
export default {
  components: { OpinionForm, ElButton, ElInput },
  data () {
    return {
      formData: {
        remarkContent: ''
      }
    }
  },
  props: {
    editable: {
      type: Boolean,
      default: true
    },
    value: {
      type: Object,
      default: () => {}
    }
  },
  inject: ["affiliation", "opinionDetailData", 'rewriteInterfaces'],
  provide () {
    return {
      opinionInitialValue: () => this.formData
    }
  },
  computed: {
    title () {
      if (this.editable) {
        return '编辑意见'
      }
      return '意见详情'
    },

    showAuditRemark () {
      return this.affiliation.reviewProgress !== 'REVIEW' && (
        this.formData.remarkContent || (this.formData.reviewProgress == 'REVIEW' && this.affiliation.reviewProgress == 'AUDIT')
      )
    }
  },
  created () {
    this.initData()
  },
  methods: {
    initData () {
      if (this.opinionDetailData && typeof this.opinionDetailData === 'function') {
        this.formData = JSON.parse(JSON.stringify(this.opinionDetailData()))
      }
    },
    back () {
      this.$emit('backHandle')
    },
    saveOpinion () {
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
      const _this = this
      let opinion = this.formatOpinionDtoData()
      if (this.rewriteInterfaces?.opinionUpdateFunc) {
        this.rewriteInterfaces?.opinionUpdateFunc(opinion).then(res => {
          if (res.data.code === 'SUCCESS') {
            ElMessage.success('保存成功!')

            // 保存成功后清空数据并关闭
            _this.back()

            _this.$emit('updateOpinionSuccessHandle', opinion)
          } else {
            ElMessage.warning(res.data.message)
          }
        })
      } else {
        api.opinionUpdate(opinion, this.apiHost).then(res => {
          if (res.data.code === 'SUCCESS') {
            ElMessage.success('保存成功!')

            // 保存成功后清空数据并关闭
            _this.back()

            _this.$emit('updateOpinionSuccessHandle', opinion)
          } else {
            ElMessage.warning(res.data.message)
          }
        })
      }
    },

    formatOpinionDtoData () {
      let ret = this.formData
      let f = this.$refs.opinionForm.getFormData()

      // 单体信息
      if (this.affiliation.buildingInfo) {
        ret.buildings = [this.affiliation.buildingInfo]
      }

      // 截图信息更新
      ret.crops = f.screenShots

      // 表单数据信息更新
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

      if (this.affiliation.reviewProgress === 'AUDIT') {
        ret.authorizedPersonId = this.affiliation.creatorPersonId
        ret.authorizedPersonName = this.affiliation.creatorPersonName
      }
      if (this.affiliation.reviewProgress === 'FINAL') {
        ret.aggregatorId = this.affiliation.creatorPersonId
        ret.aggregatorName = this.affiliation.creatorPersonName
      }

      return ret
    },

    cancel () {
      this.back()
    }
  }
}
</script>

<style lang="less" scoped>
.opinion_detail_pane{
  margin: 0px auto 0;
  font-size: 14px;
  color: #f2f2f8;
  position: relative;
  display: flex;
  flex-direction: column;
  height: 100%;
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
    margin-bottom: 12px;
    &:hover {
      cursor: pointer;
      // color: #126bff;
    }

    .split_c {
      padding: 0px 8px;
      line-height: 24px;
      font-size: 12px;
      color: #77787e;
    }

    .span_txt{
      line-height: 24px;
    }
  }
  .pane_content{
    max-height: calc(100% - 67px);
    overflow-y: auto;
    flex-grow: 1;

    .audit_remark{
      padding: 12px 24px;

      .input_content{
        margin-top: 8px;

        :deep(.el-textarea){
          .el-textarea__inner{
            background: #101010;

            box-shadow: 0 0 0 1px #3e3e43 inset;
            border-color: #373841;
            color: #f2f2f8;
          }
        }
      }
    }
  }
  .pane_footer{
    padding: 12px 24px;
  }
}
</style>
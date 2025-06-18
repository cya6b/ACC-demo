<template>
  <!-- 三维模型添加意见表单 -->
  <el-form ref= "form" :rules="rules" :model="form" label-position="top">
    <el-form-item label="模型名称">
      <el-select class="my_select_type1" clearable v-model="form.modelViews" multiple :disabled="!editable"
        value-key="modelBizId" :teleported="false" popper="dark" placeholder="请选择模型">
        <el-option v-for="d in drawingList" :key="d.modelBizId" :label="d.modelName" :value="d"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item prop="problemCategoryId" label="问题类别">
      <el-select class="my_select_type1" clearable v-model="form.problemCategoryId" :disabled="!editable"
        :teleported="false" popper="dark" placeholder="请选择问题类别" @change="handleCatergotyChange">
        <el-option v-for="item in problemCategoryList" :key="item.id" :label="item.name" :value="item.id"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="规范及条文号">
      <el-autocomplete class="my_input_type1" placeholder="请输入规范及条文号" :disabled="!editable"
        popper-class="add_opinion_box_auto_complete_popper"
        v-model="form.normNumber"
        :fetch-suggestions="fetchNormNumber"
        clearable></el-autocomplete>
    </el-form-item>
    <template v-if="showHistoryContextInfo">
      <history-opinion-context-info :historyOpinions="form.historyOpinions" :replyContent="form.replyContent"></history-opinion-context-info>
    </template>
    <el-form-item prop="reviewContent" label="审查意见">
      <opinion-context-input class="opinion_context" :value="form.reviewContent"  :editable="editable"
        @updateFormData="updateFormData"></opinion-context-input>
    </el-form-item>
  </el-form>
</template>

<script>
import OpinionContextInput from './OpinionContextInput.vue';
import HistoryOpinionContextInfo from './HistoryOpinionContextInfo.vue';
import { ElForm, ElFormItem, ElAutocomplete, ElSelect, ElOption } from 'element-plus'

import api from '../../../api'
export default {
  components: { OpinionContextInput, ElForm, ElFormItem, ElAutocomplete, ElSelect, ElOption, HistoryOpinionContextInfo },
  data () {
    return {
      form: {
        modelViews: [ // 关联模型
          // {
          //   modelBizId: null,
          //   modelName: '',
          // }
        ],
        problemCategoryId: null, // 问题类别
        problemCategory: '',
        normNumber: '', // 规范及条文号
        opinion: '',
        needReview: false
      },

      rules: {
        problemCategoryId: [
          {
            required: true,
            message: '请选择问题类别',
            trigger: ['blur', 'change']
          }
        ],
        reviewContent: [
          {
            required: true,
            message: '请输入审查意见',
            trigger: ['blur', 'change']
          }
        ]
      }
    }
  },
  props: {
    editable: {
      type: Boolean,
      default: true
    },
    problemCategoryList: {
      type: Array,
      default: () => []
    }
  },
  inject: ['apiHost', 'affiliation', 'opinionInitialValue', 'rewriteInterfaces'],
  computed: {
    drawingList () {
      return this.affiliation.models
    },
    showHistoryContextInfo () {
      return this.form.historyOpinions
    }
  },
  created () {
    this.initForm(this.affiliation)
  },
  methods: {
    setDataByKey (key, value) {
      this.form[key] = value
    },
    initForm (data) {
      if (typeof this.opinionInitialValue === 'function' && this.opinionInitialValue()) {
        this.form = this.opinionInitialValue()
        if (!this.form?.modelViews) {
          this.form.modelViews = this.form.docs.map(d => {
            return {
              modelBizId: d.docId,
              modelName: '',
            }
          })
        }
      } else {
        if (!data.currentFileInfo) {
          return
        }
        if (data.currentFileInfo.modelBizId) {
          this.form.modelViews = [{
            modelBizId: data.currentFileInfo.modelBizId,
            modelName: data.currentFileInfo.modelName
          }]
        }
      }
    },
    getFormData () {
      return this.form
    },
    fetchNormNumber (keyword, cb) { // 远程匹配查询规范及条文号
      if (!keyword) {
        cb([])
        return
      }
      let params = {
        keyword: keyword
      }
      if (this.form.problemCategoryId) {
        params.problemCategoryId =  this.form.problemCategoryId
      }

      if (this.rewriteInterfaces?.fetchNormNumberFunc) {
        this.rewriteInterfaces.fetchNormNumberFunc(params).then(res => {
          if (res.data && res.data.detail && Array.isArray(res.data.detail)) {
            const result = res.data.detail.map(item => {
              return {value: item}
            })
            cb(result)
          } else {
            cb([])
          }
        })
      } else {
        api.fetchNormNumber(params, this.apiHost).then(res => {
          if (res.data && res.data.detail && Array.isArray(res.data.detail)) {
            const result = res.data.detail.map(item => {
              return {value: item}
            })
            cb(result)
          } else {
            cb([])
          }
        })
      }
    },

    handleCatergotyChange (val) {
      let ret = null
      let target = this.problemCategoryList.find(item => item.id === val)
      if (target) {
        ret = target.name
      }
      this.form.problemCategory = ret
      this.form.needReview = ret.issueType === 'QZTW'
    },

    validForm (cb) {
      this.$refs.form.validate(cb)
    },

    updateFormData (v) {
      for (let i in v) {
        this.form[i] = v[i]
      }
    }
  },
}
</script>

<style lang="less" scoped>
@import "../../../common.less";

.opinion_context{
  width: 100%;
  position: relative;
}
</style>
<style lang="less">
@import "../../../common.less";
.add_opinion_box_auto_complete_popper.el-autocomplete__popper.el-popper {
  background: @backgroundColor;
  border: 1px solid @borderColor;
  .el-autocomplete-suggestion li{
    color: @textColor;
  }
  .el-autocomplete-suggestion li:hover{
    background-color: rgba(18, 107, 255, 0.1);
  }

  .el-popper__arrow::before{
    border: 1px solid @borderColor;
    background: unset !important;
  }

  .el-autocomplete-suggestion__wrap{
    background: @backgroundColor !important;
    border: none !important;
  }
}
</style>
<template>
  <!-- 相符性添加意见表单(在视图上添加) -->
  <el-form ref="form" :model="form" label-position="top" :rules="rules">
    <el-form-item prop="modelName" label="模型名称">
      <el-input class="my_input_type1" v-model="form.modelName" disabled></el-input>
    </el-form-item>
    <el-form-item label="模型视图">
      <el-input class="my_input_type1" v-model="form.sheetName" disabled></el-input>
    </el-form-item>
    <el-form-item prop="drawings" label="关联的图纸的图号">
      <el-select class="my_select_type1" clearable v-model="form.drawings" multiple :disabled="!editable"
        value-key="drawingBizId" :teleported="false" popper="dark" placeholder="请选择图纸">
        <el-option v-for="d in drawingList" :key="d.drawingBizId" :label="d.drawingNumber" :value="d"></el-option>
      </el-select>
    </el-form-item>
    <template v-if="showHistoryContextInfo">
      <history-opinion-context-info :historyOpinions="form.historyOpinions" :replyContent="form.replyContent"></history-opinion-context-info>
    </template>
    <el-form-item prop="reviewContent" label="审查意见">
      <opinion-context-input class="opinion_context" :value="form.reviewContent" :editable="editable"
        @updateFormData="updateFormData"></opinion-context-input>
    </el-form-item>
  </el-form>
</template>

<script>
import OpinionContextInput from './OpinionContextInput.vue';
import HistoryOpinionContextInfo from './HistoryOpinionContextInfo.vue';
import { ElForm, ElFormItem, ElAutocomplete, ElInput, ElSelect, ElOption } from 'element-plus'

import api from '../../../api'
export default {
  components: { OpinionContextInput, ElForm, ElFormItem, ElAutocomplete, ElInput, ElSelect, ElOption, HistoryOpinionContextInfo },
  data () {
    return {
      problemCategoryList: [], // 问题类别列表
      form: {
        modelId: null,
        modelName: '',
        sheetId: null,
        sheetName: '',
        drawings: [ // 关联图纸的图号
          // {
          //   drawingId: null,
          //   drawingName: '',
          //   drawingNumber: '', // 图号
          // }
        ],
        problemCategoryId: null, // 问题类别
        problemCategory: '',
        normNumber: '', // 规范及条文号
        reviewContent: '',
      },

      rules: {
        modelName: [
          {
            required: true,
            message: '模型名称不能为空',
            trigger: ['blur', 'change']
          }
        ],
        reviewContent: [
          {
            required: true,
            message: '请输入审查意见',
            trigger: ['blur', 'change']
          }
        ],
        drawings: [
          {
            validator: (rule, value, callback) => {
              if (!value || !value.length) {
                callback('请选择图纸图号!')
              } else {
                callback()
              }
            },
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
    }
  },
  inject: ['apiHost', 'affiliation', 'opinionInitialValue'],
  computed: {
    drawingList () {
      return this.affiliation.drawings
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
      } else {
        if (!data.currentFileInfo) {
          return
        }
        if (data.currentFileInfo.modelBizId) {
          this.form.modelId = data.currentFileInfo.modelBizId
          this.form.modelName = data.currentFileInfo.modelName
        }
        if (data.currentFileInfo.viewBizId) {
          this.form.sheetId = data.currentFileInfo.viewBizId
          this.form.sheetName = data.currentFileInfo.viewName
        }
        if (data.currentFileInfo.drawingBizId) {
          this.form.drawings = [{
            drawingBizId: data.currentFileInfo.drawingBizId,
            drawingName: data.currentFileInfo.drawingName,
            drawingNumber: data.currentFileInfo.drawingNumber,
          }]
        }
      }
    },
    getFormData () {
      return this.form
    },

    validForm (cb) {
      this.$refs.form.validate(cb)
    },

    updateFormData (v) {
      for (let i in v) {
        this.form[i] = v[i]
      }
    }
  }
}
</script>

<style lang="less" scoped>
@import "../../../common.less";

.opinion_context{
  width: 100%;
  position: relative;
}
</style>
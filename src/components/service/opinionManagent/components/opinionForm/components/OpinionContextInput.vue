<template>
  <!-- 审查意见输入 -->
  <div class="opinion_context_input_wrap">
    <div v-if="editable" class="input_support">
      <recent-opinion-pool @selectOpinionHandle="opinionSelected"></recent-opinion-pool>
      <span class="split_line">|</span>
      <common-opinion-pool @selectOpinionHandle="opinionSelected"></common-opinion-pool>
      <span class="split_line">|</span>
      <special-symbol-pool @selectSymbolHandle="symbolSelected"></special-symbol-pool>
    </div>
    <el-input :disabled="!editable"
      class="my_input_type1"
      type="textarea"
      placeholder="请输入内容"
      v-model="context"
      resize="none"
      style="overflow: hidden;"
      :autosize="{ minRows: 3 }"
      :maxlength="500"
      show-word-limit
      @blur="blurEvent"
    ></el-input>
  </div>
</template>

<script>
import {ElInput} from 'element-plus'

import SpecialSymbolPool from '../../specialSymbol/SpecialSymbolPool.vue'
import CommonOpinionPool from '../../opinionPool/CommonOpinionPool.vue'
import RecentOpinionPool from '../../opinionPool/RecentOpinionPool.vue'

import util from '../../../../../../plugins/util'
export default {
  components: { ElInput, SpecialSymbolPool, CommonOpinionPool, RecentOpinionPool },
  props: {
    editable: {
      type: Boolean,
      default: true
    },
    value: {
      type: String,
      default: ''
    },
  },
  data () {
    return {
      context: "",
      specialSymbolBoxVisible: false,
      commonOpinionPoolBoxVisible: false,
      recentOpinionPoolBoxVisible: false
    }
  },
  methods: {
    // 获取光标所在位置的index
    blurEvent(e) {
      this.blurIndex = e.srcElement.selectionStart;
    },

    symbolSelected (v) {
      let tval = util.specialSymbolTrans.getText(v)
      // 插入
      if (this.blurIndex) {
        this.context = util.strInsert(this.blurIndex, this.context, tval)

        // 光标位置后移
        this.blurIndex += tval.length
      } else {
        // 追加
        this.context += tval
      }
    },
    opinionSelected (v) {
      if (v) {
        let opinion = util.specialSymbolTrans.getText(v.opinionContent || v.opinion || '')
        let normNumber = v.normNumber
        let problemCategory = v.problemCategory
        let problemCategoryId = v.problemCategoryId

        this.$emit('updateFormData', {
          reviewContent: opinion,
          normNumber,
          problemCategory,
          problemCategoryId
        })
      }
    }
  },
  watch: {
    value: {
      handler (val) {
        this.context = val
      },
      immediate: true
    },

    context: {
      handler (val) {
        this.$emit('updateFormData', {
          reviewContent: val
        })
      }
    }
  }
}
</script>

<style lang="less" scoped>
.opinion_context_input_wrap{

}
.input_support{
  position: absolute;
  right: 0px;
  top: -36px;
  
  display: flex;
  flex-direction: row-reverse;
  margin-bottom: 6px;

  span {
    margin-left: 8px;
  }

  .split_line{
    color: #b9b9b9;
  }
}
</style>
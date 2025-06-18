<template>
  <el-form-item prop="historyOpinions" label="审查意见">
    <div class="opinion_text opinion_comment_item" v-html="opinionFormat(historyOpinions)"></div>
  </el-form-item>
  <el-form-item prop="replyContent" label="答复内容">
    <div class="opinion_text opinion_comment_item" v-html="opinionFormat(replyContent)"></div>
  </el-form-item>
</template>

<script>
import { ElFormItem, ElInput } from 'element-plus'
import util from '../../../../../../plugins/util.js'
export default {
  components: {ElFormItem, ElInput},
  props: {
    historyOpinions: { // 历史意见和答复
      type: String,
      default: '',
    },
    replyContent: { // 答复内容
      type: String,
      default: '',
    }
  },
  data () {
    return {
    }
  },
  methods: {
    opinionFormat (str) {
      // str = (str || '').replace(/\<br\/>/g, '\n')
      return util.specialSymbolTrans.getHtml(str)
    },
  }
}
</script>

<style lang="less" scoped>
.opinion_comment_item{
  padding: 8px 12px;
  color: #f2f2f8;
  border: 1px solid #373841;
  border-radius: 4px;
  width: 100%;
}
</style>
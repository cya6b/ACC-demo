<template>
  <div>
    <el-button type="primary" @click="reCreate">重新生成</el-button>
    <el-tooltip
      content="pdf下载之后会自动转为word格式，可进行手动编辑"
      placement="bottom-start">
      <el-button type="primary" @click="download">下载编辑</el-button>
    </el-tooltip>
    <el-tooltip
      content="可上传word格式、pdf格式文件，word格式上传后会自动转为pdf格式，替换现有的pdf文件"
      placement="bottom-start">
      <el-upload
        action=""
        :http-request="uploadToReplace"
        :show-file-list="false"
        style="display: inline">
        <el-button type="primary">上传替换</el-button>
      </el-upload>
      <!-- <el-button type="primary" @click="uploadToReplace">上传替换</el-button> -->
    </el-tooltip>
  </div>
</template>

<script>
import { ElButton, ElTooltip, ElUpload } from 'element-plus';
export default {
  components: {
    ElTooltip,
    ElButton,
    ElUpload
  },
  methods: {
    reCreate () {
      this.$emit('reCreateHandle')
    },
    download () {
      this.$emit('downloadHandle')
    },
    uploadToReplace (file) {
      this.$emit('uploadToReplaceHandle', file)
    }
  }
}
</script>

<style lang="less" scoped>
.el-button{
  border-radius: 2px;
  width: 80px;
  height: 30px;
  vertical-align: baseline;
}
.el-button--primary{
  background-color: #0767b3;
}
.el-upload .el-button{
  margin-left: 12px;
}
</style>
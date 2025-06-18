<template>
  <div>
    <el-button disabled class="btn">上传设置</el-button>
    <el-button class="btn upload_btn" @click="uploadBtnClick">上传</el-button>
    <el-button class="btn" @click="removeFiles">批量删除文件</el-button>
    <el-button disabled class="btn">一键排序</el-button>

    <input ref="fileInput" type="file" style="display:none" multiple class="fileDoms" @change="uploadFiles"/>
  </div>
</template>

<script>
import {ElButton} from 'element-plus'
export default {
  components: {ElButton},
  methods: {
    uploadBtnClick () {
      this.$refs.fileInput.click()
    },
    uploadFiles (event) {
      let files = event.target.files
      if (!files) return
      this.$emit('uploadFiles', [...files])

      event.target.value = ''
    },
    removeFiles () {
      this.$emit('removeFiles')
    }
  }
}
</script>

<style lang="less" scoped>
.btn{
  padding: 0px 10px;
  text-align: center;
  display: inline-block;
  border-radius: 2px;
  min-width: 120px;
  line-height: 30px;
  font-size: 14px;
  white-space: nowrap;
  cursor: pointer;
  background: #fff;
  border: 1px solid #0767b3;
  color: #0767b3;
  height: 30px;
  &:hover{
    background-color: #ecf5ff;
  }
  &.is-disabled{
    color: var(--el-button-disabled-text-color);
    cursor: not-allowed;
    background-image: none;
    background-color: var(--el-button-disabled-bg-color);
    border-color: var(--el-button-disabled-border-color);
  }
  &.upload_btn{
    margin-left: -1px;
  }
}
</style>
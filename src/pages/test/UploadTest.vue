<template>
  <el-upload
      class="avatar-uploader"
      action=""
      :show-file-list="false"
      multiple
      :http-request="upload"
  >
    上传文件
    <el-icon :size="30">
      <plus/>
    </el-icon>
  </el-upload>
</template>

<script>
import {ElUpload, ElIcon} from 'element-plus'
import {Plus} from '@element-plus/icons'
import Uploader from "/@/components/service/Upload/index.js";

export default {
  name: "Upload",
  components: {
    ElUpload,
    ElIcon,
    Plus
  },
  methods: {
    async upload({file}) {
      const uploadInfoUrl = '/api/file/v2/upload/getUploadURL'

      let uploadObject = Uploader.multipartUpload({
        file, uploadInfoUrl, handleProcess: (processdata) => {
        }
      }, (data) => {
      }, err => {
      })
    }
  }
}
</script>

<style scoped>
.avatar-uploader {
  text-align: center;
}
</style>
<template>
  <el-upload
      class="avatar-uploader"
      action=""
      :show-file-list="false"
      multiple
      :http-request="upload"
  >
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
      const uploadInfoUrl = 'http://ptzc.tushenyun.com/api/file/getUploadURL'
      const uploadRes = await Uploader.upload({file, uploadInfoUrl})
    }
  }
}
</script>

<style scoped>
.avatar-uploader {
  text-align: center;
}
</style>
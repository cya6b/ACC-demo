<template>
  <div class="report_view_page">
    <report-opts
      class="report_opts"
      @reCreateHandle="reCreateHandle"
      @downloadHandle="download('word')"
      @uploadToReplaceHandle="uploadToReplaceHandle"></report-opts>
    <iframe id="pdfJsViewer"
      :src="'xxx?file='+pdfUrl"
      style="width: 100%;height:100%; border-width: 0;">
    </iframe>
  </div>
</template>

<script>
import ReportOpts from './ReportOpts.vue';
import { ElMessageBox, ElMessage } from 'element-plus';
import api from '../../api.js'
import uploadApi from '../../../components/service/Upload/index.js'
export default {
  components: {
    ReportOpts,
    ElMessageBox,
    ElMessage
  },
  data () {
    return {
      viewToken: this.$route.query.viewToken,
      obejctKey: '',
      pdfUrl: ''
    }
  },
  created () {
    this.download('pdf')
  },
  methods: {
    reCreateHandle () {
      ElMessageBox.confirm('确认重新生成? 确认后审查报告将重新生成！', '提示', {
        confirmButtonText: '重新生成',
        cancelButtonText: '取消',
        type: 'warning',
        customClass: 'my_message_box',
        callback: (action) => {
          if (action === 'confirm') {
            this.reCreateReport()
          }
        },
      })
    },
    async reCreateReport () {
      let params = {
        viewToken: this.viewToken
      }
      let result = await api.reCreateReport(params)
      if (result.data && result.data.code === 'SUCCESS') {
        ElMessage.success('操作成功,重新生成中，请稍后刷新页面查看结果!')
      } else {
        ElMessage.error(result.data.message)
      }
    },
    async download (type) {
      let message = '下载失败'
      let params = {
        viewToken: this.viewToken,
        type: type === 'pdf' ? 1 : 2
      }
      let result = await api.downloadReport(params)
      if (result.data && result.data.code === 'SUCCESS') {
        if (type === 'pdf') {
          this.pdfUrl = encodeURIComponent(result.data.detail)
        } else {
          let url = result.data.detail
          if (url) {
            let aDom = document.createElement('a')
            aDom.href = url
            aDom.click()
          } else {
            ElMessage.warning(result.data.message)
          }
        }
      } else {
        if (result.data && result.data.message) {
          message += '：' + result.data.message
        }
        ElMessage.error(message)
      }
    },
    uploadToReplaceHandle (file) {
      const uploadInfoUrl = '/api/file/v2/upload/getUploadURL'
      uploadApi.multipartUpload({
        file: file.file,
        uploadInfoUrl
      },
      this.uploadToReplace,
      err => {
        let message = '上传失败'
        if (err && err.message) {
          message += '：' + err.message
        }
        ElMessage.error(message)
      })
    },
    async uploadToReplace (res) {
      let message = '上传失败'
      let params = {
        viewToken: this.viewToken,
        objectKey: res.detail.objectKey
      }
      let result = await api.uploadReport(params)
      if (result.data && result.data.code === 'SUCCESS') {
        ElMessage.success('上传成功，请稍后刷新页面查看结果!')
      } else {
        if (result.data && result.data.message) {
          message += '：' + result.data.message
        }
        ElMessage.error(message)
      }
    }
  }
}
</script>

<style lang="less" scoped>
.report_view_page{
  height: 100%;
  overflow: hidden;
  position: relative;
  .report_opts{
    position: absolute;
    top: 2px;
    right: 80px;
  }
}
</style>
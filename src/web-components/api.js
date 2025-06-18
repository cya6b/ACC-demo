import axios from 'axios'

export default {
  // 重新生成审查报告
  reCreateReport (params) {
    return axios.post(`/dispatcher/passAuth/web/report/reset`, null, {params})
  },
  // 下载审查报告
  downloadReport (params) {
    return axios.get(`/dispatcher/passAuth/web/report`, {params})
  },
  // 上传替换报告
  uploadReport (params) {
    return axios.post(`/dispatcher/passAuth/web/report`, null, {params})
  }
}
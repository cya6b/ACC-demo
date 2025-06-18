import axios from 'axios'

export default {
  getFileInfo (params, apiHost) {
    return axios.get(`${apiHost || ''}/api/file/v2/gfile/getInfo`, {params})
  },

  getViewToken (params, apiHost) {
    return axios.get(`${apiHost || ''}/api/file/v2/gfile/getViewToken`, {params})
  }
}
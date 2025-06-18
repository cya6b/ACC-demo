/* Copyright (C) <1998-2024> Glodon Company Limited
 * Licensed under the MIT License
 * Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the “Software”), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
 * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
 * THE SOFTWARE IS PROVIDED “AS IS”, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */
import axios from 'axios'

export default {
  getListTree (params, apiHost) {
    return axios.get(`${apiHost || ''}/api/file/v2/gfile/listTree`, {params})
  },
  createFolder (params, apiHost) {
    return axios.post(`${apiHost || ''}/api/file/v2/gfile/createFolder`, params)
  },
  renameFolderOrFile (params, apiHost) {
    return axios.put(`${apiHost || ''}/api/file/v2/gfile/rename`, params)
  },
  deleteFolderOrFile (params, apiHost) {
    return axios.delete(`${apiHost || ''}/api/file/v2/gfile/delete`, {params})
  },
  deleteAllFoldersOrAllFiles (params, apiHost) {
    return axios.delete(`${apiHost || ''}/api/file/v2/gfile/deleteAll`, {data: params})
  },
  getFileList (params, apiHost) {
    return axios.get(`${apiHost || ''}/api/file/v2/gfile/search`, {params})
  },
  saveFile (params, apiHost) {
    return axios.post(`${apiHost || ''}/api/file/v2/gfile/saveFile`, params)
  },
  packFolder (params, apiHost) {
    return axios.post(`${apiHost || ''}/api/file/v2/gfile/packFolder`, {}, {params})
  },
  getPackStatus (params, apiHost) {
    return axios.get(`${apiHost || ''}/api/file/v2/gfile/getFolderPackStatus`, {params})
  },
  getPackDownloadUrl (params, apiHost) {
    return axios.get(`${apiHost || ''}/api/file/v2/gfile/getPackDownloadUrl`, {params})
  },
  setFileOrder (params, apiHost) {
    return axios.post(`${apiHost || ''}/api/file/v2/gfile/setOrder`, {}, {params})
  },
  getFileDownloadUrl (params, apiHost) {
    return axios.get(`${apiHost || ''}/api/file/v2/gfile/getDownloadUrl`, {params})
  },
  getFileOrFolderInfo (params, apiHost) {
    return axios.get(`${apiHost || ''}/api/file/v2/gfile/getInfo`, {params})
  }
}
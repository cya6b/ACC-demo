/* Copyright (C) <1998-2024> Glodon Company Limited
 * Licensed under the MIT License
 * Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the “Software”), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
 * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
 * THE SOFTWARE IS PROVIDED “AS IS”, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */
import axios from 'axios'

export default {
  fetchNormNumber (params, apiHost) {
    return axios.get(`${apiHost || ''}/suggestion/space/searchNormNumber`, {params})
  },
  // 获取问题类别列表
  getProblemCategoryList (params, apiHost) {
    return axios.get(`${apiHost || ''}/suggestion/space/issueType/list`, {params})
  },

  opinionAdd (params, apiHost) {
    return axios.post(`${apiHost || ''}/suggestion`, params)
  },

  getRecentOpinions (params, apiHost) {
    return axios.get(`${apiHost || ''}/suggestion/recent`, {params})
  },

  getCommonOpinions (params, apiHost) {
    return axios.get(`${apiHost || ''}/suggestion/space/commonOpinion`, {params})
  },

  getOpinionList (params, apiHost) {
    return axios.get(`${apiHost || ''}/suggestion`, {params})
  },

  deleteOpinion (params, apiHost) {
    return axios.delete(`${apiHost || ''}/suggestion/${params.ids}`)
  },

  opinionUpdate (params, apiHost) {
    return axios.put(`${apiHost || ''}/suggestion`, params)
  },
}
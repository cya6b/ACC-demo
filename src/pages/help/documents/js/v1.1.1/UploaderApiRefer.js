/* Copyright (C) <1998-2024> Glodon Company Limited
 * Licensed under the MIT License
 * Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the “Software”), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
 * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
 * THE SOFTWARE IS PROVIDED “AS IS”, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */
export default {
  title: 'Uploader',
  desc: '文件上传对象',
  detail: [
    {
      title: 'property Methods',
      list: [
        {
          label: 'upload(params)',
          desc: '文件上传',
          parameters: [
            {
              name: 'params',
              type: 'Object',
              desc: '{file: File // 文件, uploadInfoUrl: url // 上传地址, handleProcess: Function // 上传进度回调}',
            }
          ]
        },
        {
          label: 'multipartUpload(params, successCallBack, failCallBack)',
          desc: '文件分片上传',
          parameters: [
            {
              name: 'params',
              type: 'Object',
              desc: '{file: File // 文件, uploadInfoUrl: url // 上传地址, handleProcess: Function // 上传进度回调}',
            }, {
              name: 'successCallBack',
              type: 'Function',
              desc: '上传成功回调',
            }, {
              name: 'failCallBack',
              type: 'Function',
              desc: '上传失败回调',
            }
          ]
        }
      ]
    },
  ]
}
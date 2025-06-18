/* Copyright (C) <1998-2024> Glodon Company Limited
 * Licensed under the MIT License
 * Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the “Software”), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
 * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
 * THE SOFTWARE IS PROVIDED “AS IS”, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */
export default {
  title: 'FilesDirectory',
  desc: '类：文件管理',
  detail: [
    {
      title: 'Constructor',
      list: [
        {
          label: 'new gdaJsSDK.FilesDirectory(options)',
          desc: '构造函数',
          parameters: [
            {
              name: 'options',
              type: 'Object',
              desc: 'FilesDirectory的配置项, ex: {el: "", editable: false, sourceParams: {containerId: 1, folderId: 1}, host: "", fileClickHandle: (v) => {}}',
              required: true
            }
          ]
        }, {
          label: 'options',
          desc: 'options参数描述',
          parameters: [
            {
              name: 'el',
              type: 'String',
              desc: '指定挂载到的dom节点id, ex: "#app", 若load时不传dom节点参数则默认挂载到此节点'
            }, {
              name: 'sourceParams',
              type: 'Object',
              desc: '指定文件容器id及文件夹id ex: {containerId: 1, folder: 1}',
              required: true
            }, {
              name: 'host',
              type: 'String',
              desc: '指定apiHost地址',
            }, {
              name: 'editable',
              type: 'Boolean',
              desc: '是否进行文件管理编辑，默认为true',
            }, {
              name: 'fileClickHandle',
              type: 'Function',
              desc: '点击文件名称后的监听回调函数，返回点击的文件的详细信息',
            }
          ]
        }
      ]
    }, {
      title: 'Methods',
      list: [
        {
          label: 'load(el, callBack)',
          desc: '挂载函数，将view挂载到dom节点',
          parameters: [
            {
              name: 'el',
              type: 'String',
              desc: '指定View视口挂载到的dom节点id, ex: "#app", 若不传则采用创建Model时传入的默认节点',
            }, {
              name: 'callBack',
              type: 'Function',
              desc: '挂载完成后的回调函数',
            }
          ]
        }
      ]
    }
  ]
}
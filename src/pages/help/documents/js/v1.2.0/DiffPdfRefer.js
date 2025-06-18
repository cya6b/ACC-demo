export default {
  title: 'DiffPdf',
  desc: 'pdf文件对比对象',
  detail: [
    {
      title: 'Constructor',
      list: [
        {
          label: 'new gdaJsSDK.DiffPdf(options)',
          desc: '构造函数',
          parameters: [
            {
              name: 'options',
              type: 'Object',
              desc: 'DiffPdf的配置项及source依赖, ex: {el: "", source: Object}',
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
              desc: '指定Pdf对别展示结果挂载到的dom节点id, ex: "#app", 若load时不传dom节点参数则默认挂载到此节点'
            }, {
              name: 'source',
              type: 'Object',
              desc: '依赖的pdf图纸资源数据',
              required: true
            }
          ]
        }, {
          label: 'options.source',
          desc: 'options.source参数详述',
          parameters: [
            {
              name: 'baseUrl',
              type: 'String',
              desc: '第一个pdf文件的下载地址，要求该地址可直接下载pdf，不存在跨域，鉴权等问题'
            },
            {
              name: 'targetUrl',
              type: 'String',
              desc: '第二个pdf文件的下载地址，要求该地址可直接下载pdf，不存在跨域，鉴权等问题'
            }
          ]
        }
      ]
    },
    {
      title: 'property Methods',
      list: [
        {
          label: 'load(el, callBack)',
          desc: '挂载函数，挂载到某dom节点',
          parameters: [
            {
              name: 'el',
              type: 'String',
              desc: '指定View视口挂载到的dom节点id, ex: "#app", 若不传则采用创建DiffPdf时传入的默认节点',
            }, {
              name: 'callBack',
              type: 'Function',
              desc: '挂载完成后的回调函数',
            }
          ]
        }, {
          label: 'unload()',
          desc: '卸载'
        }, {
          label: 'reload(source)',
          desc: '重新加载',
          parameters: [
            {
              name: 'source',
              type: 'Object',
              desc: '参考source参数描述',
            }
          ]
        }
      ]
    },
  ]
}
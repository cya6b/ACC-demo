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
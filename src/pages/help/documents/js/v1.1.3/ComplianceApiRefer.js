export default {
  title: 'Compliance',
  desc: '类：相符性审查和叠图关联',
  detail: [
    {
      title: 'Constructor',
      list: [
        {
          label: 'new gdaJsSDK.Compliance(options)',
          desc: '构造函数',
          parameters: [
            {
              name: 'options',
              type: 'Object',
              desc: 'Compliance的配置项及source依赖, ex: {el: "", source: Object, editable: false}',
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
              desc: '指定View视口挂载到的dom节点id, ex: "#app", 若load时不传dom节点参数则默认挂载到此节点'
            }, {
              name: 'source',
              type: 'Object',
              desc: '依赖的图纸资源数据',
              required: true
            }, {
              name: 'bimfaceHost',
              type: 'String',
              desc: 'bimfaceSdk host地址, 默认https://static.bimface.com',
            }, {
              name: 'editable',
              type: 'Boolean',
              desc: '是否可以进行关联编辑',
            },
            {
              name: 'linkType ',
              type: 'Enum',
              desc: '关联模式 ex: auto 自动 | hand 手动 | auto&hand 自动 + 手动 | handV2 手动(两步) | auto&handV2, 默认：auto&hand'
            }
          ]
        }, {
          label: 'options.source',
          desc: 'options.source参数详述',
          parameters: [
            {
              name: 'firstDrawing',
              type: 'Object',
              desc: `第一张图纸数据, ex: {
  name: '', // 名称
  type: '', // 类型  model2d | modelsheet
  token: '', // type为model2d时，为该图纸bimface轻量化viewToken; 
                // type为modelsheet时，为该视图所在模型的轻量viewToken; 
  sheetId: '' // type为modelsheet时必填，视图id
}`
            },
            {
              name: 'secondDrawing',
              type: 'Object',
              desc: `第二张图纸数据, ex: {
  name: '', // 名称
  type: '', // 类型  model2d | modelsheet
  token: '', // type为model2d时，为该图纸bimface轻量化viewToken; 
                // type为modelsheet时，为该视图所在模型的轻量viewToken; 
  sheetId: '' // type为modelsheet时必填，视图id
}`
            },
            {
              name: 'matric',
              type: 'String',
              desc: '坐标变换矩阵 ex: "[1.0001118822751767,0,0,0,0,1.0001118822751767,0,0,0,0,1,0,-10.158196458702323,-24.684297280667042,0,1]" 或 ex: {drawingPoints: [-3950,230210,-750,219210],sheetPoints: [-3950,230210,-750,219210]}'
            },
            {
              name: 'waittingLinkdrawingList ',
              type: 'Array',
              desc: `关联时待选择的图纸列表数据,传递后 组件将自管理右侧图纸切换 ex: [{name: '图纸1',type: "model2d", token: null}]，可不传`
            }, {
              name: 'autoLinkStatus ',
              type: 'Enum',
              desc: '当前自动关联的关联状态，关联模式包含auto时必填。 ex: "0" 未开始 "1" 关联中 "-1" 关联失败'
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
        }, {
          update: true,
          label: 'unload()',
          desc: '卸载'
        }, {
          label: 'reload(source, callBack)',
          desc: '重新加载模型，图纸，或视图',
          parameters: [
            {
              name: 'source',
              type: 'Object',
              desc: '参考source参数描述',
            }, {
              name: 'callBack',
              type: 'Function',
              desc: '重新加载完成后的回调函数',
            }
          ]
        }, {
          label: 'addEventListener(type, listener)',
          desc: '添加事件监听函数',
          parameters: [
            {
              name: 'type',
              type: 'String',
              desc: `监听函数类型，
              startSelectDrawingEvent(selectedCb)|
              endSelectDrawingEvent|
              handlinkConfirmEvent({
                successCb, // 成功回调
                failCb, // 失败回调
                matric, // 转换矩阵
                matricPoints  // 选点数据
              })|
              smartLinkEvent({
                successCb,
                failCb
              })`
            }, {
              name: 'listener',
              type: 'Function',
              desc: '监听事件的回调函数'
            }
          ]
        }, {
          label: 'setEditable(editable)',
          desc: '设置是否可做关联编辑',
          parameters: [
            {
              name: 'editable',
              type: 'Boolean',
              desc: 'true or false'
            }
          ]
        }, {
          label: 'getMainModel()',
          desc: '获取主窗口操作对象Model: 叠图模式下返回叠图ModelSet对象，分屏模式下返回左侧Model对象',
        }, {
          label: 'getDrawingModel()',
          desc: '获取图纸窗口操作对象Model: 叠图模式下返回叠图ModelSet对象，分屏模式下返回右侧Model对象'
        }
      ]
    }
  ]
}
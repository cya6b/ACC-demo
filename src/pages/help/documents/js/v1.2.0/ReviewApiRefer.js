export default {
  title: 'Review',
  desc: '类：图纸，模型，图模联审的审查View',
  detail: [
    {
      title: 'Constructor',
      list: [
        {
          label: 'new gdaJsSDK.Review(options)',
          desc: '构造函数',
          parameters: [
            {
              name: 'options',
              type: 'Object',
              desc: 'Review的配置项及source依赖, ex: {el: "", source: Object}',
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
              desc: '依赖的模型或图纸资源数据',
              required: true
            }, {
              name: 'bimfaceHost',
              type: 'String',
              desc: 'bimfaceSdk host地址, 默认https://static.bimface.com',
            }, {
              name: 'ableAutoLink',
              type: 'Boolean',
              desc: '是否进行图模联动, 默认false'
            }
          ]
        }, {
          label: 'source',
          desc: 'source参数描述',
          parameters: [
            {
              name: 'main',
              type: 'Object',
              desc: '加载的主窗口数据',
              required: true
            }, {
              name: 'sub',
              type: 'Object',
              desc: '加载的小窗口数据, 单图纸或单模型审查场景下可不传'
            }
          ]
        }, {
          label: 'main',
          desc: '主窗口数据参数描述',
          parameters: [
            {
              name: 'source',
              type: 'Object',
              desc: '窗口数据',
              required: true
            }
          ]
        }, {
          label: 'main.source',
          desc: '窗口数据详述',
          parameters: [
            {
              name: 'type',
              type: 'String',
              desc: '展示类型 model2d或model3d',
              required: true
            }, {
              name: 'token',
              type: 'String',
              desc: 'bimface轻量化viewToken',
              required: true
            }, {
              name: 'walkthroughData',
              type: 'JsonStr',
              desc: '漫游路径数据, 该数据用于3D模型中路径漫游面板数据初始化',
              update: true,
            }
          ]
        }, {
          label: 'sub',
          desc: '小窗口数据参数描述',
          parameters: [
            {
              name: 'source',
              type: 'Object',
              desc: '窗口数据, 同mian.source',
              required: true
            }, {
              name: 'subList',
              type: 'Array',
              desc: '小窗口文件切换列表, 当进行二三维联动时为必填，列表维护了图纸和视图的关联关系',
            }
          ]
        }, {
          label: 'sub.subList item',
          desc: '小窗口文件列表数据参数描述',
          parameters: [
            {
              name: 'name',
              type: 'String',
              desc: '文件名称',
              required: true
            }, {
              name: 'type',
              type: 'String',
              desc: '展示类型 model2d或model3d',
              required: true
            }, {
              name: 'token',
              type: 'String',
              desc: 'bimface轻量化viewToken',
              required: true
            }, {
              name: 'autoLink',
              type: 'Object',
              desc: '文件链接的视图数据',
            }
          ]
        }, {
          label: 'autoLink',
          desc: '文件链接的视图数据详述',
          parameters: [
            {
              name: 'source',
              type: 'Object',
              desc: '模型视图source数据 ex: {type: "modelsheet", token: "", sheetId: "123", name: "sheetName", isIntegratedModel: true // 是否合模文件, singleModelFileId: 123 // 合模的单模型文件id}'
            }, {
              name: 'matric',
              type: 'Object | String',
              desc: `图纸与模型视图的坐标转换关系，支持传点信息或左边转换矩阵信息 
              ex1: {drawingPoints: [0,0,1000,1000], sheetPoints: [0,0,1000,1000]}; 
              ex2: "[1.4586774085823542,-0.025461308876130528,0,0,0.025461308876130528,1.4586774085823542,0,0,0,0,1,0,-9292.000286304572,415497.48398312565,0,1]"`
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
              update: true,
              name: 'type',
              type: 'String',
              desc: `监听函数类型，
              annotDrawingSavedEvent;
              (new) walkthroughDataChangedEvent({ // 用于漫游路径数据持久化保存
                id (模型id)
                walkthroughData (漫游路径数据)
              })
              `
            }, {
              name: 'listener',
              type: 'Function',
              desc: '监听事件的回调函数'
            }
          ]
        }, {
          label: 'getMainModel()',
          desc: '获取主窗口展示model, 返回Model对象'
        }, {
          label: 'getSubModel()',
          desc: '获取小窗口展示model, 返回Model对象'
        }, {
          label: 'clearAllMarkups()',
          desc: '清空批注和锚点标签'
        }
      ]
    }

  ]
}
export default {
  title: 'Model',
  desc: '类：图纸，模型，模型视图View展示',
  detail: [
    {
      title: 'Constructor',
      list: [
        {
          label: 'new gdaJsSDK.Model(options)',
          desc: '构造函数',
          parameters: [
            {
              name: 'options',
              type: 'Object',
              desc: 'Model的配置项及source依赖, ex: {el: "", source: Object}',
              required: true
            }
          ]
        },
        {
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
              name: 'hideTextSearch',
              type: 'Boolean',
              desc: '是否隐藏搜索功能框, 默认显示'
            }, {
              name: 'hideBimToolBar',
              type: 'Boolean',
              desc: '是否隐藏底部浏览工具栏, 默认显示'
            }, {
              name: 'hideBimLayerBar',
              type: 'Boolean',
              desc: '是否隐藏浏览工具栏中的图层, 默认显示'
            }, {
              name: 'hideAnnotBar',
              type: 'Boolean',
              desc: '是否隐藏浏览工具栏中的批注, 默认显示'
            }, {
              name: 'background',
              type: 'String',
              desc: '指定背景色'
            }
          ]
        },
        {
          label: 'source',
          desc: 'source参数描述',
          parameters: [
            {
              name: 'type',
              type: 'String',
              desc: 'Enum枚举, 值为："model2d" 或 "model3d" 或 "modelsheet"',
              required: true
            }, {
              name: 'token',
              type: 'String',
              desc: 'bimface轻量化viewToken'
            }, {
              name: 'sheetId',
              type: 'String',
              desc: '模型视图id, type为modelsheet时必填, type为其他时可不填'
            }
          ]
        }
      ]
    },
    {
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
          label: 'setMarkupList(list, typeStr)',
          desc: '设置批注数据',
          parameters: [
            {
              name: 'list',
              type: 'Array',
              desc: '批注数据列表, ex: [{annor: Object, annotations: Array}]',
            }, {
              name: 'typeStr',
              type: 'String',
              desc: '自定义批注分类',
            }
          ]
        }, {
          label: 'annor(Object) (非methods)',
          desc: '批注数据的 annor参数 详述',
          parameters: [
            {
              name: 'label',
              type: 'String',
              desc: '绘制的锚点标签的名称',
            }, {
              name: 'contentHTML',
              type: 'String',
              desc: '自定义标签展开项内容 ex: "<span>111</span>"',
            }, {
              name: 'box',
              type: 'Object',
              desc: '锚点附着的批注框boundingBox信息, ex: {minX: 300,minY: -300000,maxX: 1000,maxY: -280000}'
            }
          ]
        }, {
          label: 'annotations item (非methods)',
          desc: '批注数据的 annotations数组项 详述',
          parameters: [
            {
              name: 'markupType',
              type: 'String',
              desc: 'bimface支持的批注类型，除此之外拓展了 "my_CloudRect"'
            }, {
              name: 'strokeStyle',
              type: 'String',
              desc: '批注线颜色, ex: "rgba(255,0,0,1)"'
            }, {
              name: 'minX',
              type: 'Number',
              desc: '批注框minX坐标, ex: 300',
            }, {
              name: 'minY',
              type: 'Number',
              desc: '批注框minY坐标, ex: -300000',
            }, {
              name: 'maxX',
              type: 'Number',
              desc: '批注框maxX坐标, ex: 1000',
            }, {
              name: 'maxY',
              type: 'Number',
              desc: '批注框maxY坐标, ex: -10000',
            }
          ]
        }, {
          label: 'activeAnnor(index)',
          desc: '激活锚点标签',
          parameters: [
            {
              name: 'index',
              type: 'Number',
              desc: '锚点标签index',
            }
          ]
        }, {
          label: 'unActiveAnnor(index)',
          desc: '取消激活的锚点标签',
          parameters: [
            {
              name: 'index',
              type: 'Number',
              desc: '锚点标签index',
            }
          ]
        }, {
          label: 'snapshot(color, callBack)',
          desc: '获取截图',
          parameters: [
            {
              name: 'color',
              type: 'Glodon.Web.Graphics.Color',
              desc: 'bimface定义的Color rgba格式',
            },
            {
              name: 'callBack',
              type: 'Function',
              desc: '返回截图的BASE64字符串的回调函数',
            }
          ]
        }, {
          label: 'addEventListener(type, listener)',
          desc: '添加事件监听函数',
          parameters: [
            {
              name: 'type',
              type: 'String',
              desc: '监听函数类型，mouseClickEvent|zoomFactorChangedEvent|annorActiveEvent|annorUnActiveEvent|annotDrawingSavedEvent'
            }, {
              name: 'listener',
              type: 'Function',
              desc: '监听事件的回调函数'
            }
          ]
        }, {
          label: 'hideBimToolBar()',
          desc: '隐藏工具栏',
        },
        {
          label: 'showBimToolBar()',
          desc: '显示工具栏',
        }, {
          update: true,
          label: 'clearAllMarkups()',
          desc: '清空批注和锚点标签'
        }
      ]
    }
  ]
}
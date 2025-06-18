export default {
  title: 'ReviewResult',
  desc: '类：智能审查结果(设计质量/相符性)',
  detail: [
    {
      title: 'Constructor',
      list: [
        {
          label: 'new gdaJsSDK.ReviewResult(options)',
          desc: '构造函数',
          parameters: [
            {
              name: 'options',
              type: 'Object',
              desc: 'ReviewResult的配置项及source依赖',
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
              name: 'title',
              type: 'String',
              desc: '意见框title, 默认："智能审查意见",可自定义'
            }, {
              name: 'modeType',
              type: 'Enum',
              desc: '模式类型, 设计质量或相符性 DesignQuality|DesignQualityV2 |Compliance, 默认"DesignQuality"  ex: "Compliance"'
            }, {
              name: 'sourceData',
              type: 'Object',
              desc: '意见数据',
              required: true
            }, {
              name: 'outerChin',
              type: 'Review',
              desc: '该组件对应的图纸模型展示组件, 该组件与之交互',
            }, {
              name: 'showAdopt',
              type: 'Boolean',
              desc: '是否显示采纳, 默认为true',
            }, {
              name: 'adoptClickHandle',
              type: 'Function',
              desc: '采纳按钮点击后的回调函数'
            }, {
              name: 'closeHandle',
              type: 'Function',
              desc: '关闭按钮点击后的回调函数'
            }
          ]
        }, {
          label: 'options.sourceData(modeType为"Compliance"时)',
          desc: '意见数据',
          parameters: [
            {
              name: 'status',
              type: 'Enum',
              desc: '审查任务状态 "FINISH" 审查成功 "FAIL" 审查失败 "RUNNING" 审查中'
            }, {
              name: 'tabs',
              type: 'Array',
              desc: '审查意见分类tab数组 ex: [tabItem]'
            }
          ]
        }, {
          label: 'tabItem',
          desc: 'tabs数组项详述',
          parameters: [
            {
              name: 'tabName',
              type: 'String',
              desc: 'tab页签名称'
            }, {
              name: 'tabType',
              type: 'Enum',
              desc: 'tab页签类型 notPass|pass ex: "notPass"'
            }, {
              name: 'list',
              type: 'Array',
              desc: 'tab页签详情列表数据, ex: [listItem]'
            }
          ]
        }, {
          label: 'listItem',
          desc: '详情列表项详述',
          parameters: [
            {
              name: 'status',
              type: 'Enum',
              desc: '审查状态 0 不符合 1 符合'
            },
            {
              name: 'name',
              type: 'String',
              desc: '审查点名称'
            }, {
              name: 'opinionText',
              type: 'String',
              desc: '审查意见'
            }, {
              name: 'count',
              type: 'Number',
              desc: '问题数'
            }, {
              name: 'errCount  ',
              type: 'Number',
              desc: '不符合数'
            }, {
              name: 'passCount  ',
              type: 'Number',
              desc: '符合数'
            }, {
              name: 'strong',
              type: 'Boolean',
              desc: '是否强条'
            }, {
              name: 'adoption',
              type: 'Boolean',
              desc: '是否已采纳'
            }, {
              name: 'elementResults',
              type: 'Array',
              desc: '审查点下审查的问题构件列表 ex: [eleInfo]'
            }
          ]
        }, {
          label: 'eleInfo',
          desc: '问题构件详述',
          parameters: [
            {
              name: 'elementState ',
              type: 'Enum',
              desc: '构件的审查结果状态 0错误 | -1未审查 | 1正确'
            },
            {
              name: 'modelId',
              type: 'String',
              desc: '模型id'
            }, {
              name: 'drawingId',
              type: 'String',
              desc: '图纸id'
            }, {
              name: 'componentId',
              type: 'String',
              desc: '构件id'
            }, {
              name: 'componentName',
              type: 'String',
              desc: '构件名称'
            }, {
              name: 'message',
              type: 'String',
              desc: '意见内容'
            }, {
              name: 'viewEleBox',
              type: 'Object',
              desc: '构件包围盒信息 ex: [{x: 10000, y: 10000},{x: 15000, y: 10500}]'
            }
          ]
        }, {
          label: 'options.sourceData(modeType为"DesignQuality|DesignQualityV2"时)',
          desc: '意见数据',
          parameters: [
            {
              name: 'status',
              type: 'Enum',
              desc: '审查任务状态 "FINISH" 审查成功 "FAIL" 审查失败 "RUNNING" 审查中'
            }, {
              name: 'tabs',
              type: 'Array',
              desc: '审查意见分类tab数组 ex: [tabItem]'
            }, {
              name: 'tagsList (DesignQualityV2)',
              type: 'Array',
              desc: '专项标签列表 ex: ["通用", "消防"]'
            }
          ]
        }, {
          label: 'tabItem',
          desc: 'tabs数组项详述',
          parameters: [
            {
              name: 'tabName',
              type: 'String',
              desc: 'tab页签名称'
            }, {
              name: 'tabType',
              type: 'Enum',
              desc: 'tab页签类型 notPass|pass|doubt|unexamined ex: "notPass"'
            }, {
              name: 'list',
              type: 'Array',
              desc: 'tab页签详情列表数据, ex: [listItem]'
            }
          ]
        }, {
          label: 'listItem',
          desc: '详情列表项详述',
          parameters: [
            {
              name: 'status',
              type: 'String|Number',
              desc: '条文审查结果状态 通过 1|不通过 0|存疑 -1|未审查 2, ex: "-1"'
            },
            {
              name: 'name',
              type: 'String',
              desc: '条文名称'
            }, {
              name: 'articleContent',
              type: 'String',
              desc: '条文内容'
            }, {
              name: 'opinionText',
              type: 'String',
              desc: '条文的审查意见'
            }, {
              name: 'checkPointCount',
              type: 'Number',
              desc: '审查点个数'
            }, {
              name: 'errCount',
              type: 'Number',
              desc: '问题数'
            }, {
              name: 'doubtCount',
              type: 'Number',
              desc: '存疑数'
            }, {
              name: 'passCount',
              type: 'Number',
              desc: '通过数'
            }, {
              name: 'strong',
              type: 'Array',
              desc: '条文是否为强条'
            }, {
              name: 'adoption',
              type: 'Boolean',
              desc: '是否已采纳'
            }, {
              name: 'detail',
              type: 'Array',
              desc: '审查点列表详情 ex: [checkpointInfo]'
            }, {
              name: 'tagItemList (DesignQualityV2)',
              type: 'Array',
              desc: '条文的专项标签列表'
            }, {
              name: 'checkObjecList (DesignQualityV2)',
              type: 'Array',
              desc: '审查对象'
            }
          ]
        }, {
          label: 'checkpointInfo',
          desc: '审查点数据详述',
          parameters: [
            {
              name: 'draiwngId',
              type: 'String',
              desc: '图纸id'
            }, {
              name: 'modelId',
              type: 'String',
              desc: '模型id'
            }, {
              name: 'content',
              type: 'String',
              desc: '审查点内容描述'
            }, {
              name: 'message',
              type: 'String',
              desc: '审查点的审查意见'
            }, {
              name: 'status',
              type: 'Enum',
              desc: '审查点的审查结果状态 通过 1|不通过 0|存疑 -1|未审查 2, ex: "-1"'
            }, {
              name: 'elementResults',
              type: 'Array',
              desc: '该审查点下审出的构件列表, ex: [eleInfo]'
            }
          ]
        }, {
          name: 'eleInfo',
          desc: '构件信息详述',
          parameters: [
            {
              name: 'componentId',
              type: 'String|Number',
              desc: '构件id'
            }, {
              name: 'componentName',
              type: 'String',
              desc: '构件名称'
            }, {
              name: 'viewEleBox',
              type: 'Object',
              desc: '构件包围盒信息, ex: [{x: 1, y: 1},{x: 2, y: 2}]'
            }, {
              name: 'result',
              type: 'String',
              desc: '构件的审查结果描述'
            }, {
              name: 'status',
              type: 'Enum',
              desc: '构件的审查结果状态, 通过 1|不通过 0|存疑 -1 ex: "0"'
            }, {
              name: 'elementState',
              type: 'Enum',
              desc: '构件的审查结果状态, 通过 1|不通过 0|存疑 -1 ex: "0"'
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
          label: 'resetData(data)',
          desc: '重置意见数据',
          parameters: [
            {
              name: 'data',
              type: 'Object',
              desc: '详见构造函数中的sourceData',
            }
          ]
        }, {
          label: 'setAdoptClickListener(listener)',
          desc: '设置采纳按钮点击监听函数',
          parameters: [
            {
              name: 'listener',
              type: 'Function',
              desc: '监听回调函数 (r) => {}，r参数返回采纳的意见详细数据',
            }
          ]
        }
      ]
    }, {
      title: 'static Methods',
      list: [
        {
          label: 'formatCompareResultData(data)',
          desc: '格式化数据, 将图审系统中的相符性审查意见格式化为组件需要的数据 ex: gdaJsSDK.ReviewResult.formatCompareResultData(data)',
          parameters: [
            {
              name: 'data',
              type: 'Object',
              desc: '图审系统中的相符性审查意见数据',
            }
          ]
        }, {
          label: 'formatReviewResultData(data)',
          desc: '格式化数据, 将图审系统中的设计质量审查意见格式化为组件需要的数据 ex: gdaJsSDK.ReviewResult.formatReviewResultData(data)',
          parameters: [
            {
              name: 'data',
              type: 'Object',
              desc: '图审系统中的设计质量意见数据',
            }
          ]
        }
      ]
    }
  ]
}
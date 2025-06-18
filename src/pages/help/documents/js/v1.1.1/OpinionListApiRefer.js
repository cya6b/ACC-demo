/* Copyright (C) <1998-2024> Glodon Company Limited
 * Licensed under the MIT License
 * Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the “Software”), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
 * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
 * THE SOFTWARE IS PROVIDED “AS IS”, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */
export default {
  title: 'OpinionList',
  desc: '类：意见列表框体',
  detail: [
    {
      title: 'Constructor',
      list: [
        {
          label: 'new gdaJsSDK.OpinionList(options)',
          desc: '构造函数',
          parameters: [
            {
              name: 'options',
              type: 'Object',
              desc: 'OpinionList的配置项',
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
              name: 'apiHost',
              type: 'String',
              desc: '组件内与后端服务交互接口指定host'
            }, {
              name: 'outerChin',
              type: 'Review',
              desc: '该组件对应的图纸模型展示组件, 该组件与之交互',
              required: true
            }, {
              name: 'affiliation',
              type: 'Object',
              desc: '组件需要的项目，人员，流程数据',
              required: true
            }, {
              name: 'closeHandle',
              type: 'Function',
              desc: '组件框体关闭操作时触发的回调关闭函数，声明框体关闭方法',
              required: true
            }, {
              name: 'editable',
              type: 'Boolean',
              desc: '是否可编辑',
            }, {
              name: 'opinionSaveCallBackHandle',
              type: 'Function',
              desc: '编辑模式下意见保存后的回调方法'
            }, {
              name: 'rewriteInterfaces',
              type: 'Object',
              desc: `自定义组件服务交互接口 ex: {
                getOpinionListFunc: () => {}, // 获取意见列表
                deleteOpinionFunc: () => {}, // 删除意见
                opinionUpdateFunc: () => {}, // 更新意见
                fetchNormNumberFunc: () => {}, // 获取规范条文号下拉列表
                getProblemCategoryListFunc: () => {}, // 获取问题类别下拉列表
                getCommonOpinionsFunc: () => {}, // 获取常用意见
                getRecentOpinionsFunc: () => {}, // 获取近期意见
                screenShotImgUploadFunc: () => {}, // 截图文件上传
              }`
            }
          ]
        }, {
          label: 'affiliation',
          desc: 'affiliation详述',
          parameters: [
            {
              name: 'spaceId',
              type: 'String | Number',
              desc: '意见空间id',
              required: true,
            }, {
              name: 'reviewProgress',
              type: 'Enum',
              desc: '审查环节 REVIEW 审查 | AUDIT 审定 | FINAL 汇总 ex: "AUDIT"',
              required: true,
            }, {
              name: 'creatorPersonId',
              type: 'Number | String',
              desc: '创建人id',
              required: true,
            }, {
              name: 'creatorPersonName',
              type: 'String',
              desc: '创建人名称',
              required: true,
            }, {
              name: 'bizType',
              type: 'Enum',
              desc: '项目类型 FJ 房建，SZ 市政 ex: "FJ"',
              required: true,
            }, {
              name: 'specialtyCode',
              type: 'Number',
              desc: '专业code',
            }, {
              name: 'targetType',
              type: 'Enum',
              desc: '审查对象 draw 图纸|model 模型|view 视图|option 应用选项 ex: "draw"',
              required: true,
            }, {
              name: 'reviewType',
              type: 'Enum',
              desc: '审查类型 DESIGN_QUALITY 设计质量审查 | MODEL_QUALITY 相符性审查 | OPTION_QUALITY 应用选项审查 ex: "DESIGN_QUALITY"',
              required: true,
            }, {
              name: 'currentFileInfo',
              type: "Object",
              desc: '当前图纸或模型或视图数据 ex: {baseFileBizId: null,modelBizId: null,modelName: "",drawingBizId: null,drawingName: "",drawingNumber: "",viewBizId: null,viewName: ""}',
              required: true
            }, {
              name: 'optionInfo',
              type: 'Object',
              desc: '应用选项文件信息，ex: {fileName: "应用选项文件名", optionBizId: null, optionName: "应用选项名", optionType: "选项分类EnumCode"}'
            }, {
              name: 'buildingInfo',
              type: 'Object',
              desc: '单体信息，ex: {buildingId: 1, buildingName: "单体1"}'
            }, {
              name: 'models',
              type: 'Array',
              desc: '模型列表 ex: [{modelBizId: null, modelName: "模型名", viewBizId: null, viewName: "视图名", viewType: ""}]'
            }, {
              name: 'drawings',
              type: 'Array',
              desc: '图纸列表 ex: [{drawingBizId: null, drawingName: "图名", drawingNumber: "图号"}]'
            }
          ]
        }
      ]
    }, {
      title: 'Methods',
      list: [
        {
          label: 'load(el)',
          desc: '挂载函数，将view挂载到dom节点',
          parameters: [
            {
              name: 'el',
              type: 'String',
              desc: '指定挂载到的dom节点id, ex: "#app", 若不传则采用创建Model时传入的默认节点',
            }
          ]
        }, {
          label: 'unload()',
          desc: '卸载函数，隐藏或删除该框体时需显式调用',
        }
      ]
    }
  ]
}
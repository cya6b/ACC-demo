let opinionData = {
  status: "FINISH",
  tabs: [
    {
      tabType: 'notPass',
      tabName: "不符合", // tab页名称
      list: [
        {
          status: '0',
          name: "《住宅设计规范》GB50096 6.3.1", // 名称
          articleContent: "<p>楼梯梯段净宽不应小于1．10m，不超过六层的住宅，一边设有栏杆的梯段净宽不应小于1．00m。</p>",
          opinionText: "不符合:《住宅设计规范》GB50096 6.3.1楼梯净宽", // 内容
          checkPointCount: "1", // 审查点个数
          errCount: "6", // 问题数量
          strong: false, // 是否强条
          detail: [ // 详情
            {
              drawingId: "", // 图纸id
              modelId: "", // 模型id

              adoption: false,
              content: "楼梯净宽",
              message: "违反审查规则：楼梯净宽", // 意见内容
              elementResults: [
                {
                  status: '0',
                  result: "楼梯2976461：楼梯的梯段宽度有误", // 信息
                  componentId: 2976461, // 构件id
                  componentName: "现场浇注楼梯: 直段单跑楼梯-4", // 构件名称              
                  viewEleBox: null // 构件包围盒信息
                },
                {
                  status: '0',
                  result: "楼梯2699443：楼梯的梯段宽度有误", // 信息
                  componentId: 2699443, // 构件id
                  componentName: "现场浇注楼梯: 大堂楼梯", // 构件名称              
                  viewEleBox: null // 构件包围盒信息
                },
                {
                  status: '0',
                  result: "楼梯2699741：楼梯的梯段宽度有误", // 信息
                  componentId: 2699741, // 构件id
                  componentName: "现场浇注楼梯: 大堂楼梯", // 构件名称              
                  viewEleBox: null // 构件包围盒信息
                },
                {
                  status: '0',
                  result: "楼梯3043412：楼梯的梯段宽度有误", // 信息
                  componentId: 3043412, // 构件id
                  componentName: "现场浇注楼梯: 大堂楼梯", // 构件名称              
                  viewEleBox: null // 构件包围盒信息
                },
                {
                  status: '0',
                  result: "楼梯3026486：楼梯的梯段宽度有误", // 信息
                  componentId: 3026486, // 构件id
                  componentName: "现场浇注楼梯: 剪刀楼梯-5", // 构件名称              
                  viewEleBox: null // 构件包围盒信息
                },
                {
                  status: '0',
                  result: "楼梯3029213：楼梯的梯段宽度有误", // 信息
                  componentId: 3029213, // 构件id
                  componentName: "现场浇注楼梯: 剪刀楼梯-5", // 构件名称              
                  viewEleBox: null // 构件包围盒信息
                },
              ]
            }
          ]
        },
      ]
    },
    {
      status: "1",
      tabName: "通过",
      tabType: "pass",
      count: 1,
      list: [
        {
          status: "1",
          name: "《住宅设计规范》GB50096 6.3.1",
          articleContent: "<p>楼梯梯段净宽不应小于1．10m，不超过六层的住宅，一边设有栏杆的梯段净宽不应小于1．00m。</p>",
          opinionText: "《住宅设计规范》GB50096 6.3.1",
          checkPointCount: 1,
          passCount: 31,
          errCount: 0,
          doubtCount: 0,
          elementNum: 0,
          strong: true,
          adoption: false,
          detail: [
            {
              drawingId: "",
              modelId: "",
              status: "1",
              message: "楼梯净宽",
              content: "楼梯净宽",
              elementResults: [
                {
                  result: "当前建筑双跑楼梯一跑梯段宽度是：1200.0(规范值: 大于等于1200) 且 二跑梯段宽度是：1200.0(规范值: 大于等于1200)",
                  componentId: "3042823",
                  componentName: "现场浇注楼梯: 剪刀楼梯-5",
                  viewEleBox: null,
                  elementState: 1,
                  status: "1"
                },
                {
                  result: "当前建筑双跑楼梯一跑梯段宽度是：1200.0(规范值: 大于等于1200) 且 二跑梯段宽度是：1200.0(规范值: 大于等于1200)",
                  componentId: "3042089",
                  componentName: "现场浇注楼梯: 剪刀楼梯-5",
                  viewEleBox: null,
                  elementState: 1,
                  status: "1"
                },
                {
                  result: "当前建筑双跑楼梯一跑梯段宽度是：1200.0(规范值: 大于等于1200) 且 二跑梯段宽度是：1200.0(规范值: 大于等于1200)",
                  componentId: "3054697",
                  componentName: "现场浇注楼梯: 剪刀楼梯-5",
                  viewEleBox: null,
                  elementState: 1,
                  status: "1"
                },
                {
                  result: "当前建筑双跑楼梯一跑梯段宽度是：1400.0(规范值: 大于等于1200)",
                  componentId: "3043412",
                  componentName: "现场浇注楼梯: 大堂楼梯",
                  viewEleBox: null,
                  elementState: 1,
                  status: "1"
                },
                {
                  result: "当前建筑双跑楼梯一跑梯段宽度是：1200.0(规范值: 大于等于1200) 且 二跑梯段宽度是：1200.0(规范值: 大于等于1200)",
                  componentId: "3040569",
                  componentName: "现场浇注楼梯: 大堂楼梯",
                  viewEleBox: null,
                  elementState: 1,
                  status: "1"
                },
                {
                  result: "当前建筑双跑楼梯一跑梯段宽度是：11201.174(规范值: 大于等于1200)",
                  componentId: "3110997",
                  componentName: "现场浇注楼梯: 剪刀楼梯-5",
                  viewEleBox: null,
                  elementState: 1,
                  status: "1"
                },
                {
                  result: "当前建筑双跑楼梯一跑梯段宽度是：1200.0(规范值: 大于等于1200) 且 二跑梯段宽度是：1200.0(规范值: 大于等于1200)",
                  componentId: "3029213",
                  componentName: "现场浇注楼梯: 剪刀楼梯-5",
                  viewEleBox: null,
                  elementState: 1,
                  status: "1"
                },
                {
                  result: "当前建筑双跑楼梯一跑梯段宽度是：1200.0(规范值: 大于等于1200) 且 二跑梯段宽度是：1200.0(规范值: 大于等于1200)",
                  componentId: "3018305",
                  componentName: "现场浇注楼梯: 剪刀楼梯-5",
                  viewEleBox: null,
                  elementState: 1,
                  status: "1"
                },
                {
                  result: "当前建筑双跑楼梯一跑梯段宽度是：1200.0(规范值: 大于等于1200) 且 二跑梯段宽度是：1200.0(规范值: 大于等于1200)",
                  componentId: "3021032",
                  componentName: "现场浇注楼梯: 剪刀楼梯-5",
                  viewEleBox: null,
                  elementState: 1,
                  status: "1"
                },
                {
                  result: "当前建筑双跑楼梯一跑梯段宽度是：1200.0(规范值: 大于等于1200) 且 二跑梯段宽度是：1200.0(规范值: 大于等于1200)",
                  componentId: "3026486",
                  componentName: "现场浇注楼梯: 剪刀楼梯-5",
                  viewEleBox: null,
                  elementState: 1,
                  status: "1"
                },
                {
                  result: "当前建筑双跑楼梯一跑梯段宽度是：1200.0(规范值: 大于等于1200) 且 二跑梯段宽度是：1200.0(规范值: 大于等于1200)",
                  componentId: "3023759",
                  componentName: "现场浇注楼梯: 剪刀楼梯-5",
                  viewEleBox: null,
                  elementState: 1,
                  status: "1"
                },
                {
                  result: "当前建筑双跑楼梯一跑梯段宽度是：1200.0(规范值: 大于等于1200) 且 二跑梯段宽度是：1200.0(规范值: 大于等于1200)",
                  componentId: "3010124",
                  componentName: "现场浇注楼梯: 剪刀楼梯-5",
                  viewEleBox: null,
                  elementState: 1,
                  status: "1"
                },
                {
                  result: "当前建筑双跑楼梯一跑梯段宽度是：1400.0(规范值: 大于等于1200)",
                  componentId: "3007379",
                  componentName: "现场浇注楼梯: 剪刀楼梯-5 2-修改",
                  viewEleBox: null,
                  elementState: 1,
                  status: "1"
                },
                {
                  result: "当前建筑双跑楼梯一跑梯段宽度是：1200.0(规范值: 大于等于1200) 且 二跑梯段宽度是：1200.0(规范值: 大于等于1200)",
                  componentId: "3015578",
                  componentName: "现场浇注楼梯: 剪刀楼梯-5",
                  viewEleBox: null,
                  elementState: 1,
                  status: "1"
                },
                {
                  result: "当前建筑双跑楼梯一跑梯段宽度是：1200.0(规范值: 大于等于1200) 且 二跑梯段宽度是：1200.0(规范值: 大于等于1200)",
                  componentId: "3012851",
                  componentName: "现场浇注楼梯: 剪刀楼梯-5",
                  viewEleBox: null,
                  elementState: 1,
                  status: "1"
                },
                {
                  result: "当前建筑双跑楼梯一跑梯段宽度是：1200.0(规范值: 大于等于1200)",
                  componentId: "2976461",
                  componentName: "现场浇注楼梯: 直段单跑楼梯-4",
                  viewEleBox: null,
                  elementState: 1,
                  status: "1"
                },
                {
                  result: "当前建筑双跑楼梯一跑梯段宽度是：1200.0(规范值: 大于等于1200) 且 二跑梯段宽度是：1200.0(规范值: 大于等于1200)",
                  componentId: "2958633",
                  componentName: "现场浇注楼梯: 剪刀楼梯-5",
                  viewEleBox: null,
                  elementState: 1,
                  status: "1"
                },
                {
                  result: "当前建筑双跑楼梯一跑梯段宽度是：1200.0(规范值: 大于等于1200) 且 二跑梯段宽度是：1200.0(规范值: 大于等于1200)",
                  componentId: "2964087",
                  componentName: "现场浇注楼梯: 剪刀楼梯-5",
                  viewEleBox: null,
                  elementState: 1,
                  status: "1"
                },
                {
                  result: "当前建筑双跑楼梯一跑梯段宽度是：1200.0(规范值: 大于等于1200) 且 二跑梯段宽度是：1200.0(规范值: 大于等于1200)",
                  componentId: "2961360",
                  componentName: "现场浇注楼梯: 剪刀楼梯-5",
                  viewEleBox: null,
                  elementState: 1,
                  status: "1"
                },
                {
                  result: "当前建筑双跑楼梯一跑梯段宽度是：1200.0(规范值: 大于等于1200) 且 二跑梯段宽度是：1200.0(规范值: 大于等于1200)",
                  componentId: "2950452",
                  componentName: "现场浇注楼梯: 剪刀楼梯-5",
                  viewEleBox: null,
                  elementState: 1,
                  status: "1"
                },
                {
                  result: "当前建筑双跑楼梯一跑梯段宽度是：1200.0(规范值: 大于等于1200) 且 二跑梯段宽度是：1200.0(规范值: 大于等于1200)",
                  componentId: "2947725",
                  componentName: "现场浇注楼梯: 剪刀楼梯-5",
                  viewEleBox: null,
                  elementState: 1,
                  status: "1"
                },
                {
                  result: "当前建筑双跑楼梯一跑梯段宽度是：1200.0(规范值: 大于等于1200) 且 二跑梯段宽度是：1200.0(规范值: 大于等于1200)",
                  componentId: "2955906",
                  componentName: "现场浇注楼梯: 剪刀楼梯-5",
                  viewEleBox: null,
                  elementState: 1,
                  status: "1"
                },
                {
                  result: "当前建筑双跑楼梯一跑梯段宽度是：1200.0(规范值: 大于等于1200) 且 二跑梯段宽度是：1200.0(规范值: 大于等于1200)",
                  componentId: "2953179",
                  componentName: "现场浇注楼梯: 剪刀楼梯-5",
                  viewEleBox: null,
                  elementState: 1,
                  status: "1"
                },
                {
                  result: "当前建筑双跑楼梯一跑梯段宽度是：1200.0(规范值: 大于等于1200) 且 二跑梯段宽度是：1200.0(规范值: 大于等于1200)",
                  componentId: "2939544",
                  componentName: "现场浇注楼梯: 剪刀楼梯-5",
                  viewEleBox: null,
                  elementState: 1,
                  status: "1"
                },
                {
                  result: "当前建筑双跑楼梯一跑梯段宽度是：1200.0(规范值: 大于等于1200) 且 二跑梯段宽度是：1200.0(规范值: 大于等于1200)",
                  componentId: "2936817",
                  componentName: "现场浇注楼梯: 剪刀楼梯-5",
                  viewEleBox: null,
                  elementState: 1,
                  status: "1"
                },
                {
                  result: "当前建筑双跑楼梯一跑梯段宽度是：1200.0(规范值: 大于等于1200) 且 二跑梯段宽度是：1200.0(规范值: 大于等于1200)",
                  componentId: "2944998",
                  componentName: "现场浇注楼梯: 剪刀楼梯-5",
                  viewEleBox: null,
                  elementState: 1,
                  status: "1"
                },
                {
                  result: "当前建筑双跑楼梯一跑梯段宽度是：1200.0(规范值: 大于等于1200) 且 二跑梯段宽度是：1200.0(规范值: 大于等于1200)",
                  componentId: "2942271",
                  componentName: "现场浇注楼梯: 剪刀楼梯-5",
                  viewEleBox: null,
                  elementState: 1,
                  status: "1"
                },
                {
                  result: "当前建筑双跑楼梯一跑梯段宽度是：1200.0(规范值: 大于等于1200)",
                  componentId: "2699741",
                  componentName: "现场浇注楼梯: 大堂楼梯",
                  viewEleBox: null,
                  elementState: 1,
                  status: "1"
                },
                {
                  result: "当前建筑双跑楼梯一跑梯段宽度是：1200.0(规范值: 大于等于1200)",
                  componentId: "2699443",
                  componentName: "现场浇注楼梯: 大堂楼梯",
                  viewEleBox: null,
                  elementState: 1,
                  status: "1"
                },
                {
                  result: "当前建筑双跑楼梯一跑梯段宽度是：1200.0(规范值: 大于等于1200) 且 二跑梯段宽度是：1200.0(规范值: 大于等于1200)",
                  componentId: "2934090",
                  componentName: "现场浇注楼梯: 剪刀楼梯-5",
                  viewEleBox: null,
                  elementState: 1,
                  status: "1"
                },
                {
                  result: "当前建筑双跑楼梯一跑梯段宽度是：1200.0(规范值: 大于等于1200) 且 二跑梯段宽度是：1200.0(规范值: 大于等于1200)",
                  componentId: "2931363",
                  componentName: "现场浇注楼梯: 剪刀楼梯-5",
                  viewEleBox: null,
                  elementState: 1,
                  status: "1"
                }
              ]
            }
          ]
        }
      ]
    },
    {
      status: "2",
      tabName: "未审查",
      tabType: "unexamined",
      count: 1,
      list: [
          {
              status: "2",
              name: "《住宅建筑规范》GB 50368 5.3.4",
              articleContent: "<p>供轮椅通行的走道和通道净宽不应小于1.20m。<br/></p>",
              opinionText: "《住宅建筑规范》GB 50368 5.3.4",
              checkPointCount: 1,
              passCount: 0,
              errCount: 0,
              doubtCount: 0,
              elementNum: 0,
              strong: true,
              adoption: false,
              detail: [
                  {
                      drawingId: "",
                      modelId: "",
                      status: "2",
                      message: "当前建筑电梯数量为：0（规范值：大于0）,无需审查",
                      content: "走廊等公共部位净宽",
                      elementResults: []
                  }
              ]
          }
      ]
    },
    {
      status: "-1",
      tabName: "存疑",
      tabType: "doubt",
      count: 1,
      list: [
          {
              status: "-1",
              name: "《住宅设计规范》GB50096 6.3.5",
              articleContent: "<p>楼梯井净宽大于0.11m时，必须采取防止儿童攀滑的措施。</p>",
              opinionText: "由于缺少构件或构件相关属性，无法审查《住宅设计规范》GB50096 6.3.5梯井防护措施",
              checkPointCount: 1,
              passCount: 0,
              errCount: 0,
              doubtCount: 31,
              elementNum: 0,
              strong: true,
              adoption: false,
              detail: [
                  {
                      drawingId: "",
                      modelId: "",
                      status: "-1",
                      message: "当前建筑双跑楼梯梯井宽度未提取到有效值，请检查此属性",
                      content: "梯井防护措施",
                      elementResults: [
                          {
                              result: "当前建筑双跑楼梯梯井宽度未提取到有效值，请检查此属性",
                              componentId: "3042823",
                              componentName: "现场浇注楼梯: 剪刀楼梯-5",
                              viewEleBox: null,
                              elementState: -1,
                              status: "-1"
                          },
                          {
                              result: "当前建筑双跑楼梯梯井宽度未提取到有效值，请检查此属性",
                              componentId: "3042089",
                              componentName: "现场浇注楼梯: 剪刀楼梯-5",
                              viewEleBox: null,
                              elementState: -1,
                              status: "-1"
                          },
                          {
                              result: "当前建筑双跑楼梯梯井宽度未提取到有效值，请检查此属性",
                              componentId: "3054697",
                              componentName: "现场浇注楼梯: 剪刀楼梯-5",
                              viewEleBox: null,
                              elementState: -1,
                              status: "-1"
                          },
                          {
                              result: "当前建筑双跑楼梯梯井宽度未提取到有效值，请检查此属性",
                              componentId: "3043412",
                              componentName: "现场浇注楼梯: 大堂楼梯",
                              viewEleBox: null,
                              elementState: -1,
                              status: "-1"
                          },
                          {
                              result: "当前建筑双跑楼梯梯井宽度未提取到有效值，请检查此属性",
                              componentId: "3040569",
                              componentName: "现场浇注楼梯: 大堂楼梯",
                              viewEleBox: null,
                              elementState: -1,
                              status: "-1"
                          },
                          {
                              result: "当前建筑双跑楼梯梯井宽度未提取到有效值，请检查此属性",
                              componentId: "3110997",
                              componentName: "现场浇注楼梯: 剪刀楼梯-5",
                              viewEleBox: null,
                              elementState: -1,
                              status: "-1"
                          },
                          {
                              result: "当前建筑双跑楼梯梯井宽度未提取到有效值，请检查此属性",
                              componentId: "3029213",
                              componentName: "现场浇注楼梯: 剪刀楼梯-5",
                              viewEleBox: null,
                              elementState: -1,
                              status: "-1"
                          },
                          {
                              result: "当前建筑双跑楼梯梯井宽度未提取到有效值，请检查此属性",
                              componentId: "3018305",
                              componentName: "现场浇注楼梯: 剪刀楼梯-5",
                              viewEleBox: null,
                              elementState: -1,
                              status: "-1"
                          },
                          {
                              result: "当前建筑双跑楼梯梯井宽度未提取到有效值，请检查此属性",
                              componentId: "3021032",
                              componentName: "现场浇注楼梯: 剪刀楼梯-5",
                              viewEleBox: null,
                              elementState: -1,
                              status: "-1"
                          },
                          {
                              result: "当前建筑双跑楼梯梯井宽度未提取到有效值，请检查此属性",
                              componentId: "3026486",
                              componentName: "现场浇注楼梯: 剪刀楼梯-5",
                              viewEleBox: null,
                              elementState: -1,
                              status: "-1"
                          },
                          {
                              result: "当前建筑双跑楼梯梯井宽度未提取到有效值，请检查此属性",
                              componentId: "3023759",
                              componentName: "现场浇注楼梯: 剪刀楼梯-5",
                              viewEleBox: null,
                              elementState: -1,
                              status: "-1"
                          },
                          {
                              result: "当前建筑双跑楼梯梯井宽度未提取到有效值，请检查此属性",
                              componentId: "3010124",
                              componentName: "现场浇注楼梯: 剪刀楼梯-5",
                              viewEleBox: null,
                              elementState: -1,
                              status: "-1"
                          },
                          {
                              result: "当前建筑双跑楼梯梯井宽度未提取到有效值，请检查此属性",
                              componentId: "3007379",
                              componentName: "现场浇注楼梯: 剪刀楼梯-5 2-修改",
                              viewEleBox: null,
                              elementState: -1,
                              status: "-1"
                          },
                          {
                              result: "当前建筑双跑楼梯梯井宽度未提取到有效值，请检查此属性",
                              componentId: "3015578",
                              componentName: "现场浇注楼梯: 剪刀楼梯-5",
                              viewEleBox: null,
                              elementState: -1,
                              status: "-1"
                          },
                          {
                              result: "当前建筑双跑楼梯梯井宽度未提取到有效值，请检查此属性",
                              componentId: "3012851",
                              componentName: "现场浇注楼梯: 剪刀楼梯-5",
                              viewEleBox: null,
                              elementState: -1,
                              status: "-1"
                          },
                          {
                              result: "当前建筑双跑楼梯梯井宽度未提取到有效值，请检查此属性",
                              componentId: "2976461",
                              componentName: "现场浇注楼梯: 直段单跑楼梯-4",
                              viewEleBox: null,
                              elementState: -1,
                              status: "-1"
                          },
                          {
                              result: "当前建筑双跑楼梯梯井宽度未提取到有效值，请检查此属性",
                              componentId: "2958633",
                              componentName: "现场浇注楼梯: 剪刀楼梯-5",
                              viewEleBox: null,
                              elementState: -1,
                              status: "-1"
                          },
                          {
                              result: "当前建筑双跑楼梯梯井宽度未提取到有效值，请检查此属性",
                              componentId: "2964087",
                              componentName: "现场浇注楼梯: 剪刀楼梯-5",
                              viewEleBox: null,
                              elementState: -1,
                              status: "-1"
                          },
                          {
                              result: "当前建筑双跑楼梯梯井宽度未提取到有效值，请检查此属性",
                              componentId: "2961360",
                              componentName: "现场浇注楼梯: 剪刀楼梯-5",
                              viewEleBox: null,
                              elementState: -1,
                              status: "-1"
                          },
                          {
                              result: "当前建筑双跑楼梯梯井宽度未提取到有效值，请检查此属性",
                              componentId: "2950452",
                              componentName: "现场浇注楼梯: 剪刀楼梯-5",
                              viewEleBox: null,
                              elementState: -1,
                              status: "-1"
                          },
                          {
                              result: "当前建筑双跑楼梯梯井宽度未提取到有效值，请检查此属性",
                              componentId: "2947725",
                              componentName: "现场浇注楼梯: 剪刀楼梯-5",
                              viewEleBox: null,
                              elementState: -1,
                              status: "-1"
                          },
                          {
                              result: "当前建筑双跑楼梯梯井宽度未提取到有效值，请检查此属性",
                              componentId: "2955906",
                              componentName: "现场浇注楼梯: 剪刀楼梯-5",
                              viewEleBox: null,
                              elementState: -1,
                              status: "-1"
                          },
                          {
                              result: "当前建筑双跑楼梯梯井宽度未提取到有效值，请检查此属性",
                              componentId: "2953179",
                              componentName: "现场浇注楼梯: 剪刀楼梯-5",
                              viewEleBox: null,
                              elementState: -1,
                              status: "-1"
                          },
                          {
                              result: "当前建筑双跑楼梯梯井宽度未提取到有效值，请检查此属性",
                              componentId: "2939544",
                              componentName: "现场浇注楼梯: 剪刀楼梯-5",
                              viewEleBox: null,
                              elementState: -1,
                              status: "-1"
                          },
                          {
                              result: "当前建筑双跑楼梯梯井宽度未提取到有效值，请检查此属性",
                              componentId: "2936817",
                              componentName: "现场浇注楼梯: 剪刀楼梯-5",
                              viewEleBox: null,
                              elementState: -1,
                              status: "-1"
                          },
                          {
                              result: "当前建筑双跑楼梯梯井宽度未提取到有效值，请检查此属性",
                              componentId: "2944998",
                              componentName: "现场浇注楼梯: 剪刀楼梯-5",
                              viewEleBox: null,
                              elementState: -1,
                              status: "-1"
                          },
                          {
                              result: "当前建筑双跑楼梯梯井宽度未提取到有效值，请检查此属性",
                              componentId: "2942271",
                              componentName: "现场浇注楼梯: 剪刀楼梯-5",
                              viewEleBox: null,
                              elementState: -1,
                              status: "-1"
                          },
                          {
                              result: "当前建筑双跑楼梯梯井宽度未提取到有效值，请检查此属性",
                              componentId: "2699741",
                              componentName: "现场浇注楼梯: 大堂楼梯",
                              viewEleBox: null,
                              elementState: -1,
                              status: "-1"
                          },
                          {
                              result: "当前建筑双跑楼梯梯井宽度未提取到有效值，请检查此属性",
                              componentId: "2699443",
                              componentName: "现场浇注楼梯: 大堂楼梯",
                              viewEleBox: null,
                              elementState: -1,
                              status: "-1"
                          },
                          {
                              result: "当前建筑双跑楼梯梯井宽度未提取到有效值，请检查此属性",
                              componentId: "2934090",
                              componentName: "现场浇注楼梯: 剪刀楼梯-5",
                              viewEleBox: null,
                              elementState: -1,
                              status: "-1"
                          },
                          {
                              result: "当前建筑双跑楼梯梯井宽度未提取到有效值，请检查此属性",
                              componentId: "2931363",
                              componentName: "现场浇注楼梯: 剪刀楼梯-5",
                              viewEleBox: null,
                              elementState: -1,
                              status: "-1"
                          }
                      ]
                  }
              ]
          }
      ]
    }
  ],
}

export default opinionData
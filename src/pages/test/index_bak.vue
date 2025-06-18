<template>
  <div class="app_clz">
    <!-- <Model></Model> -->
    <!-- <Review ref="reviewRef" style="width:calc(100% - 450px)" :ableAutoLink="true" :source="source" :afterLoad="reviewLoaded"></Review>
    <ReviewResult ref="reviewResult" v-if="showResult && show"
      :closeHandle="() => show = false"
      :adoptClickHandle="adoptClickListener"
      :sourceData="reviewResultData" :outerChin="reviewRef"></ReviewResult> -->
    <!-- <ReviewResult v-if="show2"
      :closeHandle="() => show2 = false"
      modeType="Compliance"
      :sourceData="compareResultData"></ReviewResult> -->
      <!-- <ModelSet :source="modelSetSource"></ModelSet> -->

    <!-- <div style="padding: 8px;z-index: 9;background: #fff;">
      <span style="cursor:pointer;padding:4px;background:#faa" @click="resetComplianceSource">更换数据</span>
      <span> | </span>
      <span style="cursor:pointer;padding:4px;background:#faa"
        @click="cEditable = !cEditable"> {{
          cEditable ? '切换为查看' : '切换为编辑'
      }}</span>
    </div>
    <div style="position:relative;height:calc(100% - 48px);margin:0px 6px">
      <Compliance
        :editable="cEditable"
        :source="complianceSource"
        :startSelectDrawingEvent="startSelectDrawingEvent"
        :endSelectDrawingEvent="endSelectDrawingEvent"
        :smartLinkEvent="smartLinkEvent"
        :handlinkConfirmEvent="handlinkConfirmEvent"></Compliance>
      <SelectDrawing
        v-if="drawingSelectData.drawingSelectBoxShow"
        :defaultDrawingId="drawingSelectData.defaultDrawingId"
        :drawingList="drawingSelectData.drawingList"
        @drawingChange="drawingSelect"
        class="select_drawing"
      />
    </div> -->

    <!-- <FileDirectory :sourceParams="{
      containerId: '773678608302080',
      folderId: null
    }"
    :editable="true"></FileDirectory> -->

    <Scene></Scene>
  </div>
</template>
<script setup>
import Model from '../lib/Model'
import Review from './components/view/Review.vue';
import ReviewResult from './components/view/aiRes/ReviewResult.vue';
import ModelSet from './components/view/model/ModelSet.vue';
import SelectDrawing from './components/view/compliance/selectDrawing.vue'
import { onMounted, ref, reactive } from 'vue'
import demoToken from '../public/demoToken'
import Compliance from './components/view/compliance/index.vue';

import FileDirectory from './components/service/fileDirectory/index.vue'

import Scene from './pages/scene/index.vue'
let showResult = reactive(false)
// review demo start
let show = reactive(true)
const reviewRef = ref(null)
let source = reactive({
  main: {
    source: {
      type: "model3d",
      token: demoToken.token3d_3
    }
  },
  sub: {
    source: {
      type: "modelsheet",
      token: demoToken.token3d_3,
      sheetId: demoToken.token3d_3_sheetId
    },
    subList: [{
      name: "图纸1",
      type: "modelsheet",
      token: demoToken.token3d_3,
      sheetId: demoToken.token3d_3_sheetId,
      autoLink: {
        source: {
          name: "J0-11 - 总平面图",
          type: "modelsheet",
          token: demoToken.token3d_3,
          sheetId: demoToken.token3d_3_sheetId,
        },
        matric: {
          drawingPoints: [0,0,1000,1000],
          sheetPoints: [0,0,1000,1000]
        }
      }
    }, {
      name: "图纸2",
      type: "model3d",
      token: demoToken.token3d_2
    }, {
      name: "图纸3（与模型同一个）",
      type: "model3d",
      token: demoToken.token3d
    }],
  }
})
onMounted(()=> {
})
function setMarkupList () {
  reviewRef.value.main.viewer.setMarkupList([
    {
      annor: {
        label: '1',
        contentHTML: '<span>1: 346464464646</span>',
        elementId: '505597'
      }
    },
    {
      annor: {
        label: '2',
        contentHTML: '<span>2: 54756776756567756</span>',
        elementId: '489587'
      }
    },
    {
      annor: {
        label: '3',
        contentHTML: '<span>3: 男卫生间</span>',
        elementId: '439362'
      }
    }
  ])
}

function reviewLoaded () {
  // setMarkupList()
  showResult.value = true
}
// review demo end

// reviewResult demo start
const reviewResultData = reactive({
  viewer: null,
  status: "FINISH",
  tabs: [
    {
      tabName: "未通过", // tab页名称
      tabType: 'notPass',
      list: [
        {
          name: "《住宅设计规范》GB50096 6.3.1", // 名称
          articleContent: "5346344444444444353533535435",
          opinionText: "意见内容1", // 内容
          checkPointCount: "1", // 审查点个数
          errCount: "3", // 问题数量
          strong: false, // 是否强条
          detail: [ // 详情
            {
              drawingId: "", // 图纸id
              modelId: "", // 模型id

              message: "意见内容1", // 意见内容
              elementResults: [
                {
                  result: "res1", // 信息
                  componentId: 505597, // 构件id
                  componentName: "bb", // 构件名称              
                  viewEleBox: null,// 构件包围盒信息
                },
                {
                  result: "res1", // 信息
                  componentId: 505597, // 构件id
                  componentName: "bb", // 构件名称              
                  viewEleBox: null,// 构件包围盒信息
                },
                {
                  result: "res1", // 信息
                  componentId: 489587, // 构件id
                  componentName: "bb", // 构件名称              
                  viewEleBox: null,// 构件包围盒信息
                },
                {
                  result: "res1", // 信息
                  componentId: 505597, // 构件id
                  componentName: "bb", // 构件名称              
                  viewEleBox: null,// 构件包围盒信息
                },
                {
                  result: "res1", // 信息
                  componentId: 489587, // 构件id
                  componentName: "bb", // 构件名称              
                  viewEleBox: null,// 构件包围盒信息
                },
                {
                  result: "res1", // 信息
                  componentId: 489587, // 构件id
                  componentName: "bb", // 构件名称              
                  viewEleBox: null,// 构件包围盒信息
                },
                {
                  result: "res1", // 信息
                  componentId: 489587, // 构件id
                  componentName: "bb", // 构件名称              
                  viewEleBox: null,// 构件包围盒信息
                },
                {
                  result: "res1", // 信息
                  componentId: 489587, // 构件id
                  componentName: "bb", // 构件名称              
                  viewEleBox: null,// 构件包围盒信息
                },
                {
                  result: "res1", // 信息
                  componentId: 489587, // 构件id
                  componentName: "bb", // 构件名称              
                  viewEleBox: null,// 构件包围盒信息
                },
                {
                  result: "res1", // 信息
                  componentId: 489587, // 构件id
                  componentName: "bb", // 构件名称              
                  viewEleBox: null,// 构件包围盒信息
                },
                {
                  result: "res1", // 信息
                  componentId: 489587, // 构件id
                  componentName: "bb", // 构件名称              
                  viewEleBox: null,// 构件包围盒信息
                }
              ]
            }
          ]
        },
        {
          name: "《住宅设计规范》GB50097 6.3.3", // 名称
          articleContent: "5346344444444444353533535435",
          opinionText: "意见内容2", // 内容
          checkPointCount: "1", // 审查点个数
          errCount: "3", // 问题数量
          strong: true, // 是否强条
          detail: [ // 详情
            {
              drawingId: "", // 图纸id
              modelId: "", // 模型id
              message: "意见内容22", // 意见内容
              status: "-1", // 状态 -1 存疑， 0 未通过
              elementResults: [
                {
                  result: "res2", // 信息
                  componentId: 489587, // 构件id
                  componentName: "aa", // 构件名称              
                  viewEleBox: [ // 构件包围盒信息
                    {x: 1, y: 1},
                    {x: 2, y: 2}
                  ],
                },
                {
                  result: "res2", // 信息
                  componentId: 489587, // 构件id
                  componentName: "aa", // 构件名称              
                  viewEleBox: [ // 构件包围盒信息
                    {x: 1, y: 1},
                    {x: 2, y: 2}
                  ],
                },
                {
                  result: "res2", // 信息
                  componentId: 489587, // 构件id
                  componentName: "aa", // 构件名称              
                  viewEleBox: [ // 构件包围盒信息
                    {x: 1, y: 1},
                    {x: 2, y: 2}
                  ],
                }
              ]
            },
            {
              drawingId: "", // 图纸id
              modelId: "", // 模型id
              message: "意见内容22", // 意见内容
              status: "-1", // 状态 -1 存疑， 0 未通过
              elementResults: [
                {
                  result: "res2", // 信息
                  componentId: 489587, // 构件id
                  componentName: "aa", // 构件名称              
                  viewEleBox: null,// 构件包围盒信息
                },
                {
                  result: "res2", // 信息
                  componentId: 489587, // 构件id
                  componentName: "aa", // 构件名称              
                  viewEleBox: null,// 构件包围盒信息
                },
                {
                  result: "res2", // 信息
                  componentId: 489587, // 构件id
                  componentName: "aa", // 构件名称              
                  viewEleBox: null,// 构件包围盒信息
                }
              ]
            }
          ]
        },
        {
          name: "《住宅设计规范》GB50097 6.3.3", // 名称
          articleContent: "5346344444444444353533535435",
          opinionText: "意见内容2", // 内容
          checkPointCount: "1", // 审查点个数
          errCount: "3", // 问题数量
          strong: true, // 是否强条
          detail: [ // 详情
            {
              drawingId: "", // 图纸id
              modelId: "", // 模型id
              message: "意见内容22", // 意见内容
              status: "-1", // 状态 -1 存疑， 0 未通过
              elementResults: [
                {
                  result: "res2", // 信息
                  componentId: 489587, // 构件id
                  componentName: "aa", // 构件名称              
                  viewEleBox: null,// 构件包围盒信息
                },
                {
                  result: "res2", // 信息
                  componentId: 489587, // 构件id
                  componentName: "aa", // 构件名称              
                  viewEleBox: null,// 构件包围盒信息
                },
                {
                  result: "res2", // 信息
                  componentId: 489587, // 构件id
                  componentName: "aa", // 构件名称              
                  viewEleBox: null,// 构件包围盒信息
                }
              ]
            },
            {
              drawingId: "", // 图纸id
              modelId: "", // 模型id
              message: "意见内容22", // 意见内容
              status: "-1", // 状态 -1 存疑， 0 未通过
              elementResults: [
                {
                  result: "res2", // 信息
                  componentId: 489587, // 构件id
                  componentName: "aa", // 构件名称              
                  viewEleBox: [ // 构件包围盒信息
                    {x: 1, y: 1},
                    {x: 2, y: 2}
                  ],
                },
                {
                  result: "res2", // 信息
                  componentId: 489587, // 构件id
                  componentName: "aa", // 构件名称              
                  viewEleBox: [ // 构件包围盒信息
                    {x: 1, y: 1},
                    {x: 2, y: 2}
                  ],
                },
                {
                  result: "res2", // 信息
                  componentId: 489587, // 构件id
                  componentName: "aa", // 构件名称              
                  viewEleBox: [ // 构件包围盒信息
                    {x: 1, y: 1},
                    {x: 2, y: 2}
                  ],
                }
              ]
            }
          ]
        },
        {
          name: "《住宅设计规范》GB50097 6.3.3", // 名称
          articleContent: "5346344444444444353533535435",
          opinionText: "意见内容2", // 内容
          checkPointCount: "1", // 审查点个数
          errCount: "3", // 问题数量
          strong: true, // 是否强条
          detail: [ // 详情
            {
              drawingId: "", // 图纸id
              modelId: "", // 模型id
              message: "意见内容22", // 意见内容
              status: "-1", // 状态 -1 存疑， 0 未通过
              elementResults: [
                {
                  result: "res2", // 信息
                  componentId: 489587, // 构件id
                  componentName: "aa", // 构件名称              
                  viewEleBox: [ // 构件包围盒信息
                    {x: 1, y: 1},
                    {x: 2, y: 2}
                  ],
                },
                {
                  result: "res2", // 信息
                  componentId: 489587, // 构件id
                  componentName: "aa", // 构件名称              
                  viewEleBox: [ // 构件包围盒信息
                    {x: 1, y: 1},
                    {x: 2, y: 2}
                  ],
                },
                {
                  result: "res2", // 信息
                  componentId: 489587, // 构件id
                  componentName: "aa", // 构件名称              
                  viewEleBox: [ // 构件包围盒信息
                    {x: 1, y: 1},
                    {x: 2, y: 2}
                  ],
                }
              ]
            },
            {
              drawingId: "", // 图纸id
              modelId: "", // 模型id
              message: "意见内容22", // 意见内容
              status: "-1", // 状态 -1 存疑， 0 未通过
              elementResults: [
                {
                  result: "res2", // 信息
                  componentId: 489587, // 构件id
                  componentName: "aa", // 构件名称              
                  viewEleBox: [ // 构件包围盒信息
                    {x: 1, y: 1},
                    {x: 2, y: 2}
                  ],
                },
                {
                  result: "res2", // 信息
                  componentId: 489587, // 构件id
                  componentName: "aa", // 构件名称              
                  viewEleBox: [ // 构件包围盒信息
                    {x: 1, y: 1},
                    {x: 2, y: 2}
                  ],
                },
                {
                  result: "res2", // 信息
                  componentId: 489587, // 构件id
                  componentName: "aa", // 构件名称              
                  viewEleBox: [ // 构件包围盒信息
                    {x: 1, y: 1},
                    {x: 2, y: 2}
                  ],
                }
              ]
            }
          ]
        },
        {
          name: "《住宅设计规范》GB50097 6.3.3", // 名称
          articleContent: "5346344444444444353533535435",
          opinionText: "意见内容2", // 内容
          checkPointCount: "1", // 审查点个数
          errCount: "3", // 问题数量
          strong: true, // 是否强条
          detail: [ // 详情
            {
              drawingId: "", // 图纸id
              modelId: "", // 模型id
              message: "意见内容22", // 意见内容
              status: "-1", // 状态 -1 存疑， 0 未通过
              elementResults: [
                {
                  result: "res2", // 信息
                  componentId: 489587, // 构件id
                  componentName: "aa", // 构件名称              
                  viewEleBox: [ // 构件包围盒信息
                    {x: 1, y: 1},
                    {x: 2, y: 2}
                  ],
                },
                {
                  result: "res2", // 信息
                  componentId: 489587, // 构件id
                  componentName: "aa", // 构件名称              
                  viewEleBox: [ // 构件包围盒信息
                    {x: 1, y: 1},
                    {x: 2, y: 2}
                  ],
                },
                {
                  result: "res2", // 信息
                  componentId: 489587, // 构件id
                  componentName: "aa", // 构件名称              
                  viewEleBox: [ // 构件包围盒信息
                    {x: 1, y: 1},
                    {x: 2, y: 2}
                  ],
                }
              ]
            },
            {
              drawingId: "", // 图纸id
              modelId: "", // 模型id
              message: "意见内容22", // 意见内容
              status: "-1", // 状态 -1 存疑， 0 未通过
              elementResults: [
                {
                  result: "res2", // 信息
                  componentId: 489587, // 构件id
                  componentName: "aa", // 构件名称              
                  viewEleBox: [ // 构件包围盒信息
                    {x: 1, y: 1},
                    {x: 2, y: 2}
                  ],
                },
                {
                  result: "res2", // 信息
                  componentId: 489587, // 构件id
                  componentName: "aa", // 构件名称              
                  viewEleBox: [ // 构件包围盒信息
                    {x: 1, y: 1},
                    {x: 2, y: 2}
                  ],
                },
                {
                  result: "res2", // 信息
                  componentId: 489587, // 构件id
                  componentName: "aa", // 构件名称              
                  viewEleBox: [ // 构件包围盒信息
                    {x: 1, y: 1},
                    {x: 2, y: 2}
                  ],
                }
              ]
            }
          ]
        },
        {
          name: "《住宅设计规范》GB50097 6.3.3", // 名称
          articleContent: "5346344444444444353533535435",
          opinionText: "意见内容265555555555555555", // 内容
          checkPointCount: "1", // 审查点个数
          errCount: "3", // 问题数量
          strong: true, // 是否强条
          detail: [ // 详情
            {
              drawingId: "", // 图纸id
              modelId: "", // 模型id
              message: "意见内容22", // 意见内容
              status: "-1", // 状态 -1 存疑， 0 未通过
              elementResults: [
                {
                  result: "res2", // 信息
                  componentId: 505597, // 构件id
                  componentName: "aa", // 构件名称              
                  viewEleBox: null,// 构件包围盒信息
                },
                {
                  result: "res2", // 信息
                  componentId: 505597, // 构件id
                  componentName: "aa", // 构件名称              
                  viewEleBox: null,// 构件包围盒信息
                },
                {
                  result: "res2", // 信息
                  componentId: 489587, // 构件id
                  componentName: "aa", // 构件名称              
                  viewEleBox: null,// 构件包围盒信息
                }
              ]
            },
            {
              drawingId: "", // 图纸id
              modelId: "", // 模型id
              message: "意见内容22", // 意见内容
              status: "-1", // 状态 -1 存疑， 0 未通过
              elementResults: [
                {
                  result: "res254545454", // 信息
                  componentId: 489587, // 构件id
                  componentName: "aa", // 构件名称              
                  viewEleBox: null,// 构件包围盒信息
                },
                {
                  result: "res254545454", // 信息
                  componentId: 489587, // 构件id
                  componentName: "aa", // 构件名称              
                  viewEleBox: null,// 构件包围盒信息
                },
                {
                  result: "res2", // 信息
                  componentId: 489587, // 构件id
                  componentName: "aa545", // 构件名称              
                  viewEleBox: null,// 构件包围盒信息
                }
              ]
            }
          ]
        }
      ]
    }
  ],
})

const adoptClickListener = function (params) {
  setTimeout(() => {
    if (params.data) {
      params.successCallBack && params.successCallBack()
    }
  }, 2000)
}

// reviewResult demo end
const show2 = reactive(true)
const compareResultData = reactive({
  viewer: null,
  status: 'FINISH',
  tabs: [{
    tabName: "不符合", // tab页名称
    tabType: 'notPass',
    list: [
      {
        name: "审查点1", // 名称
        opinionText: "546657675567567756", // 内容
        count: "9", // 数量
        strong: false, // 是否强条
        elementResults: [ // 详情
          {
            drawingId: "456", // 图纸id
            modelId: "123", // 模型id

            componentId: "454", // 构件id
            componentName: "构件名称", // 构件名称              
            viewEleBox: [ // 构件包围盒信息
              {x: 1, y: 1},
              {x: 2, y: 2}
            ],
            message: "6644646644664", // 意见内容
          }
        ]
      },
      {
        name: "审查点2", // 名称
        opinionText: "546657675567567756", // 内容
        count: "9", // 数量
        strong: false, // 是否强条
        elementResults: [ // 详情
          {
            drawingId: "", // 图纸id
            modelId: "", // 模型id

            componentId: 489587, // 构件id
            componentName: "", // 构件名称              
            viewEleBox: [ // 构件包围盒信息
              {x: 1, y: 1},
              {x: 2, y: 2}
            ],
            message: "", // 意见内容
          }
        ]
      },
      {
        name: "审查点3", // 名称
        opinionText: "546657675567567756", // 内容
        count: "9", // 数量
        strong: false, // 是否强条
        elementResults: [ // 详情
          {
            drawingId: "", // 图纸id
            modelId: "", // 模型id

            componentId: 489587, // 构件id
            componentName: "", // 构件名称              
            viewEleBox: [ // 构件包围盒信息
              {x: 1, y: 1},
              {x: 2, y: 2}
            ],
            message: "", // 意见内容
          }
        ]
      },
      {
        name: "审查点4", // 名称
        opinionText: "546657675567567756", // 内容
        count: "9", // 数量
        strong: false, // 是否强条
        elementResults: [ // 详情
          {
            drawingId: "", // 图纸id
            modelId: "", // 模型id

            componentId: 489587, // 构件id
            componentName: "", // 构件名称              
            viewEleBox: [ // 构件包围盒信息
              {x: 1, y: 1},
              {x: 2, y: 2}
            ],
            message: "", // 意见内容
          },
          {
            drawingId: "", // 图纸id
            modelId: "", // 模型id

            componentId: 489587, // 构件id
            componentName: "", // 构件名称              
            viewEleBox: [ // 构件包围盒信息
              {x: 1, y: 1},
              {x: 2, y: 2}
            ],
            message: "", // 意见内容
          },
          {
            drawingId: "", // 图纸id
            modelId: "", // 模型id

            componentId: 489587, // 构件id
            componentName: "", // 构件名称              
            viewEleBox: [ // 构件包围盒信息
              {x: 1, y: 1},
              {x: 2, y: 2}
            ],
            message: "", // 意见内容
          },
          {
            drawingId: "", // 图纸id
            modelId: "", // 模型id

            componentId: 489587, // 构件id
            componentName: "", // 构件名称              
            viewEleBox: [ // 构件包围盒信息
              {x: 1, y: 1},
              {x: 2, y: 2}
            ],
            message: "", // 意见内容
          },
          {
            drawingId: "", // 图纸id
            modelId: "", // 模型id

            componentId: 489587, // 构件id
            componentName: "", // 构件名称              
            viewEleBox: [ // 构件包围盒信息
              {x: 1, y: 1},
              {x: 2, y: 2}
            ],
            message: "", // 意见内容
          },
          {
            drawingId: "", // 图纸id
            modelId: "", // 模型id

            componentId: 489587, // 构件id
            componentName: "", // 构件名称              
            viewEleBox: [ // 构件包围盒信息
              {x: 1, y: 1},
              {x: 2, y: 2}
            ],
            message: "", // 意见内容
          }
        ]
      }
    ]
  }]
})


// modelSet start
const modelSetSource = reactive({
  models: [
    {
      name: "图纸2",
      type: "model2d",
      token: '3a263d5f254b4cc7936e590b248e7f54', //demoToken.token2d_2,
      _COLOR: [0, 255, 255, 1],
    },
    {
      type: "modelsheet",
      token: '88bcf6bc29ae41f8b0f49a47ab14e896',//demoToken.token3d_3,
      sheetId: 2535138, //demoToken.token3d_3_sheetId,
      _COLOR: [255, 0, 255, 1],
      matric: '[1.0000001316787128,0,0,0,0,1.0000001316787128,0,0,0,0,1,0,-262279.1241119653,120723.96686142143,0,1]'
    },
  ],
})
// modelSet end

// compliance start
let drawingSelectData = reactive({
  defaultDrawingId: null,
  drawingSelectBoxShow: false,
  drawingList: [
    {
      drawingId: 1,
      name: '图纸a',
      type: "model2d",
      token: demoToken.token2d_3
    },
    {
      drawingId: 2,
      name: '图纸b',
      type: "model2d",
      token: demoToken.token2d_4
    }
  ]
})
let drawingSelect = function (d) {
  if (drawingSelectData.selectedCb) {
    drawingSelectData.selectedCb(d)
  }
}
let startSelectDrawingEvent = function (selectedCb) {
  drawingSelectData.selectedCb = selectedCb
  drawingSelectData.drawingSelectBoxShow = true
}
let endSelectDrawingEvent = function () {
  drawingSelectData.drawingSelectBoxShow = false
}
let smartLinkEvent = function ({successCb, failCb}) {
  // 模拟接口回调
  setTimeout(() => {
    successCb()
  }, 5000)
}
let handlinkConfirmEvent = function ({successCb, failCb, matric}) {
  setTimeout(() => {
    successCb()
  }, 1000)
}
let cEditable = ref(true)
let d1 = {
  firstDrawing: {
    source: {
      name: '视图名称',
      type: "modelsheet",
      token: demoToken.token3d_3,
      sheetId: demoToken.token3d_3_sheetId
    },
  },
  secondDrawing: {
    source: {
      name: '图纸1',
      type: "model2d",
      token: demoToken.token2d
    },
  },
  matric: '[1.4586774085823542,-0.025461308876130528,0,0,0.025461308876130528,1.4586774085823542,0,0,0,0,1,0,-9292.000286304572,415497.48398312565,0,1]'
}

let d2 = {
  firstDrawing: {
    source: {
      name: '视图名称',
      type: "modelsheet",
      token: demoToken.token3d_3,
      sheetId: demoToken.token3d_3_sheetId
    },
  },
  secondDrawing: {
    source: {
      name: '图纸1',
      type: "model2d",
      token: demoToken.token2d_2
    },
  },
  matric2: null
}
let d3 = {
  firstDrawing: {
    source: {
      name: '视图名称',
      type: "modelsheet",
      token: demoToken.token3d_3,
      sheetId: demoToken.token3d_3_sheetId
    },
  },
  secondDrawing: {
    source: null
  },
  matric2: null
}
let d = [d1, d2, d3]
let complianceSource = reactive({
  firstDrawing: d[0].firstDrawing,
  secondDrawing: d[0].secondDrawing,
  matric: d[0].matric
})

let index = 0

let resetComplianceSource = function () {
  if (index == 2) {
    index = 0
  } else {
    index++
  }
  complianceSource.matric = d[index].matric
  complianceSource.firstDrawing = d[index].firstDrawing
  complianceSource.secondDrawing = d[index].secondDrawing
}
// compliance end
</script>

<style lang="less" scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
.a{
  width: 100%;
  height: 100%;
}
.app_clz{
  width: 100%;
  height: 100%;
  overflow: auto;
}

.select_drawing{
  position: absolute;
  top: 58px;
}
</style>

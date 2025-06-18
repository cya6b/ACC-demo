<template>
<!-- 智能审查结果   -->
<div class="__gda_sdk review_auto_results_pane">
  <div class="pane_title">
    <span v-if="!showD" class="title_content">{{title}}</span>
    <span v-if="!showD && showDownloadReport" :class="`download ${isDesignQualityV2 ? '_to_left_24': ''}`" @click="downloadViewReport">
      <i class="gda_sdk_iconfont icon-dibu" ></i>下载审查报告
    </span>
    <span v-if="showD" class="title_content" @click="back"><i class="gda_sdk_iconfont icon-fanhui"></i> 意见详情 </span>
    <i class="gda_sdk_iconfont icon-guanbi pane_close" @click="close"></i>
  </div>
  <component ref="contentRef" v-if="!showTipsPane" :showAdopt="showAdopt"
    :is="componentName" :dataSource="paneData" :tagFilterList="tagFilterList"
    @acceptFunCallBack="acceptFunc"
    @showDetailHandle="val => showD=val"></component>
  <autoTaskStatusPane v-if="showTipsPane" :taskStatus="status"></autoTaskStatusPane>

  <!--构件详情-->
  <ComponentDetail
    class="component_detail_pane"
    v-if="cDetail.show"
    :dataV="cDetail.data"
    @closeHandle="cDetail.show = false"
  />
</div>
</template>

<script>
import autoTaskStatusPane from "./components/autoTaskStatusPane.vue"
import AutoListOfCompare from "./components/autoListOfCompare.vue"
import AutoListOfReview from "./components/autoListOfReview.vue"
import AutoListOfReviewV2 from "./components/autoListOfReviewV2/index.vue"
import ComponentDetail from "./components/componentDetail.vue"
import {ElMessage} from 'element-plus'

import util from "../../../plugins/util"
import axios from 'axios'
export default {
  components: {
    autoTaskStatusPane,
    AutoListOfCompare,
    AutoListOfReview,
    AutoListOfReviewV2,
    ComponentDetail
  },
  data () {
    return {
      status: "",
      paneData: null,
      tagFilterList: [],

      showD: false,
      markups: {
        list: [],
        activeIndex: null,
      },

      cDetail: {
        data: null,
        show: false
      },

      adoptClickEventListener: null
    }
  },
  provide () {
    return {
      Markups: this.markups
    }
  },
  props: {
    modeType: {
      type: String,
      default: 'DesignQuality' // DesignQuality | DesignQualityV2 | Compliance
    },
    sourceData: {
      type: Object,
    },
    outerChin: {
      type: Object,
    },
    title: {
      default: "智能审查意见",
      type: String
    },
    closeHandle: {
      type: Function
    },
    showAdopt: { // 显示采纳功能按钮
      type: Boolean,
      default: true
    },
    adoptClickHandle: {
      type: Function,
    },
    showDownloadReport: { // 显示下载审查报告按钮
      type: Boolean,
      default: false
    },
    downloadReportClickHandle: {
      type: Function,
    }
  },
  computed: {
    showTipsPane () {
      return this.status !== 'FINISH'
    },
    isDesignQualityV2 () {
      if (this.modeType == 'DesignQualityV2') {
        return true
      }
      return false
    },
    componentName () {
      if (this.modeType == 'DesignQuality') {
        return 'AutoListOfReview'
      }
      if (this.modeType == 'DesignQualityV2') {
        return 'AutoListOfReviewV2'
      }
      if (this.modeType == 'Compliance') {
        return 'AutoListOfCompare'
      }
    },
    getOptView () {
      let v = null
      if (this.outerChin) {
        if (this.outerChin.getMainModel && this.outerChin.getMainModel()) {
          v = this.outerChin.getMainModel()
        } else if (this.outerChin.mainModel) {
          v = this.outerChin.mainModel
        } else {
          v = this.outerChin
        }
      }
      return v
    },

    getSubOptView () {
      let v = null
      if (this.outerChin) {
        if (this.outerChin.getSubModel && this.outerChin.getSubModel()) {
          v = this.outerChin.getSubModel()
        } else if (this.outerChin.subModel) {
          v = this.outerChin.subModel
        } else {
          v = this.outerChin
        }
      }
      return v
    },

    getSubDrawingOptView () {
      let v = null
      if (this.outerChin && this.outerChin.getDrawingModel && this.outerChin.getDrawingModel()) {
        v = this.outerChin.getDrawingModel()
      }
      return v
    },

    getOuterChinLinkMatric () {
      if (this?.outerChin?.getLinkMatric) {
        return this.outerChin.getLinkMatric()
      }
      return null
    }
  },
  watch: {
    sourceData: {
      handler (val) {
        if (val) {
          this.setData(val)
        }
      },
      immediate: true
    },
    'markups.list': {
      async handler (val) {
        const _this = this
        // 绘制批注和锚点
        let valT = val || []
        let v = this.getOptView
        if (!v) {
          return
        }
        const is3dModel = (v.options && v.options.source && (v.options.source.type === 'model3d')) || (v.domType == 'model3d')
        const is2dDrawing = (v.options && v.options.source && (v.options.source.type === 'model2d')) || (v.domType == 'model2d')
        let markups = []
        Promise.all(valT.map((i, index) => {
          return new Promise(async resolve => {
            if (is3dModel) {
              let pathPoints = []
              if (i.pathPoints) {
                try {
                  pathPoints = JSON.parse(i.pathPoints)
                } catch (err) {
                }
              }

              if (!i.box && i.drawingEleBox) {
                i.box = _this.drawingEleBoxToViewEleBox(i.drawingEleBox)
              }
              resolve({
                annor: {
                  box: null,
                  drawingEleBox: i.drawingEleBox,
                  label: index + 1,
                  contentHTML: `${i.content || i.message}`,
                  elementId: i.componentId,
                  bimFileId: i.bimFileId,
                  elementName: i.componentName,
                  pathPoints
                },
                // 3d模型无须绘制批注框
                annotations: [{
                  minX: i.box ? Number(i.box[0].x) : 0,
                  minY: i.box ? Number(i.box[0].y) : 0,
                  maxX: i.box ? Number(i.box[1].x) : 0,
                  maxY: i.box ? Number(i.box[1].y) : 0,
                  markupType: "my_CloudRect",
                  strokeStyle: "rgba(255,0,0,1)"
                }]
              })
            } else {
              // 当前为模型视图或叠图
              if (!is2dDrawing) {
                if (!i.box && i.drawingEleBox) {
                  i.box = _this.drawingEleBoxToViewEleBox(i.drawingEleBox)
                }
              } else {
                // 当前为图纸，在图纸上根据模型问题构件id绘制模型问题构件
                if (!i.box && i.drawingEleBox) {
                  i.box = i.drawingEleBox
                } else if (!i.box && i.componentId) {
                  // 补偿，根据构件id获取构件的图纸box数据
                  let drawingEleBox = await _this.getBoxInfoInDrawingByEleId(i.componentId)
                  if (drawingEleBox) {
                    i.box = [
                      drawingEleBox.min,
                      drawingEleBox.max,
                    ]
                    

                    if (!i.drawingEleBox) {
                      i.drawingEleBox = [
                        drawingEleBox.min,
                        drawingEleBox.max,
                      ]
                    }
                  }
                }
              }

              let box = null
              if (i.box) {
                let minX = Math.min(i.box[0].x, i.box[1].x)
                let maxX = Math.max(i.box[0].x, i.box[1].x)
                let minY = Math.min(i.box[0].y, i.box[1].y)
                let maxY = Math.max(i.box[0].y, i.box[1].y)
                box = {
                  minX,
                  minY,
                  maxX,
                  maxY
                }
              }
              resolve({
                annor: {
                  box,
                  drawingEleBox: i.drawingEleBox,
                  label: index + 1,
                  contentHTML: `${i.content || i.message}`,
                  elementId: i.componentId,
                  bimFileId: i.bimFileId,
                  elementName: i.componentName,
                },
                // 3d模型无须绘制批注框
                annotations: [
                  {
                    minX: i.box ? Number(i.box[0].x) : 0,
                    minY: i.box ? Number(i.box[0].y) : 0,
                    maxX: i.box ? Number(i.box[1].x) : 0,
                    maxY: i.box ? Number(i.box[1].y) : 0,
                    markupType: "my_CloudRect",
                    strokeStyle: "rgba(255,0,0,1)"
                  }
                ]
              })
            }
          })
        })).then(res => {
          if (res.length) {
            markups = res
          }

          if (v && v.setMarkupList) {
            v.setMarkupList(markups, 'review_result', true)
          }

          // 相符性审查结果，分屏下图纸上绘制批注框
          if (_this.modeType == 'Compliance') {
            let drawingV = _this.getSubDrawingOptView
            if (drawingV && drawingV.name !== 'ViewSet') {
              let dMarkups = valT.map(item => {
                return {
                  annotations: [{
                    minX: item.drawingEleBox ? Number(item.drawingEleBox[0].x) : 0,
                    minY: item.drawingEleBox ? Number(item.drawingEleBox[0].y) : 0,
                    maxX: item.drawingEleBox ? Number(item.drawingEleBox[1].x) : 0,
                    maxY: item.drawingEleBox ? Number(item.drawingEleBox[1].y) : 0,
                    markupType: "my_CloudRect",
                    strokeStyle: "rgba(255,0,0,1)"
                  }]
                }
              })
              drawingV.setMarkupList(dMarkups, 'review_result')
            }
          }
        })
      }
    },
    'markups.activeIndex': {
      handler (val, oldV) {
        // 主视口锚点定位active or unactive
        let v = this.getOptView
        let externalTrigger = true
        if (v) {
          if (val !== null && v.activeAnnor) {
            if (oldV !== null) {
              v.unActiveAnnor && v.unActiveAnnor(oldV, externalTrigger)
            }

            v.activeAnnor && v.activeAnnor(val, externalTrigger)
          }
          if (val === null) {
            v.unActiveAnnor && v.unActiveAnnor(oldV, externalTrigger)
          }
        }

        // 相符性分屏下，图纸上批注active和unactive状态的批注显隐控制
        let drawingV = this.getSubDrawingOptView
        if (drawingV && drawingV.name !== 'ViewSet') {
          if (val !== null && drawingV.activeAnnor) {
            if (oldV !== null) {
              drawingV.unActiveAnnor && drawingV.unActiveAnnor(oldV, externalTrigger)
            }

            drawingV.activeAnnor && drawingV.activeAnnor(val, externalTrigger)
          }
          if (val === null) {
            drawingV.unActiveAnnor && drawingV.unActiveAnnor(oldV, externalTrigger)
          }
        }
      }
    },
    outerChin: {
      handler (val) {
        if (val) {
        }
      },
      immediate: true
    },
    getOptView: {
      handler (v) {
        if (v) {
          if (v.getMarkupPoolTool && v.getMarkupPoolTool()) {
            v.getMarkupPoolTool().addEventListener('annorActiveEvent', this.annorActiveChange)
            v.getMarkupPoolTool().addEventListener('moreInfoClickEvent', this.annorCardMoreInfoClick)
          }
        }
      },
      immediate: true
    },
    adoptClickHandle: {
      handler (val) {
        if (val) {
          this.adoptClickEventListener = val
        }
      },
      immediate: true
    }
  },
  methods: {
    downloadViewReport () {
      if (this.downloadReportClickHandle) {
        this.downloadReportClickHandle()
      }
    },
    drawingEleBoxToViewEleBox (drawingEleBox) {
      if (typeof drawingEleBox == 'string') {
        drawingEleBox = JSON.parse(drawingEleBox)
      }
      let box = null
      let matric = this.getOuterChinLinkMatric
      if (matric) {
        if (typeof matric == 'string') {
          matric = JSON.parse(matric)
        } else if (typeof matric == 'object') {
          let points = [
            ...matric.drawingPoints,
            ...matric.sheetPoints,
          ]
          if (points.length == 8) {
            matric = util.getMatric4Data(points).flat()
          }
        }
        box = [
          util.coordinateTrans(
            drawingEleBox[0],
            matric
          ), util.coordinateTrans(
            drawingEleBox[1],
            matric
          )]
      }
      return box
    },
    back () {
      this.showD = false
      this.$refs.contentRef && this.$refs.contentRef.back()
    },
    setData (d) {
      this.back()
      this.status = d.status
      this.paneData = d.tabs
      this.tagFilterList = d.tagsList || []
    },
    resetData (d) {
      this.setData(d)
    },
    close () {
      this.back()
      this.closeHandle && this.closeHandle()
    },
    acceptFunc (params) {
      if (this.adoptClickEventListener) {
        this.adoptClickEventListener(params)
      }
    },
    annorActiveChange (annor) {
      let activeAnnorIndex = null
      if (annor) {
        activeAnnorIndex = annor.annorIndex
      }
      this.$refs.contentRef && this.$refs.contentRef.setActiveAnnorIndex(activeAnnorIndex)
    },
    annorCardMoreInfoClick (data) {
      if (!data || !data.elementId) {
        return
      }
      let v = this.getOptView
      if (!v) {
        return
      }
      let bV = v.viewer?.getBimfaceViewer || v.getBimfaceViewer
      let bVOpt = v.viewer?.optContext || v.optContext
      if (!bV) {
        return
      }
      const _this = this
      this.cDetail.data = {
        name: data.elementName,
        elementId: data.elementId,
        elementResult: data.contentHTML
      }
      const elementId = data.newEleId || data.elementId
      if (data.getElementInfoFromBySelf) {
        let isIntegrateModel = bV.loadedDrawings[0]?.drawing?.authenticate?.data?.modelType === 'integrateModel'
        let modelId = bV.loadedDrawings[0]?.drawing?.authenticate?.data?.modelId
        let intergratedFileId = bV.loadedDrawings[0]?.drawing?.intergratedFileId
        let viewToken = bV.loadedDrawings[0]?.drawing?.authenticate?.data?.viewToken
        _this.getElementPropertyBySelf({
          isIntegrateModel,
          modelId,
          intergratedFileId,
          elementId,
          viewToken
        }).then(res => {
          if (res && res.properties) {
            _this.cDetail.data.properties = res.properties
            _this.cDetail.show = true
          }
        })
      } else {
        bVOpt.getComponentProperty(elementId, (cData) => {
          if (cData && cData.properties) {
            this.cDetail.data.properties = cData.properties
            _this.cDetail.show = true
          } else if (bVOpt.getRoomProperty) {
            // 若获取不到构件属性，则获取房间属性
            bVOpt.getRoomProperty(elementId, rData => {
              if (rData && rData.properties) {
                this.cDetail.data.properties = rData.properties
                _this.cDetail.show = true
              }
            })
          }
        })
      }
    },

    getElementPropertyBySelf ({
      isIntegrateModel,
      modelId,
      intergratedFileId,
      elementId,
      viewToken
    }) {
      return new Promise(async (resolve, reject) => {
        let sourceGetEleUrl = `${window.hostConfig.APIHost}/data/v2/files/${modelId}/elements/${elementId}`
        let sourceGetRoomUrl = `${window.hostConfig.APIHost}/data/v2/files/${modelId}/rooms/${elementId}`
        if (isIntegrateModel) {
          sourceGetEleUrl = `${window.hostConfig.APIHost}/data/v2/integrations/${modelId}/files/${intergratedFileId}/elements/${elementId}`
          sourceGetRoomUrl = `${window.hostConfig.APIHost}/data/v2/integrations/${modelId}/rooms/${intergratedFileId}_${elementId}`
        }
        let res = await axios.get(sourceGetEleUrl, {
          params: {
            view_token: viewToken
          },
          headers: {
            Accept: '*/*'
          }
        })
        if (res.data.code === 'success' && res.data.data) {
          resolve(res.data.data)
          return
        }
        res = await axios.get(sourceGetRoomUrl, {
          params: {
            view_token: viewToken
          },
          headers: {
            Accept: '*/*'
          }
        })
        if (res.data.code === 'success' && res.data.data) {
          resolve(res.data.data)
        }
        reject(null)
      })
    },

    setAdoptClickListener (listener) {
      this.adoptClickEventListener = listener
    },

    async getBoxInfoInDrawingByEleId (eleId) {
      let ret = null
      if (this.outerChin && this.outerChin.getBoxInfoInDrawingByEleId) {
        ret = await this.outerChin.getBoxInfoInDrawingByEleId(eleId)
      }
      return ret
    },

    clearAnnorsAndAnnots () {
      if (this.getOptView) {
        this.getOptView.setMarkupList && this.getOptView.setMarkupList([], 'review_result')
      }
      if (this.getSubOptView) {
        this.getSubOptView.setMarkupList && this.getSubOptView.setMarkupList([], 'review_result')
      }

      // 相符性审查结果，分屏下图纸上绘制的批注框 清除
      if (this.modeType == 'Compliance' && this.getSubDrawingOptView) {
        this.getSubDrawingOptView.setMarkupList([], 'review_result')
      }
    }
  }
}
</script>

<style lang="less" scoped>
@import './components/assets/common.less';
.review_auto_results_pane{
  color: @color;
  background: #282a34;
  height: 100%;
  min-width: 450px;
  width: 100%;
  position: relative;
  .pane_title{
    width: calc(100% - 48px);
    padding-top: 14px;
    padding-bottom: 14px;
    margin: 0 auto;
    font-weight: 500;
    font-size: 14px;
    color: #f2f2f8;
    display: -ms-flexbox;
    display: flex;
    border-bottom: 1px solid #545664;
    .title_content{
      flex-grow: 1;
    }
    .pane_close {
      &:hover {
        cursor: pointer;
        color: @blue
      }
    }

    .download{
      cursor: pointer;
      padding: 4px 8px;
      margin-right: 5px;
      border: 1px solid transparent;
      font-size: 14px;
      font-weight: 500;
      line-height: 19px;
      position: absolute;
      right: 40px;
      top: 8px;
      z-index: 9;
      &:hover{
        border: 1px solid #126bff;
        border-radius: 4px;
      }
    }
    .download._to_left_24{
      z-index: 1;
      margin-right: 36px;
    }
  }
}
.component_detail_pane{
  position: absolute;
  top: 0px;
  height: 100%;
}
</style>
<template>
  <div v-if="fold" class="model_set_view_box">
    <ModelSet :key="5" :bimfaceHost="bimfaceHost" :hideAnnotBar="hideAnnotBar" :source="drawingSetSource" :afterLoad="modelSetLoaded"></ModelSet>
  </div>
  <div v-else class="model_split_view_box">
    <div class="model_view_box">
      <span class="switch_btn" v-if="(firstDrawing.source.type === 'modelsheet') && showQiehuanmoxingBtn"
        @click="firstDrawingShow3dChange">
        {{ `切换${firstDrawing.show3D ? '视图' : '模型'}` }}
      </span>
      <ModelView hideTextSearch v-if="firstDrawing.source.token" class="model_view_content"
        :key="1"
        :bimfaceHost="bimfaceHost"
        ref="firstModelRef" :source="firstDSource" :afterLoad="fLoaded" :hideAnnotBar="hideAnnotBar"></ModelView>
      <span class="no_data_tip" v-else>尚未选择图纸！</span>

      <!-- 3d模型显示下的辅助视图 -->
      <ModelView v-if="(firstDrawing.source.type === 'modelsheet') && firstDrawing.show3D && firstDrawing.loaded"
        :key="2"
        :bimfaceHost="bimfaceHost"
        hideTextSearch
        class="model_view_content hidden"
        ref="firstModelSheetViewRef"
        :source="firstDrawing.source"
        :afterLoad="fSheetLoaded" :hideAnnotBar="hideAnnotBar"></ModelView>

      <!-- 模型楼层切换 -->
      <ModelFloorChange v-if="firstDrawing.show3D" @cutModelShowType="cutModelShowTypeF"></ModelFloorChange>
    </div>
    <div class="column_line"></div>
    <div class="model_view_box">
      <span class="switch_btn" v-if="(secondDrawing.source.type === 'modelsheet') && showQiehuanmoxingBtn"
        @click="secondDrawingShow3dChange">
        {{ `切换${secondDrawing.show3D ? '视图' : '模型'}` }}
      </span>
      <ModelView hideTextSearch v-if="secondDrawing.source.token" class="model_view_content"
        :key="3"
        :bimfaceHost="bimfaceHost"
        ref="secondModelRef" :source="secondDSource" :afterLoad="sLoaded" :hideAnnotBar="hideAnnotBar"></ModelView>
      <div class="no_data_tip" v-else>
        <i class="gda_sdk_iconfont icon-kong"></i>
        <p class="text">请在上方选框中，为 "左侧模型视图" 选择对应图纸！</p>
      </div>

      <!-- 3d模型显示下的辅助视图 -->
      <ModelView v-if="(secondDrawing.source.type === 'modelsheet') && secondDrawing.show3D && secondDrawing.loaded"
        :key="4"
        :bimfaceHost="bimfaceHost"
        hideTextSearch
        class="model_view_content hidden"
        ref="secondModelSheetViewRef"
        :source="secondDrawing.source"
        :afterLoad="sSheetLoaded" :hideAnnotBar="hideAnnotBar"></ModelView>

      <!-- 模型楼层切换 -->
      <ModelFloorChange v-if="secondDrawing.show3D" @cutModelShowType="cutModelShowTypeS"></ModelFloorChange>
    </div>
  </div>
  <div class="split_fold_trigger" v-if="showFoldSwitch && showQiehuanmoxingBtn">
    <span @click="foldSwitchClick(true)" class="split_fold_trigger_item" :class="{ active: foldSwitch }">
      <i class="gda_sdk_iconfont icon-Vectordietu"></i> 叠图
    </span>
    <span @click="foldSwitchClick(false)" class="split_fold_trigger_item" :class="{ active: !foldSwitch }">
      <i class="gda_sdk_iconfont icon-fenpingiconfenping"></i>分屏
    </span>
  </div>
</template>

<script>
/* Copyright (C) <1998-2024> Glodon Company Limited
 * Licensed under the MIT License
 * Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the “Software”), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
 * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
 * THE SOFTWARE IS PROVIDED “AS IS”, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */
import ModelSet from "../model/ModelSet.vue"
import ModelView from "../model/ModelView.vue"
import ModelFloorChange from './modelFloorChangeNew.vue'
import util from '../../../plugins/util.js'

export default {
  components: {
    ModelSet,
    ModelView,
    ModelFloorChange
  },
  data () {
    return {
      firstDrawing: {
        loaded: false,
        source: {},
        show3D: false,
        viewer: null,
        pointsS: []
      },
      secondDrawing: {
        loaded: false,
        source: {},
        show3D: false,
        viewer: null,
        pointsS: []
      },
      drawingSet: {
        viewer: null
      },
      matric: null,
      foldSwitch: false
    }
  },
  props: {
    hideAnnotBar: {
      type: Boolean,
      default: false,
    },
    bimfaceHost: {
      type: String,
      default: 'https://static.bimface.com'
    },
    showQiehuanmoxingBtn: {
      type: Boolean,
      default: false
    },
    inLinking: {
      type: Boolean,
      default: false
    },
    firstData: {
      type: Object
    },
    secondData: {
      type: Object
    },
    matricData: {
      type: String
    },
    afterLoad: {
      type: Function
    },
  },
  computed: {
    firstAndSecondAllLoaded () {
      if (this.firstDrawing?.source?.token && this.secondDrawing?.source?.token) {
        return this.firstDrawing.loaded && this.secondDrawing.loaded
      } else if (!this.secondDrawing?.source?.token) {
        return this.firstDrawing.loaded
      } else if (!this.firstDrawing?.source?.token) {
        return this.secondDrawing.loaded
      }
    },
    firstDSource () {
      if (!this.firstDrawing.show3D) {
        return this.firstDrawing.source
      } else {
        return {
          ...this.firstDrawing.source,
          type: 'model3d'
        }
      }
    },
    secondDSource () {
      if (!this.secondDrawing.show3D) {
        return this.secondDrawing.source
      } else {
        return {
          ...this.secondDrawing.source,
          type: 'model3d'
        }
      }
    },
    showFoldSwitch () {
      return this.firstDrawing.source.token && this.secondDrawing.source.token && this.matric && !this.inLinking
    },
    fold () {
      if (!this.firstDrawing.source.token) {
        return false
      }
      if (!this.secondDrawing.source.token) {
        return false
      }
      if (!this.matric) {
        return false
      }
      if (!this.foldSwitch) {
        return false
      }
      return true
    },
    drawingSetSource () {
      let models = []
      if (this.firstDrawing.source.token) {
        models.push({
          ...this.firstDrawing.source,
          _COLOR: [255, 0, 255, 1],
        })
      }
      if (this.secondDrawing.source.token) {
        models.push({
          ...this.secondDrawing.source,
          _COLOR: [0, 255, 255, 1],
          matric: this.formatMatric(this.matric)
        })
      }
      return {
        models
      }
    }
  },
  methods: {
    _drawingBoundingToViewBounding (bounding) {
      let matric = this.matric 
      if (typeof this.matric === 'string') {
        matric = JSON.parse(this.matric)
      }
      if (typeof this.matric === 'object') {
        let points = [
          ...this.matric.drawingPoints,
          ...this.matric.sheetPoints,
        ]
        if (points.length === 8) {
          matric = util.getMatric4Data(points).flat()
        }
      }
      return this.BoundTrans(matric, bounding)
    },
    firstDrawingShow3dChange () {
      this.firstDrawing.show3D = !this.firstDrawing.show3D
      if (this.firstDrawing.show3D) {
        this.firstDrawing.viewer.getMarkupPoolTool().setDisplayModel('annor')
      } else {
        this.firstDrawing.viewer.getMarkupPoolTool().setDisplayModel('annor&annot')
      }
    },
    secondDrawingShow3dChange () {
      this.secondDrawing.show3D = !this.secondDrawing.show3D
      if (this.secondDrawing.show3D) {
        this.secondDrawing.viewer.getMarkupPoolTool().setDisplayModel('annor')
      } else {
        this.secondDrawing.viewer.getMarkupPoolTool().setDisplayModel('annor&annot')
      }
    },
    formatMatric (data) {
      let ret = data
      if (typeof data === 'object') {
        let points = [
          ...data.drawingPoints,
          ...data.sheetPoints,
        ]
        if (points.length === 8) {
          ret = JSON.stringify(util.getMatric4Data(points).flat())
        }
      }
      return ret
    },
    foldSwitchClick (b) {
      this.foldSwitch = !!b
    },
    getMarkupOptModel () {
      if (this.fold) {
        return this.drawingSet.viewer
      } else {
        return this.firstDrawing.viewer
      }
    },
    getDrawingModel () {
      if (this.fold) {
        return this.drawingSet.viewer
      } else {
        return this.secondDrawing.viewer
      }
    },
    reInitData () {
      this.firstDrawing.pointsS = []
      this.firstDrawing.show3D = false

      this.secondDrawing.pointsS = []
      this.secondDrawing.show3D = false
    },
    moveMakupsFromTo (fViewer, tViewer) {
      let tPoolTool = tViewer.getMarkupPoolTool()
      let fPoolTool = fViewer.getMarkupPoolTool()
      let currentActiveAnnorIndex = fPoolTool.currentActiveAnnorIndex
      tPoolTool.pool = fPoolTool.pool
      tPoolTool.render(false, () => {
        if (currentActiveAnnorIndex !== null) {
          tPoolTool.activeAnnor(currentActiveAnnorIndex)
        }
      })

      // let sleepTime = 500
      // if (tPoolTool?.markup_viewer?.domType === 'model3d') {
      //   sleepTime = 3000
      // }
      // setTimeout(() => {
      //   if (currentActiveAnnorIndex !== null) {
      //     tPoolTool.activeAnnor(currentActiveAnnorIndex)
      //   }
      // }, sleepTime)
    },
    fLoaded (v) {
      if (this.currentActiveMainModelViewerCache) {
        this.moveMakupsFromTo(this.currentActiveMainModelViewerCache, v)
      }

      // 获取该模型的所有视图数据
      v.optContext.getAllDrawingsheets && v.optContext.getAllDrawingsheets()

      this.currentActiveMainModelViewerCache = v
      this.firstDrawing.viewer = v
      this.firstDrawing.optContext = v.optContext
      this.firstDrawing.loaded = true
      if (this.firstDrawing.show3D) {
        this.cutModelShowTypeF('floor')
      } else if (this.firstDrawing.source.type === 'modelsheet') {
        setTimeout(() => {
          this.firstDrawing.drawingObjectArr = []
          let layers = v.optContext.getAllLayers()
          if (Array.isArray(layers)) {
            layers.map(ly => {
              let temp = v.optContext.getElementsByLayerId(ly.id)
              if (Array.isArray(temp)) {
                let eleArr = temp.map(t => {
                  return v.optContext.toModelId(t)
                })
                this.firstDrawing.drawingObjectArr = this.firstDrawing.drawingObjectArr.concat(eleArr)
              }
            })
          }
        }, 500)
      }
    },
    sLoaded (v) {
      this.secondDrawing.viewer = v
      this.secondDrawing.optContext = v.optContext
      this.secondDrawing.loaded = true

      // 获取该模型的所有视图数据
      v.optContext.getAllDrawingsheets && v.optContext.getAllDrawingsheets()

      if (this.secondDrawing.show3D) {
        this.cutModelShowTypeF('floor')
      } else if (this.secondDrawing.source.type === 'modelsheet') {
        setTimeout(() => {
          this.secondDrawing.drawingObjectArr = []
          let layers = v.optContext.getAllLayers()
          if (Array.isArray(layers)) {
            layers.map(ly => {
              let temp = v.optContext.getElementsByLayerId(ly.id)
              if (Array.isArray(temp)) {
                let eleArr = temp.map(t => {
                  return v.optContext.toModelId(t)
                })
                this.secondDrawing.drawingObjectArr = this.secondDrawing.drawingObjectArr.concat(eleArr)
              }
            })
          }
        }, 500)
      }

      // 当在叠图模式下已绘制某审查点的批注，切换至分屏时，在图纸上绘制批注数据
      if (this.drawingSet.viewer) {
        let fViewer = this.drawingSet.viewer
        let fPoolTool = fViewer.getMarkupPoolTool()
        if (fPoolTool) {
          let reviewResult = fPoolTool.getMarkupListByKey('review_result')
          if (reviewResult?.markupList?.length) {
            let list = reviewResult.markupList.map(i => {
              let drawingEleBox = i.annor?.drawingEleBox
              return {
                annotations: [{
                  minX: drawingEleBox ? Number(drawingEleBox[0].x) : 0,
                  minY: drawingEleBox ? Number(drawingEleBox[0].y) : 0,
                  maxX: drawingEleBox ? Number(drawingEleBox[1].x) : 0,
                  maxY: drawingEleBox ? Number(drawingEleBox[1].y) : 0,
                  markupType: "my_CloudRect",
                  strokeStyle: "rgba(255,0,0,1)"
                }]
              }
            })
            let tPoolTool = this.secondDrawing.viewer.getMarkupPoolTool()
            if (tPoolTool) {
              tPoolTool.setList(list, 'review_result')
            }
          }
        }
      }
    },
    fSheetLoaded (v) {
      this.firstDrawing.sheetViewer = v
    },
    sSheetLoaded (v) {
      this.secondDrawing.sheetViewer = v
    },
    modelSetLoaded (v) {
      setTimeout(() => {
        if (this.currentActiveMainModelViewerCache) {
          this.moveMakupsFromTo(this.currentActiveMainModelViewerCache, v)
        }

        this.currentActiveMainModelViewerCache = v
        this.drawingSet.viewer = v

        if (this.afterLoad) {
          this.afterLoad()
        }
      }, 1000)
    },
    cutModelShowTypeF (type) {
      let v = this.firstDrawing.viewer
      let arr = null
      if (type === 'floor') {
        arr = this.firstDrawing.drawingObjectArr
        if (this.firstDrawing.source.singleModelFileId) {
          arr = this.firstDrawing.drawingObjectArr.map(objectId => {
            if (!(objectId + '').includes('.')) {
              return `${this.firstDrawing.source.singleModelFileId}.${objectId}`
            }
            return objectId
          })
        }
      }
      this.cutModelShowType(v, arr)
    },
    cutModelShowTypeS (type) {
      let v = this.secondDrawing.viewer
      let arr = null
      if (type === 'floor') {
        arr = this.secondDrawing.drawingObjectArr
        if (this.secondDrawing.source.singleModelFileId) {
          arr = this.secondDrawing.drawingObjectArr.map(objectId => {
            if (!(objectId + '').includes('.')) {
              return `${this.secondDrawing.source.singleModelFileId}.${objectId}`
            }
            return objectId
          })
        }
      }
      this.cutModelShowType(v, arr)
    },
    cutModelShowType (viewer, arr) {
      if (arr) {
        viewer.optContext.hideAllComponents()
        viewer.optContext.showComponentsById(arr)
      } else {
        viewer.optContext.showAllComponents()
      }
    },
    setMatric (val) {
      this.matric = val
      if (val) {
        this.foldSwitch = true
      } else {
        this.foldSwitch = false
      }
    },
    startSelectPoint (reserveFirstPoint = false, reserveSecondPoint = false) {
      const _this = this

      // 清空历史数据
      _this.cancelSelectPoint(reserveFirstPoint, reserveSecondPoint)
      if (!this.firstDrawing.loaded || !this.secondDrawing.loaded) {
        _this.startSelectPointTimer = setTimeout(() => {
          _this.startSelectPoint()
        }, 500)
        return
      }
      _this.startSelectPointTimer = null
      if (this.$refs.firstModelRef && this.$refs.secondModelRef) {
        // 初始化选点信息
        if (!reserveFirstPoint) {
          _this.firstDrawing.pointsS = []
        }
        if (!reserveSecondPoint) {
          _this.secondDrawing.pointsS = []
        }
        // 鼠标跟随tips提示
        let firstDTipText = `选择${_this.firstDrawing.source.type === 'model2d' ? '图纸' : '视图'}对应的两点坐标`
        let secondDTipText = `选择${_this.secondDrawing.source.type === 'model2d' ? '图纸' : '视图'}对应的两点坐标`
        this.$refs.firstModelRef?.optContext?.addMouseTips(firstDTipText)
        this.$refs.secondModelRef?.optContext?.addMouseTips(secondDTipText)

        // 鼠标点击选点事件
        this.$refs.firstModelRef?.optContext?.addMouseClickEvent((res) => {
          let wordPosition = res.worldPosition
          if (res.snapPoint) {
            wordPosition = res.snapPoint.worldPosition
          }
          _this.firstDrawing.pointsS.push(wordPosition)
          if (_this.firstDrawing.pointsS.length > 2) {
            _this.firstDrawing.pointsS.shift()
          }

          // 绘制选点标记
          this.$refs.firstModelRef?.optContext?.clearAnchors()
          this.$nextTick(() => {
            this.$refs.firstModelRef?.optContext?.drawingLabel(_this.firstDrawing.pointsS)
          })

          // if (_this.firstDrawing.pointsS.length === 2) {
          //   this.$refs.firstModelRef?.optContext?.removeMouseClickEvent()
          //   this.$refs.firstModelRef?.optContext?.cancelMouseTips()
          // }
        })

        this.$refs.secondModelRef?.optContext?.addMouseClickEvent((res) => {
          let wordPosition = res.worldPosition
          if (res.snapPoint) {
            wordPosition = res.snapPoint.worldPosition
          }
          _this.secondDrawing.pointsS.push(wordPosition)

          if (_this.secondDrawing.pointsS.length > 2) {
            _this.secondDrawing.pointsS.shift()
          }

          // 绘制选点标记
          this.$refs.secondModelRef?.optContext?.clearAnchors()
          this.$nextTick(() => {
            this.$refs.secondModelRef?.optContext?.drawingLabel(_this.secondDrawing.pointsS)
          })

          // if (_this.secondDrawing.pointsS.length === 2) {
          //   this.$refs.secondModelRef?.optContext?.removeMouseClickEvent()
          //   this.$refs.secondModelRef?.optContext?.cancelMouseTips()
          // }
        })
      }
    },
    cancelSelectPoint (reserveFirstPoint = false, reserveSecondPoint = false) {
      if (this.startSelectPointTimer) {
        clearTimeout(this.startSelectPointTimer)
        this.startSelectPointTimer = null
      }
      // 鼠标跟随tips提示消除
      this.$refs.firstModelRef?.optContext?.cancelMouseTips()
      this.$refs.secondModelRef?.optContext?.cancelMouseTips()
      // 选点标记清除
      if (!reserveFirstPoint) {
        this.$refs.firstModelRef?.optContext?.clearAnchors()
      }
      if (!reserveSecondPoint) {
        this.$refs.secondModelRef?.optContext?.clearAnchors()
      }
      // 点击事件监听清除
      this.$refs.firstModelRef?.optContext?.removeMouseClickEvent()
      this.$refs.secondModelRef?.optContext?.removeMouseClickEvent()
    },
    getSelectedPoints () {
      return {
        firstPointsS: this.firstDrawing.pointsS || [],
        secondPointsS: this.secondDrawing.pointsS || []
      }
    },

    getComponentPropertyAsync (viewer3dOpt, componentId) {
      return new Promise(resolve => {
        viewer3dOpt.getComponentProperty(componentId, (data) => {
          resolve(data || null)
        })
      })
    },

    // 模型构件id转视图boundingBox
    async objectIdToSheetBoundingBox (componentId, viewer3d, viewer3dOpt, sheetId) {
      const _this = this
      function getRoomPropertyAsync (viewer3dOpt, componentId) {
        return new Promise(resolve => {
          viewer3dOpt.getRoomProperty(componentId, (data) => {
            resolve(data || null)
          })
        })
      }
      function modelPositionToDrawingPositionAsync (viewer3d, sheetId, point) {
        return new Promise(resolve => {
          viewer3d.getModel().getDrawingPosition(sheetId, point, data => {
            resolve(data || null)
          })
        })
      }
      return new Promise(async (resolve) => {
        let boundD = await _this.getComponentPropertyAsync(viewer3dOpt, componentId)
        if (boundD) {
          if (boundD) {
            let sheetPointMax = await modelPositionToDrawingPositionAsync(viewer3d, sheetId, boundD.boundingBox.max)
            let sheetPointMin = await modelPositionToDrawingPositionAsync(viewer3d, sheetId, boundD.boundingBox.min)
            if (sheetPointMax && sheetPointMin) {
              resolve({
                min: sheetPointMin,
                max: sheetPointMax
              })
            }
          }
          resolve(null)
        } else {
          let roomD = await getRoomPropertyAsync(viewer3dOpt, componentId)
          if (roomD) {
            let sheetPointMax = await viewer3dOpt.getDrawingPosition(sheetId, roomD.bboxMax)
            let sheetPointMin = await viewer3dOpt.getDrawingPosition(sheetId, roomD.bboxMin)
            if (sheetPointMax && sheetPointMin) {
              resolve({
                min: sheetPointMin,
                max: sheetPointMax
              })
            }
          }
          resolve(null)
        }
      })
    },
    zoomToBoundingBox (bounding, viewer) {
      // 取消图元选中
      viewer.clearSelection()

      let viewId = viewer.getCurrentViewId()

      // 设置误差阈值
      const threshold = 10
      let tempBounding = JSON.parse(JSON.stringify(bounding))
      tempBounding.min.x -= threshold
      tempBounding.min.y -= threshold
      tempBounding.max.x += threshold
      tempBounding.max.y += threshold
      let eleArr = viewer.getElementsByBoundingBox(viewId, tempBounding, 'Window', false)
      if (eleArr && eleArr.length) {
        viewer.zoomToObject({
          modelId: viewer.loadedDrawings[0].modelId,
          objectId: eleArr[0],
          ratio: 2
        })
      } else {
        const b = [
          [bounding.min.x, bounding.min.y],
          [bounding.max.x, bounding.max.y]
        ]
        viewer.zoomToBoundingBox(b, 2)
      }
    },
    BoundTrans (matric, bounding) {
      let boundingMin = null
      let boundingMax = null
      if (Array.isArray(bounding)) {
        boundingMin = {
          x: bounding[0][0],
          y: bounding[0][1]
        }
        boundingMax = {
          x: bounding[1][0],
          y: bounding[1][1]
        }
      } else {
        boundingMin = bounding.min
        boundingMax = bounding.max
      }
      return {
        min: util.coordinateTrans(boundingMin, matric),
        max: util.coordinateTrans(boundingMax, matric)
      }
    },
    enlarge (sheetBoundingBox, scale) {
      // 设置阈值
      const threshold = 10
      if (!sheetBoundingBox) return
      if(sheetBoundingBox.min && sheetBoundingBox.max) {
        let w = (sheetBoundingBox.max.x - sheetBoundingBox.min.x) * scale
        let h = (sheetBoundingBox.max.y - sheetBoundingBox.min.y) * scale
        w = w > threshold ? threshold : w
        h = h > threshold ? threshold : h
        sheetBoundingBox.min.x = sheetBoundingBox.min.x - w
        sheetBoundingBox.min.y = sheetBoundingBox.min.y - h
        sheetBoundingBox.max.x = sheetBoundingBox.max.x + w
        sheetBoundingBox.max.y = sheetBoundingBox.max.y + h
      }
    },
    inBound (bound1, bound2) {
      if (bound1 && bound2) {
        return bound1.min.x >= bound2.min.x && bound1.min.y >= bound2.min.y && bound1.max.x <= bound2.max.x && bound1.max.y <= bound2.max.y
      }
      return false
    },
    getMouseClickOrZoomFactorChangedListenerCb (first, second, matric) {
      const firstV = first.viewer
      const secondV = second.viewer
      const _this = this
      let sheetViewerAddedListener = false

      return async function (e) {
        if (!_this.matric) {
          return
        }
        // 图1 图2 均为图纸
        if (firstV.optContext.getViewer().viewerType === 'ViewerDrawing' && secondV.optContext.getViewer().viewerType === 'ViewerDrawing') {
          let stateData = firstV.optContext.getCurrentState()
          if (stateData) {
            let state = stateData.state
            // 图纸操作，则视图位置进行变换
            state.ViewCenter = util.coordinateTrans(
              state.ViewCenter,
              matric
            )

            stateData.state = state
            // 为防止叠图导致的批注偏移，只计算图纸中心点位置的偏移，保留原批注信息
            let annotationList = secondV.optContext.getCurrentState().annotationList
            stateData.annotationList = JSON.stringify(annotationList) || ''
            secondV.optContext.setViewState(stateData)
            // context.updateAnchors()
            // listenerContext.updateAnchors()
          }
        } else if (firstV.optContext.getViewer().viewerType === 'Viewer3D' && secondV.optContext.getViewer().viewerType === 'ViewerDrawing') {
          if (!e) {
            return
          }
          let componentId = e?.objectId || e[0]
          if (!componentId) {
            return
          }
          let sheetViewer = first.sheetViewer

          if (!sheetViewerAddedListener) {
            // 视图和图纸创建关联
            sheetViewer.addEventListener('zoomFactorChangedEvent', _this.getMouseClickOrZoomFactorChangedListenerCb(
              {viewer: sheetViewer}, second, matric
            ))
            sheetViewerAddedListener = true
          }

          // 根据模型构件ID获取对应图纸的构件ID
          sheetViewer.optContext.toDrawingId(componentId, async (elementIds) => {
            if (!Array.isArray(elementIds) && elementIds) {
              elementIds = [elementIds]
            }
            if (elementIds.length) {
              // 如果当前视图有对应的模型构件ID，就缩放到对应位置
              sheetViewer.optContext.zoomToObject({
                modelId: sheetViewer.optContext.getViewer().loadedDrawings[0].modelId,
                objectId: elementIds,
                ratio: 2
              });
              sheetViewer.optContext.update();
            } else {
              //
              let viewer3d = firstV.getBimfaceViewer
              let viewer3dOpt = firstV.optContext
              let sheetId = firstV.source.sheetId
              let sheetBounding = await _this.objectIdToSheetBoundingBox(componentId, viewer3d, viewer3dOpt, sheetId)
              if (sheetBounding) {
                // 视图上的包围盒转化为图纸包围盒
                let drawingBounding = _this.BoundTrans(matric, sheetBounding)
                // 缩放至包围盒
                let viewer2d = secondV.getBimfaceViewer
                _this.zoomToBoundingBox(drawingBounding, viewer2d)
              }
            }
          });
        } else if (firstV.optContext.getViewer().viewerType === 'ViewerDrawing' && secondV.optContext.getViewer().viewerType === 'Viewer3D') {
          if (!e || !e.objectId) {
            return
          }
          let bounding = firstV.optContext.getObjectBoundingBox(e.objectId)
          if (!bounding) {
            return
          }
          // 获取与图纸包围盒对应的视图上的区域
          let sheetBoundingBox = _this.BoundTrans(matric, bounding)
          // 视图区域边缘外扩 1% 进行容错处理
          _this.enlarge(sheetBoundingBox, 0.01)
          
          // 获取视图中区域内的图元列表
          let sheetViewer = second.sheetViewer
          let viewer3dOpt = secondV.optContext
          if (!sheetViewer) {
            return
          }
          let viewId = sheetViewer.optContext.getCurrentViewId()
          let eleArr = sheetViewer.optContext.getElementsByBoundingBox(viewId, sheetBoundingBox) || []
          // 过滤图元
          if (eleArr.length > 1) {
            let baseBound = [
              [sheetBoundingBox.min.x, sheetBoundingBox.min.y, sheetBoundingBox.min.z],
              [sheetBoundingBox.max.x, sheetBoundingBox.max.y, sheetBoundingBox.max.z]
            ]
            let eleT = null
            let eleTBounding = null
            // 过滤
            eleArr.forEach(eId => {
              let eleBoundingT = sheetViewer.optContext.getObjectBoundingBox(eId)
              if (eleBoundingT) {
                if (!eleT || util.similarThan(eleBoundingT, eleTBounding, baseBound)) {
                  eleT = eId
                  eleTBounding = eleBoundingT
                }
              }
            })
            eleArr = [eleT]
          }

          // 获取模型构件id
          let objectArr = eleArr.map(eId => {
            return sheetViewer.optContext.toModelId(eId)
          })

          let sheetId = secondV.source.sheetId
          let min = await drawingPositionToModelPosition(sheetId, sheetBoundingBox.min, sheetViewer.optContext.getViewer())
          let max = await drawingPositionToModelPosition(sheetId, sheetBoundingBox.max, sheetViewer.optContext.getViewer())
          let mBound = {
            min,
            max
          }

          let viewer3d = secondV.getBimfaceViewer

          if (objectArr.length) {
            let obj = objectArr[0]

            if (sheetViewer.getSingleModelFileId && !(obj + '').includes('.')) {
              obj = `${sheetViewer.getSingleModelFileId}.${obj}`
            }

            // 是否存在构件
            let isExist = viewer3d.getViewer().getComponentInfoByUserId([obj]);
            if (isExist || obj) {
              secondV.optContext.getViewer().clearIsolation()
              secondV.optContext.setSelectedComponentsById([obj])
              secondV.optContext.zoomToSelectedComponents();
              secondV.optContext.getViewer().render();
            } else {
              const boundD = await _this.getComponentPropertyAsync(viewer3dOpt, obj) 
              if (mBound && boundD && _this.inBound(boundD.boundingBox, mBound)) {
                _this.zoomToObjectBounding(viewer3d, boundD.boundingBox)
              } else if (mBound) {
                _this.zoomToObjectBounding(viewer3d, mBound)
              }
            }
          } else {
            _this.zoomToObjectBounding(viewer3d, mBound)
          }
        }

        // 重绘标签
        secondV.optContext.getDrawableContainer().update()
      }

      function drawingPositionToModelPosition(sheetId, point, viewer) {
        return new Promise(resolve => {
          viewer.getModelPosition(sheetId, point, (v) => {
            resolve(v)
          })
        })
      }
    },
    async zoomToObjectBounding (viewer3d, mBound) {
      const _this = this
      // 未获取到对应模型构件
      // 保证z坐标跨度
      if (mBound.max.z - mBound.min.z < 10) {
        let maxZValue = null
        const floors = await _this.getFloors(viewer3d)
        if (floors && Array.isArray(floors)) {
          let floor = floors.find(f => {
            return Math.abs(f.elevation - mBound.min.z) < 10
          })
          if (floor) {
            let floorBottom = floor.elevation
            let floorTop = null
            floors.forEach(f => {
              if (f.elevation > floorBottom) {
                if (!floorTop) {
                  floorTop = f.elevation
                } else if (f.elevation < floorTop) {
                  floorTop = f.elevation
                }
              }
            })
            if (floorTop) {
              maxZValue = floorTop
            }
          }
        }
        if (!maxZValue) {
          const boundaryPoints = viewer3d.getModelBoundaryPoints(
            viewer3d.getModel().modelId
          )
          const pointZList = boundaryPoints.map((point) => point.z)
          const maxZ = Math.max(...pointZList)
          // const minZ = Math.min(...pointZList)
          // let floorNum = Array.isArray(floors) ? floors.length : 5
          // maxZValue = mBound.min.z + (maxZ - minZ) / floorNum
          maxZValue = maxZ
        }

        mBound.max.z = maxZValue
      }
      viewer3d.zoomToBoundingBox(mBound, 0.5)
    },

    async getFloors (viewer3d) {
      return new Promise(resolve => {
        viewer3d.getModel().getFloors((objectdata) => {
          resolve(objectdata)
        });
      })
    },
    initEventListenerBetween () {
      if (!this.matric) {
        return
      }
      const _this = this
      const firstV = this.firstDrawing.viewer
      const secondV = this.secondDrawing.viewer

      let matric = _this.matric 
      if (typeof _this.matric === 'string') {
        matric = JSON.parse(_this.matric)
      }
      if (typeof _this.matric === 'object') {
        let points = [
          ..._this.matric.drawingPoints,
          ..._this.matric.sheetPoints,
        ]
        if (points.length === 8) {
          matric = util.getMatric4Data(points).flat()
        } else {
          return
        }
      }
      let contraryMatric = (util.inv(util.groupList(matric, 4)) || []).flat()
      let eventFunc1 = this.getMouseClickOrZoomFactorChangedListenerCb(this.firstDrawing, this.secondDrawing, contraryMatric)
      let eventFunc2 = this.getMouseClickOrZoomFactorChangedListenerCb(this.secondDrawing, this.firstDrawing, matric)
      firstV && firstV.addEventListener('mouseClickEvent', eventFunc1)
      // firstV.addEventListener('eleSelectionChanged', eventFunc1)
      firstV && firstV.addEventListener('zoomFactorChangedEvent', eventFunc1)
      secondV && secondV.addEventListener('mouseClickEvent', eventFunc2)
      // secondV.addEventListener('eleSelectionChanged', eventFunc2)
      secondV && secondV.addEventListener('zoomFactorChangedEvent', eventFunc2)

      firstV && firstV.addEventListener('annorActiveEvent', (data) => {
        if (_this.currentAnnorIndex === data.annorIndex) {
          return
        }
        _this.currentAnnorIndex = data.annorIndex
        if (data.annorIndex !== null) {
          let annorD = data.annorData
          if (annorD) {
            let min = {
              x: 0,
              y: 0
            }
            let max = {
              x: 1,
              y: 1
            }
            if (annorD.drawingEleBox) {
              let minX = Math.min(annorD.drawingEleBox[0].x, annorD.drawingEleBox[1].x)
              let maxX = Math.max(annorD.drawingEleBox[0].x, annorD.drawingEleBox[1].x)
              let minY = Math.min(annorD.drawingEleBox[0].y, annorD.drawingEleBox[1].y)
              let maxY = Math.max(annorD.drawingEleBox[0].y, annorD.drawingEleBox[1].y)
              min = {
                x: minX,
                y: minY
              }
              max = {
                x: maxX,
                y: maxY
              }
            } else {
              min = util.coordinateTrans({
                x: annorD.box.minX,
                y: annorD.box.minY
              }, contraryMatric)
              max = util.coordinateTrans({
                x: annorD.box.maxX,
                y: annorD.box.maxY
              }, contraryMatric)
            }
            // let markups = [{
            //     annor: null,
            //     annotations: [
            //       {
            //         minX: min.x,
            //         minY: min.y,
            //         maxX: max.x,
            //         maxY: max.y,
            //         markupType: "my_CloudRect",
            //         strokeStyle: "rgba(255,0,0,1)"
            //       }
            //     ]
            // }]
            // secondV.setMarkupList(markups, 'review_result')
            // 缩放至包围盒
            // let viewer2d = secondV.getBimfaceViewer
            // _this.zoomToBoundingBox({
            //   min,
            //   max
            // }, viewer2d)

            // 左侧为模型时，模型annorIndex改变，右侧图纸区域跟随变化
            if (_this.firstDrawing.show3D) {
              _this.zoomToBoundingBox({
                min,
                max
              }, secondV.getBimfaceViewer)
            }
          }
        } else {
          // secondV.setMarkupList([], 'review_result')
        }

        setTimeout(() => {
          util.windowResize()
        }, 100)
      })

      firstV && firstV.addEventListener('annorUnActiveEvent', (data) => {
        if (_this.currentAnnorIndex === data.annorIndex) {
          // secondV.setMarkupList([], 'review_result')
          _this.currentAnnorIndex = null
        }
      })
    },

    // 根据视图中点的位置换算模型中点的位置
    getModelPositionByViewPosition (point) {
      let sheetId = this.firstDrawing.source.sheetId
      let viewer = this.firstDrawing?.sheetViewer?.optContext?.getViewer()
      return new Promise(resolve => {
        if (sheetId && viewer && viewer.getModelPosition) {
          viewer.getModelPosition(sheetId, point, (v) => {
            resolve(v)
          })
        } else {
          resolve(null)
        }
      })
    }
  },
  watch: {
    fold: {
      handler (val) {
        let v = {
          status: val ? 'fold' : 'split'
        }
        this.$emit('foldOrSplitChanged', v)
      }
    },
    firstAndSecondAllLoaded: {
      handler (val) {
        if (val) {
          this.initEventListenerBetween()

          if (this.afterLoad) {
             this.afterLoad()
          }
        }
      }
    },
    foldSwitch: {
      handler (val) {
        if (!val) {
          this.firstDrawing.loaded = false
          this.secondDrawing.loaded = false
        }
      }
    },
    'firstDrawing.show3D': {
      handler (val, oldV) {
        if (val === !oldV) {
          this.firstDrawing.loaded = false
        }
      }
    },
    'secondDrawing.show3D': {
      handler (val, oldV) {
        if (val === !oldV) {
          this.secondDrawing.loaded = false
        }
      }
    },
    firstData: {
      handler (val) {
        if (val) {
          if (this.firstDrawing?.source?.token !== val?.source?.token || this.firstDrawing?.source?.sheetId !== val?.source?.sheetId) {
            this.firstDrawing = {
              ...val,
              loaded: false,
              pointsS: []
            }

            // 视图切换时 取消之前选点
            this.cancelSelectPoint()
          }
        }
      },
      deep: true,
      immediate: true
    },
    secondData: {
      handler (val) {
        if (val) {
          if (this.secondDrawing?.source?.token !== val?.source?.token) {
            this.secondDrawing = {
              show3D: false,
              ...val,
              loaded: false,
              pointsS: []
            }
          }
        }
      },
      deep: true,
      immediate: true
    },
    matricData: {
      handler (val) {
        this.setMatric(val)
      },
      immediate: true
    },

    'secondDrawing.loaded': {
      handler (val) {
        this.$emit('changeSecondDrawingLoaded', val)
      }
    },
    'firstDrawing.loaded': {
      handler (val) {
        this.$emit('changeFirstDrawingLoaded', val)
      }
    }
  }
}
</script>

<style lang="less" scoped>
.model_set_view_box, .model_split_view_box{
  height: 100%;
  width: 100%;
}
.model_split_view_box {
  display: flex;
  .model_view_box{
    height: 100%;
    width: 50%;
    flex-grow: 1;
    background: #000;
    position: relative;

    .model_view_content{
      width: 100%;
      height: 100%;
    }
    .model_view_content.hidden{
      position: relative;
      transform: translateY(-100%);
      z-index: -1;
      visibility: hidden;
    }
    .no_data_tip{
      display: block;
      width: 400px;
      height: 100px;
      line-height: 100px;
      text-align: center;
      margin: auto;
      border-radius: 4px;
      top: calc(50% - 50px);
      position: relative;
      color: #fff;
      .icon-kong{
        color: #40424c;
        font-size: 170px;
      }
      .text{
        color: #d1d1d1;
        font-size: 14px;
        line-height: 32px;
        margin-top: -24px;
      }
    }

    .switch_btn{
      position: absolute;
      right: 24px;
      top: 12px;

      height: 40px;
      padding: 0px 12px;
      line-height: 40px;
      
      z-index: 9;

      background: #363842;
      color: #d1d1d1;
      font-size: 14px;
      border-radius: 2px;
      outline: none;
      cursor: pointer;
    }
  }
  .column_line{
    z-index: 9;
    width: 2px;
    // background: #626060;
    background: #000;
  }

  :deep(.bf-container .bf-house) {
    top: 57px !important;
    width: 100px !important;
    height: 100px !important;
    canvas {
      width: 100px !important;
      height: 100px !important;
    }
    .bf-menu-svg{
      top: 72px !important;
    }
  }
}

.split_fold_trigger {
  color: #fff;
  width: 150px;
  height: 40px;
  line-height: 40px;
  background-color: rgba(24, 24, 30, 1);
  z-index: 9;
  display: flex;
  position: absolute;
  top: 12px;
  right: 78px;
  text-align: center;
  cursor: pointer;
  font-size: 14px;
  transition: right 100ms;

  &.with_comment_list {
    right: 528px;
  }

  .split_fold_trigger_item {
    width: 50%;
    border: 1px solid rgba(84, 86, 100, 1);
    border-radius: 2px;
  }

  .active {
    background-color: rgba(54, 56, 66, 1);
  }
}
</style>
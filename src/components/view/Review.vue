<template> <!--  图纸模型展示 -->
  <div :class="`__gda_sdk model_review ${display.split ? '__split' : '__nest'}`">
    
    <!-- 主窗 -->
    <div class="main_w model_view_box">
      <div id="mainModelView" ref="mainModelView" class="model_view"></div>
    </div>

    <!-- 小窗 -->
    <div v-if="hasSubW" class="sub_w model_view_box" :class="display.packupClz">
      <div class="header">
        <template v-if="!display.packup">
          <!-- <el-select
            ref="select"
            @click.native="handleClick"
            style="height: 24px;"
           :teleported="false"
            v-model="sub.source.token">
            <el-option v-for="s in sub.subList" :key="s.token" :label="s.name" :value="s.token"></el-option>
          </el-select> -->

          <MySelect class="view_list_select"
          :dataList="subList"
          v-model:modelValue="sub.source.token"></MySelect>

          <!-- 分屏/小窗切换 -->
          <span class="to_little_span" v-if="display.split" @click="splitW(!display.split)">切回小窗</span>
          <i
            :title="display.split ? '小窗' : '分屏'"
            :class="`gda_sdk_iconfont sub_header_icon fenping ${display.split ? 'icon-qiehuixiaochuang' : 'icon-banpingzhanshi'}`"
            @click="splitW(!display.split)">
          </i>
        </template>

        <!-- 收起/展开切换 -->
        <i v-if="!display.split"
          :title="display.packup ? '展开' : '收起'"
          :class="`gda_sdk_iconfont sub_header_icon ${display.packup ? 'icon-moxing zhankai' : ' icon-shouqimulu shouqi'}`"
          @click="packupSubW(!display.packup)">
        </i>
      </div>
      <div id="subModelView" ref="subModelView" class="model_view"></div>
      
      <!-- 视图 -->
      <div v-if="hasSubSheet" id="subBackSheetModelView" ref="subSheetView" class="model_sheet_view"></div>
    </div>
  </div>
</template>

<script>
/* Copyright (C) <1998-2024> Glodon Company Limited
 * Licensed under the MIT License
 * Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the “Software”), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
 * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
 * THE SOFTWARE IS PROVIDED “AS IS”, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */
import Model from '../../../lib/Model'
import util from '../../plugins/util.js'
import {ElSelect, ElOption} from 'element-plus'
import MySelect from './components/Select.vue'
export default {
  components: {
    ElSelect, ElOption,
    MySelect
  },
  data () {
    return {
      a: '',
      display: {
        split: false, // false大小屏, true 分屏
        packup: false, // true 收起, false 展开
        packupClz: '',
      },
      main: { // 主窗
        config: {},
        source: {
          type: "",
          token: null,
        },
        viewer: null
      },
      sub: { // 小窗图
        config: {},
        source: {
          name: "",
          type: "",
          token: null,
        },
        subList: [
          {
            name: "",
            type: "",
            token: "",
            autoLink: {
              source: {
                name: "",
                type: "modelsheet",
                token: null,
                sheetId: null
              },
              matric: null
            }
          }
        ],
        viewer: null,

        // 联动时需要的中间视图数据
        sheet: { // 视图窗
          source: {
            name: "",
            type: "modelsheet",
            token: null,
            sheetId: null
          },
          matric: null,
          viewer: null
        }
      },
    }
  },
  props: {
    bimfaceHost: {
      type: String,
      default: "https://static.bimface.com",
    },
    source: {
      type: Object
    },
    afterLoad: {
      type: Function
    },
    ableAutoLink: {
      default: false,
      type: Boolean
    }
  },
  computed: {
    isSplitDisplay () {
      return this.display.split
    },
    hasSubW () {
      return this.sub.source.token
    },
    hasSubSheet () {
      return this.sub.sheet.source.token
    },
    mainModel () {
      return this.main.viewer
    },
    subModel () {
      return this.sub.viewer
    },
    sheetModel () {
      return this.sub.sheet.viewer
    },
    isSameModel () {
      return this.main.source.token && (this.main.source.token === this.sub.source.token) && (this.main.source.type === this.sub.source.type)
    },

    subList () {
      return this.sub.subList.map(item => {
        return {
          ...item,
          key: item.token,
          label: item.name
        }
      })
    }
  },
  mounted () {
    // this.loadMainW()
    // this.loadSubW()
  },
  methods: {
    handleClick () {
      this.$refs.select.toggleMenu();
    },
    loadMainW () {
      const _this = this
      if (this.main.viewer) {
        this.main.viewer.reload(this.main.source)
        return
      }
      let c = {
        el: "#mainModelView",
        source: this.main.source,
        bimfaceHost: this.bimfaceHost,
        autoLinkFunc: (val) => {_this.componentSelectChanged(val, 'main')},
        ...this.main.config,
      }
      let mainModel = new Model(c)
      mainModel.load("#mainModelView", (val) => {
        if (this.afterLoad && !this.afterLoadHasRun) {
          this.afterLoad(val)
          this.afterLoadHasRun = true
        }
        if (_this.reloadListener) {
          _this.reloadListener(_this)
          _this.reloadListener = null
        }

        // 获取该模型的所有视图数据
        val.optContext.getAllDrawingsheets && val.optContext.getAllDrawingsheets()
      })
      this.main.viewer = mainModel
    },
    loadSubW () {
      const _this = this
      // 若小窗模型与主窗口一致，则不加载
      if (this.isSameModel) {
        return
      }
      if (this.sub.viewer) {
        this.sub.viewer.reload(this.sub.source)
        return
      }
      let c = {
        el: "#subModelView",
        source: this.sub.source,
        hideBimToolBar: true,
        hideTextSearch: true,
        bimfaceHost: this.bimfaceHost,
        autoLinkFunc: (val) => {_this.componentSelectChanged(val, 'sub')},
        ...this.sub.config,
        drawable: false // 重要,不可去除
      }
      let subModel = new Model(c)
      subModel.load("#subModelView", (val) => {
        if (_this.subLoadCallBack) {
          _this.subLoadCallBack(val)
          _this.subLoadCallBack = null
        }

        // 获取该模型的所有视图数据
        val.optContext.getAllDrawingsheets && val.optContext.getAllDrawingsheets()
      })
      this.sub.viewer = subModel
    },
    loadSubSheetW () {
      if (this.sub.sheet.viewer) {
        this.sub.sheet.viewer.reload(this.sub.sheet.source)
        return
      }
      let c = {
        el: "#subBackSheetModelView",
        source: this.sub.sheet.source,
        hideBimToolBar: true,
        bimfaceHost: this.bimfaceHost,
        drawable: false // 重要,不可去除
      }
      let subModel = new Model(c)
      subModel.load("#subBackSheetModelView")
      this.sub.sheet.viewer = subModel
    },
    reload (source, callBack) {
      this.setSourceData(source)
      this.reloadListener = callBack
    },
    splitW (b) {
      this.display.split = b
      if (b) {
        this.sub.viewer.showBimToolBar()
      } else {
        this.sub.viewer.hideBimToolBar()
      }

      setTimeout(() => {
        util.windowResize()
      }, 10)
    },
    packupSubW (b) {
      this.display.packup = b
      if (b) {
        this.display.packupClz = 'sub_w_packup'
      } else {
        this.display.packupClz = 'sub_w_expand'
      }
    },
    setSourceData (val) {
      if (val.main) {
        this.main.source = val.main.source || {}
        this.main.config = val.main.config || {}
      }
      if (val.sub) {
        this.sub.source = val.sub.source || {}
        this.sub.config = val.sub.config || {}
        this.sub.subList = val.sub.subList.filter(s => {
          return s.token
        }) || []
      } else {
        this.sub.source = {
          name: "",
          type: "",
          token: null
        }
        this.sub.config = {}
        this.sub.subList = []
      }
    },

    // 联动
    componentSelectChanged ({modelView, objectData, elementIdsData, triggerByAnnorActive = false}, cType) {
      let viewer = modelView.getBimfaceViewer
      if (!this.ableAutoLink) {
        return
      }
      if (!viewer) {
        return
      }
      if (!this.sheetModel) {
        return
      }
      let type = viewer.viewerType
      let listenViewer = null
      if (cType === 'main') {
        listenViewer = this.subModel.viewer
      } else if (cType === 'sub') {
        listenViewer = this.mainModel.viewer
      }

      if (type == 'Viewer3D') {
        this.autoLink3dTo2d({
          modelView3d: modelView,
          modelViewSheet: this.sheetModel.viewer,
          sheetId: this.sub.sheet.source.sheetId,
          matric: this.matricFormat(this.sub.sheet.matric),
          modelView2d: listenViewer,
          objectData,
          triggerByAnnorActive,
          cType
        })
      } else {
        this.autoLink2dTo3d({
          modelView3d: listenViewer,
          modelViewSheet: this.sheetModel.viewer,
          sheetId: this.sub.sheet.source.sheetId,

          matric: this.sub.sheet.matric,
          modelView2d: modelView,
          objectData,
          elementIdsData,
          triggerByAnnorActive
        })
      }
    },
    matricFormat (matricData) {
      let matric = null
      if (matricData) {
        if (Array.isArray(matricData)) {
          matric = matricData
        } else {
          matric = util.getMatricParam([
            ...matricData.drawingPoints,
            ...matricData.sheetPoints,
          ])
        }
      }
      return matric
    },

    // 模型构件id换算为视图图元id
    toDrawingId (componentId, sheetViewer) {
      return new Promise((resolve) => {
        if (sheetViewer?.optContext) {
          sheetViewer.optContext.toDrawingId(componentId, (drawingId) => {
            resolve(drawingId)
          })
        } else {
          resolve(null)
        }
      })
    },
    getRoomPropertyAsync (viewer3dOpt, componentId) {
      return new Promise(resolve => {
        viewer3dOpt.getRoomProperty(componentId, (data) => {
          resolve(data || null)
        })
      })
    },

    // 模型构件id转视图boundingBox
    async objectIdToSheetBoundingBox (componentId, viewer3d, viewer3dOpt, sheetId, modelViewSheet) {
      const _this = this
      function getComponentPropertyAsync (viewer3dOpt, componentId) {
        return new Promise(resolve => {
          viewer3dOpt.getComponentProperty(componentId, (data) => {
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
        let sheetElesBoundInfo = null
        if (modelViewSheet) {
          let drawingEleIds = await this.toDrawingId(componentId, modelViewSheet)
          if (drawingEleIds) {
            if (Array.isArray(drawingEleIds)) {
              drawingEleIds.forEach(eleId => {
                if (!sheetElesBoundInfo) {
                  sheetElesBoundInfo = []
                }
                sheetElesBoundInfo.push({
                  eleId,
                  bounding: modelViewSheet.optContext.getObjectBoundingBox(eleId)
                })
              })
            } else {
              if (!sheetElesBoundInfo) {
                sheetElesBoundInfo = []
              }
              sheetElesBoundInfo.push({
                eleId: drawingEleIds,
                bounding: modelViewSheet.optContext.getObjectBoundingBox(drawingEleIds)
              })
            }
          }
        }
        let boundD = await getComponentPropertyAsync(viewer3dOpt, componentId)
        if (boundD) {
          let sheetPointMax = await modelPositionToDrawingPositionAsync(viewer3d, sheetId, boundD.boundingBox.max)
          let sheetPointMin = await modelPositionToDrawingPositionAsync(viewer3d, sheetId, boundD.boundingBox.min)
          if (sheetPointMax && sheetPointMin) {
            resolve({
              min: sheetPointMin,
              max: sheetPointMax,
              sheetElesBoundInfo
            })
          }
          resolve(null)
        } else {
          let roomD = await _this.getRoomPropertyAsync(viewer3dOpt, componentId)
          if (roomD) {
            // let sheetPointMax = await modelPositionToDrawingPositionAsync (viewer3d, sheetId, roomD.bboxMax)
            // let sheetPointMin = await modelPositionToDrawingPositionAsync(viewer3d, sheetId, roomD.bboxMin)
            let sheetPointMax = await viewer3dOpt.getDrawingPosition(sheetId, roomD.bboxMax)
            let sheetPointMin = await viewer3dOpt.getDrawingPosition(sheetId, roomD.bboxMin)
            if (sheetPointMax && sheetPointMin) {
              resolve({
                min: sheetPointMin,
                max: sheetPointMax,
                sheetElesBoundInfo
              })
            }
          }
          resolve(null)
        }
      })
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
    // 矩阵求逆
    getContraryMatric (m) {
      let matric = JSON.parse(JSON.stringify(m))
      if (typeof matric == 'string') {
        matric = JSON.parse(matric)
      }
      if (typeof matric == 'object') {
        let points = [
          ...matric.sheetPoints,
          ...matric.drawingPoints,
        ]
        if (points.length == 8) {
          matric = util.getMatric4Data(points).flat()
          return (util.inv(util.groupList(matric, 4)) || []).flat()
        }
      }
      return null
    },
    autoLink3dTo2d ({objectData, modelView2d, modelView3d, modelViewSheet, sheetId, matric, cType}) {
      const _this = this
      let viewer3dOpt = modelView3d.optContext
      let viewer3d = modelView3d.getBimfaceViewer
      let viewer2d = modelView2d.getBimfaceViewer
      let viewerSheet = modelViewSheet.getBimfaceViewer
      let viewer2dMarkupPoolTool = modelView2d.getMarkupPoolTool && modelView2d.getMarkupPoolTool()

      if (!objectData.length) {
        // 取消选中
        if (cType == 'main') {
          viewer2dMarkupPoolTool.setList([], 'review_result')
        }
        return
      }

      let objectId = objectData[0]

      let singleModelFileId = modelViewSheet.getSingleModelFileId
      if (singleModelFileId && !(objectId + '').includes('.')) {
        objectId = `${singleModelFileId}.${objectId}`
      }

      viewer3dOpt.getDrawingListbyId(objectId, (list) => {
        if(list && list.length) {
          const sublinkD = _this.sub.subList.find(sI => {
            if (sI.autoLink) {
              return list.find(l => {
                return l.viewInfo.name === sI.autoLink.source.name
              })
            }
            return false
          })
          if(!sublinkD) {
            return
          }
          if (sublinkD.token === _this.sub.source.token) { // 当前图纸命中
            // 联动
            autoActive(objectId, cType)
          } else if (sublinkD.token) {
            // 切换图纸
            _this.sub.source.token = sublinkD.token

            _this.subLoadCallBack = () => {
              // 联动
              setTimeout(() => {
                // 重新对viewer2d赋值
                viewer2d = modelView2d.getBimfaceViewer

                // 重新计算matric数据
                matric = this.matricFormat(this.sub.sheet.matric)

                autoActive(objectId, cType)
              }, 1000)
            }
          }
        }
      })

      async function autoActive (objectId, cType) {
        // 取消图元选中和高亮
        viewer2d.clearSelection()
        viewer2d.clearHighlight()

        /*-- 缩放至图纸包围盒并选中图元 --start */
        let currentSheetId = _this.sub.sheet.source.sheetId
        let sheetBounding = await _this.objectIdToSheetBoundingBox(objectId, viewer3d, viewer3dOpt, currentSheetId, modelViewSheet)
        if (sheetBounding) {
          // 视图上的包围盒转化为图纸包围盒
          let drawingBounding = _this.BoundTrans(matric, sheetBounding)
          // 缩放至包围盒
          zoomToBoundingBox(drawingBounding, viewer2d)
          // 处理图元选中
          if (sheetBounding.sheetElesBoundInfo) {
            highlightHitEleInDrawing(sheetBounding.sheetElesBoundInfo, viewer2d)
          }

          // 绘制线框区域进行构件指定
          if (cType == 'main') {
            drawMarkupBound(drawingBounding, viewer2dMarkupPoolTool)
          }
        }
        /*-- 缩放至图纸包围盒并选中图元 --end */

        function zoomToBoundingBox (bounding, viewer) {
          // 缩放至图纸区域
          const b = [
            [bounding.min.x, bounding.min.y],
            [bounding.max.x, bounding.max.y]
          ]
          viewer.zoomToBoundingBox(b, 1.5)
        }
        function highlightHitEleInDrawing (sheetElesBoundInfo, viewer) {
          let eleIds = []
          sheetElesBoundInfo.forEach(eleBoundInfo => {
            let viewId = viewer.getCurrentViewId()
            let bounding = {
              min: {
                x: eleBoundInfo.bounding[0][0],
                y: eleBoundInfo.bounding[0][1]
              },
              max: {
                x: eleBoundInfo.bounding[1][0],
                y: eleBoundInfo.bounding[1][1]
              }
            }
            bounding = _this.BoundTrans(matric, bounding)
            let eleArr = viewer.getElementsByBoundingBox(viewId, sacleBounding(bounding, 0.05), 'Window', false)
            if (eleArr && eleArr.length) {
              let eleId = findBiggestEle(eleArr, viewer)
              eleIds.push(eleId)
            }
          })
          if (eleIds.length) {
            viewer.highlightById && viewer.highlightById(eleIds)
            viewer.getViewer()?.select && viewer.getViewer()?.select({
              objectIds: eleIds
            })
            viewer.render()
          }
        }

        function sacleBounding (bounding, scale = 0.05) {
          // 设置误差阈值
          const threshold = 5
          let ret = JSON.parse(JSON.stringify(bounding))
          let width = (ret.max.x - ret.min.x) > 0 ? (ret.max.x - ret.min.x) : threshold
          let height = (ret.max.y - ret.min.y) > 0 ? (ret.max.y - ret.min.y) : threshold
          ret.min.x -= width * scale
          ret.min.y -= height * scale
          ret.max.x += width * scale
          ret.max.y += height * scale
          return ret
        }
        function findBiggestEle (eles, viewer) {
          eles.sort((a, b) => {
            let bound1 = viewer.getObjectBoundingBox(a)
            let bound2 = viewer.getObjectBoundingBox(b)
            if (bound1 && bound2) {
              return (bound2[1][0] - bound2[0][0] + bound2[1][1] - bound2[0][1]) - 
              (bound1[1][0] - bound1[0][0] + bound1[1][1] - bound1[0][1])
            }
            return 1
          })
          let ret = eles[0]
          return ret
        }
        
        function drawMarkupBound (bound, viewer2dMarkupPoolTool) {
          if (viewer2dMarkupPoolTool && bound) {
            let box = bound
            if (!box || !box.max || !box.min) {
              return
            }
            let list = [{
              annor: null,
              annotations: [{
                minX: box.min.x ? Number(box.min.x) : 0,
                minY: box.min.y ? Number(box.min.y) : 0,
                maxX: box.max.x ? Number(box.max.x) : 0,
                maxY: box.max.y ? Number(box.max.y) : 0,
                markupType: "my_CloudRect",
                strokeStyle: "rgba(255,0,0,1)"
              }]
            }]
            viewer2dMarkupPoolTool.setList(list, 'review_result')
          }
        }

      }
    },
    createRoom (viewer, boundary, height, id) {
      let roomConfig = new Glodon.Bimface.Plugins.Rooms.RoomConfig()
      roomConfig.viewer = viewer;
      roomConfig.roomId = id;
      roomConfig.geometry = {
          type: "extrusion",
          boundary: boundary,
          height: height
      };
      //给房间着色
      roomConfig.roomColor = new Glodon.Web.Graphics.Color(97, 179, 191, 0.2);
      //给房间的线框着色
      roomConfig.frameColor = new Glodon.Web.Graphics.Color(97, 179, 191, 1);
      let room = new Glodon.Bimface.Plugins.Rooms.Room(roomConfig);
      viewer.getRoomManager().addRoom(room);
      viewer.render();
    },
    async autoLink2dTo3d ({objectData, elementIdsData, modelView2d, modelView3d, modelViewSheet, sheetId, matric, triggerByAnnorActive}) {
      const _this = this
      let viewer3d = modelView3d.getBimfaceViewer
      let viewer3dOpt = modelView3d.optContext
      let viewer3dMarkupPoolTool = modelView3d.getMarkupPoolTool && modelView3d.getMarkupPoolTool()
      let viewer2d = modelView2d.getBimfaceViewer
      let viewerSheet = modelViewSheet.getBimfaceViewer
      
      if (Array.isArray(objectData) && objectData.filter(o => o).length) {
        let objectId = objectData[0]
        // 取消构件隔离
        viewer3d.clearIsolation()

        // 取消构件选中
        viewer3d.clearSelectedComponents()

        // 获取图纸选中图元的包围盒
        let drawingBounding = viewer2d.getObjectBoundingBox(objectId)
        if (!drawingBounding) {
          return
        }

        // 图纸包围盒转化为视图上的包围盒区域
        let cM = this.getContraryMatric(matric)
        if (!cM) {
          return
        }
        let sheetBoundingBox = this.BoundTrans(cM, drawingBounding)
        // 获取视图中区域内的图元列表
        let viewId = viewerSheet.getCurrentViewId()
        function sacleBounding (bounding, scale = 0.05) {
          // 设置误差阈值
          const threshold = 5
          let ret = JSON.parse(JSON.stringify(bounding))
          let width = (ret.max.x - ret.min.x) > 0 ? (ret.max.x - ret.min.x) : threshold
          let height = (ret.max.y - ret.min.y) > 0 ? (ret.max.y - ret.min.y) : threshold
          ret.min.x -= width * scale
          ret.min.y -= height * scale
          ret.max.x += width * scale
          ret.max.y += height * scale
          return ret
        }
        // 视图区域边缘外扩 5% 进行容错处理
        sheetBoundingBox = sacleBounding(sheetBoundingBox, 0.05)
        let eleArr = viewerSheet.getElementsByBoundingBox(viewId, sheetBoundingBox, 'Window', false) || []
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
            let eleBoundingT = viewerSheet.getObjectBoundingBox(eId)
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
          return modelViewSheet.optContext.toModelId(eId)
        })

        let min = await drawingPositionToModelPosition(sheetId, sheetBoundingBox.min, viewerSheet)
        let max = await drawingPositionToModelPosition(sheetId, sheetBoundingBox.max, viewerSheet)
        let mBound = {
          min,
          max
        }

        if (objectArr.length) {
          let obj = objectArr[0]

          if (this.sub.sheet.source.singleModelFileId && !(obj + '').includes('.')) {
            obj = `${this.sub.sheet.source.singleModelFileId}.${obj}`
          }
          // 是否存在构件
          let isExist = viewer3d.getViewer().getComponentInfoByUserId([obj]);
          if (isExist || obj) {
            viewer3d.clearIsolation()
            viewer3d.setSelectedComponentsById([obj])
            viewer3d.zoomToSelectedComponents();
            viewer3d.render();

            if (triggerByAnnorActive) {
              let boundingBox = viewer3d.getBoundingBoxById(obj)
              // 展示本楼层
              if (boundingBox && viewer3dMarkupPoolTool) {
                viewer3dMarkupPoolTool.sectionFloorByEleBounding(null, boundingBox)
              }
            }
          } else if (mBound) {
            const boundD = await getComponentPropertyAsync(viewer3dOpt, obj)
            if (mBound && boundD && inBound(boundD.boundingBox, mBound)) {
              zoomToObjectBounding(boundD.boundingBox)
            } else if (mBound) {
              zoomToObjectBounding(mBound)
            }

            if (triggerByAnnorActive) {
              // 展示本楼层
              if (viewer3dMarkupPoolTool) {
                viewer3dMarkupPoolTool.sectionFloorByEleBounding(null, mBound)
              }
            }
          }
        } else {
          zoomToObjectBounding(mBound)

          if (triggerByAnnorActive) {
            // 展示本楼层
            if (viewer3dMarkupPoolTool) {
              viewer3dMarkupPoolTool.sectionFloorByEleBounding(null, mBound)
            }
          }
        }
      } else if (Array.isArray(elementIdsData) && elementIdsData.length) {
        let obj = elementIdsData[0]
        if (this.sub.sheet.source.singleModelFileId && !(obj + '').includes('.')) {
          obj = `${this.sub.sheet.source.singleModelFileId}.${obj}`
        }
        // 是否存在构件
        let isExist = viewer3d.getViewer().getComponentInfoByUserId([obj]);
        if (isExist || obj) {
          viewer3d.clearIsolation()
          viewer3d.setSelectedComponentsById([obj])
          viewer3d.zoomToSelectedComponents();
          viewer3d.render();

          if (triggerByAnnorActive) {
            let boundingBox = viewer3d.getBoundingBoxById(obj)
            // 展示本楼层
            if (boundingBox && viewer3dMarkupPoolTool) {
              viewer3dMarkupPoolTool.sectionFloorByEleBounding(null, boundingBox)
            }
          }
        } else {
          // 清空之前绘制的房间
          viewer3dOpt.clearAllRooms()
          let roomdata = await this.getRoomPropertyAsync(viewer3dOpt, obj)
          if (roomdata && roomdata.boundary) { // 绘制房间
            viewer3d.zoomToBoundingBox({
              min: roomdata.bboxMin,
              max: roomdata.bboxMax
            }, 1)
            const boundary = roomdata.boundary
            _this.createRoom(viewer3d, boundary, roomdata.bboxMax.z - roomdata.bboxMin.z, roomdata.id)

            if (triggerByAnnorActive) {
              // 展示本楼层
              if (viewer3dMarkupPoolTool) {
                viewer3dMarkupPoolTool.sectionFloorByEleBounding(null, {
                  min: roomdata.bboxMin,
                  max: roomdata.bboxMax
                })
              }
            }
          } else {
            viewer3d.render();
          }
        }
      } else { // 清空
        viewer3dMarkupPoolTool.clearFloorSection()
      }

      function inBound(bound1, bound2) {
        if (bound1 && bound2) {
          return bound1.min.x >= bound2.min.x && bound1.min.y >= bound2.min.y && bound1.max.x <= bound2.max.x && bound1.max.y <= bound2.max.y
        }
        return false
      }

      async function zoomToObjectBounding (mBound) {
        // 未获取到对应模型构件
        // 保证z坐标跨度
        if (mBound.max.z - mBound.min.z < 10) {
          let maxZValue = null
          const floors = await getFloors(viewer3d)
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
      }

      async function getFloors (viewer3d) {
        return new Promise(resolve => {
          viewer3d.getModel().getFloors((objectdata) => {
            resolve(objectdata)
          });
        })
      }

      function getComponentPropertyAsync (viewer3dOpt, componentId) {
        return new Promise(resolve => {
          viewer3dOpt.getComponentProperty(componentId, (data) => {
            resolve(data || null)
          })
        })
      }

      function drawingPositionToModelPosition(modelId, point, viewer) {
        return new Promise(resolve => {
          viewer.getModelPosition(modelId, point, (v) => {
            resolve(v)
          })
        })
      }
    },

    setSubDrawingData (subSourceToken) {
      let sublinkD = this.sub.subList.find(s => {
        return s.token === subSourceToken
      })
      if (sublinkD) {
        this.sub.source.name = sublinkD.name
        this.sub.source.sheetId = sublinkD.sheetId
        this.sub.source.type = sublinkD.type
        // 切换视图
        if (sublinkD.autoLink && sublinkD.autoLink.source.token) {
          if (sublinkD.autoLink.source.singleModelFileId) {
            this.sub.sheet.source.singleModelFileId = sublinkD.autoLink.source.singleModelFileId
          } else {
            this.sub.sheet.source.singleModelFileId = null
          }
          this.sub.sheet.source.token = sublinkD.autoLink.source.token
          this.sub.sheet.source.sheetId = sublinkD.autoLink.source.sheetId
          this.sub.sheet.source.name = sublinkD.autoLink.source.name
          this.sub.sheet.matric = sublinkD.autoLink.matric
        }
      }
    },

    addEventListener (type, listener) {
      this.mainModel.addEventListener && this.mainModel.addEventListener(type, listener)
      if (type === 'walkthroughDataChangedEvent') {
        this.subModel?.addEventListener && this.subModel.addEventListener(type, listener)
      }
    },

    // 根据构件id获取该构件在关联的图纸上的boundingBox
    async getBoxInfoInDrawingByEleId (eleId) {
      if (eleId && !(eleId + '').includes('.') && this.sub.sheet.source.singleModelFileId) {
        eleId = `${this.sub.sheet.source.singleModelFileId}.${eleId}`
      }
      const _this = this
      return new Promise(async (resolve) => {
        let ret = null
        let viewer = _this.subModel?.viewer.getBimfaceViewer
        let currentSheetId = _this.sub.sheet.source.sheetId
        if (viewer && viewer.viewerType == 'Viewer3D' && currentSheetId) {
          let viewerOpt = _this.subModel?.viewer.optContext
          let sheetBounding = await _this.objectIdToSheetBoundingBox(eleId, viewer, viewerOpt, currentSheetId)
          if (sheetBounding) {
            // 视图上的包围盒转化为图纸包围盒
            let matric = this.matricFormat(_this.sub.sheet.matric)
            ret = _this.BoundTrans(matric, sheetBounding)
          }
        }
        resolve(ret)
      })
    },

    clearAllMarkups () {
      let mainModel = this.main.viewer
      if (mainModel) {
        mainModel.clearAllMarkups && mainModel.clearAllMarkups()
      }
    }
  },
  watch: {
    source: {
      handler(val) {
        if (val) {
          this.setSourceData(val)
        }
      },
      immediate: true,
      deep: true
    },
    "main.source.token": {
      handler (val) {
        if (val) {
          this.$nextTick(() => {
            this.loadMainW()
          })
        }
      },
      immediate: true
    },
    "sub.source.token": {
      handler (val) {
        if (val) {
          this.setSubDrawingData(val)
          this.$nextTick(() => {
            this.loadSubW()
          })
        }
      },
      deep: true,
      immediate: true
    },
    "sub.sheet.source.token": {
      handler (val) {
        if (val) {
          this.$nextTick(() => {
            this.loadSubSheetW()
          })
        }
      },
      immediate: true
    },
    "sub.sheet.source.sheetId": {
      handler (val) {
        if (val) {
          this.$nextTick(() => {
            this.loadSubSheetW()
          })
        }
      }
    }
  },
  beforeUnmount () {
    if (this.main.viewer) {
      this.main.viewer.unload()
    }
    if (this.sub.viewer) {
      this.sub.viewer.unload()
    }
  }
}
</script>

<style lang="less" scoped>
@textColor: #f2f2f8;
@backgroundColor: #282a34;
@keyframes expand {
  from {
    height: 40px;
    width: 40px;
  }
  to {
    width: 360px;
    height: 240px;
  }
}
@keyframes packup {
  from {
    width: 360px;
    height: 240px;
  }
  to {
    height: 40px;
    width: 40px;
  }
}
.model_review{
  height: 100%;
  position: relative;
  .main_w{
    // z-index: 98;
    width: 100%;
    height: 100%;
    .model_view{
      height: 100%;
    }
  }
  .sub_w{
    z-index: 8;
    top: 12px;
    right: 68px;
    position: absolute;
    width: 360px;
    height: 240px;
    border: 1px solid #40424c;
    overflow: hidden;

    .header{
      display: flex;
      align-items: center;
      background: @backgroundColor;
      color: #fff;
      height: 40px;
      .view_list_select {
        flex-grow: 1;
        :deep(.dropdown_box) {
          width: 360px;
        }
      }
      .to_little_span{
        width: 68px;
        display: inline-block;
        font-size: 14px;
        cursor: pointer;
      }
      .sub_header_icon{
        margin-left: 8px;
        margin-right: 8px;
        display: inline-block;
        cursor: pointer;
      }
      .shouqi{
        margin-right: 12px;
        transform: rotate(180deg);
      }
    }
    .model_view{
      height: calc(100% - 40px);
      min-height: 200px;
      min-width: 360px;
    }
  }
  .sub_w.sub_w_packup{
    width: 40px;
    height: 40px;
    animation: packup .5s;
    .header{
      .sub_header_icon{
        margin-left: 11px;
        cursor: pointer;
      }
    }
  }
  .sub_w.sub_w_expand{
    width: 360px;
    height: 240px;
    animation: expand .5s;
  }
}
.model_review.__split{
  display: flex;
  .main_w{
    width: 50%;
  }
  .sub_w{
    position: unset;
    width: 50%;
    height: 100%;
    border: none;

    .header{
      position: absolute;
      z-index: 8;
      right: 68px;
      top: 12px;
      width: 360px;

      .view_list_select {
        width: calc(100% - 36px);
        :deep(.dropdown_box) {
          width: 360px;
        }
      }
    }
    .model_view{
      height: 100%;
    }

    .bf-tips {
      z-index: 20;
    }
  }
}

.model_sheet_view {
  width: 100%;
  height: calc(100% - 40px);
}
</style>
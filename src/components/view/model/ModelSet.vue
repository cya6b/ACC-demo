<template>
  <div class="__gda_sdk" style="width:100%;height:100%;position:relative">
    <div :id="bimface.domId" ref="rootView" class="bim_view_container">
      <span v-if="invalidToken" class="loading">invalid viewToken</span>
    </div>
    <div class="name_list">
      <span class="name_label">设置显隐： </span>
      <span :class="hideList.includes(nIndex) ? 'name_item passive' : 'name_item'"
        v-for="(name, nIndex) in nameList" @click="nameClick(nIndex)">
        <span class="color_span"
        :style="`background-color: rgb(${name.color[0]},${name.color[1]},${name.color[2]})`"></span>
        {{ name.label }}
      </span>
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
const sourceValidator = function (val) {
  if (val) {
    if (Array.isArray(val.models)) {
      val.models.forEach(s => {
        if (!s.token) {
          throw new Error('token in modelItem of models in source is required')
        }
        if (!["model2d", "model3d", "modelsheet"].includes(s.type)) {
          throw new Error('type must one of ["model2d", "model3d", "modelsheet"]')
        }
        if (s.type === "modelsheet") {
          if (!s.sheetId) {
            throw new Error('sheetId in source is required when type is modelsheet')
          }
        }
      })
    }
  }
  return true
}
import drawingViewExtendFunc from "./drawingViewExtendFuncMixin.js"
import optContext2d from "./operate/bim2dFileContext"
import MarkupPool from "./plugins/markupsPool";
export default {
  name: 'ViewSet',
  data () {
    return {
      name: 'ViewSet',
      bimface: {
        // sdk
        sdkUrl: "/api/BimfaceSDKLoader/BimfaceSDKLoader@latest-release.js",
        jsHostConfigUrl: "/api/JSHostConfig.js",
        sdkloaded: false,
        loading: false,
        source: {
          // 图纸集
          models: [
            // {
            //   name: "",
            //   _COLOR: "",
            //   type: "", // model2d, modelsheet
            //   token: null,
            //   sheetId: null, // type 为 modelsheet 时 必需
            //   matric: null // 坐标变换
            // }
          ],
        },
        viewer: null,
        viewType: '',
        annotation: null,
        annotationToolBar: null,
        domId: null
      },
      hideList: [],
      invalidToken: false,

      annotDrawingSavedEventListener: null,
      annotDrawingCancelEventListener: null,
    }
  },
  props: {
    bimfaceHost: {
      default: 'https://static.bimface.com',
      type: String,
    },
    afterLoad: {
      type: Function
    },
    source: {
      required: true,
      type: Array,
      validator: sourceValidator
    },
    hideTextSearch: {
      default: true,
      type: Boolean,
    },
    hideBimToolBar: {
      default: false,
      type: Boolean,
    },
    hideBimLayerBar: {
      default: false,
      type: Boolean,
    },
    hideAnnotBar: {
      default: false,
      type: Boolean
    },
    background: {
      default: null,
      type: Array
    }
  },
  computed: {
    nameList () {
      return this.bimface.source.models.map(m => {
        return {
          label: m.name || '未命名',
          color: m._COLOR
        }
      })
    },
    domId () {
      return this.bimface.domId
    },
    optContext () {
      return new optContext2d(this.bimface)
    },
    getBimfaceApp () {
      return this.bimface.app
    },
    getBimfaceViewer () {
      return this.bimface.viewer
    },
    getSingleModelFileId () {
      return this.bimface.source.models.find(m => {
        return !!m.singleModelFileId
      })?.singleModelFileId
    }
  },
  watch: {
    "bimface.sdkloaded": {
      handler (val) {
        if (val) {
          this.load()
        }
      }
    },
    source: {
      handler(val, oldV) {
        if (val) {
          this.setSourceData(val)
        }
        if (oldV) {
          this.unloadModel()
          this.load()
        }
      },
      immediate: true
    },
  },
  created () {
    if (process.env.MOCK) {
      // 当前为mock时，不进行文件加载
      this.$emit('afterLoad')
      return
    }
    this.bimface.domId = this.initDomId();
    this.loadSDK()
  },
  methods: {
    initDomId () {
      let ret = 'my_bimface_model_set_view'
      let model_set_view_index = (sessionStorage.getItem('my_bimface_model_set_view') || 0) * 1
      sessionStorage.setItem('my_bimface_model_set_view', model_set_view_index + 1)
      return `${ret}_${model_set_view_index}`
    },
    setSourceData (val) {
      this.bimface.source = val
    },
    loadSDK () {
      const _this = this
      function addbimfaceSdkNode (callBack) {
        // 配置jsHostConfig文件获取
        let bimHostConfigUrlStr = `${_this.bimfaceHost}${_this.bimface.jsHostConfigUrl}`
        const jsHostConfigNode = document.createElement('script')
        jsHostConfigNode.id = 'bimsdk'
        jsHostConfigNode.setAttribute('src', bimHostConfigUrlStr)
        jsHostConfigNode.setAttribute('charset', 'utf-8')
        document.head.appendChild(jsHostConfigNode)

        let bimUrlStr = `${_this.bimfaceHost}${_this.bimface.sdkUrl}`
        const node = document.createElement('script')
        node.id = 'bimsdk'
        node.setAttribute('src', bimUrlStr)
        node.setAttribute('charset', 'utf-8')
        node.onload = callBack
        document.head.appendChild(node)
      }
      if (!this.bimface.sdkloaded) {
        addbimfaceSdkNode(() => {
          _this.bimface.sdkloaded = true
        })
      } else {
        this.bimface.sdkloaded = true
      }
    },
    load (callBack) {
      if (this.bimface.loading) {
        return
      }
      const _this = this
      _this.bimface.loading = true
      _this.invalidToken = false
      try {
        // eslint-disable-next-line no-undef
        let loaderConfig = new BimfaceSDKLoaderConfig()
        const dToken = this.bimface.source.models[0].token
        const dType = this.bimface.source.models[0].type
        loaderConfig.viewToken = dToken
        if (this.bimface.source.models[0].singleModelFileId) {
          loaderConfig.fileId = this.bimface.source.models[0].singleModelFileId
        }
        if (dType === 'modelsheet') {
          loaderConfig.viewType = BimfaceViewTypeOption.DrawingView
        }
        // eslint-disable-next-line no-undef
        BimfaceSDKLoader.load(loaderConfig, successCallback, (error) => {
          _this.bimface.loading = false
          // _this.$message({
          //   message: '文件加载失败',
          //   type: 'error'
          // })
          console.error(error)
          _this.invalidToken = true
        })
      } catch (err) {
        _this.bimface.loading = false
        console.error('模型加载失败:', err)
      }

      function addLoadedEvent(viewer, viewType, viewToken) {
        if (!viewer || !viewType) {
          return
        }
        let loadListener = null
        let clickListener = null
  
        loadListener = Glodon.Bimface.Viewer.ViewerDrawingEvent.Loaded
        clickListener = Glodon.Bimface.Viewer.ViewerDrawingEvent.MouseClicked // SelectionChanged
        viewer.addEventListener(loadListener,
          (e) => {
            viewer.setDisplayMode(3)
            const rootDom = _this.$refs.rootView
            if (!rootDom) {
              return
            }
            _this.bimface.loading = false

            const currentD = viewer.getDrawing(e)

            // 视图图纸时视图切换到model模式
            if(currentD._viewMetaData.renderType === 'bimView') {
              currentD.showViewById && currentD.showViewById(0)
            }
            // 叠加设置
            let canvas = document.querySelector('canvas')
            let ctx = canvas.getContext('webgl')
            ctx.disable(ctx.DEPTH_TEST)
            ctx.blendFunc(ctx.ONE, ctx.ONE)// 使用叠加颜色混合

            let drawingIndex = currentD.drawingIndex
            // 颜色设置
            let renderDrawingOriginData = _this.renderingDrawings[drawingIndex]
            let m = renderDrawingOriginData.matric
            if (m) {
              if (typeof m == 'string') {
                m = JSON.parse(m)
              }
              currentD.setDrawingTransformation(m)
              viewer.render()
            }
            const col = renderDrawingOriginData._COLOR
            if (col) {
              currentD.overrideObjectsColor({
                all: true
              }, new Glodon.Web.Graphics.Color(col[0], col[1], col[2], col[3]))
            }
            setTimeout(() => {
              if (drawingIndex === _this.renderingDrawings.length - 1) {
                viewer.render()
                // viewer.home()
              }
            },20)

            // 隐藏文本查询框位置
            if (_this.hideTextSearch) {
              const tempD = _this.$refs.rootView
              let searchBox =
                tempD.getElementsByClassName(
                  'bf-toolbar-search'
                )
              if (searchBox && searchBox[0]) {
                searchBox[0].style.display = 'none'
              }
            }

            // window resize event
            _this.resizeFunc = function () {
              if (viewer && rootDom) {
                viewer.resize(rootDom?.clientWidth, rootDom?.clientHeight)
              }
            }
            if (ResizeObserver) {
              _this.resizeObserver = new ResizeObserver(_this.resizeFunc)
              _this.resizeObserver.observe(rootDom)
            } else {
              window.addEventListener('resize', _this.resizeFunc)
            }

            // 扩展功能
            try {
              _this.drawingViewExtend(viewer)
            } catch (error) {
              console.error(error)
            }

            if (!_this.markupPool) {
              _this.markupPool = new MarkupPool(_this)
            } else {
              _this.markupPool.resetViewerData(_this)
            }

            // 回调
            if (callBack) {
              callBack(_this)
            }
            if (_this.afterLoad) {
              _this.afterLoad(_this)
            }
          }
        )

        if (_this.autoLinkable) {
          viewer.addEventListener(clickListener,
            async (objectData) => {
              let o = [objectData.objectId]
              _this.autoLinkFunc && _this.autoLinkFunc({
                objectData: o,
                viewer
              })
            }
          )
        }
      }
      function successCallback(viewMetaData) {
        // 使用前确认对象存在
        if (!Glodon || !Glodon.Bimface || !Glodon.Bimface.Application) {
          return
        }
        let viewer = null
        let appConfig = null
        let app = null
        let rootDom = _this.$refs.rootView
        if (!rootDom) {
          return
        }
        const viewToken = viewMetaData.viewToken
        let viewType = viewMetaData.viewType

        appConfig = new Glodon.Bimface.Application.WebApplicationDrawingConfig()
        appConfig.domElement = rootDom
        appConfig.viewToken = viewToken
        // 默认可以显示线宽
        appConfig.enableLineWidth = true
        appConfig.Buttons = _this.view_buttons || [
          'Home',
          'RectZoom',
          'DrawingMeasure',
          'Layers',
          'Setting',
          'FullScreen'
        ]
        app = new Glodon.Bimface.Application.WebApplicationDrawing(appConfig)

        // eslint-disable-next-line no-undef
        viewer = app.getViewer()

        // 页面保存viewer对象
        _this.bimface.viewType = viewType
        _this.bimface.appConfig = appConfig
        _this.bimface.app = app
        _this.bimface.viewer = viewer
        // 监听图纸加载完成
        addLoadedEvent(viewer, viewType, viewToken)
        // 图纸加载
        try {
          let dateString
          let drawings = _this.bimface.source.models.map(m => {
            if (!dateString) {
              dateString = new Date().getTime()
            } else {
              dateString += '0'
            }
            let res = {
              modelId: `drawingView${dateString}`,
              viewToken: m.token,
              sheetId: m.sheetId,
              _COLOR: m._COLOR,
              matric: m.matric
            }
            if (m.singleModelFileId) {
              res.fileId = m.singleModelFileId
            }
            return res
          })
          _this.renderingDrawings = drawings

          // 绘制前手动将 bimface加载状态更新为未开始，防止加载中止
          Glodon.GlobalData.loading = false

          // viewer.loadDrawings(drawings, (v) => {}) 使用下述方式，保证图纸顺序加载
          let lD = function (index) {
            viewer.loadDrawing(drawings[index], (v) => {
              if (index + 1 < drawings.length) {
                lD(index + 1)
              }
            })
          }
          lD(0)
        } catch (error) {
          console.error(error)
        }
      }
    },
    unloadModel () {
      const viewer = this.bimface.viewer
      if (!viewer) {
        return
      }
      // viewer.removeAllDrawings && viewer.removeAllDrawings() // 卸载图纸
      // if (viewer.getModel && viewer.getModel(this.modelIdName)) { // 卸载模型
      //   viewer.removeModel(this.modelIdName)
      // }
      // if (this.bimface.viewer) {
      //   this.bimface.viewer.destroy && this.bimface.viewer.destroy()
      // }
      if (this.bimface.app) {
        if (this.resizeObserver) {
          this.resizeObserver.unobserve(this.$refs.rootView)
        } else {
          window.removeEventListener('resize', this.resizeFunc)
        }
        this.bimface.app.destroy && this.bimface.app.destroy()
      }

      this.$refs.rootView.innerHTML = ""
    },
    reload (source, callBack) {
      this.unloadModel()
      this.setSourceData(source)
      this.load(callBack)
    },
    setCanvasComposite (isReset = false) {
      let canvas = document.querySelector('canvas')
      let ctx = canvas.getContext('webgl')
      if (isReset) {
        ctx.blendFunc(ctx.ONE, ctx.ZERO)// 还原默认的叠加效果
      } else {
        ctx.disable(ctx.DEPTH_TEST)
        ctx.blendFunc(ctx.ONE, ctx.ONE)// 使用叠加颜色混合
      }
    },
    clearAnnot () {
      if (typeof this.bimface.annotation.clear === 'function') {
        this.bimface.annotation.clear()
      }
    },

    // 矢量dwg扩展功能
    drawingViewExtend (viewer) {
      if (viewer.hasExtendFuc) {
        // 保证拓展功能只添加一次即可
        return
      }

      // 添加批注功能
      viewer.hasExtendFuc = true
      // 添加批注功能
      this.createAnnotation(viewer, this)
      // 添加画标签功能
      this.createDrawableContainer(viewer, this)
    },
    changeBackgroundColor () {
      if (!this.backgroundColor) {
        return
      }
      const color = new Glodon.Web.Graphics.Color(...this.backgroundColor)
      this.bimface.viewer.setBackgroundColor(color)
    },
    hideByIndex (index) {
      index = index >>> 0
      if (!this.hideList.includes(index)) {
        this.hideList.push(index)
        const drawings  = this.bimface.viewer.loadedDrawings
        if (drawings[index]) {
          drawings[index].drawing.hideLayers({
            all: true
          })
          this.bimface.viewer.render()
        }
      }
    },
    showByIndex (index) {
      index = index >>> 0
      if (!this.hideList.includes(index)) {
        return
      }
      this.hideList.splice(this.hideList.findIndex(item => {return item === index}), 1)
      const drawings  = this.bimface.viewer.loadedDrawings
      if (drawings[index]) {
        drawings[index].drawing.showLayers({
          all: true
        })
        this.bimface.viewer.render()
      }
    },
    nameClick (index) {
      if (this.hideList.includes(index)) {
        this.showByIndex(index)
      } else {
        this.hideByIndex(index)
      }
    },
    ...drawingViewExtendFunc,

    // 设置批注数据
    setMarkupList (list, type, autoScale = false) {
      // 清除房间及构件闪烁
      let viewer = this.getBimfaceViewer
      if (!viewer) {
        return
      }
      viewer.clearAllBlinkComponents && viewer.clearAllBlinkComponents()
      let roomManager = viewer.getRoomManager && viewer.getRoomManager()
      if (roomManager) {
        roomManager.clearAllRooms()
      }
      if (Array.isArray(list)) {
        this.getMarkupPoolTool()?.setList(list, type, autoScale)
      } else {
        throw new Error("param must is an array")
      }
    },
    // 获取批注管理器
    getMarkupPoolTool () {
      return this.markupPool
    },
    activeAnnor (annorIndex, externalTrigger) {
      this.getMarkupPoolTool().activeAnnor(annorIndex, externalTrigger)
    },
    unActiveAnnor (annorIndex, externalTrigger) {
      this.getMarkupPoolTool().unActiveAnnor(annorIndex, externalTrigger)
    },
    createSnapshotAsync (color, callBack) {
      const annotationManager = this.bimface.annotationToolBar.getAnnotationManager()
      if (annotationManager) {
        annotationManager.createSnapshot(val => {
          callBack(val)
        })
      } else {
        callBack(null)
      }
    },
    // 截图
    snapshot (color, callBack) {
      const viewer = this.getBimfaceViewer
      try {
        // 获取state和批注
        const markupState = (this.markupPool || viewer).getCurrentState()
        const state = markupState.state
        const markupList = markupState.annotationList
        // 获取截图
        this.createSnapshotAsync(color, (val)=> {
          const img = val
          if (callBack) {
            callBack({
              img,
              state,
              markupList
            })
          }
        })
      } catch (err) {
        callBack(new Error('获取截图失败'))
      }
    },

    addEventListener (type, listener) {
      const viewer = this.getBimfaceViewer
      switch (type) {
        case 'eleSelectionChanged': {
          let event = null
          if (viewer.viewerType == 'ViewerDrawing') {
            event = Glodon.Bimface.Viewer.ViewerDrawingEvent.SelectionChanged
          }
          if (viewer.viewerType == 'Viewer3D') {
            event = Glodon.Bimface.Viewer.Viewer3DEvent.SelectionChanged
          }
          viewer.addEventListener(event, listener)
          break
        }
        case 'mouseClickEvent': {
          let event = null
          if (viewer.viewerType == 'ViewerDrawing') {
            event = Glodon.Bimface.Viewer.ViewerDrawingEvent.MouseClicked
          }
          if (viewer.viewerType == 'Viewer3D') {
            event = Glodon.Bimface.Viewer.Viewer3DEvent.MouseClicked
          }
          viewer.addEventListener(event, listener)
          break
        }
        case 'zoomFactorChangedEvent': {
          if (viewer.viewerType == 'ViewerDrawing') {
            let event = Glodon.Bimface.Viewer.ViewerDrawingEvent.ZoomFactorChanged
            viewer.addEventListener(event, listener)
            viewer.addEventListener(Glodon.Bimface.Viewer.ViewerDrawingEvent.ZoomEnd, listener)
          }
          break
        }
        case 'annorActiveEvent': {
          this.getMarkupPoolTool().addEventListener('annorActiveEvent', listener)
          break
        }
        case 'annorUnActiveEvent': {
          this.getMarkupPoolTool().addEventListener('annorUnActiveEvent', listener)
          break
        }
        case 'annotDrawingSavedEvent': {
          this.annotDrawingSavedEventListener = listener
          break
        }
        case 'annotDrawingCancelEvent': {
          this.annotDrawingCancelEventListener = listener
        }
        default: {}
      }
    },

    clearAllMarkups () {
      this.getMarkupPoolTool()?.removeAll()
    }
  },
  beforeUnmount () {
    // this.bimface.viewer.removeAllDrawings && this.bimface.viewer.removeAllDrawings()

    // if (this.bimface.viewer) {
    //   this.bimface.viewer.destroy && this.bimface.viewer.destroy()
    // }
    if (this.bimface.app) {
      if (this.resizeObserver) {
        this.resizeObserver.unobserve(this.$refs.rootView)
      } else {
        window.removeEventListener('resize', this.resizeFunc)
      }
      this.bimface.app.destroy && this.bimface.app.destroy()
    }
  },
}
</script>
<style lang="less" scoped>
.bim_view_container {
  width: 100%;
  height: 100%;
  background: #363842;
}
#sideCalculateBookBoxContainer {
  width: 100%;
  height: 100%;
}
:deep(.bf-drawing-container) {
  background: rgb(18, 18, 20) !important;
}
span.tips {
  // vertical-align: middle;
  display: block;
  width: 400px;
  height: 100px;
  line-height: 100px;
  text-align: center;
  margin: auto;
  background: #1c1e1f;
  border-radius: 4px;
  top: calc(50% - 50px);
  position: relative;
}
.name_list{
  position: absolute;
  color: #fff;
  top: 12px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 9;
  padding: 0px 12px;

  min-width: 508px;
  max-width: 80%;
  height: 40px;
  line-height: 40px;
  background-color: #282a34;
  font-size: 14px;
  .name_label{
    display: inline-block;
    overflow: hidden;
  }
  .name_item{
    display: inline-block;
    max-width: 400px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    margin: 0px 8px;
    .color_span{
      width: 16px;
      height: 16px;
      border-radius: 2px;
      display: inline-block;
      margin-right: 5px;
    }
  }
  .name_item.passive {
    .color_span{
      background: linear-gradient(135deg, transparent 44.5%, #000 55.5%, #000 50.5%, transparent 50.5%);
    }
    opacity: 0.5;
  }
}
.loading{
  display: block;
  width: 400px;
  height: 100px;
  line-height: 100px;
  text-align: center;
  margin: auto;
  background: #0f0f0f;
  border-radius: 4px;
  top: calc(50% - 50px);
  position: relative;
  color: #fff;
}
</style>
<style lang="less">
.bf-annotation {
  .bf-toolbar {
    .gld-bf-ntext {
      display: none !important;
    }
  }
}
.more_ele_info_bar {
  margin-left: 10px;
  &:hover {
    cursor: pointer;
    color: rgba(18, 107, 255, 0.7);
  }
}

:deep(.bf-drawing-container) {
  background: rgb(18, 18, 20) !important;
}
</style>

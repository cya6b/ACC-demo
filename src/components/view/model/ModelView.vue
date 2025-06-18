<template>
  <div :id="bimface.domId" :isIntegratedModel="!!getSingleModelFileId" :is3D="bimface?.source?.type === 'model3d'" ref="rootView" class="__gda_sdk bim_view_container">
    <span v-if="invalidToken" class="loading">invalid viewToken</span>
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
  if (!val) {
    throw new Error('source is required')
  }
  if (!val.token) {
    throw new Error('token in source is required')
  }
  if (!["model2d", "model3d", "modelsheet"].includes(val.type)) {
    throw new Error('type in source is must one of ["model2d", "model3d", "modelsheet"]')
  }
  if (val.type === "modelsheet") {
    if (!val.sheetId) {
      throw new Error('sheetId in source is required when type is modelsheet')
    }
  }

  if (val.walkthroughData) {
    if (typeof val.walkthroughData !== 'string') {
      throw new Error('walkthroughData must jsonstring')
    }
    try {
      JSON.parse(val.walkthroughData)
    } catch (err) {
      throw new Error('walkthroughData must jsonstring')
    }
  }
  return true
}
import drawingViewExtendFunc from "./drawingViewExtendFuncMixin.js"
import optContext2d from "./operate/bim2dFileContext"
import optContext3d from "./operate/bim3dFileContext"
import MarkupPool from "./plugins/markupsPool";
export default {
  name: 'modelView',
  data () {
    return {
      name: 'ViewModel',
      modelIdName: 'myModel',
      bimface: {
        // sdk
        sdkUrl: "/api/BimfaceSDKLoader/BimfaceSDKLoader@latest-release.js",
        jsHostConfigUrl: "/api/JSHostConfig.js",
        sdkloaded: false,
        // modelData
        source: {
          id: null,
          type: "model2d",
          token: null,
          sheetId: null,

          // 路径漫游数据
          walkthroughData: null
        },
        appConfig: null,
        app: null,
        viewer: null,
        viewType: null,
        loading: false,
        domId: null
      },
      backgroundColor: null, // 画布背景色
      invalidToken: false,

      annotDrawingSavedEventListener: null,
      walkthroughDataChangedEventListener: null
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
      type: Object,
      validator: sourceValidator
    },
    hideTextSearch: {
      default: false,
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
    },
    annotable: {
      default: true,
      type: Boolean
    },
    drawable: {
      default: true,
      type: Boolean
    },
    autoLinkable: {
      default: true,
      type: Boolean
    },
    autoLinkFunc: {
      type: Function
    }
  },
  computed: {
    domType () {
      return this.bimface.source.type
    },
    domId () {
      return this.bimface.domId
    },
    optContext () {
      if (this.bimface.source.type === "model3d") {
        return new optContext3d(this.bimface)
      } else {
        return new optContext2d(this.bimface)
      }
    },
    isSheet () {
      return this.bimface.source.type === "modelsheet"
    },
    getBimfaceApp () {
      return this.bimface.app
    },
    getBimfaceViewer () {
      return this.bimface.viewer
    },
    getSingleModelFileId () {
      return this.bimface.source.singleModelFileId
    }
  },
  created () {
    this.bimface.domId = this.initDomId();
    this.loadSdk();
  },
  watch: {
    "bimface.sdkloaded": {
      handler(val) {
        if (val) {
          this.loadModel();
        }
      }
    },
    source: {
      handler(val) {
        if (val) {
          this.setSourceData(val)
        }
      },
      immediate: true
    },
    modelType: {
      handler(val) {
        if (val) {
          this.bimface.type = val
        }
      },
      immediate: true
    },
    background: {
      handler(val) {
        if (Array.isArray(val) && val.length === 4) {
          this.backgroundColor = val
        }
      },
      immediate: true
    }
  },
  methods: {
    initDomId () {
      let ret = 'my_bimface_model_view'
      let my_bimface_model_view = (sessionStorage.getItem('my_bimface_model_view') || 0) * 1
      sessionStorage.setItem('my_bimface_model_view', my_bimface_model_view + 1)
      return `${ret}_${my_bimface_model_view}`
    },
    loadSdk () {
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
    loadModel (callBack) {
      if (this.bimface.loading) {
        // return
      }
      const _this = this
      _this.bimface.loading = true
      _this.invalidToken = false
      try {
        // eslint-disable-next-line no-undef
        let loaderConfig = new BimfaceSDKLoaderConfig()
        loaderConfig.viewToken = this.bimface.source.token
        if (_this.isSheet) {
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
        let selectedChangeListener = null
        if (viewType === 'drawingView' || _this.isSheet) {
          loadListener = Glodon.Bimface.Viewer.ViewerDrawingEvent.Loaded
          clickListener = Glodon.Bimface.Viewer.ViewerDrawingEvent.MouseClicked
          selectedChangeListener = Glodon.Bimface.Viewer.ViewerDrawingEvent.SelectionChanged
        } else if (viewType === '3DView') {
          loadListener = Glodon.Bimface.Viewer.Viewer3DEvent.ViewAdded
          clickListener = Glodon.Bimface.Viewer.Viewer3DEvent.MouseClicked
          selectedChangeListener = Glodon.Bimface.Viewer.Viewer3DEvent.SelectionChanged
        } else {
          return
        }
        viewer.addEventListener(loadListener,
          (e) => {
            const rootDom = _this.$refs.rootView
            if (!rootDom) {
              return
            }
            _this.bimface.loading = false

            // 视图图纸时视图切换到model模式
            if (_this.isSheet && viewer.showViewById) {
              viewer.showViewById(0)
            }

            // 修改背景色
            _this.changeBackgroundColor()

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

            // 隐藏文本查询框位置
            if (_this.hideTextSearch) {
              const tempD = document.getElementById(_this.domId)
              if (tempD) {
                let searchBox =
                  tempD.getElementsByClassName(
                    'bf-toolbar-search'
                  )
                if (searchBox && searchBox[0]) {
                  searchBox[0].style.display = 'none'
                }
              }
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
          viewer.addEventListener(selectedChangeListener,
            async (objectData) => {
              if (Array.isArray(objectData) && !objectData.length) {
                _this.autoLinkFunc && _this.autoLinkFunc({
                  objectData: [],
                  modelView: _this
                })
              }
            }
          )

          viewer.addEventListener(clickListener,
            async (objectData) => {
              setTimeout(() => {
                let viewerCurrentSelectedEles = []
                if (viewType === '3DView') {
                  viewerCurrentSelectedEles = viewer.getSelectedComponents()
                } else {
                  let objects = viewer.getSelectedObjects()
                  if (Array.isArray(objects)) {
                    objects.forEach(o => {
                      if (o && o.ids) {
                        viewerCurrentSelectedEles = viewerCurrentSelectedEles.concat(o.ids)
                      }
                    })
                  }
                }
                _this.autoLinkFunc && _this.autoLinkFunc({
                  objectData: viewerCurrentSelectedEles,
                  modelView: _this
                })
              }, 50)
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
        // 若当前展示模型视图，修改viewType为图纸类型
        // if (_this.isSheet) {
        //   viewType = "drawingView"
        // }

        _this.modelIdName = viewMetaData.modelId

        if (viewType === 'drawingView' || _this.isSheet) {
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
        } else if (viewType === '3DView') {
          appConfig = new Glodon.Bimface.Application.WebApplication3DConfig()

          // 设置全局单位
          appConfig.globalUnit = Glodon.Bimface.Common.Units.LengthUnits.Millimeter;
          
          appConfig.domElement = rootDom
          appConfig.viewToken = viewToken
          app = new Glodon.Bimface.Application.WebApplication3D(appConfig)
        } 

        // eslint-disable-next-line no-undef
        viewer = app.getViewer()

        // 页面保存viewer对象
        _this.bimface.viewType = viewType
        _this.bimface.appConfig = appConfig
        _this.bimface.app = app
        _this.bimface.viewer = viewer
        // 监听图纸加载完成
        addLoadedEvent(viewer, viewType, viewToken)

        // 监听路径漫游面板状态变化事件
        if (viewType === '3DView') {
          function getWalkthroughData () {
            let strWalkthroughData = JSON.stringify(app.getWalkthroughData())
            if (_this.bimface.source.walkthroughData !== strWalkthroughData) {
              _this.bimface.source.walkthroughData = strWalkthroughData
              _this.walkthroughDataChangedEventListener &&
              _this.walkthroughDataChangedEventListener({
                id: _this.bimface.source.id,
                token: _this.bimface.source.token,
                walkthroughData: strWalkthroughData
              })
            }
          }
          app.addEventListener(Glodon.Bimface.Application.WebApplication3DEvent.WalkthroughStateChanged, (state) => {
            if (state === 'On') {
              if (_this.bimface.source.walkthroughData) {
                app.initializeWalkthroughData(JSON.parse(_this.bimface.source.walkthroughData))
              }
              _this.clearWalkthroughDataIntervalTimer()
              _this.getWalkthroughDataInterval = setInterval(() => {
                getWalkthroughData()
              }, 1500)
            }
            if (state === 'Off') {
              _this.clearWalkthroughDataIntervalTimer()
              getWalkthroughData()
            }
          })
        }
        // 图纸加载
        try {
          if (viewType === 'drawingView' || _this.isSheet) {
            let tempS = {
              viewToken
            }
            if (_this.bimface.source.sheetId) {
              tempS.sheetId = _this.bimface.source.sheetId
            }

            if (_this.bimface.source.singleModelFileId) {
              tempS.fileId = _this.bimface.source.singleModelFileId
            }
            // 绘制前手动将 bimface加载状态更新为未开始，防止加载中止
            Glodon.GlobalData.loading = false
            viewer.loadDrawing(
              tempS,
              () => {
                setTimeout(() => {
                  viewer.home()
                })
              }
            )
          } else if (viewType === '3DView') {
            viewer.loadModel({
              modelId: _this.modelIdName,
              viewToken
            })
          } 
        } catch (error) {
          console.error(error)
        }
      }
    },
    unloadModel () {
      const viewer = this.getBimfaceViewer
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
    setSourceData (val) {
      const reSet = !!this.bimface.source.token
      this.bimface.source.id = val.id
      this.bimface.source.token = val.token
      this.bimface.source.type = val.type
      this.bimface.source.sheetId = val.sheetId || null

      if (val.walkthroughData && (typeof val.walkthroughData === 'string')) {
        this.bimface.source.walkthroughData = val.walkthroughData
      }

      if (val.singleModelFileId) {
        this.bimface.source.singleModelFileId = val.singleModelFileId
      } else {
        this.bimface.source.singleModelFileId = null
      }

      if (reSet) {
        this.unloadModel()
        this.loadModel(() => {})
      }

      if (this.bimface.source.type === 'model3d') {
        this.addWindowMessageListener()
      }
    },
    addWindowMessageListener () {
      const _this = this
      if (!this.windowMessageListener) {
        this.windowMessageListener = function(e) {
          if (typeof e.data !== 'string') {
            return
          }
          let params = {}
          try {
            params = JSON.parse(e.data);
          } catch (e) {
          }
          if (params.key === 'componentPropertyMessage') {
            const componentId = params.componentId
            if (componentId) {
              _this.optContext.getComponentProperty(componentId, (data) => {
                window.postMessage(JSON.stringify({
                  key: 'componentPropertyCallBackMessage',
                  data: data || {}
                }))
              })
            }
          }else if (params.key === 'roomPropertyMessage') {
            const componentId = params.componentId
            if (componentId) {
              _this.optContext.getRoomProperty(componentId, (data) => {
                window.postMessage(JSON.stringify({
                  key: 'roomPropertyCallBackMessage',
                  data: data || {}
                }))
              })
            }
          }
        }
        window.addEventListener('message', this.windowMessageListener);
      }
    },
    // 矢量dwg扩展功能
    drawingViewExtend (viewer) {
      // 保证拓展功能只添加一次即可
      if (viewer.hasExtendFuc) {
        return
      }
      // 添加批注功能
      viewer.hasExtendFuc = true
      const _this = this

      if (_this.annotable) {
        _this.createAnnotation(viewer, _this)

        if (viewer.viewerType === 'Viewer3D') {
          _this.bimface.annotationToolBar.getAnnotationManager().exit();
        }
      }
      // 添加画标签功能
      if (_this.drawable) {
        _this.createDrawableContainer(viewer, _this)
      }
      // 图纸对比功能
      if (_this.diffable) {
        _this.insertDiffBtn(_this)
      }
    },
    changeBackgroundColor () {
      if (!this.backgroundColor) {
        return
      }
      const color = new Glodon.Web.Graphics.Color(...this.backgroundColor)
      this.bimface.viewer.setBackgroundColor(color)
      // const rootD = document.getElementById(this.domId)
      // if (rootD) {
      //   const containerDom = rootD.getElementsByClassName("bf-drawing-container")
      //   if (containerDom && containerDom[0]) {
      //     containerDom[0].style.background = this.backgroundColor
      //   }
      // }
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
    ...drawingViewExtendFunc,

    reload (source, callBack) {
      if (!source) {
        return
      }
      if (!sourceValidator(source)) {
        throw new Error(`bimface 数据源参数异常，请检查source:${source}输入`)
      }
      this.setSourceData(source)
    },

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
          if (viewer.viewerType === 'ViewerDrawing') {
            event = Glodon.Bimface.Viewer.ViewerDrawingEvent.SelectionChanged
          }
          if (viewer.viewerType === 'Viewer3D') {
            event = Glodon.Bimface.Viewer.Viewer3DEvent.SelectionChanged
          }
          viewer.addEventListener(event, listener)
          break
        }
        case 'mouseClickEvent': {
          let event = null
          if (viewer.viewerType === 'ViewerDrawing') {
            event = Glodon.Bimface.Viewer.ViewerDrawingEvent.MouseClicked
          }
          if (viewer.viewerType === 'Viewer3D') {
            event = Glodon.Bimface.Viewer.Viewer3DEvent.MouseClicked
          }
          viewer.addEventListener(event, listener)
          break
        }
        case 'zoomFactorChangedEvent': {
          if (viewer.viewerType === 'ViewerDrawing') {
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
        case 'walkthroughDataChangedEvent': {
          this.walkthroughDataChangedEventListener = listener
        }
        default: {}
      }
    },

    clearAllMarkups () {
      this.getMarkupPoolTool()?.removeAll()
    },

    clearWalkthroughDataIntervalTimer () {
      if (this.getWalkthroughDataInterval) {
        clearInterval(this.getWalkthroughDataInterval)
        this.getWalkthroughDataInterval = null
      }
    }
  },
  beforeUnmount () {
    // this.bimface.viewer.removeAllDrawings && this.bimface.viewer.removeAllDrawings()
    // if (this.modelIdName) {
    //   this.bimface.viewer.removeModel && this.bimface.viewer3D.removeModel(this.modelIdName)
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
    
    this.clearWalkthroughDataIntervalTimer()
    // this.bimface = null
    // this.$refs.rootView && this.$refs.rootView.$destroy(true)
  }
}
</script>
<style scoped lang="less">
.bim_view_container{
  width: 100%;
  height: 100%;
  background: #363842;
}
:deep(.__more_info){
  &:hover {
    color: #126bff;
  }
  cursor: pointer;
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

:deep(.bf-drawing-container) {
  background: rgb(18, 18, 20) !important;
}
</style>
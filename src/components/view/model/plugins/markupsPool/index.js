import "./style.less"
import util from "./util.js"
const DISPLAYMODELS = [
  'annor', 'annot', 'annor&annot'
]
class MarkupPool {
  constructor (viewer) {
    this.markup_viewer = viewer
    if (viewer.bimface.annotation) {
      this.annotation = viewer.bimface.annotation
    }
    if (viewer.bimface.annotationToolBar) {
      this.annotationToolBar = viewer.bimface.annotationToolBar
    }
    if (viewer.bimface.drawableContainer) {
      this.drawableContainer = viewer.bimface.drawableContainer
    }
    if (viewer) {
      this.modelView = viewer
      this.modelViewer = viewer.getBimfaceViewer
      this.modelViewerOpt = viewer.optContext
      this.singleModelFileId = viewer.getSingleModelFileId

      // 初始化疏散路径的标签管理器
      this.evacuatePathDrawableIds = []
      try {
        if (this.markup_viewer.domType === 'model3d' && Glodon?.Bimface?.Plugins?.ExternalObject?.ExternalObjectManager) {
          // 初始化疏散路径的路线管理器
          this.extObjMng = new Glodon.Bimface.Plugins.ExternalObject.ExternalObjectManager(this.modelViewer);
        }
      } catch (err) {
      }
    }
    if (viewer.bimface.domId) {
      this.modelViewerDomId = viewer.bimface.domId
    }

    this.markupList = [
    ]
    this.hideIndexList = []
    
    this.pool = {
      // key: markupList
      default: {
        markupList: [
          // {
          //   annor: {
          //     elementId: null,
          //     box: {
          //       minX: 300,
          //       minY: 300,
          //       maxX: 10000,
          //       maxY: 10000,
          //       minZ: 0,
          //       maxZ: 0,
          //     },
          //     label: "",
          //     contentHTML: "",
          //   },
          //   annotations: [
          //     {
          //       // 绘制批注类型 Polyline折线|Rectangle矩形|Cloud云线|CloudRect云线框|
          //       //             Ellipse椭圆|Cross十字|Arrow箭头 | 自定义 my_CloudRect
          //       markupType: "",
          //     }
          //   ] // 批注框
          // }
        ],
        hideIndexList: []
      }
    }
    this.currentActiveAnnorIndex = null
    this.historyMarkupPool = []
    this.displayModel = 'annor&annot'
    this.annorActiveEventListener = []
    this.annorUnActiveEventListener = []
    this.moreInfoClickEventListener = [] // 点击更多信息的回调
    this.markupsRenderEventListener = []
  }

  resetViewerData (viewer) {
    if (viewer) {
      this.markup_viewer = viewer
      this.modelViewerOpt = viewer.optContext
      this.singleModelFileId = viewer.getSingleModelFileId
      this.modelView = viewer
      this.modelViewer = viewer.getBimfaceViewer

      if (viewer.bimface.annotation) {
        this.annotation = viewer.bimface.annotation
      }
      if (viewer.bimface.annotationToolBar) {
        this.annotationToolBar = viewer.bimface.annotationToolBar
      }
      if (viewer.bimface.drawableContainer) {
        this.drawableContainer = viewer.bimface.drawableContainer
      }

      if (viewer.bimface.domId) {
        this.modelViewerDomId = viewer.bimface.domId
      }

      // 初始化疏散路径的标签管理器
      this.evacuatePathDrawableIds = []
      try {
        if (this.markup_viewer.domType === 'model3d' && Glodon?.Bimface?.Plugins?.ExternalObject?.ExternalObjectManager) {
          // 初始化疏散路径的路线管理器
          this.extObjMng = new Glodon.Bimface.Plugins.ExternalObject.ExternalObjectManager(this.modelViewer);
        }
      } catch (err) {
      }
    }
  }

  initPoolByKey (key) {
    if (key === void 0) {
      key = 'default'
    } else {
      key += ''
    }
    if (!this.pool[key]) {
      this.pool[key] = {
        markupList: [],
        hideIndexList: []
      }
    }
    return key
  }

  prepareRenderingMarkups () {
    let ret = []
    for (let k in this.pool) {
      let p = this.pool[k]
      // let temp = p.markupList.filter((i, iIndex) => {
      //   return !p.hideIndexList.includes(iIndex)
      // })
      let temp = p.markupList.map((i, iIndex) => {
        return {
          ...i,
          needHide: p.hideIndexList.includes(iIndex)
        }
      })
      ret = ret.concat(temp)
    }
    return ret
  }

  render(autoScale, callBack) {
    const d = this.prepareRenderingMarkups()
    
    // 清空疏散路径
    util.clearEvacuatePath3d.call(this)
    if (this.markup_viewer.domType !== 'model3d' && this.annotation) {
      // 绘制批注框
      // 清空
      this.annotation.clear()
      this._rendering_annotations = []
      if (this.displayModel.includes('annot')) {
        this.renderAnnots(d.filter(item => {
          return !item.needHide
        }), autoScale)
      }
    }
    if (this.drawableContainer && this.modelViewer) {
      // 绘制annor锚点标签
      // 清空
      this.drawableContainer.clear()
      this._rendering_annors = []
      if (this.displayModel.includes('annor')) {
        this.renderAnnors(d, autoScale, callBack)
      } 
    }
  }

  renderAnnots(data, autoScale) {
    const _this = this
    let dM = []
    data.forEach(i => {
      if (Array.isArray(i.annotations)) {
        i.annotations.forEach(a => {
          dM.push(util.formatMarkup(a))
        })
      }
    })
    // 绘制
    if (dM.length) {
      _this._rendering_annotations = dM
      const annotationList = this.annotation.jsonifyAnnotationList(JSON.stringify(dM))
      this.annotation.setAnnotationList(annotationList)
      this.annotation.showAnnotation()

      // 视口缩放至所有批注的外包围盒
      let pointXList = dM.map(item => {
        return (item.drawPoints || []).map(p => {
          return p[0] || 0
        })
      }).flat()
      let pointYList = dM.map(item => {
        return (item.drawPoints || []).map(p => {
          return p[1] || 0
        })
      }).flat()
      let minX = Math.min(...pointXList)
      let maxX = Math.max(...pointXList)
      let minY = Math.min(...pointYList)
      let maxY = Math.max(...pointYList)
      let bound = {
        min: {
          x: minX,
          y: minY
        },
        max: {
          x: maxX,
          y: maxY
        }
      }

      if (autoScale) {
        _this.modelViewer?.zoomToBoundingBox(bound, 0.5)
        util.windowResize()
      }
    } else {
      this.annotation.endDrawing()
    }
  }

  async renderAnnors(data, autoScale, callBack) {
    const _this = this
    const viewer = _this.modelViewer
    const viewerOpt = _this.modelViewerOpt
    let fd = data.filter(i => i.annor)
    let dA = fd.map(async(i, iIndex) => {
      return await util.formatAnnor.call(_this, i.annor, iIndex, fd.length)
    })
    Promise.all(dA).then(res => {
      if (res.length) {
        _this._rendering_annors = res
        // 绘制
        _this.drawableContainer.addItems(res)
        _this.drawableContainer.update()


        if (_this.markup_viewer.domType === 'model3d') {
          // 3d绘制锚点时缩放至所有锚点外包围盒
          if (autoScale) {
            const boundaryPoints = _this.modelViewer.getModelBoundaryPoints(
              _this.modelViewer.getModel().modelId
            )
            const pointXList = boundaryPoints.map((point) => point.x)
            const pointYList = boundaryPoints.map((point) => point.y)
            const pointZList = boundaryPoints.map((point) => point.z)
            const maxX = Math.max(...pointXList)
            const minX = Math.min(...pointXList)
            const maxY = Math.max(...pointYList)
            const minY = Math.min(...pointYList)
            const maxZ = Math.max(...pointZList)
            const minZ = Math.min(...pointZList)
            let bound = {}
            res.forEach(item => {
              const box = item.annOriginData?.box
              if (box) {
                if (!bound.minX || box.minX < bound.minX) {
                  bound.minX = box.minX
                }
                if (!bound.minY || box.minY < bound.minY) {
                  bound.minY = box.minY
                }
                if (!bound.minZ || box.minZ < bound.minZ) {
                  bound.minZ = box.minZ
                }
                if (!bound.maxX || bound.maxX < box.maxX) {
                  bound.maxX = box.maxX
                }
                if (!bound.maxY || bound.maxY < box.maxY) {
                  bound.maxY = box.maxY
                }
                if (!bound.maxZ || bound.maxZ < box.maxZ) {
                  bound.maxZ = box.maxZ
                }
              }
            })
            if (bound.minX === 0 && bound.minY === 0 && bound.minZ === 0 && bound.maxX === 1 && bound.maxY === 1 && bound.maxZ === 1) {
              bound = {
                minX,
                minY,
                minZ,
                maxX,
                maxY,
                maxZ
              }
            }

            let boundingBox = {
              min: {
                x: bound.minX,
                y: bound.minY,
                z: bound.minZ,
              },
              max: {
                x: bound.maxX,
                y: bound.maxY,
                z: bound.maxZ,
              }
            }
            _this.modelViewer?.zoomToBoundingBox(boundingBox, 0.5)
            util.windowResize()
          }

          // 绘制房间，高亮构件
          viewer.clearAllBlinkComponents && viewer.clearAllBlinkComponents()
          viewer.clearSelectedComponents && viewer.clearSelectedComponents()

          let needSelectedEleIds = []
          res.forEach(async (item) => {
            const annor = item.annOriginData
            let eleId = annor.elementId
            if (eleId) { // 有构件id
              eleId = util.elementIdToIntegrateModelEleId.call(_this, annor, eleId)
              let eleObj = viewer.getObjectDataById(eleId)
              if (eleObj) {
                needSelectedEleIds.push(eleId)
              } else {
                let roomdata = await util.getRoomEleProperty(eleId, viewerOpt)
                if (roomdata) { // 为房间
                  // 绘制房间
                  const boundary = roomdata.boundary
                  util.createRoom(viewer, boundary, roomdata.bboxMax.z - roomdata.bboxMin.z, roomdata.id)
                }
              }
            } else {
              let box = annor.box
              if (viewer.getBoundingBoxById && annor.box3d) {
                box = annor.box3d
              }
              if (box) {
                let outRing = [
                  [box.minX, box.maxY, box.maxZ],
                  [box.maxX, box.maxY, box.maxZ],
                  [box.maxX, box.minY, box.minZ],
                  [box.minX, box.minY, box.minZ]
                ]
                let Boundary = viewer.createBoundary(outRing)
                // 由于相符性审查缺失构件无法获取高度，故写死一个高度，标签位置需加上此高度的一半保证垂直居中
                util.createRoom(viewer, Boundary, 1500, annor.key)
              }
            }
          })
          // 根据id高亮构件
          viewer.__needSelectedEleIds = needSelectedEleIds
          viewer.setSelectedComponentsById(needSelectedEleIds)
        }
      } else {
        if (_this.markup_viewer.domType === 'model3d') {
          viewer.clearSelectedComponents && viewer.clearSelectedComponents()
        }
      }

      callBack && callBack()
    })
  }

  // 设置批注列表
  setList(list, key, autoScale) {
    const _this = this
    key = this.initPoolByKey(key)

    setTimeout(() => {
      this.currentActiveAnnorIndex = null
      this.pool[key].markupList = list
      this.pool[key].hideIndexList = []
      this.render(autoScale)

      if (!list.length) {
        _this.clearFloorSection()
      }
    }, 50)
  }

  getMarkupListByKey (key) {
    return this.pool[key] || null
  }

  // 添加批注
  add(list, key) {
    key = this.initPoolByKey(key)
    this.pool[key].markupList = this.pool[key].markupList.concat(list)
    this.render()
  }

  // 删除
  remove(indexList, key) {
    if (!Array.isArray(indexList)) {
      return
    }
    key = this.initPoolByKey(key)
    this.pool[key].markupList = this.pool[key].markupList.filter((i, iIndex) => {
      return indexList.includes(iIndex)
    })
    this.render()
  }

  // 删除所有
  removeAll(key) {
    if (!key) {
      this.pool = {}
    } else {
      key = this.initPoolByKey(key)
      this.pool[key].markupList = []
    }
    this.render()
  }

  // 根据index显示
  show(indexList, key) {
    if (!Array.isArray(indexList)) {
      return
    }
    key = this.initPoolByKey(key)
    this.pool[key].hideIndexList = this.pool[key].hideIndexList.filter(i => {
      return !indexList.includes(i)
    })
    this.render()
  }

  // 显示所有
  showAll(key) {
    if (!key) {
      for (let k in this.pool) {
        let p = this.pool[k]
        p.hideIndexList = []
      }
    } else {
      key = this.initPoolByKey(key)
      this.pool[key].hideIndexList = []
    }
    this.render()
  }

  // 根据index隐藏
  hide(indexList, key) {
    if (!Array.isArray(indexList)) {
      return
    }
    key = this.initPoolByKey(key)
    this.pool[key].hideIndexList = this.pool[key].hideIndexList.concat(indexList)
    this.render()
  }

  // 隐藏所有
  hideAll(key) {
    if (!key) {
      for (let k in this.pool) {
        let p = this.pool[k]
        p.hideIndexList = p.markupList.map((i, index) => {
          return index
        })
      }
    } else {
      key = this.initPoolByKey(key)
      this.pool[key].hideIndexList = this.pool[key].markupList.map((i, index) => {
        return index
      })
    }
    this.render()
  }

  // 设置显示模式（显示批注框，显示锚点及信息， 显示批注框和锚点信息）
  setDisplayModel (val) {
    if (!DISPLAYMODELS.includes(val)) {
      throw new Error("displayModel is must one of ['annor', 'annot', 'annor&annot']")
    } else {
      this.displayModel = val
      this.render()
    }
  }

  // 根据index 取消 锚点
  unActiveAnnor (annIndex, externalTrigger = false) {
    const _this = this
    let i = annIndex >>> 0
    window.postMessage(JSON.stringify({
      msgType: 'unactiveAnnor',
      annorIndex: i,
      modelViewerDomId: _this.modelViewerDomId,
      externalTrigger
    }))

    if (_this.markup_viewer.domType !== 'model3d') {
      if (_this.currentActiveAnnorIndex === null || _this.currentActiveAnnorIndex === annIndex) {
        let key = 'review_result'
        _this.showAll(key)
      }
    }
  }

  // 根据index 激活 锚点
  activeAnnor (annIndex, externalTrigger = false) {
    const _this = this
    let i = annIndex >>> 0

    // 隐藏除当前active的其他批注
    if (_this.markup_viewer.domType !== 'model3d') {
      let key = 'review_result'
      let hideIndexList = []
      _this.pool[key].markupList.forEach((item, itemIndex) => {
        if (itemIndex !== i) {
          hideIndexList.push(itemIndex)
        }
      })
      _this.pool[key].hideIndexList = []
      _this.hide(hideIndexList, key)
    }


    window.postMessage(JSON.stringify({
      msgType: 'activeAnnor',
      annorIndex: i,
      modelViewerDomId: _this.modelViewerDomId,
      externalTrigger
    }))
  }

  // 设置事件监听
  addEventListener (type, listener) {
    switch (type) {
      case 'moreInfoClickEvent': {
        this.moreInfoClickEventListener.push(listener)
        break
      }
      case 'annorActiveEvent': {
        this.annorActiveEventListener.push(listener)
        break
      }
      case 'markupsRenderEvent': {
        this.markupsRenderEventListener.push(listener)
        break
      }
      case 'annorUnActiveEvent': {
        this.annorUnActiveEventListener.push(listener)
        break
      }
      default: {}
    }
  }

  // 暂存
  tempStorage () {
    this.historyMarkupPool.push({
      pool: JSON.stringify(this.pool),
      displayModel: this.displayModel,
      annorActiveEventListener: this.annorActiveEventListener,
    })
  }
  // 回退
  back () {
    const his = this.historyMarkupPool.pop()
    if (!his) {
      return
    }
    this.pool = JSON.parse(his.pool)
    this.displayModel = his.displayModel
    this.annorActiveEventListener = his.annorActiveEventListener
    this.render()
  }

  reBackState (state) {
    if (this.annotation) {
      if (typeof state === 'string') {
        try {
          state = JSON.parse(state)
        } catch (err) {
          return
        }
      }
      this.annotation.setState(state)
    }
  }

  getCurrentState () {
    return this.annotation.getCurrentState()
  }

  sectionFloorByEleBounding (annorCustom, elBoundingBox) {
    let viewer = this.modelViewer
    util.sectionFloorByEleBounding.call(this, viewer, annorCustom, elBoundingBox)
  }

  clearFloorSection () {
    util.clearFloorSection.call(this)
  }
}
export default MarkupPool
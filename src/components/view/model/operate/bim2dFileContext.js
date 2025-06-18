import util from '../../../../plugins/util.js'

// 用模型id换取图纸中的图元id补偿方法
const toDrawingEleIdBabelFunc = function (eleId, url = '') {
  let ret = []
  if (window.__bimface_objectMaps) {
    let d = window.__bimface_objectMaps.list.find(item => {
      return url.includes(item.key)
    })
    if (d) {
      for (let i in d.detail) {
        if (d.detail[i].includes(eleId)) {
          ret.push(i)
        }
      }
    }
  }
  return ret
}

// 用图纸图元id换取模型modelId的补偿方法
const toModelIdBabelFunc = function (objectId, url) {
  let ret = null
  if (window.__bimface_objectMaps) {
    let d = window.__bimface_objectMaps.list.find(item => {
      return url.includes(item.key)
    })
    if (d) {
      for (let i in d.detail) {
        if (i === objectId) {
          if (Array.isArray(d.detail[i])) {
            ret = d.detail[i][0] || ''
          } else {
            ret = d.detail[i] || ''
          }
          break
        }
      }
    }
  }
  return ret
}

const cancelData = {
  selectLayerByBlock: false
}
let isDrawAnnotationActivated2d = false
let onAnnotationSavedCallback2d

const MouseTipsData = function (domId, tipsText) {
  this.tips = null
  this.tipsText = tipsText
  let _this = this
  this.mouseMoveFuc = function (event) {
    let ele = document.getElementById(domId)
    let tips = document.getElementById(`${domId}_mouseMoveTip`)
    if (!tips && ele) {
      _this.tips = document.createElement('span')
      _this.tips.innerHTML = _this.tipsText
      _this.tips.setAttribute('id', `${domId}_mouseMoveTip`)
      ele.appendChild(_this.tips)
    }
    let left = event.x + 24
    let top = event.y + 12
    if(_this.tips) {
      _this.tips.setAttribute('style', `background: #FFFFFF;color: #000000;padding: 3px 12px;border-radius: 2px;z-index:9999;position:fixed;top:${top}px;left:${left}px`)
    }
  }
  this.addTips = function (tips) {
    let ele = document.getElementById(domId)
    if (ele) {
      ele.addEventListener('mousemove', _this.mouseMoveFuc)
      ele.addEventListener('mouseenter', _this.addTips)
      ele.addEventListener('mouseleave', (event) => {
        let tips = document.getElementById(`${domId}_mouseMoveTip`)
        if (tips) {
          tips.remove()
        }
      })
    }
  }
  this.cancelTips = function () {
    let ele = document.getElementById(domId)
    if (ele) {
      ele.removeEventListener('mousemove', _this.mouseMoveFuc)
      ele.removeEventListener('mouseenter', _this.addTips)
    }
    _this.tips = null
    let tips = document.getElementById(`${domId}_mouseMoveTip`)
    if (tips) {
      tips.remove()
    }
  }
}

const DrawingMarkupAndAnchor = function () {
  this.upwardType = 'reviewResultsData'
  this.data = {
    reviewResultsData: [], componentsData: [], fireZonesData: []
  }
  this.updateData = function ({ type, list, otherParams = {} }) {
    if (type) {
      this.upwardType = type
    }
    if (list && this.data[type]) {
      this.data[type] = list
    }

    this.reDrawing(otherParams)
  }

  this.reDrawing = function (otherParams) { // 重绘
    this.bim2dContent.clearAnnotation()

    function dr (context, list, otherParams) {
      list.sort((a, b) => {
        if (a.upward && !b.upward) {
          return 1
        } else if (!a.upward && b.upward) {
          return -1
        }
        return 0
      })
      context.drawingAnnotsAt({
        ...otherParams,
        positionList: list
      })
    }
    if (this.upwardType !== 'reviewResultsData' && this.data.reviewResultsData.length) {
      dr(this.bim2dContent, JSON.parse(JSON.stringify(this.data.reviewResultsData)), otherParams)
    }
    if (this.upwardType !== 'componentsData' && this.data.componentsData.length) {
      dr(this.bim2dContent, JSON.parse(JSON.stringify(this.data.componentsData)), otherParams)
    }
    if (this.upwardType !== 'fireZonesData' && this.data.fireZonesData.length) {
      dr(this.bim2dContent, JSON.parse(JSON.stringify(this.data.fireZonesData)), otherParams)
    }

    if (this.upwardType) {
      dr(this.bim2dContent, JSON.parse(JSON.stringify(this.data[this.upwardType])), otherParams)
    }
  }
}
class bim2dFileContext {
  constructor (bim) {
    this.bimface = bim || {}
  }
  getDomId () {
    return this.bimface.domId || null
  }
  getApp () {
    return this.bimface.app || undefined
  }
  getViewer () {
    return this.bimface.viewer || undefined
  }
  getAnnotationToolBar () {
    return this.bimface.annotationToolBar || undefined
  }
  getAnnotation () {
    return this.bimface.annotation || undefined
  }
  getDrawableContainer () {
    return this.bimface.drawableContainer || undefined
  }
  getCancelData (str) {
    return cancelData[str]
  }
  getDrawingMarkupAndAnchorsManager () {
    if (this.drawingMarkupAndAnchorsManager) {
      return this.drawingMarkupAndAnchorsManager
    }
    let dM = new DrawingMarkupAndAnchor()
    dM.bim2dContent = this
    this.drawingMarkupAndAnchorsManager = dM
    return dM
  }

  zoomIn () { // 图纸缩小
    const viewer2D = this.getViewer()
    if (viewer2D) {
      viewer2D.zoomIn()
    }
  }

  zoomOut () { // 图纸放大
    const viewer2D = this.getViewer()
    if (viewer2D) {
      viewer2D.zoomOut()
    }
  }
  moveToBoundingBox (x1, y1, x2, y2, r) { // 移动至包围盒位置
    const viewer2D = this.getViewer()
    if (viewer2D) {
      // 构造包围盒对象
      let min = [x1, y1, 0]
      let max = [x2, y2, 0]
      let boundingBox = [min, max]
      // 缩放至包围盒区域，margin可自定义，margin值越大则边缘留白范围越大
      viewer2D.zoomToBoundingBox(boundingBox, r || 1.25)

      const annotation = this.getAnnotation()
      if (annotation) {
        annotation.showAnnotation()
      }

      const drawableContainer2d = this.getDrawableContainer()
      if (drawableContainer2d) {
        drawableContainer2d.update()
      }
    }
  }

  addMouseTips (tipsText) { // 鼠标后跟随文字提示
    if (!this.mouseTipsData) {
      this.mouseTipsData = new MouseTipsData(this.getDomId(), tipsText)
    }
    this.mouseTipsData.cancelTips()
    this.mouseTipsData.addTips()
  }

  cancelMouseTips () { // 取消鼠标后跟随的文字提示
    if (!this.mouseTipsData) {
      return
    }
    this.mouseTipsData.cancelTips()
  }
  reset2dHomeView () {
    const viewer2D = this.getViewer()
    viewer2D.home()
    // viewer3D.render()
  }
  worldToClient (worldPosition) {
    let res = null
    const viewer2D = this.getViewer()
    if (viewer2D) {
      res = viewer2D.worldToClient(worldPosition)
    }
    return res
  }

  clientToWorld (clientPosition) { // 获取客户端坐标对应的世界坐标
    let res = null
    const viewer2D = this.getViewer()
    if (viewer2D) {
      res = viewer2D.clientToWorld(clientPosition)
    }
    return res
  }
  drawingLabel (pList) {
    let viewer2D = this.getViewer()
    let drawableConfig = new Glodon.Bimface.Plugins.Drawable.DrawableContainerConfig()
    drawableConfig.viewer = viewer2D
    // 容器

    let constdrawableContainer = this.getDrawableContainer()

    let items = []
    for (let point of pList) {
      let position = point
      let config = new Glodon.Bimface.Plugins.Drawable.CustomItemConfig()
      let rectangle = document.createElement('i')
      rectangle.className = `gda_sdk_iconfont icon-guanbi`
      // 自定义样式，支持Html的任意dom元素
      rectangle.style.display = 'inline-block'
      rectangle.style.width = '40px'
      rectangle.style.height = '40px'
      rectangle.style.lineHeight = '40px'
      rectangle.style.fontSize = '36px'
      rectangle.style.textAlign = 'center'
      rectangle.style.fontWeight = 'bold'
      rectangle.style.color = '#ff0000'
      rectangle.style.position = 'relative'
      rectangle.style.top = '-20px'
      rectangle.style.left = '-20px'
      config.content = rectangle
      config.viewer = viewer2D
      config.worldPosition = position
      // 生成customItem实例
      let customItem = new Glodon.Bimface.Plugins.Drawable.CustomItem(config)
      items.push(customItem)
    }
    constdrawableContainer.addItems(items)
    viewer2D.render()

    // 添加自定义标签

    // 设置Tip的样式
  }

  addMouseClickEvent (cb) {
    const viewer2D = this.getViewer()
    let _this = this
    if (viewer2D) {
      // 吸附效果
      viewer2D.enableSnap(true)
      // 覆写鼠标样式
      const viewer2DEle = viewer2D.getRootElement()
      const markupEle = viewer2DEle.querySelector('canvas[id=markup]') // document.getElementById('markup')
      viewer2DEle.style.cursor = 'Crosshair'
      if (markupEle) markupEle.style.cursor = 'Crosshair' // 在批注层存在情况下复写鼠标样式

      // eslint-disable-next-line no-undef
      _this.clickCallBack = function (data) {
        if (util.isLeftMouseBtn(data.event)) { // 左键选择点
          cb(data)
        }
      }
      // eslint-disable-next-line no-undef
      viewer2D.addEventListener(Glodon.Bimface.Viewer.ViewerDrawingEvent.MouseClicked, _this.clickCallBack)
    }
  }
  removeMouseClickEvent () {
    let _this = this
    const viewer2D = this.getViewer()
    if (!viewer2D || !viewer2D._drawingViewer) {
      return
    }
    viewer2D.enableSnap(false)
    const viewer2DEle = viewer2D.getRootElement()
    viewer2DEle.style.cursor = 'default'
    const markupEle = viewer2DEle.querySelector('canvas[id=markup]')
    if (markupEle) markupEle.style.cursor = 'default' // 在批注层存在情况下复写鼠标样式
    // 取消监听
    // eslint-disable-next-line no-undef
    viewer2D.removeEventListener(Glodon.Bimface.Viewer.ViewerDrawingEvent.MouseClicked, _this.clickCallBack)
  }
  getScreenLocationToPointXY () { // 创建鼠标点击监听，监听到点击的屏幕位置换算成图纸位置坐标返回
    const viewer2D = this.getViewer()
    let _self = this
    this.screenLocationToPointXYP = true
    return new Promise((resolve, reject) => {
      try {
        if (viewer2D) {
          const viewer2DEle = viewer2D.getRootElement()
          const markupEle = viewer2DEle.querySelector('canvas[id=markup]') // document.getElementById('markup')
          viewer2D.enableSnap(true)
          viewer2DEle.style.cursor = 'Crosshair'
          if (markupEle) markupEle.style.cursor = 'Crosshair' // 在批注层存在情况下复写鼠标样式

          // eslint-disable-next-line no-undef
          let clickCallBack = function (data) {
            if (!_self.screenLocationToPointXYP) {
              return
            }
            _self.screenLocationToPointXYP = false
            if (_self.$util.isLeftMouseBtn(data.event)) { // 左键选择点
              // if (data.snapPoint) {
              //   data.worldPosition.x = data.snapPoint.worldPosition.x
              //   data.worldPosition.y = data.snapPoint.worldPosition.y
              // }
              resolve(data)

              // 取消监听
              // eslint-disable-next-line no-undef
              viewer2D.removeEventListener(Glodon.Bimface.Viewer.ViewerDrawingEvent.MouseClicked, clickCallBack)
              viewer2D.enableSnap(false)
              viewer2DEle.style.cursor = 'default'
              if (markupEle) markupEle.style.cursor = 'default' // 在批注层存在情况下复写鼠标样式
            }
          }
          if (!this.SelectPointMouseClickedFunc) {
            this.SelectPointMouseClickedFunc = clickCallBack
          }
          // eslint-disable-next-line no-undef
          viewer2D.addEventListener(Glodon.Bimface.Viewer.ViewerDrawingEvent.MouseClicked, clickCallBack)
        } else {
          reject(new Error('viewer2d is undefined'))
        }
      } catch (err) {
        reject(err)
      }
    })
  }

  getScreenLocationToPointXYCancel () { // 取消点击获取屏幕坐标
    // 取消监听
    const viewer2D = this.getViewer()
    if (viewer2D) {
      this.screenLocationToPointXYP = false
      const viewer2DEle = viewer2D.getRootElement()
      const markupEle = viewer2DEle.querySelector('canvas[id=markup]') // document.getElementById('markup')
      // eslint-disable-next-line no-undef
      viewer2D.removeEventListener(Glodon.Bimface.Viewer.ViewerDrawingEvent.MouseClicked, this.SelectPointMouseClickedFunc)
      viewer2D.enableSnap(false)
      viewer2DEle.style.cursor = 'default'
      if (markupEle) markupEle.style.cursor = 'default' // 在批注层存在情况下复写鼠标样式
    }
  }

  // 批注相关

  // 绘制批注框并返回
  drawingAnnot (type, fillColor) {
    let _self = this
    const viewer2D = this.getViewer()
    return new Promise((resolve, reject) => {
      try {
        if (viewer2D) {
          viewer2D.enableSnap(true)
          // eslint-disable-next-line no-undef
          const markUpDoc = $('#markup')
          const annotation = _self.bimface.annotation
          annotation.setAnnotationType(type) // arrow, rectangle, circle, cross, cloud, text
          if (fillColor && fillColor.indexOf(',') !== -1) {
            fillColor = fillColor.split(',')
            // eslint-disable-next-line no-undef
            annotation.setFillColor(new Glodon.Web.Graphics.Color(fillColor[0], Number(fillColor[1])))
          }
          annotation.enablePick(false)
          annotation.startDrawing()
          markUpDoc.css('cursor', 'crosshair')
          if (['arrow', 'rectangle', 'cloudrect', 'cross', 'ellips'].indexOf(type) !== -1) {
            let callBackFunc = function (event) {
              if (_self.$util.isLeftMouseBtn(event)) {
                setTimeout(() => {
                  let ret = annotation.getAnnotationList()
                  resolve(ret)
                  viewer2D.enableSnap(false)
                  annotation.endDrawing()
                  // eslint-disable-next-line no-undef
                  markUpDoc.unbind('mouseup', callBackFunc)
                  markUpDoc.css('cursor', 'default')
                }, 0)
              }
            }
            // eslint-disable-next-line no-undef
            markUpDoc.bind('mouseup', callBackFunc)
          } else {
            resolve()
            viewer2D.enableSnap(false)
          }
        } else {
          reject(new Error('viewer2d is undefined'))
        }
      } catch (err) {
        reject(err)
        viewer2D.enableSnap(false)
      }
    })
  }

  // 绘制批注框操作取消
  drawingAnnotCancel () {
    const viewer2D = this.getViewer()
    const annotation = this.getAnnotation()
    if (viewer2D) {
      viewer2D.enableSnap(false)
    }
    if (annotation) {
      // eslint-disable-next-line no-undef
      const markUpDoc = $('#markup')
      annotation.endDrawing()
      // eslint-disable-next-line no-undef
      markUpDoc.unbind()
      markUpDoc.css('cursor', 'default')
    }
  }

  // 在指定位置绘制指定大小和形状的批注
  drawingAnnotAt (data) {
    let pointX = data.pointX // 绘制批注中心点x坐标
    let pointY = data.pointY // 绘制批注中心点y坐标
    let width = data.width // 批注宽度
    let height = data.height // 批注高度
    let needShifting = data.needShifting // 是否需要偏移矫正
    let type = data.type || 'Rectangle' // 类型
    let strokeStyle = data.strokeStyle || 'rgba(208,2,27,1)' // 颜色
    let text = data.text // 文字
    let fillStyle = data.fillStyle || '' // 填充色
    let lineWidth = data.lineWidth
    let drawingPointsList = data.drawingPointsList // 绘制图形的点的详细数据列表，此数据优先级高于中心点坐标，宽高和类型
    let minPtX = 0
    let minPtY = 0
    const viewer2D = this.getViewer()
    const annotation = this.getAnnotation()
    annotation.enablePick(false)
    if (!annotation) {
      return
    }
    let ctx = annotation._helper.ctx
    if (needShifting) { // 若需要添加偏移，则进行偏移矫正
      let MinPt = viewer2D._drawingViewer.getModelBBox().GetMinPt()
      if (MinPt) { // 根据偏移量矫正批注坐标
        minPtX = MinPt[0]
        minPtY = MinPt[1]
      }
    }
    pointX = pointX + minPtX
    pointY = pointY + minPtY
    let points = [[pointX - width / 2, pointY - height / 2], [pointX + width / 2, pointY + height / 2]]
    let markup = {
      drawPoints: points,
      fillStyle,
      lineWidth: lineWidth || 3,
      markupType: type,
      rotation: 0,
      strokeStyle,
      baseUnit: 300
    }
    if (type === 'my_CloudRect') { // 自定义云线矩形框画法，用云线代替
      let halfCloudNum = 40
      let cloudItemLength = Math.round((width + height) / halfCloudNum) || 1
      let wCloudNum = Math.ceil(width / cloudItemLength)
      let hCloudNum = Math.ceil(height / cloudItemLength)
      let topPs = []
      let rightPs = []
      let bottomPs = []
      let leftPs = []
      let i = 1
      while (cloudItemLength * i < Math.round(width + height) && i < 100) {
        if (i < wCloudNum) {
          topPs.push([pointX - width / 2 + cloudItemLength * i, pointY + height / 2])
          bottomPs.push([pointX - width / 2 + cloudItemLength * (wCloudNum - i), pointY - height / 2])
        }
        if (i < hCloudNum) {
          rightPs.push([pointX + width / 2, pointY + height / 2 - cloudItemLength * i])
          leftPs.push([pointX - width / 2, pointY + height / 2 - cloudItemLength * (hCloudNum - i)])
        }
        i++
      }
      markup.drawPoints = [[pointX - width / 2, pointY + height / 2], // 左上
        ...topPs, [pointX + width / 2, pointY + height / 2], // 右上
        ...rightPs, [pointX + width / 2, pointY - height / 2], // 右下
        ...bottomPs, [pointX - width / 2, pointY - height / 2], // 左下
        ...leftPs, [pointX - width / 2, pointY + height / 2] // 左上
      ]
      markup.markupType = 'Cloud'
    }
    if (type === 'Text') {
      markup = {
        drawPoints: [[pointX, pointY]],
        lineWidth: lineWidth || 3,
        fontWeight: 'bold',
        markupType: type,
        rotation: 0,
        strokeStyle,
        fontFamily: 'Arial',
        fontSize: 16,
        pureText: text || '',
        userText: text || '',
        center: null,
        bNeedHitByBbox: false,
        drawEnd: true
      }
    }
    if (drawingPointsList && drawingPointsList.length) {
      markup.drawPoints = drawingPointsList
    }

    // 判断是否闭合图形
    let startP = markup.drawPoints[0]
    let endP = markup.drawPoints[markup.drawPoints.length - 1]
    if (startP[0] === endP[0] && startP[1] === endP[1]) {
      markup.close = true // 闭合图形
      if (data.fillTransparent) {
        ctx.globalCompositeOperation = 'xor'
        markup.fillStyle = 'rgba(0,0,0,1)'
      }
    }
    let annotationList = annotation.getAnnotationList()
    annotationList.push(markup)
    annotationList = annotation.jsonifyAnnotationList(JSON.stringify(annotationList))
    annotation.setAnnotationList(annotationList)
    annotation.showAnnotation()
    return annotation.getAnnotationList()
  }

  // 在指定位置绘制指定大小和形状的多个批注
  /*
                data: Object
                {
                  positionList: Array [positionListItem, ...]
                    positionListItem: Object
                    {
                      minX: number,
                      minY: number,
                      maxX: number,
                      maxY: number,
                      drawingPointsList: [{x, y}, ...],
                      fillTransparent: boolean // 是否透明填充
                      fillStyle: string,
                      lineWidth: number,
                      strokeStyle: string
                    }
                  type: string [Polyline折线|Rectangle矩形|Cloud云线|CloudRect云线框|Ellipse椭圆|Cross十字|Arrow箭头]
                  fillStyle: string [rgba(208,2,27,1)]
                  strokeStyle: string [rgba(208,2,27,1)]
                  lineWidth: number
                }
                */
  drawingAnnotsAt (data) {
    let positionList = data.positionList // 批注数据列表
    let needShifting = data.needShifting // 是否需要偏移矫正
    let needZoom = data.needZoom // 是否需要全局定位居中
    let type = data.type || 'Rectangle' // 绘制批注类型 Polyline折线|Rectangle矩形|Cloud云线|CloudRect云线框|Ellipse椭圆|Cross十字|Arrow箭头
    let strokeStyle = data.strokeStyle || 'rgba(208,2,27,1)' // 绘制批注颜色
    let fillStyle = data.fillStyle || '' // 绘制批注填充色
    let lineWidth = data.lineWidth
    if (!Array.isArray(positionList)) { // 校验参数正确性
      return
    }
    const viewer2D = this.getViewer()
    const annotation = this.getAnnotation()
    annotation.enablePick(false)
    const drawableContainer2d = this.getDrawableContainer()
    if (!annotation) {
      return
    }
    let ctx = annotation._helper.ctx
    if (viewer2D) {
      let minPtX = 0
      let minPtY = 0
      if (needShifting) { // 若需要添加偏移，则进行偏移矫正
        let MinPt = viewer2D._drawingViewer.getModelBBox().GetMinPt()
        if (MinPt) { // 根据偏移量矫正批注坐标
          minPtX = MinPt[0]
          minPtY = MinPt[1]
        }
      }
      let markups = positionList.map(item => {
        item.minX = item.minX + minPtX
        item.minY = item.minY + minPtY
        item.maxX = item.maxX + minPtX
        item.maxY = item.maxY + minPtY
        let p = {
          drawPoints: [[item.minX, item.minY], [item.maxX, item.maxY]],
          fillStyle: item.fillStyle || fillStyle,
          lineWidth: item.lineWidth || lineWidth || 3,
          markupType: item.type || type,
          rotation: 0,
          strokeStyle: item.strokeStyle || strokeStyle
        }
        if (p.markupType === 'my_CloudRect') { // 自定义云线矩形框画法，用云线代替
          let width = item.maxX - item.minX
          let height = item.maxY - item.minY
          let pointX = item.minX + width / 2
          let pointY = item.minY + height / 2
          // 生成云线中间点
          let halfCloudNum = 40
          let cloudItemLength = Math.round((width + height) / halfCloudNum) || 1
          let wCloudNum = Math.ceil(width / cloudItemLength)
          let hCloudNum = Math.ceil(height / cloudItemLength)
          let topPs = []
          let rightPs = []
          let bottomPs = []
          let leftPs = []
          let i = 1
          while (cloudItemLength * i < Math.round(width + height) && i < 100) {
            if (i < wCloudNum) {
              topPs.push([pointX - width / 2 + cloudItemLength * i, pointY + height / 2])
              bottomPs.push([pointX - width / 2 + cloudItemLength * (wCloudNum - i), pointY - height / 2])
            }
            if (i < hCloudNum) {
              rightPs.push([pointX + width / 2, pointY + height / 2 - cloudItemLength * i])
              leftPs.push([pointX - width / 2, pointY + height / 2 - cloudItemLength * (hCloudNum - i)])
            }
            i++
          }
          p.drawPoints = [[pointX - width / 2, pointY + height / 2], // 左上
            ...topPs, [pointX + width / 2, pointY + height / 2], // 右上
            ...rightPs, [pointX + width / 2, pointY - height / 2], // 右下
            ...bottomPs, [pointX - width / 2, pointY - height / 2], // 左下
            ...leftPs, [pointX - width / 2, pointY + height / 2] // 左上
          ]
          p.markupType = 'Cloud'
        }
        if (type === 'Text') {
          p = {
            drawPoints: [[(item.minX + item.maxX) / 2, (item.minY + item.maxY) / 2]],
            lineWidth: lineWidth || 3,
            markupType: type,
            rotation: 0,
            strokeStyle,
            fontFamily: 'Arial',
            fontSize: 16,
            pureText: item.text || '',
            userText: item.text || '',
            center: null,
            bNeedHitByBbox: false,
            drawEnd: true
          }
        }

        if (item.drawingPointsList && item.drawingPointsList.length) { // 若绘制图形包含点位置信息，则优先级高
          p.drawPoints = item.drawingPointsList
        }

        // 判断是否闭合图形
        let startP = p.drawPoints[0]
        let endP = p.drawPoints[p.drawPoints.length - 1]
        if (startP[0] === endP[0] && startP[1] === endP[1]) {
          p.close = true // 闭合图形
          if (item.fillTransparent) {
            ctx.globalCompositeOperation = 'xor'
            p.fillStyle = 'rgba(0,0,0,1)'
          }
        }
        return p
      })
      let annotationList = annotation.getAnnotationList()
      annotationList = annotationList.concat(markups)
      annotationList = annotation.jsonifyAnnotationList(JSON.stringify(annotationList))
      annotation.setAnnotationList(annotationList)
      annotation.showAnnotation()
      // 全局居中缩放
      if (needZoom && positionList.length) {
        let boundX1 = null
        let boundY1 = null
        let boundX2 = null
        let boundY2 = null
        positionList.map(item => {
          boundX1 = boundX1 ? Math.min(boundX1, item.minX) : item.minX
          boundY1 = boundY1 ? Math.min(boundY1, item.minY) : item.minY
          boundX2 = boundX2 ? Math.max(boundX2, item.maxX) : item.maxX
          boundY2 = boundY2 ? Math.max(boundY2, item.maxY) : item.maxY
        })
        let boundW = Math.abs(boundX2 - boundX1)
        let boundH = Math.abs(boundY2 - boundY1)
        let paddingLeftAndRight = boundW / 10
        let paddingTopAndBottom = boundH / 10
        this.moveToBoundingBox(
          boundX1 - paddingLeftAndRight,
          boundY1 - paddingTopAndBottom,
          boundX2 + paddingLeftAndRight,
          boundY2 + paddingTopAndBottom
        )
      }

      annotation.showAnnotation(annotationList)
      drawableContainer2d.update()
      return annotation.getAnnotationList()
    } else {
      return []
    }
  }

  // drawingAnchors (positionList, openWupanFunc, eleInfoFunc, hidden = false) {
  //   let thiz = this
  //   const drawableContainer2d = getDrawableContainer.call(thiz)
  //   const viewer2D = getViewer.call(thiz)
  //   const annotation = getAnnotation.call(thiz)
  //   const wupanRight = false && thiz.$store.getters.getFuncPointsRightList['misjudgment']
  //   if (drawableContainer2d) {
  //     drawableContainer2d.clear()
  //     let items = []
  //     positionList.map((p, pIndex) => {
  //       // eslint-disable-next-line no-undef
  //       let config = new Glodon.Bimface.Plugins.Drawable.CustomItemConfig()
  //       let wMaxThanh = true
  //       if (p.maxX - p.minX < p.maxY - p.minY) {
  //         wMaxThanh = false
  //       }
  //       // -------------
  //       let outerDiv = document.createElement('div')
  //       let innerDiv = document.createElement('div')
  //       outerDiv.appendChild(innerDiv)
  //       outerDiv.className = '__anchor_icon'
  //       outerDiv.style.width = '30px'
  //       outerDiv.style.height = '30px'
  //       outerDiv.style.border = '1px solid #FFFFFF'
  //       outerDiv.style.background = '#8A8A8A'
  //       outerDiv.style.borderRadius = '50% 50% 50% 0'
  //       outerDiv.style.transform = 'rotate(-45deg)'
  //       if (hidden) {
  //         outerDiv.style.opacity = '0'
  //       }
  //       // outerDiv.style.position = 'absolute'
  //       // outerDiv.style.bottom = '0px'
  //       let indexContent = (p.index === undefined ? pIndex : p.index) + 1
  //       if (!hidden) {
  //         outerDiv.addEventListener('click', (cEvent) => {
  //           let id = p.customItemId
  //           if (!id) {
  //             return
  //           }
  //           sessionStorage.setItem('__current_active_anchor_data', JSON.stringify(p))
  //           sessionStorage.setItem('__current_active_anchor_labelId', p.customItemId)
  //           thiz.$store.commit('SET_ACTIVE_ANCHOR_INDEX', pIndex)
  //           thiz.$store.commit('SET_ACTIVE_ANCHOR_INFO', p.originData)
  //           // 更新当前z-index 和其他 anchor z-index
  //           let anchorsList = drawableContainer2d.getAllItems()
  //           anchorsList.map(a => {
  //             if (a.id !== p.customItemId) {
  //               a.dom.parentNode.parentNode.style.zIndex = '6'
  //             } else {
  //               cEvent.currentTarget.parentNode.parentNode.style.zIndex = '7'
  //             }
  //           })
  //           let anchorItem = drawableContainer2d.getItemById(id)
  //           let pNode = anchorItem.dom.parentNode
  //           let chinBox = pNode.getElementsByClassName('__chin_box')[0]
  //           let anchorIcon = pNode.getElementsByClassName('__anchor_icon')[0]

  //           // 计算弹框出现位置
  //           let marginRight = 0
  //           if (document.getElementsByClassName('review_screen_content') && document.getElementsByClassName('review_screen_content')[0] && document.getElementsByClassName('review_screen_content')[0].style.display !== 'none') {
  //             marginRight = 400
  //           }
  //           let chinBoxWidth = 260
  //           let chinBoxHeight = 136
  //           let positionClzName = ''
  //           if (cEvent.isTrusted) {
  //             let needLeft = false
  //             let needRight = false
  //             let needTop = false
  //             let needBottom = false
  //             let screenX = cEvent.screenX
  //             let screenY = cEvent.screenY
  //             let toScreenTop = screenY
  //             let toScreenBottom = document.body.clientHeight - toScreenTop
  //             let toScreenLeft = screenX
  //             let toScreenRight = document.body.clientWidth - toScreenLeft
  //             if (toScreenTop < ((wMaxThanh ? chinBoxHeight : chinBoxHeight / 2) + 180)) {
  //               needBottom = true
  //             }
  //             if (toScreenBottom < chinBoxHeight) {
  //               needTop = true
  //             }
  //             if (toScreenLeft < (wMaxThanh ? chinBoxWidth / 2 : chinBoxWidth)) {
  //               needRight = true
  //             }
  //             if (toScreenRight < ((wMaxThanh ? chinBoxWidth / 2 : chinBoxWidth) + marginRight)) {
  //               needLeft = true
  //             }
  //             if (needTop && needLeft) {
  //               positionClzName = '__p_top_left'
  //             } else if (needTop && needRight) {
  //               positionClzName = '__p_top_right'
  //             } else if (needTop) {
  //               positionClzName = '__p_top'
  //             } else if (needBottom && needLeft) {
  //               positionClzName = '__p_bottom_left'
  //             } else if (needBottom && needRight) {
  //               positionClzName = '__p_bottom_right'
  //             } else if (needBottom) {
  //               positionClzName = '__p_bottom'
  //             } else if (needRight) {
  //               positionClzName = '__p_right'
  //             } else if (needLeft) {
  //               positionClzName = '__p_left'
  //             } else {
  //               positionClzName = wMaxThanh ? '' : '__p_left'
  //             }
  //           } else {
  //             positionClzName = wMaxThanh ? '' : '__p_left'
  //           }
  //           if (!chinBox) {
  //             // let chinBoxList = document.getElementsByClassName('__chin_box')
  //             // let pNodeList = document.getElementsByClassName('__anchor_icon')
  //             // for (let item of chinBoxList) {
  //             //   item.style.display = 'none'
  //             // }
  //             // for (let item of pNodeList) {
  //             //   item.style.background = '#8A8A8A'
  //             // }
  //             anchorIcon && (anchorIcon.style.background = '#126BFF')
  //             chinBox = document.createElement('div')
  //             chinBox.className = `__chin_box ${positionClzName}`
  //             chinBox.style.width = `${chinBoxWidth}px`
  //             chinBox.style.height = `${chinBoxHeight}px`
  //             chinBox.style.background = '#40424C'
  //             chinBox.style.padding = '12px'
  //             chinBox.style.pointerEvents = 'none'
  //             chinBox.innerHTML = `<div class="__chin_box_close"><i class="iconfont icon-cancel"></i></div>
  //             <div class="__chin_box_content">
  //               <div>${p.originData.name || ''}</div>
  //               <div>
  //                 ${p.originData.elementId ? `ID:${p.originData.elementId}` : ''}  
  //                 ${p.originData.elementId ? '  <span class="more_ele_info_bar">更多信息<i class="iconfont icon-xiala more_ele_info" style="display:inline-block; transform:rotate(-90deg);"></i></span>' : ''}
                
  //               </div>
  //               <div>检查结果</div>
  //               <div>${p.originData.message || p.originData.elementResult || '无数据'}</div>
  //             </div>
  //             <div class="__chin_box_opts">
  //              ${wupanRight ? `<i class="iconfont ${p.originData.misjudgment ? 'icon-youwujihuo' : 'icon-wupan'} wupan"></i>` : ''}
  //              <div class="qiehuan">
  //               <i class="iconfont icon-xiala anchor__pre"></i>
  //               <span class="anchor_number_count">${indexContent}/${positionList.length}</span>
  //               <i class="iconfont icon-xiala anchor__next"></i>
  //              </div>
  //             </div>`
  //             chinBox.getElementsByClassName('icon-cancel')[0].addEventListener('click', (event) => {
  //               chinBox.style.display = 'none'
  //               anchorIcon && (anchorIcon.style.background = '#8A8A8A')
  //               if (event.isTrusted) {
  //                 sessionStorage.removeItem('__current_active_anchor_labelId')
  //                 thiz.$store.commit('SET_ACTIVE_ANCHOR_INDEX', null)
  //               }
  //             }, false)
  //             if (wupanRight) {
  //               chinBox.getElementsByClassName('wupan')[0].addEventListener('click', (event) => {
  //                 openWupanFunc(p.originData)
  //               }, false)
  //             }
  //             if (eleInfoFunc && p.originData.elementId) {
  //               chinBox.getElementsByClassName('more_ele_info_bar')[0].addEventListener('click', (event) => {
  //                 eleInfoFunc(p.originData)
  //               }, false)
  //             }
  //             chinBox.getElementsByClassName('anchor__pre')[0].addEventListener('click', (event) => {
  //               let currentAnchorId = sessionStorage.getItem('__current_active_anchor_labelId')
  //               let currentData = sessionStorage.getItem('__current_active_anchor_data')
  //               if (currentData && currentData.index === 0) {
  //                 return
  //               }
  //               let anchorsList = drawableContainer2d.getAllItems()

  //               let currentAIndex = anchorsList.findIndex(item => item.id === currentAnchorId)
  //               // 取上一个锚点（index - 1）
  //               let preAnchorIndex = currentAIndex - 1

  //               // 取上一个审查结果关联的多个锚点的第一个
  //               let currentMyIndex = anchorsList[currentAIndex]._myData.index
  //               if (currentMyIndex !== undefined) {
  //                 preAnchorIndex = anchorsList.findIndex((item, iIndex) => item._myData.index === currentMyIndex - 1)
  //               }

  //               if (preAnchorIndex == -1) {
  //                 preAnchorIndex = anchorsList.findIndex((item, iIndex) => iIndex === currentMyIndex - 1)
  //               }

  //               if (preAnchorIndex >= 0) {
  //                 let preAnchor = anchorsList[preAnchorIndex]
  //                 // let currentAnchor = anchorsList[preAnchorIndex + 1]
  //                 let boundingBox = [[preAnchor._myData.minX, preAnchor._myData.minY, 0], [preAnchor._myData.maxX, preAnchor._myData.maxY, 0]]
  //                 viewer2D.zoomToBoundingBox(boundingBox, 1.25)
  //                 drawableContainer2d.update()
  //                 annotation.showAnnotation()
  //                 preAnchor.dom.click()
  //                 // 打开新的anchor
  //                 let anchorIcon = preAnchor.dom.parentNode.getElementsByClassName('__anchor_icon')[0]
  //                 anchorIcon && anchorIcon.dispatchEvent(thiz.$util.getEvent())
  //                 anchorsList.map(item => {
  //                   if (item.id !== preAnchor.id) {
  //                     let guanbiBtn = item.dom.parentNode.getElementsByClassName('icon-cancel')[0]
  //                     if (guanbiBtn) {
  //                       guanbiBtn.dispatchEvent(thiz.$util.getEvent())
  //                     }
  //                   }
  //                 })
  //                 // currentAnchor.dom.parentNode.getElementsByClassName('iconicon_guanbi')[0].dispatchEvent(event)
  //               } else {
  //                 thiz.$message.warning('当前已是第一个！')
  //               }
  //             }, false)
  //             chinBox.getElementsByClassName('anchor__next')[0].addEventListener('click', (event) => {
  //               let currentAnchorId = sessionStorage.getItem('__current_active_anchor_labelId')
  //               let currentData = sessionStorage.getItem('__current_active_anchor_data')
  //               let anchorsList = drawableContainer2d.getAllItems()
  //               if (currentData && currentData.index === (anchorsList.length - 1)) {
  //                 return
  //               }
  //               let currentAIndex = anchorsList.findIndex(item => item.id === currentAnchorId)
  //               // 取下一个锚点（index + 1）
  //               let nextAnchorIndex = currentAIndex + 1

  //               // 取上一个审查结果关联的多个锚点的第一个
  //               let currentMyIndex = anchorsList[currentAIndex]._myData.index
  //               if (currentMyIndex !== undefined) {
  //                 nextAnchorIndex = anchorsList.findIndex((item, iIndex) => item._myData.index === currentMyIndex + 1)
  //               }

  //               if (nextAnchorIndex == -1) {
  //                 nextAnchorIndex = anchorsList.findIndex((item, iIndex) => iIndex === currentMyIndex + 1)
  //               }

  //               if (nextAnchorIndex !== -1 && nextAnchorIndex < anchorsList.length) {
  //                 let nextAnchor = anchorsList[nextAnchorIndex]
  //                 // let currentAnchor = anchorsList[nextAnchorIndex - 1]
  //                 let boundingBox = [[nextAnchor._myData.minX, nextAnchor._myData.minY, 0], [nextAnchor._myData.maxX, nextAnchor._myData.maxY, 0]]
  //                 viewer2D.zoomToBoundingBox(boundingBox, 1.25)
  //                 drawableContainer2d.update()
  //                 annotation.showAnnotation()
  //                 nextAnchor.dom.click()
  //                 // 打开新的anchor
  //                 let anchorIcon = nextAnchor.dom.parentNode.getElementsByClassName('__anchor_icon')[0]
  //                 anchorIcon && anchorIcon.dispatchEvent(thiz.$util.getEvent())
  //                 anchorsList.map(item => {
  //                   if (item.id !== nextAnchor.id) {
  //                     let guanbiBtn = item.dom.parentNode.getElementsByClassName('icon-cancel')[0]
  //                     if (guanbiBtn) {
  //                       guanbiBtn.dispatchEvent(thiz.$util.getEvent())
  //                     }
  //                   }
  //                 })
  //                 // currentAnchor.dom.parentNode.getElementsByClassName('iconicon_guanbi')[0].dispatchEvent(event)
  //               } else {
  //                 thiz.$message.warning('当前已是最后一个！')
  //               }
  //             }, false)
  //             pNode.appendChild(chinBox)
  //             // let boundingBox = [
  //             //   [item._myData.minX, item._myData.minY, 0],
  //             //   [item._myData.maxX, item._myData.maxY, 0]
  //             // ]
  //             // viewer2D.zoomToBoundingBox(boundingBox, 1.25)
  //             // drawableContainer2d.update()
  //             let anchorsList = drawableContainer2d.getAllItems()
  //             anchorsList.map(item => {
  //               if (item.id !== anchorItem.id) {
  //                 let guanbiBtn = item.dom.parentNode.getElementsByClassName('icon-cancel')[0]
  //                 if (guanbiBtn) {
  //                   guanbiBtn.dispatchEvent(thiz.$util.getEvent())
  //                 }
  //               }
  //             })
  //           } else if (chinBox.style.display === 'none') {
  //             chinBox.style.display = 'block'
  //             chinBox.className = `__chin_box ${positionClzName}`
  //             // if (chinBox.offsetTop < 88) {
  //             //   chinBox.style.top = '74px'
  //             // }
  //             // if (chinBox.offsetLeft < 0) {
  //             //   chinBox.style.left = '270px'
  //             // }
  //             anchorIcon && (anchorIcon.style.background = '#126BFF')
  //             // let boundingBox = [
  //             //   [item._myData.minX, item._myData.minY, 0],
  //             //   [item._myData.maxX, item._myData.maxY, 0]
  //             // ]
  //             // viewer2D.zoomToBoundingBox(boundingBox, 1.25)
  //             // drawableContainer2d.update()
  //             let anchorsList = drawableContainer2d.getAllItems()
  //             anchorsList.map(item => {
  //               if (item.id !== anchorItem.id) {
  //                 let guanbiBtn = item.dom.parentNode.getElementsByClassName('icon-cancel')[0]
  //                 if (guanbiBtn) {
  //                   guanbiBtn.dispatchEvent(thiz.$util.getEvent())
  //                 }
  //               }
  //             })
  //           }
  //         })
  //       }

  //       innerDiv.innerText = indexContent
  //       innerDiv.style.width = '26px'
  //       innerDiv.style.height = '22px'
  //       innerDiv.style.fontSize = '14px'
  //       innerDiv.style.paddingTop = '4px'
  //       innerDiv.style.background = '#FFFFFF'
  //       innerDiv.style.borderRadius = '50%'
  //       innerDiv.style.color = '#273853'
  //       innerDiv.style.fontWeight = 'blod'
  //       innerDiv.style.transform = 'rotate(45deg)'
  //       innerDiv.style.textAlign = 'center'
  //       innerDiv.style.margin = '2px'
  //       // -------------

  //       config.content = outerDiv // rectangle
  //       config.draggable = true
  //       config.tooltip = '按住鼠标左键，可拖动'
  //       config.viewer = viewer2D
  //       // 增加一个Tip提示
  //       if (wMaxThanh) {
  //         config.offsetY = -40
  //       } else {
  //         config.offsetX = -32
  //         config.offsetY = -32
  //       }
  //       config.worldPosition = {
  //         x: wMaxThanh ? (p.minX + p.maxX) / 2 : p.minX, y: wMaxThanh ? p.maxY : (p.minY + p.maxY) / 2
  //       }
  //       config.opacity = 1
  //       // 生成customItem实例
  //       // eslint-disable-next-line no-undef
  //       let customItem = new Glodon.Bimface.Plugins.Drawable.CustomItem(config)
  //       customItem.setTooltipStyle({
  //         left: '38px'
  //       })
  //       // p.index = pIndex
  //       customItem._myData = p
  //       p.customItemId = customItem.id
  //       items.push(customItem)
  //     })
  //     drawableContainer2d.addItems(items)
  //     drawableContainer2d.update()
  //   }
  // }

  clearAnchors () {
    const drawableContainer2d = this.getDrawableContainer()
    if (drawableContainer2d) {
      drawableContainer2d.clear()
    }
  }

  updateAnchors () {
    const drawableContainer2d = this.getDrawableContainer()
    if (drawableContainer2d) drawableContainer2d.update()
  }

  hideAllAnchors () {
    const drawableContainer2d = this.getDrawableContainer()
    if (drawableContainer2d) drawableContainer2d.hideAllItems()
  }

  showAllAnchors () {
    const drawableContainer2d = this.getDrawableContainer()
    if (drawableContainer2d) drawableContainer2d.showAllItems()
  }

  anchorActiveByIndex (index, aItem) {
    const drawableContainer2d = this.getDrawableContainer()
    const viewer2D = this.getViewer()
    const annotation = this.getAnnotation()
    let event
    if (window.MouseEvent) {
      event = new MouseEvent('click')
    } else {
      event = document.createEvent('MouseEvents')
      event.initMouseEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null)
    }
    // 批注处理
    let annotationList = annotation.getAnnotationList()
    for (let i = 0; i < annotationList.length; i++) {
      // 云线图 闪烁三次
      if (i === index) {
        let light = false
        for (let time = 0; time < 1800; time += 300) {
          setTimeout(() => {
            annotationList[i].strokeStyle = light ? 'rgba(208,2,27,1)' : 'rgba(208,2,27,0)'
            light = !light
            annotation.showAnnotation()
          }, time)
        }
      } else {
        annotationList[i].strokeStyle = 'rgba(0,0,0,0)'
      }
    }
    let anchorsList = drawableContainer2d.getAllItems()
    if (anchorsList && anchorsList.length && anchorsList.length > index) {
      try {
        let anchor = anchorsList[index]
        if (aItem) {
          anchor = anchorsList.find(a => {
            return a._myData.originData.id === aItem.id
          })
        }
        let boundingBox = [[anchor._myData.minX, anchor._myData.minY, 0], [anchor._myData.maxX, anchor._myData.maxY, 0]]
        viewer2D.zoomToBoundingBox(boundingBox, 1.25)
        drawableContainer2d.update()
        annotation.showAnnotation()
        anchor.dom.click()
        // 打开新的anchor内容签
        let anchorIcon = anchor.dom.parentNode.getElementsByClassName('__anchor_icon')[0]
        anchorIcon && anchorIcon.dispatchEvent(this.$util.getEvent())
        anchorsList.map(item => {
          if (item.id !== anchor.id) {
            item.dom.parentNode.style.display = 'none'
            let guanbiBtn = item.dom.parentNode.getElementsByClassName('icon-cancel')[0]
            if (guanbiBtn) {
              guanbiBtn.dispatchEvent(this.$util.getEvent())
            }
          } else {
            item.dom.parentNode.style.display = 'block'
          }
        })

        return 1
      } catch (err) {
        return 0
      }
    } else {
      return 0
    }
  }

  // 显示批注
  showAnnotList (annotList) {
    const annotation = this.getAnnotation()
    if (annotation) {
      annotation.setAnnotationList(annotList)
      annotation.showAnnotation()
    }
  }

  // 隐藏批注
  hideAnnotation () {
    const annotation = this.getAnnotation()
    if (annotation) {
      annotation.hideAnnotation()
    }
  }

  // 清空批注
  clearAnnotation () {
    const annotation = this.getAnnotation()
    if (annotation) {
      annotation.clear()
    }
  }

  getAnnotationList () {
    const annotation = this.getAnnotation()
    if (annotation) {
      return annotation.getAnnotationList()
    }
    return []
  }

  // 移动给定世界坐标至视口中心
  moveLocationToViewBoxCenter (point) {
    if (Object.isObject(point) && point.x && point.y) {
      // let x = point.x
      // let y = point.y
    } else {

    }
  }

  zoomToObject (ob) {
    const viewer2D = this.getViewer()
    if (viewer2D) {
      viewer2D.zoomToObject(ob)
    }
  }

  update () {
    const viewer2D = this.getViewer()
    if (viewer2D) {
      viewer2D.update()
    }
  }

  // 图层图元相关

  hideElementsById (ids) { // 根据ID隐藏图元
    const viewer2D = this.getViewer()
    if (viewer2D) {
      viewer2D.hideElementsById(ids)
    }
  }

  showElementsById (ids) { // 根据ID显示图元
    const viewer2D = this.getViewer()
    if (viewer2D) {
      viewer2D.showElementsById(ids)
    }
  }

  clearSelection () { // 清除图元选中
    const viewer2D = this.getViewer()
    if (viewer2D) {
      viewer2D.clearSelection()
    }
  }

  showAllElements () { // 显示所有图元
    const viewer2D = this.getViewer()
    if (viewer2D) {
      viewer2D.showAllElements()
    }
  }

  highlightById (id) { // 高亮图元
    const viewer2D = this.getViewer()
    if (viewer2D) {
      viewer2D.highlightById(id)
    }
  }

  clearHighlight () { // 清除图元高亮
    const viewer2D = this.getViewer()
    if (viewer2D) {
      viewer2D.clearHighlight()
    }
  }

  selectByIds (ids) { // 根据ID选中图元
    const viewer2D = this.getViewer()
    if (viewer2D) {
      viewer2D.selectByIds(ids)
    }
  }

  setGlobalColor (colorString = '128,128,128,1') { // 设置全局图元颜色
    const viewer2D = this.getViewer()
    if (viewer2D) {
      let colorS = colorString.split(',')
      let red = colorS[0]
      let yellow = colorS[1]
      let blue = colorS[2]
      let guid = colorS[3]
      // eslint-disable-next-line no-undef
      let color = new Glodon.Web.Graphics.Color(red, yellow, blue, guid)
      viewer2D.setGlobalColor(color)
    }
  }

  restoreGlobalColor () { // 恢复全局图元颜色
    const viewer2D = this.getViewer()
    if (viewer2D) {
      viewer2D.restoreGlobalColor()
    }
  }

  getLayerByName (layerName) { // 根据图层名称匹配图层
    let ret = null
    const viewer2D = this.getViewer()
    if (viewer2D) {
      let layers = []
      layers = viewer2D.getLayers()
      if (layers && layers.length) {
        ret = layers.find(item => {
          return item.name === layerName
        })
      }
    }
    return ret
  }

  getAllLayers () { // 获取所有图层
    let ret = []
    const viewer2D = this.getViewer()
    if (viewer2D) {
      ret = viewer2D.getLayers()
    }
    return ret
  }

  hideLayer (layerid) { // 隐藏某图层
    const viewer2D = this.getViewer()
    if (viewer2D) {
      viewer2D.hideLayer(layerid)
    }
  }
  hideAllLayers () { // 隐藏所有图层
    const viewer2D = this.getViewer()
    if (viewer2D) {
      viewer2D.hideAllLayers()
    }
  }

  showLayer (layerid) { // 显示某图层
    const viewer2D = this.getViewer()
    if (viewer2D) {
      viewer2D.showLayer(layerid)
    }
  }

  showAllLayers () { // 显示所有图层
    const viewer2D = this.getViewer()
    if (viewer2D) {
      viewer2D.showAllLayers()
    }
  }

  // 选择图元所在图层
  selectLayerByBlock () {
    cancelData.selectLayerByBlock = false
    return new Promise((resolve, reject) => {
      try {
        const viewer2D = this.getViewer()

        let hoverFunc = function (data) {
          let objId = data.objectId
          if (objId) {
            let layerId = viewer2D.getLayerIdsByElements([objId]) || []
            if (layerId.length) {
              viewer2D.highlightByLayerId(layerId[0])
            }
          }
        }
        // eslint-disable-next-line no-undef
        viewer2D.addEventListener(Glodon.Bimface.Viewer.ViewerDrawingEvent.Hover, hoverFunc)
        let selectFunc = function (data) {
          let layerIds = viewer2D.getLayerIdsByElements(data) || []
          let layerData = viewer2D.getLayers() || []
          let ret = null
          if (layerIds.length && layerData.length) {
            ret = layerData.find(item => {
              return item.id === layerIds[0]
            })
          }
          let isCancel = this.getCancelData('selectLayerByBlock')
          if (isCancel) ret = null
          resolve(ret)

          // 取消监听
          // eslint-disable-next-line no-undef
          viewer2D.getEventManager().removeEvent('ComponentsSelectionChanged', selectFunc)
          // eslint-disable-next-line no-undef
          viewer2D.getEventManager().removeEvent('Hover', hoverFunc)
        }
        // eslint-disable-next-line no-undef
        viewer2D.addEventListener(Glodon.Bimface.Viewer.ViewerDrawingEvent.ComponentsSelectionChanged, selectFunc)
      } catch (err) {
        reject(err)
      }
    })
  }

  // 取消 选择图元所在图层
  selectLayerByBlockCancel () {
    cancelData.selectLayerByBlock = true
  }

  // 给图层着色
  overrideLayersColorById (layerId, colorString = '255,255,255,1') {
    const viewer2D = this.getViewer()
    if (viewer2D) {
      if (!Array.isArray(layerId)) {
        layerId = [layerId]
      }
      let colorS = colorString.split(',')
      let red = colorS[0]
      let yellow = colorS[1]
      let blue = colorS[2]
      let guid = colorS[3]
      // eslint-disable-next-line no-undef
      let color = new Glodon.Web.Graphics.Color(red, yellow, blue, guid)
      viewer2D.overrideLayersColorById(layerId, color)
    }
  }

  // 根据图层id高亮图层中所有图元
  highLightLayerById (layerId) {
    const viewer2D = this.getViewer()
    if (viewer2D) {
      viewer2D.highlightByLayerId(layerId)
    }
  }

  restoreLayersColorById (layerIds) { // 清除图层着色
    const viewer2D = this.getViewer()
    if (viewer2D) {
      if (!Array.isArray(layerIds)) {
        layerIds = [layerIds]
      }
      viewer2D.restoreLayersColorById(layerIds)
    }
  }

  // 显示线宽
  showLineWidth (bool) {
    const viewer2D = this.getViewer()
    if (viewer2D) {
      viewer2D.showLineWidth(bool)
    }
  }

  getElementsByLayerId (layerId) {
    let ret = []
    const viewer2D = this.getViewer()
    if (viewer2D) {
      ret = viewer2D.getElementsByLayerId(layerId)
    }
    return ret
  }
  searchText (text, callBack) {
    const viewer2D = this.getViewer()
    if (viewer2D) {
      viewer2D.search({ text }, callBack, callBack)
    } else {
      callBack([])
    }
  }

  getAnnotationManager () {
    return this.getAnnotation()
  }

  getViewerManager () {
    return this.getViewer()
  }
  // ************************** 批注 **************************
  // 创建批注工具条
  createAnnotationToolbar2d () {
    // const viewer2D = this.getViewer()
    const annotationToolbar2d = this.getAnnotationToolBar()
    const annotation2d = this.getAnnotation()
    if (annotationToolbar2d && annotation2d) {
      // 创建批注工具条的配置
      // let config = new Glodon.Bimface.Plugins.Annotation.AnnotationToolbarConfig()
      // config.viewer = viewer2D
      // // 创建批注工具条
      // annotationToolbar2d = new Glodon.Bimface.Plugins.Annotation.AnnotationToolbar(config)
      annotation2d.setFillColor(new Glodon.Web.Graphics.Color(255, 0, 0, 0.3))

      // 注册批注工具条的监听事件
      annotationToolbar2d.addEventListener(Glodon.Bimface.Plugins.Annotation.AnnotationToolbarEvent.Saved, this.onAnnotationSaved2d)
      annotationToolbar2d.addEventListener(Glodon.Bimface.Plugins.Annotation.AnnotationToolbarEvent.Cancelled, this.exitAnnotation2d)
    }
  }
  // 开始绘制批注
  showAnnotationToolbar2d (callbackFunc) {
    const annotationToolbar2d = this.getAnnotationToolBar()
    const app = this.getApp()
    // 创建批注工具条
    this.createAnnotationToolbar2d()
    if (!isDrawAnnotationActivated2d) {
      // 隐藏主工具条
      app.getToolbar('MainToolbar').hide()
      // 显示批注工具条
      annotationToolbar2d.show()
      // 修改批注的激活状态为true
      isDrawAnnotationActivated2d = true
    }
    onAnnotationSavedCallback2d = callbackFunc
  }
  // 保存批注并退出
  onAnnotationSaved2d () {
    const annotation2d = this.getAnnotation()
    const annotationState = annotation2d.getCurrentState()
    // 批注导出快照
    annotation2d.createSnapshot((img) => {
      onAnnotationSavedCallback2d({ annotationState, img })
    })
    this.exitAnnotation2d()
  }

  createSnapshot2d (callbackFunc) {
    const annotation2d = this.getAnnotation()
    const annotationState = annotation2d.getCurrentState()
    // 批注导出快照
    annotation2d.createSnapshot((img) => {
      callbackFunc({ annotationState, img })
    })
  }
  // 退出批注
  exitAnnotation2d () {
    if (isDrawAnnotationActivated2d) {
      const app = this.getApp()
      const annotationToolbar2d = this.getAnnotationToolBar()
      const annotation2d = this.getAnnotation()
      // 显示主工具条
      app.getToolbar('MainToolbar').show()
      annotation2d.exit()
      this.hideAnnotationToolbar2d()
      // 批注的激活状态为false
      isDrawAnnotationActivated2d = false
      if (annotationToolbar2d) {
        annotationToolbar2d.removeEventListener(Glodon.Bimface.Plugins.Annotation.AnnotationToolbarEvent.Saved, this.onAnnotationSaved2d)
        annotationToolbar2d.removeEventListener(Glodon.Bimface.Plugins.Annotation.AnnotationToolbarEvent.Cancelled, this.exitAnnotation2d)
      }
    }
  }
  // 恢复批注
  restoreAnnotation2d (annotationState) {
    if (annotationState !== null) {
      // 恢复批注
      const annotation2d = this.getAnnotation()
      annotation2d.setState(annotationState)
      annotation2d.showAnnotation()
    }
  }
  // 隐藏批注工具栏
  hideAnnotationToolbar2d () {
    this.$nextTick(() => {
      const bimDom = document.getElementById(`${this.getDomId()}`)
      if (bimDom) {
        bimDom.getElementsByClassName('bf-annotation')[0].classList.add('bf-hide')
      }
    })
  }
  // ************************** 批注 **************************
  // 隐藏底部工具栏
  hideMainToolbar2d () {
    this.$nextTick(() => {
      const bimDom = document.getElementById(`${this.getDomId()}`)
      if (bimDom) {
        const ele = bimDom.getElementsByClassName('bf-toolbar-bottom')
        if (ele.length) {
          ele[0].style.display = 'none'
        }
      }
    })
  }
  // 显示底部工具栏
  showMainToolbar2d () {
    const bimDom = document.getElementById(`${this.getDomId()}`)
    if (bimDom) {
      const ele = bimDom.getElementsByClassName('bf-toolbar-bottom')
      if (ele.length) {
        ele[0].style.display = 'block'
      }
    }
  }
  // 隐藏左下角选择框
  hideLeftSubToolbar2d () {
    const bimDom = document.getElementById(`${this.getDomId()}`)
    if (bimDom) {
      const ele = bimDom.getElementsByClassName('bf-toolbar-select')
      if (ele.length) {
        ele[0].style.display = 'none'
      }
    }
  }
  // 显示左下角选择框
  showLeftSubToolbar2d () {
    const bimDom = document.getElementById(`${this.getDomId()}`)
    if (bimDom) {
      const ele = bimDom.getElementsByClassName('bf-toolbar-select')
      if (ele.length) {
        ele[0].style.display = 'block'
      }
    }
  }
  addEventListener2d (event, callback) {
    const viewer2D = this.getViewer()
    viewer2D && viewer2D.addEventListener(event, callback)
  }
  addEventListenerToolbar2d (event, callback) {
    const annotationToolbar2d = this.getAnnotationToolBar()
    annotationToolbar2d && annotationToolbar2d.addEventListener(event, callback)
  }
  removeEventListener2d (event) {
    const viewer2D = this.getViewer()
    viewer2D && viewer2D.removeEventListener(event)
  }
  toModelId (id) {
    let res = null
    const viewer2D = this.getViewer()
    if (viewer2D) {
      res = viewer2D.toModelId(id)
      if (!res) {
        res = toModelIdBabelFunc(id, viewer2D.getViewer()?.model?.Url)
      }
    }
    return res
  }
  toDrawingId (objectId, callback) {
    const viewer2D = this.getViewer()
    if (viewer2D.revitInteropReady === undefined) {
      viewer2D.revitInteropReady = true
    }
    try {
      viewer2D && viewer2D.toDrawingId(objectId, (d) => {
        if (!d || (Array.isArray(d) && !d.length)) {
          window.___viewer2D = viewer2D
          d = toDrawingEleIdBabelFunc(objectId, viewer2D.getViewer()?.model?.Url)
        }
        callback(d)
      })
    } catch (err) {
      callback(toDrawingEleIdBabelFunc(objectId, viewer2D.getViewer()?.model?.Url))
    }
  }
  // 模型导出的图纸用构件id计算在视图图纸中的世界坐标
  eleIdToWordPosition (objectId, callBack) {
    const viewer2D = this.getViewer()
    if (viewer2D) {
      try {
        viewer2D.toDrawingId(objectId, id => {
          if (id) {
            let ret = viewer2D.getObjectBoundingBox(id)
            if (ret) {
              callBack(ret)
            }
          }
        })
      } catch (err) {
        let d = toDrawingEleIdBabelFunc(objectId, viewer2D.getViewer()?.model?.Url)
        if (d) {
          let ret = viewer2D.getObjectBoundingBox(id)
          if (ret) {
            callBack(ret)
          }
        }
      }
    }
  }
  getCurrentViewId () {
    let res = null
    const viewer2D = this.getViewer()
    if (viewer2D) {
      res = viewer2D.getCurrentViewId()
    }
    return res
  }
  getCurrentState () {
    const annotation2d = this.getAnnotation()
    const annotationState = annotation2d.getCurrentState()
    return annotationState
  }
  setViewState (data) {
    const annotation2d = this.getAnnotation()
    annotation2d.setState(data)
  }
  getElementsByBoundingBox (viewId, boundingBox, selectionMode = 'Window', enableViewport = false) {
    let res = null
    const viewer2D = this.getViewer()
    if (viewer2D) {
      res = viewer2D.getElementsByBoundingBox(viewId, boundingBox, selectionMode, enableViewport)
    }
    return res
  }
  getObjectBoundingBox (objectId) {
    let res = null
    const viewer2D = this.getViewer()
    if (viewer2D) {
      res = viewer2D.getObjectBoundingBox(objectId)
    }
    return res
  }
  zoomToBoundingBox (boundingBox, ratio) {
    const viewer2D = this.getViewer()
    viewer2D && viewer2D.zoomToBoundingBox(boundingBox, ratio)
  }
  getModelPosition (viewId, point) {
    return new Promise(resolve => {
      const viewer2D = this.getViewer()
      viewer2D && viewer2D.getModelPosition(viewId, point, (val) => {
        resolve(val)
      })
    })
  }

  getSelectedObjects () {
    const viewer2D = this.getViewer()
    return viewer2D.getSelectedObjects()
  }

  getComponentProperty (componentId, callBack) {
    const _this = this
    if (!_this.componentPropertyCallBackListener) {
      _this.componentPropertyCallBackListener = function(e) {
        if (typeof e.data !== 'string') {
          return
        }
        let params = JSON.parse(e.data);
        if (params.key === 'componentPropertyCallBackMessage') {
          callBack(params.data)
        }
      }
      window.addEventListener('message', _this.componentPropertyCallBackListener)
    }
    window.postMessage(JSON.stringify({
      key: 'componentPropertyMessage',
      componentId
    }))
  }

  getRoomProperty (componentId, callBack) {
    const _this = this
    if (!_this.roomPropertyCallBackListener) {
      _this.roomPropertyCallBackListener = function(e) {
        if (typeof e.data !== 'string') {
          return
        }
        let params = JSON.parse(e.data);
        if (params.key === 'roomPropertyCallBackMessage') {
          callBack(params.data)
        }
      }
      window.addEventListener('message', _this.roomPropertyCallBackListener)
    }
    window.postMessage(JSON.stringify({
      key: 'roomPropertyMessage',
      componentId
    }))
  }
}

// let drawingMarkupAndAnchorsManager = new DrawingMarkupAndAnchor()

export default bim2dFileContext

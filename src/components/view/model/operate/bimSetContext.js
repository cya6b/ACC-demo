let getDrawingViewer = function () {
  return (this.my__viewer && this.my__viewer.bimface && this.my__viewer.bimface.drawingSetViewer) || undefined
}
let getdrawingViewer = function () {
  return (this.my__viewer && this.my__viewer.bimface && this.my__viewer.bimface.drawingSet) || undefined
}

let getSetAnnotation = function () {
  return (this.my__viewer && this.my__viewer.bimface && this.my__viewer.bimface.annotation) || undefined
}

let getSetAnnotationToolBar = function () {
  return (this.my__viewer && this.my__viewer.bimface && this.my__viewer.bimface.annotationToolBar) || undefined
}
let getSetDrawableContainer = function () {
  return (this.my__viewer && this.my__viewer.bimface && this.my__viewer.bimface.drawableContainer) || undefined
}
let isDrawAnnotationActivatedSet = false
let onAnnotationSavedCallbackSet = null
const DrawingSetMarkupAndAnchor = function () {
  let self = this
  this.upwardType = ''
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
    this.bimSetContent.clearSetAnnotation()

    function dr (context, list, otherParams) {
      list.sort((a, b) => {
        if (a.upward && !b.upward) {
          return 1
        } else if (!a.upward && b.upward) {
          return -1
        }
        return 0
      })
      context.drawingSetAnnotsAt({
        ...otherParams,
        positionList: list
      })
    }
    if (this.upwardType !== 'reviewResultsData' && this.data.reviewResultsData.length) {
      dr(this.bimSetContent, JSON.parse(JSON.stringify(this.data.reviewResultsData)), {...otherParams, annotType: 'reviewResultsData'})
    }
    if (this.upwardType !== 'componentsData' && this.data.componentsData.length) {
      dr(this.bimSetContent, JSON.parse(JSON.stringify(this.data.componentsData)), {...otherParams, annotType: 'componentsData'})
    }
    if (this.upwardType !== 'fireZonesData' && this.data.fireZonesData.length) {
      dr(this.bimSetContent, JSON.parse(JSON.stringify(this.data.fireZonesData)), {...otherParams, annotType: 'fireZonesData'})
    }

    if (this.upwardType) {
      dr(this.bimSetContent, JSON.parse(JSON.stringify(this.data[this.upwardType])), {...otherParams, annotType: this.upwardType})
    }
  }
}

let bimSetContent = {

  getSetDrawingMarkupAndAnchorsManager () {
    if (this.drawingSetMarkupAndAnchorsManager) {
      return this.drawingSetMarkupAndAnchorsManager
    }
    let dM = new DrawingSetMarkupAndAnchor()
    dM.bimSetContent = this
    this.drawingSetMarkupAndAnchorsManager = dM
    return dM
  },
  addDrawing (id, token, drawingSheetId, callBack) {
    let drawingViewer = getDrawingViewer.call(this)
    if (drawingViewer) {
      drawingViewer.loadDrawing({ modelId: id, viewToken: token, drawingSheetId }, (val) => {
        // if (drawingSheetId) {
        //   val.drawing2D.activeLayoutById(0)
        // }
        callBack(val)
      })
    }
  },
  addDrawings (drawings, callback) {
    let drawingViewer = getDrawingViewer.call(this)
    if (drawingViewer) {
      drawingViewer.loadDrawings(drawings, callback)
    }
  },
  setModelTransformation (id, modelTransformation) {
    let setViewer = getDrawingViewer.call(this)
    if (setViewer) {
      try {
        let temp = setViewer.getDrawing(id)
        if (temp) {
          temp.setDrawingTransformation(modelTransformation)
        }
      } catch (err) {
        // eslint-disable-next-line no-console
        console.log('位置叠加转换失败！')
      }
    }
  },
  toSetDrawingId (ObjectId, callback) {
    let setViewer = getDrawingViewer.call(this)
    setViewer.revitInteropReady = setViewer.getDrawing().revitInteropReady
    setViewer.toDrawingId(ObjectId, callback)
  },
  moveSetToBoundingBox (x1, y1, x2, y2, r) { // 移动至包围盒位置
    const setViewer = getDrawingViewer.call(this)
    if (setViewer) {
      // 构造包围盒对象
      let min = [x1, y1, 0]
      let max = [x2, y2, 0]
      let boundingBox = [min, max]
      // 缩放至包围盒区域，margin可自定义，margin值越大则边缘留白范围越大
      setViewer.zoomToBoundingBox(boundingBox, r || 1.25)

      const annotation = getSetAnnotation.call(this)
      if (annotation) {
        annotation.showAnnotation()
      }

      const drawableContainer2d = getSetDrawableContainer.call(this)
      if (drawableContainer2d) {
        drawableContainer2d.update()
      }
    }
  },
  getSetObjectBoundingBox (objectId) {
    let res = null
    let setViewer = getDrawingViewer.call(this)
    if (setViewer) {
      res = setViewer.getObjectBoundingBox(objectId)
    }
    return res
  },
  showDrawing (id) {
    let setViewer = getDrawingViewer.call(this)
    if (setViewer) {
      let temp = setViewer.getDrawing(id)
      temp && temp.showLayers({
        all: true
      })
    }
  },
  hideDrawing (id) {
    let setViewer = getDrawingViewer.call(this)
    if (setViewer) {
      let temp = setViewer.getDrawing(id)
      temp && temp.hideLayers({
        all: true
      })
    }
  },
  removeDrawings (list) {
    let setViewer = getdrawingViewer.call(this)
    list.map(id => {
      if (setViewer.getDrawing(id)) {
        setViewer.removeDrawing(id)
      }
    })
  },
  setGlobalColor (id, color) {
    let setViewer = getDrawingViewer.call(this)
    if (setViewer) {
      let temp = setViewer.getDrawing(id) // setViewer.sets.find(item => item.id === id)
      if (temp) {
        temp.overrideObjectsColor({
          all: true
        }, color)
        temp.setOpacity(1)
      }
    }
  },
  setAllLayersColor (id, color) {
    let setViewer = getDrawingViewer.call(this)
    if (setViewer) {
      let temp = setViewer.getDrawing(id) // setViewer.sets.find(item => item.id === id)
      temp.setDisplayMode(3)
      temp.overrideLayersColor({
        all: true,
        color
      })
    }
  },
  enableViewport (b) {
    let setViewer = getDrawingViewer.call(this)
    if (setViewer) {
      setViewer.enableViewport(b)
    }
  },
  // 设置Canvas叠加方式
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
  // ************************** 批注 **************************
  // 创建批注工具条
  createAnnotationToolbarSet () {
    // const viewer2D = getDrawingViewer.call(this)
    const annotationToolbarSet = getSetAnnotationToolBar.call(this)
    const annotationSet = getSetAnnotation.call(this)
    if (annotationToolbarSet && annotationSet) {
      // 创建批注工具条的配置
      // let config = new Glodon.Bimface.Plugins.Annotation.AnnotationToolbarConfig()
      // config.viewer = viewer2D
      // // 创建批注工具条
      // annotationToolbarSet = new Glodon.Bimface.Plugins.Annotation.AnnotationToolbar(config)
      annotationSet.setFillColor(new Glodon.Web.Graphics.Color(255, 0, 0, 0.3))
      // 注册批注工具条的监听事件
      annotationToolbarSet.addEventListener(Glodon.Bimface.Plugins.Annotation.AnnotationToolbarEvent.Saved, this.onAnnotationSavedSet)
      annotationToolbarSet.addEventListener(Glodon.Bimface.Plugins.Annotation.AnnotationToolbarEvent.Cancelled, this.exitAnnotationSet)
    }
  },
  // 开始绘制批注
  showAnnotationToolbarSet (callbackFunc) {
    const annotationToolbarSet = getSetAnnotationToolBar.call(this)
    const drawingViewer = getdrawingViewer.call(this)
    // 创建批注工具条
    this.createAnnotationToolbarSet()
    if (!isDrawAnnotationActivatedSet) {
      // 隐藏主工具条
      drawingViewer.getToolbar && drawingViewer.getToolbar('MainToolbar').hide()
      // 显示批注工具条
      annotationToolbarSet.show()
      // 修改批注的激活状态为true
      isDrawAnnotationActivatedSet = true
    }
    onAnnotationSavedCallbackSet = callbackFunc
  },
  // 保存批注并退出
  onAnnotationSavedSet () {
    const annotationSet = getSetAnnotation.call(this)
    const annotationState = annotationSet.getCurrentState()
    // 批注导出快照
    annotationSet.createSnapshot((img) => {
      onAnnotationSavedCallbackSet({ annotationState, img })
    })
    this.exitAnnotationSet()
  },

  createSnapshotSet (callbackFunc) {
    const annotationSet = getSetAnnotation.call(this)
    const annotationState = annotationSet.getCurrentState()
    // 批注导出快照
    annotationSet.createSnapshot((img) => {
      callbackFunc({ annotationState, img })
    })
  },
  // 退出批注
  exitAnnotationSet () {
    // 显示主工具条
    const drawingViewer = getdrawingViewer.call(this)
    drawingViewer.getToolbar && drawingViewer.getToolbar('MainToolbar').show()
    const annotationToolbarSet = getSetAnnotationToolBar.call(this)
    const annotationSet = getSetAnnotation.call(this)
    annotationSet.exit()
    // 处理批注工具条关不掉的特殊情况
    // if (drawingViewer) {
    //   let rootE = drawingViewer.getViewer().getRootElement()
    //   if (rootE) {
    //     let eles = rootE.getElementsByClassName('bf-cancel')
    //     if (eles && eles[0]) {
    //       eles[0].click()
    //     }
    //   }
    // }
    // 批注的激活状态为false
    isDrawAnnotationActivatedSet = false
    if (annotationToolbarSet) {
      annotationToolbarSet.removeEventListener(Glodon.Bimface.Plugins.Annotation.AnnotationToolbarEvent.Saved, this.onAnnotationSavedSet)
      annotationToolbarSet.removeEventListener(Glodon.Bimface.Plugins.Annotation.AnnotationToolbarEvent.Cancelled, this.exitAnnotationSet)
    }
  },
  // 恢复批注
  restoreAnnotationSet (annotationState) {
    if (annotationState !== null) {
      // 恢复批注
      const annotationSet = getSetAnnotation.call(this)
      annotationSet.setState(annotationState)
      annotationSet.showAnnotation()
    }
  },
  // ************************** 批注 **************************
  // 清空批注
  clearSetAnnotation () {
    const annotation = getSetAnnotation.call(this)
    if (annotation) {
      annotation.clear()
    }
  },
  drawingSetAnnotsAt (data) {
    let positionList = data.positionList // 批注数据列表
    let needShifting = data.needShifting // 是否需要偏移矫正
    let needZoom = data.needZoom // 是否需要全局定位居中
    let type = data.type || 'Rectangle' // 绘制批注类型 Polyline折线|Rectangle矩形|Cloud云线|CloudRect云线框|Ellipse椭圆|Cross十字|Arrow箭头
    let strokeStyle = data.strokeStyle || 'rgba(208,2,27,1)' // 绘制批注颜色
    let fillStyle = data.fillStyle || '' // 绘制批注填充色
    let lineWidth = data.lineWidth
    let annotType = data.annotType
    if (!Array.isArray(positionList)) { // 校验参数正确性
      return
    }
    const setViewer = getDrawingViewer.call(this)
    const annotation = getSetAnnotation.call(this)
    annotation.enablePick(false)
    const drawableContainer2d = getSetDrawableContainer.call(this)
    if (!annotation) {
      return
    }
    let ctx = annotation._helper.ctx
    if (setViewer) {
      let minPtX = 0
      let minPtY = 0
      if (needShifting) { // 若需要添加偏移，则进行偏移矫正
        let MinPt = setViewer._drawingViewer.getModelBBox().GetMinPt()
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
          annotType,
          id: item.originData && item.originData.id || '',
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
            annotType: data.annotType,
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
      let ids = []
      annotationList = annotationList.concat(markups)
      for (let item of annotationList) {
        if (item.id) {
          ids.push(item.id)
        } else {
          ids.push('')
        }
      }
      annotationList = annotation.jsonifyAnnotationList(JSON.stringify(annotationList))
      for (let i = 0; i < annotationList.length; i++) {
        annotationList[i].id = ids[i]
      }
      annotation.setAnnotationList(annotationList)
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
        this.moveSetToBoundingBox(
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
  },
  drawingSetAnchors (positionList, openWupanFunc, eleInfoFunc) {
    let thiz = this
    const drawableContainer2d = getSetDrawableContainer.call(thiz)
    const viewer2D = getDrawingViewer.call(thiz)
    const annotation = getSetAnnotation.call(thiz)
    annotation.enablePick(false)
    const wupanRight = false && thiz.$store.getters.getFuncPointsRightList['misjudgment']
    if (drawableContainer2d) {
      drawableContainer2d.clear()
      let items = []
      positionList.map((p, pIndex) => {
        // eslint-disable-next-line no-undef
        let config = new Glodon.Bimface.Plugins.Drawable.CustomItemConfig()
        let wMaxThanh = true
        if (p.maxX - p.minX < p.maxY - p.minY) {
          wMaxThanh = false
        }
        // -------------
        let outerDiv = document.createElement('div')
        let innerDiv = document.createElement('div')
        outerDiv.appendChild(innerDiv)
        outerDiv.className = '__anchor_icon'
        outerDiv.style.width = '30px'
        outerDiv.style.height = '30px'
        outerDiv.style.border = '1px solid #FFFFFF'
        outerDiv.style.background = '#8A8A8A'
        outerDiv.style.borderRadius = '50% 50% 50% 0'
        outerDiv.style.transform = 'rotate(-45deg)'
        // outerDiv.style.position = 'absolute'
        // outerDiv.style.bottom = '0px'
        let indexContent = (p.index === undefined ? pIndex : p.index) + 1
        outerDiv.addEventListener('click', (cEvent) => {
          let id = p.customItemId
          if (!id) {
            return
          }
          sessionStorage.setItem('__current_active_anchor_data', JSON.stringify(p))
          sessionStorage.setItem('__current_active_anchor_labelId', p.customItemId)
          thiz.$store.commit('SET_ACTIVE_ANCHOR_INDEX', pIndex)
          thiz.$store.commit('SET_ACTIVE_ANCHOR_INFO', p.originData)
          // 更新当前z-index 和其他 anchor z-index
          let anchorsList = drawableContainer2d.getAllItems()
          anchorsList.map(a => {
            if (a.id !== p.customItemId) {
              a.dom.parentNode.parentNode.style.zIndex = '6'
            } else {
              cEvent.currentTarget.parentNode.parentNode.style.zIndex = '7'
            }
          })
          let anchorItem = drawableContainer2d.getItemById(id)
          let pNode = anchorItem.dom.parentNode
          let chinBox = pNode.getElementsByClassName('__chin_box')[0]
          let anchorIcon = pNode.getElementsByClassName('__anchor_icon')[0]

          // 计算弹框出现位置
          let marginRight = 0
          if (document.getElementsByClassName('review_screen_content') && document.getElementsByClassName('review_screen_content')[0] && document.getElementsByClassName('review_screen_content')[0].style.display !== 'none') {
            marginRight = 400
          }
          let chinBoxWidth = 260
          let chinBoxHeight = 136
          let positionClzName = ''
          if (cEvent.isTrusted) {
            let needLeft = false
            let needRight = false
            let needTop = false
            let needBottom = false
            let screenX = cEvent.screenX
            let screenY = cEvent.screenY
            let toScreenTop = screenY
            let toScreenBottom = document.body.clientHeight - toScreenTop
            let toScreenLeft = screenX
            let toScreenRight = document.body.clientWidth - toScreenLeft
            if (toScreenTop < ((wMaxThanh ? chinBoxHeight : chinBoxHeight / 2) + 180)) {
              needBottom = true
            }
            if (toScreenBottom < chinBoxHeight) {
              needTop = true
            }
            if (toScreenLeft < (wMaxThanh ? chinBoxWidth / 2 : chinBoxWidth)) {
              needRight = true
            }
            if (toScreenRight < ((wMaxThanh ? chinBoxWidth / 2 : chinBoxWidth) + marginRight)) {
              needLeft = true
            }
            if (needTop && needLeft) {
              positionClzName = '__p_top_left'
            } else if (needTop && needRight) {
              positionClzName = '__p_top_right'
            } else if (needTop) {
              positionClzName = '__p_top'
            } else if (needBottom && needLeft) {
              positionClzName = '__p_bottom_left'
            } else if (needBottom && needRight) {
              positionClzName = '__p_bottom_right'
            } else if (needBottom) {
              positionClzName = '__p_bottom'
            } else if (needRight) {
              positionClzName = '__p_right'
            } else if (needLeft) {
              positionClzName = '__p_left'
            } else {
              positionClzName = wMaxThanh ? '' : '__p_left'
            }
          } else {
            positionClzName = wMaxThanh ? '' : '__p_left'
          }
          if (!chinBox) {
            // let chinBoxList = document.getElementsByClassName('__chin_box')
            // let pNodeList = document.getElementsByClassName('__anchor_icon')
            // for (let item of chinBoxList) {
            //   item.style.display = 'none'
            // }
            // for (let item of pNodeList) {
            //   item.style.background = '#8A8A8A'
            // }

            anchorIcon && (anchorIcon.style.background = '#126BFF')
            chinBox = document.createElement('div')
            chinBox.className = `__chin_box ${positionClzName}`
            chinBox.style.width = `${chinBoxWidth}px`
            chinBox.style.height = `${chinBoxHeight}px`
            chinBox.style.background = '#40424C'
            chinBox.style.padding = '12px'
            chinBox.style.pointerEvents = 'none'
            chinBox.innerHTML = `<div class="__chin_box_close"><i class="gda_sdk_iconfont icon-cancel"></i></div>
            <div class="__chin_box_content">
              <div>${p.originData.name || ''}</div>
              <div>
                ${p.originData.elementId ? `ID:${p.originData.elementId}` : ''}  
                ${p.originData.elementId ? '  <span class="more_ele_info_bar">更多信息<i class="gda_sdk_iconfont icon-xiala more_ele_info" style="display:inline-block; transform:rotate(-90deg);"></i></span>' : ''}
              
              </div>
              <div>${p.originData.message || p.originData.elementResult || '无数据'}</div>
            </div>
            <div class="__chin_box_opts">
             ${wupanRight ? `<i class="gda_sdk_iconfont ${p.originData.misjudgment ? 'icon-youwujihuo' : 'icon-wupan'} wupan"></i>` : ''}
             <div class="qiehuan">
              <i class="gda_sdk_iconfont icon-xiala anchor__pre"></i>
              <span class="anchor_number_count">${indexContent}/${positionList.length}</span>
              <i class="gda_sdk_iconfont icon-xiala anchor__next"></i>
             </div>
            </div>`
            chinBox.getElementsByClassName('icon-cancel')[0].addEventListener('click', (event) => {
              chinBox.style.display = 'none'
              anchorIcon && (anchorIcon.style.background = '#8A8A8A')
              if (event.isTrusted) {
                sessionStorage.removeItem('__current_active_anchor_labelId')
                thiz.$store.commit('SET_ACTIVE_ANCHOR_INDEX', null)
                thiz.$store.commit('SET_ACTIVE_ANCHOR_INFO', null)
              }
            }, false)
            if (wupanRight) {
              chinBox.getElementsByClassName('wupan')[0].addEventListener('click', () => {
                openWupanFunc(p.originData)
              }, false)
            }
            if (eleInfoFunc && p.originData.elementId) {
              chinBox.getElementsByClassName('more_ele_info_bar')[0].addEventListener('click', () => {
                eleInfoFunc(p.originData)
              }, false)
            }
            chinBox.getElementsByClassName('anchor__pre')[0].addEventListener('click', () => {
              let currentAnchorId = sessionStorage.getItem('__current_active_anchor_labelId')
              let currentData = sessionStorage.getItem('__current_active_anchor_data')
              if (currentData && currentData.index === 0) {
                return
              }
              let anchorsList = drawableContainer2d.getAllItems()

              let currentAIndex = anchorsList.findIndex(item => item.id === currentAnchorId)
              // 取上一个锚点（index - 1）
              let preAnchorIndex = currentAIndex - 1

              // 取上一个审查结果关联的多个锚点的第一个
              let currentMyIndex = anchorsList[currentAIndex]._myData.index
              if (currentMyIndex !== undefined) {
                preAnchorIndex = anchorsList.findIndex((item, iIndex) => item._myData.index === currentMyIndex - 1)
              }

              if (preAnchorIndex === -1) {
                preAnchorIndex = anchorsList.findIndex((item, iIndex) => iIndex === currentMyIndex - 1)
              }

              if (preAnchorIndex >= 0) {
                let preAnchor = anchorsList[preAnchorIndex]
                // let currentAnchor = anchorsList[preAnchorIndex + 1]
                let boundingBox = [[preAnchor._myData.minX, preAnchor._myData.minY, 0], [preAnchor._myData.maxX, preAnchor._myData.maxY, 0]]
                viewer2D.zoomToBoundingBox(boundingBox, 1.25)
                drawableContainer2d.update()
                annotation.showAnnotation()
                preAnchor.dom.click()
                // 打开新的anchor
                let anchorIcon = preAnchor.dom.parentNode.getElementsByClassName('__anchor_icon')[0]
                anchorIcon && anchorIcon.dispatchEvent(thiz.$util.getEvent())
                anchorsList.map(item => {
                  if (item.id !== preAnchor.id) {
                    let guanbiBtn = item.dom.parentNode.getElementsByClassName('icon-cancel')[0]
                    if (guanbiBtn) {
                      guanbiBtn.dispatchEvent(thiz.$util.getEvent())
                    }
                  }
                })
                // currentAnchor.dom.parentNode.getElementsByClassName('iconicon_guanbi')[0].dispatchEvent(event)
              } else {
                thiz.$message.warning('当前已是第一个！')
              }
            }, false)
            chinBox.getElementsByClassName('anchor__next')[0].addEventListener('click', () => {
              let currentAnchorId = sessionStorage.getItem('__current_active_anchor_labelId')
              let currentData = sessionStorage.getItem('__current_active_anchor_data')
              let anchorsList = drawableContainer2d.getAllItems()
              if (currentData && currentData.index === (anchorsList.length - 1)) {
                return
              }

              let currentAIndex = anchorsList.findIndex(item => item.id === currentAnchorId)
              // 取下一个锚点（index + 1）
              let nextAnchorIndex = currentAIndex + 1

              // 取上一个审查结果关联的多个锚点的第一个
              let currentMyIndex = anchorsList[currentAIndex]._myData.index
              if (currentMyIndex !== undefined) {
                nextAnchorIndex = anchorsList.findIndex((item, iIndex) => item._myData.index === currentMyIndex + 1)
              }

              if (nextAnchorIndex === -1) {
                nextAnchorIndex = anchorsList.findIndex((item, iIndex) => iIndex === currentMyIndex + 1)
              }

              if (nextAnchorIndex !== -1 && nextAnchorIndex < anchorsList.length) {
                let nextAnchor = anchorsList[nextAnchorIndex]
                // let currentAnchor = anchorsList[nextAnchorIndex - 1]
                let boundingBox = [[nextAnchor._myData.minX, nextAnchor._myData.minY, 0], [nextAnchor._myData.maxX, nextAnchor._myData.maxY, 0]]
                viewer2D.zoomToBoundingBox(boundingBox, 1.25)
                drawableContainer2d.update()
                annotation.showAnnotation()
                nextAnchor.dom.click()
                // 打开新的anchor
                let anchorIcon = nextAnchor.dom.parentNode.getElementsByClassName('__anchor_icon')[0]
                anchorIcon && anchorIcon.dispatchEvent(thiz.$util.getEvent())
                anchorsList.map(item => {
                  if (item.id !== nextAnchor.id) {
                    let guanbiBtn = item.dom.parentNode.getElementsByClassName('icon-cancel')[0]
                    if (guanbiBtn) {
                      guanbiBtn.dispatchEvent(thiz.$util.getEvent())
                    }
                  }
                })
                // currentAnchor.dom.parentNode.getElementsByClassName('iconicon_guanbi')[0].dispatchEvent(event)
              } else {
                thiz.$message.warning('当前已是最后一个！')
              }
            }, false)
            pNode.appendChild(chinBox)
            // let boundingBox = [
            //   [item._myData.minX, item._myData.minY, 0],
            //   [item._myData.maxX, item._myData.maxY, 0]
            // ]
            // viewer2D.zoomToBoundingBox(boundingBox, 1.25)
            // drawableContainer2d.update()
            let anchorsList = drawableContainer2d.getAllItems()
            anchorsList.map(item => {
              if (item.id !== anchorItem.id) {
                let guanbiBtn = item.dom.parentNode.getElementsByClassName('icon-cancel')[0]
                if (guanbiBtn) {
                  guanbiBtn.dispatchEvent(thiz.$util.getEvent())
                }
              }
            })
          } else if (chinBox.style.display === 'none') {
            chinBox.style.display = 'block'
            chinBox.className = `__chin_box ${positionClzName}`
            // if (chinBox.offsetTop < 88) {
            //   chinBox.style.top = '74px'
            // }
            // if (chinBox.offsetLeft < 0) {
            //   chinBox.style.left = '270px'
            // }
            anchorIcon && (anchorIcon.style.background = '#126BFF')
            // let boundingBox = [
            //   [item._myData.minX, item._myData.minY, 0],
            //   [item._myData.maxX, item._myData.maxY, 0]
            // ]
            // viewer2D.zoomToBoundingBox(boundingBox, 1.25)
            // drawableContainer2d.update()
            let anchorsList = drawableContainer2d.getAllItems()
            anchorsList.map(item => {
              if (item.id !== anchorItem.id) {
                let guanbiBtn = item.dom.parentNode.getElementsByClassName('icon-cancel')[0]
                if (guanbiBtn) {
                  guanbiBtn.dispatchEvent(thiz.$util.getEvent())
                }
              }
            })
          }
        })
        innerDiv.innerText = indexContent
        innerDiv.style.width = '26px'
        innerDiv.style.height = '22px'
        innerDiv.style.fontSize = '14px'
        innerDiv.style.paddingTop = '4px'
        innerDiv.style.background = '#FFFFFF'
        innerDiv.style.borderRadius = '50%'
        innerDiv.style.color = '#273853'
        innerDiv.style.fontWeight = 'blod'
        innerDiv.style.transform = 'rotate(45deg)'
        innerDiv.style.textAlign = 'center'
        innerDiv.style.margin = '2px'
        // -------------

        config.content = outerDiv // rectangle
        config.draggable = true
        config.tooltip = '按住鼠标左键，可拖动'
        config.viewer = viewer2D
        // 增加一个Tip提示
        if (wMaxThanh) {
          config.offsetY = -40
        } else {
          config.offsetX = -32
          config.offsetY = -32
        }
        config.worldPosition = {
          x: wMaxThanh ? (p.minX + p.maxX) / 2 : p.minX, y: wMaxThanh ? p.maxY : (p.minY + p.maxY) / 2
        }
        config.opacity = 1
        // 生成customItem实例
        // eslint-disable-next-line no-undef
        let customItem = new Glodon.Bimface.Plugins.Drawable.CustomItem(config)
        customItem.setTooltipStyle({
          left: '38px'
        })
        // p.index = pIndex
        customItem._myData = p
        p.customItemId = customItem.id
        items.push(customItem)
      })
      drawableContainer2d.addItems(items)
    }
  },
  clearSetAnchors () {
    this.$nextTick(() => {
      const drawableContainer2d = getSetDrawableContainer.call(this)
      if (drawableContainer2d) {
        drawableContainer2d.clear()
      }
    })
  },
  updateSetAnchors () {
    const drawableContainer2d = getSetDrawableContainer.call(this)
    if (drawableContainer2d) drawableContainer2d.update()
  },
  hideAllSetAnchors () {
    const drawableContainer2d = getSetDrawableContainer.call(this)
    if (drawableContainer2d) drawableContainer2d.hideAllItems()
  },
  resetSetHomeView () {
    const setViewer = getDrawingViewer.call(this)
    setViewer.home()
    // viewer3D.render()
  },
  anchorSetActiveByIndex (index, aItem) {
    const drawableContainer2d = getSetDrawableContainer.call(this)
    const viewer2D = getDrawingViewer.call(this)
    const annotation = getSetAnnotation.call(this)
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
      if (annotationList[i].id === aItem.id) {
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
        setTimeout(() => {
          annotationList[i].strokeStyle = 'rgba(0,0,0,0)'
        }, 1800)
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
  },
  // 显示批注
  showSetAnnotList (annotList) {
    const annotation = getSetAnnotation.call(this)
    if (annotation) {
      annotation.setAnnotationList(annotList)
      annotation.showAnnotation()
    }
  },
  // 隐藏批注
  hideSetAnnotation () {
    const annotation = getSetAnnotation.call(this)
    if (annotation) {
      annotation.hideAnnotation()
    }
  }
}
export default bimSetContent

import axios from 'axios'
let isDrawAnnotationActivated = false
let onAnnotationSavedCallback

const getDrawingListByEleIdBabelFunc = function (eleId, databagId) {
  let ret = []
  let fileId = null
  let tempEId = eleId
  if ((eleId + '').includes('.')) {
    fileId = eleId.split('.')[0]
    tempEId = eleId.split('.')[1]
  }
  if (window.__bimface_objectMaps && window.__bimface_objectMaps.databagId === databagId) {
    ret = window.__bimface_objectMaps.list.filter(item => {
      if (fileId) {
        if (item.info.fileId === fileId) {
          for (let k in (item.detail || {})) {
            if (item.detail[k].includes(tempEId)) {
              return true
            }
          }
        }
      } else {
        for (let k in (item.detail || {})) {
          if (item.detail[k].includes(tempEId)) {
            return true
          }
        }
      }
      return false
    }).map(item => {
      return item.info
    })
  }
  return ret
}

class bim3dContext {
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
  
  getDrawableContainer () {
    return this.bimface.drawableContainer || undefined
  }
  
  getAnnotation () {
    return this.bimface.annotation || undefined
  }
  
  getAnnotationToolBar () {
    return this.bimface.annotationToolBar || undefined
  }
  getAllDrawingsheets(callBack) {
    let viewer = this.getViewer()
    viewer.getAllDrawingsheets((v) => {
      callBack && callBack(v)

      initDrawingObjectToModelEleMaps(v)
    })

    // 获取所有视图的视图图元和模型构件映射数据
    async function initDrawingObjectToModelEleMaps (d) {
      window.__bimface_objectMaps = {
        databagId: viewer.authenticate.data.databagId,
        list: []
      }
      if (d && d.drawingList && Array.isArray(d.drawingList)) {
        d.drawingList.map(drawing => {
          let sourceUrl = `${window.hostConfig.resourceHost}/${viewer.authenticate.data.databagId}/resource/drawing/${drawing.viewInfo.id}`
          if (drawing.fileId) {
            sourceUrl = `${window.hostConfig.resourceHost}/${viewer.authenticate.data.databagId}/resource/drawing/${drawing.fileId}/${drawing.viewInfo.id}`
          }
          axios.get(`${sourceUrl}/revitIds.json.gz`).then(res => {
            if (res.data && !(Object.keys(res.data).length === 1 && res.data['0'])) {
              window.__bimface_objectMaps.list.push({
                key: drawing.viewInfo.id,
                info: drawing,
                detail: res.data
              })
            }
          })
          axios.get(`${sourceUrl}/gbmpIds.json.gz`).then(res => {
            if (res.data && !(Object.keys(res.data).length === 1 && res.data['0'])) {
              window.__bimface_objectMaps.list.push({
                key: drawing.viewInfo.id,
                info: drawing,
                detail: res.data
              })
            }
          })
        })
      }
    }
  }
  getAreas(callBack) {
    if (typeof callBack !== 'function') {
      return
    }
    let viewer = this.getViewer()
    viewer.getAreas(callBack)
  }
  getComponentProperty(componentId, callBack) {
    if (typeof callBack !== 'function') {
      // eslint-disable-next-line no-console
      console.log('getComponentProperty params needs a function!')
      return
    }
    const viewer = this.getViewer()
    if (!viewer) {
      callBack(null)
    }
    viewer.getComponentProperty(componentId, data => {
      callBack(data)
    }, err => {
      callBack(null)
    })
  }
  getRoomProperty(roomId, callBack) {
    const viewer = this.getViewer()
    // 合模模型兼容
    if ((roomId + '').includes('.')) {
      roomId = (roomId + '').replaceAll('.', '_')
    }
    
    viewer.getRoomProperty(roomId, data => {
      callBack(data)
    }, err => {
      callBack(null)
    })
  }
  getDrawingPosition(sheetId, point) {
    const viewer = this.getViewer()
    return new Promise((resolve, reject) => {
      viewer.getModel().getDrawingPosition(sheetId, point, data => {
        resolve(data)
      }, err => {
        return null
      })
    })
  }
  getComponentStatus(id) {
    const viewer = this.getViewer()
    return viewer.getModel().getComponentStatus(id)
  }
  getObjectDataById(objectId) {
    let res = null
    const viewer = this.getViewer()
    if (viewer) {
      res = viewer.getObjectDataById(objectId)
    }
    return res
  }
  getDrawingsheets(id) {
    return new Promise((resolve, reject) => {
      const viewer = this.getViewer()
      if (viewer) {
        viewer.getDrawingsheets(id, data => {
          resolve(data)
        })
      }
    })
  }
  getModel(modelId) {
    let res = null
    const viewer = this.getViewer()
    if (viewer) {
      res = viewer.getModel(modelId)
    }
    return res
  }
  // 隐藏底部工具栏
  hideMainToolbar() {
    const bimDom = document.getElementById(`${this.getDomId()}`)
    if (bimDom) {
      const ele = bimDom.getElementsByClassName('bf-toolbar-bottom')
      if (ele.length) {
        ele[0].style.display = 'none'
      }
    }
  }
  // 显示底部工具栏
  showMainToolbar() {
    const bimDom = document.getElementById(`${this.getDomId()}`)
    if (bimDom) {
      const ele = bimDom.getElementsByClassName('bf-toolbar-bottom')
      if (ele.length) {
        ele[0].style.display = 'block'
      }
    }
  }
  // 隐藏左上角目录树
  hideTreeToolbar() {
    const bimDom = document.getElementById(`${this.getDomId()}`)
    if (bimDom) {
      const ele = bimDom.getElementsByClassName('bf-tree-toolbar')
      if (ele.length) {
        ele[0].style.display = 'none'
      }
    }
  }
  // 显示左上角目录树
  showTreeToolbar() {
    const bimDom = document.getElementById(`${this.getDomId()}`)
    if (bimDom) {
      const ele = bimDom.getElementsByClassName('bf-tree-toolbar')
      if (ele.length) {
        ele[0].style.display = 'block'
      }
    }
  }
  hideViewHouse() {
    const viewer = this.getViewer()
    viewer && viewer.hideViewHouse()
  }
  showViewHouse() {
    const viewer = this.getViewer()
    viewer && viewer.showViewHouse()
  }
  getTreeToolbarDom() {
    let treeToolbarDom = null
    const bimDom = document.getElementById(`${this.getDomId()}`)
    if (bimDom) {
      treeToolbarDom = bimDom.getElementsByClassName('bf-tree-toolbar')[0]
    }
    return treeToolbarDom
  }
  getTreePanelDom() {
    let treePanelDom = null
    const bimDom = document.getElementById(`${this.getDomId()}`)
    if (bimDom) {
      treePanelDom = bimDom.getElementsByClassName('bf-modelTree-panel')[0]
    }
    return treePanelDom
  }
  // ************************** 批注 **************************
  // 创建批注工具条
  createAnnotationToolbar() {
    const viewer = this.getViewer()
    const annotationToolbar3d = this.getAnnotationToolBar()
    const annotation3d = this.getAnnotation()
    if (annotationToolbar3d && annotation3d) {
      // 创建批注工具条的配置
      // let config = new Glodon.Bimface.Plugins.Annotation.AnnotationToolbarConfig()
      // config.viewer = viewer
      // 创建批注工具条
      // annotationToolbar = new Glodon.Bimface.Plugins.Annotation.AnnotationToolbar(config)
      annotation3d.setFillColor(new Glodon.Web.Graphics.Color(255, 0, 0, 0.3))

      // 注册批注工具条的监听事件
      annotationToolbar3d.addEventListener(Glodon.Bimface.Plugins.Annotation.AnnotationToolbarEvent.Saved, this.onAnnotationSaved)
      annotationToolbar3d.addEventListener(Glodon.Bimface.Plugins.Annotation.AnnotationToolbarEvent.Cancelled, this.exitAnnotation)
    }
  }
  // 开始绘制批注
  showAnnotationToolbar(callbackFunc) {
    const app = this.getApp()
    const annotationToolbar3d = this.getAnnotationToolBar()
    // 创建批注工具条
    this.createAnnotationToolbar()
    if (!isDrawAnnotationActivated) {
      // 隐藏主工具条
      app.getToolbar('MainToolbar').hide()
      // 显示批注工具条
      annotationToolbar3d.show()
      // 修改批注的激活状态为true
      isDrawAnnotationActivated = true
    }
    onAnnotationSavedCallback = callbackFunc
  }
  // 保存批注并退出
  onAnnotationSaved() {
    const annotation3d = this.getAnnotation()
    const annotationState = annotation3d.getCurrentState()
    // 批注导出快照
    annotation3d.createSnapshot((img) => {
      onAnnotationSavedCallback({ annotationState, img })
    })
    this.exitAnnotation()
  }
  createSnapshot3d(callbackFunc) {
    const annotation3d = this.getAnnotation()
    if (annotation3d) {
      const annotationState = annotation3d.getCurrentState()
      // 批注导出快照
      annotation3d.createSnapshot((img) => {
        callbackFunc({ annotationState, img })
      })
    }
  }
  // 退出批注
  exitAnnotation() {
    if (isDrawAnnotationActivated) {
      const app = this.getApp()
      const annotationToolbar3d = this.getAnnotationToolBar()
      const annotation3d = this.getAnnotation()
      // 显示主工具条
      app.getToolbar('MainToolbar').show()
      annotation3d.exit()
      this.hideAnnotationToolbar()
      // 批注的激活状态为false
      isDrawAnnotationActivated = false
      if (annotationToolbar3d) {
        annotationToolbar3d.removeEventListener(Glodon.Bimface.Plugins.Annotation.AnnotationToolbarEvent.Saved, this.onAnnotationSaved)
        annotationToolbar3d.removeEventListener(Glodon.Bimface.Plugins.Annotation.AnnotationToolbarEvent.Cancelled, this.exitAnnotation)
      }
    }
  }
  // 恢复批注
  restoreAnnotation(annotationState) {
    if (annotationState !== null) {
      // 恢复批注
      const annotation3d = this.getAnnotation()
      annotation3d.setState(annotationState)
      annotation3d.showAnnotation()
    }
  }
  // 隐藏批注工具栏
  hideAnnotationToolbar() {
    const bimDom = document.getElementById(`${this.getDomId()}`)
    this.$nextTick(() => {
      bimDom.getElementsByClassName('bf-annotation')[0].classList.add('bf-hide')
    })
  }
  // 绘制标签
  async drawingAnchors3d(positionList, openWupanFunc, eleInfoFunc) {
    let thiz = this
    const drawableContainer3d = getDrawableContainer.call(thiz)
    const viewer = getViewer.call(thiz)
    // const annotation3d = getAnnotation.call(thiz)
    if (drawableContainer3d) {
      drawableContainer3d.clear()
      let items = []
      const getRoomEleProperty = function (p) {
        return new Promise((resolve, reject) => {
          viewer.getRoomProperty(p.elementId, data => {
            resolve(data)
          })
        })
      }
      await new Promise((resolve, reject) => {
        if (!positionList.length) resolve()
        positionList.map(async (p, pIndex) => {
          // eslint-disable-next-line no-undef
          let config = new Glodon.Bimface.Plugins.Drawable.CustomItemConfig()
          let wMaxThanh = true
          if (p.elementId && (!p.x && !p.y && !p.z)) {
            // 仅有构件id,无坐标，通过构建id获取坐标信息
            let eleObj = viewer.getObjectDataById(p.elementId)
            if (eleObj) {
              let boundingBox = viewer.getBoundingBoxById(p.elementId)
              if (boundingBox) {
                p.x = (boundingBox.min.x + boundingBox.max.x) / 2
                p.y = (boundingBox.min.y + boundingBox.max.y) / 2
                p.z = (boundingBox.min.z + boundingBox.max.z) / 2
              }
            } else if (p.elementId) {
              let roomdata = await getRoomEleProperty(p)
              if (roomdata) {
                p.isRoomEle = true
                p.roomData = roomdata
                p.x = (roomdata.bboxMin.x + roomdata.bboxMax.x) / 2
                p.y = (roomdata.bboxMin.y + roomdata.bboxMax.y) / 2
                p.z = (roomdata.bboxMin.z + roomdata.bboxMax.z) / 2

                // 绘制房间
                const boundary = roomdata.boundary
                viewer.createRoom(boundary, roomdata.bboxMax.z - roomdata.bboxMin.z, roomdata.id)
              } else {
                // 若找不到对应构件坐标，默认坐标为 模型坐标边界的最小值
                const boundaryPoints = viewer.getModelBoundaryPoints(
                  viewer.getModel().modelId
                )
                const pointXList = boundaryPoints.map((point) => point.x)
                const pointYList = boundaryPoints.map((point) => point.y)
                const pointZList = boundaryPoints.map((point) => point.z)
                const minX = Math.min(...pointXList)
                const minY = Math.min(...pointYList)
                const minZ = Math.min(...pointZList)
                p = {
                  ...p,
                  x: minX || 0,
                  y: minY || 0,
                  z: minZ || 0
                }
              }
            }
          } else if (p.position3d) {
            p.customRoom = true
            p.x = (p.position3d.pos1.x + p.position3d.pos2.x) / 2
            p.y = (p.position3d.pos1.y + p.position3d.pos2.y) / 2
            p.z = (p.position3d.pos1.z + p.position3d.pos2.z) / 2 + 750
            p.minX = Math.min(p.position3d.pos1.x, p.position3d.pos2.x)
            p.minY = Math.min(p.position3d.pos1.y, p.position3d.pos2.y)
            p.minZ = Math.min(p.position3d.pos1.z, p.position3d.pos2.x)
            p.maxX = Math.max(p.position3d.pos1.x, p.position3d.pos2.x)
            p.maxY = Math.max(p.position3d.pos1.y, p.position3d.pos2.y)
            p.maxZ = Math.max(p.position3d.pos1.z, p.position3d.pos2.z)
            let outRing = [[p.minX, p.maxY, p.maxZ],
            [p.maxX, p.maxY, p.maxZ],
            [p.maxX, p.minY, p.minZ],
            [p.minX, p.minY, p.minZ]

            ]
            let Boundary = viewer.createBoundary(outRing)
            // 由于相符性审查缺失构件无法获取高度，故写死一个高度，标签位置需加上此高度的一半保证垂直居中
            viewer.createRoom(Boundary, 1500, p.customItemId)
          }
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
            let anchorsList = drawableContainer3d.getAllItems()
            anchorsList.map(a => {
              if (a.id !== p.customItemId) {
                a.dom.parentNode.parentNode.style.zIndex = '6'
              } else {
                cEvent.currentTarget.parentNode.parentNode.style.zIndex = '7'
              }
            })
            let anchorItem = drawableContainer3d.getItemById(id)
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
              anchorIcon && (anchorIcon.style.background = '#126BFF')
              chinBox = document.createElement('div')
              chinBox.className = `__chin_box ${positionClzName}`
              chinBox.style.width = `${chinBoxWidth}px`
              chinBox.style.height = `${chinBoxHeight}px`
              chinBox.style.background = '#40424C'
              chinBox.style.padding = '12px'
              // chinBox.style.pointerEvents = 'none'
              chinBox.innerHTML = `<div class="__chin_box_close"><i class="gda_sdk_iconfont icon-cancel"></i></div>
              <div class="__chin_box_content">
                <div>${p.originData.name || ''}</div>
                <div>
                  ID: ${p.originData.elementId || ''}  <span class="more_ele_info_bar">更多信息<i class="gda_sdk_iconfont icon-xiala more_ele_info"></i></span>
                </div>
                <div>检查结果</div>
                <div>${p.originData.message || p.originData.elementResult || '无数据'}</div>
              </div>
              <div class="__chin_box_opts">
               ${openWupanFunc ? `<i class="gda_sdk_iconfont ${p.originData.misjudgment ? 'icon-youwujihuo' : 'icon-wupan'} wupan"></i>` : ''}
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
                }
                bim3dContent.clearBlinkEles.call(thiz)
                const eles = positionList.map(p => {
                  return p.originData.elementId
                })
                viewer.getModel().clearSelectedComponents()
                viewer.getModel().setSelectedComponentsById(eles)
              }, false)
              if (openWupanFunc) {
                chinBox.getElementsByClassName('wupan')[0].addEventListener('click', () => {
                  openWupanFunc(p.originData)
                }, false)
              }
              if (eleInfoFunc) {
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
                let anchorsList = drawableContainer3d.getAllItems()

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
                  viewer.zoomToBoundingBox(boundingBox, 1.25)
                  drawableContainer3d.update()
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
                let anchorsList = drawableContainer3d.getAllItems()
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
                  viewer.zoomToBoundingBox(boundingBox, 1.25)
                  drawableContainer3d.update()
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
              let anchorsList = drawableContainer3d.getAllItems()
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
              anchorIcon && (anchorIcon.style.background = '#126BFF')
              let anchorsList = drawableContainer3d.getAllItems()
              anchorsList.map(item => {
                if (item.id !== anchorItem.id) {
                  let guanbiBtn = item.dom.parentNode.getElementsByClassName('icon-cancel')[0]
                  if (guanbiBtn) {
                    guanbiBtn.dispatchEvent(thiz.$util.getEvent())
                  }
                }
              })
            }
            if (p.isRoomEle && p.roomData) {
              viewer.zoomToBoundingBox({
                min: p.roomData.bboxMin,
                max: p.roomData.bboxMax
              })
            } else if (p.customRoom) {
              let boundingBox = {
                min: {
                  x: p.minX,
                  y: p.minY,
                  z: p.minZ
                },
                max: {
                  x: p.maxX,
                  y: p.maxY,
                  z: p.minZ
                }
              }
              // let boundingBox = [
              //   [p.minX, p.minY, 0],
              //   [p.maxX, p.maxY, 0]
              // ]
              viewer.zoomToBoundingBox(boundingBox, 1.25)
            } else {
              bim3dContent.selectToEles.call(thiz, [p.originData.elementId])
            }
            bim3dContent.clearBlinkEles.call(thiz)
            bim3dContent.drawingBlinkEles.call(thiz, [p.originData.elementId])
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
          // 自定义样式，支持Html的任意dom元素

          config.content = outerDiv // rectangle
          // 设置不可以拖拽
          config.draggable = true
          // config.tooltip = '可拖动'
          config.tooltipStyle = {
            left: '12px'
          }
          config.viewer = viewer
          // 增加一个Tip提示
          if (wMaxThanh) {
            // config.offsetY = -40
          } else {
            // config.offsetX = -32
            // config.offsetY = -32
          }
          config.worldPosition = {
            // x: wMaxThanh ? (p.minX + p.maxX) / 2 : p.minX,
            // y: wMaxThanh ? p.maxY : (p.minY + p.maxY) / 2,
            x: p.x,
            y: p.y,
            z: p.z
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
          customItem.modelId = 'myModel'
          items.push(customItem)
          if (positionList.length === pIndex + 1) {
            resolve()
          }
        })
      })
      drawableContainer3d.addItems(items)
      setTimeout(() => {
        const eles = positionList.map(p => p.originData.elementId)
        /**
         * https://pm.glodon.com/newjira/browse/GTS-24825
         * 如果时只有elementID没有位置信息的识别构件，无法在selectToEles时高亮
         * 所以在selectToEles之前先把这些构件show出来，在clearAnchor时再根据八爪鱼关闭
         */
        bim3dContent.showComponentsById.call(thiz, eles)
        bim3dContent.selectToEles.call(thiz, eles)
      })
    }
  }

  selectToEles(eles) {
    const viewer = this.getViewer()
    if (viewer) {
      viewer.getModel().clearSelectedComponents()
      viewer.getModel().setSelectedComponentsById(eles)
      viewer.getModel().zoomToSelectedComponents()
      viewer.getModel().render();
    }
  }

  drawingBlinkEles(eles) {
    if (!Array.isArray(eles)) {
      return
    }
    const viewer = this.getViewer()
    if (viewer) {
      viewer.addBlinkComponentsById(eles)
      viewer.setBlinkColor(new Glodon.Web.Graphics.Color('#FF60AF', 0.8))
      viewer.enableBlinkComponents(true)
      viewer.setBlinkIntervalTime(500)
      viewer.render()
    }
  }
  clearBlinkEles() {
    // 取消闪烁
    const viewer = this.getViewer()
    if (viewer) {
      viewer.clearAllBlinkComponents && viewer.clearAllBlinkComponents()
      viewer.render()
    }
  }
  showAllComponents() {
    const viewer = this.getViewer()
    if (viewer) {
      viewer.showAllComponents()
      viewer.render()
    }
  }
  hideComponentsById(ids) {
    const viewer = this.getViewer()
    if (viewer) {
      viewer.hideComponentsById(ids)
      viewer.render()
    }
  }
  hideAllComponents() {
    const viewer = this.getViewer()
    if (viewer) {
      viewer.hideAllComponents()
      viewer.render()
    }
  }
  showComponentsById(ids) {
    const viewer = this.getViewer()
    if (viewer) {
      viewer.showComponentsById(ids)
      viewer.render()
    }
  }
  getAllAnchors3d() {
    const drawableContainer3d = this.getDrawableContainer()
    return drawableContainer3d.getAllItems()
  }

  hideAnchorsByIds3d(ids) {
    const drawableContainer3d = this.getDrawableContainer()
    drawableContainer3d.hideItemsById(ids)
  }
  clearAnchors3d() {
    const drawableContainer3d = this.getDrawableContainer()
    if (drawableContainer3d) drawableContainer3d.clear()
  }

  clearAllRooms() {
    const viewer = this.getViewer()
    if (viewer) {
      let roomM = viewer.getRoomManager()
      roomM && roomM.clearAllRooms()
    }
  }
  updateAnchors3d() {
    const drawableContainer3d = this.getDrawableContainer()
    if (drawableContainer3d) drawableContainer3d.update()
  }

  hideAllAnchors3d() {
    const drawableContainer3d = this.getDrawableContainer()
    if (drawableContainer3d) drawableContainer3d.hideAllItems()
  }

  showAllAnchors3d() {
    const drawableContainer3d = this.getDrawableContainer()
    if (drawableContainer3d) drawableContainer3d.showAllItems()
  }
  resetHomeView() {
    const viewer = this.getViewer()
    viewer.setView(Glodon.Bimface.Viewer.ViewOption.Home)
    // viewer.render()
  }
  anchorActiveByIndex3d(index, aItem) {
    const drawableContainer3d = this.getDrawableContainer()
    const viewer = this.getViewer()
    // const annotation = this.getAnnotation()
    let event
    if (window.MouseEvent) event = new MouseEvent('click')
    else {
      event = document.createEvent('MouseEvents')
      event.initMouseEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null)
    }
    let anchorsList = drawableContainer3d.getAllItems()
    /**
     * https://pm.glodon.com/newjira/browse/GTS-25826
     * 去除了范围限制，但增加了anchor时的log,避免因为多个审查点中的部分审查点错误导致所有审查点不可追踪
     */
    if (anchorsList && anchorsList.length) {
      try {
        let anchor = anchorsList[index]
        if (aItem) {
          anchor = anchorsList.find(a => {
            if (a._myData && a._myData.originData) {
              return a._myData.originData.id === aItem.id
            }
            return false
          })
        }
        if (!anchor) {
          console.error(`[anchorActiveByIndex3d]为找到对应的anchor`, anchorsList, index, aItem)
          return 0
        }
        let boundingBox = [
          [anchor._myData.minX, anchor._myData.minY, 0],
          [anchor._myData.maxX, anchor._myData.maxY, 0]
        ]
        viewer.zoomToBoundingBox(boundingBox, 1.25)
        drawableContainer3d.update()
        // annotation.showAnnotation()
        anchor.dom.click()
        // 打开新的anchor内容签
        let anchorIcon = anchor.dom.parentNode.getElementsByClassName('__anchor_icon')[0]
        anchorIcon && anchorIcon.dispatchEvent(this.$util.getEvent())
        anchorsList.map(item => {
          if (item.id !== anchor.id) {
            let guanbiBtn = item.dom.parentNode.getElementsByClassName('icon-icon_guanbi')[0]
            if (guanbiBtn) {
              guanbiBtn.dispatchEvent(this.$util.getEvent())
            }
          }
        })
        return 1
      } catch (err) {
        console.error(err)
        return 0
      }
    } else {
      return 0
    }
  }
  // ************************** 批注 **************************
  addEventListener(event, callback) {
    let viewer = this.getViewer()
    viewer && viewer.addEventListener(event, callback)
  }
  removeEventListener(event) {
    let viewer = this.getViewer()
    viewer && viewer.removeEventListener(event)
  }
  clearSelectedComponents() {
    let viewer = this.getViewer()
    // 在这里将之前临时显示的组件隐藏掉
    viewer && viewer.clearSelectedComponents()
    viewer && viewer.render()
  }
  setSelectedComponentsById(modelElementIdList) {
    let viewer = this.getViewer()
    viewer && viewer.setSelectedComponentsById(modelElementIdList)
  }
  getSelectedComponents() {
    let viewer = this.getViewer()
    if (viewer) {
      return viewer.getSelectedComponents()
    }
    return []
  }
  getCamera() {
    let viewer = this.getViewer()
    if (viewer) {
      return viewer.getCamera()
    }
  }
  zoomToSelectedComponents() {
    let viewer = this.getViewer()
    viewer && viewer.zoomToSelectedComponents()
  }
  zoomToBoundingBox(boundingBox, scale = 1) {
    let viewer = this.getViewer()
    viewer && viewer.zoomToBoundingBox(boundingBox, scale)
  }
  getDrawingListbyId (objectId, callback) {
    const viewer = this.getViewer()
    let fileId = viewer.authenticate.data.modelId
    if (fileId) { // 有fileId，采用bimface提供的筛选方法获取视图列表
      viewer && viewer.getDrawingListbyId(fileId, objectId, (d) => {
        if (Array.isArray(d) && d.length) {
          callback(d)
        } else { // 补偿机制，若根据构件id获取不到该构件所在的视图列表，则自动匹配获取
          d = getDrawingListByEleIdBabelFunc(objectId, viewer.authenticate.data.databagId)
          callback(d)
        }
      })
    } else { // 自动匹配获取
      d = getDrawingListByEleIdBabelFunc(objectId, viewer.authenticate.data.databagId)
      callback(d)
    }
  }
  getModelBoundaryPoints(modelId) {
    let res = null
    const viewer = this.getViewer()
    if (viewer) {
      res = viewer.getModelBoundaryPoints(modelId)
    }
    return res
  }

  activateComponentsByObjectData(objData) {
    const viewer = this.getViewer()
    if (viewer) {
      viewer.activateComponentsByObjectData(objData)
    }
  }

  setComponentsOpacity (ids, state) { // Opaque取消半透明 Translucent半透明
    const viewer = this.getViewer()
    if (viewer) {
      viewer.setComponentsOpacity(ids, state)
    }
  }

  getModelTree (callBack) {
    if (typeof callBack !== 'function') {
      // eslint-disable-next-line no-console
      console.log('getModelTree params needs a function!')
      return
    }
    const viewer = this.getViewer()
    if (viewer) {
      viewer.getModelTree(callBack)
    }
  }
}
export default bim3dContext

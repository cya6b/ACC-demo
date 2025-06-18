const util = {
  formatMarkup (mk) {
    let ret = {
      markupType: mk.markupType,
      fillStyle: mk.fillStyle,
      lineWidth: mk.lineWidth || 3,
      rotation: 0,
      strokeStyle: mk.strokeStyle,
      drawPoints: mk.drawPoints || [[mk.minX, mk.minY], [mk.maxX, mk.maxY]],
      fontFamily: mk.fontFamily || 'Arial',
      fontSize: mk.fontSize || 16
    }
    if (mk.markupType === "my_CloudRect") {
      ret.markupType = "Cloud"
      let w = mk.maxX - mk.minX
      let h = mk.maxY - mk.minY
      let pointX = mk.minX + w / 2
      let pointY = mk.minY + h / 2
      // 生成云线中间点
      let halfCloudNum = 20
      let splitLength = Math.round((w + h) / halfCloudNum) || 1
      let wCloudNum = Math.ceil(w / splitLength)
      let hCloudNum = Math.ceil(h / splitLength)
      let topPs = []
      let rightPs = []
      let bottomPs = []
      let leftPs = []
      let i = 1
      while (splitLength * i < Math.round(w + h) && i < 100) {
        if (i < wCloudNum) {
          topPs.push([pointX - w / 2 + splitLength * i, pointY + h / 2])
          bottomPs.push([pointX - w / 2 + splitLength * (wCloudNum - i), pointY - h / 2])
        }
        if (i < hCloudNum) {
          rightPs.push([pointX + w / 2, pointY + h / 2 - splitLength * i])
          leftPs.push([pointX - w / 2, pointY + h / 2 - splitLength * (hCloudNum - i)])
        }
        i++
      }
      ret.drawPoints = [
        [pointX - w / 2, pointY + h / 2], // 左上
        ...topPs,
        [pointX + w / 2, pointY + h / 2], // 右上
        ...rightPs,
        [pointX + w / 2, pointY - h / 2], // 右下
        ...bottomPs,
        [pointX - w / 2, pointY - h / 2], // 左下
        ...leftPs,
        [pointX - w / 2, pointY + h / 2] // 左上闭合
      ]
    }
    if (ret.markupType === "text") {
      ret.drawPoints = [[(item.minX + item.maxX) / 2, (item.minY + item.maxY) / 2]]
      ret.pureText = mk.text || ''
      ret.userText = mk.text || ''
      ret.center = null
      ret.bNeedHitByBbox = false
      ret.drawEnd = true
    }
    return ret
  },


  getModelPositionBoundingBoxByDrawingBoundingBox (drawingBox, num = 0) {
    const _this = this
    return new Promise(async resolve => {
      let ret = {
        minX: 0,
        minY: 0,
        minZ: 0,
        maxX: 1,
        maxY: 1,
        maxZ: 1,
      }
      async function getSheetViewer (num = 0) {
        let sheetViewer = _this.modelView?.$parent?.firstDrawing?.sheetViewer
        if (sheetViewer) {
          let box = drawingBox
          let compView = _this.modelView?.$parent
          if (compView._drawingBoundingToViewBounding) {
            let tempBounding = compView._drawingBoundingToViewBounding({
              min: {
                x: drawingBox.minX,
                y: drawingBox.minY
              },
              max: {
                x: drawingBox.maxX,
                y: drawingBox.maxY,
              }
            })
            if (tempBounding && typeof tempBounding?.min?.x === 'number') {
              box = {
                minX: tempBounding.min.x,
                minY: tempBounding.min.y,
                maxX: tempBounding.max.x,
                maxY: tempBounding.max.y
              }
            }
          }
          let a = await sheetViewer.optContext.getModelPosition(sheetViewer.bimface.source.sheetId, {
            x: box.minX,
            y: box.minY
          })
          let b = await sheetViewer.optContext.getModelPosition(sheetViewer.bimface.source.sheetId, {
            x: box.maxX,
            y: box.maxY
          })
    
          ret = {
            minX: a.x,
            minY: a.y,
            minZ: a.z,
            maxX: b.x,
            maxY: b.y,
            maxZ: b.z,
          }
          resolve(ret)
        } else if (!sheetViewer && num < 10) {
          setTimeout (() => {
            getSheetViewer(num++)
          }, 1000)
        } else {
          resolve(ret)
        }
      }
      getSheetViewer()
    })
  },

  elementIdToIntegrateModelEleId (ann, id) {
    let elementId = id
    if (!(elementId + '').includes('.') && ann.bimFileId && this.modelViewer?.authenticate?.data?.modelType === 'integrateModel') {
      elementId = `${ann.bimFileId}.${elementId}`
    } else if (!(elementId + '').includes('.') && this.singleModelFileId) {
      elementId = `${this.singleModelFileId}.${elementId}`
    }
    return elementId
  },

  elementIdAddSingleModelEleId (ann, id) {
    let elementId = id
    if (!(elementId + '').includes('.') && ann.bimFileId) {
      elementId = `${ann.bimFileId}.${elementId}`
    }
    return elementId
  },


  async formatAnnor (ann, annIndex, annsL) {
    let use3d = false
    if (this.modelViewer.getBoundingBoxById) { // 当前模型为3d
      if (ann.elementId) { // 有构件信息
        // 根据构件id获取包围盒信息
        let elementId = util.elementIdToIntegrateModelEleId.call(this, ann, ann.elementId)
        let tBound = this.modelViewer.getBoundingBoxById(elementId)
        if (!tBound) { // 根据构件id未获取到包围盒信息
          // 根据构件id获取房间信息
          let roomdata = await util.getRoomEleProperty(elementId, this.modelViewerOpt)
          if (roomdata) { // 为房间
            tBound = {
              min: roomdata.bboxMin,
              max: roomdata.bboxMax
            }
          }
        }
        if (tBound && !isNaN(tBound.min.x)) {
          ann.box = {
            minX: tBound.min.x,
            minY: tBound.min.y,
            minZ: tBound.min.z,
            maxX: tBound.max.x,
            maxY: tBound.max.y,
            maxZ: tBound.max.z,
          }
        } else if (ann.drawingEleBox) {
          use3d = true
          let minX = Math.min(ann.drawingEleBox[0].x, ann.drawingEleBox[1].x)
          let maxX = Math.max(ann.drawingEleBox[0].x, ann.drawingEleBox[1].x)
          let minY = Math.min(ann.drawingEleBox[0].y, ann.drawingEleBox[1].y)
          let maxY = Math.max(ann.drawingEleBox[0].y, ann.drawingEleBox[1].y)
          ann.box3d = await util.getModelPositionBoundingBoxByDrawingBoundingBox.call(this, {
            minX,
            minY,
            maxX,
            maxY
          })
          if (!ann.box) {
            ann.box = ann.box3d
          }
        }
      } else if (ann.drawingEleBox) { // 补偿 模型中没有构件，使用图纸box换算模型box
        use3d = true
        let minX = Math.min(ann.drawingEleBox[0].x, ann.drawingEleBox[1].x)
        let maxX = Math.max(ann.drawingEleBox[0].x, ann.drawingEleBox[1].x)
        let minY = Math.min(ann.drawingEleBox[0].y, ann.drawingEleBox[1].y)
        let maxY = Math.max(ann.drawingEleBox[0].y, ann.drawingEleBox[1].y)
        ann.box3d = await util.getModelPositionBoundingBoxByDrawingBoundingBox.call(this, {
          minX,
          minY,
          maxX,
          maxY
        })
        if (!ann.box) {
          ann.box = ann.box3d
        }
      }
    }
    if (!ann.box) {
      ann.box = {
        minX: 0,
        minY: 0,
        minZ: 0,
        maxX: 1,
        maxY: 1,
        maxZ: 1,
      }
    }
    let box = use3d ? ann.box3d : ann.box
    let config = new Glodon.Bimface.Plugins.Drawable.CustomItemConfig()
    config.enableDepthTest = false
    config.draggable = true
    // config.tooltip = '按住鼠标左键，可拖动'
    config.viewer = this.modelViewer
    let annorDom = util.crateAnnorDom.call(this, ann, annIndex, annsL, this.moreInfoClickEventListener)
    config.content = annorDom // rectangle
    const wGTRh = Number(box.maxX) - Number(box.minX) > Number(box.maxY) - Number(box.minY)
    // 增加一个Tip提示
    if (wGTRh) {
      config.offsetY = -40
    } else {
      config.offsetX = -32
      config.offsetY = -32
    }
    config.worldPosition = wGTRh ? {
      x: (Number(box.minX) + Number(box.maxX)) / 2,
      y: Number(box.maxY),
      z: Number(box.maxZ)
    } : {
      x: Number(box.minX),
      y: (Number(box.minY) + Number(box.maxY)) / 2,
      z: Number(box.maxZ)
    }
    config.opacity = 1
    let customItem = new Glodon.Bimface.Plugins.Drawable.CustomItem(config)
    customItem.setTooltipStyle({
      left: '38px'
    })
    customItem.annOriginData = ann
    customItem.modelId = this.modelViewer.authenticate.data.modelId
    return customItem
  },
  crateAnnorDom (ann, annIndex, annsL, moreInfoClickEventListener) {
    const _this = this
    const contentDivWidth = 260
    const contentDivHeight = 136

    // icon_outer
    let outerDiv = createOutDiv.call(this)
    // icon_inner
    let innerDiv = createInDiv.call(this)
    // content)box
    let contentDiv = createContentDiv.call(this, annIndex, annsL)
  
    outerDiv.appendChild(innerDiv)

    // root
    let rootDiv = document.createElement('div')
    rootDiv.className = '__anchor'
    rootDiv.setAttribute("annIndex", annIndex)

    function changeZIndex (num) {
      rootDiv.parentNode && rootDiv.parentNode.parentNode && (rootDiv.parentNode.parentNode.style.zIndex = num)
    }
    _this.annorChangeMessageListener = function (val) {
      if (typeof val.data !== 'string') {
        return
      }
      const msg = JSON.parse(val.data)
      if (!msg || msg.modelViewerDomId !== _this.modelViewerDomId) {
        return
      }
      const active = rootDiv.getAttribute("active") === 'true'

      let unactiveAnnorFunc = function (annIndex, externalTrigger) {
        if (!active) {
          return
        }
        if (msg.annorIndex === annIndex) {
          const annor = _this._rendering_annors[annIndex]?.annOriginData
          if (_this.currentActiveAnnorIndex === annIndex) {
            _this.currentActiveAnnorIndex = null
            if (_this.modelViewer && _this.modelViewer.clearSelectedComponents) {
              _this.modelViewer.clearSelectedComponents()
              if (_this.modelViewer.__needSelectedEleIds) {
                _this.modelViewer.setSelectedComponentsById(_this.modelViewer.__needSelectedEleIds)
              }
            }
          }
          rootDiv.removeChild(contentDiv)
          rootDiv.setAttribute('active', false)

          // 更新锚点z-index
          changeZIndex('6')

          // 若为三维，取消绘制的构件包围盒或构件闪烁
          if (_this.markup_viewer.domType === 'model3d') {
            util.unActive3dAnnorElement.call(_this, annor)
          } else {
            util.unActive2dAnnorElement.call(_this, annor)
          }

          if (!externalTrigger) {
            _this.annorUnActiveEventListener.map(aE => {
              aE({
                annorIndex: annIndex,
                annorData: null
              })
            })
          }
        }
      }
      let activeAnnorFunc = function (annIndex, externalTrigger) {
        if (active) {
          return
        }
        if (msg.annorIndex === annIndex) {
          let annorCustom = _this._rendering_annors[annIndex]
          const annOriginData = annorCustom?.annOriginData
          if (_this.currentActiveAnnorIndex !== null) {
            unactiveAnnorFunc.call(_this, _this.currentActiveAnnorIndex, msg.externalTrigger)
          }
          // 计算显示位置
          const clzT = util.getAnnorContentBoxPosition(outerDiv, ann, contentDivWidth, contentDivHeight)
          contentDiv.className = `ann_content_box ${clzT}`
          rootDiv.appendChild(contentDiv)
          rootDiv.setAttribute('active', true)

          // 更新锚点z-index
          changeZIndex('7')

          // 若为三维，绘制构件包围盒
          if (_this.markup_viewer.domType === 'model3d') {
            util.active3dAnnorElement.call(_this, annOriginData, annorCustom)
          } else {
            util.active2dAnnorElement.call(_this, annOriginData)
          }
          if (!externalTrigger) {
            setTimeout(() => {
              _this.annorActiveEventListener.map(aE => {
                aE({
                  annorIndex: annIndex,
                  annorData: annOriginData
                })
              })

              _this.currentActiveAnnorIndex = annIndex
            }, 10)
          }
        }
      }
      if (msg.msgType === 'activeAnnor') {
        activeAnnorFunc.call(_this, annIndex, msg.externalTrigger)
      }
      if (msg.msgType === 'unactiveAnnor') {
        unactiveAnnorFunc.call(_this, annIndex, msg.externalTrigger)
      }
      if (msg.msgType === 'unactiveAnnorExcept') {
        // 准备废弃
        if (msg.annorIndex !== annIndex) {
          if (!active) {
            return
          }
          rootDiv.removeChild(contentDiv)
          rootDiv.setAttribute('active', false)

          // 更新锚点z-index
          changeZIndex('6')
        }
      }
    }
    window.addEventListener('message', _this.annorChangeMessageListener)

    rootDiv.appendChild(outerDiv)
    // rootDiv.appendChild(contentDiv)
    return rootDiv

    function createOutDiv () {
      const _this = this
      let d = document.createElement('div')
      d.className = '__anchor_icon'
      d.style.width = '30px'
      d.style.height = '30px'
      d.style.border = '1px solid #FFFFFF'
      d.style.background = '#8A8A8A'
      d.style.borderRadius = '50% 50% 50% 0'
      d.style.transform = 'rotate(-45deg)'
      d.addEventListener('mousedown', (cEvent) => {
        let move = false
        function mouseMoveFunc (cEvent) {
          move = true
        }
        function mouseUpFunc (cEvent) {
          if (!move) {
            if (cEvent.currentTarget) {
              if (rootDiv) {
                const isHide = rootDiv.getAttribute("active") !== "true"
                if (isHide) { // 显示
                  window.postMessage(JSON.stringify({
                    msgType: 'activeAnnor',
                    annorIndex: annIndex,
                    modelViewerDomId: _this.modelViewerDomId,
                  }))
                } else { // 隐藏
                  window.postMessage(JSON.stringify({
                    msgType: 'unactiveAnnor',
                    annorIndex: annIndex,
                    modelViewerDomId: _this.modelViewerDomId,
                  }))

                  // 回调
                  _this.annorActiveEventListener.map(aE => {
                    aE({
                      annorIndex: null,
                      annorData: null
                    })
                  })
                }
              }
            }
          }

          d.removeEventListener('mousemove', mouseMoveFunc)
          d.removeEventListener('mouseup', mouseUpFunc)
        }
        d.addEventListener('mousemove', mouseMoveFunc)
        d.addEventListener('mouseup', mouseUpFunc)
      })
      // d.addEventListener('click', (cEvent) => {
      //   if (cEvent.currentTarget) {
      //     let t = cEvent.currentTarget.nextElementSibling
      //     if (t) {
      //       const isHide = t.className.includes("__hidden")
      //       if (isHide) { // 显示
      //         t.className = 'ann_content_box'
      //       } else { // 隐藏
      //         t.className = 'ann_content_box __hidden'
      //       }
      //     }
      //   }
      // })
      return d
    }

    function createInDiv () {
      let d = document.createElement('div')
      d.innerText = ann.label
      d.style.width = '26px'
      d.style.height = '22px'
      d.style.fontSize = '14px'
      d.style.paddingTop = '4px'
      d.style.background = '#FFFFFF'
      d.style.borderRadius = '50%'
      d.style.color = '#273853'
      d.style.fontWeight = 'blod'
      d.style.transform = 'rotate(45deg)'
      d.style.textAlign = 'center'
      d.style.margin = '2px'
      return d
    }

    function createContentDiv (annIndex, annL) {
      const _this = this
      let d = document.createElement('div')
      if (ann.elementId) {
        let c1 = document.createElement('div')
        let d1 = null
        let d2 = null

        d1 = document.createElement('div')
        d1.innerHTML = `<div>${ann.elementName || ''}</div>`

        let subW = document.getElementById('subModelView')
        let subWinIs3D = subW && subW.children[0]?.getAttribute('is3d')
        if (this.modelViewer && this.modelViewer.viewerType === 'Viewer3D') { // 当前为3d模型
          d2 = document.createElement('div')
          d2.innerHTML = `<div>ID: ${ann.elementId} <span class='__more_info' style='pointer-events: auto;'>更多信息></span> </div>`
          d2.addEventListener('click', () => {
            moreInfoClickEventListener.map(mE => {
              mE({
                ...ann,
                newEleId: util.elementIdToIntegrateModelEleId.call(_this, ann, ann.elementId)
              })
            })
          })
        } else if (subW && subWinIs3D) { // 小窗为3d模型
          let isIntegratedmodel = subW.children[0]?.getAttribute('isintegratedmodel')
          d2 = document.createElement('div')
          d2.innerHTML = `<div>ID: ${ann.elementId} <span class='__more_info' style='pointer-events: auto;'>更多信息></span> </div>`
          d2.addEventListener('click', () => {
            moreInfoClickEventListener.map(mE => {
              mE({
                ...ann,
                newEleId: isIntegratedmodel ? util.elementIdAddSingleModelEleId.call(_this, ann, ann.elementId) : ann.elementId
              })
            })
          })
        } else { // 图纸或视图
          d2 = document.createElement('div')
          d2.innerHTML = `<div>ID: ${ann.elementId} <span class='__more_info' style='pointer-events: auto;'>更多信息></span> </div>`
          d2.addEventListener('click', () => {
            moreInfoClickEventListener.map(mE => {
              mE({
                ...ann,
                newEleId: ann.elementId,
                getElementInfoFromBySelf: true
              })
            })
          })
        }

        d1 && c1.appendChild(d1)
        d2 && c1.appendChild(d2)
        d.appendChild(c1)
      }
      let c2 = document.createElement('div')
      c2.innerHTML = `<div>检查结果</div>${ann.contentHTML}`
      c2.style.height = 'calc(100% - 65px)'
      c2.style.marginTop = '8px'
      c2.style.overflowY = "auto"
      c2.style.pointerEvents = "auto"
      c2.style.lineHeight = '22px'
      d.appendChild(c2)
      d.className = "ann_content_box"
      d.style.width = `${contentDivWidth}px`
      d.style.height = `${contentDivHeight}px`
      d.style.pointerEvents = 'none'

      // 关闭按钮
      let closeIc = document.createElement('i')
      closeIc.className = `gda_sdk_iconfont icon-cancel`
      closeIc.addEventListener("click", (e) => {
        if (rootDiv) {
          window.postMessage(JSON.stringify({
            msgType: 'unactiveAnnor',
            annorIndex: annIndex,
            modelViewerDomId: _this.modelViewerDomId,
          }))

          // 回调
          _this.annorActiveEventListener.map(aE => {
            aE({
              annorIndex: null,
              annorData: null
            })
          })
        }
      })

      
      let optDiv = document.createElement('div')
      optDiv.className = 'bottom_opt_bars'
      // 切换按钮
      // 上一个
      let preIc = document.createElement('i')
      preIc.className = `gda_sdk_iconfont icon-arrow-left pre_or_next_btn`
      const preIcText = annIndex ? '上一个' : '已是第一个'
      preIc.setAttribute('data-title', preIcText)
      preIc.addEventListener('click', (e) => {
        if (annIndex) {
          // // 关闭当前
          // window.postMessage(JSON.stringify({
          //   msgType: 'unactiveAnnor',
          //   annorIndex: annIndex,
          //   modelViewerDomId: _this.modelViewerDomId
          // }))
          // 激活上一个
          window.postMessage(JSON.stringify({
            msgType: 'activeAnnor',
            annorIndex: annIndex - 1,
            modelViewerDomId: _this.modelViewerDomId,
          }))

        }
      })
      // 下一个
      let nextIc = document.createElement('i')
      nextIc.className = `gda_sdk_iconfont icon-arrow-right pre_or_next_btn`
      const nextIcText = (annIndex + 1) < annL ? '下一个' : '已是最后一个'
      nextIc.setAttribute('data-title', nextIcText)
      nextIc.addEventListener('click', (e) => {
        if ((annIndex + 1) < annL) {
          // // 关闭当前
          // window.postMessage(JSON.stringify({
          //   msgType: 'unactiveAnnor',
          //   annorIndex: annIndex,
          //   modelViewerDomId: _this.modelViewerDomId
          // }))
          // 激活下一个
          window.postMessage(JSON.stringify({
            msgType: 'activeAnnor',
            annorIndex: annIndex + 1,
            modelViewerDomId: _this.modelViewerDomId,
          }))

        }
      })
      // 数量显示
      let countSp = document.createElement('span')
      countSp.className = 'page_turning'
      countSp.innerHTML = `<span>${annIndex + 1}</span>/${annL}`
      optDiv.appendChild(preIc)
      optDiv.appendChild(countSp)
      optDiv.appendChild(nextIc)

      d.appendChild(closeIc)
      d.appendChild(optDiv)
      return d
    }
  },
  getAnnorContentBoxPosition (rD, ann, chinBoxWidth, chinBoxHeight) {
    let positionClzName = ''
    const wGTRh = Number(ann.box.maxX) - Number(ann.box.minX) > Number(ann.box.maxY) - Number(ann.box.minY)
    // const marginRight = 0
    // let needLeft = false
    // let needRight = true
    // let needTop = true
    // let needBottom = false
    // let screenX = rD.getBoundingClientRect().x
    // let screenY = rD.getBoundingClientRect().y
    // let toScreenTop = screenY
    // let toScreenBottom = document.body.clientHeight - toScreenTop
    // let toScreenLeft = screenX
    // let toScreenRight = document.body.clientWidth - toScreenLeft
    // if (toScreenTop < ((wGTRh ? chinBoxHeight : chinBoxHeight / 2) + 180)) {
    //   needBottom = true
    // }
    // if (toScreenBottom > chinBoxHeight) {
    //   needTop = false
    // }
    // if (toScreenLeft > (wGTRh ? chinBoxWidth / 2 : chinBoxWidth)) {
    //   needRight = false
    // }
    // if (toScreenRight < ((wGTRh ? chinBoxWidth / 2 : chinBoxWidth) + marginRight)) {
    //   needLeft = true
    // }
    // if (needTop && needLeft) {
    //   positionClzName = '__p_top_left'
    // } else if (needTop && needRight) {
    //   positionClzName = '__p_top_right'
    // } else if (needTop) {
    //   positionClzName = '__p_top'
    // } else if (needBottom && needLeft) {
    //   positionClzName = '__p_bottom_left'
    // } else if (needBottom && needRight) {
    //   positionClzName = '__p_bottom_right'
    // } else if (needBottom) {
    //   positionClzName = '__p_bottom'
    // } else if (needRight) {
    //   positionClzName = '__p_right'
    // } else if (needLeft) {
    //   positionClzName = '__p_left'
    // } else {
    //   positionClzName = wGTRh ? '' : '__p_left'
    // }
    positionClzName = wGTRh ? '__p_top' : '__p_left'

    return positionClzName
  },

  unActive3dAnnorElement (annor) {
    let viewer = this.modelViewer
    let roomManager = viewer.getRoomManager && viewer.getRoomManager()
    if (!annor) {
      viewer.clearAllBlinkComponents && viewer.clearAllBlinkComponents()
      // viewer.clearSelectedComponents()
      if (roomManager) {
        roomManager.clearAllRooms()
      }
      return
    }
    let eleId = annor.elementId || annor.key
    if (eleId) {
      eleId = util.elementIdToIntegrateModelEleId.call(this, annor, eleId)
      // 取消构件闪烁
      viewer.clearBlinkComponentsById([eleId])
      if (viewer.clearSelectedComponents) {
        viewer.clearSelectedComponents && viewer.clearSelectedComponents()
        if (viewer.__needSelectedEleIds) {
          viewer.setSelectedComponentsById(viewer.__needSelectedEleIds)
        }
      }
      // 清除绘制的房间
      if (roomManager) {
        // roomManager.clearRoomsById([eleId])
      }
    }

    util.clearEvacuatePath3d.call(this)

    // 清除构件所在楼层剖切
    util.clearFloorSection.call(this)
  },

  unActive2dAnnorElement (annor) {
    util.clearEvacuatePath2d.call(this, annor)

    let markup_viewer = this.markup_viewer
    markup_viewer.autoLinkFunc && markup_viewer.autoLinkFunc({
      objectData: null,
      elementIdsData: null,
      modelView: markup_viewer,
      triggerByAnnorActive: true
    })
  },

  createRoom (viewer, boundary, height, id) {
    let roomConfig = new Glodon.Bimface.Plugins.Rooms.RoomConfig()
    roomConfig.viewer = viewer;
    roomConfig.roomId = id;
    roomConfig.geometry = {
        type: "extrusion",
        boundary,
        height
    };
    // 给房间着色
    roomConfig.roomColor = new Glodon.Web.Graphics.Color(97, 179, 191, 0.2);
    // 给房间的线框着色
    roomConfig.frameColor = new Glodon.Web.Graphics.Color(97, 179, 191, 1);
    let room = new Glodon.Bimface.Plugins.Rooms.Room(roomConfig);
    viewer.getRoomManager().addRoom(room);
    viewer.render();
  },

  async active3dAnnorElement (annor, annorCustom) {
    if (!annor) {
      return
    }
    let viewer = this.modelViewer
    let viewerOpt = this.modelViewerOpt
    let eleId = annor.elementId
    if (eleId) { // 有构件id
      eleId = util.elementIdToIntegrateModelEleId.call(this, annor, eleId)
      viewer.setSelectedComponentsById([eleId])
      viewer.setBlinkComponentsById([eleId])
      let eleObj = viewer.getObjectDataById(eleId)
      if (eleObj) { // 根据id找到构件, 高亮构件
        let boundingBox = viewer.getBoundingBoxById(eleId)
        if (boundingBox) {
          viewer.zoomToBoundingBox(boundingBox, 1)

          setTimeout(() => {
            util.sectionFloorByEleBounding.call(this, viewer, annorCustom, boundingBox)
          }, 100)
        }
      } else {
        let roomdata = await util.getRoomEleProperty(eleId, viewerOpt)
        if (roomdata) { // 为房间
          viewer.zoomToBoundingBox({
            min: roomdata.bboxMin,
            max: roomdata.bboxMax
          }, 1)
          // 绘制房间
          const boundary = roomdata.boundary
          util.createRoom(viewer, boundary, roomdata.bboxMax.z - roomdata.bboxMin.z, roomdata.id)
          // viewer.createRoom(boundary, roomdata.bboxMax.z - roomdata.bboxMin.z, roomdata.id)

          util.clearEvacuatePath3d.call(this)
          util.createEvacuatePath3d.call(this, annor, roomdata)

          setTimeout(() => {
            util.sectionFloorByEleBounding.call(this, viewer, annorCustom, {
              min: roomdata.bboxMin,
              max: roomdata.bboxMax
            }, 100)
          })
        }
      }

      // 触发联动
      let o = [eleId]
      let markup_viewer = this.markup_viewer
      markup_viewer.autoLinkFunc && markup_viewer.autoLinkFunc({
        objectData: o,
        modelView: this.modelView
      })
    } else {
      let box = annor.box
      if (this.modelViewer.getBoundingBoxById && annor.box3d) {
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
        viewer.zoomToBoundingBox({
          min: {
            x: box.minX,
            y: box.minY,
            z: box.minZ,
          },
          max: {
            x: box.maxX,
            y: box.maxY,
            z: box.maxZ,
          }
        }, 1)
        util.createRoom(viewer, Boundary, 1500, annor.key)
        // viewer.createRoom(Boundary, 1500, annor.key)
      }
    }
  },

  active2dAnnorElement (annor) {
    let box = annor.box
    if (box) {
      if (this.modelViewer.zoomToBoundingBox) {
        this.modelViewer.zoomToBoundingBox([
          [box.minX, box.minY],
          [box.maxX, box.maxY]
        ], 8)
        
        if (this.modelViewer.render) {
          this.modelViewer.render()
        }
      }
    }
    let eleId = annor.elementId
    if (eleId) { // 有构件id
      // 合模文件 处理构件id
      eleId = util.elementIdToIntegrateModelEleId.call(this, annor, eleId)
      // 触发联动
      let o = [eleId]
      let markup_viewer = this.markup_viewer
      markup_viewer.autoLinkFunc && markup_viewer.autoLinkFunc({
        objectData: null,
        elementIdsData: o,
        modelView: markup_viewer,
        triggerByAnnorActive: true
      })
    }

    util.clearEvacuatePath2d.call(this, annor)
    util.createEvacuatePath2d.call(this, annor)
  },

  getRoomEleProperty (eleId, viewerOpt) {
    return new Promise((resolve, reject) => {
      try {
        viewerOpt.getRoomProperty.call(viewerOpt, eleId, data => {
          resolve(data)
        })
      } catch (e) {
        resolve(null)
      }
    })
  },

  // 清空模型中的疏散路径
  clearEvacuatePath3d () {
    if (this.markup_viewer.domType !== 'model3d') {
      return
    }
    if (this.extObjMng) {
      this.extObjMng.clear()
    }

    if (this.drawableContainer) {
      if(this.evacuatePathDrawableIds && this.evacuatePathDrawableIds.length) {
        this.evacuatePathDrawableIds.forEach(id => {
          this.drawableContainer.removeItemById(id)
        })
        this.evacuatePathDrawableIds = []
      }
      // this.drawableContainer.clear()

      // if (this.pathCurveObjectId) {
      //   this.modelViewer.removeSelectedId([this.pathCurveObjectId])
      //   this.pathCurveObjectId = null
      // }
    }

    // 恢复相机状态
    if (this.cameraState) {
      this.modelViewer.setCameraStatus(this.cameraState);
      this.modelViewer.render();
      this.cameraState = null
    }

    // 退出剖切
    if (this.sectionRegion) {
      this.sectionRegion.exit()
      this.sectionRegion = null
    }
  },

  // 绘制模型中的疏散路径
  async createEvacuatePath3d (ann, roomdata) {
    let _this = this
    // 路径z坐标
    let pathZ = 0
    if (roomdata) {
      // let tBound = {
      //   min: roomdata.bboxMin,
      //   max: roomdata.bboxMax
      // }
      const height = roomdata.bboxMax.z - roomdata.bboxMin.z
      const offsetHeight = height / 5 > 200 ? 200 : height / 5
      pathZ = roomdata.bboxMin.z + offsetHeight
    }
    let pathPoints = ann.pathPoints
    .map((item, itemIndex) => {
      return {
        x: item.x || 0,
        y: item.y || 0,
        z: pathZ
      }
    })
    if (Array.isArray(pathPoints) && pathPoints.length) {
      // 绘制路径
      if (this.extObjMng) {
        function addLine(points, index) {
          let pathCurve = new Glodon.Bimface.Plugins.Geometry.SplineCurve(points)
          pathCurve.setType('polyline');
          // 设置样条曲线宽度
          pathCurve.setWidth(5);
          pathCurve.setColor(new Glodon.Web.Graphics.Color(191, 40, 40, 1));
    
          _this.extObjMng.loadObject({ name: `pathCurve${index}`, object: pathCurve }, () => {
          });
        }

        pathPoints.forEach((p, pIndex) => {
          if (pIndex < pathPoints.length - 1) {
            let pNext = pathPoints[pIndex + 1]
            addLine([p, pNext], pIndex)
          }
        })
      }

      // 绘制疏散路径的标签
      if (this.drawableContainer) {
        function addLabelItem(position, container, labelText, isEndPoint = false) {
          // 构造自定义标签配置项
          let config = new Glodon.Bimface.Plugins.Drawable.CustomItemConfig();
          config.draggable = true
          // 定义自定义标签的内容
          let content = document.createElement('div');
          // 设置标签样式
          content.style.paddingLeft = '6px';
          content.style.paddingRight = '6px';
          content.style.border = 'solid';
          content.style.borderColor = '#FFFFFF';
          content.style.borderWidth = '1px';
          content.style.borderRadius = '2px';
          content.style.background = '#BF2828';
          content.style.display = 'inline-block';
          content.style.height = '24px';
          content.style.lineHeight = '24px';
          content.style.fontSize = '14px';
          content.style.textWrap = 'nowrap';
          content.style.textAlign = 'center';
          content.style.color = '#FFFFFF';
          content.style.transform = 'translateX(-50%) translateY(-50%)';
          content.style.boxShadow = '0px 4px 10px 0px rgba(0, 0, 0, 0.10)';
          if (isEndPoint) {
            content.style.transform = 'translateX(-50%) translateY(-140%)';
          }
          // 设置标签文字内容与样式
          content.innerHTML = labelText;
          // 设置自定义标签的内容
          config.content = content;
          // 设置自定义标签的viewer对象
          config.viewer = _this.modelViewer;
          // 设置自定义标签的不透明度
          config.opacity = 1;
          // 设置自定义标签的坐标
          config.worldPosition = position;
          // 构造自定义标签对象
          let customItem = new Glodon.Bimface.Plugins.Drawable.CustomItem(config);
          // 将自定义标签添加到标签容器中
          container.addItem(customItem);
          _this.evacuatePathDrawableIds.push(customItem.id)
        }

        function addPointItem (position, container) {
          // 构造自定义标签配置项
          let config = new Glodon.Bimface.Plugins.Drawable.CustomItemConfig();
          // config.draggable = true
          // 定义自定义标签的内容
          let content = document.createElement('div');
          content.style.height = '12px';
          content.style.width = '12px';
          // 设置标签样式
          content.style.border = 'solid';
          content.style.borderColor = '#FFFFFF';
          content.style.borderWidth = '4px';
          content.style.borderRadius = '12px';
          content.style.background = '#BF2828';
          content.style.position = 'relative';
          content.style.top = '-10px';
          content.style.left = '-10px';
          // 设置标签文字内容与样式
          content.innerHTML = '';
          // 设置自定义标签的内容
          config.content = content;
          // 设置自定义标签的viewer对象
          config.viewer = _this.modelViewer;
          // 设置自定义标签的不透明度
          config.opacity = 1;
          // 设置自定义标签的坐标
          config.worldPosition = position;
          // 构造自定义标签对象
          let customItem = new Glodon.Bimface.Plugins.Drawable.CustomItem(config);
          // 将自定义标签添加到标签容器中
          container.addItem(customItem);
          _this.evacuatePathDrawableIds.push(customItem.id)
        }

        function addPointItem1 (position, index) {
          let p = new Glodon.Bimface.Plugins.Geometry.Plane({
            type: 'circle',
            center: position,
            radius: 20
          })
          p.setColor(new Glodon.Web.Graphics.Color(191, 40, 40, 1))

          let p1 = new Glodon.Bimface.Plugins.Geometry.Plane({
            type: 'circle',
            center: position,
            radius: 25
          })
          p1.setColor(new Glodon.Web.Graphics.Color(255, 255, 255, 1))
          p1.setBorderColor(new Glodon.Web.Graphics.Color(255, 255, 255, 1))

          if (this.extObjMng) {
            this.extObjMng.loadObject({ name: `pointPlane1${index}`, object: p1 }, () => {
            });
            this.extObjMng.loadObject({ name: `pointPlane${index}`, object: p }, () => {
            });
          }
        }

        let totalLength = 0
        pathPoints.forEach((p, pIndex) => {
          // 添加点icon
          addPointItem.call(_this, JSON.parse(JSON.stringify(p)), this.drawableContainer)
          // addPointItem1.call(_this, p, pIndex)

          // 两点之间添长度标签
          if (pIndex < pathPoints.length - 1) {
            let nextP = pathPoints[pIndex + 1]
            let centerPoint = {
              x: p.x + (nextP.x - p.x) / 2,
              y: p.y + (nextP.y - p.y) / 2,
              z: p.z + (nextP.z - p.z) / 2
            }
            let length = Math.sqrt(Math.pow(nextP.x - p.x, 2) + Math.pow(nextP.y - p.y, 2))
            totalLength += length
            addLabelItem(centerPoint, this.drawableContainer, `${Math.round(length)}mm`)
          } else {
            // 起点处添加总长标签
            let startP = pathPoints[0]
            addLabelItem(startP, this.drawableContainer, `总长度：${Math.round(totalLength)} mm`, true)
          }
        })
      }

      // 剖切
      // 配置剖切区域边界、高度、Viewer对象等参数
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
      const maxZ = roomdata?.bboxMax.z || Math.max(...pointZList)
      const minZ = roomdata?.bboxMin.z || Math.min(...pointZList)

      // 构造剖切区域配置项
      let sectionRegionConfig = new Glodon.Bimface.Plugins.Section.SectionRegionConfig();
      sectionRegionConfig.boundary = [
        {x: minX, y: minY, z: minZ},
        {x: minX, y: maxY, z: minZ},
        {x: maxX, y: maxY, z: minZ},
        {x: maxX, y: minY, z: minZ}
      ];
      sectionRegionConfig.height = maxZ - minZ;
      sectionRegionConfig.viewer = _this.modelViewer;
      // 构造剖切区域
      _this.sectionRegion = new Glodon.Bimface.Plugins.Section.SectionRegion(sectionRegionConfig); 
      // 变更剖切方向    
      _this.sectionRegion.changeClipDirection(false);   



      // 保存相机状态
      _this.cameraState = _this.modelViewer.getCameraStatus();

      // 设置模型俯视
      _this.modelViewer.setView(Glodon.Bimface.Viewer.ViewOption.Top);
      _this.modelViewer.render();
    }
  },

  // 按构件剖切构件所在楼层
  async sectionFloorByEleBounding (viewer, annorCustom, elBoundingBox) {
    let _this = this
    if (!viewer || !elBoundingBox) {
      return
    }
    // 剖切
    // 配置剖切区域边界、高度、Viewer对象等参数
    const boundaryPoints = viewer.getModelBoundaryPoints(
      viewer.getModel().modelId
    )
    const pointXList = boundaryPoints.map((point) => point.x)
    const pointYList = boundaryPoints.map((point) => point.y)
    const pointZList = boundaryPoints.map((point) => point.z)
    const maxX = Math.max(...pointXList)
    const minX = Math.min(...pointXList)
    const maxY = Math.max(...pointYList)
    const minY = Math.min(...pointYList)

    let floors = await util.getFloors.call(_this, viewer)
    if (!floors) {
      return
    }
    floors = floors.sort((a, b) => b.elevation - a.elevation)

    let sectionMinZ = null
    let sectionMaxZ = null
    const elBoundingBoxHeight = elBoundingBox.max?.z - elBoundingBox.min?.z
    const threshold = elBoundingBoxHeight * 0.1
    floors.forEach((floor, floorIndex) => {
      if (!sectionMaxZ && floor.elevation < elBoundingBox.max?.z - threshold  && floors[floorIndex - 1]) {
        sectionMaxZ = floors[floorIndex - 1].elevation
      }
      if (!sectionMinZ && floor.elevation < elBoundingBox.min?.z + threshold) {
        sectionMinZ = floor.elevation
      }
    })

    if (!sectionMinZ) {
      sectionMinZ = elBoundingBox.min?.z
    }
    if (!sectionMaxZ) {
      sectionMaxZ = elBoundingBox.max?.z
    }

    const maxZ = sectionMaxZ || Math.max(...pointZList)
    const minZ = sectionMinZ || Math.min(...pointZList)

    // 构造剖切区域配置项
    let sectionRegionConfig = new Glodon.Bimface.Plugins.Section.SectionRegionConfig();
    sectionRegionConfig.boundary = [
      {x: minX, y: minY, z: minZ},
      {x: minX, y: maxY, z: minZ},
      {x: maxX, y: maxY, z: minZ},
      {x: maxX, y: minY, z: minZ}
    ];
    sectionRegionConfig.height = maxZ - minZ;
    sectionRegionConfig.viewer = _this.modelViewer;
    // 构造剖切区域
    _this.floorSectionRegion = new Glodon.Bimface.Plugins.Section.SectionRegion(sectionRegionConfig); 
    // 变更剖切方向    
    _this.floorSectionRegion.changeClipDirection(false);
    // 隐藏剖切盒
    _this.floorSectionRegion.hide()

    // 仅展示本楼层annor标签
    let allCustomItems = _this.drawableContainer?.getAllItems() || []
    let onCurrentFloorCustomItems = allCustomItems.filter(item => {
      if (item.annOriginData?.box) {
        let boxHeightCenter = (item.annOriginData.box.maxZ + item.annOriginData.box.minZ) / 2
        if (boxHeightCenter >= minZ && boxHeightCenter <= maxZ) {
          return true
        } else {
          return false
        }
      }
      return true
      // return (item.worldPosition.z <= maxZ + threshold) && (item.worldPosition.z >= minZ - threshold)
    })
    if (onCurrentFloorCustomItems.length) {
      _this.drawableContainer.hideAllItems()
      _this.drawableContainer.showItemsById(onCurrentFloorCustomItems.map(item => item.id))
    }

    // 仅展示当前active标签
    // if (annorCustom?.id) {
    //   _this.drawableContainer.hideAllItems()
    //   _this.drawableContainer.showItemsById([annorCustom?.id])
    // }
  },
  // 取消按构件楼层的剖切
  clearFloorSection () {
    // 退出剖切
    if (this.floorSectionRegion) {
      this.floorSectionRegion.exit()
      this.floorSectionRegion = null

      this.drawableContainer?.showAllItems()
    }
  },

  // 清空图纸中的疏散路径
  clearEvacuatePath2d () {

  },

  // 绘制图纸中的疏散路径
  createEvacuatePath2d (ann) {
  },

  windowResize () {
    if (window.dispatchEvent) {
      window.dispatchEvent(new Event('resize'))
    }
  },

  async getFloors (viewer3d) {
    return new Promise(resolve => {
      viewer3d.getModel().getFloors((objectdata) => {
        resolve(objectdata)
      });
    })
  }
}
export default util
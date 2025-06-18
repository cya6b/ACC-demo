export default {
  // 初始化2D批注相关实例
  createAnnotation (viewer, thiz) {
    let rE = thiz.$refs.rootView
    if (!rE) {
      return
    }
    // 使用工具条代替原有的原始api
    // eslint-disable-next-line no-undef
    const configTool =
      new Glodon.Bimface.Plugins.Annotation.AnnotationManagerConfig() // new Glodon.Bimface.Plugins.Annotation.AnnotationToolbarConfig()
    configTool.domElement = rE // document.getElementById(thiz.domId)
    configTool.viewer = viewer
    configTool.windowAdaption = true
    thiz.bimface.config2D = configTool

    // eslint-disable-next-line no-undef
    const annotationToolbar =
      new Glodon.Bimface.Plugins.Annotation.AnnotationToolbar(configTool)
    // eslint-disable-next-line no-undef
    const AnnotationToolbarEvent =
      Glodon.Bimface.Plugins.Annotation.AnnotationToolbarEvent

    // 批注保存事件
    annotationToolbar.addEventListener(
      AnnotationToolbarEvent.Saved,
      thiz.beforeSaveAnnot
    )
    // 批注取消事件
    annotationToolbar.addEventListener(
      AnnotationToolbarEvent.Cancelled,
      thiz.onAnnotToolBarCancelled
    )
    const annotationManageTool = annotationToolbar.getAnnotationManager()
    // 设置批注填充色
    annotationManageTool.setFillColor(new Glodon.Web.Graphics.Color(255, 0, 0, 0.3))
    annotationManageTool.setStyle("globalCompositeOperation:'xor'")
    // eslint-disable-next-line no-undef

    thiz.bimface.annotation = annotationManageTool
    thiz.bimface.annotationToolBar = annotationToolbar
    if (this.hideBimToolBar) {
      // 隐藏工具条
      thiz.hideToolBar()
    }
    if (this.hideBimLayerBar) {
      this.hideLayerBar()
    }
    if (!this.hideAnnotBar) {
      this.insertAnnotBtn(thiz)
    }
  },

  createDrawableContainer (viewer, thiz) {
    try {
      // 标签类的设置
      // eslint-disable-next-line no-undef
      let drawableConfig =
        new Glodon.Bimface.Plugins.Drawable.DrawableContainerConfig()
      // 设置显示最大标签数
      drawableConfig.maxNum = 200
      drawableConfig.enableRender = false
      drawableConfig.viewer = viewer
      // 容器
      // eslint-disable-next-line no-undef
      if (viewer.viewerType === 'ViewerDrawing') {
        viewer.__proto__ = Glodon.Bimface.Viewer.ViewerDrawing.prototype
      }
      let drawableContainer =
        new Glodon.Bimface.Plugins.Drawable.DrawableContainer(drawableConfig)
      thiz.bimface.drawableContainer = drawableContainer
    } catch (error) {
    }

  },
  beforeSaveAnnot () {
    const annotation = this.bimface.annotation
    const annotationListData = this.bimface.annotation.getAnnotationList()
    const annotationList =
      annotation.stringifyAnnotationList(annotationListData)
    const state = JSON.stringify(annotation.getCurrentState().state)
    const xdata = `${annotationList}&&&&${state}`
    this.$emit('afterDrawAnnot', xdata)

    if (this.annotDrawingSavedEventListener) {
      this.annotDrawingSavedEventListener(xdata)
    }

    // 唤出基础工具条
    this.showBimToolBarBottom()
  },
  onAnnotToolBarCancelled () {
    this.$emit('cancelDrawAnnot')

    if (this.annotDrawingCancelEventListener) {
      this.annotDrawingCancelEventListener()
    }

    // 唤出基础工具条
    this.showBimToolBarBottom()
  },
  showToolBar () {
    const toolBottom = this.getToolBarBottom()
    if (!toolBottom) {
      return
    }
    toolBottom.style.display = 'block'
  },
  hideToolBar () {
    const toolBottom = this.getToolBarBottom()
    if (!toolBottom) {
      return
    }
    toolBottom.style.display = 'none'
  },
  getToolBarBottom () {
    return document
    .getElementById(`${this.domId}`)
    ?.querySelector('.bf-toolbar.bf-toolbar-bottom')
  },
  showLayerBar () {
    const toolBottom = this.getToolBarBottom()
    if (!toolBottom) {
      return
    }
    const layerIcon = toolBottom.querySelectorAll(
      '.bf-button.gld-bf-layers'
    )
    if (layerIcon.length) {
      layerIcon[0].style.display = 'block'
    }
  },
  hideLayerBar () {
    const toolBottom = this.getToolBarBottom()
    if (!toolBottom) {
      return
    }
    const layerIcon = toolBottom.querySelectorAll(
      '.bf-button.gld-bf-layers'
    )
    if (layerIcon.length) {
      layerIcon[0].style.display = 'none'
    }
  },
  showModelBar () {

  },
  hideModelBar () {

  },
  showBimToolBarBottom (f = true) {
    // 控制bim批注工具栏显示&隐藏
    const toolBottom = this.getToolBarBottom()
    if (!toolBottom) {
      return
    }
    if (f) {
      toolBottom.style.display = 'block'
      // toolSelector.style.display = 'none'

      // 隐藏地图功能
      const mapIcon = toolBottom.querySelectorAll('.bf-button.gld-bf-map')
      if (mapIcon.length) {
        mapIcon[0].style.display = 'none'
      }

      // 若为视图，隐藏图层功能
      if (this.docType === 'bim3dSheet') {
        const layerIcon = toolBottom.querySelectorAll(
          '.bf-button.gld-bf-layers'
        )
        if (layerIcon.length) {
          layerIcon[0].style.display = 'none'
        }
      }

      // 修改图纸图层框默认出现位置
      const layerSwitchIcon = document.querySelectorAll(
        '.bf-button.gld-bf-layers'
      )
      if (layerSwitchIcon.length) {
        layerSwitchIcon[0].addEventListener('click', () => {
          let layerBox = document.querySelectorAll(
            '.bf-panel.bf-layers-panel'
          )
          if (layerBox.length) {
            let leftTreeContent = document.querySelectorAll(
              '.file_tree.transition-box'
            )
            if (leftTreeContent.length) {
              if (leftTreeContent[0].style.display === 'none') {
                layerBox[0].style.left = '0px'
                layerBox[0].style.top = '42px'
              } else {
                layerBox[0].style.top = '-1px'
                layerBox[0].style.left = '399px'
              }
            } else {
              layerBox[0].style.left = '0px'
              layerBox[0].style.top = '42px'
            }
          }
        })
      }

      // 修改图纸测量工具框默认出现位置
      const measureSwitchIcon = document.querySelectorAll(
        '.bf-button.gld-bf-measure'
      )
      if (measureSwitchIcon.length) {
        measureSwitchIcon[0].addEventListener('click', () => {
          let measureBox = document.querySelectorAll(
            '.bf-panel.bf-measurement-panel'
          )
          if (measureBox.length) {
            let rightResultContent = document.querySelectorAll(
              '.review_screen_content'
            )
            if (rightResultContent.length) {
              if (rightResultContent[0].style.display === 'none') {
                measureBox[0].style.left = `${
                  document.body.clientWidth - 200
                }px`
                measureBox[0].style.top = `${
                  document.body.clientHeight - 288
                }px`
              } else {
                measureBox[0].style.left = `${
                  document.body.clientWidth - 600
                }px`
                measureBox[0].style.top = `${
                  document.body.clientHeight - 288
                }px`
              }
            } else {
              measureBox[0].style.left = `${
                document.body.clientWidth - 200
              }px`
              measureBox[0].style.top = `${
                document.body.clientHeight - 288
              }px`
            }
          }
        })
      }
    } else if (!f) {
      toolBottom.style.display = 'none'
      // toolSelector.style.display = 'none'
    }
  },
  showAnnotToolBarBottom () {
    // this.bimface.annotation.endDrawing()
    this.bimface.annotationToolBar.show()
  },
  getAnnotToolBar () {
    return document
    .getElementById(`${this.domId}`)
    ?.querySelector('.bf-annotation')
  },
  getAnnotCancelBar () {
    return document
    .getElementById(`${this.domId}`)
    ?.querySelector('.bf-annotation .bf-cancel')
  },
  hideAnnotToolBarBottom () {
    const bar = this.getAnnotToolBar()
    if (!bar) {
      return
    }
    if (!bar.className.includes('bf-hide')) {
      bar.className = `${bar.className} bf-hide`
    }
  },
  startAnnot (thiz) {
    if (!thiz) {
      thiz = this
    }
    thiz.showBimToolBarBottom(false)
    thiz.showAnnotToolBarBottom()
  },

  cancelAnnot (thiz) {
    if (!thiz) {
      thiz = this
    }
    let cancelBar = thiz.getAnnotCancelBar()
    if (cancelBar) {
      cancelBar.click()
    }
    // thiz.showBimToolBarBottom()
    // thiz.hideAnnotToolBarBottom()
  },

  insertAnnotBtn (thiz) {
    const arr = thiz.$refs.rootView.querySelectorAll(
      '.bf-button.gld-bf-notes'
    )
    if (arr.length === 0) {
      const toolBottom = thiz.$refs.rootView.querySelector(
        '.bf-toolbar.bf-toolbar-bottom'
      )
      const div = document.createElement('div')
      div.className = 'bf-button gld-bf-notes'
      div.setAttribute('title', '批注')
      div.addEventListener('click', () => {
        thiz.startAnnot(thiz)
      })

      toolBottom && toolBottom.appendChild(div)
    } else {
      arr[0].removeEventListener('click', () => {
        //
      })
      arr[0].addEventListener('click', () => {
        thiz.startAnnot(thiz)
      })
    }
  },
  insertDiffBtn (thiz) {
    const arr = document.querySelectorAll(
      'bf-button iconfont icon-icon-design-14'
    )
    if (arr.length === 0) {
      const toolBottom = document.querySelector(
        '.bf-toolbar.bf-toolbar-bottom'
      )
      const divDiff = document.createElement('div')
      divDiff.id = 'diff-model-btn'
      divDiff.className = 'bf-button iconfont icon-icon-design-14'
      divDiff.setAttribute('title', '图纸对比')
      divDiff.addEventListener('click', () => {
        if (thiz.diffStatus === 2) {
          // thiz.resetDiffBtnStyle(0)
          thiz.$emit('startDiff')
        } else if (thiz.diffStatus === 0) {
          thiz.resetDiffBtnStyle(1)
          thiz.$emit('startDiff')
        } else if (thiz.diffStatus === -1) {
          // thiz.resetDiffBtnStyle(0)
        }
      })

      toolBottom.appendChild(divDiff)
    } else {
      // arr[0].removeEventListener('click', () => {})
      // arr[0].addEventListener('click',function() {
      //   if (thiz.diffStatus === 2) {
      //     // thiz.resetDiffBtnStyle(0)
      //   } else if (thiz.diffStatus === 0) {
      //     thiz.resetDiffBtnStyle(1)
      //     thiz.$emit('startDiff')
      //   } else if (thiz.diffStatus === -1) {
      //     // thiz.resetDiffBtnStyle(0)
      //   }
      // })
    }
  },
  resetDiffBtnStyle (f) {
    const dom = document.querySelector('#diff-model-btn')
    let str = ''
    if (f === 0) {
      str = 'bf-button iconfont icon-icon-design-14'
    } else if (f === 1) {
      str = 'bf-button iconfont icon-icon-design-14 start-shine'
    } else if (f === 2) {
      str = 'bf-button iconfont icon-icon-design-14 bright'
    } else if (f === -1) {
      str = 'bf-button iconfont icon-icon-design-14 warn'
    }

    if (str) {
      dom.className = str
    }
  },
}
<template>
  <div class="diff_pdf">
    <div class="left_pdf_show">
      <div id="pdf1Content" class="pdf1_content">
        <div ref="baseContent" @mouseover="changeFlag(false)" @mouseout="mouseOut($event, 'base')" @mousedown="mouseDown($event, 'base')" @mousemove.prevent="mouseMove($event, 'base')" @mouseup="mouseUp($event, 'base')">
          <canvas
            class="compare-base"
            id="compare-base"
            ref="base"
          ></canvas>
        </div>
      </div>
      <div id="pdf2Content" class="pdf2_content">
        <div ref="targetContent" @mouseover="changeFlag(true)" @mouseout="mouseOut($event, 'target')"  @mousedown="mouseDown($event, 'target')" @mousemove.prevent="mouseMove($event, 'target')" @mouseup="mouseUp($event, 'target')">
          <canvas
            class="compare-target"
            id="compare-target"
            ref="target"
          ></canvas>
        </div>
      </div>
    </div>
    <div class="right_result_show">
      <div class="page_num_manager">
        <!-- <span @click="drawingClear">清空差异</span> -->
        <span class="page_minus" @click="prePdfPage" :disabled="currentPage === 1">上一页</span>
        <span class="page_num">第{{`${currentPage || 0}/${pdfTotalPages || 0}`}}页</span>
        <span class="page_add" @click="nextPdfPage" :disabled="currentPage === pdfTotalPages" size="mini">下一页</span>
      </div>
      <div v-if="pdfTotalPages" class="scale_manager">
        <el-button @click="scaleChange(-1)" :disabled="scale === scaleList[0]?.value">缩小</el-button>
        <el-select :teleported="false" class="select_scale" v-model="scale">
          <el-option v-for="(sca, index) in scaleList" :key="index" :value="sca.value" :label="sca.label"></el-option>
        </el-select>
        <el-button @click="scaleChange(1)" :disabled="scale === scaleList[scaleList.length - 1]?.value">放大</el-button>
      </div>
      <div class="diff_list">
        <span class="title">差异列表</span>
        <div class="list">
          <span v-for="(item, index) in indifferListData"
            :class="diffPointIndex == index ? '__active' : ''"
            :key="item" @click="focusToIndifferPoint(item, index)">
            {{`第${index+1}处差异点（第${item.page}页）`}}
          </span>
        </div>
      </div>
    </div>
    <div class="compare-loading" v-show="loading.visible">
      <div class="compare-loading-inner">
        <div class="compare-loading-icon">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink"
            width="30px"
            height="30px"
            viewBox="0 0 50 50"
            style="enable-background:new 0 0 50 50"
            xml:space="preserve"
          >
            <path
              fill="#FF6700"
              d="M43.935,25.145c0-10.318-8.364-18.683-18.683-18.683c-10.318,0-18.683,8.365-18.683,18.683h4.068c0-8.071,6.543-14.615,14.615-14.615c8.072,0,14.615,6.543,14.615,14.615H43.935z"
              transform="rotate(275.098 25 25)"
            >
              <animateTransform
                attributeType="xml"
                attributeName="transform"
                type="rotate"
                from="0 25 25"
                to="360 25 25"
                dur="0.6s"
                repeatCount="indefinite"
              ></animateTransform>
            </path>
          </svg>
        </div>
        <div class="compare-loading-text">{{ loading.text }}</div>
      </div>
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
import { markRaw } from 'vue'
import { ElButton, ElSelect, ElOption } from "element-plus"
import * as pdfjsLib from "pdfjs-dist"
import * as workerSrc from "pdfjs-dist/build/pdf.worker.js"
pdfjsLib.GlobalWorkerOptions.workerSrc = workerSrc
import util from '../../../../../plugins/util.js'
export default {
  components: {
    ElButton, ElSelect, ElOption
  },
  data () {
    return {
      diffPointIndex: null, // 当前差异点index
      accuracy: 5, // 像素
      totalPage: 0,
      currentPage: 1,
      indifferList: [], // 差异结果列表
      base: {
        canvas: null,
        shadow: null,
        pdfLoad: false,
        pdf: {
          nums: 0
        },
        data: null,
        svg: null,
        file: null,
        opacity: 100,
        visible: true,
        type: 'base'
      },
      target: {
        canvas: null,
        shadow: null,
        pdfLoad: false,
        pdf: {
          nums: 0
        },
        data: null,
        svg: null,
        file: null,
        opacity: 100,
        visible: true,
        type: 'target'
      },
      loading: {
        visible: false,
        text: ''
      },
      scrollFlag: false,
      drag: {
        baseDragMoving: false,
        targetDragMoving: false,
        sb_bkx: null,
        sb_bky: null,
      },
      autoScale: null,
      scale: 1, // 页面缩放
      scaleList: [
        {
          label: 'auto',
          value: 1
        },
        {
          label: '25%',
          value: 0.25
        },
        {
          label: '33%',
          value: 0.33
        },
        {
          label: '50%',
          value: 0.5
        },
        {
          label: '75%',
          value: 0.75
        },
        {
          label: '100%',
          value: 1
        },
        {
          label: '125%',
          value: 1.25
        },
        {
          label: '150%',
          value: 1.5
        },
        {
          label: '200%',
          value: 2
        },
        {
          label: '300%',
          value: 3
        },
        {
          label: '400%',
          value: 4
        },
        // {
        //   label: '800%',
        //   value: 8
        // }
      ]
    }
  },
  props: {
    baseData: null,
    targetData: null,
  },
  beforeCreate(){
  },
  mounted () {
    let _self = this
    _self.$refs.baseContent.onscroll = function () {
      if (!_self.scrollFlag) {
        _self.$refs.targetContent.scrollLeft = _self.$refs.baseContent.scrollLeft
        _self.$refs.targetContent.scrollTop = _self.$refs.baseContent.scrollTop
      }
    }
    _self.$refs.targetContent.onscroll = function () {
      if (_self.scrollFlag) {
        _self.$refs.baseContent.scrollLeft = _self.$refs.targetContent.scrollLeft
        _self.$refs.baseContent.scrollTop = _self.$refs.targetContent.scrollTop
      }
    }
  },
  computed: {
    indifferListData () {
      return this.indifferList.sort((item1, item2) => {
        return item1.page - item2.page
      })
    },
    pdfTotalPages () {
      return Math.max(this.base.pdf.numPages, this.target.pdf.numPages)
    }
  },
  methods: {
    scaleChange (step) {
      let _self = this
      let currentScaleSelectIndex = this.scaleList.findIndex(item => item.value === _self.scale)
      _self.scale = this.scaleList[currentScaleSelectIndex + step].value
    },
    mouseDown (event, type) {
      if (type === 'base') {
        this.drag.baseDragMoving = true
      } else if (type === 'target') {
        this.drag.targetDragMoving = true
      } else {
        return
      }
      this.drag.sb_bkx= event.offsetX
      this.drag.sb_bky= event.offsetY
    },
    mouseUp (event, type) {
      if (type === 'base') {
        this.drag.baseDragMoving = false
      } else if (type === 'target') {
        this.drag.targetDragMoving = false
      } else {
        this.drag.baseDragMoving = false
        this.drag.targetDragMoving = false
      }
    },
    mouseMove (event, type) {
      let flag = false
      let currentTarget = null
      if (type === 'base') {
        flag = this.drag.baseDragMoving
        currentTarget = this.$refs.baseContent
      } else if (type === 'target') {
        flag = this.drag.targetDragMoving
        currentTarget = this.$refs.targetContent
      } else {
        return
      }
      if(flag){
        let newLeft = currentTarget.scrollLeft - (event.offsetX - this.drag.sb_bkx)
        let newTop = currentTarget.scrollTop - (event.offsetY - this.drag.sb_bky)
        let scrollLeftMax = currentTarget.scrollWidth - currentTarget.offsetWidth
        let scrollTopMax = currentTarget.scrollHeight - currentTarget.offsetHeight
        if (newLeft <= 0) {
          currentTarget.scrollLeft = 0
        } else if (newLeft >= scrollLeftMax) {
          currentTarget.scrollLeft = scrollLeftMax
        } else {
          currentTarget.scrollLeft = newLeft
        }
        if (newTop <= 0) {
          currentTarget.scrollTop = 0
        } else if (newTop >= scrollTopMax) {
          currentTarget.scrollTop = scrollTopMax
        } else {
          currentTarget.scrollTop = newTop
        }
      }
    },
    mouseOut (event, type) {
      this.mouseUp(event, type)
    },
    changeFlag(flag) {
      this.scrollFlag = flag
    },
    nextPdfPage () {
      if (this.currentPage < this.pdfTotalPages) {
        this.currentPage++
      }
    },
    prePdfPage () {
      if (this.currentPage > 1) {
        this.currentPage--
      }
    },
    isDifferentColor (data1, data2, k) {
      let ret = false
      if (Math.abs(data1[k] - data2[k]) > 50 || Math.abs(data1[k+1] - data2[k+1]) > 50 || Math.abs(data1[k+2] - data2[k+2]) > 50  || Math.abs(data1[k+3] - data2[k+3]) > 254) {
        ret = true
      }
      return ret
    },
    diff () { // 对比算法
      let _self = this
      _self.indifferList = []

      let pdf1 = markRaw(this.base.pdf)
      let pdf2 = markRaw(this.target.pdf)
      let p1Nums = pdf1.numPages || 0
      let p2Nums = pdf2.numPages || 0
      let maxP = Math.min(p1Nums, p2Nums)
      let scale = _self.scale
      for (let p = 1; p <= maxP; p++) {
          let differList = []
          let a = p
          pdf1.getPage(a).then(page1=> {
            pdf2.getPage(a).then(page2=> {
              let viewport1 = page1.getViewport({scale})
              let viewport2 = page2.getViewport({scale})
              let shadowCanvas1 = document.createElement('canvas')
              let shadowCanvas2 = document.createElement('canvas')
              let shadowContext1 = shadowCanvas1.getContext('2d')
              let shadowContext2 = shadowCanvas2.getContext('2d')
              shadowCanvas1.width = viewport1.width
              shadowCanvas1.height = viewport1.height
              shadowCanvas2.width = viewport2.width
              shadowCanvas2.height = viewport2.height
              page1.render({
                canvasContext: shadowContext1,
                viewport: viewport1
              }).promise.then(() => {
                page2.render({
                  canvasContext: shadowContext2,
                  viewport: viewport2
                }).promise.then(() => {
                  if (_self.needAutoScale) {
                    _self.scale = _self.autoScale
                    _self.needAutoScale = false
                  }
                  _self.$nextTick(() => {
                      let imgData1 = shadowContext1.getImageData(0, 0, shadowCanvas1.width, shadowCanvas1.height)
                      let imgData2 = shadowContext2.getImageData(0, 0, shadowCanvas2.width, shadowCanvas2.height)
                      if (imgData1.width !== imgData2.width || imgData1.height !== imgData2.height) {
                        differList.push({
                          page: a,
                          startX: 0,
                          startY: 0,
                          endX: Math.min(imgData1.width, imgData2.width),
                          endY: Math.min(imgData1.height, imgData2.height),
                        })
                        _self.indifferList = _self.indifferList.concat(differList)
                      } else {
                        let width = imgData1.width
                        let height = imgData1.height
                        let pW = _self.accuracy // 每个对比格子的宽度
                        let pH = _self.accuracy // 每个对比格子的高度
                        let wCount = Math.ceil(width/pW)
                        let hCount = Math.ceil(height/pH)
                        let data1 = imgData1.data
                        let data2 = imgData2.data
                        let diffentData = []
                        for (let i = 0; i < wCount; i++) { // 将图片切割，精度由accuracy决定
                          for (let j = 0; j < hCount; j++) {
                            let sX = pW*i
                            let sY = pH*j
                            let eX = Math.min(pW*(i+1), width)
                            let eY = Math.min(pH*(j+1), height)
                            let jump = false // 控制循环跳出
                            for (let m = sX; m < eX; m++) {
                              if (jump) {
                                break
                              }
                              for (let n = sY; n < eY; n++) {
                                if (jump) {
                                  break
                                }
                                let k = 4*(n*width)+4*m
                                // 像素点值差>1认为是不同点
                                if (_self.isDifferentColor(data1, data2, k)) {
                                  if (!diffentData[i]){diffentData[i] = []}
                                  diffentData[i][j] = 1
                                  jump = true
                                }
                              }
                            }
                            if (!diffentData[i]){diffentData[i] = []}
                            if (!diffentData[i][j]){diffentData[i][j] = 0}
                          }
                        }
                        util.findAlllands(diffentData).map(item => {
                          differList.push({
                            page: a,
                            startX: item.minX*pW,
                            startY: item.minY*pH,
                            endX: Math.min((item.maxX+1)*pW, width),
                            endY: Math.min((item.maxY+1)*pH, height),
                          })
                        })
                        _self.indifferList = _self.indifferList.concat(
                          differList.filter(item => { // 过滤掉少于3个像素点差异的块
                            let ret = true
                            if (this.getDifferentNums(item.startX, item.startY, item.endX, item.endY, imgData1.width, data1, data2) < 10) {
                              ret = false
                            }
                            return ret
                          })
                        )
                      }

                      if (a == maxP) { // 当对比完最后一张时触发渲染差异点
                        if (p1Nums > maxP || p2Nums > maxP) {
                          let pdf = p1Nums > p2Nums ? pdf1 : pdf2
                          let pdfPN = Math.max(p1Nums , p2Nums)
                          for (let m = maxP+1; m<=pdfPN; m++) {
                            let k = m
                            pdf.getPage(k).then(page=> {
                              let viewport = page.getViewport({scale})
                              let shadowCanvas = document.createElement('canvas')
                              let shadowContext = shadowCanvas.getContext('2d')
                              shadowCanvas.width = viewport.width
                              shadowCanvas.height = viewport.height
                              page.render({
                                canvasContext: shadowContext,
                                viewport: viewport
                              }).promise.then(() => {
                                let imgData = shadowContext.getImageData(0, 0, shadowCanvas.width, shadowCanvas.height)
                                _self.indifferList.push({
                                  page: k,
                                  startX: 0,
                                  startY: 0,
                                  endX: imgData.width,
                                  endY: imgData.height,
                                })
                                if (k === pdfPN) {
                                  _self.drawingDiffImg(_self.indifferList)
                                }
                              })
                            })
                          }
                        }  else {
                          _self.drawingDiffImg(_self.indifferList)
                        }
                      }
                  })
                })
              })
            })
          })
      }
    },
    getDifferentNums (startX, startY, endX, endY, width, data1, data2) { // 获取该差异块区域内的差异像素点数目
      let ret = 0
      for (let i = startX; i<endX; i++) {
        for (let j = startY; j<endY; j++) {
          let k = 4*(j*width)+4*i
          if (this.isDifferentColor(data1, data2, k)) {
            ret++
          }
        }
      }
      return ret
    },
    focusToIndifferPoint (point, index) { // 聚焦到某一差异点
      this.diffPointIndex = index
      let needChangePage = point.page !== this.currentPage
      if (needChangePage) {
        // 手动触发pdf页绘制
        this.donNeedWatchcurrentPage = true
        this.currentPage = point.page

        // 定位到对应pdf页面
        // 重绘差异并着重当前定位差异点
        this.drawPdfPage(point.page, {
          data: point,
          index: index
        })
      } else {
        // 重绘差异并着重当前定位差异点
        this.drawingDiffImg(this.indifferList, {
          data: point,
          index: index
        })
      }

      // 将当前差异点移动至屏幕中央
      let scale = this.scale
      let baseContainer = this.$refs.baseContent
      let targetContainer = this.$refs.targetContent
      let pointCenterX = point.startX + (point.endX - point.startX)/2
      let pointCenterY = point.startY + (point.endY - point.startY)/2
      let containerWidth = this.$refs.baseContent.offsetWidth
      let containerHeight = this.$refs.baseContent.offsetHeight
      let newLeft = pointCenterX * scale - containerWidth/2
      let newTop = pointCenterY * scale - containerHeight/2
      let scrollLeftMax = baseContainer.scrollWidth - baseContainer.offsetWidth
      let scrollTopMax = baseContainer.scrollHeight - baseContainer.offsetHeight
      if (newLeft <= 0) {
        baseContainer.scrollLeft = 0
        targetContainer.scrollLeft = 0
      } else if (newLeft >= scrollLeftMax) {
        baseContainer.scrollLeft = scrollLeftMax
        targetContainer.scrollLeft = scrollLeftMax
      } else {
        baseContainer.scrollLeft = newLeft
        targetContainer.scrollLeft = newLeft
      }
      if (newTop <= 0) {
        baseContainer.scrollTop = 0
        targetContainer.scrollTop = 0
      } else if (newTop >= scrollTopMax) {
        baseContainer.scrollTop = scrollTopMax
        targetContainer.scrollTop = scrollTopMax
      } else {
        baseContainer.scrollTop = newTop
        targetContainer.scrollTop = newTop
      }
    },
    copyImageData (imgData) {
      return new ImageData(new Uint8ClampedArray(imgData.data), imgData.width, imgData.height)
    },
    loadData(file, container, dt) {
      dt.pdfLoad = false
      let _self = this
      let scale = _self.scale
      _self.loading.visible = true
      _self.loading.text = '文件读取中...'
      let reader = new FileReader()
      reader.readAsArrayBuffer(file)
      reader.onload = function () {
        _self.loading.text = '解析中...'
        pdfjsLib
          .getDocument(reader.result)
          .promise.then(pdf => {
            dt.pdf = pdf
            markRaw(pdf).getPage(_self.currentPage).then(page => {
              let viewport = page.getViewport({scale})
              if (!_self.autoScale) {
                let sc = 1
                let pdf1Dom = document.getElementById('pdf1Content')
                if (pdf1Dom && !isNaN(pdf1Dom.clientWidth) && !isNaN(viewport.width)) {
                  sc = pdf1Dom.clientWidth / viewport.width

                  // 限制自动缩放系数在 50%-400%之间
                  if (sc > 4) {
                    sc = 4
                  } else if (sc < 0.1) {
                    sc = 0.1
                  }
                }
                _self.autoScale = sc - 0.01
                _self.needAutoScale = true
              }
              container.width = viewport.width
              container.height = viewport.height
              container.style.width = viewport.width + 'px'
              container.style.height = viewport.height + 'px'
              viewport.viewBox = [0, 0, viewport.height, viewport.width]
              let shadowCanvas = document.createElement('canvas')
              let shadowContext = shadowCanvas.getContext('2d')
              shadowCanvas.width = viewport.width
              shadowCanvas.height = viewport.height
              page.render({
                canvasContext: shadowContext,
                viewport: viewport
              })
              .promise.then(() => {
                let imgData = shadowContext.getImageData(0, 0, shadowCanvas.width, shadowCanvas.height)
                let ctx = container.getContext('2d')
                ctx.putImageData(imgData, 0, 0)
                dt.canvas = container
                dt.data = _self.copyImageData(imgData)
                _self.loading.visible = false

                dt.pdfLoad = true
              })
            })
          })
      }
    },
    drawingClear () {
      let c1=document.getElementById("compare-base");
      let ctx1=c1.getContext("2d");
      let c2=document.getElementById("compare-target");
      let ctx2=c2.getContext("2d");
      // 清空绘制
      ctx1.clearRect(0, 0, ctx1.canvas.width, ctx1.canvas.height)
      ctx2.clearRect(0, 0, ctx2.canvas.width, ctx2.canvas.height)
      // 重绘pdf
      if (this.currentPage <= this.base.pdf.numPages) {
        ctx1.putImageData(this.base.data, 0, 0)
      }
      if (this.currentPage <= this.target.pdf.numPages) {
        ctx2.putImageData(this.target.data, 0, 0)
      }
    },
    drawingDiffImg (list, currentPoint) {
      let _self = this
      let scale = _self.scale
      let c1=document.getElementById("compare-base");
      let ctx1=c1.getContext("2d");
      let c2=document.getElementById("compare-target");
      let ctx2=c2.getContext("2d");
      let basePdfNum = _self.base.pdf.numPages
      let targetPdfNum = _self.target.pdf.numPages
      // 清空之前绘制
      _self.drawingClear()
      ctx1.lineWidth = '2'
      ctx1.strokeStyle = 'rgb(255,0,255,0.2)'
      ctx2.lineWidth = '2'
      ctx2.strokeStyle = 'rgb(255,0,255,0.2)'
      let fillStyle = 'rgb(255,0,255,0.2)'
      list.filter(item => {
        return item.page === _self.currentPage
      }).map(item => {
        let overNumber = list.filter(i => {
          return i.startX < item.startX && i.startY < item.startY && i.endX > item.endX && i.endY > item.endY
        }).length - 1
        if (overNumber) {
          fillStyle = `rgb(${overNumber*10},0,${255-overNumber*10},0.2)`
        }
        if (_self.currentPage <= basePdfNum) {
          ctx1.fillStyle = fillStyle
          ctx1.rect(item.startX * scale, item.startY * scale, (item.endX-item.startX) * scale, (item.endY-item.startY) * scale)
          ctx1.fillRect(item.startX * scale, item.startY * scale, (item.endX-item.startX) * scale, (item.endY-item.startY) * scale)
        }

        if (_self.currentPage <= targetPdfNum) {
          ctx2.fillStyle = fillStyle
          ctx2.rect(item.startX * scale, item.startY * scale, (item.endX-item.startX) * scale, (item.endY-item.startY) * scale)
          ctx2.fillRect(item.startX * scale, item.startY * scale, (item.endX-item.startX) * scale, (item.endY-item.startY) * scale)
        }
      })
      if (currentPoint) {
        let pointNumber = currentPoint.index // 差异点序号
        let point = currentPoint.data
        fillStyle = 'rgb(255,215,0,0.5)'

        if (_self.currentPage <= basePdfNum) {
          ctx1.lineWidth = '4'
          ctx1.strokeStyle = 'rgb(255,0,0,1)'
          ctx1.fillStyle = fillStyle
          ctx1.fillRect(point.startX * scale, point.startY * scale, (point.endX-point.startX) * scale, (point.endY-point.startY) * scale)
        }

        if (_self.currentPage <= targetPdfNum) {
          ctx2.lineWidth = '4'
          ctx2.strokeStyle = 'rgb(255,0,0,1)'
          ctx2.fillStyle = fillStyle
          ctx2.fillRect(point.startX * scale, point.startY * scale, (point.endX-point.startX) * scale, (point.endY-point.startY) * scale)
        }


        ctx1.fillStyle = 'rgb(255,0,0,1)'
        ctx2.fillStyle = 'rgb(255,0,0,1)'
        const showText = `差异点${pointNumber + 1}`
        let textX = point.startX
        let textY = point.startY < 24 ? point.endY+12 : (point.startY - 5)

        ctx1.fillText(showText, textX * scale, textY * scale)
        ctx2.fillText(showText, textX * scale, textY * scale)
      }
    },
    async drawPdfPage(pageNum, focusDiffData) {
      let _self = this
      let scale = _self.scale

      let basePdfNum = _self.base.pdf.numPages
      let targetPdfNum = _self.target.pdf.numPages
      _self.loading.visible = true
      _self.loading.text = '文件加载中...'
      await new Promise((resolve, reject) => {
        let basePdfLoadSuccess = false
        let targetPdfLoadSuccess = false
        if (_self.currentPage > basePdfNum) {
          let c=document.getElementById("compare-base");
          let ctx=c.getContext("2d");
          // 清空绘制
          ctx.fillStyle="#ffffff";
          ctx.fillRect(0,0,c.width,c.height)
          basePdfLoadSuccess = true
        } else {
          markRaw(_self.base.pdf).getPage(_self.currentPage).then(page => {
            let container = this.base.canvas
            let viewport = page.getViewport({scale})
            container.width = viewport.width
            container.height = viewport.height
            container.style.width = viewport.width + 'px'
            container.style.height = viewport.height + 'px'
            viewport.viewBox = [0, 0, viewport.height, viewport.width]
            let shadowCanvas = document.createElement('canvas')
            let shadowContext = shadowCanvas.getContext('2d')
            shadowCanvas.width = viewport.width
            shadowCanvas.height = viewport.height
            page.render({
              canvasContext: shadowContext,
              viewport: viewport
            }).promise.then(() => {
              console.time('rerender base')
              let imgData = shadowContext.getImageData(0, 0, shadowCanvas.width, shadowCanvas.height)
              container.getContext('2d').putImageData(imgData, 0, 0)
              _self.base.data = _self.copyImageData(imgData)

              basePdfLoadSuccess = true
              if (targetPdfLoadSuccess) {
                resolve()
              }
            })
          })
        }
        if (_self.currentPage > targetPdfNum) {
          let c=document.getElementById("compare-target");
          let ctx=c.getContext("2d");
          // 清空绘制
          ctx.fillStyle="#ffffff";
          ctx.fillRect(0,0,c.width,c.height)
          targetPdfLoadSuccess = true
        } else {
          markRaw(_self.target.pdf).getPage(_self.currentPage).then(page => {
            let container = _self.target.canvas
            let viewport = page.getViewport({scale})
            container.width = viewport.width
            container.height = viewport.height
            container.style.width = viewport.width + 'px'
            container.style.height = viewport.height + 'px'
            viewport.viewBox = [0, 0, viewport.height, viewport.width]
            let shadowCanvas = document.createElement('canvas')
            let shadowContext = shadowCanvas.getContext('2d')
            shadowCanvas.width = viewport.width
            shadowCanvas.height = viewport.height
            page.render({
              canvasContext: shadowContext,
              viewport: viewport
            }).promise.then(() => {
              console.time('rerender target')
              let imgData = shadowContext.getImageData(0, 0, shadowCanvas.width, shadowCanvas.height)
              container.getContext('2d').putImageData(imgData, 0, 0)
              _self.target.data = _self.copyImageData(imgData)

              targetPdfLoadSuccess = true
              if (basePdfLoadSuccess) {
                resolve()
              }
            })
          })
        }
      })

      _self.loading.visible = false
      _self.drawingDiffImg(_self.indifferList, focusDiffData)
    }
  },
  watch: {
    autoScale: {
      handler (val) {
        if (val) {
          this.scaleList[0].value = val
          this.$nextTick(() => {
            this.scaleList = this.scaleList.sort((a, b) => {
              return a.value - b.value
            })
          })
        }
      }
    },
    scale: { // 监听图纸缩放参数
      handler: function (val) {
        this.drawPdfPage(this.currentPage)
      }
    },
    baseData: {
      handler: function(data) {
        let _self = this
        if (data) {
          let name = data.name
          const baseFile = data //new File([data], name)
          _self.base.file = baseFile
          let container = document.querySelector('.compare-base')
          _self.loadData(baseFile, container, _self.base)
        }
      },
      immediate: true
    },
    targetData: {
      handler: function(data) {
        let _self = this
        if (data) {
          let name = data.name
          const targetFile = data //new File([data], name)
          _self.target.file = targetFile
          let container = document.querySelector('.compare-target')
          _self.loadData(targetFile, container, _self.target)
        }
      },
      immediate: true
    },
    'base.pdfLoad': { // 两张pdf加载完成后进行对比
      handler: function (val) {
        if (val) {
          if (this.target.pdfLoad) {
            setTimeout(() => {
              this.diff()
            }, 100)
          }
        }
      }
    },
    'target.pdfLoad': { // 两张pdf加载完成后进行对比
      handler: function (val) {
        if (val) {
          if (this.base.pdfLoad) {
            setTimeout(() => {
              this.diff()
            }, 100)
          }
        }
      }
    },
    currentPage (val) { // 监听当前页变化，重新渲染pdf及差异
      let _self = this
      if (val >= 1 && val <= this.pdfTotalPages) {
        if (_self.donNeedWatchcurrentPage) {
          _self.donNeedWatchcurrentPage = false
          return
        }
        _self.drawPdfPage(val)
      }
    }
  }
}
</script>
<style lang="less" scoped>
.diff_pdf{
  height: 100%;
  .left_pdf_show{
    height: 100%;
    float: left;
    width: calc(100% - 214px);
    border: solid 1px #d6d6d6;
    border-right: none;
    .pdf1_content{
      height: 100%;
      float: left;
      width: 50%;
      div{
        height: 100%;
        overflow: auto;
      }
    }
    .pdf2_content{
      height: 100%;
      float: left;
      width: 50%;
      div{
        height: 100%;
        overflow: auto;
      }
    }
  }
  .right_result_show{
    height: 100%;
    width: 200px;
    float: left;
    padding: 0px 2px;
    margin: 0px 2px;
    border: solid 1px #d6d6d6;
    box-shadow: 0 0 4px #d6d6d6;
    .title{
      height: 32px;
    }
    .diff_list{
      height: calc(100% - 96px);
      padding: 6px;
      .title {
        // padding: 6px;
      }
      .list{
        height: calc(100% - 28px);
        overflow: auto;
        padding: 6px 0px 6px 6px;
        span{
          display: block;
          cursor: pointer;
          &:hover {
            color: #3595db;
            background: #e4e4e4;
          }
          &.__active{
            color: #3595db;
          }
        }
      }
    }
    .page_num_manager{
      height: 24px;
      padding: 12px 0px;
      text-align: center;
      .page_num{
        width: 80px;
        display: inline-block;
      }
      .page_minus{
        color: #3595db;
        cursor: pointer;
      }
      .page_add{
        color: #3595db;
        cursor: pointer;
      }
    }
    .scale_manager{
      height: 36px;
      text-align: center;
      .select_scale{
        width: 80px;
      }
      .el-button{
        border-radius: 4px;
        width: 50px;
        height: 30px;
        line-height: 28px;
      }
    }
  }
  .compare-loading {
    position: absolute;
    top: e('calc(50% - 40px)');
    left: e('calc(50% - 240px)');
    width: 240px;
    height: 80px;
    background-color: rgb(50, 50, 50);
    opacity: 1;
    .compare-loading-inner {
      display: flex;
      height: 30px;
      line-height: 30px;
      margin-top: 25px;
      margin-left: 25px;
      .compare-loading-icon {
        margin-right: 20px;
      }
      .compare-loading-text {
        color: #fff;
      }
    }
  }
}
</style>
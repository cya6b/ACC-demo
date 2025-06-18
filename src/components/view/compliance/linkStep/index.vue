<template>
  <div class="link_step">
    <div class="top_header" v-if="inHandLinking">
      <div class="step_bar">
        <span class="step_num" :class="step === 1 ? 'active' : ''">1</span>
        <span class="step_text" :class="step === 1 ? 'active' : ''">选择对应图纸</span>
        <div class="line"></div>
        <span class="step_num" :class="step === 2 ? 'active' : ''">2</span>
        <span class="step_text" :class="step === 2 ? 'active' : ''">选择基准点</span>
        <div class="line"></div>
        <span class="step_num" :class="step === 3 ? 'active' : ''">3</span>
        <span class="step_text" :class="step === 3 ? 'active' : ''">检查并确定关系</span>
      </div>
    </div>
    <div class="top_header link" v-else-if="inAutoLinking">
      <span>
        <i class="gda_sdk_iconfont icon-zhinengguanlian-dengdai"></i>
        智能关联中，请等待；{{linkType.includes('hand') ? '若等不及，可点下方手动关联' : ''}}
      </span>
    </div>
    <div :class="`top_header info ${fail ? '__fail' : ''}`" v-else-if="(unstart || fail) && editable">
      <span v-if="unstart">
        请选择图纸
      </span>
      <span v-if="fail">
        <i class="fail_icon gda_sdk_iconfont icon-guanlianshibai"></i>
        智能关联失败{{linkType.includes('hand') ? '，试试手动关联' : ''}}
      </span>
    </div>
    <div class="center_content">
      <SelectDrawing v-if="showSelectDrawingBox" :dataList="selectDrawingList"
        :placeholder="'请选择图纸'"
        v-model="seletedDrawingToken"
        class="waitting_link_drawings_select"
        @selectedChange="selectedChange"></SelectDrawing>
      <slot name="content"></slot>
    </div>
    <div v-if="editable" class="footer">
      <hand-link-bar v-if="linkType == 'hand'"
        @starthandLink="starthandLink"
        :linkStatus="linkStatus"
        :disabled="disabled"
      ></hand-link-bar>
      <auto-link-bar v-else-if="linkType == 'auto'"
        @startSmartLink="startSmartLink"
        @endSmartLink="endSmartLink"
        :linkStatus="linkStatus"
        :disabled="disabled"
      ></auto-link-bar>
      <auto-and-hand-link-bar v-else
        @startSmartLink="startSmartLink"
        @starthandLink="starthandLink"
        @endSmartAndStarthandLink="endSmartAndStarthandLink"
        :linkStatus="linkStatus"
        :disabled="disabled"></auto-and-hand-link-bar>
      <div class="linking_step_opt" v-if="inHandLinking">
        <template v-if="step === 1">
          <el-button type="primary" @click="nextStep" :disabled="disabled">下一步</el-button>
        </template>
        <template v-if="step === 2">
          <el-button type="primary" @click="preStep">上一步</el-button>
          <el-button type="primary" @click="nextStep">下一步</el-button>
        </template>
        <template v-if="step === 3">
          <el-button type="primary" @click="preStep">上一步</el-button>
          <el-button type="primary" @click="handLinkConfirm">确定关联</el-button>
        </template>
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
const statusMap = {
  FAIL: 'fail',
  SUCCESS: 'success',
  UN_START: 'unstart',
  PROGRESS: 'progress'
}
import {ElButton, ElPopover} from "element-plus"
import util from '../../../../plugins/util.js'
import { ElMessage } from 'element-plus'

import AutoLinkBar from './bottomBar/autoLinkBar.vue'
import HandLinkBar from './bottomBar/handLinkBar.vue'
import AutoAndHandLinkBar from './bottomBar/autoAndHandLinkBar.vue'
import SelectDrawing from '../../components/Select.vue'
export default {
  components: {
    ElButton,
    AutoLinkBar,
    HandLinkBar,
    AutoAndHandLinkBar,
    SelectDrawing
  },
  data () {
    return {
      linkStatus: null,
      step: null,

      seletedDrawingToken: null,
      selectedDrawingData: null,
    }
  },
  props: {
    editable: {
      default: false,
      type: Boolean,
    },
    status: {
      defualt: 'unstart',
      type: Boolean,
    },
    linkType: {
      type: String,
      default: ''
    },
    disabled: {
      type: Boolean,
      default: false
    },

    secondDrawingToken: {
      type: String,
      default: null
    },
    waittingLinkdrawingList: {
      type: Array,
      default: []
    }
  },
  computed: {
    unstart () {
      return this.linkStatus === statusMap.UN_START
    },
    fail () {
      return this.linkStatus === statusMap.FAIL
    },
    inHandLinking () {
      return this.step > 0 && this.step < 4
    },
    inAutoLinking () {
      return this.linkStatus === statusMap.PROGRESS
    },
    inLinking () {
      return this.inAutoLinking || this.inHandLinking
    },

    showSelectDrawingBox () {
      let ret = false
      if (!this.selectDrawingList.length) {
        return ret
      }
      if (this.editable) {
        if (this.linkType.includes('auto') && this.linkType.includes('hand')) {
          if (!this.seletedDrawingToken) {
            ret = true
          }
          if (this.status == 'unstart') {
            ret = true
          }
          if (this.step === 1) {
            ret = true
          } else if (this.step && this.step > 1) {
            ret = false
          }
        } else if (this.linkType.includes('auto')) {
          if (!this.seletedDrawingToken) {
            ret = true
          }
        } else if (this.linkType.includes('hand')) {
          if (!this.seletedDrawingToken) {
            ret = true
          } else {
            if (this.step === 1) {
              ret = true
            } else {
              ret = false
            }
          }
        }
      }
      return ret
    },
    selectDrawingList () {
      let ret = []
      if (Array.isArray(this.waittingLinkdrawingList)) {
        ret = this.waittingLinkdrawingList.map(item => {
          return {
            ...item,
            key: item.token,
            label: item.name
          }
        })
      }
      return ret
    },
  },
  methods: {
    reInitData () {
      this.step = null
      this.linkStatus = this.status
    },
    // 校验图纸和视图是否均加载完成
    validDrawingAllLoaded () {
      let ret = false
      if (this.$parent) {
        ret = !this.$parent.linkDisabled
      }
      if (!ret) {
        ElMessage({
          type: 'warning',
          message: '请先选择图纸！'
        })
      }
      return ret
    },
    validStep2PointSelections () {
      // 校验选点
      let ret = false
      if (this.$parent && this.$parent.$refs.compViewRef) {
        let selectedPointsData = this.$parent.$refs.compViewRef.getSelectedPoints()
        if (selectedPointsData.firstPointsS.length === 2 && selectedPointsData.secondPointsS.length === 2) {
          ret = true
        }
      }

      if (!ret) {
        ElMessage({
          type: 'warning',
          message: '请先完成模型视图和平面视图对应两点的选择！'
        })
      }
      return ret
    },
    nextStep () {
      if (this.step == 1) {
        if (!this.validDrawingAllLoaded()) {
          return
        }
      }
      if (this.step == 2) {
        if (!this.validStep2PointSelections()) {
          return
        }
      }
      this.step++
    },
    preStep () {
      this.step--
    },
    handLinkConfirm () {
      this.$emit('handLinkSave', {
        drawingData: this.selectedDrawingData || this.$parent?.secondDrawing?.source,
        successCb: this.handLinkSaveSuccessCallBack,
        failCb: this.handLinkSaveFailCallBack,
        matric: this.matricCache,
        matricPoints: this.matricPointsCache
      })
    },
    handLinkSaveSuccessCallBack () {
      this.step = null
      this.linkStatus = statusMap.SUCCESS
    },
    handLinkSaveFailCallBack () {
      // ElMessage({
      //   type: 'error',
      //   message: '“确认关联”保存失败！'
      // })
    },
    starthandLink () {
      this.setMatric(null)
      this.step = 1
    },
    startSmartLink () {
      this.linkStatus = statusMap.PROGRESS
      this.$emit('smartLink', {
        drawingData: this.selectedDrawingData || this.$parent?.secondDrawing?.source,
        successCb: this.smartLinkSuccessCallBack,
        failCb: this.smartLinkFailCallBack
      })
    },
    smartLinkSuccessCallBack (res) {
      if (res.matric) {
        this.setMatric(res.matric)
      }
      this.linkStatus = statusMap.SUCCESS
      this.step = null
    },
    smartLinkFailCallBack (res) {
      this.linkStatus = statusMap.FAIL
      this.step = null
    },
    endSmartLink () {
      this.linkStatus = statusMap.UN_START
    },
    endSmartAndStarthandLink () {
      this.endSmartLink()
      this.starthandLink()
    },
    setMatric (val) {
      this.$parent.setMatric(val)
    },

    selectedChange (val) {
      if (val) {
        let d = this.selectDrawingList.find(item => {
          return item.token === val
        })
        if (d) {
          this.$parent?.drawingSelectedCallBack && this.$parent?.drawingSelectedCallBack(d)
        }
      }
    },
  },
  watch: {
    secondDrawingToken: {
      handler (val) {
        this.seletedDrawingToken = val
      },
    },
    seletedDrawingToken: {
      handler (val) {
        this.$emit('update:secondDrawingToken', val)

        let d = (this.selectDrawingList || []).find(item => {
          return item.token === val
        })
        if (d) {
          this.selectedDrawingData = d
        }
      },
      immediate: true
    },
    inLinking: {
      handler (val) {
        this.$emit('update:inLinking', val)
      }
    },
    status: {
      handler (val) {
        this.linkStatus = val
      },
      immediate: true
    },
    step: {
      handler (val, oldV) {
        this.$emit('stepChenge', val)
        if (val == 1) {
          this.$parent.startSelectDrawing && this.$parent.startSelectDrawing()
        }

        if (val == 2) {
          this.$parent.endSelectDrawing && this.$parent.endSelectDrawing()
          this.setMatric(null)
          this.$nextTick(() => {
            this.$parent && this.$parent.$refs.compViewRef && this.$parent.$refs.compViewRef.startSelectPoint()
          })
        } else if (oldV == 2) {
          this.$parent && this.$parent.$refs.compViewRef && this.$parent.$refs.compViewRef.cancelSelectPoint()
        }

        if (val == 3) {
          if (this.$parent.$refs.compViewRef) {
            let selectedPointsData = this.$parent.$refs.compViewRef.getSelectedPoints()
            let points = [
              ...selectedPointsData.secondPointsS,
              ...selectedPointsData.firstPointsS,
            ]
            if (points.length > 3) {
              let dataArr = points
                .map((item) => {
                  return [item.x, item.y]
                })
                .flat(Infinity)
              let matric = JSON.stringify(util.getMatric4Data(dataArr).flat())
              this.matricCache = matric
              this.matricPointsCache = {
                drawingPoints: [
                  selectedPointsData.secondPointsS[0].x,
                  selectedPointsData.secondPointsS[0].y,
                  selectedPointsData.secondPointsS[1].x,
                  selectedPointsData.secondPointsS[1].y
                ],
                sheetPoints: [
                  selectedPointsData.firstPointsS[0].x,
                  selectedPointsData.firstPointsS[0].y,
                  selectedPointsData.firstPointsS[1].x,
                  selectedPointsData.firstPointsS[1].y
                ]
              }
              this.setMatric(matric)
            }
          }
        }
      },
      immediate: true
    }
  }
}
</script>

<style lang="less" scoped>
.link_step{
  height: 100%;
  display: flex;
  flex-direction: column;
  .top_header{
    height: 48px;
    .step_bar {
      width: 100%;
      height: 48px;
      z-index: 10;
      text-align: center;
      line-height: 48px;
      color: #d1d1d1;
      background-color: #18181e;

      .line {
        display: inline-block;
        height: 1px;
        width: 36px;
        vertical-align: middle;
        margin-left: 12px;
        margin-right: 12px;
        background-color: #545664;
      }

      .step_num {
        width: 20px;
        height: 20px;
        display: inline-block;
        border-radius: 50%;
        line-height: 20px;
        vertical-align: text-bottom;
        background-color: #363842;

        &.active {
          background-color: #126bff;
          color: #fff;
        }
      }

      .step_text {
        &.active {
          color: #126bff;
        }
      }
    }

    .fail_icon{
      font-size: 30px;
      margin-right: 10px;
    }
  }
  .top_header.link{
    color: #fff;
    background: rgb(9, 31, 74);
    i {
      font-size: 30px;
      margin-right: 10px;
    }
    span {
      line-height: 48px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 14px;
    }
  }

  .top_header.info{
    color: #fff;
    background-color: #18181e;
    span {
      line-height: 48px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 14px;
    }
  }

  .top_header.info.__fail{
    background: #451818;
  }
  .center_content{
    position: relative;
    flex-grow: 1;
    height: 80%;
  }
  .footer{
    border-top: 1px solid #626060;
    background: rgb(50, 50, 55);
    height: 50px;
    line-height: 50px;
    text-align: center;
    position: relative;
    .linking_step_opt{
      background: rgb(50, 50, 55);
      width: 100%;
      height: 100%;
      position: absolute;
      top: 0px;
    }
  }

  .waitting_link_drawings_select{
    position: absolute;
    top: 12px;
    right: 24px;
    z-index: 9;
    height: 30px;
    width: 47%;

    padding: 5px 6px;
    background: #282a34;
    box-shadow: 0 0 2px 2px rgba(0,0,0,.05);
    border-radius: 2px;

    :deep(.content){
      height: 30px;
      line-height: 28px;
      color: #fff !important;
      background-color: #18181e;
      border: 1px solid #545664;
      box-sizing: border-box;
      border-radius: 2px;
    }
    :deep(.dropdown_box.__open){
      border-radius: 4px;
      left: 0px;
      top: 44px;

      .dropdown_box_item{
        height: 32px;
        line-height: 32px;
      }
    }
  }
}

</style>
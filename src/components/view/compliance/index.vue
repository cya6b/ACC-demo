<!--  相符性--图纸叠加 -->
<template>
  <div :class="`__gda_sdk model_compliance ${link.editable ? '__hide_markup_pen' : ''}`">
    <component :is="componentName" ref="linkStepRef"
      :editable="link.editable"
      :disabled="linkDisabled"
      :status="link.status"
      :linkType="linkType"
      :inLinking.sync="link.inLinking"
      @smartLink="smartLink"
      @handLinkSave="handLinkSave"
      @stepChenge="val => link.currentLinkStep = val"
      :secondDrawingToken.sync="secondDrawing.source.token"
      :secondDrawingLoaded="secondDrawing.loaded"
      :waittingLinkdrawingList="link.waittingLinkdrawingList">
      <template #content>
        <CompView
          ref="compViewRef"
          :inLinking="link.inLinking"
          :firstData="firstDrawing"
          :secondData="secondDrawing"
          @changeFirstDrawingLoaded="val => { firstDrawing.loaded = val }"
          @changeSecondDrawingLoaded="val => { secondDrawing.loaded = val }"
          :matricData="link.matric"
          :showQiehuanmoxingBtn="!link.editable"
          :bimfaceHost="bimfaceHost"
          :afterLoad="viewLoaded"
          @foldOrSplitChanged="foldOrSplitChanged"
          :hideAnnotBar="link.editable"></CompView>
      </template>
    </component>
  </div>
</template>
<script>
/* Copyright (C) <1998-2024> Glodon Company Limited
 * Licensed under the MIT License
 * Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the “Software”), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
 * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
 * THE SOFTWARE IS PROVIDED “AS IS”, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */
import LinkStep from './linkStep/index.vue'
import LinkStepV2 from './linkStepV2/index.vue'
import CompView from './compView.vue'
export default {
  components: {
    LinkStep,
    LinkStepV2,
    CompView
  },
  data () {
    return {
      firstDrawing: {
        source: {
          type: "", // model2d, modelsheet
          token: null,
          sheetId: null // type 为 modelsheet 时 必需
        },
        viewer: null,
        loaded: false,
      },
      secondDrawing: {
        source: {
          type: "", // model2d, modelsheet, model3d
          token: null,
          sheetId: null // type 为 modelsheet 时 必需
        },
        viewer: null,
        loaded: false
      },
      link: {
        currentLinkStep: null,
        editable: false,
        inLinking: false, // 是否关联中
        status: 'unstart', // 对齐操作编辑状态 unstart, padding, finish
        matric: null, // 图纸叠加时的坐标变换矩阵
        waittingLinkdrawingList: [] // 待关联的图纸列表
      },

      event: {
        startSelectDrawingEvent: null,
        endSelectDrawingEvent: null,
        handlinkConfirmEvent: null,
        smartLinkEvent: null,
        annotDrawingSavedEvent: null,
        splitOrFoldChangedEvent: null,
        walkthroughDataChangedEvent: null
      }
    }
  },
  props: {
    bimfaceHost: {
      type: String,
      default: "https://static.bimface.com",
    },
    source: {
      type: Object
    },
    editable: {
      type: Boolean,
      default: false
    },
    afterLoad: {
      type: Function
    },
    loadChanged: {
      type: Function
    },
    linkType: { // hand | auto | auto&hand | handV2 | auto&handV2
      type: String,
      default: 'auto&hand'
    }
  },
  computed: {
    linkDisabled () {
      return !this.firstDrawing.loaded || !this.secondDrawing.loaded
    },
    componentName () {
      let ret = 'LinkStep'
      if (typeof this.linkType == 'string' && this.linkType.includes('handV2')) {
        ret = 'LinkStepV2'
      }
      return ret
    }
  },
  watch: {
    source: {
      handler (val) {
        if (val) {
          this.setSourceData(val)
        }
      },
      immediate: true,
      deep: true
    },
    'firstDrawing.source.sheetId': {
      handler (val) {
        if (!this.fold) { // 分屏时刷新单图
          this.loadFirstW()
        } else {
          this.loadSetW()
        }
      }
    },
    'firstDrawing.source.token': {
      handler (val) {
        if (!this.fold) { // 分屏时刷新单图
          this.loadFirstW()
        } else {
          this.loadSetW()
        }
      }
    },
    'secondDrawing.source.token': {
      handler (val) {
        if (!this.fold) {  // 分屏时刷新单图
          this.loadSecondW()
        } else {
          this.loadSetW()
        }
      }
    },
    editable: {
      handler (val) {
        this.setEditable(val)
      },
      immediate: true
    }
  },
  methods: {
    viewLoaded () {
      if (this.reloadCallBack) {
        this.reloadCallBack(this)
        this.reloadCallBack = null
      }
      if (this.afterLoad && !this.afterLoadHasRun) {
        this.afterLoad(this)
        this.afterLoadHasRun = true
      }

      if (this.loadChanged) {
        this.loadChanged(this)
      }

      if (this.event.splitOrFoldChangedEvent) {
        let v = {
          status: this.$refs?.compViewRef?.fold ? 'fold' : 'split'
        }
        this.event.splitOrFoldChangedEvent(v)
      }

      // 切换显示模式后重新绑定监听
      if (this.event.annotDrawingSavedEvent) {
        this.getMainModel()?.addEventListener('annotDrawingSavedEvent', this.event.annotDrawingSavedEvent)
      }

      if (this.event.walkthroughDataChangedEvent) {
        this.$refs.compViewRef?.firstDrawing?.viewer?.addEventListener('walkthroughDataChangedEvent', this.event.walkthroughDataChangedEvent)
      }
    },
    getMainModel () {
      if (this.$refs.compViewRef) {
        return this.$refs.compViewRef.getMarkupOptModel()
      }
      return null
    },
    getDrawingModel () {
      if (this.$refs.compViewRef) {
        return this.$refs.compViewRef.getDrawingModel()
      }
      return null
    },
    getLinkMatric () {
      if (this.link.matric) {
        if (typeof this.link.matric === 'string') {
          return this.link.matric
        } else {
          return JSON.parse(JSON.stringify(this.link.matric))
        }
      }
      return null
    },
    setEditable (val) {
      this.link.editable = !!val
    },
    setMatric (val) {
      this.link.matric = val
    },
    setSourceData (val) {
      // 视图数据
      if (val.firstDrawing) {
        if (this.firstDrawing.viewer && this.firstDrawing?.source?.token !== val.firstDrawing?.source?.token) {
          this.firstDrawing.viewer = null
          this.firstDrawing.loaded = false
        }
        this.firstDrawing.source = val.firstDrawing.source || {}
        this.firstDrawing.config = val.firstDrawing.config || {}
      } else {
        this.firstDrawing.source = {}
      }
      // 图纸数据
      if (val.secondDrawing) {
        if (this.secondDrawing.viewer && this.secondDrawing?.source?.token !== val.secondDrawing?.source?.token) {
          this.secondDrawing.viewer = null
          this.secondDrawing.loaded = false
        }
        this.secondDrawing.source = val.secondDrawing.source || {}
        this.secondDrawing.config = val.secondDrawing.config || {}
      } else {
        this.secondDrawing.source = {}
      }
      // 叠图坐标转换矩阵
      this.setMatric(val.matric)

      // 待关联的图纸列表
      this.link.waittingLinkdrawingList = val.waittingLinkdrawingList || []

      this.reInitData(val)
    },
    reInitData (val) {
      // 初始化关联步骤条数据
      if (this.$refs.linkStepRef) {
        this.$refs.linkStepRef.reInitData && this.$refs.linkStepRef.reInitData()
      }
      // 初始化关联状态
      let linkStatus = 'unstart'
      if (val.matric) {
        linkStatus = 'success'
      } else {
        if (this.linkType.includes('auto')) {
          // 存在关联状态数据，直接使用
          if (val.autoLinkStatus) {
            if (val.autoLinkStatus == '1') {
              linkStatus = 'progress'
            } else if (val.autoLinkStatus == '-1') {
              linkStatus = 'fail'
            } else if (val.autoLinkStatus == '0') {
              linkStatus = 'unstart'
            }
          } else { // 根据图纸数据自行判断补偿
            if (val.firstDrawing?.source && val.secondDrawing?.source) {
              linkStatus = 'fail'
            } else if (!val?.secondDrawing?.source) {
              linkStatus = 'unstart'
            }
          }
        }
      }

      this.link.status = linkStatus
      this.link.inLinking = linkStatus === 'progress'

      // 初始化图纸模型展示
      if (this.$refs.compViewRef) {
        this.$refs.compViewRef.reInitData && this.$refs.compViewRef.reInitData()
      }

      // 触发自定义文件选择 --后续废弃
      if(!val.matric && !val.secondDrawing?.source) {
        this.startSelectDrawing()
      } else {
        this.endSelectDrawing()
      }
    },
    loadFirstW () {

    },
    loadSecondW () {

    },

    loadSetW () {

    },

    smartLink (data) {
      if (this.event.smartLinkEvent) {
        this.event.smartLinkEvent(data)
      } else {
        console.error(new Error('未定义智能关联方法：smartLinkEvent'))
      }
    },

    handLinkSave (data) {
      if (this.event.handlinkConfirmEvent) {
        this.event.handlinkConfirmEvent(data)
      } else {
        console.error(new Error('未定义手动关联结果保存方法：handlinkConfirmEvent'))
      }
    },

    drawingSelectedCallBack (d) {
      if (this.secondDrawing?.source?.token !== d?.token) {
        this.secondDrawing.source = d
        this.secondDrawing.loaded = false
      }
    },

    startSelectDrawing () {
      if (this.editable && this.event.startSelectDrawingEvent) {
        this.event.startSelectDrawingEvent(this.drawingSelectedCallBack)
      }
    },
    endSelectDrawing () {
      if (this.event.endSelectDrawingEvent) {
        this.event.endSelectDrawingEvent()
      }
    },

    reload (source, callBack) {
      this.setSourceData(source)
      if (callBack) {
        this.reloadCallBack = callBack
      }
    },

    addEventListener (type, listener) {
      switch (type) {
      case 'startSelectDrawingEvent': {
        this.event.startSelectDrawingEvent = listener
        break;
      }
      case 'endSelectDrawingEvent': {
        this.event.endSelectDrawingEvent = listener
        break;
      }
      case 'handlinkConfirmEvent': {
        this.event.handlinkConfirmEvent = listener
        break;
      }
      case 'smartLinkEvent': {
        this.event.smartLinkEvent = listener
        break;
      }
      case 'annotDrawingSavedEvent': {
        this.event.annotDrawingSavedEvent = listener
        this.getMainModel().addEventListener('annotDrawingSavedEvent', listener)
        break;
      }
      case 'splitOrFoldChangedEvent': {
        this.event.splitOrFoldChangedEvent = listener
      }
      case 'walkthroughDataChangedEvent': {
        this.event.walkthroughDataChangedEvent = listener
      }
      default: {
      }
    }
    },

    foldOrSplitChanged (data) {
      if (this.event.splitOrFoldChangedEvent) {
        this.event.splitOrFoldChangedEvent(data)
      }
    },

    getModelPositionByViewPosition (position) {
      return this.$refs.compViewRef.getModelPositionByViewPosition(position)
    },

    clearAllMarkups () {
      let mainModel = this.getMainModel()
      if (mainModel) {
        mainModel.clearAllMarkups && mainModel.clearAllMarkups()
      }
    },
  },
}
</script>

<style lang="less" scoped>
.model_compliance{
  height: 100%;
  width: 100%;
  position: relative;
  .model_view_box{
    width: 50%;
    height: 100%;
  }
  .model_set_view_box{
    width: 100%;
    height: 100%;
  }
  .model_split_view_box{
    display: flex;
  }
}

.trigger {
  position: absolute;
  top: 12px;
  right: 78px;

  width: 150px;
  height: 40px;
  line-height: 40px;
  background-color: rgba(24, 24, 30, 1);
  z-index: 8;
  display: flex;
  position: absolute;
  text-align: center;
  cursor: pointer;
  font-size: 14px;
  transition: right 100ms;

  .trigger_item {
    display: inline-block;
    width: 50%;
    border: 1px solid rgba(84, 86, 100, 1);
    border-radius: 2px;
  }

  .active {
    background-color: rgba(54, 56, 66, 1);
  }
}
</style>
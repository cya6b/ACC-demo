<template>
  <!-- 截图器 -->
  <div class="screen_shot_wrap">
    <span class="label">批注截图</span>
    <div class="shot_list">
      <div v-if="editable" class="annotation-div" @click.stop="addScreenShotBtnClick">
        <i class="gda_sdk_iconfont icon-a-Frame add_txt"></i>
      </div>
      <div v-for="(item,index) in shotList" :key="index" :class="`annotation-div ${activeItemIndex == index ? '__active' : ''}`">
        <CloseIcon v-if="editable" class="close_icon" @click.stop="removeItem(item, index)"></CloseIcon>
        <img :src="item.imgUrl" alt="截图" @click="active(index)" class="annotation-img"/>
      </div>

      <div class="img_empty" v-if="!editable && !shotList.length">
        <i class="gda_sdk_iconfont icon-kong empty_icon"></i>
        <span class="txt">无数据</span>
      </div>
    </div>
  </div>
</template>

<script>
import {Close as CloseIcon} from '@element-plus/icons'
import Uploader from "../../../../../Upload/index.js"

import util from '../../../../../../../plugins/util.js'
export default {
  components: {CloseIcon},
  props: {
    editable: {
      type: Boolean,
      default: true
    }
  },
  data () {
    return {
      activeItemIndex: null,
      shotList: []
    }
  },
  inject: ["outerChin", "opinionDetailData", "openAddBoxHandle", "getOptView", 'rewriteInterfaces'],
  created () {
    this.initAnnotSavedListener()
    this.initAnnotCancelListener()

    this.initImgData()

    this.hideSplitFoldTrigger()
  },
  methods: {
    setShotsData (data) {
      if (Array.isArray(data)) {
        this.shotList = data
      }
    },
    initImgData () {
      if (typeof this.opinionDetailData == 'function' && this.opinionDetailData()) {
        this.shotList = [].concat(this.opinionDetailData().crops || []) || []
      }
    },

    initAnnotSavedListener () {
      const _this = this
      if (this.outerChin) {
        let optView = this.getOptView()
        if (optView) {
          optView.addEventListener('annotDrawingSavedEvent', (val) => {
            optView.snapshot(null, (shotData) => {
              if (shotData && _this.editable) {
                _this.addOrUpdateScreenShot({
                  xdata: val,
                  shotImgUrl: shotData.img
                }, _this.activeItemIndex)
              }
            })
          })
        }
      }
    },
    initAnnotCancelListener () {
      const _this = this
      if (this.outerChin) {
        let optView = this.getOptView()
        if (optView) {
          optView.addEventListener('annotDrawingCancelEvent', () => {
            _this.activeItemIndex = null
          })
        }
      }
    },
    getScreenShotData () {
      return this.shotList
    },
    removeItem (item, itemIndex) {
      this.shotList.splice(itemIndex, 1)

      if (this.activeItemIndex === itemIndex) {
        this.activeItemIndex = null
      }
    },
    active (index) {
      if (this.activeItemIndex === index) {
        this.activeItemIndex = null
      } else {
        this.activeItemIndex = index
      }
    },

    addScreenShotBtnClick () {
      this.activeItemIndex = null

      const _this = this
      this.$nextTick(() => {
        _this.startAnnot()
      })
    },

    startAnnot () {
      let optView = this.getOptView()
      if (optView && optView.startAnnot) {
        optView.startAnnot()
      }

      if (this.openAddBoxHandle) {
        this.openAddBoxHandle()
      }
    },

    cancelAnnot () {
      let optView = this.getOptView()
      if (optView && optView.startAnnot) {
        optView.cancelAnnot()
      }
    },

    async addOrUpdateScreenShot (shotData, index = null) {
      if (!shotData) {
        return
      }
      let uploadInfoUrl = '/suggestion/space/getFileUploadUrl'
      let file = util.dataURLtoFile(shotData.shotImgUrl, '截图')
      if (this.rewriteInterfaces?.screenShotImgUploadFunc) {
        this.rewriteInterfaces.screenShotImgUploadFunc(file).then(res => {
          if (res.data.code === 'SUCCESS') {
            let detail = res.data.detail
            let shotItem = {
                xdata: shotData.xdata,
                imgUrl: shotData.shotImgUrl,
                fileKey: detail.fileId,
                fileName: detail.fileName,
              }
            if (index !== null) {
              this.shotList.splice(index, 1, shotItem)
            } else {
              this.shotList.push(shotItem)
            }
          }
        })
      } else {
        const uploadRes = await Uploader.upload({file, uploadInfoUrl})
        let shotItem = {
            xdata: shotData.xdata,
            imgUrl: shotData.shotImgUrl,
            fileKey: uploadRes.objectKey,
            fileName: uploadRes.objectName,
          }
        if (index !== null) {
          this.shotList.splice(index, 1, shotItem)
        } else {
          this.shotList.push(shotItem)
        }
      }

      this.activeItemIndex = null
    },

    clearAnnotData () {
      let optView = this.getOptView()
      if (!optView) {
        return
      }

      optView.getMarkupPoolTool().removeAll()
    },

    drawAnnotationData (xdata) {
      if (!xdata) {
        return
      }
      let optView = this.getOptView()
      if (!optView) {
        return
      }
      // 清空批注
      optView.getMarkupPoolTool().removeAll()

      let tempArr = xdata.split('&&&&')
      let ann = JSON.parse(tempArr[0])
      let state = null
      if (tempArr.length > 1) {
        state = JSON.parse(tempArr[1])
      }
      if (state) {
        optView.getMarkupPoolTool().reBackState({state, annotationList: ann})
      } else {
        optView.getMarkupPoolTool().reBackState(xdata)
      }

      util.windowResize()
    },

    hideSplitFoldTrigger () {
      let splitFoldTriggerDom = document.getElementsByClassName('split_fold_trigger')
      if (splitFoldTriggerDom[0]) {
        splitFoldTriggerDom[0].style.visibility = 'hidden'
        this.hasHidesplitFoldTrigger = true
      }
    },
    showSplitFoldTrigger () {
      let splitFoldTriggerDom = document.getElementsByClassName('split_fold_trigger')
      if (splitFoldTriggerDom[0]) {
        splitFoldTriggerDom[0].style.visibility = 'visible'
        this.hasHidesplitFoldTrigger = false
      }
    }
  },
  watch: {
    activeItemIndex: {
      handler (val) {
        if(val == null) {
          // 取消批注
          this.clearAnnotData()
          this.cancelAnnot()
        } else {
          // 绘制当前活跃状态的批注
          let shotData = this.shotList[val]
          if (shotData) {
            this.drawAnnotationData(shotData.xdata)
          }
          // 若当前为编辑，打开批注编辑工具
          if (this.editable) {
            this.startAnnot()
          }
        }
      }
    },
    getOptView: {
      handler (val) {
        if (val) {
          this.initAnnotSavedListener()
        }
      },
      deep: true
    }
  },

  beforeUnmount () {
    this.activeItemIndex = null

    // 取消批注
    this.clearAnnotData()
    this.cancelAnnot()

    if (this.hasHidesplitFoldTrigger) {
      this.showSplitFoldTrigger()
    }
  },

  deactivated () {
    this.activeItemIndex = null

    // 取消批注
    this.clearAnnotData()
    this.cancelAnnot()

    if (this.hasHidesplitFoldTrigger) {
      this.showSplitFoldTrigger()
    }
  }
}
</script>

<style lang="less" scoped>
.screen_shot_wrap{
  .label{
    display: inline-block;
    margin-bottom: 8px;
    line-height: 22px;
  }
  
  .shot_list{
    display: flex;
    flex-wrap: wrap;

    .annotation-div {
      border: 1px solid #D1D1D1;
      border-radius: 2px;
      width: 120px;
      height: 120px;
      position: relative;
      margin-bottom: 8px;
      margin-right: 8px;

      &:hover {
        transform: scale(1.03, 1.03);
      }

      .add_txt{
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translateX(-50%) translateY(-50%);
        text-wrap: nowrap;
        font-size: 32px;

        cursor: pointer;
      }

      .close_icon{
        position: absolute;
        right: 0px;
        width: 24px;
        margin-right: 6px;
        cursor: pointer;
        &:hover{
          color: red;
        }
      }

      .annotation-img{
        width: 100%;
        height: 100%;
      }
    }

    .annotation-div.__active{
      border: 1px solid #0767b3;
    }

    .img_empty{
      text-align: center;

      .empty_icon{
        font-size: 32px;
      }

      .txt{
        display: block;
      }
    }
  }
}
</style>
<template>
  <div style="display:flex;width:100%;height:100%">
    <div class="drawing_container" :style="showSide? 'width: calc(100% - 480px)' : 'width: 100%'">
      <review ref="reviewRef" :source="source" :afterLoad="reviewLoaded"></review>
      <span @click="openOrCloseOpinionListBox" class="list_btn opt_btn">智能意見</span>
    </div>

    <div v-if="showSide" style="width:480px;height:100%">
      <review-result v-if="showAiResList" class="item" ref="opinionListBox"
        modeType="Compliance"
        :show-download-report="true"
        :editable="true"
        :sourceData="aiReviewOpinionData"
        :outerChin="$refs.reviewRef"
        :closeHandle="openOrCloseOpinionListBox"
        :downloadReportClickHandle="downloadReportClickHandle"></review-result>
    </div>
  </div>
</template>

<script>
import Review from '../../components/view/Review.vue';
import ReviewResult from '../../components/view/aiRes/ReviewResult.vue'
import aiReviewOpinionData from '../scene/htmlTemplate/singleModelReviewOpinionData.js'

import api from '../preview/api'
const tokenSource = {
  containerId: 773678608302080,
  sourceFileId: null
}
let drawingFileId = '782015083651072'
let modelFileId = '783944475590656'

export default {
  components: { Review, ReviewResult },
  data () {
    return {
      currentTargetType: this.$route.query.targetType || 'model',
      tokenSource,
      showAiResList: false,
      source: {
        main: {
          source: {
            type: "model3d",
            token: ""
          }
        }
      },
      aiReviewOpinionData: {
        ...aiReviewOpinionData,
        tagsList: [
          '通用', '消防', '给水', '排水', '循环水', '室外给排水', '雨控',
  '通风', '供暖', '空调', '动力', '强电', '弱电', '人防', '节能',
  '无障碍', '防水', '防潮', '绿建', '景观', '安全', '品质', '规划'
        ]
      }
    }
  },
  async created () {
    this.initData ()
    let res = await this.getSourceToken()
    res.forEach((r, rIndex) => {
      if (r.viewToken) {
        this.source.main.source.token = r.viewToken
      }
    })
  },
  computed: {
    showSide () {
      return this.showAiResList
    }
  },
  methods: {
    downloadReportClickHandle () {
      alert('下载报告')
    },
    initData () {
      // 初始化图纸
      let fId = drawingFileId
      if (this.currentTargetType === 'model') {
        fId = modelFileId
      }
      this.tokenSource.sourceFileId = [fId]
    },
    getSourceToken () {
      return new Promise((resolve, reject) => {
        let source = this.tokenSource
        if (!source || !source.sourceFileId) {
          resolve()
        } else {
          let promiseList = []
          source.sourceFileId.forEach(f => {
            promiseList.push(
              new Promise ((resolve) => {
                api.getViewToken({
                  containerId: source.containerId,
                  fileId: f,
                  viewTokenType: 'CONVERT'
                }).then(res => {
                  if (res.data.code === 'SUCCESS') {
                    resolve(res.data.detail)
                  }
                })
              }))
          })
          Promise.all(promiseList).then(res => {
            resolve(res)
          })
        }
      })
    },

    openOrCloseOpinionListBox () {
      this.showAiResList = !this.showAiResList
    },
  }
}
</script>

<style lang="less" scoped>
.drawing_container{
  position: relative;
  
  .opt_btn {
    z-index: 9;
    background: #282a34;
    color: #fff;
    width: 16px;
    padding: 12px;
    cursor: pointer;
  }
  .list_btn{
    position: absolute;
    top: 12px;
    right: 4px;
  }
}
</style>
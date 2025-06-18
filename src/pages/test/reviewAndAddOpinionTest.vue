<template>
  <div style="display:flex;width:100%;height:100%">
    <div class="drawing_container" :style="showSide? 'width: calc(100% - 480px)' : 'width: 100%'">
      <compliance ref="reviewRef" v-if="currentTargetType == 'view'" :source="complianceSource" :editable="false" :loadChanged="reviewLoaded"></compliance>
      <review v-else ref="reviewRef" :source="source" :afterLoad="reviewLoaded"></review>
      <span @click="openAddOpinionBox" class="add_btn opt_btn">添加意见</span>
      <span @click="openOpinionListBox" class="list_btn opt_btn">意见列表</span>
    </div>

    <div v-if="showSide" style="width:480px;height:100%">
      <add-opinion-box v-if="showAdd" class="item" :affiliation="affiliation" :outerChin="$refs.reviewRef"
      :closeHandle="closeAddOpinionBox"></add-opinion-box>

      <opinion-list-box v-if="showList" class="item" ref="opinionListBox"
        :editable="true" :affiliation="affiliation" :outerChin="$refs.reviewRef"
        :closeHandle="closeOpinionListBox"></opinion-list-box>
    </div>
  </div>

  <!-- 切换 -->
  <div class="change_targetType">
    <span @click="changeTargetType('draw')" :class="currentTargetType == 'draw' ? '__active' : ''">设计质量-图纸</span>
    <span @click="changeTargetType('model')" :class="currentTargetType == 'model' ? '__active' : ''">设计质量-模型</span>
    <span @click="changeTargetType('view')" :class="currentTargetType == 'view' ? '__active' : ''">模型质量</span>
  </div>

  <div class="change_reviewProgress">
    <span @click="changeReviewProgress('REVIEW')" :class="affiliation.reviewProgress == 'REVIEW' ? '__active' : ''">审查</span>
    <span @click="changeReviewProgress('AUDIT')" :class="affiliation.reviewProgress == 'AUDIT' ? '__active' : ''">审定</span>
    <span @click="changeReviewProgress('FINAL')" :class="affiliation.reviewProgress == 'FINAL' ? '__active' : ''">汇总</span>
  </div>
</template>

<script>
import Review from '../../components/view/Review.vue';
import Compliance from '../../components/view/compliance/index.vue';
import AddOpinionBox from '../../components/service/opinionManagent/AddOpinionBox.vue';
import OpinionListBox from '../../components/service/opinionManagent/OpinionListBox.vue'

import api from '../preview/api'
import util from '../../plugins/util.js'
const tokenSource = {
  containerId: 773678608302080,
  sourceFileId: null
}
let drawingFileId = '782015083651072'
let modelFileId = '783944475590656'

const compalianceTokenSource = {
   containerId: 774371171934208,
   sourceFileId: ['776965950664704', '776903850909696']
}
export default {
  components: { Review, Compliance, AddOpinionBox, OpinionListBox },
  data () {
    return {
      currentTargetType: this.$route.query.targetType || 'draw',
      tokenSource,
      showAdd: false,
      showList: false,
      affiliation: {
        spaceId: this.$route.query.spaceId || 780730513899520, // 意见空间id
        reviewProgress: 'REVIEW', // 审查环节 REVIEW | AUDIT | FINAL
        creatorPersonId: null,
        creatorPersonName: '',
        bizType: 'FJ', // 项目类型（房建FJ，市政SZ）
        specialtyCode: null, // 专业code
        buildingInfo: null, // { buildingId: null, buildingName: ''}, // 单体信息
        targetType: 'draw', // 审查对象 draw|model|view|option
        reviewType: 'DESIGN_QUALITY', // 设计质量审查 DESIGN_QUALITY，相符性审查MODEL_QUALITY，应用选项审查OPTION_QUALITY
        optionInfo: null, // 应用选项文件信息
        // {
        //   fileName:  '', //应用选项文件名 ,
        //   optionBizId: null, //应用选项唯一标识id ,
        //   optionName: '', //选项名称 ,
        //   optionType: '', //选项分类 ,
        // },

        models: [
          {
            modelBizId: 1,
            modelName: "1",
          },
        ], // 模型列表
        drawings: [
          {
            drawingBizId: 1,
            drawingName: "1",
            drawingNumber: "1",
          },
          {
            drawingBizId: 2,
            drawingName: "2",
            drawingNumber: "2",
          },
        ], // 图纸列表
        currentFileInfo: {// 当前展开的模型/图纸/视图信息
          baseFileBizId: 1,
          modelBizId: 1,
          modelName: '1',
          drawingBizId: 1,
          drawingName: '1',
          drawingNumber: '1',
          viewBizId: 1,
          viewName: '1',
          viewType: "1"
        },
      },

      source: {
        main: {
          source: {
            type: "model2d",
            token: ""
          }
        }
      },

      complianceSource: {
        firstDrawing: {
          source: {
            name: '018 - 协调 - 1F-出图',
            type: "modelsheet",
            token: "",
            sheetId: 3098292
          },
        },
        secondDrawing: {
          source: {
            name: 'JC3BY-S-FSFJ-JZ-01001&nbsp;-&nbsp;1#楼首层平面图.dwg',
            type: "model2d",
            token: ""
          },
        },
        matric: {
          drawingPoints: [-3950,230210,-750,219210],
          sheetPoints: [-3950,230210,-750,219210]
        }
      }
    }
  },
  async created () {
    this.initData ()

    let res = await this.getSourceToken()
    if (this.currentTargetType == 'view') {
      this.complianceSource.firstDrawing.source.token = res[0].viewToken
      this.complianceSource.secondDrawing.source.token = res[1].viewToken
      return
    }
    res.forEach((r, rIndex) => {
      if (r.viewToken) {
        this.source.main.source.token = r.viewToken
      }
    })
  },
  computed: {
    showSide () {
      return this.showAdd || this.showList
    }
  },
  watch: {
    showAdd: {
      handler (val) {
        if (val) {
          this.closeOpinionListBox()
        }
      }
    },
    showList: {
      handler (val) {
        if (val) {
          this.closeAddOpinionBox()
        }
      }
    },
  },
  methods: {
    initData () {
      // 初始化图纸
      let fId = drawingFileId
      if (this.currentTargetType === 'model') {
        fId = modelFileId
      }
      this.tokenSource.sourceFileId = [fId]

      // 初始化意见上下文
      this.affiliation.targetType = this.currentTargetType
      if (this.currentTargetType === 'view') {
        this.affiliation.reviewType = 'MODEL_QUALITY'
      }
    },
    getSourceToken () {
      return new Promise((resolve, reject) => {
        let source = this.tokenSource
        if (this.currentTargetType === 'view') {
          source = compalianceTokenSource
        }
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
    reviewLoaded (v) {
      this.initAnnotPencelClickListener(v)
    },
    initAnnotPencelClickListener (v) {
      let tempV = v
      if (tempV) {
        if (tempV.getMainModel) {
          tempV = tempV.getMainModel()
        }
        if (tempV.domId) {
          let viewerDomId = tempV.domId
          let htmlCollection = document.getElementById(viewerDomId)?.getElementsByClassName('gld-bf-notes')
          let d = htmlCollection[0]
          if (d) {
            const _this = this
            d.addEventListener('click', () => {
              if (_this.openAddOpinionBox) {
                _this.openAddOpinionBox()

                // 添加批注取消按钮点击后的添加意见框取消事件
                let annotCancelBar = document.getElementById(viewerDomId)?.querySelector('.bf-annotation .bf-cancel')
                if (annotCancelBar) {
                  let cancelFunc = function () {
                    _this.closeAddOpinionBox()
                    annotCancelBar.removeEventListener('click', cancelFunc)
                  }
                  annotCancelBar.addEventListener('click', cancelFunc)
                }
              }
            })
          }
        }
      }
    },

    openAddOpinionBox () {
      if (this.showAdd) {
        return
      }
      this.showAdd = true
      this.$nextTick(() => {
        util.windowResize()
      })
    },
    closeAddOpinionBox () {
      this.showAdd = false
    },

    openOpinionListBox () {
      this.showList = true
    },

    closeOpinionListBox () {
      this.showList = false
    },

    changeTargetType (type) {
      if (this.currentTargetType == type) {
        return
      }
      this.$router.push({
        query: {
          ...this.$route.query,
          targetType: type
        }
      })
      let url = `#${this.$route.path}?targetType=${type}`

      location.assign(url)
      location.reload()
    },

    changeReviewProgress (type) {
      if (this.affiliation.reviewProgress == type) {
        return
      }
      this.affiliation.reviewProgress = type

      if (this.$refs.opinionListBox) {
        this.$refs.opinionListBox.getList()
      }
    }
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
  .add_btn{
    position: absolute;
    top: 12px;
    right: 4px;
  }
  .list_btn{
    position: absolute;
    top: 142px;
    right: 4px;
  }
}
.change_targetType, .change_reviewProgress{
  position: absolute;
  top: 12px;
  left: 0px;
  padding: 4px 8px;
  span{
    cursor: pointer;
    margin: 0px 6px;
    background: #d1d1d1;
    padding: 4px 8px;
    &:hover{
      color: #3282f1;
      border: 1px solid #3282f1;
    }
  }
  span.__active{
    color: #3282f1;
    border: 1px solid #3282f1;
  }
}

.change_reviewProgress{
  left: 380px;
}
</style>
<template>
  <!-- 图模关联 -->
  <Compliance :source="complianceSource(currentIndex)" :editable="true" :linkType="linkType"></Compliance>
  <div class="tree">
    <el-select style="width: 120px;margin-right:12px" v-model="linkType" @change="currentIndex=0">
      <el-option :key="'auto&hand'" :label="'auto&hand(自动加手动)'" :value="'auto&hand'"></el-option>
      <el-option :key="'auto&hand'" :label="'auto&handV2(自动加手动2)'" :value="'auto&handV2'"></el-option>
      <el-option :key="'hand'" :label="'hand(手动)'" :value="'hand'"></el-option>
      <el-option :key="'hand'" :label="'handV2(手动2)'" :value="'handV2'"></el-option>
      <el-option :key="'auto'" :label="'auto(自动)'" :value="'auto'"></el-option>
    </el-select>
    <el-select v-model="currentIndex">
      <el-option v-for="(item, itemIndex) in complianceSourceList" :key="itemIndex" :value="itemIndex"
      :label="`${item.firstDrawing?.source?.name}     ${item.secondDrawing?.source?.name || ''} ${item.sufixLabel}`"></el-option>
    </el-select>
  </div>
</template>

<script>
const SOURCE = {
  containerId: 774371171934208,
  sourceModelFile: ['776965950664704'],
  sheetId1: 3098292,
  sheetId2: 3098298,
  sourceDraiwngFiles: ['776903850909696', '776903851970560', '776903853019136', '776903853940736']
}
import api from '../preview/api'
import Compliance from '../../components/view/compliance/index.vue'
import {ElSelect, ElOption} from 'element-plus'
export default {
  components: {
    Compliance,
    ElSelect,
    ElOption
  },
  data () {
    return {
      linkType: 'auto&hand',
      currentIndex: 0,
      sheetSource1: {
        name: '视图1',
        type: "modelsheet",
        token: null,
        sheetId: 3098292
      },
      sheetSource2: {
        name: '视图2',
        type: "modelsheet",
        token: null,
        sheetId: 3098298
      },
      drawingSource1: {
        name: '图纸1',
        type: "model2d",
        token: null,
      },
      drawingSource2: {
        name: '图纸2',
        type: "model2d",
        token: null,
      },
      drawingSource3: {
        name: '图纸3',
        type: "model2d",
        token: null,
      },
      drawingSource4: {
        name: '图纸4',
        type: "model2d",
        token: null,
      }
    }
  },
  computed: {
    waittingLinkdrawingList () {
      return [
        this.drawingSource1,
        this.drawingSource2,
        this.drawingSource3,
        this.drawingSource4
      ]
    },
    complianceSourceList () {
      let ret = [
        { // 智能未开始
          sufixLabel: '    | 智能关联未开始',
          firstDrawing: {
            source: this.sheetSource2,
          },
          secondDrawing: {
            source: null
          },
          matric2: null,
          autoLinkStatus: '0',

          waittingLinkdrawingList: this.waittingLinkdrawingList
        },
        // { // 智能关联中 1
        //   sufixLabel: '    | 智能关联中 1',
        //   firstDrawing: {
        //     source: this.sheetSource2,
        //   },
        //   secondDrawing: {
        //     source: null
        //   },
        //   matric2: null,
        //   autoLinkStatus: '1',

        //   waittingLinkdrawingList: this.waittingLinkdrawingList
        // },
        { // 智能关联中 2
          sufixLabel: '    | 智能关联中',
          firstDrawing: {
            source: this.sheetSource2,
          },
          secondDrawing: {
            source: this.drawingSource1,
          },
          matric2: null,
          autoLinkStatus: '1',

          waittingLinkdrawingList: this.waittingLinkdrawingList
        },
        // { // 智能关联失败 1
        //   sufixLabel: '    | 智能关联失败 1',
        //   firstDrawing: {
        //     source: this.sheetSource2,
        //   },
        //   secondDrawing: {
        //     source: null
        //   },
        //   matric2: null,
        //   autoLinkStatus: '-1',

        //   waittingLinkdrawingList: this.waittingLinkdrawingList
        // },
        { // 智能关联失败 2
          sufixLabel: '    | 智能关联失败',
          firstDrawing: {
            source: this.sheetSource2,
          },
          secondDrawing: {
            source: this.drawingSource2,
          },
          matric2: null,
          autoLinkStatus: '-1',

          waittingLinkdrawingList: this.waittingLinkdrawingList
        },
        { // 关联成功
          sufixLabel: '    | 关联成功',
          firstDrawing: {
            source: this.sheetSource1,
          },
          secondDrawing: {
            source: this.drawingSource1,
          },
          matric: {
            drawingPoints: [-3950,230210,-750,219210],
            sheetPoints: [-3950,230210,-750,219210]
          },

          waittingLinkdrawingList: this.waittingLinkdrawingList
        }  
      ]
      if (!this.linkType.includes('auto') && this.linkType.includes('hand')) {
        ret = this.handComplianceSourceList
      }
      return ret
    },
    handComplianceSourceList () {
      return [
        {
          sufixLabel: '    | 未关联1',
          firstDrawing: {
            source: this.sheetSource2,
          },
          secondDrawing: {
            source: null
          },
          matric2: null,

          waittingLinkdrawingList: this.waittingLinkdrawingList
        },
        {
          sufixLabel: '    | 未关联2',
          firstDrawing: {
            source: this.sheetSource2,
          },
          secondDrawing: {
            source: this.drawingSource1
          },
          matric2: null,

          waittingLinkdrawingList: this.waittingLinkdrawingList
        },
        { // 关联成功
          sufixLabel: '    | 关联成功',
          firstDrawing: {
            source: this.sheetSource1,
          },
          secondDrawing: {
            source: this.drawingSource1,
          },
          matric: {
            drawingPoints: [-3950,230210,-750,219210],
            sheetPoints: [-3950,230210,-750,219210]
          },

          waittingLinkdrawingList: this.waittingLinkdrawingList
        }  
      ]
    },
    complianceSource () {
      const _this = this
      return index => {
        return _this.complianceSourceList[index] || null
      }
    }
  },
  async created () {
    const _this = this
    let res = await this.getSourceToken()
    res.forEach((r, rIndex) => {
      if (r.viewToken) {
        if (rIndex === 0) {
          _this.sheetSource1.token = r.viewToken
          _this.sheetSource2.token = r.viewToken
        } else {
          _this[`drawingSource${rIndex}`].token = r.viewToken
        }
      }
    })
  },
  methods: {
    getSourceToken () {
      return new Promise((resolve, reject) => {
        let source = {
          containerId: SOURCE.containerId,
          sourceFileId: [
            ...SOURCE.sourceModelFile,
            ...SOURCE.sourceDraiwngFiles
          ]
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
    }
  }
}
</script>

<style lang="less" scoped>
.tree{
  position: absolute;
  top: 10px;
  left: 12px;
}
</style>
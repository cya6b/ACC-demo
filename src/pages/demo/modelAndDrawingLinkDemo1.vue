<template>
  <!-- 三维模型和二维图纸进行关联，在三维模型中嵌入二维图纸 -->
  <div class="demo_page">
    <div class="content">
      <ModelView hideTextSearch class="model_view_content model_c"
          v-show="link.currentStep != 2"
          :key="1"
          :bimfaceHost="`https://static.bimface.com`"
          ref="ModelRef"
          :source="modelSource"
          :afterLoad="mLoaded"
          :hideAnnotBar="true"></ModelView>
      <ModelView hideTextSearch class="model_view_content drawing_c"
          v-show="link.currentStep == null || link.currentStep == 2"
          :key="2"
          :bimfaceHost="`https://static.bimface.com`"
          ref="drawingRef"
          :source="drawingSource"
          :afterLoad="dLoaded"
          :hideAnnotBar="true"></ModelView>
    </div>
    <div class="bottom">
      <el-button v-if="link.currentStep == null" @click="link.currentStep = 0">开始关联</el-button>
      <template v-else>
        <el-button @click="link.currentStep = null">取消</el-button>
        <el-button v-if="link.currentStep > 0" @click="preStep">上一步</el-button>
        <el-button v-if="link.currentStep < 3" @click="nextStep">下一步</el-button>
        <el-button v-else @click="link.currentStep = null">确认关联</el-button>
      </template>
    </div>

    <div v-if="link.currentStep != null" class="step_tip">
      <span>{{ link.steps[link.currentStep] }}</span>
    </div>
  </div>
</template>

<script>
import ModelView from '../../components/view/model/ModelView.vue';
import { ElButton, ElMessage } from 'element-plus';
export default {
  components: {
    ModelView,
    ElButton,
    ElMessage
  },
  data () {
    return {
      model: {
        name: '模型',
        viewToken: '7de87096c2c14383bd1839bfdc8a0051', // 模型轻量化token
        viewInfo: {
          basePoint: null, // 平面原点
          direction: null, // 平面法向
          points: [] // 模型平面内两点坐标
        },
        viewer: null,
        bimfaceViewer: null,
        optContext: null,
      },
      drawing: {
        name: 'T6-1三至十四层梁配筋图1018提审核审定_t8.dwg',
        viewToken: 'a9fd05cf3315474a811081a00d1e9849', // 图纸轻量化token
        viewToken3d: '21c26b3579dd4707bbc4839bcc073b00', // 图纸轻量化为3d的token
        points: [], // 图纸上两点坐标
        viewer: null,
        bimfaceViewer: null,
        optContext: null,
      },

      link: {
        steps: [
          '在模型中选择平面',
          '在平面上选择两点',
          '在图纸中选择两点',
          '关联确认'
        ],
        currentStep: null
      }
    }
  },
  computed: {
    modelSource () {
      return {
        type: 'model3d',
        token: this.model.viewToken
      }
    },
    drawingSource () {
      return {
        type: 'model2d',
        token: this.drawing.viewToken
      }
    }
  },
  methods: {
    mLoaded (v) {
      this.model.viewer = v
      this.model.optContext = v.optContext
      this.model.bimfaceViewer = v.getBimfaceViewer
    },
    dLoaded (v) {
      this.drawing.viewer = v
      this.drawing.optContext = v.optContext
      this.drawing.bimfaceViewer = v.getBimfaceViewer
    },
    preStep () {
      this.link.currentStep--
    },
    nextStep () {
      if (this.link.currentStep == 0) {
        // 校验是否完成平面选择
        let hasCheckedPingMian = false
        let viewCurrentState = this.model.bimfaceViewer.getCurrentState()
        if (viewCurrentState) {
          hasCheckedPingMian = !!viewCurrentState.sectionPlaneState
        }
        if (!hasCheckedPingMian) {
          ElMessage({
            type: 'warning',
            message: '请选择平面!'
          })
          return
        } else {
          let planeInfo = viewCurrentState.sectionPlaneState
          this.model.viewInfo.planeInfo = planeInfo
          // 将视角转至垂直于选择平面，并锁定模型旋转
          let a = this.model.bimfaceViewer.getCameraStatus()
          let modelBoundary = this.model.bimfaceViewer.getModelBoundaryPoints(this.model.bimfaceViewer.getModel().modelId)
          if (modelBoundary) {
            const pointXList = modelBoundary.map((point) => point.x)
            const pointYList = modelBoundary.map((point) => point.y)
            const pointZList = modelBoundary.map((point) => point.z)
            const minX = Math.min(...pointXList)
            const maxX = Math.max(...pointXList)
            const minY = Math.min(...pointYList)
            const maxY = Math.max(...pointYList)
            const minZ = Math.min(...pointZList)
            const maxZ = Math.max(...pointZList)
            a.target = {
              x: (minX + maxX) / 2,
              y: (minY + maxY) / 2,
              z: (minZ + maxZ) / 2
            }
            a.position = {
              x: planeInfo.position.x,
              y: planeInfo.position.y,
              z: planeInfo.position.z
            }
          }
          this.model.bimfaceViewer.getCamera().setStatus(a)
          this.model.bimfaceViewer.enableOrbit(false);
        }
      }
      this.link.currentStep++
    }
  },
  watch: {
    'link.currentStep': {
      handler (val) {
        setTimeout(() => {
          // 图纸home主视角恢复，处理图纸框隐藏后再显示图纸黑屏无内容问题
          let dD = document.getElementsByClassName('drawing_c')
          if (dD[0]) {
            let homeBtn = dD[0].getElementsByClassName('gld-bf-home')
            if (homeBtn[0]) {
              homeBtn[0].click()
            }
          }
        }, 500)

        if (val !== 1) { // 取消模型旋转锁定
          this.model.bimfaceViewer.enableOrbit(true);
        }
      }
    }
  }
}
</script>

<style lang="less" scoped>
.demo_page{
  height: 100%;
  background: #000;
  .content{
    height: calc(100% - 50px);
    display: flex;
    .model_view_content{
      height: 100%;
      width: 50%;
      flex-grow: 1;
      position: relative;
    }
  }
  .bottom{
    height: 50px;
    line-height: 50px;
    text-align: center;
  }

  .step_tip{
    padding: 4px 48px;
    color: #ffffff;
    background: #121214;
    font-size: 18px;
    position: fixed;
    top: 8px;
    left: 50%;
    transform: translateX(-50%);
  }
}
</style>
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

    <div class="floor_select_box" v-if="floorSelectBoxShow">
      <el-select v-model="model.viewInfo.floor" clearable>
        <el-option v-for="f in floors" :key="f.id" :label="f.name" :value="f.id"></el-option>
      </el-select>
    </div>
  </div>
</template>

<script>
import util from '../../plugins/util';
import ModelView from '../../components/view/model/ModelView.vue';
import { ElButton, ElMessage, ElSelect, ElOption } from 'element-plus';
export default {
  components: {
    ModelView,
    ElButton,
    ElMessage,
    ElSelect,
    ElOption
  },
  data () {
    return {
      floorSelectBoxShow: false,
      floors: [],
      model: {
        name: '模型',
        viewToken: this.$route.query.modelToken || '7de87096c2c14383bd1839bfdc8a0051', // 模型轻量化token
        viewInfo: {
          basePoint: null, // 平面原点
          direction: null, // 平面法向
          points: [], // 模型平面内两点坐标

          floor: null
        },
        viewer: null,
        bimfaceViewer: null,
        bimfaceApp: null,
        optContext: null,
      },
      drawing: {
        name: 'T6-1三至十四层梁配筋图1018提审核审定_t8.dwg',
        viewToken: this.$route.query.drawingToken ||  'a9fd05cf3315474a811081a00d1e9849', // 图纸轻量化token
        viewToken3d: this.$route.query.drawingToken3D || '21c26b3579dd4707bbc4839bcc073b00', // 图纸轻量化为3d的token
        points: [], // 图纸上两点坐标
        viewer: null,
        bimfaceViewer: null,
        bimfaceApp: null,
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
      this.model.bimfaceApp = v.getBimfaceApp
      if (this.model.bimfaceViewer) {
        const _this = this
        this.model.bimfaceViewer.getFloors((data) => {
          _this.floors = (data || []).sort((a, b) => b.elevation - a.elevation)
        })

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
          this.model.modelBoundary = {
            minX,
            minY,
            minZ,
            maxX,
            maxY,
            maxZ
          }
        }
      }
    },
    dLoaded (v) {
      this.drawing.viewer = v
      this.drawing.optContext = v.optContext
      this.drawing.bimfaceViewer = v.getBimfaceViewer
      this.drawing.bimfaceApp = v.getBimfaceApp
    },
    preStep () {
      this.link.currentStep--
    },
    nextStep () {
      if (this.link.currentStep == 0) {
        // 校验是否完成平面选择
        let hasCheckedFloor = this.model.viewInfo.floor
        if (!hasCheckedFloor) {
          ElMessage({
            type: 'warning',
            message: '请选择平面!'
          })
          return
        }
      }
      if (this.link.currentStep == 1) {
        // 校验是否在模型中选点完成
        let length = this.model.viewInfo.points.length
        if (length !== 2) {
          ElMessage({
            type: 'warning',
            message: '请在模型平面中选择两点!'
          })
          return
        }
      }
      this.link.currentStep++
    },
    drawingClickEventListener (el) {
      let viewerDrawing = this.drawing.bimfaceViewer
      if (!viewerDrawing) {
        return
      }
      let clientPosition = el.clientPosition
      if (el.snapPoint && el.snapPoint.clientPosition) {
        clientPosition = el.snapPoint.clientPosition
      }
      let worldPosition = viewerDrawing.clientToWorld(clientPosition);
      let position = {
        clientPosition: el.clientPosition,
        screenPosition: {
            x: el.clientX,
            y: el.clientY,
        },
        worldPosition: worldPosition,
      }
      this.drawing.points.push(position)
      if (this.drawing.points.length > 2) {
        this.drawing.points.slice(0, 1)
      }
      this.addLabel(worldPosition, '2D')
    },
    modelClickEventListener (el) {
      let viewer3D = this.model.bimfaceViewer
      if (!viewer3D) {
        return
      }
      let clientPosition = el.clientPosition
      if (el.snapPoint && el.snapPoint.clientPosition) {
        clientPosition = el.snapPoint.clientPosition
      }
      let worldPosition = viewer3D.clientToWorld(clientPosition);
      let position = {
        clientPosition: el.clientPosition,
        screenPosition: el.screenPosition,
        worldPosition: worldPosition,
      }
      this.model.viewInfo.points.push(position)
      if (this.model.viewInfo.points.length > 2) {
        this.model.viewInfo.points.slice(0, 1)
      }

      this.addLabel(worldPosition, '3D')
    },
    // 选点标记，自定义标签
    addLabel (position, type) {
      let viewer3D = this.model.bimfaceViewer
      let viewerDwg = this.drawing.bimfaceViewer
      let drawable2dContainer = this.drawing.optContext.getDrawableContainer()
      let drawable3dContainer = this.model.optContext.getDrawableContainer()
      let config = new Glodon.Bimface.Plugins.Drawable.CustomItemConfig(); 
      let customItem;
      const dotWrap = document.createElement('div')
      const dotLabel1 = document.createElement('span');
      const dotLabel2 = document.createElement('span');
      dotWrap.appendChild(dotLabel1);
      dotWrap.appendChild(dotLabel2);
      //自定义样式，支持Html的任意dom元素
      dotWrap.style.position = 'relative';

      dotLabel1.style.position = 'absolute';
      dotLabel1.style.top = '-7px';
      dotLabel1.style.left = '0';
      dotLabel1.style.width = '2px';
      dotLabel1.style.height = '15px';
      dotLabel1.style.background = '#F99D0B';

      dotLabel2.style.position = 'absolute';
      dotLabel2.style.top = '0';
      dotLabel2.style.left = '-7px';
      dotLabel2.style.width = '15px';
      dotLabel2.style.height = '2px';
      dotLabel2.style.background = '#F99D0B';

      config.content = dotWrap;
      config.worldPosition = position;
      
      type == '3D' ? config.viewer = viewer3D : config.viewer = viewerDwg;
      customItem = new Glodon.Bimface.Plugins.Drawable.CustomItem(config);
      
      // 添加自定义标签
      if(type == '3D') {
        let labelArr = drawable3dContainer.getAllItems();
        labelArr.length == 2 ? drawable3dContainer.removeItemById(labelArr[0].id) : '';
        drawable3dContainer.addItem(customItem);
      } else if(type == '2D') {
        let labelArr = drawable2dContainer.getAllItems();
        labelArr.length == 2 ? drawable2dContainer.removeItemById(labelArr[0].id) : '';
        drawable2dContainer.addItem(customItem);

        util.windowResize()
      }
    }
  },
  watch: {
    'link.currentStep': {
      handler (val) {
        const _this = this
        let app = this.model.bimfaceApp
        let viewer3D = this.model.bimfaceViewer
        let drawable3dContainer = this.model.optContext.getDrawableContainer()
        let drawingApp = this.drawing.bimfaceApp
        let drawingViewer = this.drawing.bimfaceViewer
        let drawable2dContainer = this.drawing.optContext.getDrawableContainer()
        if (val !== 0) {
          this.floorSelectBoxShow = false
        }
        if (val !== 1) { // 取消模型旋转锁定
          this.model.bimfaceViewer.enableOrbit(true);
          // 取消事件监听
          app.removeEventListener(Glodon.Bimface.Viewer.Viewer3DEvent.MouseClicked, this.modelClickEventListener);
        }
        if (val !== 2) {
          drawingViewer.removeEventListener(Glodon.Bimface.Viewer.ViewerDrawingEvent.MouseClicked, this.drawingClickEventListener)
        }

        if (val == 0) { // 第一步
          // 清空平面
          // 开启拾取面剖切选择平面
          // let gldBfSectionbox = document.getElementsByClassName('gld-bf-sectionbox')
          // if (gldBfSectionbox[0]) {
          //   let planePick = gldBfSectionbox[0].getElementsByClassName('gld-bf-section-plane-pick')
          //   if (planePick[0]) {
          //     planePick[0].click()
          //   }
          // }

          // 根据楼层选择平面
          this.floorSelectBoxShow = true
        }
        if (val == 1) { // 第二步
          // 将视角转至垂直于选择平面，并锁定模型旋转
          // 视角切换至顶视图
          viewer3D.hideViewHouse();
          viewer3D.setView(Glodon.Bimface.Viewer.ViewOption.Top);
          // 透视模式设为正交 
          viewer3D.setCameraType('OrthographicCamera');
          // 模型视角锁定顶视图，只能平移缩放，不可旋转 
          viewer3D.enableOrbit(false);
          // 开启轴网 
          viewer3D.showAxisGridsByFloor('', this.model.viewInfo.floor);
          // 开启点、线、面捕捉以及轴网捕捉
          viewer3D.enableSnap(true);

          viewer3D.clearIsolation();
          viewer3D.clearSelectedComponents();
          viewer3D.render();
          app.addEventListener(Glodon.Bimface.Viewer.Viewer3DEvent.MouseClicked, this.modelClickEventListener);
        }

        if (val == 2) { // 第三步
          drawingViewer.addEventListener(Glodon.Bimface.Viewer.ViewerDrawingEvent.MouseClicked, this.drawingClickEventListener)
          drawingViewer.home();
          drawingViewer.enableSnap(true);
          drawingViewer.setDisplayMode(0);
        }

        if (val == 3) { // 第四步
          if (this.sectionRegion) {
            // this.sectionRegion.exit()

            // // 构造剖切区域配置项
            // let sectionRegionConfig = new Glodon.Bimface.Plugins.Section.SectionRegionConfig();
            // let minX = this.model.modelBoundary?.minX
            // let minY = this.model.modelBoundary?.minY
            // let minZ = this.model.modelBoundary?.minZ
            // let maxX = this.model.modelBoundary?.maxX
            // let maxY = this.model.modelBoundary?.maxY
            // sectionRegionConfig.boundary = [
            //   {x: minX, y: minY, z: minZ},
            //   {x: minX, y: maxY, z: minZ},
            //   {x: maxX, y: maxY, z: minZ},
            //   {x: maxX, y: minY, z: minZ}
            // ];
            // sectionRegionConfig.height = this.model.viewInfo.floorHeight - minZ + 100;
            // sectionRegionConfig.viewer = viewer3D;
            // // 构造剖切区域
            // this.sectionRegion = new Glodon.Bimface.Plugins.Section.SectionRegion(sectionRegionConfig); 
            
            
            this.sectionRegion.hide()
          }

          // 设置透视相机
          viewer3D.setCameraType('PerspectiveCamera');

          drawable2dContainer.clear()
          drawable3dContainer.clear()

          // 坐标变换图纸至模型中的平面位置
          // 监听添加view完成的事件
          let ModelAddedEventListener = function () {
            let model3D = viewer3D.getModel('planeDrawing')
            let modelPoints = _this.model.viewInfo.points
            let drawingPoints = _this.drawing.points
            let xx = modelPoints[0].worldPosition.x - drawingPoints[0].worldPosition.x
            let yy = modelPoints[0].worldPosition.y - drawingPoints[0].worldPosition.y
            let zz = _this.model.viewInfo.floorHeight + 100
            model3D.setModelTranslation({ x: xx, y: yy, z: zz });

            let scale = 1
            let length1 = Math.sqrt(Math.pow(modelPoints[0].worldPosition.x - modelPoints[1].worldPosition.x, 2) + Math.pow(modelPoints[0].worldPosition.y - modelPoints[1].worldPosition.y, 2))
            let length2 = Math.sqrt(Math.pow(drawingPoints[0].worldPosition.x - drawingPoints[1].worldPosition.x, 2) + Math.pow(drawingPoints[0].worldPosition.y - drawingPoints[1].worldPosition.y, 2))
            scale = length1/length2
            model3D.setModelScale({ x: modelPoints[0].worldPosition.x, y: modelPoints[0].worldPosition.y, z: zz }, scale);

            let angle = 0
            let angle1 = Math.atan(Math.abs(modelPoints[0].worldPosition.x - modelPoints[1].worldPosition.x) / Math.abs(modelPoints[0].worldPosition.y - modelPoints[1].worldPosition.y))
            let angle2 = Math.atan(Math.abs(drawingPoints[0].worldPosition.x - drawingPoints[1].worldPosition.x) / Math.abs(drawingPoints[0].worldPosition.y - drawingPoints[1].worldPosition.y))
            angle = angle1 - angle2
            model3D.setModelRotationZ({ x: modelPoints[0].worldPosition.x, y: modelPoints[0].worldPosition.y, z: zz }, angle);

            // let color = new Glodon.Web.Graphics.Color("#FFE3E3", 0.5);
            // //给指定模型的所有构件着色
            // model3D.overrideAllComponentsColor(color);

            let color2 = new Glodon.Web.Graphics.Color("#E3E3E3", 0.3);
            let model = viewer3D.getModel()
            model.overrideAllComponentsColor(color2);

            setTimeout(() => {
              viewer3D.enableOrbit(true);
              viewer3D.getViewer().goToInitialView();

              viewer3D.render();
            }, 200)
            viewer3D.removeEventListener(Glodon.Bimface.Viewer.Viewer3DEvent.ModelAdded, ModelAddedEventListener)
          }
          viewer3D.addEventListener(Glodon.Bimface.Viewer.Viewer3DEvent.ModelAdded, ModelAddedEventListener)

          viewer3D.loadModel({
            modelId: 'planeDrawing',
            viewToken: this.drawing.viewToken3d
          })
        }


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
      }
    },

    'model.viewInfo.floor': {
      handler (val) {
        if (this.sectionRegion) {
          this.sectionRegion.exit()
        }
        if (!val) {
  
        } else {
          let floorIndex = this.floors.findIndex(f => {
            return f.id == val
          })
          let floor = this.floors[floorIndex]
          let nextFloor = this.floors[floorIndex - 1]

          if (floor) {
            this.model.viewInfo.floorHeight = floor.elevation * 1000
            let viewer3D = this.model.bimfaceViewer

            // 模型仅显示指定楼层
            // viewer3D.hideAllComponents();
            // viewer3D.showComponentsByObjectData([{ "levelName": floor.name }]);
            // 根据楼层标高构建剖切，使仅展示该楼层构件
            let elevation1 = this.model.viewInfo.floorHeight
            let elevation2 = this.model.modelBoundary?.maxZ
            if (nextFloor) {
              // 取当前楼层半层高
              elevation2 = elevation1 + ((nextFloor.elevation * 1000) - elevation1) / 2
            }
            // 构造剖切区域配置项
            let sectionRegionConfig = new Glodon.Bimface.Plugins.Section.SectionRegionConfig();
            sectionRegionConfig.boundary = [
              {
                x: this.model.modelBoundary?.minX,
                y: this.model.modelBoundary?.minY,
                z: elevation1 - 100
              },
              {
                x: this.model.modelBoundary?.minX,
                y: this.model.modelBoundary?.maxY,
                z: elevation1 - 100
              },
              {
                x: this.model.modelBoundary?.maxX,
                y: this.model.modelBoundary?.maxY,
                z: elevation1 - 100
              },
              {
                x: this.model.modelBoundary?.maxX,
                y: this.model.modelBoundary?.minY,
                z: elevation1 - 100
              },
            ];
            sectionRegionConfig.height = elevation2 ? (elevation2 - elevation1) : 3000
            sectionRegionConfig.viewer = viewer3D;
            // 构造剖切区域
            this.sectionRegion = new Glodon.Bimface.Plugins.Section.SectionRegion(sectionRegionConfig);

            viewer3D.clearIsolation();
            viewer3D.clearSelectedComponents();
            viewer3D.render();
          }
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

  .floor_select_box{
    position: absolute;
    left: 72px;
    top: 57px;
  }
}
</style>
<template>
  <div style="width:400px;height:100%;display:flex">
    <add-opinion-box class="item" :affiliation="affiliation"></add-opinion-box>
    <add-opinion-box class="item" :affiliation="affiliation2"></add-opinion-box>
    <add-opinion-box class="item" :affiliation="affiliation3"></add-opinion-box>
  </div>
</template>

<script>
import AddOpinionBox from "../../components/service/opinionManagent/AddOpinionBox.vue";
export default {
  components: {AddOpinionBox},
  data () {
    return {
      affiliation: {
        spaceId: 780730513899520, // 意见空间id
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
      affiliation2: {
        spaceId: 780730513899520, // 意见空间id
        reviewProgress: 'REVIEW', // 审查环节 REVIEW | AUDIT | FINAL
        creatorPersonId: null,
        creatorPersonName: '',
        bizType: 'FJ', // 项目类型（房建FJ，市政SZ）
        specialtyCode: null, // 专业code
        buildingInfo: null, // { buildingId: null, buildingName: ''}, // 单体信息
        targetType: 'model', // 审查对象 draw|model|view|option
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
      affiliation3: {
        spaceId: 780730513899520, // 意见空间id
        reviewProgress: 'REVIEW', // 审查环节 REVIEW | AUDIT | FINAL
        creatorPersonId: null,
        creatorPersonName: '',
        bizType: 'FJ', // 项目类型（房建FJ，市政SZ）
        specialtyCode: null, // 专业code
        buildingInfo: null, // { buildingId: null, buildingName: ''}, // 单体信息
        targetType: 'view', // 审查对象 draw|model|view|option
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
    }
  }
}
</script>

<style lang="less" scoped>
.item{
  margin-left: 24px;
}
</style>
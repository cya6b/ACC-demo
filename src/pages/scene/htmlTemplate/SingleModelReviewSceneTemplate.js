import singleModelReviewOpinionData from './singleModelReviewOpinionData'
const template = `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/@/assets/vite.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>单模型审查</title>
    <link rel="stylesheet" type="text/css" href="/sdk/style.css"/>
  </head>
  <body>
    <div id="app">
      <div class="main">
        <div id="modelBox"></div>
        <span class="btn btn1" onclick="openOrCloseAutoRes()">智能审查意见</span>
        <span class="btn btn2" onclick="openOrCloseAddBox()">添加意见</span>
        <span class="btn btn3" onclick="openOrCloselistBox()">意见列表</span></button>
      </div>
      <div class="side" id="resultBox"></div>
      <div class="side" id="addBox">添加意见</div>
      <div class="side" id="listBox">意见列表</div>
    </div>
  </body>
  <script src="/sdk/index.umd.cjs"></script>
  <script>
    let autoResShow = false
    function openOrCloseAutoRes () {
      if (addBoxShow) {
        openOrCloseAddBox()
      }
      if (listBoxShow) {
        openOrCloselistBox()
      }

      if (autoResShow) {
        document.getElementById("resultBox").style.display = 'none'
      } else {
        document.getElementById("resultBox").style.display="block"
      }
      autoResShow = !autoResShow

      // 手动触发window的resize事件，保证批注位置的准确
      window.dispatchEvent(new Event('resize'))
    }

    let addBoxShow = false
    function openOrCloseAddBox () {
      if (autoResShow) {
        openOrCloseAutoRes()
      }
      if (listBoxShow) {
        openOrCloselistBox()
      }

      if (addBoxShow) {
        document.getElementById("addBox").style.display = 'none'
        document.getElementById("addBox").innerHTML = ''
      } else {
        if (!reviewContext) {
          return
        }
        document.getElementById("addBox").style.display="block"
        let addOpinion = new gdaJsSDK.AddOpinion({
          el: '#addBox',
          affiliation: affiliation,
          outerChin: reviewContext,
          closeHandle: openOrCloseAddBox,
          editable: true,
        })
        addOpinion.load("#addBox", (v) => {})
      }
      addBoxShow = !addBoxShow

      // 手动触发window的resize事件，保证批注位置的准确
      window.dispatchEvent(new Event('resize'))
    }

    let listBoxShow = false
    function openOrCloselistBox () {
      if (addBoxShow) {
        openOrCloseAddBox()
      }
      if (autoResShow) {
        openOrCloseAutoRes()
      }

      if (listBoxShow) {
        document.getElementById("listBox").style.display = 'none'
        document.getElementById("listBox").innerHTML = ''
      } else {
        document.getElementById("listBox").style.display="block"
        // 意见列表
        let opinionList = new gdaJsSDK.OpinionList({
          el: '#listBox',
          affiliation: affiliation,
          outerChin: reviewContext,
          closeHandle: openOrCloselistBox,
          editable: true,
        })
        opinionList.load("#listBox", (v) => {})
      }
      listBoxShow = !listBoxShow

      // 手动触发window的resize事件，保证批注位置的准确
      window.dispatchEvent(new Event('resize'))
    }

    function adopt (data) {
    }
  </script>
  <script type="module">
    window.onload = function () {
      let m = new gdaJsSDK.Review({
        el: "#modelBox",
        source: {
          main: {
            source: {
              type: "model3d",
              token: "#_viewToken1_#",
              walkthroughData: '{"data":[{"id":"46abd11e-63d8-4ded-8d80-79fdecaf801b","keyFrames":[{"id":"1b9a444d-edc4-473b-8897-5e7b92ce41d7","name":"漫游点0","position":{"x":-54029.24398029608,"y":162531.44054135852,"z":110379.24075780985},"target":{"x":16899.999877929688,"y":233460.68750000003,"z":39450}}],"name":"路径1","time":20,"coordinateSystem":"world"},{"id":"f3d536e8-e02a-4aa0-8bdb-05b2a3f86959","keyFrames":[{"id":"b786535d-fb71-4136-a25a-1941be01dc92","name":"漫游点0","position":{"x":-54029.24398029608,"y":162531.44054135852,"z":110379.24075780985},"target":{"x":16899.999877929688,"y":233460.68750000003,"z":39450}}],"name":"路径2","time":20,"coordinateSystem":"world"},{"id":"086b9cdf-0b42-4b5d-987c-35c36b4d3a3d","keyFrames":[{"id":"e25c67fe-4275-45b2-8312-363b0f6003a7","name":"漫游点0","position":{"x":-54029.24398029608,"y":162531.44054135852,"z":110379.24075780985},"target":{"x":16899.999877929688,"y":233460.68750000003,"z":39450}},{"id":"cd9a0dec-3437-405c-88f4-32856ec60c1d","name":"漫游点1","position":{"x":-54029.24398029608,"y":162531.44054135852,"z":110379.24075780985},"target":{"x":16899.999877929688,"y":233460.68750000003,"z":39450}},{"id":"cd109a94-74e6-4219-9c3f-b77aabf81b66","name":"漫游点2","position":{"x":-54029.24398029608,"y":162531.44054135852,"z":110379.24075780985},"target":{"x":16899.999877929688,"y":233460.68750000003,"z":39450}}],"name":"路径3","time":20,"coordinateSystem":"world"}],"version":1}'
            }
          }
        },
      })
      window.reviewContext = m
      m.load("#modelBox", (val) => {
        let r = new gdaJsSDK.ReviewResult({
          el: "#resultBox",
          closeHandle: openOrCloseAutoRes,
          adoptClickHandle: adopt,
          outerChin: m,
          sourceData: opinionData
        })
        r.load("#resultBox", (v) => {})

        // 添加采纳点击事件监听
        r.setAdoptClickListener((data) => {
          // 进行采纳保存
          if (data.successCallBack) {
            data.successCallBack()
          }
        })

        // 添加批注保存事件监听
        m.addEventListener('annotDrawingSavedEvent', (data) => {
          alert(data)
        })

        // 添加漫游路径变更事件监听
        m.addEventListener('walkthroughDataChangedEvent', (data) => {
          alert(data)
        })
      })

      var opinionData = ${JSON.stringify(singleModelReviewOpinionData)}

      window.affiliation = {
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
      }
    }
  </script>
  <style>
    html,body{
      margin: 0px;
      width: 100%;
      height: 100%;
    }
    #app{
      width: 100%;
      height: 100%;
      display: flex;
    }
    .main{
      height: 100%;
      position: relative;
      width: 600px;
      flex-grow: 1;
    }
    .side{
      width: 480px;
      display: none;
    }
    .main #modelBox {
      height: 100%;
      width: 100%;
    }
    .main .btn {
      position: absolute;
      width: 40px;
      z-index: 9;
      right: 8px;

      background: #282a34;
      color: #fff;
      width: 16px;
      padding: 12px;
      cursor: pointer;
    }
    .btn.btn1{
      top: 8px;
    }
    .btn.btn2{
      top: 182px;
    }
    .btn.btn3{
      top: 308px;
    }

  </style>
</html>`
export default template
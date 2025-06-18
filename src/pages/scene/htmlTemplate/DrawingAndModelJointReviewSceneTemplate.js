import drawingAndModelJointReviewOpinionData from './DrawingAndModelJointReviewOpinionData'
const template = `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/@/assets/vite.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>二三维联合审查</title>
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
        ableAutoLink: true,
        source: {
          main: {
            source: {
              type: "model3d",
              token: "#_viewToken1_#",
            }
          },
          sub: {
            source: {
              type: "model2d",
              token: "#_viewToken2_#",
            },
            subList: [{
              name: "JC3BY-S-FSFJ-JZ-01001&nbsp;-&nbsp;1#楼首层平面图.dwg",
              type: "model2d",
              token: "#_viewToken2_#",
              autoLink: {
                source: {
                  name: "018 - 协调 - 1F-出图",
                  type: "modelsheet",
                  token: "#_viewToken1_#",
                  sheetId: 3098292,
                },
                matric: {
                  drawingPoints: [-3950,230210,-750,219210],
                  sheetPoints: [-3950,230210,-750,219210]
                }
              }
            }, {
              name: "JC3BY-S-FSFJ-JZ-01002 - 1#楼二层平面图.dwg",
              type: "model2d",
              token: "#_viewToken3_#",
              autoLink: {
                source: {
                  name: "019 - 协调 - 2F-出图",
                  type: "modelsheet",
                  token: "#_viewToken1_#",
                  sheetId: 3098298,
                },
                matric: {
                  drawingPoints: [18466.57848990017,217710.6992600392,26966.578489900166,219210.6992600392],
                  sheetPoints: [-3950,217710.699261,4550,219210.699261]
                }
              }
            }, {
              name: "JC3BY-S-FSFJ-JZ-01003 - 1#楼标准层平面图.dwg",
              type: "model2d",
              token: "#_viewToken4_#",
              autoLink: {
                source: {
                  name: "020 - 协调 - 3F-出图",
                  type: "modelsheet",
                  token: "#_viewToken1_#",
                  sheetId: 3098304,
                },
                matric: {
                  drawingPoints: [0,0,1000,1000],
                  sheetPoints: [0,0,1000,1000]
                }
              }
            }, {
              name: "JC3BY-S-FSFJ-JZ-01004 - 1#楼屋面层平面图.dwg",
              type: "model2d",
              token: "#_viewToken5_#",
              autoLink: {
                source: {
                  name: "021 - 协调 - 屋面层-出图",
                  type: "modelsheet",
                  token: "#_viewToken1_#",
                  sheetId: 3098310,
                },
                matric: {
                  drawingPoints: [14149.99999999917,219210.69926003914,10649.99999999917,219210.69926003914],
                  sheetPoints: [14150,219210.699261,10650,219210.699261]
                }
              }
            }, {
              name: "JC3BY-S-FSFJ-JZ-01005 - 1#楼屋顶层平面图.dwg",
              type: "model2d",
              token: "#_viewToken6_#",
              autoLink: {
                source: {
                  name: "022 - 协调 - 屋顶层-出图",
                  type: "modelsheet",
                  token: "#_viewToken1_#",
                  sheetId: 3098316,
                },
                matric: {
                  drawingPoints: [33350,240310,7250,234510],
                  sheetPoints: [33350,240310,7250,234510]
                }
              }
            }],
          }
        },
        // hideBimToolBar: true,
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
      })

      var opinionData = ${JSON.stringify(drawingAndModelJointReviewOpinionData)}

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
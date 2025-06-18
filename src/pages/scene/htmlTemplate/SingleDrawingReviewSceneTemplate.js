const template = `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/@/assets/vite.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>单图纸审查</title>
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
              type: "model2d",
              token: "#_viewToken1_#"
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
      })

      var opinionData = {
        status: "FINISH",
        tabs: [
          {
            tabType: 'notPass',
            tabName: "未通过", // tab页名称
            list: [
              {
                status: '0',
                name: "《住宅设计规范》GB50096 6.3.1", // 名称
                articleContent: "<p>楼梯梯段净宽不应小于1．10m，不超过六层的住宅，一边设有栏杆的梯段净宽不应小于1．00m。</p>",
                opinionText: "不符合《住宅设计规范》GB50096 6.3.1楼梯净宽", // 内容
                checkPointCount: "1", // 审查点个数
                errCount: "3", // 问题数量
                strong: false, // 是否强条
                detail: [ // 详情
                  {
                    drawingId: "", // 图纸id
                    modelId: "", // 模型id

                    message: "违反审查规则：不符合楼梯净宽", // 意见内容
                    adoption: false,
                    elementResults: [
                      {
                        status: '0',
                        result: "楼梯2699443：楼梯的梯段宽度有误", // 信息
                        componentId: 2699443, // 构件id
                        componentName: "现场浇注楼梯: 大堂楼梯", // 构件名称              
                        viewEleBox: [ // 构件包围盒信息
                          {x: 13159.999999998556, y: 236161.09925909017},
                          {x: 13159.999999998556, y: 237310.69925909018}
                        ],
                      },
                      {
                        status: '0',
                        result: "楼梯2699741：楼梯的梯段宽度有误", // 信息
                        componentId: 2699741, // 构件id
                        componentName: "现场浇注楼梯: 大堂楼梯", // 构件名称              
                        viewEleBox: [ // 构件包围盒信息
                          {x: 16539.999999998592, y: 234810.69925909015},
                          {x: 16539.999999998592, y: 235960.29925909013}
                        ],
                      },
                      {
                        status: '0',
                        result: "楼梯3043412：楼梯的梯段宽度有误", // 信息
                        componentId: 3043412, // 构件id
                        componentName: "现场浇注楼梯: 大堂楼梯", // 构件名称              
                        viewEleBox: [ // 构件包围盒信息
                          {x: 9748.942064679617, y: 234610.6992590901},
                          {x: 11098.542064679625, y: 234610.6992590901}
                        ],
                      },
                    ]
                  }
                ]
              },
            ]
          }
        ],
      }

      window.affiliation = {
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
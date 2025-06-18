import ComplianceReviewResultData from './ComplianceReviewResultData'
const template = `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/@/assets/vite.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>相符性审查</title>
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
        if (addOpinion) {
          // 必要的
          addOpinion.unload()
        }
        document.getElementById("addBox").innerHTML = ''
      } else {
        if (!reviewContext) {
          return
        }
        document.getElementById("addBox").style.display="block"
        window.addOpinion = new gdaJsSDK.AddOpinion({
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
      let m = new gdaJsSDK.Compliance({
        el: "#modelBox",
        source: complianceSource,
        editable: false,
      })
      window.reviewContext = m
      m.load("#modelBox", (val) => {

        let r = new gdaJsSDK.ReviewResult({
          el: "#resultBox",
          closeHandle: openOrCloseAutoRes,
          adoptClickHandle: adopt,
          modeType: "Compliance",
          outerChin: m,
          sourceData: reviewResultSourceData
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
    }
    let complianceSource = {
      firstDrawing: {
        source: {
          name: '018 - 协调 - 1F-出图',
          type: "modelsheet",
          token: "#_viewToken1_#",
          sheetId: 3098292
        },
      },
      secondDrawing: {
        source: {
          name: 'JC3BY-S-FSFJ-JZ-01001&nbsp;-&nbsp;1#楼首层平面图.dwg',
          type: "model2d",
          token: "#_viewToken2_#"
        },
      },
      matric: {
        drawingPoints: [-3950,230210,-750,219210],
        sheetPoints: [-3950,230210,-750,219210]
      }
    }

    // let reviewResultSourceData = ${JSON.stringify(ComplianceReviewResultData)}

    let reviewResultSourceData = {
      status: "FINISH",
      tabs: [{
        tabName: "不符合", // tab页名称
        tabType: "notPass",
        list: [
          {
            name: "窗平面位置", // 名称
            status: '0',
            opinionText: "图纸窗未在模型中找到对应构件。如1-E轴交1-19轴 窗【BY2921】未在模型中找到对应构件;1-F轴交1-13轴 窗【BY0914a】未在模型中找到对应构件。", // 内容
            count: "2", // 数量
            errCount: "2", // 不符合数
            passCount: "0", // 符合数
            elementResults: [ // 详情
              {
                elementState: "0",
                drawingId: "3033964", // 图纸id
                modelId: "1633922369968017408", // 模型id

                componentId: null, // 构件id
                componentName: "", // 构件名称              
                viewEleBox: [ // 构件包围盒信息
                  {x: 21250.32166375429, y: 230310.62402721663},
                  {x: 21450.3216637543, y: 233210.62402721663}
                ],
                message: "图纸里的1-E轴交1-19轴 窗【BY2921】在模型中缺失。", // 意见内容
              }, {
                elementState: "0",
                drawingId: "3033964", // 图纸id
                modelId: "1633922369968017408", // 模型id

                componentId: null, // 构件id
                componentName: "", // 构件名称              
                viewEleBox: [ // 构件包围盒信息
                  {x: 10898.941569893019, y: 229785.69926004932},
                  {x: 10948.941569893022, y: 230735.69926004932}
                ],
                message: "图纸里的1-F轴交1-13轴 窗【BY0914a】在模型中缺失。", // 意见内容
              }
            ]
          },
          {
            status: '0',
            name: "窗尺寸", // 名称
            opinionText: "模型中窗尺寸与图纸不一致，如图纸中1-M轴交1-19轴窗【BY0404a】为【400*400】，模型窗ID2799572【 470*470】；图纸中1-J轴交1-12轴窗【C1013a】为【1000*1300】，模型窗ID2763271【 1000*1350】。其余自查。", // 内容
            count: "5", // 数量
            errCount: "5", // 不符合数
            passCount: "0", // 符合数
            elementResults: [ // 详情
              {
                elementState: "0",
                drawingId: "3033964", // 图纸id
                modelId: "1633922369968017408", // 模型id

                componentId: 2799572, // 构件id
                componentName: "BY0404a: BY0404a", // 构件名称              
                viewEleBox: [ // 构件包围盒信息
                  {x: 22901.000718941457, y: 241715.69926005384},
                  {x: 23101.000718941446, y: 242185.69926005384}
                ],
                message: "1-M轴交1-19轴窗【BY0404a】(窗ID2799572)图模的尺寸不一致。图纸【400*400】,模型【470*470】。", // 意见内容
              }, {
                elementState: "0",
                drawingId: "3033964", // 图纸id
                modelId: "1633922369968017408", // 模型id

                componentId: 2763271, // 构件id
                componentName: "C1013a: C1013a", // 构件名称              
                viewEleBox: [ // 构件包围盒信息
                  {x: 9448.942064680268, y: 237511.95908180613},
                  {x: 9748.942064680268, y: 238510.78094207117}
                ],
                message: "1-J轴交1-12轴窗【C1013a】(窗ID2763271)图模的尺寸不一致。图纸【1000*1300】,模型【1000*1350】。", // 意见内容
              }, {
                elementState: "0",
                drawingId: "3033964", // 图纸id
                modelId: "1633922369968017408", // 模型id

                componentId: 3040470, // 构件id
                componentName: "", // 构件名称              
                viewEleBox: [ // 构件包围盒信息
                  {x: 9550.000000000526, y: 233410.69926005095},
                  {x: 9750.000000000526, y: 234410.69926005095}
                ],
                message: "1-G轴交1-8轴窗【C1013a】(窗ID3040470)图模的尺寸不一致。图纸【1000*1300】,模型【1000*1350】。", // 意见内容
              }, {
                elementState: "0",
                drawingId: "3033964", // 图纸id
                modelId: "1633922369968017408", // 模型id

                componentId: null, // 构件id
                componentName: "", // 构件名称              
                viewEleBox: [ // 构件包围盒信息
                  {x: 22901.00071894146, y: 240660.69926005378},
                  {x: 23101.00071894145, y: 240980.69926005378}
                ],
                message: "1-L轴交1-19轴窗【BY0303b】(窗ID2799998)图模的尺寸不一致。图纸【300*300】,模型【320*320】。", // 意见内容
              }
            ]
          },
        ]
      }]
    }

    window.affiliation = {
      spaceId: 780730513899520, // 意见空间id
      reviewProgress: 'REVIEW', // 审查环节 REVIEW | AUDIT | FINAL
      creatorPersonId: null,
      creatorPersonName: '',
      bizType: 'FJ', // 项目类型（房建FJ，市政SZ）
      specialtyCode: null, // 专业code
      buildingInfo: null, // { buildingId: null, buildingName: ''}, // 单体信息
      targetType: 'view', // 审查对象 draw|model|view|option
      reviewType: 'MODEL_QUALITY', // 设计质量审查 DESIGN_QUALITY，相符性审查MODEL_QUALITY，应用选项审查OPTION_QUALITY
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

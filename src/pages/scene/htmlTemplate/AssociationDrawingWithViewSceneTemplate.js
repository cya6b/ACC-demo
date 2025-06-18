const template = `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/@/assets/vite.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>图模关联</title>
    <link rel="stylesheet" type="text/css" href="/sdk/style.css"/>
  </head>
  <body>
    <div style="padding: 8px;z-index: 9;background: #fff;">
      <span id="resetSourceBtn" style="cursor:pointer;padding:4px;background:#faa">更换数据</span>
    </div>
    <div id="app"></div>

    <!-- 图纸选择框 -->
    <select id="drawingSelect" placeholder="请选择图纸" class="drawing_select">
      <option value="" selected disabled>请选择图纸</option>
      <option value="0">图纸1</option>
      <option value="1">图纸2</option>
    </select>
  </body>
  <script src="/sdk/index.umd.cjs"></script>
  <script>
    function adopt (data) {
    }
  </script>
  <script type="module">
    let source1 = {
      name: '视图名称',
      type: "modelsheet",
      token: "#_viewToken1_#",
      sheetId: 3098292
    }
    let source2 = {
      name: '图纸1',
      type: "model2d",
      token: "#_viewToken2_#",
    }
    let source3 = {
      name: '视图',
      type: "modelsheet",
      token: "#_viewToken1_#",
      sheetId: 3098298
    }
    let d1 = {
      firstDrawing: {
        source: source1,
      },
      secondDrawing: {
        source: source2,
      },
      matric: {
        drawingPoints: [-3950,230210,-750,219210],
        sheetPoints: [-3950,230210,-750,219210]
      }
    }

    let d2 = {
      firstDrawing: {
        source: source1,
      },
      secondDrawing: {
        source: source2,
      },
      matric2: null
    }
    let d3 = {
      firstDrawing: {
        source: source3,
      },
      secondDrawing: {
        source: null
      },
      matric2: null
    }
    let d = [d1, d2, d3]
    let complianceSource = {
      firstDrawing: d[0].firstDrawing,
      secondDrawing: d[0].secondDrawing,
      matric: d[0].matric
    }

    let index = 0

    
    window.onload = function () {
      let resetComplianceSource = function () {
        if (index == 2) {
          index = 0
        } else {
          index++
        }
        complianceSource.matric = d[index].matric
        complianceSource.firstDrawing = d[index].firstDrawing
        complianceSource.secondDrawing = d[index].secondDrawing
        m1.reload(complianceSource)
      }
      let m1 = new gdaJsSDK.Compliance({
        el: "#app",
        source: complianceSource,
        editable: true
      })
      m1.load('#app', () => {
        m1.addEventListener('startSelectDrawingEvent', (selectedCb) => {
          drawingSelectData.selectedCb = selectedCb
          document.getElementById('drawingSelect').style.display = 'block'
        })
        m1.addEventListener('endSelectDrawingEvent', () => {
          document.getElementById('drawingSelect').style.display = 'none'
          drawingSelectData.selectedCb = null
        })
        m1.addEventListener('handlinkConfirmEvent', (val) => {
          alert('保存关联结果')
          val.successCb && val.successCb()
        })
      })

      // 图纸选择逻辑
      let drawingSelectData = {
        defaultDrawingId: null,
        drawingSelectBoxShow: false,
        drawingList: [
          {
            drawingId: 1,
            name: '图纸1',
            type: "model2d",
            token: "#_viewToken2_#"
          }, {
            drawingId: 2,
            name: '图纸2',
            type: "model2d",
            token: "#_viewToken3_#"
          }, {
            drawingId: 3,
            name: '图纸3',
            type: "model2d",
            token: "#_viewToken4_#"
          }
        ]
      }
      let drawingSelect = function (d) {
        if (drawingSelectData.selectedCb) {
          drawingSelectData.selectedCb(d)
        }
      }
      // 图纸选择事件绑定
      let selectDom = document.getElementById('drawingSelect')
      selectDom.addEventListener('change', function (e) {
        let val = selectDom.value
        drawingSelect && drawingSelect(drawingSelectData.drawingList[val])
      })

      // 切换
      document.getElementById('resetSourceBtn').addEventListener('click', resetComplianceSource)

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
      height: calc(100% - 40px);
      display: flex;
    }
    .main{
      height: 100%;
      position: relative;
      width: 100%;
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
      height: 148px;
      top: 0px;
      right: 0px;
      padding: 0px 6px;
      z-index: 99;
    }

    .drawing_select{
      position: absolute;
      top: 108px;
      right: 50px;
      width: 640px;
      height:36px;
      z-index:99;
      display: none;

      background: #18181e;
      color: #fff;
    }

  </style>
</html>`

export default template
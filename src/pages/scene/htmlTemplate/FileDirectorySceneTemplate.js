const template = `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/@/assets/vite.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>文件管理</title>
    <link rel="stylesheet" type="text/css" href="/sdk/style.css"/>
  </head>
  <body>
    <div id="app">
    </div>
  </body>
  <script src="/sdk/index.umd.cjs"></script>
  <script type="module">
    window.onload = function () {
      let m = new gdaJsSDK.FilesDirectory({
        el: "#app",
        sourceParams: {
          containerId: '773678608302080',
        },
        editable: true
      })
      m.load()
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
    }
  </style>
</html>`
export default template
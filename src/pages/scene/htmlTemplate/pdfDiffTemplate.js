const template = `
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/assets/vite.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>福建师范大学BIM合规性审查系统</title>
    <link rel="stylesheet" type="text/css" href="/sdk/style.css"/>
  </head>
  <body>
    <div id="app"></div>
  </body>
  <script src="/sdk/index.umd.cjs"></script>
  <script type="module">
    window.onload = function () {

      let m = new gdaJsSDK.DiffPdf({
        el: "#app",
        source: {
          baseUrl: "/static/xxx.pdf",
          targetUrl: "/static/xxx.pdf"
        }
      })
      m.load("#app", (val) => {
      })
    }
  </script>
  <style>
    #app{
      width: 100%;
      height: 800px;
    }
  </style>
</html>
`
export default template
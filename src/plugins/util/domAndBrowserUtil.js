const funcs = {
  /**
   * @description 判断浏览器及其版本
   */
  getBrowserInfo () {
    let browserInfo = {}
    try {
      let ua = navigator.userAgent
      let isChrome = false
      let browserName
      let version

      const getBrowserVersion = function (name, str) {
        // eslint-disable-next-line no-useless-escape
        let regexp = new RegExp(name + '\/[0-9\.]{1,30}')
        if (regexp.test(str)) {
          let result = regexp.exec(str)
          if (result.length > 0) {
            return result[0].replace(name + '/', '')
          }
        }
        // eslint-disable-next-line no-useless-escape
        regexp = new RegExp(name + ':[0-9\.]{1,30}')
        if (regexp.test(str)) {
          let result = regexp.exec(str)
          if (result.length > 0) {
            return result[0].replace(name + ':', '')
          }
        }
        return ''
      }

      if (/Trident/.test(ua)) {
        browserName = 'ie'
        version = getBrowserVersion('rv', ua)
      } else if (/QIHU/.test(ua) && /360/.test(ua)) { // 360浏览器, 360浏览器没有浏览器版本信息, 只有内核版本信息
        browserName = '360'
        version = ''
      } else if (/MetaSr/.test(ua)) { // 搜狗浏览器, 搜狗浏览器没有浏览器版本信息, 只有内核版本信息
        browserName = 'sougou'
        version = ''
      } else if (/YaBrowser/.test(ua)) { // yandex 一个俄罗斯浏览器
        browserName = 'yandex'
        version = getBrowserVersion('YaBrowser', ua)
      } else if (/Firefox/.test(ua)) { // 火狐浏览器
        browserName = 'firefox'
        version = getBrowserVersion('Firefox', ua)
      } else if (/QQBrowser/.test(ua)) { // QQ浏览器
        browserName = 'qq'
        version = getBrowserVersion('QQBrowser', ua)
      } else if (/WnBrowser/.test(ua)) { // 万能浏览器
        browserName = 'wanneng'
        version = getBrowserVersion('WnBrowser', ua)
      } else if (/BIDUBrowser/.test(ua)) { // 百度六来气
        browserName = 'baidu'
        version = getBrowserVersion('BIDUBrowser', ua)
      } else if (/Edge/.test(ua)) { // Edge浏览器
        browserName = 'edge'
        version = getBrowserVersion('Edge', ua)
      } else if (/Chrome/.test(ua)) { // && (/Mac OS X/.test(ua) || (/Windows/.test(ua)))) { // Chrome浏览器  && /x64/.test(ua)
        browserName = 'chrome'
        version = getBrowserVersion('Chrome', ua)
      } else if (/Safari/.test(ua)) { // iphone端chrome手机浏览器和safari浏览器
        browserName = 'safari'
        version = getBrowserVersion('Safari', ua)
      } else { // 未知浏览器
        browserName = 'unknow'
      }
      // 是chrome内核并且不是360、火狐、QQ、万能
      let is64 = /x64/.test(ua) || /WOW64/.test(ua) || /Mac OS X/.test(ua)
      browserInfo.browser = browserName
      browserInfo.version = version
      browserInfo.is64 = is64
    } catch (e) {
      return browserInfo
    }
    return browserInfo
  },
  nodeListToArr (nodeList) {
    return Array.prototype.slice.call(nodeList)
  },
  getParentDomByClassNameAndAttribute (dom, className, attr, attrValue) {
    let parentDom = dom
    // 最多尝试节点
    const MAX_NODE_COUNT = 20
    let count = 0
    let domNotMatch = true
    while (domNotMatch && count < MAX_NODE_COUNT) {
      parentDom = parentDom.parentNode
      count++
      if (parentDom.classList.contains(className) && (typeof attr === 'undefined' || typeof attrValue === 'undefined' || parentDom.getAttribute(attr) === attrValue)) {
        domNotMatch = false
      }
    }
    if (!domNotMatch) {
      return parentDom
    } else {
      return null
    }
  },
  getTableDataByDom (dom) {
    let data = []
    let tableDom = dom.className.indexOf('el-table') > -1 ? dom : dom.querySelector('.el-table')
    let headerDom = tableDom.querySelector('.el-table__header')
    let headerCellArr = funcs.nodeListToArr(headerDom.querySelectorAll('thead tr .cell'))
    let headerData = []
    headerCellArr.forEach(cellDom => {
      headerData.push(cellDom.innerText)
    })
    data.push(headerData)
    let bodyDom = tableDom.querySelector('.el-table__body')
    let bodyRowArr = funcs.nodeListToArr(bodyDom.querySelectorAll('tbody .el-table__row'))
    bodyRowArr.forEach(rowDom => {
      let rowData = []
      let cellArr = funcs.nodeListToArr(rowDom.querySelectorAll('.cell'))
      cellArr.forEach(cellDom => {
        rowData.push(cellDom.innerText)
      })
      data.push(rowData)
    })
    return data
  },
  // 跨页面传递/获取参数
  overallParam (key, value) {
    if (!key) {
      console.error('缺少必要参数--key[overallParam]')
      return
    } else if (typeof key !== 'string') {
      console.error('参数类型错误--key[overallParam]')
      return
    } else if (!window.opener) {
      console.error('浏览器不支持该方法--window.opener[overallParam]')
      return
    }
    let win = window
    const getParam = key => {
      if (win[key]) {
        return win[key]
      } else {
        if (win.opener) {
          win = win.opener
          return getParam(key)
        }
      }
    }
    const setParam = (key, value) => {
      win[key] = value
      if (win.opener) {
        win = win.opener
        setParam(key, value)
      }
    }
    if (value) {
      setParam(key, value)
    } else {
      return getParam(key)
    }
  },
  // 获取路由参数
  getQueryVariable (url, variable) {
    if (!url) {
      return ''
    }
    let query = ''
    if (url.includes('?')) {
      query = url.split('?')[1]
    }
    if (!query) {
      return ''
    }
    const vars = query.split('&')
    for (let i = 0; i < vars.length; i++) {
      const pair = vars[i].split('=')
      if (pair[0] === variable) {
        return pair[1]
      }
    }
    return ''
  },
  /**
   * cookie中取值
   * */
   getCookie (name) {
    let arr, reg = new RegExp('(^| )' + name + '=([^;]*)(;|$)') // 匹配字段
    if (arr = document.cookie.match(reg)) {
      return unescape(arr[2])
    } else {
      return null
    }
  },

  /**
   * cookie中存值
   * */
  setCookie (name, value) {
    if (value) {
      let days = 1 // 定义一天
      let exp = new Date()
      exp.setTime(exp.getTime() + days * 24 * 60 * 60 * 1000)
      // 写入Cookie, toGMTString将时间转换成字符串
      document.cookie = name + '=' + escape(value) + ';expires=' + exp.toGMTString
    }
  },

  /**
   * 清除指定cookie值
   * */
  delCookie (name) {
    let exp = new Date()
    exp.setTime(exp.getTime() - 1)
    let cval = funcs.setCookie(name)
    if (cval && cval !== null) {
      document.cookie = name + '=' + cval + ';expires=' + exp.toGMTString()
    }
  },

  /**
   * 清除全部cookie值
   * */

  clearCookie () {
    // eslint-disable-next-line no-useless-escape
    let keys = document.cookie.match(/[^ =;]+(?=\=)/g)
    if (keys) {
      for (let i = keys.length; i--;) {
        // document.cookie = keys[i] +'=0;expires=' + new Date( 0).toUTCString()
        document.cookie = keys[i] + '=0;expires=' + new Date(0).toUTCString() + ';path=/video_learning' + ';domain=localhost'
      }
    }
  },

  openSingleWin (url) { // 打开新页面，同时确保该页面只存在一个
    if (!url) {
      return
    }
    if (!window.newOpenWin) {
      window.newOpenWin = window.open(url)
    } else {
      window.tempOpenWin = window.newOpenWin
      window.newOpenWin = window.open(url)
      let t = setTimeout(() => {
        window.tempOpenWin.close()
        window.tempOpenWin = null
        clearTimeout(t)
      }, 500)
    }
  },
  replaceRouteParams (paramsName, value) { // 修改路由中的params值
    let routeInfo = this.$route
    let routeParams = {
      name: routeInfo.name,
      meta: routeInfo.meta,
      params: routeInfo.params
    }
    routeParams.params[paramsName] = value
    if (this.$route.query) {
      routeParams.query = this.$route.query
    }
    this.$router.replace(routeParams)
  },

  setSessionStorageDrawingsReviewData (firstName, secondName, value) { // 更新sessionStorage中的drawingsReviewData
    if (firstName && secondName) {
      let drawingsReviewData = JSON.parse(sessionStorage.getItem('drawingsReviewData'))
      drawingsReviewData[firstName][secondName] = value
      sessionStorage.setItem('drawingsReviewData', JSON.stringify(drawingsReviewData))
    }
  },
  /**
   * @param parentId 包裹容器的id
   * @param selector 容器内元素的选择器，支持id和className
   * @param fn 元素上要执行的函数
   */
  delegate (parent, eventType, selector, fn) {
    // 参数处理
    if (typeof parent === 'string') {
      parent = document.getElementById(parent)
    }
    if (typeof selector !== 'string') {
    }

    if (typeof fn !== 'function') {
    }

    function handle (e) {
      // 获取触发事件的原始事件源
      // 标准DOM方法是用target获取当前事件源
      // IE使用evt.srcElement获取事件源
      let target = e.target || e.srcElement

      // 获取当前正在处理的事件源
      // 标准DOM方法是用currentTarget获取当前事件源
      // IE中的this指向当前处理的事件源
      let currentTarget = e ? e.currentTarget : this

      // 在IE 9下  window.event 与 e 不同 evt没有currentTarget属性,e才有currentTarg

      if (target.id === selector || target.className.indexOf(selector) !== -1) {
        fn.call(target)
      }
    }

    parent.addEventListener(eventType, handle, false)
    //  parent[eventType]=handle;
  },

  setCss (dom, css) {
    Object.keys(css).forEach(key => {
      dom.style.setProperty(key, css[key])
    })
  },
  // 获取元素到屏幕窗口顶部的距离
  getEleTopToWindow (el) {
    const getTop = function (e) {
      let offset = e.offsetTop
      if (e.offsetParent !== null) offset += getTop(e.offsetParent)
      return offset
    }
    return getTop(el)
  },

  isLeftMouseBtn (eOpts) { // 是否鼠标左点击事件
    return eOpts && eOpts.button === 0
  },

  getEvent () {
    let event
    if (window.MouseEvent) event = new MouseEvent('click')
    else {
      event = document.createEvent('MouseEvents')
      event.initMouseEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null)
    }
    return event
  },
  windowResize () {
    if (window.dispatchEvent) {
      window.dispatchEvent(new Event('resize'))
    }
  },

  // 获取页面中z-index最大的元素
  getMaxZIndex() {
    try {
      const allElement = Array.from(document.all);
      const zIndexArray = []
      allElement.forEach((item) => {
        zIndexArray.push(Number(window.getComputedStyle(item, null).getPropertyValue("z-index")) || 0)
      })
      const maxZIndex = Math.max(...zIndexArray)
      return maxZIndex + 1
    } catch (err) {
      return 9999
    }
  }
}
export default funcs

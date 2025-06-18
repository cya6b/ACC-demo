import matric4 from './util/matric4'
import domAndBrowserUtil from './util/domAndBrowserUtil'
import formatFuncs from './util/format'
import specialSymbolTrans from './util/specialSymbolTrans'

const util = {
  // eslint-disable-next-line object-shorthand
  install: function (Vue) {
    Vue.prototype.$util = util
    window.qs = function (selector) {
      return document.querySelector(selector)
    }
    window.gv = function () {
      let dom = qs('.el-button')
      if (!dom) {
        dom = qs('.el-input')
      }
      return dom && dom.__vue__
    }
    window.showMethods = function (object) {
      if (typeof object === 'object') {
        Object.keys(object).forEach(key => {
          window.showMethods(object[key])
        })
      } else if (typeof object === 'string') {
      }
    }
  },
  ...domAndBrowserUtil,
  // 坐标变换
  ...matric4,
  ...formatFuncs,

  downByUrl (url, name) {
    const downloadElement = document.createElement('a')
    downloadElement.href = url
    downloadElement.download = name // 下载后文件名
    document.body.appendChild(downloadElement)
    downloadElement.click() // 点击下载
    document.body.removeChild(downloadElement) // 下载完成移除元素
  },

  specialSymbolTrans: {
    ...specialSymbolTrans
  }
}

export default util
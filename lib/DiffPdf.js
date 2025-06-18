import { createApp } from "vue";
import DiffPdfComponent from '../src/components/view/model/pdf/compare/Diff.vue'
import "../src/style.less"
import '../style/font/iconfont.less'

class DiffPdf {
  constructor (options) {
    if (options === void 0) {
      options = {
        el: "#app",
        apiHost: '', // 接口host
        asscessToken: '', // 鉴权token信息
        source: null,
      }
    }
    this.options = options
    this.rootApp = null
    this.rootE = null
  }

  // 加载添加意見box
  load(el, callback) {
    const _this = this
    load_render.call(_this)

    function load_render () {
      let _el = el || this.options.el
      if (!_el) {
        return
      }
      const rootE = createApp(DiffPdfComponent, this.options)
      this.rootApp = rootE
      if (_el) {
        _this.rootE = rootE.mount(_el);
      }

      setTimeout(() => {
        if (callback) {
          callback(this)
        }
      }, 10)
    }
  }

  reload (data) {
    if (this.rootApp) {
      this.rootApp.reload(data)
    }
  }

  unload () {
    if (this.rootApp) {
      this.rootApp.unmount()
    }
  }
}
export default DiffPdf
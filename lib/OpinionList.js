import { createApp } from "vue";
import OpinionListComponent from '../src/components/service/opinionManagent/OpinionListBox.vue'
import "../src/style.less"
import '../style/font/iconfont.less'

class OpinionList {
  constructor (options) {
    if (options === void 0) {
      options = {
        el: "#app",
        apiHost: '', // 接口host
        asscessToken: '', // 鉴权token信息
        outerChin: {},
        affiliation: { // 所属信息
        },
        // closeHandle: {
        //   type: Function,
        //   default: null
        // },
        // opinionSaveCallBackHandle: {
        //   type: Function,
        //   default: null
        // }
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
      const rootE = createApp(OpinionListComponent, this.options)
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

  unload () {
    if (this.rootApp) {
      this.rootApp.unmount()
    }
  }
}
export default OpinionList
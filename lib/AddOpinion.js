import { createApp } from "vue";
import AddOpinionComponent from '../src/components/service/opinionManagent/AddOpinionBox.vue'
import "../src/style.less"
import '../style/font/iconfont.less'

class AddOpinion {
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
      const rootE = createApp(AddOpinionComponent, this.options)
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

  setOpinionData (data) {
    if (this.rootE) {
      this.rootE.setOpinionData(data)
    }
  }
}
export default AddOpinion
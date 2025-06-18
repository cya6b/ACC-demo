import { createApp } from "vue";
import ComplianceComponent from "../src/components/view/compliance/index.vue"
import "../src/style.less"
import '../style/font/iconfont.less'
class Compliance {
  constructor (options) {
    if (options === void 0) {
      options = {

      }
    } else {
      this.options = options
    }
    this.eleRootObject = null
    this.startSelectDrawingEvent = () => {}
    this.endSelectDrawingEvent = () => {}
    this.handlinkConfirmEvent = () => {}
    this.smartLinkEvent = () => {}
  }

  // 加载图纸模型
  load(el, callback) {
    const _this = this
    load_render.call(_this)

    function load_render () {
      let _el = el || this.options.el
      if (!_el) {
        return
      }
      if (callback) {
        this.options.afterLoad = (val) => {
          callback(val)
        }
      }
      const comp = createApp(ComplianceComponent, this.options)
      this.rootApp = comp
      if (_el) {
        this.eleRootObject = comp.mount(_el);
      }
    }
  }

  unload () {
    if (this.rootApp) {
      this.rootApp.unmount()
    }
  }

  reload (source, callBack) {
    this.eleRootObject && this.eleRootObject.reload(source, callBack)
  }

  addEventListener (type, listener) {
    this.eleRootObject && this.eleRootObject.addEventListener(type, listener)
  }

  setEditable (val) {
    this.eleRootObject && this.eleRootObject.setEditable(val)
  }

  getMainModel () {
    if (!this.eleRootObject) {
      return
    }
    return this.eleRootObject.getMainModel()
  }

  getDrawingModel () {
    if (!this.eleRootObject) {
      return
    }
    return this.eleRootObject.getDrawingModel()
  }

  getLinkMatric () {
    if (!this.eleRootObject) {
      return
    }
    return this.eleRootObject.getLinkMatric()
  }

  getModelPositionByViewPosition (position) {
    if (!this.eleRootObject) {
      return
    }
    return this.eleRootObject.getModelPositionByViewPosition(position)
  }

  clearAllMarkups () {
    if (!this.eleRootObject) {
      return
    }
    return this.eleRootObject.clearAllMarkups()
  }

  clearAllAnnors () {
    if (!this.eleRootObject) {
      return
    }
    return this.eleRootObject.clearAllAnnors()
  }

}
export default Compliance
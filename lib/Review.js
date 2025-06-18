import { createApp } from "vue";
import ReviewComponent from "../src/components/view/Review.vue"
import "../src/style.less"
import '../style/font/iconfont.less'
class Review {
  constructor (options) {
    if (options === void 0) {
      options = {

      }
    } else {
      this.options = options
    }
    this.eleRootObject = null
    this.mainModel = null
    this.subModel = null
  }

  // 加载图纸模型
  load (el, callback) {
    const _this = this
    // if (!window.Vue) {
    //   // 按需引入vue
    //   // import("https://unpkg.com/vue@3.2.45/dist/vue.esm-browser.js").then(a => {
    //   import("./static/vue@3.2.45.js").then(a => {
    //     window.Vue = a
    //     load_render.call(_this)
    //   })
    // } else {
    //   load_render.call(_this)
    // }
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
      const review = createApp(ReviewComponent, this.options)
      this.rootApp = review
      if (_el) {
        _this.eleRootObject = review.mount(_el);
      }
    }
  }

  unload () {
    if (this.rootApp) {
      this.rootApp.unmount()
    }
  }

  reload (source, callBack) {
    this.options.source = source
    this.eleRootObject && this.eleRootObject.reload(source, callBack)
  }

  getMainModel () {
    if (!this.eleRootObject) {
      return
    }
    return this.eleRootObject.mainModel
  }

  getSubModel () {
    if (!this.eleRootObject) {
      return
    }
    return this.eleRootObject.subModel
  }

  addEventListener (type, listener) {
    if (!this.eleRootObject) {
      return
    }
    return this.eleRootObject.addEventListener(type, listener)
  }

  getBoxInfoInDrawingByEleId (eleId) {
    if (!this.eleRootObject) {
      return new Promise(resolve => {
        resolve(null)
      })
    }
    return this.eleRootObject.getBoxInfoInDrawingByEleId(eleId)
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
export default Review
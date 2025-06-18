import { createApp } from "vue";
import ModelViewComponent from "../src/components/view/model/ModelView.vue"
import "../src/style.less"
import '../style/font/iconfont.less'
class Model {
  constructor(options) {
    // if (!SDKLoader.instance) {
    //   SDKLoader.instance = this;
    // }
    if (options === void 0) {
      options = {
        el: "#app",
        source: {
          type: "model2d", // 'model2d', 'model3d', 'modelsheet',
          token: null,
        }
      };
    }
    this.options = Object.assign({}, options);
    this.markupPool = null;
    this.viewer = null;
  }

  // 加载图纸模型
  load(el, callback) {
    const _this = this
    // if (!window.Vue) {
    //   // 按需引入vue
    //   import("https://unpkg.com/vue@3.2.45/dist/vue.esm-browser.js").then(a => {
    //   // import("./static/vue@3.2.45.js").then(a => {
    //     window.Vue = a
    //     load_render.call(_this)
    //   })
    // } else {
    //   load_render.call(_this)
    // }
    load_render.call(_this)

    function load_render () {
      let _el = el || _this.options.el
      if (!_el) {
        return
      }
      if (callback) {
        _this.options.afterLoad = (val) => {
          _this.markupPool = val.markupPool
          callback(val)
        }
      }
      const viewer = createApp(ModelViewComponent, _this.options)
      _this.rootApp = viewer
      if (_el) {
        _this.viewer = viewer.mount(_el);
      }
    }
  }

  unload () {
    if (this.rootApp) {
      this.rootApp.unmount()
    }
  }

  // 重新加载
  reload (source, callBack) {
    this.options.source = source
    this.viewer && this.viewer.reload(source, callBack)
  }

  // 设置批注数据
  setMarkupList (list, type, autoScale = false) {
    this.viewer && this.viewer.setMarkupList(list, type, autoScale)
  }

  activeAnnor (annorIndex, externalTrigger) {
    this.viewer && this.viewer.activeAnnor(annorIndex, externalTrigger)
  }

  unActiveAnnor (annorIndex, externalTrigger) {
    this.viewer && this.viewer.unActiveAnnor(annorIndex, externalTrigger)
  }

  // 截图
  snapshot (color, callBack) {
    callBack = callBack || (() => {})
    this.viewer && this.viewer.snapshot(color, callBack)
  }

  // 获取批注管理器
  getMarkupPoolTool () {
    return this.viewer.getMarkupPoolTool()
  }

  // 隐藏工具条
  hideBimToolBar () {
    this.viewer && this.viewer.hideToolBar()
  }
  // 显示工具条
  showBimToolBar () {
    this.viewer && this.viewer.showToolBar()
  }

  addEventListener (type, listener) {
    this.viewer && this.viewer.addEventListener(type, listener)
  }

  startAnnot () {
    this.viewer && this.viewer.startAnnot()
  }

  cancelAnnot () {
    this.viewer && this.viewer.cancelAnnot()
  }

  clearAllMarkups () {
    this.viewer && this.viewer.clearAllMarkups()
  }
}

export default Model
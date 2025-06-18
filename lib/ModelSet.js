import { createApp } from "vue";
import ModelSetComponent from "../src/components/view/model/ModelSet.vue"
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
          models: [{
            name: '图纸',
            type: "model2d", // 'model2d', 'model3d', 'modelsheet',
            token: null,
            _COLOR: [255, 255, 0, 1],
            matric: null,
          }]
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
      const viewer = createApp(ModelSetComponent, _this.options)
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
    this.viewer && this.viewer.reload(source, callBack)
  }

  // 设置批注数据
  setMarkupList (list, type, autoScale = false) {
    this.viewer && this.viewer.setMarkupList(list, type, autoScale)
  }

  activeAnnor (annorIndex, externalTrigger) {
    this.getMarkupPoolTool().activeAnnor(annorIndex, externalTrigger)
  }

  unActiveAnnor (annorIndex, externalTrigger) {
    this.getMarkupPoolTool().unActiveAnnor(annorIndex, externalTrigger)
  }

  // 截图
  snapshot (color, callBack) {
    callBack = callBack || (() => {})
    this.viewer && this.viewer.snapshot(color, callBack)
  }

  // 获取批注管理器
  getMarkupPoolTool () {
    return this.markupPool
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
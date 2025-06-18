import { createApp } from "vue";
import FileDir from "../src/components/service/fileDirectory/index.vue"
import "../src/style.less"
import '../style/font/iconfont.less'
class FilesDirectory {
  constructor (options) {
    if (options === void 0) {
      options = {
        el: "#app",
        sourceParams: {
          containerId: null,
          folderId: null
        },
        editable: true
      }
    }
    this.options = options
    this.rootE = null
  }

  // 加载
  load(el, callback) {
    const _this = this
    load_render.call(_this)

    function load_render () {
      let _el = el || this.options.el
      if (!_el) {
        return
      }
      const rootE = createApp(FileDir, this.options)
      if (_el) {
        _this.rootE = rootE.mount(_el);
      }
    }
  }
}
export default FilesDirectory
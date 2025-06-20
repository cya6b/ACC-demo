<template>
  <div class="common-editor">
    <textarea ref="textarea"></textarea>
  </div>
</template>
 
<script>
import {toRaw, markRaw} from 'vue'
import 'codemirror/lib/codemirror.css'
import 'codemirror/theme/base16-dark.css'
import 'codemirror/theme/blackboard.css'

import 'codemirror/mode/xml/xml'
import 'codemirror/mode/htmlmixed/htmlmixed'

import  CodeMirror from 'codemirror/lib/codemirror'
export default {
  name: 'CommonEditor',
  props: {
    value: {
      type: String,
      default: ''
    },
    language: {
      type: String,
      default: null
    }
  },
  data() {
    return {
      CommonEditor: false,
      code: '',
      coder: null,
      mode: 'htmlmixed',
      theme: 'default',
      modes: [
        { value: 'html',label: 'XML/HTML' },
        { value: 'javascript', label: 'Javascript' },
        { value: 'x-java', label: 'Java' },
        { value: 'x-python', label: 'Python' },
        { value: 'x-sql', label: 'SQL' },
        { value: 'x-shell', label: 'Shell' },
        { value: 'x-powershell', label: 'PowerShell' },
        { value: 'x-php', label: 'PHP' }
      ]
    }
  },
  watch: {
    language: {
      handler(language) {
        this.getCoder().then(() => {
          // 尝试从父容器获取语法类型
          if (language) {
            // 获取具体的语法类型对象
            const modeObj = this.getLanguage(language)
            // 判断父容器传入的语法是否被支持
            if (modeObj) {
              this.mode = modeObj.label
              this.coder.setOption('mode', `text/${modeObj.value}`)
            }
          }
        })
      },
      immediate: true
    },
    value: {
      handler (val) {
        this.setCodeContent(val)
      }
    }
  },
  computed: {
    coderOptions() {
      return {
        line: true,
        mode: {
          name: this.mode,
          json: true,
          scriptTypes: [{
            matches: /\/x-handlebars-template|\/x-mustache/i,
            mode: null
          }]
        },
        theme: 'blackboard', //设置主题 记得引入对应主题才有显示   import 'codemirror/theme/blackboard.css'
        tabSize: 4,
        lineNumbers: true, // 显示行号
        cursorHeight: 0.8, //光标高度，默认是1
        autoCloseBrackets: true,
        matchBrackets: true, // 括号匹配
        lineWrapping: true, // 文字过长时，是换行(wrap)还是滚动(scroll),默认是滚动
        showCursorWhenSelecting: true, // 文本选中时显示光标
        smartIndent: false, // 智能缩进
        completeSingle: false, // 当匹配只有一项的时候是否自动补全
        autoRefresh: true,
        autofocus: true, // 是否自动获取焦点
        lineWiseCopyCut: false,
        line: true,
      }
    }
  },
  mounted() {
    // 初始化
    this.initialize()
  },
  methods: {
    // 初始化
    initialize() {
      // 初始化编辑器实例，传入需要被实例化的文本域对象和默认配置
      // 使用markRaw标记coder为非响应式对象，解决codemirror内部比较时的无法命中问题 ex: func: getMarkedSpanFor span.marker == marker
      this.coder = markRaw(toRaw(CodeMirror.fromTextArea(
        this.$refs.textarea,
        this.coderOptions
      )))
      this.coder.on('inputRead', () => {
        // this.coder.showHint()
      })
      // 编辑器赋值
      this.setCodeContent(this.value || this.code)

      // 支持双向绑定
      this.coder.on('change', (coder) => {
        this.code = coder.getValue()
      })

       // // 设置codemirror高度
      this.coder.setSize('auto', parseFloat(document.documentElement.clientHeight) - 105)
      
      // 监听屏幕
      const _this = this
      window.onresize = function () {
        // 设置代码区域高度
        _this.coder.setSize('auto',parseFloat(document.documentElement.clientHeight) - 105)
      }
    },
    setCodeContent(val) {
      setTimeout(() => {
        this.coder.setValue(val || '')
      }, 300)
    },
    getCoder() {
      const that = this
      return new Promise((resolve) => {
        ;(function get() {
          if (that.coder) {
            resolve(that.coder)
          } else {
            setTimeout(get, 10)
          }
        })()
      })
    },
    getLanguage(language) {
      // 在支持的语法类型列表中寻找传入的语法类型
      return this.modes.find((mode) => {
        // 所有的值都忽略大小写，方便比较
        const currentLanguage = language.toLowerCase()
        const currentLabel = mode.label.toLowerCase()
        const currentValue = mode.value.toLowerCase()
 
        // 由于真实值可能不规范，例如 java 的真实值是 x-java ，所以讲 value 和 label 同时和传入语法进行比较
        return (
          currentLabel === currentLanguage || currentValue === currentLanguage
        )
      })
    },
    changeMode(val) {
      // 修改编辑器的语法配置
      this.coder.setOption('mode', `text/${val}`)
      // 获取修改后的语法
      const label = this.getLanguage(val).label.toLowerCase()
      // 允许父容器通过以下函数监听当前的语法值
      this.$emit('language-change', label)
    }
  }
}
</script>
<style lang="less" scoped>
.common-editor {
  width: 100%;
  height: 100%;
  :deep(.CodeMirror) {
    // color: #ccc;
    direction: ltr;
    line-height: 20px;
    width: 100%;
    height: 100%;
    // background-color: #000;
  }
 
  .CodeMirror-hints {
    z-index: 9999 !important;
  }
  .custom-class .CodeMirror {
    width: 100%;
  }
}
.CodeMirror-hints {
  z-index: 1000;
}
</style>
<template>
  <!-- 侧边栏|主区域，可以拖动中间的线调整左右两边宽度,side栏slot可以样式指定宽度px，content栏slot样式100%宽度就行 -->
  <div ref="wrap" class="drag-grid-wrap">
    <div ref="side" class="drag-grid-side">
      <slot name="side"></slot>
    </div>
    <div ref="handle" :class="arrowClz"></div>
    <div ref="main" class="drag-grid-main">
      <div class="content">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        timer: {
          turn: false
        },
        cursor: {
          x: 0
        },
        handle: {
          over: false,
          flag: false
        },
        side: {
          width: 100
        },
        main: {
          width: 0
        }
      }
    },
    props: {
      dragDisabled: { // 是否禁用拖动
        defalut: false,
        type: Boolean
      },
      sideMin: {
        type: Number,
        default: null
      },
      sideMax: {
        type: Number,
        default: null
      },
      sideWidth: {
        type: String,
        default: null
      }
    },
    computed: {
      arrowClz() {
        let r = 'drag-grid-handle'
        if (this.handle.flag || this.handle.over) {
          r = 'drag-grid-handle arrow'
        }
        return r
      }
    },
    methods: {
      initStyle() {
        if (this.sideWidth) {
          this.side.width = this.sideWidth
          this.$refs.side.style.width = this.sideWidth
        } else {
          const sideElm = this.$refs.side
          this.side.width = this.getSideWidth(sideElm)
          this.$refs.side.style.width = `${this.side.width}px`
        }

        this.main.width = this.getWidthNum(this.$refs.wrap) - this.getWidthNum(this.$refs.handle) - this.side.width
        this.$refs.main.style.width = `${this.main.width}px`

        // 去掉主区域一些影响展现的样式
        // const defaultElm = this.$refs.main
        // if (defaultElm) {
        //   defaultElm.style.marginLeft = 0
        //   defaultElm.style.width = '100%'
        // }


      },
      getWidthNum(elm) {
        const computedStyle = window.getComputedStyle(elm)
        let width = computedStyle.width.replace(/px/, '')
        return this.getNum(width)
      },
      getSideWidth(elm) {
        let width = this.getWidthNum(elm)
        if (width < this.sideMin) {
          width = this.sideMin
        } else {
          elm.style.width = '100%'
        }
        return width
      },
      getNum(str) {
        const reg = /\d+/
        let r = reg.exec(str)
        if (r) {
          return Number(r[0])
        } else {
          return 0
        }
      },
      initEvent() { // vue在destroyed后会自动注销所有事件监听，这里不用考虑事件绑定引起的内存泄漏问题
        const handle = this.$refs.handle
        handle.addEventListener('mouseover', (e) => {
          this.handle.over = true
        })
        handle.addEventListener('mouseleave', (e) => {
          this.handle.over = false
        })
        handle.addEventListener('mousedown', (e) => {
          if (this.handle.over) {
            this.handle.flag = true
            this.cursor.x = e.screenX
          }
        })

        const wrap = this.$refs.wrap
        wrap.addEventListener('mouseup', (e) => {
          this.handle.flag = false
        })
        wrap.addEventListener('mouseleave', (e) => {
          this.handle.flag = false
        })
        wrap.addEventListener('mousemove', (e) => {
          if (this.handle.flag) {
            this.setElmWidth(this.$refs.side, this.$refs.main, e.screenX)
          }
        })

      },
      setElmWidth(elm, elm1, x) {
        if (this.timer.turn === true) {
          return
        }

        this.timer.turn = true
        const t = setTimeout(() => {
          this.timer.turn = false
          clearTimeout(t)
        }, 100)
        let sum = x - this.cursor.x
        this.cursor.x = x
        if (this.sideMax && (this.side.width + sum > this.sideMax)) {
          return
        }
        if (this.sideMin && (this.side.width + sum < this.sideMin)) {
          return
        }
        this.side.width += sum
        this.main.width -= sum
        elm.style.width = `${this.side.width}px`
        elm1.style.width = `${this.main.width}px`
      }
    },
    mounted() {
      this.initStyle()
      if (this.dragDisabled) {
        return
      }
      this.initEvent()
    }
  }
</script>

<style lang='less' scoped>
  .drag-grid-wrap {
    width: 100%;
    height: 100%;
    display: flex;

    .drag-grid-side {
      min-width: 200px;
      transition: width linear .1s;
      position: relative;
      box-sizing: border-box;
      overflow: hidden;
      overflow-y: auto;
      flex-grow: 0;
      // background-color: #fff;
    }

    .drag-grid-handle {
      flex-grow: 0;
      width: 1px;
      height: auto;
      background-color: #fff;
      border-left: solid 1px #e4e7ed;
      &.arrow {
        border-left: solid 2px #097fdc;
        cursor: w-resize;
      }
    }
    .drag-grid-handle::after{
      left: -8px;
      width: 18px;
      height: 100%;
      content:"";
      position: relative;
      display: block;
    }

    .drag-grid-main {
      overflow: visible;
      position: relative;
      box-sizing: border-box;
      flex-grow: 1;
      background-color: #fff;
      .content{
        width: 100%;
        height: 100%;
        overflow-y: auto;
      }
    }

  }
</style>

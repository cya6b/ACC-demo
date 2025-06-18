<template>
  <div ref="selectRoot" class="__select">
    <div class="content" @click="contentClick">
      <div v-if="currentLabel" class="value">
        <span>{{ currentLabel }}</span>
      </div>
      <div v-else class="placeholder">
        <span>{{ placeholder }}</span>
      </div>
      <span class="_drop_bar">
        <i :class="`gda_sdk_iconfont ${dropdownOpen ? 'icon-xiala1' : 'icon-xiala'}`"></i>
      </span>
    </div>
    <div ref="dropDownBox" v-show="dropdownOpen" :class="dropdownOpen ? 'dropdown_box __open' : 'dropdown_box __hide'">
      <div v-for="item in items"
        :class="currentKey === item.key ? 'dropdown_box_item __selected' : 'dropdown_box_item'"
        @click="itemClick(item)">
        {{ item.label }}
      </div>
      <div v-if="!items.length" class="dropdown_box_item">
        暂无数据
      </div>
    </div>
  </div>
</template>
<script>
/* Copyright (C) <1998-2024> Glodon Company Limited
 * Licensed under the MIT License
 * Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the “Software”), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
 * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
 * THE SOFTWARE IS PROVIDED “AS IS”, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */
import util from '../../../plugins/util'
export default {
  model: {
    event: 'change'
  },
  data () {
    return {
      dropdownOpen: false,
      currentKey: null,
      currentLabel: ''
    }
  },
  props: {
    modelValue: {
      type: String,
      default: ''
    },
    dataList: {
      type: Array,
      default: []
    },
    placeholder: {
      type: String,
      default: '请选择'
    }
  },
  computed: {
    items () {
      return this.dataList.map((d, dIndex) => {
        return {
          ...d,
          key: d.key || dIndex,
          label: d.label || ''
        }
      })
    }
  },
  mounted () {
    this.initOuterClickEvent()
  },
  beforeDestroy() {
    this.destroyOuterClickEvent()
  },
  methods: {
    bodyClick (event) {
      let srcEle = event.srcElement
      let eventInDom = false
      while(srcEle) {
        if (srcEle == this.$refs.selectRoot) {
          eventInDom = true
          break
        }
        srcEle= srcEle.parentElement
      }
      if (!eventInDom) {
        this.hideList()
      }
    },
    initOuterClickEvent () {
      document.addEventListener('click', this.bodyClick);
    },
    destroyOuterClickEvent () {
      document.removeEventListener('click', this.bodyClick);
    },
    itemClick (item) {
      this.currentKey = item.key
      this.$emit('selectedChange', this.currentKey)
      this.$emit('change', item.key)

      this.$emit('update:modelValue', this.currentKey)
      this.hideList()
    },
    contentClick () {
      if (this.dropdownOpen) {
        this.hideList()
      } else {
        this.showList()
      }
    },

    showList () {
      this.dropdownOpen = true
      this.$nextTick(() => {
        this.$refs.dropDownBox.style.zIndex = util.getMaxZIndex()
      })
    },

    hideList () {
      this.dropdownOpen = false
    },

    blurFunc () {
      if (this.closeTimer) {
        clearTimeout(this.closeTimer)
        this.closeTimer = setTimeout(() => {
          this.hideList()
        }, 3000)
      }
    },

    focusFunc () {
      if (this.closeTimer) {
        clearTimeout(this.closeTimer)
        this.closeTimer = null
      }
    },

    setCurrentLabel () {
      let val = this.currentKey
      let ret = ''
      if (val) {
        let item = this.items.find(d => {
          return d.key === val
        })
        if (item) {
          ret = item.label
        }
      }
      this.currentLabel = ret
    }

  },
  watch: {
    modelValue: {
      handler (val) {
        this.currentKey = val
      },
      immediate: true
    },
    currentKey: {
      handler (val) {
        this.setCurrentLabel()
      },
      immediate: true
    },
    dataList: {
      handler (val) {
        this.setCurrentLabel()
      },
      immediate: true
    }
  }
}
</script>

<style lang="less" scoped>
.__select {
  position: relative;
  cursor: pointer;

  min-width: 120px;
  .content {
    height: 40px;
    line-height: 40px;
    color: #d1d1d1;
    font-size: 14px;
    display: flex;

    .value,.placeholder{
      flex-grow: 1;
      padding: 0px 8px;
      overflow: hidden;
      .span{
      }
    }
    .placeholder{
      color: #a4a4a5;
    }
    ._drop_bar{
      padding: 0px 4px;
      i{
        font-size: 22px;
      }     
    }
  }

  .dropdown_box{
    width: 100%;
    position: absolute;
    top: 40px;
    max-height: 186px;
    overflow-y: auto;
    padding: 6px 0px;

    background-color: #40424c;
    box-shadow: 0 0 16px rgba(0,0,0,.16);
    font-size: 14px;

    .dropdown_box_item{
      padding: 0px 12px;
      height: 40px;
      line-height: 40px;
      color: #d1d1d1;
      padding: 0 12px;
      height: 40px;
      line-height: 40px;
      color: #d1d1d1;
      width: calc(100% - 24px);
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      &:hover {
        background: rgba(18,107,255,.1) !important;
      }
    }
    .dropdown_box_item.__selected{
      background-color: rgba(18,107,255,.3);
    }
  }
}

</style>
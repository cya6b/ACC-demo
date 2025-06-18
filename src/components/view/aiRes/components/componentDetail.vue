<!--构件详情-->
<template>
  <div class="component-detail show">
    <div class="content">
      <div class="title">
        <span>构件详情</span>
        <i class="gda_sdk_iconfont icon-guanbi close_icon" @click="close"></i>
      </div>
      <div class="list scroll-bar">
        <div class="info-div">
          <div>{{ originData.name }}</div>
          <div>ID: {{ originData.elementId }}</div>
        </div>
        <div class="result-div">
          <div>检查结果</div>
          <div>{{ originData.elementResult }}</div>
        </div>
        <div class="property-div" v-for="property in originData.properties" :key="property.group">
          <div @click="showDetail(property)" class="group">
            <i :class="`gda_sdk_iconfont icon-down title_r ${property.active ? '' : '__rotate_90'}`"></i>
            <span>{{ property.group }}</span>
          </div>
          <div v-for="item in property.items" :key="item.key" v-if="property.active" class="item">
            <span class="item-key" :title="item.key">{{ item.key }}</span>
            <span class="item-value" :title="item.value">{{ item.value }}</span>
          </div>
        </div>
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
export default {
  name: 'componentDetail',
  props: {
    dataV: {
      type: Object,
    },
  },
  data () {
    return {
      originData: {
        properties: []
      }
    }
  },
  methods: {
    showDetail (property) {
      property.active = !property.active
    },
    close () {
      this.$emit('closeHandle')
    }
  },
  watch: {
    dataV: {
      handler (val) {
        if (val) {
          this.originData = val
        }
      },
      immediate: true
    }
  }
}
</script>

<style lang="less" scoped>
@import './assets/common.less';
.component-detail {
  box-sizing: border-box;
  z-index: 12;
  font-size: 14px;
  color: #f2f2f8;
  overflow: hidden;
  background: rgba(40, 42, 52, 1);
  transition: width 100ms ease;

  &.show {
    width: 100%;
  }

  &.hide {
    width: 0;
    padding: 0;
  }

  .content {
    height: 100%;
    width: 100%;
    margin: 0 auto;
    .list{
      padding: 0px 12px;
      height: calc(100% - 52px);
      overflow-y: auto;
      overflow-x: hidden;
    }

    :deep(.el-loading-mask) {
      background: rgba(40, 42, 52, 1);

      .el-loading-spinner {
        margin-top: -40px;
        top: 30%;

        .circular {
          height: 80px;
          width: 80px;
        }

        .path {
          stroke-width: 1.5;
          stroke: #126bff;
        }
      }
    }

    .title {
      height: 48px;
      line-height: 48px;
      text-align: center;
      border-bottom: 1px solid rgba(84, 86, 100, 1);

      .close_icon {
        margin-right: 26px;
        float: right;
        cursor: pointer;
        &:hover {
          color: #126bff;
        }
      }
    }

    .info-div {
      padding-top: 24px;
      padding-bottom: 24px;
    }

    .result-div {
      background: #363842;
      padding: 12px;
      margin-bottom: 24px;
    }

    .property-div {
      background: #363842;
      padding: 0 36px;
      margin-bottom: 6px;
      width: 100%;
      box-sizing: border-box;

      .group {
        height: 36px;
        line-height: 36px;
        cursor: pointer;
        position: relative;

        .icon {
          position: absolute;
          left: -26px;
          top: 10px;
        }
      }

      .item {
        height: 36px;
        line-height: 36px;
        display: flex;
        justify-content: space-between;
        border-top: 1px solid rgba(84, 86, 100, 1);

        .item-key {
          width: 50%;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .item-value {
          width: 46%;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
      }
    }
  }
}
.__rotate_90{
  transform: rotate(-90deg);
  display: inline-block;
}
.title_r{
  position: absolute;
  left: -20px;
  font-size: 12px;
  position: relative;
  bottom: 2px;
  margin-right: -12px;
}
</style>

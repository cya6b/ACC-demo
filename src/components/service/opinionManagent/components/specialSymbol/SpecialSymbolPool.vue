<template>
  <!-- 特殊符号库 -->
  <span class="label" @click.capture.stop="openDialog">{{ title }}</span>
  <div v-if="act.show" v-drag ref="dragBox" class="symbol_box" @click="updateDragBoxZindex">
    <div class="title">
      {{title}}
      <span class="right_btns">
        <CloseIcon class="close" @click="closeDialog"></CloseIcon>
      </span>
    </div>
    <div class="content">
      <SpecificSymbolTabs @symbolClick="selectSymbolHandle"></SpecificSymbolTabs>
    </div>
  </div>
</template>

<script>
import SpecificSymbolTabs from './SpecificSymbolTabs.vue'
import { drag } from '../../../../../plugins/directives/index'
import { Close as CloseIcon } from '@element-plus/icons-vue'

import util from '../../../../../plugins/util'
export default {
  components: { SpecificSymbolTabs, CloseIcon },
  data () {
    return {
      title: '特殊符号',
      act: {
        show: false
      },
    };
  },
  created() { },
  directives: {
    drag
  },
  watch: {
    'act.show': {
      handler (val) {
        if (val) {
          this.$nextTick(() => {
            this.updateDragBoxZindex()
          })
        }
      }
    }
  },
  methods: {
    openDialog() {
      if (this.act.show) {
        return;
      }
      this.act.show = true;
    },
    closeDialog() {
      this.act.show = false;
    },
    selectSymbolHandle(data) {
      this.$emit("selectSymbolHandle", data);
    },

    updateDragBoxZindex () {
      if (this.$refs.dragBox) {
        this.$refs.dragBox.style.zIndex = util.getMaxZIndex()
      }
    }
  }
}
</script>

<style lang="less" scoped>
@import '../../common.less';
.label{
  color: #126BFF;
  &:hover{
    cursor: pointer;
    color: #3c86fd;
  }
}

.symbol_box{
  display: flex;
  flex-direction: column;

  z-index: 3001;
  position: fixed;
  top: 110px;
  left: calc(50% - 450px);
  width: 900px;
  height: 480px;
  box-sizing: border-box;
  background-color: @backgroundColor;
  box-shadow: 0 0 8px 0 rgba(0,0,0,0.3);
  border-radius: 4px;
  border: solid 1px #212223;

  .title {
    position: relative;
    box-sizing: border-box;
    height: 40px;
    line-height: 40px;
    box-shadow: 0 -1 0 0 #d7dbda;
    margin: 0px 26px;
    font-size: 16px;
    font-weight: normal;
    font-stretch: normal;

    border-bottom: 1px solid #545664;

    .right_btns{
      position: absolute;
      right: -6px;
      width: 22px;
    }

    .close {
      width: 18px;
      color: #9ba1a7;
      margin-right: 24px;
      font-family: element-icons!important;
      speak: none;
      font-style: normal;
      font-weight: 400;
      font-variant: normal;
      text-transform: none;
      vertical-align: baseline;
      display: inline-block;
      -webkit-font-smoothing: antialiased;
      &::before {
        content: "\E60F";
      }
      &:hover, &:active, &:focus {
        color: #0070d2;
      }
    }

    .wrap {
      width: 18px;
      color: #9ba1a7;
      margin-right: 24px;

      font-family: element-icons!important;
      speak: none;
      font-style: normal;
      font-weight: 400;
      font-variant: normal;
      text-transform: none;
      vertical-align: baseline;
      display: inline-block;
      -webkit-font-smoothing: antialiased;
      &::before {
        content: "\E621";
      }
      &:hover, &:active, &:focus {
        color: #0070d2;
      }
    }
  }

  .footer {
    box-sizing: border-box;
    width: 100%;
    height: 60px;
    line-height: 60px;
    padding: 14px 24px;
    background-color: #fff;
    .btn {
      float: right;
      width: 97px;
      height: 32px;
      border-radius: 4px;
      border: solid 1px #dfe2e5;
      background-color: #fff;
      color: #666;
      &:hover,&:active,&:focus {
        color: #0070d2;
        border: solid 1px #0097d2;
      }
    }
  }

  .content{
    padding: 12px 24px;
    flex-grow: 1;
    overflow-y: auto;
  }
}
</style>
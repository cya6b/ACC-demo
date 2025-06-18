<template>
  <!-- <el-dropdown
    @command="cutModelShowType"
    placement="top"
    class="switch-floor-btn"
    :teleported="false"
  >
    <el-button>
      {{ modelShowType === 'all' ? '全楼模型' : '本层模型'
      }}<i class="gda_sdk_iconfont icon-down down_icon"></i>
    </el-button>
    <el-dropdown-menu v-slot:dropdown>
      <el-dropdown-item command="all">全楼模型</el-dropdown-item>
      <el-dropdown-item command="floor">本层模型</el-dropdown-item>
    </el-dropdown-menu>
  </el-dropdown> -->
  <div class="switch-floor-btn">
    <div class="main_item" @click="showListChange">
      {{ modelShowType === 'all' ? '全楼模型' : '本层模型'
      }}<i class="gda_sdk_iconfont icon-down down_icon"></i>
    </div>
    <div v-show="showList" :class="showList ? 'list __show' : 'list __hide'">
      <div :class="modelShowType === 'all' ? 'list_item __active' : 'list_item'" @click="cutModelShowType('all')">全楼模型</div>
      <div :class="modelShowType === 'floor' ? 'list_item __active' : 'list_item'" @click="cutModelShowType('floor')">本层模型</div>
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
// import { ElDropdown, ElDropdownMenu, ElDropdownItem, ElButton } from 'element-plus'
export default {
  components: {
    // ElDropdown,
    // ElDropdownMenu,
    // ElDropdownItem,
    // ElButton
  },
  data () {
    return {
      showList: false,
      modelShowType: 'floor'
    }
  },
  methods: {
    // 切换全楼和楼层
    cutModelShowType (e) {
      this.modelShowType = e
      this.$emit('cutModelShowType', e)
      this.showListChange()
    },

    showListChange () {
      this.showList = !this.showList
    }
  }
}
</script>

<style lang="less" scoped>
.switch-floor-btn {
  position: absolute;
  bottom: 10px;
  border: none;
  text-align: left;
  padding: 0 15px;
  border-radius: 2px;
  left: 6px;
  z-index: 10;
  outline: none;
  cursor: pointer;
  .main_item {
    width: 124px;
    height: 52px;
    line-height: 52px;
    text-align: center;
    border: 1px #333 solid;
    border-radius: 0;
    background: rgba(17, 17, 17, 0.88);
    color: #d1d1d1;
    font-size: 14px;
    .down_icon{
      font-size: 12px;
      margin-left: 4px;
    }
  }

  .list{
    position: absolute;
    bottom: 55px;
    text-align: center;
  }
  .list_item{
    width: 124px;
    height: 52px;
    line-height: 52px;
    color: #d1d1d1;
    border-radius: 0;
    font-size: 14px;
    background: rgb(17, 17, 17) !important;
    border: 1px solid #1c1b1b;
    &:hover {
      background: rgba(17, 17, 17, 0.88) !important;
    }
  }
  .list_item.__active{
    background: rgba(17, 17, 17, 0.88) !important;
  }
}

</style>
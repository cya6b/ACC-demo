<template>
  <div :class="`autolist-search ${active ? '__active' : ''}`">
      <i v-if="!active" class="gda_sdk_iconfont icon-sousuo1" @click="active = true"></i>
      <div class="autolist-operator" v-else>
        <el-input ref="searchInput" class="input_value" v-model="search" :placeholder="` ${placeholder}`"></el-input>
        <span class="func" @click="handleCancel">取消</span>
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
import { ElInput } from 'element-plus'
export default {
  name: '',
  components: {ElInput},
  props: {
    placeholder: {
      type: String,
      default: '请输入“规范名”或“条文号”进行查询'
    }
  },
  data () {
    return {
      active: false,
      search: ''
    }
  },
  watch: {
    search () {
      this.$emit('inputHandle', this.search)
    },
    active (val) {
      if (val) {
        this.$nextTick(() => {
          this.$refs.searchInput.focus()
        })
      }
    }
  },
  methods: {
    handleCancel () {
      this.active = false
      this.search = ''
    }
  }
}
</script>
<style lang='less' scoped>
.autolist-search {
    float: right;
    position: relative;
    .icon-sousuo1 {
        margin-top: 12px;
        display: inline-block;
        color: #F2F2F8;
        cursor: pointer;
        &:hover {
          color: #126BFF;
        }
    }
    .autolist-operator {
        width: 100%;
        position: absolute;
        top: 0px;
        right: 0px;
        // direction: rtl;
        z-index: 1;
        font-size: 14px;
        display: flex;
        .el-input {
            direction: ltr;
            display: inline-block;
            flex-grow: 1;
        }
        .func {
            width: 36px;
            margin-top: 8px;
            color:#f2f2f8;
            margin-left:6px;
            cursor: pointer;
        }
    }
    :deep(.el-input) {
      .el-input__inner {
        padding: 0px 4px;
        color: #f2f2f8;
        border: 1px solid #545664;
        background: #18181e;
        &:hover {
          border: 1px solid #0767b3;
        }
      }
      &.is-disabled {
        .el-input__inner {
          background-color: #282a34;
        }
      }

      .el-input__wrapper{
        background-color: rgba(40, 42, 52, 1);
        box-shadow: none;
        width: calc(100% - 16px);
      }
    }
}
.autolist-search.__active{
  width: 100%;
}
</style>

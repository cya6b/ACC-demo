<template>
  <div class="select_drawing">
    <el-select
    class="my_select_type1"
    popper-class="dark"
    v-model="drawingId"
    @change="drawingChange"
    :popper-append-to-body="false" placeholder="请选择图纸">
      <el-option v-for="item in drawingList" :label="item.name" :key="item.drawingId" :value="item.drawingId"></el-option>
    </el-select>
  </div>
</template>

<script>
/* Copyright (C) <1998-2024> Glodon Company Limited
 * Licensed under the MIT License
 * Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the “Software”), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
 * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
 * THE SOFTWARE IS PROVIDED “AS IS”, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */
import { ElSelect } from 'element-plus'
import { ElOption } from 'element-plus'
export default {
  components: {
    ElSelect,
    ElOption
  },
  name: 'selectDrawing',
  props: {
    defaultDrawingId: {
      type: Number,
      default: null
    },
    drawingList: {
      type: Array,
      default: () => []
    }
  },
  data () {
    return {
      drawingId: ''
    }
  },
  methods: {
    drawingChange (id) {
      const drawing = this.drawingList.find(d => {
        return d.drawingId === id
      })
      this.$emit('drawingChange', drawing)
    }
  },
  watch: {
    defaultDrawingId: {
      handler (val) {
        this.drawingId = val
        if (val) {
          this.drawingChange(val)
        }
      },
      immediate: true
    }
  }
}
</script>

<style lang="less" scoped>
.select_drawing {
  @textColor: #F2F2F8;
  width: 47%;
  height: 30px;
  position: absolute;
  top: 17px;
  padding: 5px 6px;
  background: #282A34;
  box-shadow: 0 0 2px 2px rgba(0, 0, 0, 0.05);
  border-radius: 2px;
  z-index: 9;
  max-width: 50%;
  left: calc(50% + 24px);

  :deep(.el-select) {
    height: 30px;
    width: 100%;

    .el-input {
      height: 30px;

      .el-input__wrapper{
        background-color: #18181E;
        border: none;
        box-shadow: inherit;
      }
      .el-input__inner {
        color: @textColor;
        height: 28px !important;
        background-color: #18181E;
        border: none;
        box-sizing: border-box;
        border-radius: 2px;

        &::placeholder {
          color: #999;
        }
      }
    }

    .el-select-dropdown {
      color: @textColor;
      background-color: #40424C;
      box-shadow: 0 0 16px rgba(0, 0, 0, 0.16);
      border: none;

      .el-select-dropdown__item {
        color: @textColor;

        &.hover {
          background-color: rgba(18, 107, 255, 0.1);
        }

        &.selected {
          background-color: rgba(18, 107, 255, 0.3);
        }
      }

      .popper__arrow {
        border-bottom-color: #40424C;

        &::after {
          border-bottom-color: inherit;
        }
      }
    }
  }
}
</style>

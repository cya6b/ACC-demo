<template>
  <template v-if="unstart || fail">
    <el-button
      type="primary"
      @click="startSmartLink"
      :disabled="disabled"
    >
      开始智能关联
    </el-button>
  </template>
  <template v-else-if="processing">
    <el-button
      type="primary"
      @click="endSmartLink"
    >
      中止智能关联
    </el-button>
  </template>
</template>

<script>
/* Copyright (C) <1998-2024> Glodon Company Limited
 * Licensed under the MIT License
 * Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the “Software”), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
 * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
 * THE SOFTWARE IS PROVIDED “AS IS”, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */
const statusMap = {
  FAIL: 'fail',
  SUCCESS: 'success',
  UN_START: 'unstart',
  PROGRESS: 'progress'
}
import {ElButton} from 'element-plus'
export default {
  components: {ElButton},
  data () {
    return {
      status: '',
    }
  },
  props: {
    disabled: {
      type: Boolean
    },
    linkStatus: {
      type: String
    }
  },
  computed: {
    unstart () {
      return this.status === statusMap.UN_START
    },
    fail () {
      return this.status === statusMap.FAIL
    },
    success () {
      return this.status === statusMap.SUCCESS
    },
    processing () {
      return this.status === statusMap.PROGRESS
    }
  },
  watch: {
    linkStatus: {
      handler (val) {
        this.status = val
      },
      immediate: true
    }
  },
  methods: {
    startSmartLink () {
      this.$emit('startSmartLink')
    },
    endSmartLink () {
      this.$emit('endSmartLink')
    }
  }
}
</script>

<style>

</style>
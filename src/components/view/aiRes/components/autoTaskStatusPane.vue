<template>
  <div class="status_content">
    <div v-if="taskNotFound">
      <img src="/src/assets/auto_review_fail.gif"/>
      <span>未发起审查!</span>
    </div>
    <div v-if="taskRunning">
      <img src="/src/assets/auto_review_running.gif"/>
      <span>正在智能审查中，请稍后...</span>
    </div>
    <div v-if="taskFail">
      <img src="/src/assets/auto_review_fail.gif"/>
      <span>审查失败,请重新发起审查!</span>
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
  props: {
    taskStatus: {
      default: null,
      type: String
    },
  },
  data () {
    return {
      status: null
    }
  },
  computed: {
    taskNotFound () {
      return !this.status
    },
    taskRunning () {
      return this.status === 'RUNNING'
    },
    taskFail () {
      return this.status === 'FAIL'
    }
  },
  watch: {
    taskStatus: {
      handler (val) {
        this.status = val
      },
      immediate: true
    }
  }
}
</script>

<style lang="less" scoped>
.status_content{
  text-align: center;
}
img{
  width: 72px;
  margin: 0px auto;
  margin-top: 152px;
  margin-bottom: 12px;
  display: block;
}
span{
  color: #fff;
}
</style>

<template>
  <ElPopover key="popover" placement="left"
    effect="dark"
    width="320"
    popper-class="auto-detail-tooltip">
    <template #reference>
      <span>{{ comment.name }}</span>
    </template>
    <div class="title">
      <span v-if="comment.strong" class="strong-badge">强条</span>
      {{ comment.name }}
    </div>
    <div v-html="comment.articleContent"></div>
  </ElPopover>
</template>

<script>
/* Copyright (C) <1998-2024> Glodon Company Limited
 * Licensed under the MIT License
 * Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the “Software”), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
 * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
 * THE SOFTWARE IS PROVIDED “AS IS”, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */
import { ElPopover } from 'element-plus'
export default {
  components: {ElPopover},
  props: {
    comment: {
      type: Object,
      default: {}
    }
  }
}
</script>

<style>

</style>
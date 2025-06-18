<template>
  <div class="__gda_sdk" style="height: 100%">
    <!-- <div>
      <input type="file" id="fileInput" multiple>
    </div> -->
    <diff-pdf style="height: 100%" :baseData="baseData" :targetData="targetData"></diff-pdf>
  </div>
</template>
<script>
/* Copyright (C) <1998-2024> Glodon Company Limited
 * Licensed under the MIT License
 * Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the “Software”), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
 * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
 * THE SOFTWARE IS PROVIDED “AS IS”, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */
import axios from 'axios'
import DiffPdf from './DiffPdf.vue'
export default {
  components: { DiffPdf },
  compontents: {
    DiffPdf
  },
  props: {
    source: {
      type: Object,
      default: null
    }
  },
  data () {
    return {
      baseUrl: null,
      targetUrl: null,
      baseData: null,
      targetData: null
    }
  },
  created () {
  },
  mounted () {
  },
  methods: {
    setSourceData (data) {
      if (data) {
        this.baseUrl = data.baseUrl
        this.targetUrl = data.targetUrl
      }
      this.initFileUrl()
    },
    initFileUrl () {
      if (this.baseUrl) {
        this.getFileByUrl('Base', this.baseUrl)
      }

      if (this.targetUrl) {
        this.getFileByUrl('Target', this.targetUrl)
      }
    },
    getFileByUrl (type, url) {
      const _this = this
      axios({
        method: 'GET',
        url,
        responseType: 'blob'
      }).then(resp => {
        if (type === 'Base') {
          _this.baseData = resp.data
        } else if (type === 'Target') {
          _this.targetData = resp.data
        }
      })
    },

    reload (data) {
      this.setSourceData(data)
    }
  },
  watch: {
    source: {
      handler (val) {
        if (val) {
          this.setSourceData(val)
        }
      },
      immediate: true,
      deep: true
    }
  }
}
</script>
<style lang="less" scoped>
</style>
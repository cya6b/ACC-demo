<template>
  <div id="pdfDiff"></div>
</template>

<script>
import axios from 'axios'
import DiffPdf from '../../../lib/DiffPdf'
export default {
  data () {
    return {
      containerId: 773678608302080,
      file1Id: 848330873032704,
      file2Id: 848330875301888
    }
  },
  created () {
    this.init()
  },
  methods: {
    async init () {
      let file1Params = {
        containerId: this.containerId,
        fileId: this.file1Id,
        fileVersion: 1,
      }
      let file1UrlRes = await axios.get(`/api/file/v2/gfile/getDownloadUrl`, {params: file1Params})
      let file2Params = {
        containerId: this.containerId,
        fileId: this.file2Id,
        fileVersion: 1,
      }
      let file2UrlRes = await axios.get(`/api/file/v2/gfile/getDownloadUrl`, {params: file2Params})
      this.load(file1UrlRes?.data?.detail, file2UrlRes?.data?.detail)
    },
    load (file1Url, file2Url) {
      if (this.pdfDiff) {
        this.pdfDiff.reload({
          source: {
            baseUrl: file1Url,
            targetUrl: file2Url
          }
        })
        return
      }
      let a = new DiffPdf({
        el: "#pdfDiff",
        source: {
          baseUrl: file1Url,
          targetUrl: file2Url
        }
      })
      a.load("#pdfDiff", (data) => {
        //
      })
      this.pdfDiff = a
    }
  }
}
</script>

<style lang="less" scoped>
#pdfDiff{
  height: calc(100% - 2px);
}
</style>
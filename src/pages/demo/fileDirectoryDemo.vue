<template>
  <FileDirectory
  :sourceParams="sourceParams"
    :editable="editable"
    :fileClickHandle="fileClickHandle"></FileDirectory>
</template>

<script>
import FileDirectory from '../../components/service/fileDirectory/index.vue'
export default {
  components: {
    FileDirectory
  },
  data () {
    return {
      sourceParams: {
        containerId: '773678608302080',
        folderId: null
      },
      editable: true
    }
  },
  created () {
    if (this.$route.query.containerId) {
      this.sourceParams.containerId = this.$route.query.containerId
    }
    if (this.$route.query.folderId) {
      this.sourceParams.folderId = this.$route.query.folderId
    }
    if (this.$route.query.editable) {
      this.editable = this.$route.query.editable == 'true'
    }
  },
  methods: {
    fileClickHandle (file) {
      window.open(`#/preview?containerId=${file.containerId}&fileId=${file.fileId}`, '_blank')
    }
  }
}
</script>

<style>

</style>
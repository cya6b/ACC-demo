<template>
  <template v-if="showModelView">
    <Model v-if="previewToken" :source="{
      token: previewToken,
      type: previewType
    }"></Model>
    <div v-else>未获取到viewToken</div>
  </template>
</template>

<script>
const allowBimface2dTypes = [
  'dwg',
  'DWG',
]
const allowBimface3dTypes = [
  'rvt',
  'RVT',
  'zdb',
  'ZDB',
  'GFC',
  'gfc',
  'IFC',
  'ifc'
]
const allowTypes = [
  ...allowBimface2dTypes,
  ...allowBimface3dTypes
]
import api from './api.js'
import Model from '../../components/view/model/ModelView.vue'
export default {
  components: {
    Model
  },
  data () {
    return {
      fileInfo: null,
      previewToken: null,
      previewType: ''
    }
  },
  computed: {
    showModelView () {
      return this.fileInfo && this.isbimfaceAllowType(this.fileInfo.filename)
    }
  },
  async created () {
    if (this.$route.query.containerId && this.$route.query.fileId) {
      let res = await api.getFileInfo({
        containerId: this.$route.query.containerId,
        fileId: this.$route.query.fileId
      })
      if (res && res.data.code === 'SUCCESS') {
        this.fileInfo = res.data.detail

        this.previewType = this.getPreviewType(this.fileInfo.filename)
        let tokenRes = await api.getViewToken({
          containerId: this.$route.query.containerId,
          fileId: this.$route.query.fileId,
          viewTokenType: 'CONVERT'
        })

        if(tokenRes && tokenRes.data.code  === 'SUCCESS' && tokenRes.data.detail) {
          this.previewToken = tokenRes.data.detail.viewToken
        }
      }
    }
  },
  methods: {
    isbimfaceAllowType(filename) {
      let sufix = filename.split('.')[1]
      return allowTypes.includes(sufix)
    },

    getPreviewType (filename) {
      let ret = ''
      let sufix = filename.split('.')[1]
      if (allowBimface2dTypes.includes(sufix)) {
        ret = 'model2d'
      }
      if (allowBimface3dTypes.includes(sufix)) {
        ret = 'model3d'
      }
      return ret
    }
  }
}
</script>

<style>

</style>
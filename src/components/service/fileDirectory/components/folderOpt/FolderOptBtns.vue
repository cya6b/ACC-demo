<template>
  <div class="btns">
    <!-- 签章撤签 -->
    <!-- <span>签章状态显示</span>
    <span>签章</span>
    <span>撤签</span> -->
    <!-- 压缩下载 -->
    <span v-if="packing" class="off">压缩中</span>
    <span v-else @click.stop="pack">压缩</span>
    <span :class="downLoadBtnClz" @click.stop="downLoad">下载</span>
  </div>
</template>

<script>
import { ElMessage } from 'element-plus'
import api from '../../api.js'
import util from '../../../../../plugins/util.js'
export default {
  data () {
    return {
      node: {}
    }
  },
  props: {
    nodeData: {
      type: Object,
      default: () => {}
    }
  },
  inject: ['apiHost'],
  watch: {
    nodeData: {
      handler (val) {
        this.node = val

        if (this.packing) {
          this.getPackStatus()
        }
      },
      immediate: true
    }
  },
  computed: {
    packing () {
      return this.node.data.packStatus == 'PROCESS'
    },
    downLoadBtnClz () {
      if (this.node.data.packStatus !== 'SUCCESS') {
        return 'off'
      }
    },
  },
  methods: {
    pack () {
      const _this = this
      api.packFolder({
        containerId: this.node.data.containerId,
        folderId: this.node.data.fileId
      }, this.apiHost).then(res => {
        if (res.data.code === 'SUCCESS') {
          _this.node.data.packStatus = 'PROCESS'
          this.getPackStatus()
        }
      })
    },
    downLoad () {
      if (this.node.data.packStatus !== 'SUCCESS') {
        return
      }
      const _this = this
      api.getPackDownloadUrl({
        containerId: this.node.data.containerId,
        folderId: this.node.data.fileId
      }, this.apiHost).then(res => {
        if (res.data.code === 'SUCCESS') {
          let detail = res.data.detail
          if (detail) {
            let url = res.data.detail
            util.downByUrl(url, _this.node.data.filename)
          } else {
            ElMessage.error('获取下载地址失败!')
          }
        }
      })
    },

    getPackStatus () {
      const _this = this
      if (this.timer) {
        clearInterval(this.timer)
      }
      this.timer = setInterval(() => {
        api.getPackStatus({
          containerId: this.node.data.containerId,
          folderId: this.node.data.fileId
        }, this.apiHost).then(res => {
          if (res.data.code === 'SUCCESS') {
            let detail = res.data.detail
            _this.node.data.packStatus = detail
            if (detail === 'SUCCESS' || detail === 'FAILED') {
              clearInterval(_this.timer)
            }
          }
        })
      }, 2000)
    }
  },
  beforeUnmount () {
    if (this.timer) {
      clearInterval(this.timer)
    }
  }
}
</script>

<style lang="less" scoped>
.btns{
  span{
    margin-right: 6px;
    cursor: pointer;
    color: #0066a5;
    &:hover{
      color: #499bf0;
    }

    &.off {
      color: #909399;
    }
  }
}

</style>
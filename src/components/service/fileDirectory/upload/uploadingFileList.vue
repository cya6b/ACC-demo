<template>
  <div v-show="visible" class="uploading_box">
    <div class="title" id="gld-uploadlist-title">
      {{title}}
      <span class="right_btns">
        <MinusIcon class="wrap" @click="hide"></MinusIcon>
        <CloseIcon class="close" @click="cancelUpdate"></CloseIcon>
      </span>
    </div>
    <div class="upload_tips">
      {{ uploadTip }}
    </div>
    <div class="uploading_file_list">
      <div class="uploading_file_item" v-for="f in fileList" :key="f">
        <span class="file_name">{{ f.filename }}</span>
        <span class="folder_name">{{ f.foldername }}</span>
        <span class="uploading_info">
          <span class="uploading_status">
            <SuccessIcon v-if="statusWord(f) === '上传成功'" class="status_icon success"></SuccessIcon>
            <FailIcon v-if="statusWord(f) === '上传失败'" class="status_icon fail"></FailIcon>
            <InfoIcon v-if="statusWord(f) === '校验失败'" class="status_icon warning"></InfoIcon>
            <UploadingIcon v-if="statusWord(f) === '上传中' || statusWord(f) === '保存中'" class="status_icon uploading"></UploadingIcon>
            <WaitingIcon v-if="statusWord(f) === '等待上传'" class="status_icon waitting"></WaitingIcon>
            {{ statusWord(f) }}
          </span>

          <!-- 校验不通过原因 -->
          <span v-if="f.uploading_status === UPLOAD_STATUS.invalid" class="upload_fail_valid">
            {{ f.invalidMsg }}
          </span>

          <!-- 上传进度 -->
          <span v-else class="uploading_persent">
            {{ f.uploading_persent || 0 }}%
          </span>

          <!-- 上传过程中, 取消上传 -->
          <span v-if="f.uploading_status === UPLOAD_STATUS.padding && f.uploading_persent"
            class="cancel_uploading_btn"
            @click="cancelUploading(f)">
            取消上传
          </span>
        </span>
      </div>
    </div>
    <div class="footer">
      <el-button type="text" size="mini" class="btn" @click="cancelUpdate">
        {{inUploading ?'取消上传':'关闭'}}
      </el-button>
    </div>
  </div>
</template>

<script>
import {
  Close as CloseIcon,
  Minus as MinusIcon,
  SuccessFilled as SuccessIcon,
  CircleCloseFilled as FailIcon,
  WarningFilled as InfoIcon,
  Loading as UploadingIcon,
  MoreFilled as WaitingIcon
} from '@element-plus/icons-vue';
import {ElButton} from 'element-plus'
const UPLOAD_STATUS = {
  unstart: 'unstart',
  padding: 'padding',
  invalid: 'invalid',
  success: 'success',
  fail: 'fail',
  cancel: 'cancel'
}
import Uploader from '../../Upload/index.js'
import config from './uploadConfig.js'
export default {
  components: {
    CloseIcon,
    MinusIcon,
    ElButton,
    SuccessIcon,
    FailIcon,
    InfoIcon,
    UploadingIcon,
    WaitingIcon
  },
  data () {
    return {
      UPLOAD_STATUS,
      title: '文件上传',
      uploadTip: '提示: 此处可自定义上传提示信息',
      fileList: [],
      currentUploadingFileIndex: null,
      visible: false,
    }
  },
  props: {
    files: {
      type: Array,
      defualt: () => []
    }
  },
  watch: {
    files: {
      handler (val) {
        this.addFiles(val)
      }
    },
    currentUploadingFileIndex: {
      handler (val) {
        if (val !== null) {
          this.uploadFile(this.fileList[val])
          
          if (val == this.fileList.length - 1) { // 当前已为最后一个
            this.currentUploadingFileIndex = null
          }
        }
      }
    }
  },
  computed: {
    inUploading () {
      return this.currentUploadingFileIndex !== null
    },
    statusWord () {
      return f => {
        let word = ''
        switch (f.uploading_status) {
          case UPLOAD_STATUS.unstart: {
            word = '等待上传'
            break
          }
          case UPLOAD_STATUS.padding: {
            word = '上传中'
            break
          }
          case UPLOAD_STATUS.success: {
            word = '保存中'
            if (f.save_status === 'success') {
              word = '上传成功'
            }
            if (f.save_status === 'fail') {
              word = '上传失败'
            }
            break
          }
          case UPLOAD_STATUS.fail: {
            word = '上传失败'
            break
          }
          case UPLOAD_STATUS.invalid: {
            word = '校验失败'
            break
          }
          case UPLOAD_STATUS.cancel: {
            word = '已取消'
            break
          }
          default: {}
        }
        return word
      }
    }
  },
  methods: {
    show () {
      this.visible = true
    },
    hide () {
      this.visible = false
    },
    cancelUpdate () {
      this.visible = false
      this.currentUploadingFileIndex = null
      this.fileList = []
    },
    addFiles (files) {
      if (Array.isArray(files)) {
        files.forEach(v => {
          this.fileList.push({
            file: v,
            filename: v.name,
            fileSize: v.size,
            foldername: '文件夹',
            uploading_status: UPLOAD_STATUS.unstart
          })
        })
      }
      this.beginUpload()
    },
    getNextWaittingUplod () {
      let unstIndex = this.fileList.findIndex(f => {
        return f.uploading_status == UPLOAD_STATUS.unstart
      })
      if (unstIndex > -1) {
        return unstIndex
      }
      return null
    },
    formatValid (filename) {
      return true
    },
    sizeValid (size) {
      if (!size) {
        return false
      }
      return true
    },
    validFile (fileData) {
      let ret = {
        pass: true,
        invalidMsg: ''
      }
      if (!this.formatValid(fileData.filename)) {
        ret.pass = false
        ret.invalidMsg = '非法文件格式，不允许上传!'
      }
      if (!this.sizeValid(fileData.fileSize)) {
        ret.pass = false
        ret.invalidMsg = '非法文件大小，不允许上传!'
      }
      return ret
    },
    preValidFiles () {
      const _this = this
      this.fileList.forEach(f => {
        let validRes = _this.validFile(f)
        if (!validRes.pass) {
          f.uploading_status = UPLOAD_STATUS.invalid
          f.invalidMsg = validRes.invalidMsg
        }
      })
    },
    beginUpload () {
      this.show()
      if (this.currentUploadingFileIndex == null) {
        this.preValidFiles()
        this.currentUploadingFileIndex = this.getNextWaittingUplod()
      }
    },
    async uploadFile (fileData) {
      const _this =this
      try {
        fileData.uploading_status = UPLOAD_STATUS.padding
        const uploadRes = await Uploader.upload({
          file: fileData.file,
          uploadInfoUrl: config.uploadInfoUrl,
          handleProcess: ev => {
            fileData.uploading_persent = parseInt((ev.loaded / ev.total) * 100)
          },
          getCancelSource: source => {
            if (source) {
              fileData.cancelSource = source
            }
          }
        })
        if (uploadRes) {
          if (uploadRes.objectKey) {
            // 上传完成将进度置为100%
            fileData.uploading_persent = 100

            fileData.uploading_status = UPLOAD_STATUS.success
            let f = {
              oFile: fileData,
              objectKey: uploadRes.objectKey,
              filename: uploadRes.objectName,
              fileSize: uploadRes.objectSize,
              md5: uploadRes.md5,
            }
            this.$emit('uploadSuccess', f)
          }
        } else {
          // 上传失败
          fileData.uploading_status = UPLOAD_STATUS.fail
        }
        this.currentUploadingFileIndex = this.getNextWaittingUplod()
      } catch (err) {
        this.currentUploadingFileIndex = this.getNextWaittingUplod()
        if (err.message == '手动取消请求') {
          return
        }
        fileData.uploading_status = UPLOAD_STATUS.fail
      }
    },

    cancelUploading (f) {
      if (f.cancelSource) {
        f.cancelSource.cancel('手动取消请求')

        // 设置文件上传状态为取消
        f.uploading_status = UPLOAD_STATUS.cancel
      }
    }
  }
}
</script>

<style lang="less" scoped>
.uploading_box{
  display: flex;
  flex-direction: column;

  z-index: 3001;
  position: fixed;
  top: 110px;
  left: calc(50% - 450px);
  width: 900px;
  height: 480px;
  box-sizing: border-box;
  background-color: #fff;
  box-shadow: 0 0 8px 0 rgba(0,0,0,0.3);
  border-radius: 4px;
  border: solid 1px #dfe2e5;

  .title {
    position: relative;
    box-sizing: border-box;
    width: 100%;
    height: 40px;
    line-height: 40px;
    background-color: #f8f8f8;
    box-shadow: 0 -1 0 0 #d7dbda;
    padding-left: 26px;
    font-size: 16px;
    font-weight: normal;
    font-stretch: normal;
    color: #3c3c3c;

    .right_btns{
      position: absolute;
      right: 6px;
    }

    .close {
      width: 18px;
      color: #9ba1a7;
      margin-right: 24px;
      font-family: element-icons!important;
      speak: none;
      font-style: normal;
      font-weight: 400;
      font-variant: normal;
      text-transform: none;
      vertical-align: baseline;
      display: inline-block;
      -webkit-font-smoothing: antialiased;
      &::before {
        content: "\E60F";
      }
      &:hover, &:active, &:focus {
        color: #0070d2;
      }
    }

    .wrap {
      width: 18px;
      color: #9ba1a7;
      margin-right: 24px;

      font-family: element-icons!important;
      speak: none;
      font-style: normal;
      font-weight: 400;
      font-variant: normal;
      text-transform: none;
      vertical-align: baseline;
      display: inline-block;
      -webkit-font-smoothing: antialiased;
      &::before {
        content: "\E621";
      }
      &:hover, &:active, &:focus {
        color: #0070d2;
      }
    }
  }

  .upload_tips {
    padding: 0px 12px;
    height: 40px;
    line-height: 40px;
    color: #f5a623;
    border-bottom: 1px solid #ebeef5;
    font-size: 14px;
  }
  .uploading_file_list{
    padding: 0px 12px;
    flex-grow: 1;
    overflow-y: auto;

    .uploading_file_item{
      width: 100%;
      height: 40px;
      line-height: 40px;
      background-color: #fff;
      font-size: 14px;
      color: #3c3c3c;
      display: flex;
      
      &:hover,&:active, &:focus {
        background-color: #ddecff;
      }

      .file_name{
        width: 400px;
      }

      .folder_name{
        width: 160px;
      }
      .uploading_info{
        flex-grow: 1;

        span{
          +span{
            margin-left: 6px;
          }
        }

        .uploading_status {
          .status_icon{
            width: 20px;
            position: relative;
            top: 4px;

            &.success{
              color: #00b18e;
            }
            &.warning{
              color: #f5a623
            }
            &.fail{
              color: #ff5d3f;
            }
            &.waitting,&.uploading{
              color: #409eff;
            }
          }
        }

        .cancel_uploading_btn{
          cursor: pointer;
          &:hover{
            color: #0070d2;
          }
        }
      }
    }
  }
  .footer {
    box-sizing: border-box;
    width: 100%;
    height: 60px;
    line-height: 60px;
    padding: 14px 24px;
    background-color: #fff;
    .btn {
      float: right;
      width: 97px;
      height: 32px;
      border-radius: 4px;
      border: solid 1px #dfe2e5;
      background-color: #fff;
      color: #666;
      &:hover,&:active,&:focus {
        color: #0070d2;
        border: solid 1px #0097d2;
      }
    }
  }
}

</style>
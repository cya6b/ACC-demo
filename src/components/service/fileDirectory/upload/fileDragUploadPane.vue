<template>
  <DragUpload @dropFunc="dropUploadFiles" :accept="config.acceptFileTypes">
    <div class="drag-wrap">
        <div class="left-pic"></div>
        <div class="sub-text">您还没有上传文件</div>
        <div class="btn-wrap">
          <span class="upload_btn" @click="uploadBtnClick">上传文件</span>
          <input ref="fileInput" type="file" style="display:none" multiple class="fileDoms" @change="uploadFiles"/>
        </div>
    </div>
  </DragUpload>
</template>

<script>
import config from './uploadConfig.js'
import DragUpload from './components/DragUpload.vue';
export default {
    components: { DragUpload },
    data () {
      return {
        config,
      }
    },
    methods: {
      uploadBtnClick () {
        this.$refs.fileInput.click()
      },
      dropUploadFiles (files) {
        this.$emit('uploadFiles', files)
      },
      uploadFiles (event) {
        let files = event.target.files
        if (!files) return
        this.$emit('uploadFiles', [...files])

        event.target.value = ''
      }
    }
}
</script>

<style lang="less" scoped>
.upload_btn{
  background-color: #0767b3;
  color: #fff;
  border-color: #0767b3;
  display: inline-block;
  width: 120px;
  text-align: center;
  padding: 4px 0px;
  font-size: 14px;
  border-radius: 2px;
  cursor: pointer;
  &:hover{
    background-color: #1b71b8;
  }
}

.drag-wrap {
    width: 100%;
    .left-pic {
      width: 146px;
      height: 146px;
      background-color: #fff;
      margin: 99px auto 0;
      background-image: url('../../../../assets/img-for-drag-upload.png');
      background-repeat: no-repeat;
      background-size: auto;
      background-position: center;
    }
    .sub-text {
      width: 100%;
      height: 26px;
      line-height: 26px;
      text-align: center;
      font-size: 16px;
      color: #4a4a4a;
      margin-top: 0;
    }
    .btn-wrap {
      width: 100%;
      text-align:center;
      margin-top: 12px;
    }
}
</style>
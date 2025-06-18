<template>
  <div class="__gda_sdk files_directory">
    <div class="file_directory_content" :class="editable ? 'has_opt' : ''">
      <drag-grid-layout :sideMin="320" :sideMax="600">
        <template v-slot:side>
          <directory-tree ref="leftTree" :sourceParams="sourceParams" @getFileList="getFileList" class="left_directory"></directory-tree>
        </template>
        <div class="right_file_list">
          <div v-if="editable" class="opreates">
            <opreator-btns @uploadFiles="uploadFiles" @removeFiles="removeFiles"></opreator-btns>
          </div>
          <file-list class="list" ref="fileList" v-show="showFileList"
            @uploadFiles="uploadFiles"
            :listLoading="listLoading"
            :tHeaderType="'default'"
            :files="fileList"
            @folderChange="folderChange"
            @filenameClick="filenameClick"
            @fileListChange="fileListChange"></file-list>
        </div>
      </drag-grid-layout>
    </div>

    <UploadingFileList v-drag ref="fileUploader" @uploadSuccess="saveFile"></UploadingFileList>
  </div>
</template>

<script>
import { drag } from '../../../plugins/directives/index.js'
import DragGridLayout from '../../layout/DragGridLayout.vue'
import OpreatorBtns from './components/OpreatorBtns.vue'
import FileList from './components/FileList.vue'
import DirectoryTree from './components/DirectoryTree.vue'
import api from './api.js'
import UploadingFileList from './upload/uploadingFileList.vue'
export default {
  components: {
    OpreatorBtns,
    FileList,
    DirectoryTree,
    DragGridLayout,
    UploadingFileList
  },
  provide () {
    return {
      editable: this.editable,
      apiHost: this.host
    }
  },
  data () {
    return {
      listLoading: false,
      showFileList: false,
      fileList: [],
    }
  },
  props: {
    sourceParams: {
      type: Object,
      default: ()=> {}
    },
    editable: {
      default: true
    },

    host: null,
    fileClickHandle: {
      type: Function
    }
  },
  directives: {
    drag
  },
  methods: {
    getFileList (data) {
      const _this = this
      if (!data) {
        this.fileList = []
      } else {
        this.listLoading = true
        api.getFileList({
          containerId: data.containerId,
          folderId: data.fileId,
          page: 0,
          size: 9999
        }, this.host).then(res => {
          if (res.data.code === 'SUCCESS') {
            let list = res.data.detail ? res.data.detail.content || [] : []
            _this.fileList = list
          }
        }).finally(() => {
          _this.listLoading = false
        })
      }

      if (!this.showFileList) {
        this.showFileList = true
      }
    },

    folderChange (key) {
      if (key) {
        this.$refs.leftTree && this.$refs.leftTree.setCurrentNodeByKey(key)
      }
    },

    uploadFiles (files) {
      // 文件上传
      if (this.$refs.fileUploader) {
        this.$refs.fileUploader.addFiles(files)
      }
    },

    removeFiles () {
      if (this.$refs.fileList) {
        this.$refs.fileList.removeSelectedFiles()
      }
    },

    refreshTreeNumber (newLength) {
      // 更新当前目录
      if (this.$refs.leftTree) {
        this.$refs.leftTree.updateTreeFileNumber && this.$refs.leftTree.updateTreeFileNumber(newLength)
      }
    },

    fileListChange (list) {
      this.refreshTreeNumber(list.length)
    },

    saveFile (data) {
      const _this = this
      if (!data || !this.$refs.leftTree.currentNode) return
      let currentFolderData = this.$refs.leftTree.currentNode.data
      api.saveFile({
        containerId: currentFolderData.containerId,
        fileSize: data.fileSize,
        filename: data.filename,
        folderId: currentFolderData.fileId,
        objectKey: data.objectKey
      }, this.host).then(res => {
        if (res.data.code === 'SUCCESS') {
          data.oFile.save_status = 'success'

          // 刷新文件列表
          _this.getFileList(currentFolderData)
        } else {
          data.oFile.save_status = 'fail'
        }
      }).catch(err => {
        console.error(err)
        data.oFile.save_status = 'fail'
      })
    },

    filenameClick (data) {
      if (this.fileClickHandle) {
        this.fileClickHandle(data)
      }
    }
  }
}
</script>

<style scoped lang="less">
.files_directory{
  user-select: none;
  min-height: 400px;
  height: 100%;
  border: 1px solid #dcdee3;
  box-sizing: border-box;
  background: #fff;

  .opreates{
    position: absolute;
    top: -40px;
    height: 40px;
    line-height: 36px;
  }

  .file_directory_content{
    height: 100%;

    .left_directory{
      height: 100%;
    }

    .right_file_list{
      height: 100%;
      .list{
        height: 100%;
      }
    }
  }
  .file_directory_content.has_opt{
    padding-top: 40px;
    height: calc(100% - 40px);
  }

  .right_file_list{
    overflow: visible;
  }
}
</style>
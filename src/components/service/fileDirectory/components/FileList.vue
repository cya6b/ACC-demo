<template>
  <div class="file_list">
    <el-table
      ref="list"
      class="table_list"
      :header-cell-style="getHeaderCellStyle"
      :data="fileList"
      row-key="id"
      :row-class-name="'content_table_row'"
      :height="autoMaxTableHeight"
      :span-method="arraySpanMethod"
      @row-click="rowClick"
      @selection-change="selectionChange"
      empty-text=" ">
      <el-table-column v-if="editable" type="selection" width="55" align="center"></el-table-column>
      <el-table-column v-for="column in columns" :key="column"
        :min-width="column.minWidth || null"
        :width="column.width || null"
        :label="column.label">
        <template #default="scope">
          <template v-if="scope.row.folder">
            <span v-if="column.key === 'filename'"
              class="cl column_item_span"
              :title="formatfilename(scope.row.filename)">
              <i class="gda_sdk_iconfont icon-folder"></i>
              {{formatfilename(scope.row.filename) || '--'}}
            </span>
          </template>
          <template v-else>
            <template v-if="column.key === 'filename'">
              <!-- 编辑 -->
              <div class="file_rename_content" v-if="scope.row.renameing">
                <el-input class="file_edit_input" v-model="scope.row.filename"></el-input>
                <span class="file_edit_btns_span">
                  <CheckIcon class="file_edit_btn _check" @click.stop="fileEditSave(scope.row)"></CheckIcon>
                  <CloseIcon class="file_edit_btn _close" @click.stop="fileEditCancel(scope.row)"></CloseIcon>
                </span>
              </div>
              <!-- 查看 -->
              <span v-else
                class="cl column_item_span __filename">
                <span :title="formatfilename(scope.row.filename)" @click="filenameClick(scope.row)">
                  {{formatfilename(scope.row.filename)}}
                </span>
                <span title="下载">
                  <DownloadIcon @click.stop="downLoadFile(scope.row)" class="file_download_btn"></DownloadIcon>
                </span>
              </span>
            </template>
            <span v-if="column.key === 'grahNumber'"
              class="cl column_item_span"
              :title="scope.row.drawingNum">
              {{scope.row.drawingNum}}
            </span>
            <span v-if="column.key === 'grahName'"
              class="cl column_item_span"
              :title="scope.row.drawingName">
              {{scope.row.drawingName}}
            </span>
            <span v-if="column.key === 'grahSize'"
              class="cl column_item_span"
              :title="scope.row.drawingSheet">
              {{scope.row.drawingSheet}}
            </span>
            <span v-if="column.key === 'signInfo'"
              class="cl column_item_span"
              :title="scope.row.drawingSheet">
              {{ scope.row.signMessage }}
            </span>
            <!-- <span v-if="column.key === 'fileType'"
              class="cl column_item_span"
              :title="scope.row.drawingSheet">
              {{ scope.row.signMessage }}
            </span> -->
            <span v-if="column.key === 'fileFloor'"
              class="cl column_item_span">
              {{ scope.row.floorNames }}
            </span>
            <span v-if="column.key === 'fileSize'"
              class="cl column_item_span">
              {{ formatFileSize(scope.row.fileSize) }}
            </span>
            <span v-if="column.key === 'fileUploadTime'"
              class="cl column_item_span">
              {{ scope.row.fileUploadTime }}
            </span>
            <span v-if="column.key === 'opt'"
              class="cl column_item_span">
              <span class="column_opt_btn" @click.stop="rename(scope.row, scope.$index)">重命名</span>
              <span class="column_opt_btn" @click.stop="remove(scope.row, scope.$index)">删除</span>
            </span>
          </template>
        </template>
      </el-table-column>
      <!-- <el-table-column v-if="columnsInclude('fileType')" :label="columns['fileType'].label">
        <template #default="scope"></template>
      </el-table-column>
      <el-table-column v-if="columnsInclude('translateStatus')" :label="columns['translateStatus'].label">
        <template #default="scope"></template>
      </el-table-column> -->
    </el-table>
    <!-- 文件拖拽上传 -->
    <file-drag-upload-pane class="upload_pane" v-if="showUploadPane" @uploadFiles="uploadFiles"></file-drag-upload-pane>
  </div>
</template>

<script>
import tableHeaderData from './fileList/tableHeader.js'
import {ElTable, ElTableColumn, ElLoading, ElInput} from 'element-plus'
import {Check as CheckIcon, Close as CloseIcon, Download as DownloadIcon} from '@element-plus/icons-vue';
import util from '../../../../plugins/util.js'
import FileDragUploadPane from '../upload/fileDragUploadPane.vue'
import Sortable from 'sortablejs'
import { ElMessage, ElMessageBox } from 'element-plus'
import api from '../api.js'
export default {
  components: {
    ElTable,
    ElTableColumn,
    FileDragUploadPane,
    ElInput,
    CheckIcon,
    CloseIcon,
    DownloadIcon
},
  props: {
    tHeaderType: {
      type: String,
      default: 'default'
    },
    files: {
      type: Array,
      default: () => []
    },
    listLoading: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      selection: [],
      fileList: [],
      currentNode: null,
      loading: false,
    }
  },
  inject: ['editable', 'apiHost'],
  computed: {
    showUploadPane () {
      return !this.loading && !this.fileList.length
    },
    columns () {
      let ret = tableHeaderData[this.tHeaderType] || tableHeaderData.default
      if (!this.editable) {
        ret = ret.filter(r => {
          return r.key !== 'opt'
        }) 
      }
      return ret
    },
    columnsInclude () {
      return code => {
        return this.columns.find(c => {
          return c.key == code
        })
      }
    },
    formatFileSize () {
      return size => {
        return util.formatFileSize(size || 0)
      }
    },
    formatfilename () {
      return name => {
        return (name || '').replace(/\s(?=.)/g, '&nbsp;') || '--'
      }
    }
  },
  watch: {
    files: {
      handler (val) {
        if (Array.isArray(val)) {
          this.fileList = val
        }
      }
    },
    listLoading: {
      handler (val) {
        this.loading = val
        if (val) {
          this.loadingInstance = ElLoading.service({
            target: '.table_list .el-table__body-wrapper'
          })
        } else {
          this.loadingInstance.close()
        }
      }
    },

    fileList: {
      handler (val) {
        this.$emit('fileListChange', val)
      },
      deep: true
    }
  },
  mounted () {
    if (this.editable) {
      this.rowDrop()
    }
  },
  methods: {
    selectionChange (val) {
      this.selection = val
    },
    getSelectedList () {
      return this.selection || []
    },
    getColumnIndexByKey (key) {
      return this.columns.findIndex(c => {
        return c.key === key
      })
    },
    arraySpanMethod ({ row, column, rowIndex, columnIndex }) {
      // if (row.folder) {
      //   let cIndex = this.getColumnIndexByKey('filename') + 1
      //   if (columnIndex === cIndex + 1) {
      //     return [1, 1]
      //   }
      //   else if (columnIndex === 1) {
      //     return [1, cIndex - columnIndex + 1]
      //   } else if (columnIndex > 1 && columnIndex < cIndex + 1) {
      //     return [0, 1]
      //   }
      // }
    },
    rename (row) {
      row.filenameCache = row.filename
      row.renameing = true
    },
    removeSelectedFiles () {
      let rows = this.getSelectedList()
      if (!rows.length) {
        ElMessage.warning('请勾选文件!')
        return
      }
      ElMessageBox.confirm('是否确认删除？', '提示', {
        confirmButtonText: '删除',
        cancelButtonText: '取消',
        type: 'warning',
        customClass: 'my_message_box',
        callback: (action) => {
          if (action === 'confirm') {
            this.removeFuc(rows)
          }
        },
      })
    },
    remove (row) {
      ElMessageBox.confirm('是否确认删除？', '提示', {
        confirmButtonText: '删除',
        cancelButtonText: '取消',
        type: 'warning',
        callback: (action) => {
          if (action === 'confirm') {
            this.removeFuc(row)
          }
        },
      })
    },
    removeFuc (row) {
      const _this = this
      if (Array.isArray(row)) {
        api.deleteAllFoldersOrAllFiles({
          containerId: row[0].containerId,
          fileIds: row.map(r => {
            return r.fileId
          })
        }, this.apiHost).then(res => {
          if (res.data.code === 'SUCCESS') {
            _this.removeFiles(row)
          }
        })
      } else {
        api.deleteFolderOrFile({
          containerId: row.containerId,
          fileId: row.fileId,
          fileVersion: row.fileVersion
        }, this.apiHost).then(res => {
          if (res.data.code === 'SUCCESS') {
            _this.removeFiles(row)
          }
        })
      }
    },
    removeFiles (data) {
      if (!data) {
        return
      }
      const _this = this
      if (Array.isArray(data)) {
        data.forEach(d => {
          let fIndex = _this.fileList.findIndex(f => {
            return f.fileId == d.fileId
          })
          _this.fileList.splice(fIndex, 1)
        })
      } else {
        let fIndex = this.fileList.findIndex(f => {
          return f.fileId == data.fileId
        })
        this.fileList.splice(fIndex, 1)
      }
    },
    fileEditSave (row) {
      api.renameFolderOrFile({
        containerId: row.containerId,
        fileId: row.fileId,
        fileVersion: row.fileVersion,
        filename: row.filename
      }, this.apiHost).then(res => {
        if (res.data.code === 'SUCCESS') {
          row.renameing = false
          ElMessage.success('操作成功!')
        } else {
          ElMessage.error('修改文件名称失败!')
        }
      })
    },
    fileEditCancel (row) {
      row.filename = row.filenameCache
      row.renameing =false
    },
    rowClick (row) {
      if (row.folder) {
        this.$emit('folderChange', row.fileId)
      }
    },

    uploadFiles (files) {
      this.$emit('uploadFiles', [...files])
    },


    rowDrop () {
      // 此时找到的元素是要拖拽元素的父容器
      const tbody = document.querySelector('.table_list .el-table__body-wrapper tbody');
      if (!tbody) return
      const _this = this;
      Sortable.create(tbody, {
      //  指定父元素下可被拖拽的子元素
      draggable: ".el-table__row",
        onEnd ({ newIndex, oldIndex }) {
            const currRow = _this.fileList.splice(oldIndex, 1)[0];
            _this.fileList.splice(newIndex, 0, currRow);

             _this.saveDrop(newIndex, oldIndex)
        }
      });
    },

    saveDrop (index, oldIndex) {
      const _this = this
      let row = this.fileList[index]
      let preRow = this.fileList[index - 1]
      let nextRow = this.fileList[index + 1]
      let rowOrder = 0
      if (preRow && nextRow) { // 中间行
        const preOrder = preRow.fileOrder >> 0
        const nextOrder = nextRow.fileOrder >> 0
        rowOrder = ((preOrder + nextOrder) / 2).toFixed(8)
      } else if (!preRow) { // 第一行
        rowOrder = (nextRow.fileOrder >> 0) - 1
      } else if (!nextRow) { // 最后一行
        rowOrder = (preRow.fileOrder >> 0) + 1
      }

      function reback (i, oI) {
        ElMessage.error('排序保存失败!')

        // 恢复拖动前状态
        const currRow = _this.fileList.splice(i, 1)[0];
        _this.fileList.splice(oI, 0, currRow);
      }

      api.setFileOrder({
        containerId: row.containerId,
        fileId: row.fileId,
        fileVersion: row.fileVersion,
        fileOrder: rowOrder
      }, this.apiHost).then(res => {
        if (res.data.code === 'SUCCESS') {
          row.fileOrder = rowOrder
        } else {
          reback(index, oldIndex)
        }
      }).catch(err => {
        reback(index, oldIndex)
      })
    },

    downLoadFile (row) {
      if (!row || !row.fileId) return
      api.getFileDownloadUrl({
        containerId: row.containerId,
        fileId: row.fileId,
        fileVersion: row.fileVersion,
      }, this.apiHost).then(res => {
        if (res.data.code === 'SUCCESS') {
          let url = res.data.detail
          if (url) {
            util.downByUrl(url, row.filename)
          }
        }
      })
    },

    filenameClick (row) {
      this.$emit('filenameClick', row)
    }
  }
}
</script>

<style lang="less" scoped>
.file_list{
  height: 100%;
  .table_list{
    height: 100%;
  }
}
.content_table_row {
}

:deep(.el-table .el-table__header-wrapper table tr th){
  height: 50px;
  background: #f6f6f6;
  font-weight: normal;
  color: #000;
}

:deep(.el-table--enable-row-hover .el-table__body tr:hover>td) {
  background-color: #DBEDF3;
}

.icon-folder{
  color: #0065a5;
  margin-right: 6px;
}

.column_item_span{
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  word-break: keep-all;
}

.upload_pane{
  position: absolute;
  width: 100%;
  height: calc(100% - 50px);
  top: 50px;
  background: #fff;
  z-index: 9;
}

.column_opt_btn {
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

.file_rename_content{
  display: flex;
}

.file_edit_input{
  width: 200px;
}

.file_edit_btns_span{
  display: flex;
  height: 40px;
  line-height: 40px;
  padding: 0px 6px;

  .file_edit_btn{
    width: 24px;
    margin-right: 6px;
    cursor: pointer;
    &._check {
      color: green;
      &:hover{
        color: rgb(2, 237, 2);
      }
    }
    &._close {
      color: red;
      &:hover{
        color: rgb(249, 88, 88);
      }
    }
  }
}

.__filename{
  span{
    &:hover{
      color: #499bf0;
    }
  }

  .file_download_btn{
    margin-left: 6px;
    width: 22px;
    position: relative;
    top: 6px;
    &:hover{
      color: #66aaf2;
    }
  }
}
</style>
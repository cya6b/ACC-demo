<template>
  <div class="tree">
    <div class="tree-header">
      <span>文件目录</span>
      <span v-if="editable"
        id="createFolderBtn"
        @click="createFolder"
        class="create_folder"
      >
        新建目录
      </span>
    </div>
    <el-tree
      id="floderTree"
      class="FilesDirectory__tree-content"
      ref="tree"
      :data="treeList"
      highlight-current
      v-loading="loading"
      node-key="fileId"
      :expand-on-click-node="false"
      @current-change="currentChangeEvent">
      <template #default="{ node, data }">
        <div class="node_content"
          @contextmenu.prevent.stop="mouseRightSettingShow($event, data)"
          @mouseleave.prevent.stop="mouseRightSettingHide($event, data)">
          <!-- 新建 -->
          <!-- 重命名 -->
          <template v-if="!data.fileId || data.renameing">
            <el-input @click.stop="() => {}" class="folder_edit_input" v-model="data.filename"></el-input>
            <span class="folder_edit_btns_span">
              <CheckIcon class="folder_edit_btn _check" @click.stop="folderEditSave(node, data)"></CheckIcon>
              <CloseIcon class="folder_edit_btn _close" @click.stop="folderEditCancel(node, data)"></CloseIcon>
            </span>
          </template>
          <!-- 查看 -->
          <template v-else>
            <span class="node_label_name node_content_item" @dblclick.stop="rename(node)">
              {{ data.filename }}
            </span>
            <NumInfoCard class="node_content_item" label="总计" :num="data.fileNumber || 0"></NumInfoCard>
            <NumInfoCard class="node_content_item" label="签章有效" :num="data.signedValidNum || 0"></NumInfoCard>
            <FolderOptBtns v-if="isFirstLevelNode" class="node_content_item folder_opt_btns" :nodeData="node"></FolderOptBtns>
          </template>
        </div>
        <div class="right_setting_box" v-if="data.showRightSettingBox"
        @mouseenter="mouseRightSettingShow($event, data)"
        @mouseleave.prevent.stop="mouseRightSettingHide($event, data)">
          <span @click.stop="renameSettingClick(node, data)">重命名</span>
          <span @click.stop="removeSettingClick(node, data)">删除</span>
        </div>
      </template>
    </el-tree>
  </div>
</template>

<script>
import FolderOptBtns from './folderOpt/FolderOptBtns.vue';
import NumInfoCard from './folderOpt/NumInfoCard.vue';
import {ElTree, ElInput} from 'element-plus';
import {Check as CheckIcon, Close as CloseIcon} from '@element-plus/icons-vue';
import { ElMessage, ElMessageBox } from 'element-plus'
import api from '../api.js'
export default {
  components: { NumInfoCard, FolderOptBtns, ElTree, ElInput, CheckIcon, CloseIcon },
  data() {
      return {
        source: null,
        loading: false,
        treeList: [{
          fileId: 1,
          filename: '文件夹',
          children: [
            {
              fileId: 2,
              filename: '子文件夹1',
              children: []
            },
            {
              fileId: 3,
              filename: '子文件夹2',
              children: []
            }
          ]
        }],
        currentNode: null,
      };
  },
  inject: ['editable', 'apiHost'],
  props: {
    sourceParams: {
      type: Object,
      default: null
    }
  },
  methods: {
    updateTreeFileNumber (newLength) {
      let currentNode = this.currentNode
      if (currentNode) {
        let oldNumber = currentNode.data.fileNumber
        let newNumber = newLength
        if (oldNumber == newNumber) {
          return
        }
        let m = newNumber - oldNumber
        currentNode.data.fileNumber = newNumber
        let p = currentNode.parent
        while(p) {
          p.data.fileNumber += m
          p = p.parent
        }
      }
    },
    getTreeData () {
      const _this = this
      if (!this.source) return
      api.getListTree({
        containerId: this.source.containerId,
        folderId: this.source.folderId,
        folder: true,
        includePack: true
      }, this.apiHost).then(res => {
        if (res.data.code === 'SUCCESS') {
          let detail = res.data.detail
          this.treeList = detail

          _this.$nextTick(() => {
            _this.expandTreeAndSetCurrentNode()
          })
        }
      })
    },
    expandTreeAndSetCurrentNode () { // 
      let key = null
      let list = this.treeList
      while(list) {
        if (list[0]) {
          key = list[0].fileId
          list = list[0].children
        } else {
          list = null
        }
      }
      if (key) {
        this.setCurrentNodeByKey(key)
      }
    },
    createFolder() {
        if (!this.currentNode && this.rootNodeUnique) {
          ElMessage({
            type: 'warning',
            message: '请指定文件目录！'
          })
          return;
        }

        if (this.currentNode && !this.currentNode.data.fileId) {
          ElMessage.warning({
            type: 'warning',
            message: '此目录下暂不允许创建目录, 请先保存！'
          })
          return;
        }

        // 创建目录

        if(!this.currentNode) {
          this.treeList.push({
            fileId: null,
            folderId: null,
            folder: true,
            filename: '新建文件夹',
            children: []
          })
        } else {
          if (!this.currentNode.data.children) {
            this.currentNode.data.children = []
          }
          this.currentNode.data.children.push({
            fileId: null,
            folderId: this.currentNode.data.id,
            folder: true,
            filename: '新建文件夹',
            children: []
          })
        }

        // 若当前目录处于收起状态，则展开当前目录
        if (this.currentNode && !this.currentNode.expanded) {
          this.currentNode.expanded = true
        }
    },
    folderEditSave (node, nodeData) {
      const _this = this
      if (!nodeData.fileId) {
        // 新建
        api.createFolder({
          containerId: this.source.containerId,
          folderId: nodeData.folderId,
          filename: nodeData.filename
        }, this.apiHost).then(res => {
          if (res.data.code === 'SUCCESS') {
            let detail = res.data.detail
            if (detail) {
              nodeData.fileId = detail.fileId
              nodeData.containerId = detail.containerId
              for (let k in nodeData) {
                if (detail[k]) {
                  nodeData[k] = detail[k]
                }
              }
            }
            ElMessage.success('操作成功!')
            
            if (this.isChildren(node, this.currentNode)) {
              this.refreshFileList(this.currentNode.data)
            }
          } else {
            ElMessage.error('新建目录失败!')
          }
        })
      } else if(nodeData.renameing) {
        // 修改名称
        api.renameFolderOrFile({
          containerId: nodeData.containerId,
          fileId: nodeData.fileId,
          fileVersion: nodeData.fileVersion,
          filename: nodeData.filename
        }, this.apiHost).then(res => {
          if (res.data.code === 'SUCCESS') {
            nodeData.renameing = false
            ElMessage.success('操作成功!')

            if (this.isChildren(node, this.currentNode)) {
              this.refreshFileList(this.currentNode.data)
            }
          } else {
            ElMessage.error('修改目录名称失败!')
          }
        })
      }
    },
    folderEditCancel (node, nodeData) {
      if (!nodeData.fileId) {
        // 取消新建
        this.removeNode(node, nodeData)
      }
      if(nodeData.renameing) {
        // 取消重命名
        nodeData.renameing = false
        nodeData.filename = nodeData.filenameCache
      }
    },
    removeNode (node, nodeData) {
      if (node.parent.data.children) {
        let dIndex = node.parent.data.children.findIndex(d => {
          return d === nodeData
        })
        node.parent.data.children.splice(dIndex, 1)
      } else if (Array.isArray(node.parent.data)) {
        let dIndex = node.parent.data.findIndex(d => {
          return d === nodeData
        })
        node.parent.data.splice(dIndex, 1)
      }

      // 取消当前选中
      if (this.$refs.tree.getCurrentNode() === node.data) {
        // 若当前节点有父节点，设置选中当前节点父级
        let cK = null
        if (node.parent) {
          cK = node.parent.data.fileId
        }
        this.setCurrentNodeByKey(cK)
      }
    },
    removeFolder (node, nodeData) {
      ElMessageBox.confirm('是否确认删除？', '提示', {
        confirmButtonText: '删除',
        cancelButtonText: '取消',
        type: 'warning',
        customClass: 'my_message_box',
        callback: (action) => {
          if (action === 'confirm') {
            this.removeFuc(node, nodeData)
          }
        },
      })
    },
    removeFuc (node, nodeData) {
      const _this = this
      api.deleteFolderOrFile({
        containerId: nodeData.containerId,
        fileId: nodeData.fileId,
        fileVersion: nodeData.fileVersion
      }, this.apiHost).then(res => {
        if (res.data.code === 'SUCCESS') {
          _this.removeNode(node, nodeData)
        }
      })
    },
    currentChangeEvent(data, node) {
        // 当前选中文件夹变更的事件
        this.currentNode = node;
    },
    rename (node) {
      if (!this.editable) {
        return
      }
      node.data.filenameCache = node.data.filename
      node.data.renameing = true
    },

    mouseRightSettingShow (event, nodeData) {
      if (!this.editable) {
        return
      }
      if (!nodeData.fileId || nodeData.renameing) {
        return
      }
      nodeData.showRightSettingBox = true
    },
    mouseRightSettingHide (event, nodeData) {
      nodeData.showRightSettingBox = false
    },
    renameSettingClick (node, nodeData) {
      this.mouseRightSettingHide(null, nodeData)
      this.rename(node)
    },
    removeSettingClick (node, nodeData) {
      this.mouseRightSettingHide(null, nodeData)
      this.removeFolder(node, nodeData)
    },

    setCurrentNodeByKey (key) {
      this.$refs.tree.setCurrentKey(key)
    },

    isChildren (aNode, bNode) {
      let ret = false
      let n = aNode
      while(n.parent) {
        if (n.parent === bNode) {
          ret = true
          break
        }
        n = n.parent
      }
      return ret
    },
    refreshFileList (val) {
      this.$emit('getFileList', val)
    }
  },
  computed: {
    isFirstLevelNode() {
      // 判断是否为第一层的节点
      return (node) => {
        return node.parent.level === 0
      }
    },
  },
  watch: {
    sourceParams: {
      handler (val) {
        if (val) {
          this.source = val
          this.getTreeData()
        }
      },
      immediate: true,
      deep: true
    },
    currentNode: {
      handler (val) {
        this.refreshFileList(val ? val.data : null)
      },
    }
  }
}
</script>

<style lang="less" scoped>
.FilesDirectory__tree-content{
  height: calc(100% - 50px);
  overflow-y: auto;
}
.tree-header{
  height: 49px;
  line-height: 49px;
  background: #f6f6f6;
  border-bottom: 1px solid #dcdee3;
  padding: 0px 12px;
  font-size: 14px;
  .create_folder{
    float: right;
    cursor: pointer;
    color: #0066a5;
    &:hover{
      color: #499bf0;
    }
  }
}

.folder_opt_btns{
  display: inline-block;
}

.node_content{
  padding-top: 6px;
  padding-bottom: 6px;
  min-height: 38px;
  line-height: 32px;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  width: 100%;

  .node_content_item{
    margin-left: 12px;
  }

  .node_label_name{
    &:hover{
      color: #0767b3;
    }
  }
}
:deep(.el-tree-node__content) {
  height: auto;
  &:hover{
    background-color: #e7f3f6!important;
  }
}

:deep(.el-tree--highlight-current .el-tree-node.is-current>.el-tree-node__content){
  background-color: #dbedf3!important;
}

.folder_edit_input{
  width: 200px;
}

.folder_edit_btns_span{
  display: flex;
  padding: 0px 6px;
}
.folder_edit_btn{
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

.right_setting_box{
  position: absolute;
  right: 0px;
  transform: translateY(28px);
  display: flex;
  flex-direction: column;
  text-align: center;
  padding: 12px 24px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, .1);
  z-index: 9999;
  background: #fff;
  span{
    color: #0767b3;
    border: 1px solid #0767b3;
    border-radius: 2px;
    display: inline-block;
    padding: 2px 32px;
    text-align: center;
    line-height: 24px;
    height: 24px;
    cursor: pointer;
    &:hover{
      background-color: #ecf5ff;
    }
    + span{
      margin-top: 12px;
    }
  }
}
</style>
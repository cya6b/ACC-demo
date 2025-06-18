<template>
  <div class="scene_page">
    <div class="left" :class="leftMin ? '__min' : ''">
      <span class="sw_btn" @click="leftMin = !leftMin">{{ leftMin ? '展开' : '收起' }}</span>
      <template v-if="!leftMin">
        <div class="control">
          <el-button @click="reset">重置</el-button>
          <el-button type="primary" @click="run">运行</el-button>
        </div>
        <CodeMirror class="code_edit_box" ref="codeMirror"
        :value="editorData.htmlTxt"
        @input="changeTextarea"></CodeMirror>
      </template>
    </div>
    <div class="content">
      <div id="preViewIframe">
      </div>
    </div>
  </div>
</template>

<script>
import CodeMirror from './CodeMirror.vue';
import sceneTemplateMap from './htmlTemplate/templateMap.js'
import {ElButton} from 'element-plus'

import api from '../preview/api'

export default {
    components: { CodeMirror, ElButton },
    data () {
      return {
        leftMin: false,
        sceneId: null,
        editorData: {
          htmlTxt: ''
        }
      }
    },
    async created () {
      this.sceneId = this.$route.query.sceneId
      this.initScene(this.sceneId)
    },
    methods: {
      getSourceToken (sceneId) {
        return new Promise((resolve, reject) => {
          let source = sceneTemplateMap[sceneId].source
          if (!source || !source.sourceFileId) {
            resolve()
          } else {
            let promiseList = []
            source.sourceFileId.forEach(f => {
              promiseList.push(
                new Promise ((resolve) => {
                  api.getViewToken({
                    containerId: source.containerId,
                    fileId: f,
                    viewTokenType: 'CONVERT'
                  }).then(res => {
                    if (res.data.code === 'SUCCESS') {
                      resolve(res.data.detail)
                    }
                  })
                }))
            })
            Promise.all(promiseList).then(res => {
              resolve(res)
            })
          }
        })
      },
      initScene (sceneId) {
        if(sceneTemplateMap[sceneId]) {
          this.getSourceToken(sceneId).then(res => {
            let template = sceneTemplateMap[this.sceneId].template
            if (res) {
              res.forEach((r, rIndex) => {
                if (r.viewToken) {
                  if (template.replaceAll) {
                    template = template.replaceAll(`#_viewToken${rIndex+1}_#`, r.viewToken)
                  } else if (template.replace) {
                    template = template.replace(new RegExp(`#_viewToken${rIndex+1}_#`, 'gm'), r.viewToken)
                  }
                }
              })
            }
            this.changeTextarea(template)
            this.run()
          })
        }
      },
      changeTextarea (val) {
        if (typeof val == 'string') {
          this.editorData.htmlTxt = val
        }
      },
      reset () {
        this.changeTextarea(sceneTemplateMap[this.sceneId])
        this.run()
      },
      run () {
        let code = this.$refs.codeMirror?.code
        let content = code || this.editorData.htmlTxt;
        let t = document.getElementById("preViewIframe");
        t.innerHTML = "";
        var i = document.createElement("iframe");
        i.setAttribute('id', '_iframe')
        i.style.width = 'calc(100% - 8px)'
        i.style.height = 'calc(100% - 12px)'
        t.appendChild(i),
        i.contentWindow.document.open(),
        i.contentWindow.document.write(content),
        i.contentWindow.document.close()
      }
    },
}
</script>

<style lang="less" scoped>
.scene_page{
  height: 100%;
  display: flex;
  .left{
    position: relative;
    width: 480px;

    .sw_btn{
      position: absolute;
      width: 32px;
      left: 0px;
      top: 0px;
      height: 42px;
      line-height: 42px;
      padding: 0px 8px;
      background: rgb(111, 109, 109);
      color: #fff;
    }
    .control{
      height:42px;
      line-height: 42px;
      button{
        float: right;
        margin-right: 12px;
        margin-top: 6px;
      }
    }
    .code_edit_box{
      height: calc(100% - 42px)
    }
  }
  .left.__min{
    width: 0px;
    .sw_btn{
      left: 72px;
      top: 12px;
      height: 24px;
      line-height: 24px;
    }
  }
  .content{
    flex-grow: 1;
    #preViewIframe{
      height: 100%
    }
  }
}
</style>
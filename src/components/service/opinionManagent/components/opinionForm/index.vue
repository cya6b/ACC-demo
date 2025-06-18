<template>
  <!-- 表单 -->
  <div class="opinion_form_wrap">
    <component ref="form" :editable="editable" :is="componentName" :problemCategoryList="problemCategoryList"></component>
    <!-- 截图 -->
    <screen-shot-machine ref="screenShot" :editable="editable"></screen-shot-machine>
  </div>
</template>

<script>
/* Copyright (C) <1998-2024> Glodon Company Limited
 * Licensed under the MIT License
 * Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the “Software”), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
 * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
 * THE SOFTWARE IS PROVIDED “AS IS”, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */
import ScreenShotMachine from "./components/screenShot/ScreenShotMachine.vue"

import OpinionFormDrawing from "./components/OpinionFormDrawing.vue";
import OpinionFormModel from "./components/OpinionFormModel.vue";
import OpinionFormCompliance from "./components/OpinionFormCompliance.vue";

import api from '../../api'
export default {
  components: { ScreenShotMachine, OpinionFormDrawing, OpinionFormModel, OpinionFormCompliance },
  computed: {
    componentName () {
      let ret = 'OpinionFormDrawing'
      if (this.affiliation.reviewType === 'MODEL_QUALITY') {
        ret = 'OpinionFormCompliance'
      }

      if (this.affiliation.reviewType === 'DESIGN_QUALITY') {
        if (this.affiliation.targetType == 'draw') {
          ret = 'OpinionFormDrawing'
        }
        if (this.affiliation.targetType == 'model') {
          ret = 'OpinionFormModel'
        }
      }
      return ret
    }
  },
  props: {
    editable: {
      type: Boolean,
      default: true,
    }
  },
  inject: ['apiHost', 'affiliation', 'rewriteInterfaces'],
  data () {
    return {
      problemCategoryList: []
    }
  },
  created () {
    this.getProblemCategoryList()
  },
  methods: {
    setOpinionData (data) {
      for (let k in data) {
        let temp = data[k]
        if (temp) {
          if (k == 'crops') {
            this.$refs.screenShot.setShotsData(temp)
          } else {
            this.$refs.form.setDataByKey(k, temp)
          }
        }
      }
    },
    validForm (cb) {
      return this.$refs.form.validForm(cb)
    },

    getProblemCategoryList () { // 获取问题类别下拉字典项
      const _this = this
      if (this.rewriteInterfaces?.getProblemCategoryListFunc) {
        this.rewriteInterfaces.getProblemCategoryListFunc().then(res => {
          if (res.data.code === 'SUCCESS') {
            _this.problemCategoryList = res.data.detail || []
          }
        })
      } else {
        let params = {
          bizType: this.affiliation.bizType,
          specialtyCode: this.affiliation.specialtyCode
        }
        api.getProblemCategoryList(params, this.apiHost).then(res => {
          if (res.data.code === 'SUCCESS') {
            _this.problemCategoryList = res.data.detail || []
          }
        })
      }
    },

    getFormData () {
      return {
        formData: this.$refs.form.getFormData(),
        screenShots: this.$refs.screenShot.getScreenShotData()
      }
    },

    addScreenShot (shotData) {
      this.$refs.screenShot && this.$refs.screenShot.addScreenShot && this.$refs.screenShot.addScreenShot(shotData)
    },
  },
}
</script>

<style lang="less" scoped>
.opinion_form_wrap{
  padding: 12px 24px;
}
</style>
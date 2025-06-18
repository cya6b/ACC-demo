<template>
  <div ref="parent" class="label-list">
    <div class="arrow-left-box" @click="leftMove" v-show="isShowLeft">
      <div class="arrow-left"></div>
    </div>
    <div ref="nav" class="nav" :style="{'margin-left': this.marginLeft + 'px'}">
      <button type="button" 
        v-for="item in listData" 
        :key="item.key"  
        @click="handleClick(item.key)" 
        :class="this.currentActiveKeys.indexOf(item.key)===-1 ? 'no-active': 'active'"
      >
        {{ item.label }}
      </button>
    </div>
    <div class="arrow-right-box" @click="rightMove" v-show="isShowRight">
      <div class="arrow-right"></div>
    </div>
  </div>
</template>

<script>
/* Copyright (C) <1998-2024> Glodon Company Limited
 * Licensed under the MIT License
 * Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the “Software”), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
 * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
 * THE SOFTWARE IS PROVIDED “AS IS”, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */
export default {
  data () {
    return {
      currentActiveKeys: [],
      isShowRight: true,
      isShowLeft: true,
      marginLeft: 0,
      marginLeftList:[],
    }
  },
  props: {
    listData: {
      type: Array,
      default: [],
      validator: (val) => {
        if (!Array.isArray(val)) {
          throw new Error('listData must is array')
        }
        if (val.length) {
          val.forEach(v => {
            if (v.key == undefined) {
              throw new Error('listData item need has unique property: key')
            }
          })
        }
      }
    },
    defaultActiveKeys: {
      type: Array,
      default: []
    },
  },
  watch: {
    currentActiveKeys: {
      handler (val) {
        this.valueTransmission(val)
      }
    },
    defaultActiveKeys: {
      handler(val){
        let arr = val.concat()
        if ( val.indexOf('ALL') !== -1 ) {
          arr = ['ALL']
        }
        this.currentActiveKeys = arr
      },
      immediate: true,
    },
    marginLeft: {
      handler(val) {
        if(val===0){
          this.isShowLeft=false
        }
      },
      immediate: true,
    },
  },
  mounted () {
    let [parentWidth,parNav] = this.getWidth()
    let navWidth = parNav.offsetWidth
    if(navWidth < parentWidth){
      this.isShowRight=false
    }
  },
  methods: {
    getWidth(){
      //获取组件根节点宽度
      let parentWidth = this.$refs.parent.offsetWidth
      //获取组件中的按钮
      let parNav = this.$refs.nav
      return [parentWidth , parNav]
    },
    handleClick ( key ) {
      //对当前按钮做处理
      let arr = this.currentActiveKeys.concat()
      let index = arr.findIndex(i =>{
        return i === key
      })
      if( index !== -1 ){
        arr.splice(index,1)
      } else {
        arr.push(key)
      }
      
      //对其他按钮做处理
      if ( arr.includes('ALL') && arr.length > 1){
        if ( key === 'ALL'){
          arr = ['ALL']
        }else{
          let index = arr.findIndex(i => {
            return i == 'ALL'
          })
          arr.splice(index,1)
          }
      }
      this.currentActiveKeys = arr     
    },
    rightMove() {
      let [parentWidth,parNav] = this.getWidth()
      let buttons = Array.from(parNav.childNodes)
      buttons=buttons.slice(1,buttons.length-1)
      let offsetIndex=0
      for(let i=0;i<buttons.length;i++){
        if((buttons[i].offsetLeft)>parentWidth){
            offsetIndex=i
            break
        }
      }
      let needOffset = buttons[offsetIndex-1].offsetLeft-28
      this.marginLeft = this.marginLeft-needOffset
      this.marginLeftList.push(needOffset)
      if(this.marginLeft!=0){
        this.isShowLeft=true
      }
      if(buttons[buttons.length-1].offsetLeft-needOffset<parentWidth){
        this.isShowRight=false
      }
    },
    leftMove() {
      this.marginLeft=this.marginLeft+this.marginLeftList.pop()
      let [parentWidth,parNav] = this.getWidth()
      let buttons = Array.from(parNav.childNodes)
      buttons=buttons.slice(1,buttons.length-1)
      if(buttons[buttons.length-1].offsetLeft<parentWidth){
        this.isShowRight=true
      }
    },
    valueTransmission(val) {
      this.$emit('selectedChange', val)
    }
  }
}
</script>

<style lang="less" scoped>
.label-list{
  display: flex;
	align-items: center;
  background-color: #282A34;
  overflow: hidden;
}
.arrow-left-box{
  position: absolute;
  left: 4px;

  width: 19px;
  height: 32px;
  background-color: #282A34;
  box-shadow:6px 0px 4px rgba(9, 10, 11, .6);
  display: flex;
	justify-content: center;
	align-items: center;
  cursor: pointer;
  z-index: 1;
}
.arrow-right-box{
  position: absolute;
  right: 8px;

  width: 19px;
  height: 32px;
  background-color: #282A34;
  box-shadow:-6px 0px 4px rgba(9, 10, 11, .6);
  display: flex;
	justify-content: center;
	align-items: center;
  cursor: pointer;
  z-index: 1;
}
.arrow-left {
    display: inline-block; 
    width:0;
    height:0;
    border-top:5px solid transparent;
    border-bottom:5px solid transparent;
    border-right:8px solid #F2F2F8;
}
.arrow-right {
    display: inline-block;
    width:0;
    height:0;
    border-top: 5px solid transparent;
    border-bottom: 5px solid transparent;
    border-left: 8px solid #F2F2F8;    
}
.active{
  background-color: rgb(18,107,255);
}
.no-active{
  background-color: rgba(18,107,255,.3);
  &:hover{
    background-color: rgba(18,107,255,.5);
  }
}
button {
  background-color: rgba(18,107,255,.3);
  border: none;
  border-radius: 41px;
  color: #F2F2F8;
  font-size: 14px;
  font-family: Microsoft YaHei;
  margin-left: 4px;
  padding: 8px 12px;
  line-height: 16px;
}
button:last-child{
  margin-right: 4px;
}
.nav{
  overflow: hidden;
  white-space:nowrap;
}
</style>
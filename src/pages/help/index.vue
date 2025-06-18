<template>
  <div class="top_nav">
    <a v-for="dItem in dList" @click="clickSilder(dItem.key)" class="nav_card">
      <b>{{ dItem.title }}</b>
      <i :class="`icon_span gda_sdk_iconfont ${dItem.iconName}`"></i>
    </a>
  </div>
  <div class="center_nav">
    <template v-for="(dItem, dItemIndex) in dList" :key="dItemIndex">
      <div :id="dItem.key" class="block-title">
        <div class="block-title-inner">
          <div class="left-line">
            <div class="left-line-inner"></div>
          </div>
          <div>{{dItem.title}}</div>
          <div class="right-line">
            <div class="right-line-inner"></div>
          </div>
        </div>
      </div>
      <div class="block-list">
        <div v-for="block in dItem.list" :key="block" class="info-block service-block" @click="blockClick(block)">
          <div class="info_title">{{ block.title }}</div>
          <div class="info_desc">{{ block.content }}</div>
          <i :class="`icon_span gda_sdk_iconfont ${block.iconName}`"></i>
          <div class="info_actions" style="width: 160px; text-align: center;">
          </div>
        </div>
      </div>
    </template>
    <div class="sdk_asset">
      <a href="/#/assets_sdk">&lt;- sdk资源包 -&gt;</a>
    </div>
  </div>
  <footer class="footer"></footer>
</template>

<script>
import sceneList from './js/sceneList'
import componentDemoList from './js/componentDemoList'
import componentReferList from './js/componentReferList'
import webComponentList from './js/webComponentList'
export default {
  data () {
    return {
      dList: [
        {
          title: '帮助文档',
          iconName: 'icon-yijian',
          key: 'help',
          list: componentReferList
        },
        {
          title: '组件应用',
          iconName: 'icon-moxing',
          key: 'demo',
          list: componentDemoList
        },
        {
          title: 'demo示例',
          iconName: 'icon-chouchaxiangmu',
          key: 'scene',
          list: sceneList
        },
        {
          title: 'web应用',
          iconName: 'icon-tushen-xmtj',
          key: 'web-component',
          list: webComponentList
        }
      ]
    }
  },
  methods: {
    clickSilder (elId) {
      // 获取DOM元素
      let el = document.getElementById(elId);
      if (!el) return
      el.scrollIntoView(true)
    },
    blockClick (block) {
      if (block.linkUrl) {
        window.open(block.linkUrl, '_blank')
      }
    }
  }
}
</script>

<style lang="less" scoped>
.top_nav{
  padding: 24px 0px;
  margin: 0px 240px;
  display: flex;
  justify-content: space-between;
}
.center_nav{
  margin: 0px 240px;
}
.nav_card{
  color: #000;
  min-width: 227px;
  flex-grow: 1;
  margin: 0px 24px;
  height: 70px;
  align-items: center;
  background: rgba(0,102,165, .3);
  border: 1px solid rgba(0,102,165, .6);
  box-sizing: border-box;
  border-radius: 3px;
  display: flex;
  justify-content: center;
  text-decoration: none;
  cursor: pointer;
  &:hover{
    background-color: rgba(0,102,165, .6);
  }

  .icon_span{
    font-size: 32px;
    color: rgba(50, 211, 166, 1);
    margin-left: 16px;
  }
}

.block-title{
  margin-top: 54px;
  line-height: 48px;
  font-size: 36px;
  font-weight: 200;
  margin-bottom: 28px;
  text-align: center;
  display: inline-block;
  display: flex;
  color: #808080;
  -ms-user-select: none;
  -moz-user-select: none;
  -webkit-user-select: none;

  .block-title-inner{
    margin: 0 auto;
    display: inline-block;
    display: flex;
  }
  .left-line,.right-line{
    width: 240px;
    height: 2px;
    padding: 23px 0;
  }
  .left-line{
    margin-right: 18px;
  }
  .right-line{
    margin-left: 18px;
  }
}

.block-title>div{
  display: inline-block;
}

.block-title .left-line-inner{
  height: 2px;
  background-image: linear-gradient(to left, #3595db, #ffffff)
}

.block-title .right-line-inner{
  height: 2px;
  background-image: linear-gradient(to right, #3595db, #ffffff)
}

.block-list {
  overflow: hidden;
  display: flex;
  flex-wrap: wrap;
  .info-block {
    text-align: center;
    flex-grow: 1;
    min-width: calc(33% - 32px);
    margin: 8px 16px;
    height: 188px;
    border: solid 1px #d6d6d6;
    float: left;
    box-shadow: 0 0 4px #d6d6d6;
    background-color: #fff;
    cursor: pointer;
    &:hover{
      .info_title,.info_desc,.icon_span{
        color: #3595db
      }
    }
    .info_title{
      margin-top: 28px;
      font-size: 20px;
      color: #343434;
    }
    .info_desc{
      margin-top: 24px;
      font-size: 16px;
      color: #aaa;
      max-width: 300px;
      transform: translateX(-50%);
      position: relative;
      left: 50%;
    }
  }

  .icon_span {
    display: inline-block;
    margin-top: 12px;
    font-size: 48px;
    color: #a5a5a5;
  }
}

.block-list .info-block:hover {
  border: solid 1px #3595db;
  box-shadow: none
}
.footer{
  min-height: 50px;
}

.sdk_asset{
  position: relative;
  a {
    position: absolute;
    right: 24px;
  }
}
</style>
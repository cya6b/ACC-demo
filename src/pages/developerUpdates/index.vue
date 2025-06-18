<template>
  <div class="back">
    <div class="top_nav">
    </div>
    <div class="center_nav">
      <div class="update_introduce" v-for="(item, itemIndex) in updateList" :key="itemIndex">
        <h3 class="title">{{ item.title }}</h3>
        <div class="update_time">{{ item.updateTime }}</div>
        <div v-if="item.children" class="introduce_list">
          <div class="introduce_block" v-for="introduce in item.children">
            <h5 class="title">{{ introduce.title }}</h5>
            <ul>
              <li v-for="introItem in introduce.list">{{ introItem }}</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    <footer class="footer"></footer>
  </div>
</template>

<script>
import updateList from './js/updateList.js'
export default {
  data () {
    return {
      updateList
    }
  },
  created () {
  },
  methods: {
  }
}
</script>

<style lang="less" scoped>

.back{
  height: 100%;
  background: #eee;
}
.top_nav{
  padding: 24px 0px;
  margin: 0px 240px;
  display: flex;
  justify-content: space-between;
}
.center_nav{
  height: calc(100% - 120px);
  overflow-y: auto;
  margin: 0px 240px;

  background-color: #fff;
  padding: 0 40px 20px;
  box-shadow: 0px 2px 2px 0 hsla(0,0%,60%,.5);

  .update_introduce{
    min-height: 240px;
    padding: 30px 0;
    border-bottom: 1px solid #ccc;

    .update_time{
      color: #999;
      font-size: 14px;
      line-height: 19px;
      margin: 8px 0 -6px;
    }

    .introduce_list{
      line-height: 1.5;
      font-size: 14px;
      color: #333;
    }
  }
}
.footer{
  min-height: 50px;
}

h3{
  font-weight: 400;
  font-size: 24px;
}

h5{
  margin: 15px 0 10px;
  font-size: 14px;
  color: #222;
}
</style>
<template>
  <div class="aside-menu ab"  @touchmove.prevent :class="{isshow:isshow}">
      <div class="menu">
          <div class="user">
              <div v-if="user.avatar_url!=''"><img :src="user.avatar_url" alt=""></div>
              <div v-if="user.name!=''">{{user.name}}</div>
              <div v-if="user.name==''" @click="dl()">未登录</div>
          </div>
          <div class="info">
              <div><i class="iconfont icon-laba-xianxing"></i>我的消息</div>
              <div><i class="iconfont icon-huati"></i>发布话题</div>
              <div><i class="iconfont icon-gerenzhongxinkaobei"></i>个人中心</div>
              <div><i class="iconfont icon-guanyu"></i>关于</div>
          </div>
      </div>
      <div class="mask" @click="ck()" ></div>
  </div>
</template>
<script>
import { MessageBox } from 'mint-ui';
export default {
  name: 'loadbox',
  data() {
    return {
      isshow: false,
      user: {
        name: '',
        avatar_url: ''
      }
    };
  },
  methods: {
    ck() {
      this.isshow = true;
    },
    dl() {
      MessageBox.prompt('请输入你的token').then(({ value, action }) => {
        this.$ajax
          .post('https://cnodejs.org/api/v1/accesstoken', {
            accesstoken: '6fc81a3d-f6a1-4f7c-b342-a19381a4b6df'
          })
          .then(function(response) {
            console.log(response);
          })
          .catch(function(error) {
            console.log(error);
          });
      });
    }
  }
};
</script>
<style scoped>
.aside-menu {
  position: relative;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  width: 100%;
  height: 100%;
  display: flex;
}
.ab {
  z-index: 100;
}
.isshow {
  display: none;
}
.menu {
  width: 100%;
  background-color: white;
  box-shadow: 0 0 12px grey;
  display: flex;
  flex-direction: column;
}
.user {
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  justify-content: center;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  width: 100%;
  height: 200px;
  background-color: #2196f3;
  color: #fff;
}
.user img {
  width: 100px;
  height: 100px;
  border-radius: 50px;
  cursor: pointer;
}
.mask {
  flex: 1;
}
.info div {
  border-top: 1px solid rgba(0, 0, 0, 0.05);
  padding-left: 50px;
  box-sizing: border-box;
  width: 100%;
  height: 50px;
  cursor: pointer;
  line-height: 50px;
}
.iconfont {
  font-size: 1.2em;
  margin-right: 8px;
  color: #1296db;
}
.mint-msgbox-wrapper {
  z-index: 1000000;
}
</style>

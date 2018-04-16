<template>
  <div class="hello" >


    <mt-tabbar v-model="selected" >
      <mt-tab-item id="首页">
        <span slot="icon" class="iconfont icon-zhuye"></span>
        首页
      </mt-tab-item>
      <mt-tab-item id="发现">
        <span slot="icon" class="iconfont icon-zhuye"></span>发现
      </mt-tab-item>
      <mt-tab-item id="我的">
        <span slot="icon" class="iconfont icon-zhuye"></span> 我的
      </mt-tab-item>
    </mt-tabbar>
    <mt-tab-container v-model="selected">
      <mt-tab-container-item class="wm" id="首页">
        <mt-navbar v-model="selectedtype"  class="wm-type">
          <div id="1" @click="changeTab('all')" :class="{isselected:tab=='all'}">全部</div>
          <div id="2" @click="changeTab('good')" :class="{isselected:tab=='good'}">精华</div>
          <div id="3" @click="changeTab('share')" :class="{isselected:tab=='share'}">分享</div>
          <div id="4" @click="changeTab('ask')" :class="{isselected:tab=='ask'}">问答</div>
        </mt-navbar>
        <list q='all' ref="list"></list>
      </mt-tab-container-item>

      <mt-tab-container-item id="发现">
        111
      </mt-tab-container-item>
      <mt-tab-container-item id="我的">
        2222
      </mt-tab-container-item>
    </mt-tab-container>
  </div>
</template>
<script>
import list from './list';
var count = 0;
export default {
  name: 'HelloWorld',
  components: {
    list
  },
  data() {
    return {
      msg: 'Welcome to Your Vue.js App',
      selected: '首页',
      selectedtype: '1',
      list: [],
      data: [],
      page: 0,
      tab: this.$route.params.tab,
      pagesize: 20,
      loading: false,
      types: {
        all: '全部',
        good: '精华',
        share: '分享',
        ask: '问答',
        job: '招聘'
      },
      busy: false
    };
  },
  methods: {
    ck() {
      alert(1);
    },
    changeTab(type, page = 1) {
      if (type == 'all' || type == '全部') {
        this.tab = 'all';
        this.$refs.list.resload('all');
      } else if (type == 'good' || type == '精华') {
        this.tab = 'good';
        this.$refs.list.resload('good');
      } else if (type == 'share' || type == '分享') {
        this.tab = 'share';
        this.$refs.list.resload('share');
      } else if (type == 'ask' || type == '问答') {
        this.tab = 'ask';
        this.$refs.list.resload('ask');
      }
    }
  },
  created() {},
  mounted() {
    if (this.tab == null || this.tab == '') {
      this.tab = 'all';
    }
    if (this.$route.params.tab != null) {
      if (this.tab == 'all') {
        this.$refs.list.resload('all');
      } else if (this.tab == 'good') {
        this.$refs.list.resload('good');
      } else if (this.tab == 'share') {
        this.$refs.list.resload('share');
      } else if (this.tab == 'ask') {
        this.$refs.list.resload('ask');
      }
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1,
h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}

.mint-tabbar {
  position: fixed;
  z-index: 100;
  max-width: 640px;
  margin: 0 auto;
}

.mint-header {
  position: fixed;
  z-index: 100;
  width: 100%;
  left: 0;
  top: 0;
}

.loading {
  text-align: center;
  width: 100%;
  display: block;
}
.isselected {
  margin-bottom: 0;
  border-bottom: 2px solid #ff4081;
}
</style>

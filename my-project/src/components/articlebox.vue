<template>
  <div class="artcle">
    <div class="wm-type">
      <div @click="changeTab('all')" :class="{isselected:tab=='all'}">首页</div>
      <div @click="changeTab('good')" :class="{isselected:tab=='good'}">精华</div>
      <div @click="changeTab('share')" :class="{isselected:tab=='share'}">分享</div>
      <div @click="changeTab('ask')" :class="{isselected:tab=='ask'}">问答</div>
    </div>
    <div class="article-title">
      <h1>
        <span class="flag" v-show="item.top || item.good">{{(item.top ? '置顶' : '') || (item.good ? '精华': '') || types[item.tab]}}</span>{{item.title}}</h1>
    </div>
    <div v-html="content" class="content">
    </div>
    <div style="height:200px">
    </div>
  </div>
</template>
<script>
export default {
  name: 'articlebox',
  data() {
    return {
      article_id: this.$route.params.aID,
      tab: this.$route.params.tab,
      item: {
        top: '',
        good: ''
      },
      content: '',
      selectedtype: 1,
      types: {
        all: '全部',
        good: '精华',
        share: '分享',
        ask: '问答',
        job: '招聘'
      }
    };
  },
  methods: {
    rou(tab) {
      this.$router.push({
        name: 'HelloWorld',
        params: {
          tab: tab
        }
      });
    },
    changeTab(type, page = 1) {
      this.tab = type;
      this.page = 0;
      if (type == 'all') {
        this.$router.push({
          path: '/?tab='
        });
      } else if (type == 'good') {
        this.rou('good');
      } else if (type == 'share') {
        this.rou('share');
      } else if (type == 'ask') {
        this.rou('ask');
      }
    }
  },
  created() {
    // alert(this.$route.params.tab);
    this.$http
      .get('https://cnodejs.org/api/v1/topic/' + this.article_id)
      .then(response => {
        this.item = response.data.data;
        this.content = response.data.data.content;
        this.top = response.data.data.top;
        this.good = response.data.data.good;
      });
  }
};
</script>
<style scoped>
.isselected {
  margin-bottom: 0;
  border-bottom: 2px solid #ff4081;
}
</style>

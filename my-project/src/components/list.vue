<template>
<div>
  <div v-show="loading" id="bp">
    <mt-spinner type="fading-circle" style="margin:0 auto;"></mt-spinner>
  </div>
  <ul class="dd" v-infinite-scroll="loadMore"
  infinite-scroll-disabled="loading"
  infinite-scroll-distance="1">
    <li v-for="(item,index) in list" class="item" v-bind:key="item.id+index">
      <div class="avatar">
        <img :src="item.author.avatar_url" alt="">
      </div>
      <div class="title">
        <p>
          <span class="flag" :class="{special: item.top || item.good}">{{(item.top ? '置顶' : '') || (item.good ? '精华': '') || types[item.tab]}}</span>
          <router-link :to="{name: 'articlebox', params: {aID: item.id,tab:item.tab}}">{{item.title}}</router-link>
        </p>
        <p class="view">
          <span class="viewed">{{item.reply_count}}</span>/{{item.visit_count}}
          <span class="date"> {{changeTime(item.last_reply_at)}}</span>
        </p>
      </div>
    </li>
  </ul>
</div>
</template>
<script>
export default {
  name: 'list',
  props: ['q'],
  data() {
    return {
      msg: 'ttt',
      list: [],
      dddd: [],
      page: 0,
      pagesize: 20,
      tab: this.q,
      loading: true,
      types: {
        all: '首页',
        good: '精华',
        share: '分享',
        ask: '问答',
        job: '招聘'
      }
    };
  },
  methods: {
    loadMore: function() {
      console.log(2);
      this.loading = true;
      this.page++;
      this.$http
        .get(
          'https://cnodejs.org/api/v1/topics?page=' +
            this.page +
            '&limit=' +
            this.pagesize +
            '&tab=' +
            this.tab
        )
        .then(response => {
          this.list = this.list.concat(response.data.data);
        });
      this.loading = false;
    },
    resload(tb) {
      this.tab = tb;
      this.page = 0;
      this.loading = true;
      this.list = null;
      this.$http
        .get(
          'https://cnodejs.org/api/v1/topics?page=' +
            this.page +
            '&limit=' +
            this.pagesize +
            '&tab=' +
            this.tab
        )
        .then(response => {
          this.list = response.data.data;
          this.loading = false;
        });
    }
  },
  created() {
    if (this.tab == null || this.tab == '') {
      this.tab = 'all';
    }
    this.$http
      .get(
        'https://cnodejs.org/api/v1/topics?page=' +
          this.page +
          '&limit=' +
          this.pagesize +
          '&tab=' +
          this.tab
      )
      .then(response => {
        this.list = response.data.data;
        this.loading = false;
      });
  }
};
</script>
<style scoped>
#bp {
  height: 100%;
  width: 100%;
  position: relative;
  z-index: 100;
  background-color: white;
  /* opacity: 0.2; */
  top: 0;
  left: 0;
}
.mint-spinner-fading-circle {
  margin: 0 auto;
}
</style>

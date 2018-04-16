<template>
  <div class="artcle">
    <div class="wm-type">
      <div @click="changeTab('all')" :class="{isselected:tab=='all'}">首页</div>
      <div @click="changeTab('good')" :class="{isselected:tab=='good'}">精华</div>
      <div @click="changeTab('share')" :class="{isselected:tab=='share'}">分享</div>
      <div @click="changeTab('ask')" :class="{isselected:tab=='ask'}">问答</div>
    </div>
    <div class="article-title">
      <h1 style="text-align:center;">
        <span class="flag" v-show="item.top || item.good">{{(item.top ? '置顶' : '') || (item.good ? '精华': '') || types[item.tab]}}</span>
        {{item.title}}
        <span style="display:block;font-size:0.5em;text-align:center;color:#666">发布于 {{changeTime(item.create_at)}} 作者 <span style="color: #3f51b5;">{{item.author.loginname}}</span> {{item.visit_count}} 次浏览 来自{{types[item.tab]}}</span>
      </h1>
    </div>
    <div v-html="content" class="content">
    </div>
    <div style="width:98%;margin:2em auto 0;color:black;">
      {{replieslen}}回复
    </div>
    <div class="replies"> 
      <ul>
        <li v-for="(replie,index) in item.replies" :key="replie.id+index" class="admins">
          <div class="adminP">
            <img :src="replie.author.avatar_url" alt="">
            <span class="name">{{replie.author.loginname}}</span>
            {{index+1}}楼 *
            {{changeTime(replie.create_at)}}
          </div>
          
          <div v-html="replie.content" class="content"></div>
        </li>
      </ul>
    </div>
    <div style="height:20px">
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
        good: '',
        author: { loginname: '' }
      },
      content: '',
      selectedtype: 1,
      replieslen: 0,
      types: {
        all: '全部',
        good: '精华',
        share: '分享',
        ask: '问答',
        job: '招聘'
      }
    };
  },
  // computed: {
  //   replay: function() {
  //     return this.item.replies.reverse();
  //   }
  // },

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

        this.replieslen =
          response.data.data.replies == null
            ? 0
            : response.data.data.replies.length;
      });
  }
};
</script>
<style scoped>
.isselected {
  margin-bottom: 0;
  border-bottom: 2px solid #ff4081;
}
.artcle {
  background-color: rgba(0, 0, 0, 0.07);
}
.article-title {
  background-color: white;
}
.content {
  background-color: white;
  padding: 1em 0.5em;
}
.adminP {
  width: 100%;
  position: relative;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  padding: 1em;
  /* text-align: right; */
}
.adminP img {
  width: 24px;
  height: 24px;
  display: inline;
  position: absolute;
  left: 0;
  left: 1em;
}
.name {
  text-decoration: none;
  color: #3f51b5;
}
.admins {
  background-color: white;
  margin: 0 auto 6px;
}
ul {
  width: 98%;
  margin: 1% auto;
}
.markdown-text p {
  padding: 0 1em;
}
</style>

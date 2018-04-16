// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import MintUI from 'mint-ui';
import 'mint-ui/lib/style.css';
import VueResource from 'vue-resource';
import App from './App';
import router from './router';
import style from './assets/style.scss';
import moment from 'moment';

Vue.config.productionTip = false;
Vue.use(MintUI);
Vue.use(VueResource);
Vue.prototype.moment = moment;
Vue.prototype.changeTime = time =>
  moment(time)
    .startOf('minute')
    .fromNow()
    .replace(/hours?/, '小时')
    .replace('ago', '前')
    .replace(/days?/, '天')
    .replace(/minutes?/, '分钟')
    .replace(/\ban?/, '1')
    .replace(/months?/, '个月')
    .replace(/\byears?/, '年')
    .replace(/\s/g, '')
    .replace('fewseconds', '分钟');
/* eslint-disable no-new */
Vue.component('tt', {
  template:
    "<div class='dd' v-infinite-scroll='loadMore1' infinite-scroll-disabled='loading' infinite-scroll-distance='25'>\
  <div v-for='item in list1' class='item'>\
            <div class='avatar'>\
              <img :src='item.author.avatar_url' alt=''>\
            </div>\
            <div class='title'>\
              <p>\
                <span class='flag' :class='{special: item.top || item.good}'>{{(item.top ? '置顶' : '') || (item.good ? '精华': '') || types[item.tab]}}</span>\
                <router-link :to=" +
    '"' +
    "{name: 'articlebox', params: {aID: item.id,tab:item.tab}}" +
    '"' +
    ">{{item.title}}</router-link>\
              </p>\
              <p class='view'>\
                <span class='viewed'>{{item.reply_count}}</span>/{{item.visit_count}}\
                <span class='date'> {{changeTime(item.last_reply_at)}}</span>\
              </p>\
            </div>\
          </div>\
          </div>\
          ",
  props: ['q'],
  data() {
    return {
      txt: this.q,
      list1: [],
      dddd: [],
      page: 0,
      pagesize: 20,
      tab: this.q,
      loading: false,
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
    loadMore1() {
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
          this.list1 = this.list1.concat(response.data.data);
          this.loading = false;
        });
    }
  },
  created() {
    console.log(1);
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
        this.list1 = response.data.data;
        this.loading = false;
      });
  }
});
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>',
  render: h => h(App)
});

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
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>',
  render: h => h(App)
});

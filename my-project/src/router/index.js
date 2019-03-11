import Vue from 'vue';
import Router from 'vue-router';
import HelloWorld from '@/components/HelloWorld';
import articlebox from '@/components/articlebox';
import contentbox from '@/components/contentbox';
import list from '@/components/list';
import loadbox from '@/components/loadbox';
Vue.use(Router);

export default new Router({
  // mode: 'history',
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/HelloWorld',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/articlebox/:aID',
      name: 'articlebox',
      component: articlebox
    },
    {
      path: '/list',
      name: 'list',
      component: list
    },
    {
      path: '/loadbox',
      name: 'loadbox',
      component: loadbox
    }
  ]
});

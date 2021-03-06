import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '../components/HelloWorld'
import Echart from  '../components/echartTest'
import graphx from '../components/graphx'
import graphTest from '../components/graphxTest'
import CommentsChange from "../components/commentsChange";
import UsersChange from "../components/usersChange";
Vue.use(Router)

export default new Router({
  mode:'history',
  routes: [
    {
      path: '/',
      name: 'Echart',
      component: Echart
    },
    {
      path: '/streaming',
      name: 'Echart',
      component: Echart
    },
    {
      path: '/graphx',
      name: 'graphx',
      component: graphx
    },
    {
      path: '/graphTest',
      name: 'graphTest',
      component: graphTest
    },
    {
      path: '/comments',
      name: 'commentsChange',
      component: CommentsChange
    },
    {
      path: '/users',
      name: 'usersChange',
      component: UsersChange
    },
    {
      path: '/Hello',
      name: 'HelloWorld',
      component: HelloWorld
    }
  ]
})

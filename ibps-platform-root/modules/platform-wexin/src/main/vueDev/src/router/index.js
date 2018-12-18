import Vue from 'vue'
import Router from 'vue-router'

import index from '@/page/index'
import login from '@/page/login/index'

import main from '@/page/Main'

import selectorOrg from '@/components/selector/org'
import selectorRole from '@/components/selector/role'
import selectorUser from '@/components/selector/user'
import selectorView from '@/components/selector/view'

import orgSelector from '@/components/selectors/org'
import roleSelector from '@/components/selectors/role'
import userSelector from '@/components/selectors/user'
import viewSelector from '@/components/selectors/view'


import taskList from '@/page/waitingHandle/list'
import detail from '@/page/waitingHandle/detail'
import agree from '@/page/waitingHandle/agree'
import reject from '@/page/waitingHandle/reject'
import rejectToStart from '@/page/waitingHandle/rejectToStart'
import stopProcess from '@/page/waitingHandle/stopProcess'
import flowImage from '@/page/waitingHandle/flowImage'

import completedList from '@/page/completed/list'
import completedDetail from '@/page/completed/detail'

import handledList from '@/page/handled/list'

import requestList from '@/page/request/list'

import newsList from '@/page/news/list'
import newsDetail from '@/page/news/detail'
import editNews from '@/page/news/edit'

//import loading from '@/page/loading'
//import test from '@/page/test'

import target from '@/components/dictionary/target'

Vue.use(Router);

const router = new Router({
  routes: [
    {
      path: '/dictionary/target',
      name: 'dictionaryTarget',
      component: target
    },
//    {
//      path: '/loading',
//      name: 'loading',
//      component: loading
//    },
//    {
//      path: '/test',
//      name: 'test',
//      component: test
//    },
    {
      path: '/',
      name: 'index',
      component: index
    },{
      path: '/main',
      name: 'main',
      component: main
    },{
      path: '/login',
      name: 'login',
      component: login
    },{
      path: '/waiting/list',
      name: 'waitingHandleList',
      component: taskList
    },{
      path: '/waiting/detail',
      name: 'waitingHandleDetail',
      component: detail
    },{
      path: '/waiting/agree',
      name: 'waitingHandleAgree',
      component: agree
    },{
      path: '/waiting/reject',
      name: 'waitingHandleReject',
      component: reject
    },{
      path: '/waiting/rejectToStart',
      name: 'waitingHandleRejectToStart',
      component: rejectToStart
    },{
      path: '/waiting/stopProcess',
      name: 'waitingHandleStopProcess',
      component: stopProcess
    },{
      path: '/waiting/flowImage',
      name: 'waitingHandleFlowImage',
      component: flowImage
    },{
      path: '/handled/list',
      name: 'handledList',
      component: handledList
    },{
      path: '/handled/detail',
      name: 'handledDetail',
      component: completedDetail
    },{
      path: '/completed/list',
      name: 'completedList',
      component: completedList
    },{
      path: '/completed/detail',
      name: 'completedDetail',
      component: completedDetail
    },{
      path: '/request/list',
      name: 'requestList',
      component: requestList
    },{
      path: '/request/detail',
      name: 'requestDetail',
      component: completedDetail
    },{
      path: '/selector/org',
      name: 'selectorOrg',
      component: selectorOrg
    },{
      path: '/selector/role',
      name: 'selectorRole',
      component: selectorRole
    },{
      path: '/selector/user',
      name: 'selectorUser',
      component: selectorUser
    },{
      path: '/selector/selectorView',
      name: 'selectorView',
      component: selectorView
    },{
      path: '/selectors/org',
      name: 'orgSelector',
      component: orgSelector
    },{
      path: '/selectors/role',
      name: 'roleSelector',
      component: roleSelector
    },{
      path: '/selectors/user',
      name: 'userSelector',
      component: userSelector
    },{
      path: '/selectors/view',
      name: 'viewSelector',
      component: viewSelector
    },{
      path: '/news/list',
      name: 'newsList',
      component: newsList
    },{
      path: '/news/detail',
      name: 'newsDetail',
      component: newsDetail
    },{
      path: '/news/new',
      name: 'newNews',
      component: editNews
    },{
      path: '/news/edit',
      name: 'editNews',
      component: editNews
    }
  ]
});

export default router

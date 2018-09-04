import Vue from 'vue'
import Router from 'vue-router'
import MySelf from '@/components/mySelf/mySelf'
import Registor from '@/components/registor'
import Login from '@/components/login'
import Index from '@/components/index'
import NearBy from '@/components/nearBy/nearBy'
import Mycar from '@/components/myCar/myCar'
import Recharge from '@/components/recharge/recharge'
import Password from '@/components/password/password'
import Comment from '@/components/comment/comment'
import Check from '@/components/check/check'
import Cards from '@/components/cards/cards'
import Order from '@/components/order/order'
import Message from '@/components/message/message'
import Record from '@/components/record/record'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Login',
      component: Login
    }, {
      path: '/login',
      name: 'Login',
      component: Login
    }, {
          path: '/registor',
          name: 'Registor',
          component: Registor
      }, {
          path: '/mySelf',
          name: 'Myself',
          component: MySelf
      },{
      path: '/index',
      name: 'Index',
      component: Index
    }, {
      path: '/nearBy',
      name: 'NearBy',
      component: NearBy
    },{
      path: '/mycar',
      name: 'Mycar',
      component: Mycar
    },{
      path: '/recharge',
      name: 'recharge',
      component: Recharge
    },{
      path: '/check',
      name: 'Check',
      component: Check
    },{
      path: '/comment',
      name: 'Comment',
      component: Comment
    },{
      path: '/password',
      name: 'Password',
      component: Password
    },{
      path: '/cards',
      name: 'Cards',
      component: Cards
    },{
      path: '/order',
      name: 'Order',
      component:Order
    },{
      path: '/message',
      name: 'Message',
      component:Message
    },
      {
      path: '/record',
      name: 'Record',
      component:Record
    }]
})

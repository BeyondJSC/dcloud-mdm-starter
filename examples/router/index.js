import Vue from 'vue'
import VueRouter from 'vue-router'
import AccountRouter from '../pages/account/account.router'
import WorkbenchRouter from '../pages/workbench/workbench.router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/account/login'
  },
  AccountRouter,
  WorkbenchRouter
]

const router = new VueRouter({
  mode: 'history',
  routes
})

export default router
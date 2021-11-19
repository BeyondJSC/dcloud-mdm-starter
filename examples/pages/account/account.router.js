import account from './account.vue'
import login from './login/login.vue'

export default {
  path: '/account',
  name: 'account',
  component: account,
  redirect: '/account/login',
  children: [
    {
      path: 'login',
      name: 'login',
      component: login
    }
  ]
}

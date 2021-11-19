import router from './index'
import store from '@/store'

router.beforeEach((to, from, next) => {
  const token = store.state.authModule.token
  if (to.path.startsWith('/account')) {
    next()
  } else if (token) {
    next()
  } else {
    next({ path: '/account/login' })
  }
})

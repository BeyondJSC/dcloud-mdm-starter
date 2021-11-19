import Vue from 'vue'

import XRequestPlugin from './request/x-request'

import { SET_TOKEN } from '../store/auth.store'
import store from '../store'
import router from '../router'

Vue.use(XRequestPlugin, {
  baseURL: 'http://39.99.176.43:30701',
  headers: {
    'Accept-Language': 'zh-CN'
  },
  needShowMessage: true,
  businessErrorCatch: function (failRes, response, needShowMessage) {
    // 通用业务错误处理
    // console.log(failRes, response, needShowMessage)
    if (failRes.code === 'error' && needShowMessage) {
      Vue.prototype.$message({
        message: failRes.message,
        type: 'warning'
      })
    }
  },
  errorCatch: function (err, needShowMessage) {
    if (!err.response) {
      Vue.prototype.$message({
        type: 'warning',
        message: '网络不给力，请稍后再试'
      })

      return true
    }

    if (err.response.status === 401) {
      router.replace({ path: '/account/login' })
    } else if (err.response.status === 500) {
      Vue.prototype.$message({
        message: '服务器不给力，请稍后再试',
        type: 'error'
      })
    }
    return true
  }
})

// 添加request拦截器
Vue.addInterceptorsRequest('REQUEST_PARAMS_INTERCEPTOR', (e) => {
  const authStore = store.state.authModule
  const userStore = store.state.userModule
  if (authStore.token) {
    e.headers['demdmtoken'] = authStore.token
  }

  if (userStore.activeTenant && userStore.activeTenant.orgId) {
    e.headers['demdmtenantid'] = userStore.activeTenant.orgId
  }

  return e
})

// 添加response拦截器
Vue.addInterceptorsResponse('RESPONSE_SUCCESS_MSG_INTERCEPTOR', (e) => {
  const token = e && e.headers && e.headers.demdmtoken
  if (token) {
    store.commit(`authModule/${SET_TOKEN}`, token)
  }
  if (e && e.status === 200 && e.data.code === 'ok' && !e.config.disableSuccessMsg) {
    if (e.data.interval) {
      Vue.prototype.$message({
        message: e.data.message,
        type: 'success',
        durationTime: e.data.interval
      })
    } else {
      Vue.prototype.$message({
        message: e.data.message,
        type: 'success'
      })
    }
  }
  return e
})

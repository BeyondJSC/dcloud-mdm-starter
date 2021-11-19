export default {
  USER_LOGIN: { // 用户登录
    url: '/system/login/account',
    method: 'post'
  },
  SWITCH_USER_TENANT: {
    url: '/org/switch',
    method: 'get',
    disableSuccessMsg: true
  },
  QUERY_USER_CURRENT_INFO: {
    url: '/account/getUserInfo',
    method: 'get',
    disableSuccessMsg: true
  },
}
/*
 * @Author: your name
 * @Date: 2020-05-30 15:57:57
 * @LastEditTime: 2020-06-11 16:48:16
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /x-product-workspace/packages/x-project-app/src/store/auth.store.js
 */
import { isObject, isString } from '@p/utils'
import Vue from 'vue'

export const SET_USER_INFO = 'SET_USER_INFO'
export const SET_TOKEN = 'SET_TOKEN'
export const CLEAR_AUTH_STORE = 'CLEAR_AUTH_STORE'

export const authStore = {
  namespaced: true,
  state: {
    userInfo: {},
    token: '',
  },
  mutations: {
    [SET_USER_INFO](state, userInfo) {
      if (isObject(userInfo)) {
        state.userInfo = userInfo
      }
    },
    [SET_TOKEN](state, token) {
      if (isString(token)) {
        state.token = token
        Vue.addHeaders({
          demdmtoken: token
        })
      }
    },
    [CLEAR_AUTH_STORE](state) {
      state.userInfo = null
      state.token = null
    }
  },
  actions: {},
  getters: {}
}

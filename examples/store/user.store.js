/*
 * @Author: your name
 * @Date: 2020-05-30 15:57:57
 * @LastEditTime: 2020-06-11 16:48:16
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /x-product-workspace/packages/x-project-app/src/store/auth.store.js
 */
import Vue from 'vue'
import apis from '@p/apis'

export const SET_INITIALIZE_STATE = 'SET_INITIALIZE_STATE'
export const CLEAR_USER_STORE = 'CLEAR_USER_STORE'
export const SET_ACTIVE_TENANT = 'SET_ACTIVE_TENANT'
export const SET_TENANT_LIST = 'SET_TENANT_LIST'
export const SET_ROLE_LIST = 'SET_ROLE_LIST'

export const INIT_USER_STORE = 'INIT_USER_STORE'

function queryUserCurrentInfo(loginId) {
  const request = {
    ...apis.QUERY_USER_CURRENT_INFO,
    params: {
      loginId
    }
  }
  return new Promise((resolve, reject) => {
    Vue.prototype
      .$request(request)
      .asyncThen(
        (resp) => {
          resolve(resp.data)
        },
        (err) => {
          reject(err)
        }
      )
      .asyncErrorCatch((err) => {
        reject(err)
      })
  })
}

export const userStore = {
  namespaced: true,
  state: {
    initializeState: false,
    tenantList: [],
    roleList: [],
    activeTenant: null
  },
  mutations: {
    [SET_INITIALIZE_STATE](state, initializeState) {
      state.initializeState = initializeState
    },
    [SET_ACTIVE_TENANT](state, tenantId) {
      state.activeTenant =
        state.tenantList.find((tenant) => tenant.orgId === tenantId) || state.tenantList[0] || null
    },
    [SET_TENANT_LIST](state, tenantList) {
      state.tenantList = tenantList || []
    },
    [SET_ROLE_LIST](state, roleList) {
      state.roleList = roleList || []
    },
    [CLEAR_USER_STORE](state) {
      state.activeTenant = null
      state.tenantList = []
      state.initializeState = false
    }
  },
  actions: {
    [INIT_USER_STORE]({ state, commit, rootState }, tenantId) {
      return new Promise((resolve, reject) => {
        let loginId = rootState.authModule.userInfo.id
        queryUserCurrentInfo(loginId)
          .then((currentInfo) => {
            commit(SET_TENANT_LIST, currentInfo.orgDtoList)
            commit(SET_ROLE_LIST, currentInfo.roleDtoList)
            commit(SET_ACTIVE_TENANT, tenantId)
            resolve(state)
          })
          .catch((err) => {
            reject(err)
          })
      })
    }
  },
  getters: {}
}

import store from '@p/store'
import { INIT_USER_STORE, SET_ACTIVE_TENANT } from '@p/store/user.store'
import apis from '@p/apis'
import { mapState, mapMutations } from 'vuex'

export default {
  beforeRouteEnter(to, from, next) {
    store.dispatch(`userModule/${INIT_USER_STORE}`, to.params.tenantId).then((state) => {
      let { activeTenant, roleList } = state
      if (!to.params.tenantId || to.params.tenantId !== activeTenant.orgId) {
        next(vm => {
          vm.$router.replace({
            ...vm.$route,
            params: {
              ...vm.$route.params,
              tenantId: activeTenant.orgId
            }
          })
        })
      } else {
        next()
      }
    })
  },
  computed: {
    ...mapState({
      tenantList: (state) => state.userModule.tenantList,
      activeTenant: (state) => state.userModule.activeTenant
    })
  },
  methods: {
    ...mapMutations('userModule', {
      setActiveTenant: SET_ACTIVE_TENANT
    }),
    switchUserTenant(orgId) {
      const request = {
        ...apis.SWITCH_USER_TENANT,
        params: {
          orgId
        }
      }
      return new Promise((resolve, reject) => {
        this.$request(request)
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
  }
}

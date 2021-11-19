<template>
  <div class="login">
    <div class="login-modal">
      <div class="logo">
        <img src="~@p/assets/img/logo.png" alt="logo" />
      </div>
      <div class="login-form">
        <div class="default-login">
          <el-form ref="loginForm" :model="loginForm" :rules="rules">
            <el-form-item prop="account">
              <el-input
                v-model="loginForm.account"
                type="text"
                autocomplete="off"
                placeholder="用户名"
                @keyup.enter.native="handleLogin"
              ></el-input>
            </el-form-item>
            <el-form-item prop="userPwd">
              <el-input placeholder="密码" v-model="loginForm.userPwd" show-password @keyup.enter.native="handleLogin"></el-input>
            </el-form-item>
            <el-button class="login-btn" type="primary" :loading="loading" @click="handleLogin">
              登录
            </el-button>
          </el-form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { generateValidator } from '@p/utils'
import apis from '@p/apis'
import { SET_USER_INFO, SET_TOKEN } from '@p/store/auth.store.js'
import { mapMutations } from 'vuex'

export default {
  data() {
    return {
      loading: false,
      loginForm: {
        account: '',
        userPwd: ''
      },
      rules: {
        account: [generateValidator('required', '请输入账号')],
        userPwd: [generateValidator('required', '请输入8-32位字母及数字组合')]
      }
    }
  },
  methods: {
    ...mapMutations('authModule', {
      setUserInfo: SET_USER_INFO,
      setToken: SET_TOKEN,
    }),
    handleLogin() {
      this.$refs.loginForm.validate((valid) => {
        if (valid) {
          this.loading = true
          this.toLogin(this.loginForm).finally(() => {
            this.loading = false
          })
        } else {
          return false
        }
      })
    },
    toLogin(data) {
      const request = {
        ...apis.USER_LOGIN,
        params: {
          ...data
        }
      }
      return new Promise((resolve, reject) => {
        this.$request(request).asyncThen((resp) => {
            this.setToken(resp.data.token)
            let userInfo = resp.data.loginUser
            // 用户信息
            this.setUserInfo({
              // 保证多Tab页用户信息的一致
              ...userInfo
            })

            this.$router.push({
              name: 'workbench',
              params: { tenantId: userInfo.defaultTenantId }
            })

            resolve()
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
</script>

<style lang="scss">
.login {
  position: relative;
  width: 100%;
  height: 100%;
  .login-modal {
    position: absolute;
    left: 50%;
    top: 162px;
    margin-left: -200px;
    width: 400px;
    padding: 40px;
    background-color: $--app-info-color;
    box-shadow: 0 0 8px 0 $--app-split-color;
    border-radius: 2px;
    box-sizing: border-box;
    .logo {
      width: 140px;
      height: 36px;
      margin-top: 20px;
      img {
        width: 100%;
        height: 100%;
      }
    }

    .default-login {
      margin-top: 60px;
    }
  }

  .login-form {
    margin-bottom: 20px;
    .login-btn {
      border: 0;
      width: 100%;
      margin-bottom: 20px;
    }
  }
}
</style>
<template>
  <div class="dmc_hello">
    <img alt="Vue logo" src="~@/assets/logo.png">
    <h1>{{ msg }}</h1>
    <el-button type="primary">test1</el-button>
    {{ userInfo }}
    {{ tenantList }}
    {{ roleList }}
  </div>
</template>

<script>
import { mapState } from 'vuex'
import Vue from 'vue'

export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
  computed: {
    ...mapState({
      userInfo: (state) => state.authModule.userInfo,
      tenantList: (state) => state.userModule.tenantList,
      roleList: (state) => state.userModule.roleList,
    })
  },
  created() {
    console.log(Vue)
  }
}
</script>
<!-- 建议所有的类名均以dmc_开头，否则可能被主工程样式影响 -->
<style lang="scss" scoped>
.dmc_hello {
  h3 {
    margin: 40px 0 0;
  }
  ul {
    list-style-type: none;
    padding: 0;
  }
  li {
    display: inline-block;
    margin: 0 10px;
  }
  a {
    color: #42b983;
  }
}
</style>

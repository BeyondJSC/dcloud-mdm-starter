<template>
  <div class="account">
    <router-view></router-view>
  </div>
</template>

<style lang="scss">
.account {
  width: 100vw;
  height: 100vh;
  background-image: url('~@p/assets/img/account-bg.png');
  background-size: 100%;
  .el-button {
    height: 36px;
    line-height: 36px;
    padding: 0 !important;
    span {
      font-size: 14px !important;
    }
  }
  .el-form-item__content {
    line-height: 36px !important;
  }
  .el-input {
    font-size: 14px !important;
  }
  .el-input__inner {
    height: 36px !important;
    line-height: 36px !important;
  }

  /** css safari hack */
  @media all and (-webkit-min-device-pixel-ratio: 0) {
    /* 这里单独设置Safari的样式 */
    .el-input__inner {
      line-height: 20px !important;
    }
  }
}
</style>
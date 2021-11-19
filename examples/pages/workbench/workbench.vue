<template>
  <div class="workbench">
    <div class="workbench__header">
      <div class="workbench__header-prefix">
        <div class="workbench__logo">
          <img src="~@p/assets/img/logo.png" alt="logo">
        </div>
      </div>
      <div class="workbench__header-container"></div>
      <div class="workbench__header-suffix">
        <person-avatar
          :personName="userInfo.userName"
          :avatarUrl="userInfo.headPortrait"
        ></person-avatar>
      </div>
    </div>
    <div class="workbench__container">
      <div class="workbench__menu">
        <el-menu
          :default-active="defaultActive"
          @select="handleSelect"
        >
          <template v-for="menu in menuData">
            <el-menu-item :index="menu.index" :key="menu.index">{{ menu.title }}</el-menu-item>
          </template>
        </el-menu>
      </div>
      <div class="workbench__main">
        <router-view :key="$route.query.t" :customItem="activeCustomItem"></router-view>
      </div>
    </div>
  </div>
</template>

<script>
import PersonAvatar from '@p/components/person-avatar'
import ModuleMixin from '@p/mixins/module.mixin'
import { mapState } from 'vuex'
import customItems from '@/index.js'

export default {
  components: {
    PersonAvatar
  },
  mixins: [ModuleMixin],
  data() {
    let menuData = customItems.reduce((menuData, item) => {
      if (item.type === 'applicationPage') {
        menuData.push({
          title: '应用页面' + item.name,
          index: item.name
        })
      }

      return menuData
    }, [])

    return {
      menuData
    }
  },
  computed: {
    ...mapState({
      userInfo: (state) => state.authModule.userInfo
    }),
    defaultActive() {
      return this.$route.params.name || this.menuData[0] && this.menuData[0].index
    },
    customItemsMap() {
      return customItems.reduce((customItemsMap, item) => {
        customItemsMap[item.name] = item
        return customItemsMap
      }, {})
    },
    activeCustomItem() {
      return this.customItemsMap[this.$route.params.name]
    }
  },
  created() {
    if (this.$route.params.name !== this.defaultActive) {
      this.$router.replace({
        name: 'dynamic-comp',
        params: {
          name: this.defaultActive
        },
        query: {
          t: new Date().getTime()
        }
      })
    }
  },
  methods: {
    handleSelect(index) {
      this.$router.push({
        name: 'dynamic-comp',
        params: {
          name: index
        },
        query: {
          t: new Date().getTime()
        }
      })
    }
  }
}
</script>

<style lang="scss">
.workbench {
  .workbench__header {
    display: flex;
    align-items: center;
    position: relative;
    z-index: 1000;
    height: 64px;
    box-shadow: 0 0 8px $--app-split-color;
    background-color: $--app-light-color;
    .workbench__header-prefix,
    .workbench__header-suffix {
      flex: 1;
    }

    .workbench__header-container {
      height: 100%;
      width: 1100px;
    }

    .workbench__header-prefix {
      display: flex;
      align-items: center;
      justify-content: center;
      min-width: 180px;
    }

    .workbench__header-suffix {
      display: flex;
      justify-content: flex-end;
      .x-person-avatar {
        margin-right: 20px;
        @include circleShape(36px);
      }
    }
  }
  .workbench__logo {
    width: 140px;
    height: 36px;
    overflow: hidden;
    > img {
      width: 100%;
      height: 100%;
    }
  }
  .workbench__container {
    display: flex;
    height: calc(100vh - 64px);
  }

  .workbench__menu {
    height: 100%;
    .el-menu {
      height: 100%;
      box-sizing: border-box;
      border-right: 0;
      padding: 16px 0;
      background-color: $--app-light-color;
      box-shadow: 0 0 8px $--app-split-color;
      &:not(.el-menu--collapse) {
        width: 234px;
      }

      .el-menu-item {
        display: flex;
        height: 44px;
        line-height: 44px;
        &:hover,
        &:focus {
          background-color:$--app-info-color;
        }
        &.is-active {
          background-color: $--app-selected-color;
          font-weight: bold;
        }
        .base-menu-item__icon {
          color: inherit;
          margin-right: 12px;
        }
        .base-menu-item__name {
          font-size: 14px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
      }
    }
  }

  .workbench__main {
    flex: 1;
    overflow: hidden;
  }
}
</style>
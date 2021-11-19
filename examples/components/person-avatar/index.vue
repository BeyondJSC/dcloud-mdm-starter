<!--
 * @Author: your name
 * @Date: 2020-07-02 10:56:20
 * @LastEditTime: 2020-07-02 19:20:24
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /x-product-workspace/packages/x-project-app/src/components/person-avatar/index.vue
-->
<template>
  <div class="x-person-avatar" :style="borderStyle">
    <template v-if="avatarUrl">
      <img class="img-avatar" :src="avatarRealUrl" alt="avatar" />
    </template>
    <template v-else>
      <div class="default-avatar">
        <span>{{ displayName }}</span>
      </div>
    </template>
  </div>
</template>

<script>
export default {
  name: 'XPersonAvatar',
  props: {
    avatarUrl: {
      type: String,
      default: ''
    },
    personName: {
      type: String,
      default: ''
    },
    square: {
      type: Boolean,
      default: false
    },
    size: {
      type: String,
      default: ''
    }
  },
  computed: {
    displayName: function() {
      if (this.personName) {
        return this.personName.slice(this.personName.length - 2, this.personName.length)
      } else {
        return ''
      }
    },
    avatarRealUrl: function() {
      if (this.$convertAvatarRealUrl && typeof this.$convertAvatarRealUrl === 'function') {
        return this.$convertAvatarRealUrl(this.avatarUrl)
      } else {
        return this.avatarUrl
      }
    },
    borderStyle() {
      let info = {}
      if (this.square) {
        info.borderRadius = '4px'
      }
      if (this.size) {
        info.width = this.size
        info.height = this.size
      }
      return info
    }
  }
}
</script>

<style lang="scss">
.x-person-avatar {
  @include circleShape(24px);
  display: flex;
  overflow: hidden;
  color: $--app-light-color;
  cursor: pointer;
  align-items: center;
  justify-content: center;
  .img-avatar {
    width: 100%;
    height: 100%;
    border-radius: 50%;
  }
  .default-avatar {
    display: flex;
    width: 100%;
    height: 100%;
    background-color: $--app-primary-color;
    justify-content: center;
    align-items: center;
    span {
      @include fontSize(10px);
    }
  }
}

</style>

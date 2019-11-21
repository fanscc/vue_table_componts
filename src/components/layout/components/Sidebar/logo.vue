<template>
  <div class="logo">
    <transition name="fade">
      <span v-if="isCollapse" class="logo_title is-bold" key="0">
        <template>
          <i
            class="logo-icon iconfont iconcaiwu"
            style="margin-right:0;color: #909399;"
          />
        </template>
      </span>
    </transition>
    <transition-group name="fade" style="transform: translateX(-25px);">
      <template v-if="!isCollapse">
        <span class="logo_subtitle" key="2"
          ><i class="logo-icon iconfont iconcaiwu" />模板系统</span
        >
      </template>
    </transition-group>
  </div>
</template>

<script>
export default {
  name: "logo",
  data() {
    return {};
  },
  props: ["isCollapse"],
  created() {},
  computed: {},
  methods: {}
};
</script>

<style scoped="scoped" lang="scss">
.fade-leave-active {
  transition: opacity 0.2s;
}
.fade-enter-active {
  transition: opacity 2.5s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
.logo {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  // width: 230px;
  height: 64px;
  line-height: 64px;
  background: #446cb3;
  color: #fdfdfd;
  text-align: center;
  font-size: 20px;
  font-weight: 600;
  overflow: hidden;
  box-sizing: border-box;
}
.logo_title {
  padding: 0 5px 0 0;
  color: #42b983;
  font-size: 20px;
  &.is-bold {
    font-weight: 700;
  }
}
.is-text {
  position: absolute;
  top: 0;
  // left: 20px;
}
.is-img {
  position: absolute;
  top: 10px;
  left: 10px;
}
.logo_subtitle {
  font-size: 22px;
  padding-top: 5px;
  margin-left: 5px;
}
.logo-icon {
  font-size: 18px;
  margin-right: 8px;
  color: #ffffff;
}
</style>

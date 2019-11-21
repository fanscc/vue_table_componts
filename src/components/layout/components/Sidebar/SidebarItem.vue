<template>
<!-- eslint-disable -->
  <div class="menu-wrapper">
    <template v-for="item in routes">
      <div v-if="!item.hidden && item.children" :key="item.path">
        <router-link
          v-if="
            hasOneShowingChildren(item.children) &&
              !item.children[0].children &&
              !item.alwaysShow
          "
          :to="item.path + '/' + item.children[0].path"
          :key="item.children[0].name"
        >
          <el-menu-item
            :index="item.path + '/' + item.children[0].path"
            :class="{ 'submenu-title-noDropdown': !isNest }"
          >
            <i class="siede-icon iconfont" v-if="item.children[0].meta && item.children[0].meta.icon" :class="item.children[0].meta.icon" />
            <span
              v-if="item.children[0].meta && item.children[0].meta.title"
              slot="title"
              >{{ item.children[0].meta.title }}</span
            >
          </el-menu-item>
        </router-link>
        <el-submenu v-else :index="item.name || item.path" :key="item.name">
          <template slot="title">
            <i class="siede-icon iconfont"   v-if="item.meta && item.meta.icon" :class="item.meta.icon" />
            <span v-if="item.meta && item.meta.title" slot="title">{{
              item.meta.title
            }}</span>
          </template>
          <template v-for="child in item.children">
            <div v-if="!child.hidden" :key="child.path">
              <sidebar-item
                :is-nest="true"
                class="nest-menu"
                v-if="child.children && child.children.length > 0"
                :routes="[child]"
                :key="child.path"
              ></sidebar-item>
              <router-link
                v-else
                :to="item.path + '/' + child.path"
                :key="child.name"
              >
                <el-menu-item :index="item.path + '/' + child.path">
                  <!-- <i class="siede-icon iconfont" :class="child.meta.icon" v-if="child.meta && child.meta.icon"/> -->
                  <span v-if="child.meta && child.meta.title" slot="title">{{
                    child.meta.title
                  }}</span>
                </el-menu-item>
              </router-link>
            </div>
          </template>
        </el-submenu>
      </div>
    </template>
  </div>
</template>

<script>
export default {
  name: "SidebarItem",
  props: {
    routes: {
      type: Array
    },
    isNest: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    hasOneShowingChildren(children) {
      const showingChildren = children.filter(item => {
        return !item.hidden;
      });
      if (showingChildren.length === 1) {
        if (showingChildren[0].meta.title === "首页") {
          return true;
        }
      }
      return false;
    }
  },
  created() {}
};
</script>

<style lang="scss" scoped>
.menu-wrapper {
  .siede-icon {
    font-size: 20px;
    margin-right: 8px;
    color: inherit;
  }
}
</style>

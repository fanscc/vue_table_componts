<template>
  <el-menu class="navbar" mode="horizontal">
    <nx-hamburger
      class="hamburger-container"
      :toggleClick="toggleSideBar"
      :isActive="sidebar.opened"
    ></nx-hamburger>

    <nx-breadcrumb class="breadcrumb-container"></nx-breadcrumb>

    <div class="right-menu">
      <el-tooltip effect="dark" content="全屏" placement="bottom">
        <nx-full-screen class="screenfull right-menu-item"></nx-full-screen>
      </el-tooltip>
      <!-- <lang-select class="international right-menu-item"></lang-select> -->
      <!-- <nx-lang-select class="international right-menu-item"></nx-lang-select> -->

      <!-- <el-tooltip effect="dark" content="主题" placement="bottom"> -->
      <!-- <theme-picker class="theme-switch right-menu-item"></theme-picker> -->
      <!-- <nx-skin class="theme-switch right-menu-item"></nx-skin> -->
      <!-- </el-tooltip> -->

      <el-dropdown class="avatar-container right-menu-item" trigger="click">
        <div class="avatar-wrapper">
          <span
            style="display: inline-block;transform: translateY(-7px);font-size: 16px;"
            >{{ user.username }}</span
          >
          <img class="user-avatar" :src="user.avatar" />
          <i class="el-icon-caret-bottom"></i>
        </div>
        <el-dropdown-menu slot="dropdown">
          <router-link to="/dashboard">
            <el-dropdown-item>
              home
            </el-dropdown-item>
          </router-link>
          <el-dropdown-item divided>
            <span @click="logout" style="display:block;">退出</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </el-menu>
</template>

<script>
import { mapGetters } from "vuex";
import nxBreadcrumb from "./common/nx-breadcrumb";
import nxHamburger from "./common/nx-hamburger";
import nxFullScreen from "./common/nx-full-screen";
// import nxLangSelect from "./common/nx-lang-select";
// import nxSkin from "./common/nx-skin";
export default {
  name: "navBar",
  components: {
    nxBreadcrumb,
    nxHamburger,
    nxFullScreen
    // nxLangSelect
    // nxSkin
  },
  data() {
    return {};
  },
  computed: {
    ...mapGetters(["sidebar", "user"])
  },
  methods: {
    toggleSideBar() {
      this.$store.dispatch("ToggleSideBar");
    },
    logout() {
      this.$store.dispatch("LogOut").then(() => {
        location.reload(); // In order to re-instantiate the vue-router object to avoid bugs
      });
    }
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.navbar {
  height: 50px;
  line-height: 50px;
  border-radius: 0px !important;
  .hamburger-container {
    line-height: 58px;
    height: 50px;
    float: left;
    padding: 0 10px;
  }
  .breadcrumb-container {
    float: left;
  }
  .nx-help {
    display: inline-block;
    vertical-align: top;
  }
  .errLog-container {
    display: inline-block;
    vertical-align: top;
  }
  .right-menu {
    float: right;
    height: 100%;
    &:focus {
      outline: none;
    }
    .right-menu-item {
      display: inline-block;
      margin: 0 8px;
    }
    .screenfull {
      height: 20px;
    }
    .international {
      vertical-align: top;
    }
    .theme-switch {
      vertical-align: 15px;
    }
    .avatar-container {
      height: 50px;
      margin-right: 30px;
      .avatar-wrapper {
        cursor: pointer;
        margin-top: 5px;
        position: relative;
        .user-avatar {
          font-size: 40px;
          border-radius: 10px;
          width: 30px;
          height: 30px;
        }
        .el-icon-caret-bottom {
          position: absolute;
          right: -20px;
          top: 25px;
          font-size: 12px;
        }
      }
    }
  }
}
</style>

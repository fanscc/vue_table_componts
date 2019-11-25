<template>
  <div class="popUpDome" v-show="dialogVisible">
    <div class="popUpDome_conten">
      <div style="height: 100%;overflow: auto;">
        <slot name="content"></slot>
      </div>
      <span class="close_btn" @click="closed"
        ><i class="el-icon-circle-close fontClosed-btn"></i
      ></span>
    </div>
    <div
      class="popUpDome_right"
      :style="{ transform: status ? 'translateX(0px)' : 'translateX(100%)' }"
    >
      <span class="icon_btn" @click="expandOrClose"
        ><i
          class="iconfont-btn"
          :class="[status ? 'el-icon-d-arrow-right' : 'el-icon-d-arrow-left']"
        ></i
      ></span>
      <div style="height: 100%;overflow: auto;">
        <slot name="rightContent"></slot>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      dialogVisible: false,
      status: false
    };
  },
  methods: {
    open() {
      this.dialogVisible = true;
    },
    expandOrClose() {
      this.status = !this.status;
    },
    closed() {
      this.dialogVisible = false;
      this.status = false;
    }
  }
};
</script>

<style lang="scss" scoped>
.popUpDome {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  z-index: 8888;
  .popUpDome_conten {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    height: 80%;
    .close_btn {
      position: absolute;
      left: 50%;
      top: -35px;
      background: #fff;
      transform: translateX(-50%);
      cursor: pointer;
      .fontClosed-btn {
        font-size: 35px;
      }
    }
  }
  .popUpDome_right {
    height: 100%;
    display: inline-block;
    background: #fff;
    position: absolute;
    transition: all 0.5s;
    right: 0;
  }
  .icon_btn {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 50px;
    height: 50px;
    border-radius: 35%;
    position: absolute;
    top: 50%;
    left: -34px;
    transform: translateY(-25px);
    background: #fff;
    cursor: pointer;
    .iconfont-btn {
      font-size: 25px;
      color: #409eff;
    }
  }
}
</style>

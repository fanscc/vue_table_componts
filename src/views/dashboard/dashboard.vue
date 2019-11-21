<template>
  <div class="home">
    <h1>欢迎使用后台模板系统</h1>
  </div>
</template>

<script>
export default {
  name: "dashboard",
  data() {
    return {};
  },
  methods: {}
};
</script>
<style lang="scss" scoped>
.home_nav {
  margin-top: 50px;
  text-align: center;
  font-size: 20px;
  font-weight: bold;
}
h1 {
  margin: 0;
  padding: 20px 0;
}
ul,
li {
  list-style: none;
}
.item_index {
  width: 24%;
  float: left;
  text-align: center;
  margin-top: 20px;
  p {
    cursor: pointer;
  }
  span {
    display: inline-block;
    width: 50px;
    height: 50px;
    line-height: 50px;
    text-align: center;
    border-radius: 50%;
    background: #3f90c8;
    cursor: pointer;
    .iconfont {
      font-size: 18px;
      color: #fff;
    }
  }
  .hover_color:hover {
    color: #3f90c8 !important;
  }
}
</style>

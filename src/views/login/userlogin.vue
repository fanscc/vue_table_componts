<template>
  <el-form
    class="login-form"
    status-icon
    :rules="loginRules"
    ref="loginForm"
    :model="loginForm"
    label-width="0"
  >
    <el-form-item prop="username">
      <el-input
        size="small"
        @keyup.enter.native="handleLogin"
        v-model="loginForm.username"
        auto-complete="off"
        placeholder="请输入用户名"
      >
        <i slot="prefix" class="icon-yonghu"></i>
      </el-input>
    </el-form-item>
    <el-form-item prop="password">
      <el-input
        size="small"
        @keyup.enter.native="handleLogin"
        :type="passwordType"
        v-model="loginForm.password"
        auto-complete="off"
        placeholder="请输入密码"
      >
        <i
          class="el-icon-view el-input__icon"
          slot="suffix"
          @click="showPassword"
        ></i>
        <i slot="prefix" class="icon-mima"></i>
      </el-input>
    </el-form-item>
    <!-- <el-checkbox v-model="checked">记住账号</el-checkbox> -->
    <el-form-item>
      <el-radio-group v-model="language" @change="changeLanguage">
        <el-radio label="zh">中文</el-radio>
        <el-radio label="en">英文</el-radio>
      </el-radio-group>
    </el-form-item>
    <el-form-item>
      <el-button
        type="primary"
        size="small"
        @click.native.prevent="handleLogin"
        class="login-submit"
        >{{ $t("login.logIn") }}</el-button
      >
    </el-form-item>
  </el-form>
</template>

<script>
import Cookies from "js-cookie";
export default {
  name: "userlogin",
  data() {
    const validateUsername = (rule, value, callback) => {
      if (!value) {
        callback(new Error("请输入正确的用户名"));
      } else {
        callback();
      }
    };

    return {
      loginForm: {
        username: "caokangying",
        password: "caokangying"
      },
      checked: false,
      language: Cookies.get("language") || "zh",
      loginRules: {
        username: [
          { required: true, trigger: "blur", validator: validateUsername }
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { min: 6, message: "密码长度最少为6位", trigger: "blur" }
        ]
      },
      passwordType: "password"
    };
  },
  created() {},
  mounted() {},
  computed: {},
  props: [],
  methods: {
    showPassword() {
      this.passwordType === ""
        ? (this.passwordType = "password")
        : (this.passwordType = "");
    },
    handleLogin() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.$store.dispatch("Login", this.loginForm).then(() => {
            this.$router.push({ path: "/dashboard/dashboard" });
          });
        }
      });
    },
    changeLanguage(val) {
      this.$i18n.locale = val;
      Cookies.set("language", val);
      this.$message.success("语言切换成功");
    }
  }
};
</script>
<style></style>

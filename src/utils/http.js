import axios from "axios";
import { Message, MessageBox, Loading } from "element-ui";
import router from "@/router/index";
import { getToken } from "@/utils/auth";
import store from "@/store";

let loadinginstance = null;
// 创建axios实例

const service = axios.create({
  // baseURL: window.location.origin, // api的base_url
  timeout: 60000 // 请求超时时间
});

// request拦截器
service.interceptors.request.use(
  config => {
    if (store.getters.token) {
      config.headers["X-Token"] = getToken(); // 让每个请求携带自定义token 请根据实际情况自行修改
    }
    if (
      process.env.NODE_ENV === "development" &&
      process.env.Environment !== "mock"
    ) {
      config.url = "Api" + config.url;
    }
    // 由noloding参数来判断是否需要显示loading
    if (!config.noloding) {
      loadinginstance = null;
      loadinginstance = Loading.service({
        fullscreen: true,
        lock: true,
        text: "Loading",
        background: "rgba(0, 0, 0, 0.5)"
      });
    }
    return config;
  },
  error => {
    // Do something with request error
    console.log(error); // for debug
    Promise.reject(error);
  }
);

// respone拦截器
service.interceptors.response.use(
  response => {
    loadinginstance && loadinginstance.close();
    loadinginstance = null;
    const { msg, success, code } = response.data;
    if (!success) {
      // code 401 sesion过期去登录页从新登录
      if (code === 401) {
        MessageBox.confirm(msg, "确定登出", {
          confirmButtonText: "重新登录",
          cancelButtonText: "取消",
          type: "warning"
        }).then(() => {
          router.push({ path: "/login" });
        });
      } else if (code === 403) {
        // 403 没有权限
        router.push({ path: "/errorPage/401" });
      } else {
        Message({
          message: msg,
          type: "error",
          duration: 5 * 1000
        });
      }
      return Promise.reject("error");
    } else {
      return response.data;
    }
  },
  error => {
    loadinginstance && loadinginstance.close();
    loadinginstance = null;
    if (error.toString().indexOf("Error: timeout") !== -1) {
      Message({
        message: "网络请求超时",
        type: "error",
        duration: 2500
      });
      return Promise.reject(error);
    }
    if (error.toString().indexOf("Error: Network Error") !== -1) {
      Message({
        message: "网络请求错误",
        type: "error",
        duration: 2500
      });
      return Promise.reject(error);
    }
    Message({
      message: error.message,
      type: "error",
      duration: 5 * 1000
    });
    return Promise.reject(error);
  }
);

export default service;

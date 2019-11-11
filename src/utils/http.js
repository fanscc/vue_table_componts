import axios from "axios";
import { Message, Loading } from "element-ui";

let loadinginstance = null;
// 创建axios实例

console.log(window.location.origin);
const service = axios.create({
  timeout: 60000 // 请求超时时间
});

// request拦截器
service.interceptors.request.use(
  config => {
    // get请求如果参数为空则清空
    // 去除多余的空格和空参数
    if (config.params) {
      Object.keys(config.params).forEach(item => {
        if (typeof config.params[item] === "string") {
          config.params[item] = config.params[item].trim();
        }
        if (config.params[item] === "") {
          delete config.params[item];
          return;
        }
        if (
          Object.prototype.toString.call(config.params[item]) ===
            "[object Object]" &&
          Object.keys(config.params[item]).length === 0
        ) {
          delete config.params[item];
          return;
        }
        if (
          Object.prototype.toString.call(config.params[item]) ===
            "[object Array]" &&
          config.params[item].length === 0
        ) {
          delete config.params[item];
        }
      });
    }
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
    let { msg } = response.data;
    const { success, state } = response.data;
    if ((!success && success !== undefined) || state === -1) {
      if (state === -1) {
        msg = "用户未登陆";
      }
      Message({
        message: msg,
        type: "error",
        duration: 5 * 1000
      });
    }
    return response.data || response;
  },
  error => {
    console.log(`err${error}`); // for debug
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

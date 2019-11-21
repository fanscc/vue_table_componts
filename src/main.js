import Vue from "vue";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import "@/styles/index.scss";
import "normalize.css/normalize.css";
import App from "./App.vue";
import router from "./router/index";
import store from "./store";
import * as utils from "@/utils/tool";
import "./permission";

// 由于edge浏览器不兼容promise的finally，故导入promise的依赖包
require("promise.prototype.finally").shim(); // permission control

Vue.prototype.$utils = utils;
Vue.use(ElementUI, {
  size: "mini"
});

import "@/utils/directive";
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");

import Vue from "vue";
import qs from "qs";
import store from "@/store";

// 导出按钮功能
Vue.directive("export", {
  inserted() {},
  update(el, binding) {
    // dom加载完再判断
    let times = null;
    if (!times) {
      el.onclick = function() {
        let iconDom = document.createElement("i");
        el.insertBefore(iconDom, el.querySelector("span"));
        let text = el.children[1].innerHTML;
        el.children[0].className = "el-icon-loading";
        el.setAttribute("disabled", true);
        el.children[1].innerHTML = "导出中...";
        // 时间参数转换：数组转字符串
        var params = Object.assign({}, binding.value.paramsObj); //深度克隆
        let url = "";
        if (process.env.NODE_ENV === "development") {
          url = `/Api/${binding.value.path}?${qs.stringify(params)}`;
        } else {
          url = `${binding.value.path}?${qs.stringify(params)}`;
        }
        location.href = url;
        times = setTimeout(() => {
          el.removeChild(el.children[0]);
          el.removeAttribute("disabled");
          // 判断展示的文字，默认是“导出”
          el.children[0].innerHTML = binding.value.valueName
            ? binding.value.valueName
            : text;
          clearTimeout(times);
          times = null;
        }, 2000);
      };
    }
  }
});

// 按钮权限控制
/**
 * 使用方法 v-permission='{page: jiaoyi, roles:"add"}'
 */
Vue.directive("permission", {
  update(el, binding) {
    const { value } = binding;
    const roles = store.getters && store.getters.roles;
    if (value) {
      const permissionRoles = value.roles;
      let hasPermission;
      if (!roles[value.page]) {
        hasPermission = false;
        // hasPermission = true; // 为了测试先改成true
      } else {
        hasPermission = roles[value.page].includes(permissionRoles);
      }
      if (!hasPermission) {
        el.parentNode && el.parentNode.removeChild(el);
      }
    }
  }
});

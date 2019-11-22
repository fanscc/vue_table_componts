import store from "@/store";
import router from "@/router";

// 做导出的时候吧参数改成路径参数
export function urlQuery(objs = {}) {
  let str = "";
  for (let i in objs) {
    if (objs[i] || objs[i] === 0) {
      str += `${i} = ${objs[i]}&`;
    }
  }
  str = str.substring(0, str.length - 1);
  return str;
}

/**
 * @param {Array} value
 * @param {String} page 表示那页
 * @returns {Boolean}
 * @example see @/views/auth/directive.vue
 */
export function checkPermission(value, page) {
  if (value && value instanceof Array && value.length > 0) {
    try {
      const roles = store.getters && store.getters.roles;
      const permissionRoles = value;
      const hasPermission = roles[page].some(role => {
        return permissionRoles.includes(role);
      });

      if (!hasPermission) {
        return false;
      }
      return true;
    } catch (error) {
      return true;
    }
  } else {
    return true;
  }
}

/**
 * @param {Object} view {path:''} 需要删除的路径
 * @param {Object} toPath {path: '} 需要跳转的路径
 */
export function closeTag(view, toPath) {
  let deleview = view || { path: `${router.history.current.path}` };
  store.dispatch("delVisitedViews", deleview).then(() => {
    if (toPath) {
      router.push(toPath.path);
    }
  });
}

export function permission(value) {
  const roles = store.getters && store.getters.roles;
  if (value.roles && value.page) {
    const permissionRoles = value.roles;
    let hasPermission;
    if (!roles[value.page]) {
      hasPermission = false;
    } else {
      hasPermission = roles[value.page].includes(permissionRoles);
    }
    return hasPermission;
  } else {
    return true;
  }
}

// 封装深度克隆
export function deepClone(origin, target) {
  // eslint-disable-next-line
  var target = target || {}, //设置target的默认值，不传值默认为空对象
    toStr = Object.prototype.toString, // 原型链方法：判断数值类型
    arrStr = "[object Array]";
  for (const prop in origin) {
    if (origin.hasOwnProperty(prop)) {
      // 判断对象下面是否有属性，没有属性的即为原始值
      if (origin[prop] !== "null" && typeof origin[prop] === "object") {
        // 判断需要被克隆的对象的属性是否为原始值
        target[prop] = toStr.call(origin[prop]) === arrStr ? [] : {}; // 不是原始值，将其转为数组或对象
        deepClone(origin[prop], target[prop]); // 如果不是原始值，继续调用自身，判断该属性的子属性是否为原始值
      } else {
        if (typeof origin[prop] === "string") {
          origin[prop] = origin[prop].trim();
        }
        if (origin[prop] !== "") {
          target[prop] = origin[prop]; // 如果是原始值的话，将其复制给克隆对象
        }
      }
    }
  }
  return target;
}

/**
 * 从一推的对象中找出找出自己需要的值
 * @params {Object} obj需要的值
 * @params {Object} findobj从那个对像中找的
 */
export function objFind(obj, findobj) {
  if (!_.isObject(obj) || !_.isObject(findobj)) return;
  Object.keys(obj).forEach(k => {
    obj[k] = findobj[k] || obj[k];
  });
}

// 将金额转换成千分符
export function coverMillimeter(amount) {
  if (parseFloat(amount) === 0) return parseFloat(amount).toFixed(2);
  if (!amount) return;
  return parseFloat(amount)
    .toFixed(2)
    .toString()
    .replace(/(\d)(?=(\d{3})+\.)/g, "$1,");
}

// post导出
/**
 *
 * @param {*} value
 * {
 *  el: '点击元素',
 *  path: '导出的url',
 *  paramsObj: '参数',
 *  name: '导出excel的名字'
 * }
 */
export function exportData(value) {
  const el = value.el;
  if (el.children.length !== 2) {
    const iconDom = document.createElement("i");
    el.insertBefore(iconDom, el.querySelector("span"));
  }
  const text = el.children[1].innerHTML;
  el.children[0].className = "el-icon-loading";
  el.setAttribute("disabled", true);
  el.children[1].innerHTML = "导出中...";
  axios({
    method: "post",
    url: value.path,
    data: value.paramsObj,
    responseType: "blob"
  })
    .then(res => {
      const data = res.data;
      if (!data) {
        return;
      }
      const url = window.URL.createObjectURL(new Blob([data]));
      const link = document.createElement("a");
      link.style.display = "none";
      link.href = url;
      link.setAttribute("download", `${value.name}.xls`);
      document.body.appendChild(link);
      link.click();
      link.remove();
      setTimeout(() => {
        el.children[0].className = "";
        el.removeAttribute("disabled");
        // 判断展示的文字，默认是“导出”
        el.children[1].innerHTML = value.valueName ? value.valueName : text;
      }, 2000);
    })
    .catch(err => {
      console.log("err", err);
    });
}

/**
 * 判断是否为空
 * @param {*} val
 */
export function validatenull(val) {
  if (typeof val === "boolean") {
    return false;
  }
  if (val instanceof Array) {
    if (val.length === 0) return true;
  } else if (val instanceof Object) {
    if (JSON.stringify(val) === "{}") return true;
  } else {
    if (val === null || val === "undefined" || val === undefined || val === "")
      return true;
    return false;
  }
  return false;
}

/**
 * 错误捕获的方法,使用方式errorCaptured(UserService.getAllUser)(getAllUser函数需要传递的参数)
 * @param func
 */
export const errorCaptured = func => {
  return new Proxy(func, {
    async apply(target, thisBinding, args) {
      try {
        return await target.apply(thisBinding, args);
      } catch (e) {
        console.error("error", e);
      }
    }
  });
};

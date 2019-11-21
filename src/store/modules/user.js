import { login, logout, getInfo } from "@/api/login";
import { getToken, setToken, removeToken } from "@/utils/auth";

const user = {
  state: {
    token: getToken(),
    roles: [],
    user: {},
    loadMenus: false
  },

  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token;
    },
    SET_USER: (state, user) => {
      state.user = user;
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles;
    },
    SET_LOAD_MENUS: (state, loadMenus) => {
      state.loadMenus = loadMenus;
    }
  },

  actions: {
    // 登录
    Login({ commit }, userInfo) {
      const username = userInfo.username.trim();
      const params = {
        username: username,
        password: userInfo.password
      };
      return new Promise((resolve, reject) => {
        login(params)
          .then(res => {
            setToken(res.model.token);
            commit("SET_TOKEN", res.model.token);
            setUserInfo(res.model.user, commit);
            commit("SET_LOAD_MENUS", true);
            resolve();
          })
          .catch(error => {
            reject(error);
          });
      });
    },

    // 获取用户信息
    GetInfo({ commit }) {
      return new Promise((resolve, reject) => {
        getInfo()
          .then(res => {
            setUserInfo(res.model.user, commit);
            resolve(res);
          })
          .catch(error => {
            reject(error);
          });
      });
    },

    // 登出
    LogOut({ commit }) {
      return new Promise((resolve, reject) => {
        logout()
          .then(res => {
            commit("SET_TOKEN", "");
            commit("SET_ROLES", []);
            resolve(res);
          })
          .catch(error => {
            reject(error);
          });
      });
    },

    // 前端 登出
    FedLogOut({ commit }) {
      return new Promise(resolve => {
        commit("SET_TOKEN", "");
        removeToken();
        resolve();
      });
    },
    // 动态修改权限
    ChangeRoles({ commit }, role) {
      return new Promise(resolve => {
        getInfo(role).then(response => {
          const data = response;
          commit("SET_ROLES", data.roles);
          resolve();
        });
      });
    },
    updateLoadMenus({ commit }) {
      return new Promise(() => {
        commit("SET_LOAD_MENUS", false);
      });
    }
  }
};

export const setUserInfo = (res, commit) => {
  // 如果没有任何权限，则赋予一个默认的权限，避免请求死循环
  if (res.roles.length === 0) {
    commit("SET_ROLES", ["ROLE_SYSTEM_DEFAULT"]);
  } else {
    commit("SET_ROLES", res.roles);
  }
  commit("SET_USER", res);
};

export default user;

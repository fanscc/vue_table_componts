const tagsView = {
  state: {
    visitedViews: [],
    cachedViews: [],
    refresh: false // 用来控制页面是否需要刷新的
  },
  mutations: {
    REFRESH_CHECK: (state, Boole) => {
      state.refresh = Boole;
    },
    ADD_VISITED_VIEWS: (state, view) => {
      if (state.visitedViews.some(v => v.path === view.path)) return;
      state.visitedViews.push(
        Object.assign({}, view, {
          title: view.meta.title || "no-name"
        })
      );
      if (!view.meta.noCache) {
        state.cachedViews.push(view.name);
      }
    },
    DEL_VISITED_VIEWS: (state, view) => {
      for (const [i, v] of state.visitedViews.entries()) {
        if (v.path === view.path) {
          state.visitedViews.splice(i, 1);
          break;
        }
      }
    },
    DEL_CACHED_VIEW: (state, view) => {
      for (const i of state.cachedViews) {
        if (i === view.name) {
          const index = state.cachedViews.indexOf(i);
          state.cachedViews.splice(index, 1);
          break;
        }
      }
    },
    DEL_OTHERS_VISITED_VIEWS: (state, view) => {
      for (const [i, v] of state.visitedViews.entries()) {
        if (v.path === view.path) {
          state.visitedViews = state.visitedViews.slice(i, i + 1);
          break;
        }
      }
    },
    DEL_OTHERS_CACHED_VIEWS: (state, view) => {
      for (const i of state.cachedViews) {
        if (i === view.name) {
          const index = state.cachedViews.indexOf(i);
          state.cachedViews = state.cachedViews.slice(index, index + 1);
          break;
        }
      }
    },
    DEL_ALL_VISITED_VIEWS: state => {
      const affixTags = state.visitedViews.filter(tag => tag.meta.affix);
      state.visitedViews = affixTags;
    },
    DEL_ALL_CACHED_VIEWS: state => {
      state.cachedViews = [];
    },
    UPDATE_VISITED_VIEW: (state, view) => {
      for (let v of state.visitedViews) {
        if (v.path === view.path) {
          v = Object.assign(v, view);
          break;
        }
      }
    }
  },
  actions: {
    addVisitedViews({ commit }, view) {
      commit("ADD_VISITED_VIEWS", view);
    },
    delVisitedViews({ commit, state }, view) {
      return new Promise(resolve => {
        commit("DEL_VISITED_VIEWS", view);
        resolve([...state.visitedViews]);
      });
    },
    refresh_check({ commit }, Boole) {
      commit("REFRESH_CHECK", Boole);
    },
    delCachedView({ commit, state }, view) {
      return new Promise(resolve => {
        commit("DEL_CACHED_VIEW", view);
        resolve([...state.cachedViews]);
      });
    },
    delOthersViews({ dispatch, state }, view) {
      return new Promise(resolve => {
        dispatch("delOthersVisitedViews", view);
        dispatch("delOthersCachedViews", view);
        resolve({
          visitedViews: [...state.visitedViews],
          cachedViews: [...state.cachedViews]
        });
      });
    },
    delOthersVisitedViews({ commit, state }, view) {
      return new Promise(resolve => {
        commit("DEL_OTHERS_VISITED_VIEWS", view);
        resolve([...state.visitedViews]);
      });
    },
    delOthersCachedViews({ commit, state }, view) {
      return new Promise(resolve => {
        commit("DEL_OTHERS_CACHED_VIEWS", view);
        resolve([...state.cachedViews]);
      });
    },
    delAllViews({ dispatch, state }, view) {
      return new Promise(resolve => {
        dispatch("delAllVisitedViews", view);
        dispatch("delAllCachedViews", view);
        resolve({
          visitedViews: [...state.visitedViews],
          cachedViews: [...state.cachedViews]
        });
      });
    },
    delAllVisitedViews({ commit, state }) {
      return new Promise(resolve => {
        commit("DEL_ALL_VISITED_VIEWS");
        resolve([...state.visitedViews]);
      });
    },
    delAllCachedViews({ commit, state }) {
      return new Promise(resolve => {
        commit("DEL_ALL_CACHED_VIEWS");
        resolve([...state.cachedViews]);
      });
    },
    updateVisitedView({ commit }, view) {
      commit("UPDATE_VISITED_VIEW", view);
    }
  }
};

export default tagsView;

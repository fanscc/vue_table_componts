const getters = {
  language: state => state.app.language,
  sidebar: state => state.app.sidebar,
  visitedViews: state => state.tagsView.visitedViews,
  cachedViews: state => state.tagsView.cachedViews,
  permission_routers: state => state.permission.routers,
  token: state => state.user.token,
  user: state => state.user.user,
  roles: state => state.user.roles,
  isLock: state => state.user.isLock,
  lockPasswd: state => state.user.lockPasswd,
  loadMenus: state => state.user.loadMenus,
  browserHeaderTitle: state => state.user.browserHeaderTitle,
  routers: state => state.permission.routers,
  addRouters: state => state.permission.addRouters,
  refresh: state => state.tagsView.refresh
};
export default getters;

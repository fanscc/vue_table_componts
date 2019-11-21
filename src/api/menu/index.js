import request from "@/utils/http";

// 获取所有的菜单树
export function getMenusTree() {
  return request({
    url: "/api/menus/tree",
    method: "get"
  });
}

export function buildMenus() {
  return request({
    url: "/api/menus/build",
    method: "get"
  });
}

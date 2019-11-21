import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

import Layout from "../components/layout/Layout";
/* eslint-disable */
export const constantRouterMap = [
  {
    path: "/404",
    component: () => import("@/views/errorPage/404"),
    hidden: true
  },
  {
    path: "/401",
    component: () => import("@/views/errorPage/401"),
    hidden: true
  },
  {
    path: "/",
    redirect: "/dashboard"
  },
  {
    path: "/login",
    component: () => import("@/views/login"),
    name: "login",
    hidden: true
  },
  {
    path: "/redirect",
    component: Layout,
    hidden: true,
    children: [
      {
        path: "/redirect/:path*",
        component: () => import("@/views/redirect/index")
      }
    ]
  },
  {
    path: "/dashboard",
    component: Layout,
    redirect: "/dashboard/dashboard",
    meta: { title: "首页", icon: "dashboard" },
    children: [
      {
        path: "dashboard",
        name: "dashboard",
        component: () => import("@/views/dashboard/dashboard"),
        meta: { title: "首页", icon: "iconshouye", noCache: true, affix: true }
      }
    ]
  }
];
export const asyncRouterMap = [];

export default new Router({
  // mode: 'history', //后端支持可开
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
});

import Vue from "vue";
import VueRouter from "vue-router";
import test from "@/views/test/index.vue";
import edit from "@/views/test/indexDetail.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "test",
    component: test
  },
  {
    path: "/edit",
    name: "edit",
    component: edit
  }
];

const router = new VueRouter({
  routes
});

export default router;

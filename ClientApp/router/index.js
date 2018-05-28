import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

import Home from "../pages/Home.vue";
import Todos from "../pages/Todos.vue";

const router = new VueRouter({
  mode: "history",
  routes: [{ path: "/", component: Home }, { path: "/todos", component: Todos }]
});

export default router;

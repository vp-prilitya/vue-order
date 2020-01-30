import Vue from "vue";
import VueRouter from "vue-router";
import Order from "../views/Order.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "order",
    component: Order
  },
  {
    path: "/create",
    name: "create",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/Create.vue")
  },
  {
    path: "/order/:orderId/update",
    name: "update",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/Update.vue"),
    props : true
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;

import { createRouter, createWebHistory } from "vue-router";
import HomePage from "@/views/HomePage.vue";
import Login from "@/views/LogIn.vue";
import AboutPage from "@/views/AboutPage.vue";

const routes = [
  { path: "/", name: "Home", component: HomePage },
  { path: "/about", name: "About", component: AboutPage },
  { path: "/login", name: "Login", component: Login },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;

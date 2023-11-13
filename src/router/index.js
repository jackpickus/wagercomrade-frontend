import { createRouter, createWebHistory } from "vue-router";
import HomePage from "@/views/HomePage.vue";
import Login from "@/views/LogIn.vue";
import AboutPage from "@/views/AboutPage.vue";
import CalculatorPage from "@/views/CalculatorPage.vue";

const routes = [
  { path: "/", name: "Home", component: HomePage },
  { path: "/about", name: "About", component: AboutPage },
  { path: "/login", name: "Login", component: Login },
  { path: "/calculator", name: "Calculator", component: CalculatorPage },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;

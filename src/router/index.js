import { createRouter, createWebHistory } from "vue-router";
import HomePage from "@/views/HomePage.vue";
import Login from "@/views/LogIn.vue";
import AboutPage from "@/views/AboutPage.vue";
import CalculatorPage from "@/views/CalculatorPage.vue";
import WagerPost from "@/views/WagerPost.vue";
import EditWagerPost from "@/views/EditWagerPost.vue";
import RegisterPage from "@/views/RegisterPage.vue";

const routes = [
  { path: "/", name: "Home", component: HomePage },
  { path: "/about", name: "About", component: AboutPage },
  { path: "/login", name: "Login", component: Login },
  { path: "/calculator", name: "Calculator", component: CalculatorPage },
  { path: "/wager/:betId", name: "Wager", component: WagerPost },
  { path: "/wager/:betId/edit", name: "EditWager", component: EditWagerPost },
  { path: "/register", name: "Register", component: RegisterPage },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;

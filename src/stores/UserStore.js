import { defineStore } from "pinia";

const URL = "http://localhost:8080/api/v1/registration/";
export const useUserStore = defineStore("UserStore", {
  state: () => ({
    user: null,
  }),

  actions: {
    async logIn(username, password) {
      const res = await fetch(URL + "authenticate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });
      const user = await res.json();
      this.user = user;
    },
    async register(username, email, password, passwordMatch) {
      const res = await fetch(URL + "register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, email, password, passwordMatch }),
      });
      const user = await res.json();
      this.user = user;
    },
  },
});

import { defineStore } from "pinia";

export const useUserStore = defineStore("UserStore", {
  state: () => ({
    user: null,
  }),

  actions: {
    async logIn(username, password) {
      const res = await fetch(
        "http://localhost:8080/api/v1/registration/authenticate",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ username, password }),
        }
      );
      const user = await res.json();
      this.user = user;
    },
    async signUp(username, email, password, passwordMatch) {
      const res = await fetch(
        "http://localhost:8080/api/v1/registration/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ username, email, password, passwordMatch }),
        }
      );
      const user = await res.json();
      this.user = user;
    },
  },
});

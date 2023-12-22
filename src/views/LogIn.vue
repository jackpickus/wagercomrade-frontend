<script setup>
import { ref } from "vue";
import { useUserStore } from "../stores/UserStore";

const username = ref("");
const password = ref("");

const store = useUserStore();

store.logIn(username.value, password.value);
</script>
<template>
  <div class="text-center">
    <h1>Login</h1>
    <form>
      <div class="flex flex-col mb-4">
        <label class="uppercase"
          >Username
          <input
            v-model="username"
            class="border-2 rounded-xl border-zinc-500 px-2 focus:border-emerald-600 focus:outline-none"
            required
          />
        </label>
      </div>
      <div class="flex flex-col mb-6">
        <label class="uppercase">
          Password
          <input
            v-model="password"
            type="password"
            required
            class="border-2 rounded-xl border-zinc-500 px-2 focus:border-emerald-600 focus:outline-none"
          />
        </label>
      </div>
      <button
        type="submit"
        @click="store.logIn"
        class="mx-auto uppercase block md:border-2 rounded-lg m-2 p-2 text-white bg-green-600 hover:bg-violet-600"
      >
        Login
      </button>
    </form>
  </div>
</template>

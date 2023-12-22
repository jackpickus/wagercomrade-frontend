<script setup>
import { ref } from "vue";
import { useUserStore } from "../stores/UserStore";

const username = ref("");
const email = ref("");
const password = ref("");
const passwordMatch = ref("");

const store = useUserStore();

store.register(
  username.value,
  email.value,
  password.value,
  passwordMatch.value
);
</script>

<template>
  <div>
    <h1>Sign Up</h1>
    <form class="flex flex-col items-center px-5">
      <div class="flex flex-col mb-4 w-1/4">
        <label class="uppercase">Email </label>
        <input
          v-model="email"
          class="border-2 rounded-xl border-zinc-500 px-2 focus:border-emerald-600 focus:outline-none"
          required
          type="email"
        />
      </div>
      <div class="flex flex-col mb-4 w-1/4">
        <label class="uppercase">Username </label>
        <input
          v-model="username"
          class="border-2 rounded-xl border-zinc-500 px-2 focus:border-emerald-600 focus:outline-none"
          required
        />
      </div>
      <div class="flex flex-col mb-4 w-1/4">
        <label class="uppercase">Password </label>
        <input
          v-model="username"
          class="border-2 rounded-xl border-zinc-500 px-2 focus:border-emerald-600 focus:outline-none"
          required
        />
      </div>
      <div class="flex flex-col mb-6 w-1/4">
        <label class="uppercase"> Confirm Password </label>
        <input
          v-model="passwordMatch"
          type="password"
          class="border-2 rounded-xl border-zinc-500 px-2 focus:border-emerald-600 focus:outline-none"
          required
        />
      </div>
      <button
        type="submit"
        @click="store.register"
        class="mx-auto uppercase block md:border-2 rounded-lg m-2 p-2 text-white bg-green-600 hover:bg-violet-600"
      >
        Submit
      </button>
    </form>
  </div>
</template>

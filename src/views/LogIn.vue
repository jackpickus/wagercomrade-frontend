<script setup>
import { ref } from "vue";

const username = ref("");
const password = ref("");
</script>
<template>
  <div class="text-center">
    <h1 class="font-bold text-4xl mb-4">Login</h1>
    <form>
      <div class="flex flex-col mb-4">
        <label class="uppercase"
          >Username
          <input
            v-model="username"
            class="border-2 rounded-xl border-zinc-500 px-2 focus:border-emerald-600 focus:outline-none"
          />
        </label>
      </div>
      <div class="flex flex-col mb-6">
        <label class="uppercase">
          Password
          <input
            v-model="password"
            type="password"
            class="border-2 rounded-xl border-zinc-500 px-2 focus:border-emerald-600 focus:outline-none"
          />
        </label>
      </div>
      <button
        type="submit"
        class="mx-auto uppercase block md:border-2 rounded-lg m-2 p-2 text-white bg-green-600 hover:bg-violet-600"
      >
        Login
      </button>
    </form>
  </div>
</template>

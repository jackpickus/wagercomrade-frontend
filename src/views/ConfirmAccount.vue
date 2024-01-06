<script setup>
import { ref } from "vue";

const confirmAcctCode = ref("");
</script>

<template>
  <div>
    <h1>Confirm Account</h1>
    <p class="text-center pt-2 pb-5">
      A code has been sent to the email used to sign up. <br />
      Please enter the code below. It will expire in
      <span class="font-semibold">15 minutes.</span>
    </p>
    <form class="flex flex-col items-center px-5">
      <div class="flex flex-col mb-4 w-1/6">
        <label class="uppercase">SignUp Code</label>
        <input
          v-model="confirmAcctCode"
          required
          class="border-2 rounded-xl border-zinc-500 px-2 focus:border-emerald-600 focus:outline-none"
        />
      </div>
    </form>
  </div>
</template>

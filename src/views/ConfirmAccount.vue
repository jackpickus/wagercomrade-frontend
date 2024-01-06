<script setup>
import { ref } from "vue";
const API_URL = "http://localhost:8080/api/v1/register/confirm?token=";

const confirmAcctCode = ref("");

function sendConfirmation() {
  fetch(API_URL + confirmAcctCode.value, {
    method: "GET",
    headers: {
      "Content-Type": "application/json;charset=uft-8",
    },
  })
    .then((response) => {
      response.json();
      console.log("success confirming sign up");
    })
    .catch((error) => {
      console.log("Error confirming token: " + confirmAcctCode.value, error);
    });
}
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
      <button
        type="submit"
        @click="sendConfirmation"
        class="mx-auto uppercase block md:border-2 rounded-lg m-2 p-2 text-white bg-green-600 hover:bg-violet-600"
      >
        Submit
      </button>
    </form>
  </div>
</template>

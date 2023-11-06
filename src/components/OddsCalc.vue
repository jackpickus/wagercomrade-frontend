<script>
import FormMath from "./FormMath.vue";
import BetForm from "./BetForm.vue";

export default {
  components: { FormMath, BetForm },
  data() {
    return {
      amountWagered: true,
      buttonText: "Wager",
      buttonToggleId: "toggleId",
    };
  },
  methods: {
    toggle() {
      this.amountWagered = !this.amountWagered;
      this.buttonText = this.amountWagered ? "Wager" : "Desired Winnings";
    },
  },
};
</script>

<template>
  <div class="calculator">
    <div class="items-center">
      <h1 class="text-3xl font-bold underline text-center">Odds Calculator</h1>
      <div class="flex items-center justify-center mx-1 my-1 px-1 py-1">
        <p>Toggle button to switch between wager and amount you want to win</p>
        <button
          @click="toggle"
          type="button"
          class="w-36 rounded-full text-white m-3 bg-green-600 hover:bg-violet-600"
        >
          {{ buttonText }}
        </button>
      </div>
    </div>
    <FormMath :typeOfCalc="this.amountWagered" />
    <BetForm />
  </div>
</template>

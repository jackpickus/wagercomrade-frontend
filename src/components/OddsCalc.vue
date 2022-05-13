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
    <h1>Odds Calculator</h1>
    <div class="flex-container">
      <p>Toggle button to switch between wager and amount you want to win</p>
      <button @click="toggle" :id="buttonToggleId" type="button">
        {{ buttonText }}
      </button>
    </div>
    <FormMath :typeOfCalc="this.amountWagered" />
    <BetForm />
  </div>
</template>

<style scoped>
.flex-container {
  display: flex;
  margin: 5px;
  padding: 5px;
}

#toggleId {
  margin: 15px;
  background-color: green;
  color: ivory;
}

#toggleId:hover {
  background-color: blueviolet;
}
</style>

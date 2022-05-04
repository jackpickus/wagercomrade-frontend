<script>
export default {
  props: {
    typeOfCalc: Boolean,
  },
  data() {
    return {
      wagerTooSmall: true,
      money: 0,
      odds: 0,
      potentialWinnings: 0,
      totalPayout: 0,
      validInput: false,
    };
  },
  methods: {
    calculatePayout() {
      let amount = 0;

      if (this.money >= 0.1 && (this.odds < -100 || this.odds >= 100)) {
        this.validInput = true;
      } else {
        this.validInput = false;
      }

      if (this.odds >= 100) {
        // wager was on underdog
        if (this.typeOfCalc) {
          // true when the user has selected "Wager"
          amount = this.money * (this.odds / 100);
        } else {
          // else they chose amount of money they want to win
          amount = this.money / (this.odds / 100);
        }
      } else {
        // wager was negative odds, chose favorite
        if (this.typeOfCalc) {
          // true when the user has selected "Wager"
          amount = this.money * (100 / (this.odds * -1));
        } else {
          amount = this.money * ((-1 * this.odds) / 100);
        }
      }
      let roundedAmount = Math.round(amount * 100) / 100;
      this.potentialWinnings = roundedAmount;

      let moneyToFloat = parseFloat(this.money);
      let total = roundedAmount + moneyToFloat;
      let roundedTotal = Math.round(total * 100) / 100;
      this.totalPayout = roundedTotal;
    },
  },
};
</script>

<template>
  <div>
    <form @submit.prevent="">
      <label htmlFor="money">
        Money:
        <input v-model="money" />
      </label>
      <label htmlFor="odds">
        Odds:
        <input v-model="odds" type="number" />
      </label>
      <button @click="calculatePayout">Run It</button>
    </form>
    <div>
      <p v-if="money < 0.1" class="inputError">
        Wager must be 10 cents or more
      </p>
      <p v-if="odds > -100 && odds < 100" class="inputError">
        Odds must be less than -100 or greater than 99
      </p>
    </div>
    <p v-if="potentialWinnings && validInput">
      The Difference: ${{ potentialWinnings }}
    </p>
    <p v-else>Please enter valid numbers</p>
    <p v-if="totalPayout && validInput">Total Payout: ${{ totalPayout }}</p>
  </div>
</template>

<style scoped>
.inputError {
  color: red;
}
</style>

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
    calculatePayout(odds) {
      let amount = 0;
      let myOdds = odds;

      if (this.money >= 0.1 && (myOdds < -100 || myOdds >= 100)) {
        this.validInput = true;
      } else {
        this.validInput = false;
      }

      if (myOdds >= 100) {
        // wager was on underdog
        if (this.typeOfCalc) {
          // true when the user has selected "Wager"
          amount = this.money * (myOdds / 100);
        } else {
          // else they chose amount of money they want to win
          amount = this.money / (myOdds / 100);
        }
      } else {
        // wager was negative odds, chose favorite
        if (this.typeOfCalc) {
          // true when the user has selected "Wager"
          amount = this.money * (100 / (myOdds * -1));
        } else {
          amount = this.money * ((-1 * myOdds) / 100);
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
  <div
    class="border-zinc-500 md:border-2 rounded-md w-2/4 px-2 py-2 inset-x-0 mx-auto"
  >
    <form @submit.prevent="" class="flex justify-center mb-4 mx-0">
      <label htmlFor="money" class="mr-6 mb-0">
        Money:
        <input
          v-model="money"
          class="border-2 rounded-xl border-zinc-500 px-2 focus:border-emerald-600 focus:outline-none"
        />
      </label>
      <label htmlFor="odds" class="mr-1 ml-2 mb-0">
        Odds:
        <input
          v-model="odds"
          type="number"
          class="border-2 rounded-xl border-zinc-500 px-2 focus:border-emerald-600 focus:outline-none"
        />
      </label>
      <button
        @click="calculatePayout(this.odds)"
        class="border-solid border-2 rounded-lg border-violet-600 hover:border-dotted ml-4 px-4 pb-0 focus:border-emerald-600"
      >
        Run It
      </button>
    </form>
    <div class="text-center">
      <p v-if="money < 0.1" class="text-red-600 font-semibold">
        Wager must be 10 cents or more
      </p>
      <p v-if="odds > -100 && odds < 100" class="text-red-600 font-semibold">
        Odds must be less than -100 or greater than 99
      </p>
      <p v-if="potentialWinnings && validInput">
        The Difference: ${{ potentialWinnings }}
      </p>
      <p v-else>Please enter valid numbers</p>
      <p v-if="totalPayout && validInput">Total Payout: ${{ totalPayout }}</p>
    </div>
  </div>
</template>

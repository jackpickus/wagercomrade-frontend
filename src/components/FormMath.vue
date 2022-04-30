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
    };
  },
  methods: {
    calculatePayout() {
      let amount = 0;
      if (this.odds >= 100) {
        // wager was on underdog
        if (this.typeOfCalc) {
          amount = this.money * (this.odds / 100);
        } else {
          amount = this.money / (this.odds / 100);
        }
      } else {
        // wager was negative odds, chose favorite
        if (this.typeOfCalc) {
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
        <input v-model="money" type="number" />
      </label>
      <label htmlFor="odds">
        Odds:
        <input v-model="odds" type="number" />
      </label>
      <button @click="calculatePayout">Run It</button>
    </form>
    <div>
      <p v-if="money < 0.1">Wager must be 10 cents or more</p>
      <p v-if="odds > -100 && odds < 100">
        Odds must be less than -100 or greater than 99
      </p>
    </div>
    <p>Potential Winnings: {{ potentialWinnings }}</p>
    <p>Total Payout: {{ totalPayout }}</p>
  </div>
</template>

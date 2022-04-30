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

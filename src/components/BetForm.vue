<script>
export default {
  data() {
    return {
      newBet: {
        theBet: "",
        theOdds: 0,
        units: 0,
        status: "pending",
        date: new Date(),
      },
    };
  },
  methods: {
    placeBet() {
      console.log(this.newBet);
    },
  },
};
</script>

<template>
  <h1>My Wager Tracker</h1>
  <div>
    <form @submit.prevent="">
      <label htmlFor="theBet">
        The Bet:
        <input
          v-model="newBet.theBet"
          type="text"
          placeholder="e.g. Bulls -5"
        />
      </label>
      <label htmlFor="theOdds">
        The Odds:
        <input v-model="newBet.theOdds" type="number" placeholder="-110" />
      </label>
      <label htmlFor="units">
        Units:
        <input v-model="newBet.units" type="number" placeholder="1" />
      </label>
      <button @click="placeBet">Place Bet</button>
    </form>
  </div>
</template>

<style scoped>
.pendingTextClass {
  color: orange;
}

.wonTextClass {
  color: green;
}

.lostTextClass {
  color: red;
}
</style>

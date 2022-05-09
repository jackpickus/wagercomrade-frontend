<script>
let id = 0;
export default {
  data() {
    return {
      lostClass: "lostTextClass",
      wonClass: "wonTextClass",
      pendingClass: "pendingTextClass",

      id: id,
      theBet: "",
      theOdds: "",
      units: 0,
      status: "Pending",

      // dummy data
      myBets: [
        {
          id: id++,
          theBet: "Suns -4.5",
          theOdds: -110,
          units: 2.2,
          status: "Won",
          date: new Date(),
        },
        {
          id: id++,
          theBet: "Bulls -5",
          theOdds: -110,
          units: 1.1,
          status: "Lost",
          date: new Date(),
        },
        {
          id: id++,
          theBet: "Cubs ML",
          theOdds: 200,
          units: 1,
          status: "Pending",
          date: new Date(),
        },
      ],
      styleObject: {
        color: "red",
      },
    };
  },
  methods: {
    placeBet() {
      if (this.units >= 0.1) {
        let newBet = {
          id: id++,
          theBet: this.theBet,
          theOdds: this.theOdds,
          units: this.units,
          status: this.status,
          date: new Date(),
        };
        this.myBets.push(newBet);
        this.theBet = "";
        this.theOdds = "";
        this.units = "";
      }
    },
    updateBetStatus(bet, win) {
      let index = this.myBets.indexOf(bet);
      if (index > -1) {
        if (win) {
          bet.status = "Won";
        } else {
          bet.status = "Lost";
        }
        console.log(bet.status);
      }
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
        <input v-model="theBet" type="text" placeholder="e.g. Bulls -5" />
      </label>
      <label htmlFor="theOdds">
        The Odds:
        <input v-model="theOdds" type="number" placeholder="-110" />
      </label>
      <label htmlFor="units">
        Units:
        <input v-model="units" type="number" placeholder="1" />
      </label>
      <button @click="placeBet">Place Bet</button>
    </form>
    <h3>My Bets</h3>
    <div>
      <ul>
        <li v-for="bet in myBets.slice().reverse()" :key="bet.id">
          {{ bet.theBet }} @ {{ bet.theOdds }} for {{ bet.units }} units
          <p v-if="bet.status == 'Lost'">
            Status:
            <span :class="lostClass">{{ bet.status }}</span>
          </p>
          <p v-if="bet.status == 'Won'">
            Status:
            <span :class="wonClass">{{ bet.status }}</span>
          </p>
          <div v-if="bet.status == 'Pending'">
            Status:
            <span :class="pendingClass">{{ bet.status }}</span>
            <p>
              <span :class="lostClass">CATION!</span> Once you change the status
              of the bet you cannot change it
            </p>
            Update Status:
            <button type="button" @click="updateBetStatus(bet, true)">
              Won?
            </button>
            <button type="button" @click="updateBetStatus(bet, false)">
              Lost?
            </button>
          </div>
        </li>
      </ul>
    </div>
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

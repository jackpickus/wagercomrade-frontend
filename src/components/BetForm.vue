<script>
let id = 0;
const Status = {
  WON: "Won",
  LOST: "Lost",
  PENDING: "Pending",
};
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
      status: Status.PENDING,

      // dummy data
      myBets: [
        {
          id: id++,
          theBet: "Suns -4.5",
          theOdds: -110,
          units: 2.2,
          status: Status.WON,
          date: new Date(),
          toWin: this.calculatePayout(2.2, -110),
        },
        {
          id: id++,
          theBet: "Bulls -5",
          theOdds: -110,
          units: 1.1,
          status: Status.LOST,
          date: new Date(),
          toWin: this.calculatePayout(1.1, -110),
        },
        {
          id: id++,
          theBet: "Cubs ML",
          theOdds: 200,
          units: 1,
          status: Status.PENDING,
          date: new Date(),
          toWin: this.calculatePayout(1, 200),
        },
      ],
      styleObject: {
        color: "red",
      },
    };
  },
  computed: {
    reversedBets() {
      return [...this.myBets].reverse();
    },
    calcTotalUnits() {
      let totalUnits = 0;
      for (let i = 0; i < this.myBets.length; i++) {
        let b = this.myBets[i];
        if (b.status == Status.WON) {
          totalUnits += b.toWin;
        } else if (b.status == Status.LOST) {
          totalUnits -= b.units;
        }
      }
      let roundedTotalUnits = Math.round(totalUnits * 100) / 100;
      return roundedTotalUnits;
    },
    calcTotalUnitsPending() {
      let pendingUnits = 0;
      for (let i = 0; i < this.myBets.length; i++) {
        let bet = this.myBets[i];
        if (bet.status == Status.PENDING) {
          pendingUnits += bet.units;
        }
      }
      return pendingUnits;
    },
  },
  methods: {
    calculatePayout(units, odds) {
      let myUnits = units;
      let myOdds = odds;
      let amount = 0;

      if (myOdds >= 100) {
        // wager was on underdog
        amount = myUnits * (myOdds / 100);
      } else {
        // wager was negative odds, chose favorite
        amount = myUnits * (100 / (myOdds * -1));
      }
      let roundedAmount = Math.round(amount * 100) / 100;
      let potentialWinnings = roundedAmount;
      return potentialWinnings;
    },
    placeBet() {
      if (this.units >= 0.1) {
        let newBet = {
          id: id++,
          theBet: this.theBet,
          theOdds: this.theOdds,
          units: this.units,
          status: this.status,
          date: new Date(),
          toWin: this.calculatePayout(this.units, this.theOdds),
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
    <div>
      <h3 v-if="calcTotalUnits > 0">
        Your Units: <span :class="wonClass">{{ calcTotalUnits }}</span>
      </h3>
      <h3 v-else-if="calcTotalUnits < 0">
        Your Units: <span :class="lostClass">{{ calcTotalUnits }}</span>
      </h3>
      <h3 v-else>Your Units: {{ calcTotalUnits }}</h3>
      <p>Units pending: {{ calcTotalUnitsPending }}</p>
    </div>
    <h3>My Bets</h3>
    <div>
      <ul>
        <li v-for="bet in reversedBets" :key="bet.id">
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

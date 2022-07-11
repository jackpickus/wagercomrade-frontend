<script>
import createNewBet from "../services/BetService";
import MyBet from "./MyBet.vue";
let id = 1;
const Status = {
  WON: "WON",
  LOST: "LOST",
  PENDING: "PENDING",
  VOID: "VOID",
};
export default {
  data() {
    return {
      lostClass: "lostTextClass",
      wonClass: "wonTextClass",

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
          timePlaced: new Date(),
          toWin: this.calculatePayout(2.2, -110),
        },
        {
          id: id++,
          theBet: "Bulls -5",
          theOdds: -110,
          units: 1.1,
          status: Status.LOST,
          timePlaced: new Date(),
          toWin: this.calculatePayout(1.1, -110),
        },
        {
          id: id++,
          theBet: "White Sox -1.5",
          theOdds: -110,
          units: 1.1,
          status: Status.VOID,
          timePlaced: new Date(),
          toWin: this.calculatePayout(1.1, -110),
        },
        {
          id: id++,
          theBet: "Cubs ML",
          theOdds: 200,
          units: 1,
          status: Status.PENDING,
          timePlaced: new Date(),
          toWin: this.calculatePayout(1, 200),
        },
      ],
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
          timePlaced: new Date(),
          toWin: this.calculatePayout(this.units, this.theOdds),
        };

        this.myBets.push(newBet);
        createNewBet(newBet);

        this.theBet = "";
        this.theOdds = "";
        this.units = "";
      }
    },
    updateBetStatus(bet, win) {
      let index = this.myBets.indexOf(bet);
      if (index > -1) {
        if (win) {
          bet.status = "WON";
        } else {
          bet.status = "LOST";
        }
        console.log(bet.status);
        updateBet(bet.id, bet.status);
      }
    },
    deleteBet(betId) {
      const index = this.myBets.indexOf(betId);
      console.log("This is the index: " + index);
      if (index > -1) {
        if (betId.status == "Pending") {
          this.calcTotalUnitsPending;
        } else {
          this.calcTotalUnits;
        }
        this.myBets.splice(index, 1);
        console.log("Successfully deleted item");
      }
    },
  },
  components: { MyBet },
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
          <MyBet
            :id="bet.id"
            :theBet="bet.theBet"
            :theOdds="bet.theOdds"
            :units="bet.units"
            :betStatus="bet.status"
            :timePlaced="bet.timePlaced"
            :toWin="bet.toWin"
          />
          <button type="button" @click="deleteBet(bet)">Delete Bet</button>
          <!-- TODO: Make PUT call to update bet status -->
          <div v-if="bet.status == 'PENDING'">
            Update Status:
            <button type="button" @click="updateBetStatus(bet, true)">
              Won?
            </button>
            <button type="button" @click="updateBetStatus(bet, false)">
              Lost?
            </button>
            <button type="button" @click="bet.status = 'Void'">Void?</button>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

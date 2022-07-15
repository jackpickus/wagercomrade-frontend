<script>
import { deleteBet, updateBet } from "../services/BetService";
import MyBet from "./MyBet.vue";
const API_URL = "http://localhost:8080/api/v1/wager";
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

      theBet: "",
      theOdds: "",
      units: 0,
      status: Status.PENDING,

      loadedData: null,
      myBets: [],
    };
  },
  created() {
    this.fetchData();
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
    async fetchData() {
      this.loadedData = await (await fetch(API_URL)).json();
      let x = 0;
      while (x < this.loadedData.length) {
        this.myBets.push(this.loadedData[x]);
        x++;
      }
    },
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
          theBet: this.theBet,
          theOdds: this.theOdds,
          units: this.units,
          status: this.status,
          timePlaced: new Date(),
          toWin: this.calculatePayout(this.units, this.theOdds),
        };

        fetch(API_URL, {
          method: "POST",
          headers: {
            "Content-Type": "application/json;charset=utf-8",
          },
          body: JSON.stringify(newBet),
        })
          .then((response) => response.json())
          .then((data) => {
            console.log("Success:", data);
            newBet.id = data.wagerIdNumber;
            this.myBets.push(newBet);
          })
          .catch((error) => {
            console.log("Error: on POST:", error);
          });

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
        deleteBet(betId.id);
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

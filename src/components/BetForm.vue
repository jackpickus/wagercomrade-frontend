<script>
import MyBet from "./MyBet.vue";
import { useUserStore } from "../stores/UserStore";
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

      statusCategory: "all",
    };
  },
  created() {
    this.fetchData();
  },
  computed: {
    reversedBets() {
      if (this.statusCategory != "all") {
        let statusBetArr = [];
        this.myBets.forEach((bet) => {
          if (bet.status == this.statusCategory.toUpperCase()) {
            statusBetArr.push(bet);
            console.log(bet.theBet);
            console.log(bet.status + "\n");
          }
        });
        return [...statusBetArr].reverse();
      }
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
      const store = useUserStore();
      const token = store.user.token;
      this.loadedData = await fetch(API_URL + "/wagerlist", {
        method: "GET",
        headers: {
          "Content-Type": "application/json;charset=utf-8",
          Authorization: "Bearer " + token,
        },
      });
      let x = 0;
      while (x < this.loadedData.length) {
        this.myBets.push(this.loadedData[x]);
        x++;
      }
      this.myBets.sort((a, b) => parseFloat(a.id) - parseFloat(b.id));
    },
    placeBet() {
      if (this.units >= 0.1) {
        let newBet = {
          theBet: this.theBet,
          theOdds: this.theOdds,
          units: this.units,
          status: this.status,
        };

        fetch(API_URL + "/new-wager", {
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
            newBet.timePlaced = data.betTimeStamp;
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
  },
  components: { MyBet },
};
</script>

<template>
  <h1>My Wager Tracker</h1>
  <div>
    <form
      @submit.prevent=""
      class="border-zinc-500 md:border-2 rounded-md w-2/4 p-2 inset-x-0 mx-auto"
    >
      <div class="flex justify-center mb-0 mx-0">
        <label htmlFor="theBet" class="p-2">
          The Bet
          <input
            v-model="theBet"
            type="text"
            placeholder="e.g. Bulls -5"
            required
            class="border-2 rounded-xl border-zinc-500 px-2 focus:border-emerald-600 focus:outline-none"
          />
        </label>
        <label htmlFor="theOdds" class="p-2">
          The Odds
          <input
            v-model="theOdds"
            type="number"
            placeholder="-110"
            required
            class="border-2 rounded-xl border-zinc-500 px-2 focus:border-emerald-600 focus:outline-none"
          />
        </label>
        <label htmlFor="units" class="p-2">
          Units
          <input
            v-model="units"
            type="number"
            placeholder="1"
            required
            class="border-2 rounded-xl border-zinc-500 px-2 focus:border-emerald-600 focus:outline-none"
          />
        </label>
      </div>
      <div class="flex justify-center">
        <button
          @click="placeBet"
          class="w-36 h-10 rounded-full text-white m-3 bg-green-600 hover:bg-violet-600 focus:outline-none focus:ring focus:ring-violet-300"
        >
          Place Bet
        </button>
      </div>
    </form>
    <h3 class="font-semibold text-2xl underline text-center pt-4">My Bets</h3>
    <div class="flex justify-center">
      <div class="px-1">
        <input
          type="radio"
          id="all"
          name="status-category"
          value="all"
          v-model="statusCategory"
          checked
        />
        <label for="all">All Bets</label>
      </div>
      <div class="px-1">
        <input
          type="radio"
          id="won"
          name="status-category"
          value="won"
          v-model="statusCategory"
        />
        <label for="won">Won</label>
      </div>
      <div class="px-1">
        <input
          type="radio"
          id="lost"
          name="status-category"
          value="lost"
          v-model="statusCategory"
        />
        <label for="lost">Lost</label>
      </div>
      <div class="px-1">
        <input
          type="radio"
          id="pending"
          name="status-category"
          value="pending"
          v-model="statusCategory"
        />
        <label for="pending">Pending</label>
      </div>
      <div class="px-1">
        <input
          type="radio"
          id="void"
          name="status-category"
          value="void"
          v-model="statusCategory"
        />
        <label for="void">Void</label>
      </div>
    </div>
    <div class="text-center p-2">
      <div class="inline-block text-left">
        <h6
          v-if="calcTotalUnits > 0"
          class="text-lg font-semibold text-emerald-600"
        >
          <!-- TODO REMOVE THE CLASSES wonClass and lostClass -->
          Units: <span :class="wonClass">{{ calcTotalUnits }}</span>
        </h6>
        <h6
          v-else-if="calcTotalUnits < 0"
          class="text-lg font-semibold text-red-600"
        >
          Units: <span :class="lostClass">{{ calcTotalUnits }}</span>
        </h6>
        <h6 v-else class="text-lg font-semibold">
          Units: {{ calcTotalUnits }}
        </h6>
        <p>Units Pending: {{ calcTotalUnitsPending }}</p>
      </div>
    </div>
    <div>
      <ul class="divide-y divide-zinc-500">
        <li v-for="bet in reversedBets" :key="bet.id">
          <router-link
            :to="`/wager/${bet.id}`"
            class="flex justify-center hover:bg-violet-200"
          >
            <MyBet
              :id="bet.id"
              :theBet="bet.theBet"
              :theOdds="bet.theOdds"
              :units="bet.units"
              :betStatus="bet.status"
              :timePlaced="bet.timePlaced"
              :toWin="bet.toWin"
              :category="bet.category"
            />
          </router-link>
        </li>
      </ul>
    </div>
  </div>
</template>

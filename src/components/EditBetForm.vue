<script>
import updateBet from "@/services/BetService.js";
const Status = {
  WON: "WON",
  LOST: "LOST",
  PENDING: "PENDING",
  VOID: "VOID",
};
export default {
  props: ["id", "theBet", "theOdds", "units", "betStatus"],
  data() {
    return {
      Status,
      editStatus: false,
      newBet: this.theBet,
      newOdds: this.theOdds,
      newUnits: this.units,
      newStatus: this.betStatus,
    };
  },
  methods: {
    changeBet() {
      let putBet = {
        theBet: this.newBet,
        theOdds: this.newOdds,
        units: this.newUnits,
        status: this.newStatus,
      };
      updateBet(this.id, putBet);
      document.location.href = "/";
    },
  },
};
</script>
<template>
  <div>
    <form @submit.prevent="">
      <label>
        Wager
        <input
          v-model="newBet"
          type="text"
          class="border-2 rounded-xl border-zinc-500 px-2 focus:border-emerald-600 focus:outline-none"
        />
      </label>
      <label>
        Odds
        <input
          v-model="newOdds"
          type="text"
          class="border-2 rounded-xl border-zinc-500 px-2 focus:border-emerald-600 focus:outline-none"
        />
      </label>
      <label>
        Units
        <input
          v-model="newUnits"
          type="number"
          step=".01"
          class="border-2 rounded-xl border-zinc-500 px-2 focus:border-emerald-600 focus:outline-none"
        />
      </label>
      <label for="status-select"> Status </label>

      <select
        name="status"
        id="status-select"
        v-model="newStatus"
        class="border-2 rounded-xl border-zinc-500 px-2 focus:border-emerald-600 focus:outline-none"
      >
        <option value="">--Please choose an option--</option>
        <option value="WON">{{ Status.WON }}</option>
        <option value="LOST">{{ Status.LOST }}</option>
        <option value="PENDING">{{ Status.PENDING }}</option>
        <option value="VOID">{{ Status.VOID }}</option>
      </select>
      <button
        class="md:border-2 rounded-lg m-2 p-2 text-white bg-green-600 hover:bg-violet-600"
        @submit="changeBet"
      >
        Submit
      </button>
    </form>
  </div>
</template>

<script>
const Status = {
  WON: "WON",
  LOST: "LOST",
  PENDING: "PENDING",
  VOID: "VOID",
};
export default {
  props: {
    id: Number,
    theBet: String,
    theOdds: Number,
    units: Number,
    betStatus: String,
  },
  data() {
    return {
      Status,
      editStatus: false,
      newWager: this.theBet,
      newOdds: this.theOdds,
      newUnits: this.units,
      newStatus: this.betStatus,
    };
  },
};
</script>
<template>
  <div>
    <form @submit.prevent="">
      <label>
        Wager
        <input v-model="newWager" type="text" />
      </label>
      <label>
        Odds
        <input v-model="newOdds" type="text" />
      </label>
      <label>
        Units
        <input v-model="newUnits" type="number" />
      </label>
      <label for="status-select"> Status </label>

      <select name="status" id="status-select">
        <option value="">--Please choose an option--</option>
        <option value="WON">{{ Status.WON }}</option>
        <option value="LOST">{{ Status.LOST }}</option>
        <option value="PENDING">{{ Status.PENDING }}</option>
        <option value="VOID">{{ Status.VOID }}</option>
      </select>
      <hr />
      <button
        class="md:border-2 rounded-lg m-2 p-2 text-white bg-green-600 hover:bg-violet-600"
      >
        Submit
      </button>
    </form>
  </div>
</template>

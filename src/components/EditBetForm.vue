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
    theUnits: Number,
    theStatus: String,
  },
  data() {
    return {
      Status,
      editStatus: false,
      newWager: "",
      newOdds: "",
      newUnits: 0,
      newStatus: "",
    };
  },
};
</script>
<template>
  <div>
    <form @submit.prevent="">
      <label>
        Wager
        <input v-model="newWager" type="text" value="{{ theBet }}" />
      </label>
      <label>
        Odds
        <input v-model="newOdds" type="text" value="{{ theOdds }}" />
      </label>
      <label>
        Units
        <input v-model="newUnits" type="number" value="{{ theUnits }}" />
      </label>
      <label for="status-select"> Status </label>
      <select name="status" v-model="newStatus" value="{{ theStatus }}">
        <!-- TODO - change value to the Status enum values -->
        <option value="PENDING">{{ Status.PENDING }}</option>
        <option value="WON">{{ Status.WON }}</option>
        <option value="LOST">{{ Status.LOST }}</option>
        <option value="VOID">{{ Status.VOID }}</option>
      </select>
      <button>Submit</button>
    </form>
  </div>
</template>

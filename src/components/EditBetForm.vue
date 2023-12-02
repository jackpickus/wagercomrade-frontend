<script>
export default {
  props: {
    id: Number,
    theBet: String,
    theOdds: Number,
    theUnits: Number,
    betStatus: String,
  },
  data() {
    return {
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
    <h1>Edit Bet</h1>
    <form @submit.prevent="">
      <label>
        <input v-model="newWager" />
      </label>
      <label>
        <input v-model="newOdds" />
      </label>
      <label>
        <input v-model="newUnits" />
      </label>
      <label>
        <input v-model="newStatus" />
      </label>
    </form>
  </div>
</template>

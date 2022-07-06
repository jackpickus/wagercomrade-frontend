<script>
export default {
  props: {
    id: Number,
    theBet: String,
    theOdds: Number,
    units: Number,
    betStatus: String,
    date: Date,
    toWin: Number,
  },
  data() {
    return {
      lostClass: "lostTextClass",
      wonClass: "wonTextClass",
      pendingClass: "pendingTextClass",
    };
  },
};
</script>

<template>
  <div>
    <p>
      {{ theBet }} @ {{ theOdds }} for
      <span v-if="units > 1 || units < 1">{{ units }} units</span>
      <span v-else>{{ units }} unit</span>
    </p>
    <p>Date Placed: {{ date }}</p>
    <p v-if="betStatus == 'Lost'">
      Status:
      <span :class="lostClass">{{ betStatus }} -{{ units }}U</span>
    </p>
    <p v-if="betStatus == 'Won'">
      Status:
      <span :class="wonClass">{{ betStatus }} +{{ toWin }}U</span>
    </p>
    <div v-if="betStatus == 'Pending'">
      <p v-if="toWin > 1 || toWin < 1">To Win: {{ toWin }} units</p>
      <p v-else>To Win: {{ toWin }} unit</p>
      Status:
      <span :class="pendingClass">{{ betStatus }}</span>
      <p>
        <span :class="lostClass">CATION!</span> Once you change the status of
        the bet you cannot change it
      </p>
    </div>
    <div v-else>Status: {{ betStatus }}</div>
  </div>
</template>

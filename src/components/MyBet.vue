<script>
import { format, parseISO } from "date-fns";
export default {
  props: {
    id: Number,
    theBet: String,
    theOdds: Number,
    units: Number,
    betStatus: String,
    timePlaced: String,
    toWin: Number,
  },
  data() {
    return {
      lostClass: "lostTextClass",
      wonClass: "wonTextClass",
      pendingClass: "pendingTextClass",
      format,
      parseISO,
    };
  },
  methods: {
    makeDate(betDate) {
      let myDate = new Date(betDate);
      return myDate;
    },
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
    <p>
      Date Placed: {{ format(parseISO(timePlaced), "MMM d, yyyy h:mm aa") }}
    </p>
    <p v-if="betStatus == 'LOST'">
      Status:
      <span :class="lostClass">{{ betStatus }} -{{ units }}U</span>
    </p>
    <p v-if="betStatus == 'WON'">
      Status:
      <span :class="wonClass">{{ betStatus }} +{{ toWin }}U</span>
    </p>
    <div v-if="betStatus == 'PENDING'">
      <p v-if="toWin > 1 || toWin < 1">To Win: {{ toWin }} units</p>
      <p v-else>To Win: {{ toWin }} unit</p>
      Status:
      <span :class="pendingClass">{{ betStatus }}</span>
      <p>
        <span :class="lostClass">CATION!</span> Once you change the status of
        the bet you cannot change it
      </p>
    </div>
    <div v-if="betStatus == 'VOID'">Status: {{ betStatus }}</div>
  </div>
</template>

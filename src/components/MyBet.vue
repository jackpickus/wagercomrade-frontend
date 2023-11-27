<script>
import { format, parseISO } from "date-fns";
import { getBet } from "../services/BetService";
const API_URL = "http://localhost:8080/api/v1/wager";
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
    // TODO MOVE THIS TO THE BET POST VUE PAGE IN "views"
    async getBet(betId) {
      this.loadedData = await (await fetch(API_URL + "/wager/" + betId)).json();
    }
  },
};
</script>

<template>
  <div class="w-1/3">
    <!-- create link to the wager post page, then get the data on the wager -->


    <div class="flex justify-between" @click="getBet(id)">
      <router-link :to="`/wager/${id}`">
        <span class="font-semibold">{{ theBet }}</span>
        <span v-if="theOdds > 0">&nbsp;+</span>
        <span v-else>&nbsp;</span>{{ theOdds }}
      </router-link>
      <p class="text-right pl-7">
        <span v-if="units > 1 || units < 1">{{ units }} units</span>
        <span v-else>{{ units }} unit</span>
      </p>
    </div>
    <div class="flex justify-between">
      <p v-if="betStatus == 'LOST'">
        <span class="text-red-600">{{ betStatus }} -{{ units }}U</span>
      </p>
      <p v-if="betStatus == 'WON'">
        <span class="text-emerald-600">{{ betStatus }} +{{ toWin }}U</span>
      </p>
      <div v-if="betStatus == 'PENDING'" class="text-amber-600">
        <!-- TODO DELETE TO WIN STUFF -->
        <!-- <p v-if="toWin > 1 || toWin < 1">To Win: {{ toWin }} units</p>
      <p v-else>To Win: {{ toWin }} unit</p> -->
        {{ betStatus }}
        <!-- <span :class="pendingClass">{{ betStatus }}</span>
        <p>
          <span :class="lostClass">CATION!</span> Once you change the status of
          the bet you cannot change it
        </p> -->
      </div>
      <div v-if="betStatus == 'VOID'">Status: {{ betStatus }}</div>
      <p class="text-right">
        {{ format(parseISO(timePlaced), "MMM d, yyyy h:mm aa") }}
      </p>
    </div>
  </div>
</template>

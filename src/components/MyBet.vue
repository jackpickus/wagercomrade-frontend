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
    category: String,
  },
  data() {
    return {
      lostClass: "lostTextClass",
      wonClass: "wonTextClass",
      pendingClass: "pendingTextClass",
      format,
      parseISO,
      betDateConvert: "",
    };
  },
  computed: {
    makeDateConversion() {
      const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
      const localDateTime = new Date(this.timePlaced).toISOString("en-US", {
        timeZone: timeZone,
      });
      return format(parseISO(localDateTime), "MMM d, yyyy h:mm aa");
    },
  },
};
</script>

<template>
  <div class="w-1/3 py-3">
    <!-- create link to the wager post page, then get the data on the wager -->
    <div class="flex justify-between">
      <p class="font-semibold">
        {{ theBet }}
        <span v-if="theOdds > 0">&nbsp;+</span>
        <span v-else>&nbsp;</span>{{ theOdds }}
      </p>
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
        {{ betStatus }}
      </div>
      <div v-if="betStatus == 'VOID'">{{ betStatus }}</div>
      <p class="text-right">
        {{ makeDateConversion }}
      </p>
    </div>
    <p class="block">Category: {{ category }}</p>
  </div>
</template>

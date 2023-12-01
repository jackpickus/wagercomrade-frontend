<script>
import { useRoute } from "vue-router";
import MyBet from "../components/MyBet.vue";
import deleteBet from "../services/BetService";

const API_URL = "http://localhost:8080/api/v1/wager/";

export default {
  created() {
    const route = useRoute();
    const theBetId = route.params.betId;
    this.getBet(theBetId);
  },
  data() {
    return {
      loadedData: [],
    };
  },
  methods: {
    async getBet(betId) {
      this.loadedData = await (await fetch(API_URL + betId)).json();
    },
    deleteWager(betId) {
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
  <div>
    <h2 class="text-center">Hello Wager #{{ $route.params.betId }}</h2>
    <div class="flex justify-center">
      <MyBet
        :id="this.loadedData.id"
        :theBet="this.loadedData.theBet"
        :theOdds="this.loadedData.theOdds"
        :units="this.loadedData.units"
        :betStatus="this.loadedData.status"
        :timePlaced="this.loadedData.timePlaced"
        :toWin="this.loadedData.toWin"
      />
    </div>

    <div class="p-2 flex justify-center">
      <button
        class="md:border-2 rounded-lg m-2 p-2 text-white bg-green-600 hover:bg-violet-600"
      >
        Edit
      </button>
      <button
        @click="deleteBet"
        class="md:border-2 rounded-md m-2 p-2 text-white bg-green-600 hover:bg-violet-600"
      >
        Delete
      </button>
    </div>
  </div>
</template>

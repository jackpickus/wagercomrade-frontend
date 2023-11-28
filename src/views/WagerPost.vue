<script>
import { useRoute } from "vue-router";
import MyBet from "../components/MyBet.vue";

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
  },
  components: { MyBet },
};
</script>

<template>
  <div>
    <h2>Hello Wager #{{ $route.params.betId }}</h2>

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
</template>

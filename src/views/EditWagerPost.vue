<script>
import { useRoute } from "vue-router";
import EditBetForm from "../components/EditBetForm.vue";

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
      console.log("Got the Bet?");
      console.log(this.loadedData.theBet);
      console.log(this.loadedData.theOdds);
      console.log(this.loadedData.units);
      console.log(this.loadedData.status);
    },
  },
  components: { EditBetForm },
};
</script>

<template>
  <div>
    <h2 class="text-center">Edit Wager #{{ $route.params.betId }}</h2>
    <div class="flex justify-center">
      <EditBetForm
        :id="this.loadedData.id"
        :theBet="this.loadedData.theBet"
        :theOdds="this.loadedData.theOdds"
        :units="this.loadedData.units"
        :betStatus="this.loadedData.status"
      />
    </div>
  </div>
</template>

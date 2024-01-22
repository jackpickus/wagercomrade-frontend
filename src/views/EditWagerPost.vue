<script>
import { useRoute } from "vue-router";
import EditBetForm from "../components/EditBetForm.vue";

const API_URL = "http://localhost:8080/api/v1/wager/";

export default {
  data() {
    return {
      loading: false,
      data: [],
    };
  },
  created() {
    const route = useRoute();
    const theBetId = route.params.betId;
    this.getBet(theBetId);
  },
  methods: {
    async getBet(betId) {
      this.loading = true;
      this.data = await (await fetch(API_URL + betId)).json();
      this.loading = false;
    },
  },
  components: { EditBetForm },
};
</script>

<template>
  <div>
    <h2 class="text-center">Edit Wager #{{ $route.params.betId }}</h2>
    <div class="flex justify-center">
      <template v-if="loading">
        <p>Loading...</p>
      </template>

      <template v-else>
        <EditBetForm
          :id="data.id"
          :theBet="data.theBet"
          :theOdds="data.theOdds"
          :units="data.units"
          :betStatus="data.status"
          :category="data.category"
        />
      </template>
    </div>
  </div>
</template>

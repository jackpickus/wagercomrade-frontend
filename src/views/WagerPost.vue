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
    deleteWager(betId) {
      let confirmDelete = confirm("Are you sure you want to delete wager?");
      if (confirmDelete) {
        console.log("The bet will be deleted: " + betId);
        const url = API_URL + betId;
        fetch(url, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json;charset=utf-8",
          },
        }).catch((error) => {
          console.log("Error on DELETE:", error);
        });
        document.location.href = "/";
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
        :category="this.loadedData.category"
      />
    </div>

    <div class="p-2 flex justify-center">
      <router-link :to="`/wager/${this.loadedData.id}/edit`">
        <button
          class="md:border-2 rounded-lg m-2 p-2 text-white bg-green-600 hover:bg-violet-600"
        >
          Edit
        </button>
      </router-link>
      <button
        @click="deleteWager(this.loadedData.id)"
        class="md:border-2 rounded-md m-2 p-2 text-white bg-green-600 hover:bg-violet-600"
      >
        Delete
      </button>
    </div>
  </div>
</template>

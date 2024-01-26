<script>
const Status = {
  WON: "WON",
  LOST: "LOST",
  PENDING: "PENDING",
  VOID: "VOID",
};
const Category = {
  NBA: "NBA",
  NFL: "NFL",
  MLB: "MLB",
  NHL: "NHL",
  CFB: "CFB",
  CBB: "CBB",
  OTHER: "Other",
};
export default {
  props: ["id", "theBet", "theOdds", "units", "betStatus", "category"],
  data() {
    return {
      Status,
      Category,
      editStatus: false,
      newBet: this.theBet,
      newOdds: this.theOdds,
      newUnits: this.units,
      newStatus: this.betStatus,
      newCategory: this.category,
    };
  },
  methods: {
    changeBet() {
      let putBet = {
        theBet: this.newBet,
        theOdds: this.newOdds,
        units: this.newUnits,
        status: this.newStatus,
        category: this.newCategory,
      };
      const url = "http://localhost:8080/api/v1/wager/edit/" + this.id;
      fetch(url, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json;charset=utf-8",
        },
        body: JSON.stringify(putBet),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log("Successfully updated bet: ", data);
        })
        .catch((error) => {
          console.log("Error on PUT: ", error);
        });
      console.log("finish changeBET!");
      document.location.href = "/";
    },
  },
};
</script>
<template>
  <div>
    <form @submit.prevent="" class="flex flex-col items-center px-5">
      <div class="flex flex-col mb-2 w-1/4">
        <label class="uppercase">Wager</label>
        <input
          v-model="newBet"
          type="text"
          class="border-2 rounded-xl border-zinc-500 px-2 focus:border-emerald-600 focus:outline-none"
        />
      </div>
      <div class="flex flex-col mb-2 w-1/4">
        <label class="uppercase">Odds</label>
        <input
          v-model="newOdds"
          type="text"
          class="border-2 rounded-xl border-zinc-500 px-2 focus:border-emerald-600 focus:outline-none"
        />
      </div>

      <div class="flex flex-col mb-2 w-1/4">
        <label class="uppercase">Units</label>
        <input
          v-model="newUnits"
          type="number"
          step=".01"
          class="border-2 rounded-xl border-zinc-500 px-2 focus:border-emerald-600 focus:outline-none"
        />
      </div>
      <div class="flex flex-col mb-2 w-1/4">
        <label for="status-select"> Status </label>

        <select
          title="status"
          name="status"
          id="status-select"
          v-model="newStatus"
          class="border-2 rounded-xl border-zinc-500 px-2 focus:border-emerald-600 focus:outline-none"
        >
          <option value="">--Please choose an option--</option>
          <option value="WON">{{ Status.WON }}</option>
          <option value="LOST">{{ Status.LOST }}</option>
          <option value="PENDING">{{ Status.PENDING }}</option>
          <option value="VOID">{{ Status.VOID }}</option>
        </select>
      </div>

      <div class="flex flex-col mb-4 w-1/4">
        <label for="status-select"> Category </label>

        <select
          name="category"
          id="category-select"
          v-model="newCategory"
          class="border-2 rounded-xl border-zinc-500 px-2 focus:border-emerald-600 focus:outline-none"
        >
          <option value="">--Please choose an option--</option>
          <option value="NFL">{{ Category.NFL }}</option>
          <option value="NBA">{{ Category.NBA }}</option>
          <option value="MLB">{{ Category.MLB }}</option>
          <option value="NHL">{{ Category.NHL }}</option>
          <option value="CFB">{{ Category.CFB }}</option>
          <option value="CBB">{{ Category.CBB }}</option>
          <option value="OTHER">{{ Category.OTHER }}</option>
        </select>
      </div>
      <button
        @click="changeBet"
        class="md:border-2 rounded-lg m-2 p-2 text-white bg-green-600 hover:bg-violet-600 w-1/12 uppercase"
      >
        Submit
      </button>
    </form>
  </div>
</template>

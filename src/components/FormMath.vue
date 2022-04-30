<script>
export default {
  data() {
    return {
      wagerTooSmall: true,
      money: "",
      odds: "",
    };
  },
};
</script>

<template>
  <div>
    <form @submit.prevent="">
      <label htmlFor="money">
        Money:
        <input v-model="money" />
      </label>
      <label htmlFor="odds">
        Odds:
        <input v-model="odds" />
      </label>
    </form>
    <div>
      <p v-if="wagerTooSmall">ERROR wager must be 10 cents or more</p>
      <p v-else>Lets make some money!</p>
      <p>{{ money }}</p>
      <p>{{ odds }}</p>
    </div>
  </div>
</template>

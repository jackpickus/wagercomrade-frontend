<template>
  <div>
    <h1>Login</h1>
    <form>
      <label>Username: <input v-model="username" /></label>
      <label>Password:<input v-model="password" type="password" /></label>
      <button type="submit">Login</button>
    </form>
  </div>
</template>

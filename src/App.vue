<template>
  <div class="h-8 w-16">
    <div class="absolute top-0 right-0 text-lg pr-4 pt-1">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link> |
      <router-link to="/login">Login</router-link>
    </div>
  </div>
  <router-view></router-view>
</template>

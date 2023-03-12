<template>
  <main class="mainbackground"></main>
</template>

<script>
import Card from "./MainCard.vue";
export default {
  name: "Pagemain",
  components: { Card },
};
</script>

<style>
.mainbackground {
  background: url(../assets/bg.jpg) no-repeat center center / cover;
  margin: 1rem auto;
  padding: 1rem;
  max-width: 140rem;
  border-radius: 0.75rem;
}
</style>

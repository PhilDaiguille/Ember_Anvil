<template>
  <main>
    <nav>
      <h2>Home</h2>
      <ul>
        <li><a href="#">Home</a></li>
        <li><a href="#">Crafting</a></li>
        <li><a href="#">Shop</a></li>
        <li><a href="#">Wiki</a></li>
      </ul>
    </nav>
    <div class="row">
      <Card />
    </div>
  </main>
</template>

<script>
import Card from "./Card.vue";
export default {
  name: "home",
  components: { Card },
};
</script>

<style></style>

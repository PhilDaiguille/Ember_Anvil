<template>
  <figure v-for="item in bdd.metaux" :key="item.id">
    <img :src="item.image" :alt="item.nom" />
    <figcaption>
      <h2>{{ item.nom }}</h2>
      <p>{{ item.description }}</p>
    </figcaption>
  </figure>
</template>

<script>
import bdd from "./Material.json";
export default {
  name: "PageMainCard",
  data() {
    return {
      bdd: bdd,
    };
  },
};
</script>

<style></style>

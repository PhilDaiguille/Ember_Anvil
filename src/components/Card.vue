<template>
  <section v-for="item in bdd.metaux" :key="item.id">
    <img :src="item.image" :alt="item.nom" />
    <h2>{{ item.nom }}</h2>
    <p>{{ item.description }}</p>
  </section>
</template>

<script>
import bdd from "../Material.json";
export default {
  data() {
    return {
      bdd: bdd,
    };
  },
};
</script>

<style>
main .row section {
  padding: 1rem;
  margin: 1rem;
  max-width: 35rem;
  border-radius: 0.75rem;
  background-color: var(--khaki);
  min-height: 35rem;
  box-shadow: inset 0.1rem 0.1rem 2rem #111;
}
main .row section img {
  margin: 1rem auto;
  display: block;
  object-fit: contain;
  max-width: 10rem;
}
main .row section h2 {
  margin: 0.5rem;
}
main .row section p {
  padding: 1rem;

  text-align: justify;
  box-shadow: inset 0.1rem 0.1rem 1rem #111;
  border-radius: 0.75rem;
  background-color: --var(dun);
}
</style>

<template>
  <main>
    <div class="sommaire">
      <ul>
        <li v-for="item in bdd.metaux" :key="item.id">{{ item.nom }}</li>
      </ul>
    </div>
    <div class="row">
      <h2>List des matériaux</h2>
      <Card />
    </div>
  </main>
</template>

<script>
import Card from "./MainCard.vue";
import bdd from "./Material.json";
export default {
  name: "Codex",
  components: { Card },
  data() {
    return {
      bdd: bdd,
    };
  },
};

</script>

<style>
main{
  display: flex;
}
.sommaire{
  display: flex;
  padding: 4rem;
  background: #141414;
  border-radius: .75rem;
  box-shadow: inset 0 0 5rem #000;
}
.sommaire ul li{
  margin: 2rem auto;
}
main .row{
  margin: 1rem;
}
main .row figure {
  padding: 1rem;
  display: flex;
  max-width: inherit;
  margin: 1rem auto;
  border-radius: 0.75rem;
  background-color: var(--khaki);
  box-shadow: inset 0.1rem 0.1rem 2rem #111;
}
main .row figure img {
  margin: 1rem auto;
  display: block;
  object-fit: contain;
  max-width: 10rem;
}
main .row figure figcaption{
  padding: 1rem 2rem;
}
main .row figure figcaption h2 {
  margin: 0.5rem;
}
main .row figure figcaption p {
  padding: 1rem;

  text-align: justify;
  box-shadow: inset 0.1rem 0.1rem 1rem #111;
  border-radius: 0.75rem;
  background-color: --var(dun);
}
</style>

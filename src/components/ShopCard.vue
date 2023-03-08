<template>
    <figure v-for="item in bdd.metaux" :key="item.id">
      <img :src="item.image" :alt="item.nom" />
      <figcaption>
        <h2>{{ item.nom }}</h2>
        <input type="submit" value="Acheter">
        <input type="submit" value="Vendre">
      </figcaption>
    </figure>
  </template>
  
  <script>
  import bdd from "./Material.json";
  export default {
    name: "ShopCard",
    data() {
      return {
        bdd: bdd,
      };
    },
  };
  </script>
  
  <style>
  main .row figure {
    padding: 2rem;
    margin: 1rem auto;
    max-width: 35rem;
    min-height: inherit;
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
  main .row figure figcaption input[type="submit"]{
    padding: 1rem 2rem;
    margin: .5rem;
    cursor: pointer;
    border-radius: 0.5rem;
  }
  main .row figure figcaption input:nth-child(3){
    background-color: var(--auburn);
  }
  main .row figure figcaption input:nth-child(3):hover{
    background-color: #a03c3e;
  }
  </style>
  
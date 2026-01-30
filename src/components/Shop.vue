<script>
import ShopCardVue from "./ShopCard.vue";
export default {
  name: "ShopPage",
  components: { ShopCardVue },
};
</script>
<template>
  <main>
    <section>
      <h2>Achetez ou vendez votre matériaux</h2>
      <p>
        L'endroit idéal pour acheter et vendre des matériaux pour la fabrication
        de métaux. Vous y trouverez une vaste sélection de matériaux rares et
        précieux ainsi que des outils de haute qualité pour améliorer vos
        techniques de travail des métaux. Venez découvrir le Magasin et entrez
        dans un monde d'opportunités pour vos projets de fabrication de métaux.
      </p>
      <div class="row">
        <ShopCardVue />
      </div>
    </section>
  </main>
</template>
<style></style>

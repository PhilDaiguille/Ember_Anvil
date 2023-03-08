<template>
  <main>
    <section>
      <h2>Achetez ou vendez votre matériaux</h2>
        <div class="row">
          <ShopCardVue />
        </div>
    </section>
  </main>
</template>

<script>
import ShopCardVue from './ShopCard.vue';
export default {
  name: "Shop",
  components : { ShopCardVue }
};
</script>

<style></style>

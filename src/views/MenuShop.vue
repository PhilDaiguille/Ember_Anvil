<template>
  <PageHeader />
  <PageShop />
  <PageFooter />
</template>

<script>
import PageHeader from "../components/PageHeader.vue";
import PageShop from "../components/Shop.vue";
import PageFooter from "../components/PageFooter.vue";

export default {
  name: "MenuShop",
  components: { PageHeader, PageShop, PageFooter },
};
</script>

<style></style>

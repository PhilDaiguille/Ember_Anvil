<template>
  <PageHeader />
  <PageShop />
  <PageFooter />
</template>

<script>
import PageHeader from "@/shared/layout/PageHeader.vue";
import PageShop from "@/domains/shop/components/Shop.vue";
import PageFooter from "@/shared/layout/PageFooter.vue";

export default {
  name: "ShopView",
  components: { PageHeader, PageShop, PageFooter },
};
</script>

<style></style>

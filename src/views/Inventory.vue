<script>
import PageHeader from "../components/PageHeader.vue";
import InventoryComponent from "../components/Inventory.vue";
import PageFooter from "../components/PageFooter.vue";

export default {
  name: "InventoryPage",
  components: { PageHeader, InventoryComponent, PageFooter },
};
</script>

<template>
  <PageHeader />
  <InventoryComponent />
  <PageFooter />
</template>

<style></style>

<script>
import PageHeader from "@/shared/layout/PageHeader.vue";
import InventoryComponent from "@/domains/inventory/components/Inventory.vue";
import PageFooter from "@/shared/layout/PageFooter.vue";

export default {
  name: "InventoryView",
  components: { PageHeader, InventoryComponent, PageFooter },
};
</script>

<template>
  <PageHeader />
  <InventoryComponent />
  <PageFooter />
</template>

<style></style>

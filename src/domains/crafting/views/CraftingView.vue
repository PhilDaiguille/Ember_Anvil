<template>
  <PageHeader />
  <PageCrafting />
  <PageFooter />
</template>

<script>
import PageHeader from "@/shared/layout/PageHeader.vue";
import PageCrafting from "@/domains/crafting/components/Crafting.vue";
import PageFooter from "@/shared/layout/PageFooter.vue";
export default {
  name: "CraftingView",
  components: { PageHeader, PageCrafting, PageFooter },
};
</script>

<style></style>

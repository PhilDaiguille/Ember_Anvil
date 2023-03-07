<template>
  <PageHeader />
  <PageCrafting />
  <PageFooter />
</template>

<script>
import PageHeader from "../components/PageHeader.vue";
import PageCrafting from "../components/Crafting.vue";
import PageFooter from "../components/PageFooter.vue";
export default {
  name: "MenuCraft",
  components: { PageHeader, PageCrafting, PageFooter },
};
</script>

<style></style>

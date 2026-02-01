<script>
import PageHeader from "@/shared/layout/PageHeader.vue";
import PageMain from "@/shared/layout/PageMain.vue";
import PageFooter from "@/shared/layout/PageFooter.vue";

export default {
  name: "HomeView",
  components: { PageHeader, PageMain, PageFooter },
};
</script>

<template>
  <PageHeader />
  <PageMain />
  <PageFooter />
</template>

<style></style>

<script>
import PageHeader from "@/shared/layout/PageHeader.vue";
import WorkshopComponent from "@/domains/workshop/components/Workshop.vue";
import PageFooter from "@/shared/layout/PageFooter.vue";

export default {
  name: "WorkshopView",
  components: { PageHeader, WorkshopComponent, PageFooter },
};
</script>

<template>
  <PageHeader />
  <WorkshopComponent />
  <PageFooter />
</template>

<style></style>

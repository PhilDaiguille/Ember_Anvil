<script>
import PageHeader from "../components/PageHeader.vue";
import WorkshopComponent from "../components/Workshop.vue";
import PageFooter from "../components/PageFooter.vue";

export default {
  name: "WorkshopPage",
  components: { PageHeader, WorkshopComponent, PageFooter },
};
</script>

<template>
  <PageHeader />
  <WorkshopComponent />
  <PageFooter />
</template>

<style></style>

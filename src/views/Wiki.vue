<template>
  <PageHeader />
  <PageWiki />
  <PageFooter />
</template>

<script>
import PageHeader from "../components/PageHeader.vue";
import PageWiki from "../components/Wiki.vue";
import PageFooter from "../components/PageFooter.vue";

export default {
  name: "wiki",
  components: { PageHeader, PageWiki, PageFooter },
};
</script>

<style></style>

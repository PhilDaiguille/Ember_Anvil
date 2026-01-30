<script>
import PageHeader from "../components/PageHeader.vue";
import PageWiki from "../components/Wiki.vue";
import PageFooter from "../components/PageFooter.vue";

export default {
  name: "WikiPage",
  components: { PageHeader, PageWiki, PageFooter },
};
</script>
<template>
  <PageHeader />
  <PageWiki />
  <PageFooter />
</template>

<style></style>

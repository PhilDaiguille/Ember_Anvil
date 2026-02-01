<script>
import PageHeader from "@/shared/layout/PageHeader.vue";
import PageWiki from "@/domains/wiki/components/Wiki.vue";
import PageFooter from "@/shared/layout/PageFooter.vue";

export default {
  name: "WikiView",
  components: { PageHeader, PageWiki, PageFooter },
};
</script>
<template>
  <PageHeader />
  <PageWiki />
  <PageFooter />
</template>

<style></style>

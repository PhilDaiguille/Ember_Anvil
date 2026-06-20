<script>
import PageHeader from "@/shared/layout/PageHeader.vue";
import PageWiki from "@/domains/wiki/components/Wiki.vue";
import CollectionsPanel from "@/domains/wiki/components/CollectionsPanel.vue";
import PageFooter from "@/shared/layout/PageFooter.vue";

export default {
  name: "WikiView",
  components: { PageHeader, PageWiki, CollectionsPanel, PageFooter },
};
</script>
<template>
  <PageHeader />
  <PageWiki />
  <CollectionsPanel />
  <PageFooter />
</template>

<style></style>

<script>
import PageHeader from "@/shared/layout/PageHeader.vue";
import ProfileComponent from "@/domains/player/components/Profile.vue";
import PageFooter from "@/shared/layout/PageFooter.vue";

export default {
  name: "ProfileView",
  components: { PageHeader, ProfileComponent, PageFooter },
};
</script>

<template>
  <PageHeader />
  <ProfileComponent />
  <PageFooter />
</template>

<style></style>

<script>
import PageHeader from "../components/PageHeader.vue";
import ProfileComponent from "../components/Profile.vue";
import PageFooter from "../components/PageFooter.vue";

export default {
  name: "ProfilePage",
  components: { PageHeader, ProfileComponent, PageFooter },
};
</script>

<template>
  <PageHeader />
  <ProfileComponent />
  <PageFooter />
</template>

<style></style>

<template>
  <header>
    <nav>
      <ul>
        <li><router-link to="./">Home</router-link></li>
        <li><router-link to="./Crafting">Crafting</router-link></li>
        <li><h1>Ember Anvil</h1></li>
        <li><router-link to="./Shop">Shop</router-link></li>
        <li><router-link to="./Wiki">Wiki</router-link></li>
      </ul>
    </nav>
  </header>
</template>

<script>
export default {
  name: "PageHeader",
};
</script>

<style></style>

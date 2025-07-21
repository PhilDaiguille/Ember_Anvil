<template>
  <header class="m-auto-5 text-center max-h-1400">
    <nav>
      <ul class="flex flex-wrap justify-around items-center font-bold p-1">
        <li><router-link to="./Crafting">Crafting</router-link></li>
        <li>
          <router-link to="./">
            <h1 class="py-5 px-8 m-5 text-7xl font-bold rounded-xl">
              Ember Anvil
            </h1>
          </router-link>
        </li>
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

<style>
header h1 {
  font-family: "Caesar Dressing", cursive;
}

header nav ul li h1 {
  background-color: var(--auburn);
}

header nav ul li a {
  font-weight: bolder;
}
</style>

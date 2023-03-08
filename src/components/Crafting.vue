<template>
  <main>
    <section>
      <h2>Forgez votre métal</h2>
      <p></p>
    </section>
    <section class="animation">
      <img src="https://cdn-icons-png.flaticon.com/512/3615/3615934.png" alt="hammer">
      <img src="https://cdn-icons-png.flaticon.com/512/453/453558.png" alt="anvil">
      <div class="loading"></div>
    </section>
  </main>
</template>

<script>
export default {
  name: "Crafting",
};
</script>

<style>
section{
  padding: 0 4rem;
}
.animation{
  margin: 0 auto;
  max-width: 40rem;
  max-height: 40rem;
}
.animation img:nth-child(1){
  display: block;
  max-width: 20rem;
  margin: 0 auto;
  animation: 2s linear 2s infinite alternate marteau;
}
.animation img:nth-child(2){
  display: block;
  max-width: 25rem;
  margin: 0 auto;

}
.loading{
  width: 0%;
  margin: 1rem;
  height: 2rem;
  border-radius: .5rem;
  background: #942525;
  animation: 2.5s linear 2.5s infinite loading;
}
@keyframes marteau {
  0%{
    transform: rotate(-135deg) translateY(0rem) translateX(-11rem);
  }
  50%{
    transform: rotate(-13deg) translateY(8rem) translateX(23rem);
  }
  100%{
    transform: rotate(-135deg) translateY(0rem) translateX(-11rem);
  }
  
}
@keyframes loading{
  0%{
    width: 0%;
  }
  100%{
    width: 100%;
  }
}
</style>

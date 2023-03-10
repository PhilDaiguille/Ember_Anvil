<template>
  <main>
    <section>
      <h2>Forgez votre métal</h2>
      <p>Bienvenue dans notre atelier de forge ! Ici, vous pouvez libérer votre créativité et créer toutes sortes d'objets en métal. Grâce à notre enclume, vous pouvez façonner le métal selon vos envies et créer des armes, des outils ou des décorations. Pour commencer, appuyez sur le bouton "Crafting" et laissez-vous guider par notre animation de forge. Une fois votre création terminée, n'oubliez pas de la partager avec la communauté ! Avec notre atelier de forge, les possibilités sont infinies. Alors, qu'attendez-vous pour forger votre métal ?</p>
      <button :disabled="crafting" @click="startCrafting">Crafting</button>
      <button v-if="crafting" @click="stopCrafting" class="stop">Arrêter</button>
    </section>
    <div>
      
  
      <div v-if="crafting" class="animation">
        <section class="animation">
          <img src="https://cdn-icons-png.flaticon.com/512/3615/3615934.png" alt="hammer">
          <img src="https://cdn-icons-png.flaticon.com/512/453/453558.png" alt="anvil">
          <div class="loading"></div>
        </section>
      </div>
    </div>
  </main>
</template>

<script>
export default {
  name: "Crafting",
  data() {
    return {
      crafting: false,
    };
  },
  methods: {
    startCrafting() {
      this.crafting = true;
      setTimeout(() => {
        this.crafting = false;
      }, 6900);
    },
    stopCrafting() {
      this.crafting = false;
    },
  },
};
</script>

<style>
section {
  padding: 0 4rem;
}
section p{
  max-width: 130rem;
  padding: 1rem;
  margin: 1rem;
  text-align: justify;
}
main section button{
  padding: 1rem 2rem;
  border-radius: .7rem;
  margin: 0 .5rem;
  background: var(--sea-green);
}
main section .stop{
  background: var(--auburn);
}
.animation {
  margin: 0 auto;
  max-width: 40rem;
  max-height: 40rem;
}
.animation img:nth-child(1) {
  display: block;
  max-width: 20rem;
  margin: 0 auto;
  animation: 2s linear 2s infinite alternate marteau;
}
.animation img:nth-child(2) {
  display: block;
  max-width: 25rem;
  margin: 0 auto;
}
.loading {
  width: 0%;
  margin: 1rem;
  height: 2rem;
  border-radius: 0.5rem;
  background: #942525;
  animation: 2.5s linear 2.5s infinite loading;
}
@keyframes marteau {
  0% {
    transform: rotate(-135deg) translateY(0rem) translateX(-11rem);
  }
  50% {
    transform: rotate(-13deg) translateY(8rem) translateX(23rem);
  }
  100% {
    transform: rotate(-135deg) translateY(0rem) translateX(-11rem);
  }
}
@keyframes loading {
  0% {
    width: 0%;
  }
  100% {
    width: 100%;
  }
}

@keyframes myanimation {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
</style>

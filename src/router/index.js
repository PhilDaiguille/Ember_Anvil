import { createRouter, createWebHistory } from 'vue-router'
import home from "@/views/Home.vue"
import crafting from "@/views/MenuCraft.vue"
import Shop from "@/views/MenuShop.vue"
import Wiki from "@/views/Wiki.vue"
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: home
    },
    {
      path: '/Crafting',
      name: 'Crafting',
      component: crafting
    },
    {
      path: '/Shop',
      name: 'Shop',
      component: Shop
    },
    {
      path: '/wiki',
      name: 'Wiki',
      component: Wiki
    }
  ]
})
export default router

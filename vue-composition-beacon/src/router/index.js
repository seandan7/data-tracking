import { createWebHistory, createRouter } from "vue-router";
import Dog from "@/views/Dog.vue";
import Cat from "@/views/Cat.vue";

const routes = [
  {
    path: "/cat",
    name: "Cat",
    component: Cat,
  },
  {
    path: "/dog",
    name: "Dog",
    component: Dog,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
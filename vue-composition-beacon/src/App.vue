<template>
  <HelloWorld msg="Dev Talks" />
  <div id="nav">
    <router-link to="/Cat">Cat</router-link>|
    <router-link to="/Dog">Dog</router-link>
    <div @click="sendBeacon">Manual Send</div>
  </div>
  <router-view />
</template>

<script>
import HelloWorld from "./components/HelloWorld.vue";
import store from "@/store";

export default {
  name: "App",
  provide: {
    store
  },
  inject: ["store"],
  created() {
    window.addEventListener("beforeunload", this.sendBeacon);
  },
  components: {
    HelloWorld
  },
  methods: {
    sendBeacon() {
      navigator.sendBeacon(
        "http://localhost:8000/beacon",
        JSON.stringify(store.state.logs)
      );
    }
  }
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>

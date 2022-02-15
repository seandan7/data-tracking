<template>
  <div class="hello">
    <h1  @click="addDogLog()">Dog Page</h1>
    {{ store.state.logs }}
    
  </div>
</template>

<script>
export default {
  name: 'Dog',
  props: {
    msg: String
  },
    inject: ["store"],
    methods: {
        addDogLog() {
            this.store.addLog({
                name: 'Dog',
                action: 'Bark',
                category: 'Sounds'
            })
        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>

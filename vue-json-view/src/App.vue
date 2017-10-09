<template>
  <div id="app">
    <label for="path">Path: </label>
    <input name="path" v-model="path">
    <button @click="search">search</button>
    <ul>
      <item :model="obj" :keyName="''"></item>
    </ul>
  </div>
</template>

<script>
import Item from './components/Item'

export default {
  name: 'app',
  components: {
    Item
  },
  data() {
    return {
      obj: 'Please give an input',
      path: ''
    }
  },
  methods: {
    search: function () {
      fetch(`http://${window.location.hostname}:9000/api/${this.path}`, {
        method: 'GET',
        headers: {
          'Origin': `http://${window.location.hostname}:8080`,
        }
      })
      .then(res => res.json())
      .then(res => {
        this.obj = res;
      })
    }
  }
}
</script>

<style>
#app {
  font-family: cursive, Consolas, monospace;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
ul {
  list-style-type: none;
}
</style>

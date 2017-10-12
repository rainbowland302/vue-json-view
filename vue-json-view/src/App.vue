<template>
  <div id="app">
    <label for="name">Name: </label>
    <input name="name" v-model="name">
    <select name="select" v-model="job"> 
      <option disabled value="">Please select one</option>
      <option value="engineer">Engineer</option>
      <option value="teacher">Teacher</option>
      <option value="farmer">Farmer</option>
    </select>
    <button @click="search">search</button>
    <button @click="setExpandAll">expand all</button>
    <ul>
      <item :model="obj" :keyName="''" :isExpandAll="isExpandAll" @clearExpandAll="clearExpandAll"></item>
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
      name: '',
      job:'',
      isExpandAll: false
    }
  },
  methods: {
    search: function () {
      fetch(`http://${window.location.hostname}:9000/api?name=${this.name}&job=${this.job}`, {
        method: 'GET',
        headers: {
          'Origin': `http://${window.location.hostname}:8080`,
        }
      })
      .then(res => res.json())
      .then(res => {
        this.obj = res;
      })
    },
    clearExpandAll: function() {
      this.isExpandAll = false;
    },
    setExpandAll: function() {
      this.isExpandAll = true;
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

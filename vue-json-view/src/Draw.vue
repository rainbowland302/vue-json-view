<template>
  <div id="app">
    <Rectangle
      v-for="(rect, index) in rects"
      :x="rect.x"
      :y="rect.y"
      :width="rect.width"
      :height="rect.height"
      :key="index">
    </Rectangle>
  </div>
</template>

<script>
import Rectangle from './components/Rectangle'

export default {
  name: 'app',
  components: {
    Rectangle
  },
  data() {
    return {
      rects: [
        { x: 100, y:100, width: 100, height: 100 },
        { x: 200, y:500, width: 100, height: 100 },
        { x: 300, y:600, width: 100, height: 100 },
        { x: 700, y:800, width: 100, height: 100 }
      ]
    }
  },
  methods: {
    getRects: function () {
      fetch(`http://${window.location.hostname}:8000/2`, {
        method: 'POST',
        headers: {
          'Origin': `http://${window.location.hostname}:8080`,
        }
      })
      .then(res => res.json())
      .then(res => {
        this.rects = res;
      })
    }
  },
  created: function() {
    this.getRects();
  }
}
</script>

<style scoped>
#app {
  position: relative;
  width: 2000px;
  height: 2000px;
  border: 1px solid red;
}
</style>

<template>
  <div class="rectangle" v-bind:style="{ left: x + 'px', top: y + 'px', width: width + 'px', height: height + 'px'}"></div>
</template>

<script>
export default {
  name: 'Rectangle',
  props: {
    x: Number,
    y: Number,  // "key" is a reserved attribute and cannot be used as component prop
    width: Number,
    height: Number
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.rectangle {
    position: absolute;
    border: 1px solid green;
}
</style>

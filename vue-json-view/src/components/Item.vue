<template>
  <li>
    <div :class="{nest: isNest}" @click="toggle">
      <span class="item-key">{{`${displayKey}: `}}</span>
      <span class="item-value">{{displayValue}}</span>
      <span class="item-toggle" v-if="isNest">[{{open ? '-' : '+'}}]</span>
    </div>
    <ul v-show="open" v-if="isNest">
      <item
        class="item"
        v-for="(value, key) in model"
        :model="value"
        :keyName="key"
        :key="key">
      </item>
    </ul>
  </li>
</template>

<script>
export default {
  name: 'Item',
  props: {
    model: Object | String,
    keyName: String | Number  // "key" is a reserved attribute and cannot be used as component prop
  },
  data: function () {
    return {
      open: false
    }
  },
  computed: {
    isObject: function () {
      return typeof this.model === 'object' && !Array.isArray(this.model)
    },
    isArray: function () {
      return Array.isArray(this.model)
    },
    isNest: function () {
      return typeof this.model === 'object'
    },
    displayKey: function() {
      return this.keyName;
    },
    displayValue: function() {
      return this.isObject ? 'Object' : (this.isArray ? 'Array' : this.model)
    }
  },
  methods: {
    toggle: function () {
      if (this.isNest) {
        this.open = !this.open
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
body {
  color: #444;
}

.nest {
  cursor: pointer;
}
ul {
  padding-left: 1em;
  line-height: 1.5em;
  /* list-style-type: dot; */
}
.item-key {
  color: deepskyblue;
}
.item-toggle {
  font-weight: bold;
}
</style>

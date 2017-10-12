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
        @clearExpandAll="clearExpandAll"
        :model="value"
        :keyName="key"
        :isExpandAll="isExpandAll"
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
    keyName: String | Number,  // "key" is a reserved attribute and cannot be used as component prop
    isExpandAll: Boolean
  },
  data: function () {
    return {
      expand: false
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
    },
    open: function() {
      if(this.isExpandAll) this.expand = true;
      return this.expand;
    }
  },
  methods: {
    toggle: function () {
      if (this.isNest) {
        this.expand = !this.expand;
        this.clearExpandAll();
      }
    },
    clearExpandAll: function() {
      this.$emit('clearExpandAll');
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

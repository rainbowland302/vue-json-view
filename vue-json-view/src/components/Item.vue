<template>
  <li>
    <div :class="{nest: isNest}" @click="toggle">
      <span class="item-key">{{`${displayKey}: `}}</span>
      <span class="item-value">{{displayValue}}</span>
      <span class="item-toggle" v-if="isNest">[{{isOpen ? '-' : '+'}}]</span>
    </div>
    <ul v-if="expandAllElement">
      <item class="item" 
        v-for="(value, key) in model" 
        @toggleExpandAll="toggleExpandAll"
        @toggleOpen="toggleOpen"
        :model="value" 
        :keyName="key" 
        :expandAll=true 
        :open=true
        :key="key">
      </item>
    </ul>
   <ul v-else-if="notExpandAllElement">
      <item class="item" 
        v-for="(value, key) in model" 
        @toggleExpandAll="toggleExpandAll"
        @toggleOpen="toggleOpen"
        :model="value" 
        :keyName="key" 
        :expandAll=false
        :open=false
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
    expandAll: Boolean,
    open:Boolean
  },
  data: function() {
    return {
      innerExpand: false,
      innerOpen:false,
      clicks: 0,
      delay: 700,
      timer: null
    }
  },
  created: function(){
    this.innerOpen = this.open;
    this.innerExpand = this.expandAll;
  },
  computed: {
    isObject: function() {
      return typeof this.model === 'object' && !Array.isArray(this.model)
    },
    isArray: function() {
      return Array.isArray(this.model)
    },
    isNest: function() {
      return typeof this.model === 'object'
    },
    displayKey: function() {
      return this.keyName;
    },
    displayValue: function() {
      return this.isObject ? 'Object' : (this.isArray ? 'Array' : this.model)
    },
    isOpen: function() {
      return this.innerOpen;
    },
    expandAllElement: function(){
      return  this.isNest && this.innerOpen && this.innerExpand
    },
    notExpandAllElement: function(){
      return this.isNest && this.innerOpen && !this.innerExpand
    }

  },
  methods: {
    toggle: function() {
      this.clicks++;
      if (this.clicks === 1) {
        this.timer = setTimeout(() => {
          if (this.isNest) {
            this.innerOpen = !this.innerOpen;
            this.toggleOpen();
          }
          if(this.innerExpand){
            this.toggleExpandAll();
            this.innerExpand = !this.innerExpand;
          }
          this.clicks=0;
        }, this.delay)

      }
      else{
        clearTimeout(this.timer);
        if(this.innerOpen === this.innerExpand){
          this.innerExpand = !this.innerExpand;
          this.toggleExpandAll();
        }
        if (this.isNest) {
            this.innerOpen = !this.innerOpen;
            this.toggleOpen();
        }
          this.clicks=0;
      }
    },
    toggleOpen: function(){
      this.$emit('toggleOpen');
    },
    toggleExpandAll: function(){
      this.$emit('toggleExpandAll');
    },
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

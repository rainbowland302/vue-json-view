<template>
  <div id="app">
    <GraphChart
      :host="this.host"
      :incoming="this.incoming"
      :outgoing="this.outgoing">
    </GraphChart>
  </div>
</template>

<script>
import GraphChart from "./components/GraphChart";

export default {
  name: "app",
  components: {
    GraphChart
  },
  data() {
    return {
      base: `http://${window.location.hostname}:3002`,
      token: "",
      incoming: [],
      outgoing: [],
      host: "host"
    };
  },
  methods: {
    login: function() {
      fetch(`${this.base}/session`, {
        method: "POST",
        headers: {
          "content-type": "application/json",
          Origin: `http://${window.location.hostname}:8080`
        },
        body: JSON.stringify({
          username: "andrewz@vmware.com",
          password: "1"
        })
      }).then(res => {
        this.getNodes();
      });
    },
    getNodes: function() {
      let futures = ["incoming", "outgoing"]
        .map(s => `${this.base}/vapp?type=${s}`)
        .map(url =>
          fetch(url, {
            method: "GET",
            headers: {
              "content-type": "application/json",
              accept: "application/json",
              origin: `http://${window.location.hostname}:8080`
            }
          }).then(res => res.json())
        );
      Promise.all(futures).then(res => {
        this.incoming = res[0];
        this.outgoing = res[1];
      });
    }
  },
  created: function() {
    this.login();
  }
};
</script>

<style scoped>
#app {
}
</style>

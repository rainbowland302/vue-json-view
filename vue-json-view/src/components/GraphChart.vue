<template>
  <div id="graph-chart">

  </div>
</template>

<script>
import echarts from "echarts";

import { graphOption } from "../constants/chart-option";

export default {
  name: "GraphChart",
  props: {
    incoming: Array,
    outgoing: Array, // "key" is a reserved attribute and cannot be used as component prop
    host: String
  },
  data: function() {
    return {
      option: graphOption,
      myChart: {}
    };
  },
  computed: {
    input: function() {
      return this.incoming.map(({ name }, index) => ({
        x: Math.abs(index - 4) * 200,
        y: 150 * index,
        name,
        itemStyle: {
          normal: { color: "yellowgreen" }
        }
      }));
    },
    output: function() {
      return this.outgoing.map(({ name }, index) => ({
        x: 2400 - Math.abs(index - 4) * 200,
        y: 150 * index,
        name,
        itemStyle: {
          normal: { color: "deepskyblue" }
        }
      }));
    },
    middle: function() {
      return {
        name: this.host,
        x: 1200,
        y: 600,
        symbolSize: 80
      };
    },
    // {name: string, x: number, y: number}[]
    data: function() {
      return [this.middle, ...this.input, ...this.output];
    },
    // {source: number | string, target: number | string }[]
    links: function() {
      let left = this.input.map(({ name }, index) => ({
        source: name,
        target: this.host,
        lineStyle: {
          normal: { curveness: index < 4 ? 0.2 : -0.2 },
        }
      }));
      let right = this.output.map(({ name }, index) => ({
        target: name,
        source: this.host,
        lineStyle: {
          normal: { curveness: index < 4 ? 0.2 : -0.2 }
        }
      }));
      return [...left, ...right];
    }
  },
  watch: {
    data: function() {
      this.option.series[0].data = this.data;
      this.option.series[0].links = this.links;
      this.myChart.setOption(this.option);
    }
  },
  mounted: function() {
    this.myChart = echarts.init(document.getElementById("graph-chart"));

    // let option = graphOption;
    // option.series.data = this.data;
    // myChart.setOption(option);
  }
};
</script>

<style scoped>
#graph-chart {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
}
</style>

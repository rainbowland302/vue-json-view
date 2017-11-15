<template>
  <div id="graph-chart">

  </div>
</template>

<script>
import echarts from 'echarts';

export default {
  name: "GraphChart",
  props: {
    incoming: Array,
    outgoing: Array, // "key" is a reserved attribute and cannot be used as component prop
    host: String
  },
  mounted: function() {
    let myChart = echarts.init(document.getElementById("graph-chart"));
    let option = {
      title: {
        text: "WorkLoad Incoming & Outgoing from Host"
      },
      tooltip: {},
      animationDurationUpdate: 1500,
      animationEasingUpdate: "quinticInOut",
      series: [
        {
          type: "graph",
          layout: "none",
          symbolSize: 50,
          roam: true,
          label: {
            normal: {
              show: true
            }
          },
          edgeSymbol: ["circle", "arrow"],
          edgeSymbolSize: [4, 10],
          edgeLabel: {
            normal: {
              textStyle: {
                fontSize: 20
              }
            }
          },
          data: [
            {
              name: "节点1",
              x: 300,
              y: 300
            },
            {
              name: "节点2",
              x: 800,
              y: 300
            },
            {
              name: "节点3",
              x: 550,
              y: 100
            },
            {
              name: "节点4",
              x: 550,
              y: 500
            }
          ],
          // links: [],
          links: [
            {
              source: 0,
              target: 1,
              symbolSize: [5, 20],
              label: {
                normal: {
                  show: true
                }
              },
              lineStyle: {
                normal: {
                  width: 5,
                  curveness: 0.2
                }
              }
            },
            {
              source: "节点2",
              target: "节点1",
              label: {
                normal: {
                  show: true
                }
              },
              lineStyle: {
                normal: { curveness: 0.2 }
              }
            },
            {
              source: "节点1",
              target: "节点3"
            },
            {
              source: "节点2",
              target: "节点3"
            },
            {
              source: "节点2",
              target: "节点4"
            },
            {
              source: "节点1",
              target: "节点4"
            }
          ],
          lineStyle: {
            normal: {
              opacity: 0.9,
              width: 2,
              curveness: 0
            }
          }
        }
      ]
    };
    myChart.setOption(option);
  }
};
</script>

<style scoped>
#graph-chart {
  height: 500px;
}
</style>

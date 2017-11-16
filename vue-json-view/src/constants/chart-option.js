export const graphOption = {
  title: {
    text: 'WorkLoad Incoming & Outgoing from Host'
  },
  tooltip: {},
  animationDurationUpdate: 1500,
  animationEasingUpdate: 'quinticInOut',
  series: [{
    type: 'graph',
    layout: 'none',
    symbolSize: 50,
    roam: true,
    label: {
      normal: {
        show: true
      }
    },
    edgeSymbol: ['circle', 'arrow'],
    edgeSymbolSize: [4, 10],
    edgeLabel: {
      normal: {
        textStyle: {
          fontSize: 20
        }
      }
    },
    lineStyle: {
      normal: {
        opacity: 0.9,
        width: 2,
        curveness: 0.2
      }
    }
  }]
}

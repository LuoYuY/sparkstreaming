<template>
  <div id="Chart">
    <Button v-on:click="start()">start</Button>
    <div class="content">
      <div id="graphTest" :style="{width: '50%', height: '800px'}"></div>
      <div id="graphTest2" :style="{width: '50%', height: '800px'}"></div>
    </div>
  </div>
</template>

<script>
var echarts = require('echarts/lib/echarts')
echarts.dataTool = require('echarts/extension/dataTool')
export default {
  name: 'graphxTest',
  data() {
    return {
      graphTest: {
        chart: null,
        option: null,
        data: [],
        links: [],
        cate:[ { name:'subGraph1'} ]
      },
      graphTest2: {
        chart: null,
        option: null,
        data: [],
        links: [],
        cate:[{ name: 'subGraph2'}]
      }
    }
  },
  mounted() {
    this.createGraph()
  },
  methods: {
    start() {
      this.addData();
    },
    createGraph() {
      let dom = document.getElementById("graphTest")
      this.graphTest.chart = this.$echarts.init(dom)
      this.graphTest.option = {
      }
      if (this.graphTest.option && typeof this.graphTest.option === "object") {
        this.graphTest.chart.setOption(this.graphTest.option, true);
      }

      let dom2 = document.getElementById("graphTest2")
      this.graphTest2.chart = this.$echarts.init(dom2)
      this.graphTest2.option = {
      }
      if (this.graphTest2.option && typeof this.graphTest2.option === "object") {
        this.graphTest2.chart.setOption(this.graphTest2.option, true);
      }


    },
    addData() {
      let that = this;
      that.updateData()
    },
    updateData() {
      this.$axios.get('/download/graphxdata/subGraph1.gexf')
        .then((response) => {
          console.log(response)
          let xml = response.data
          let graph = this.$echarts.dataTool.gexf.parse(xml)
          console.log(graph)
          // //设置需要展示的graph的nodes基本属性，后面需要用于序列的data里
          this.graphTest.data = []
          for(let i = 0; i < graph.nodes.length; i++) {
            //console.log(graph.nodes[i].name.split(',')[0])
            let cate = 'subGraph1'
            const obj = { // 关键！ 创建一个新对象
              name: graph.nodes[i].id,
              draggable: true,
              category: cate,
              itemStyle: {
                color: 'black'
              }
            }
            this.graphTest.data.push(obj)
          }

          this.graphTest.links = []
          for(let i = 0; i < graph.links.length; i++) {
            const obj = { // 关键！ 创建一个新对象
              source: graph.links[i].source,
              target:  graph.links[i].target,
              symbol: ['none', 'arrow'],
              value: graph.links[i].name,
            }
            this.graphTest.links.push(obj)
          }

          this.graphTest.option = {
            title: {
              text: '社群1',
              subtext: 'Default layout',
              top: 'bottom',
              left: 'center'
            },
            // tooltip: {
            //   formatter: function (params) {
            //     var info = '<span style="font-size:8px">'+ params.value[0] + '</span>'
            //     return info;
            //   },
            //   backgroundColor: "#575555",//提示标签背景颜色
            //   textStyle: {color: "#fff"} //提示标签字体颜色
            // },
            // symbolSize: 300,
            roam: true,
            focusNodeAdjacency: true,
            label: {
              normal: {show: true},
              // show: true
            },
            legend: [{
              // selectedMode: 'single',
              data: this.graphTest.cate.map(function (a) {
                return a.name;
              }),
              itemStyle: {
                color: 'black'
              }
            }],
            draggable:true,
            series : [
              {
                name: 'USER',
                layout: 'force',
                type: 'graph',
                data: this.graphTest.data,
                links: this.graphTest.links,
                roam: true,
                categories: this.graphTest.cate,
                edgeLabel: {
                  show: true,
                  formatter: '{c}'
                },
                label: {
                  position: 'inside',
                  show: true,
                },
                symbolSize: (value, params) => {
                  //根据数据params中的data来判定数据大小
                  switch (params.data.category) {
                    case 'subGraph1': return 20;break;
                    case 'subGraph2': return 25;break;
                  }
                },
                // (value: Array|number, params: Object) => number|Array
                // symbolSize: (rawValue, params) => {
                //   params.symbolSize =
                //   return params.symbolSize
                // },
                force: {
                  repulsion: 100,
                  // layoutAnimation: true,
                  edgeLength:100
                }
              }
            ]
          }
          this.graphTest.chart.setOption(this.graphTest.option)
        })
        .catch(function (error) {
          console.log(error)
        })
        .then(function () {
          // always executed
        })

      this.$axios.get('/download/graphxdata/subGraph2.gexf')
        .then((response) => {
          console.log(response)
          let xml = response.data
          let graph = this.$echarts.dataTool.gexf.parse(xml)
          console.log(graph)
          // //设置需要展示的graph的nodes基本属性，后面需要用于序列的data里
          this.graphTest.data = []
          for(let i = 0; i < graph.nodes.length; i++) {
            //console.log(graph.nodes[i].name.split(',')[0])
            let cate = 'subGraph2'
            const obj = { // 关键！ 创建一个新对象
              name: graph.nodes[i].id,
              draggable: true,
              category: cate,
            }
            this.graphTest2.data.push(obj)
          }

          this.graphTest2.links = []
          for(let i = 0; i < graph.links.length; i++) {
            const obj = { // 关键！ 创建一个新对象
              source: graph.links[i].source,
              target:  graph.links[i].target,
              symbol: ['none', 'arrow'],
              value: graph.links[i].name,
            }
            this.graphTest2.links.push(obj)
          }

          this.graphTest2.option = {
            title: {
              text: '社群2',
              subtext: 'Default layout',
              top: 'bottom',
              left: 'center'
            },
            roam: true,
            focusNodeAdjacency: true,
            label: {
              normal: {show: true},
              // show: true
            },
            legend: [{
              // selectedMode: 'single',
              data: this.graphTest2.cate.map(function (a) {
                return a.name;
              })
            }],
            draggable:true,
            series : [
              {
                name: 'USER',
                layout: 'force',
                type: 'graph',
                data: this.graphTest2.data,
                links: this.graphTest2.links,
                roam: true,
                categories: this.graphTest2.cate,
                edgeLabel: {
                  show: true,
                  formatter: '{c}'
                },
                label: {
                  position: 'inside',
                  show: true,
                },
                symbolSize: (value, params) => {
                  //根据数据params中的data来判定数据大小
                  switch (params.data.category) {
                    case 'subGraph1': return 20;break;
                    case 'subGraph2': return 25;break;
                  }
                },
                // (value: Array|number, params: Object) => number|Array
                // symbolSize: (rawValue, params) => {
                //   params.symbolSize =
                //   return params.symbolSize
                // },
                force: {
                  repulsion: 100,
                  // layoutAnimation: true,
                  edgeLength:100
                }
              }
            ]
          }
          this.graphTest2.chart.setOption(this.graphTest2.option)

        })
        .catch(function (error) {
          console.log(error)
        })
        .then(function () {
          // always executed
        })
    }
  }
}

</script>

<style scoped>
.content {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
}
</style>

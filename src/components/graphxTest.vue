<template>
  <div id="Chart">
    <Button v-on:click="start()">start</Button>
    <div class="content">
      <div id="graphTest" :style="{width: '50%', height: '500px'}"></div>
      <div id="graphTest2" :style="{width: '50%', height: '500px'}"></div>
      <div :stylr="{width: '50%' , height: '400px'}" style="padding-left:150px;margin-top: 10px">
        <Table border id="tableImpactUser1" height="400" width="700" :columns="table1.columns1"
               :data="table1.data1"></Table>
      </div>
      <div :stylr="{width: '50%' , height: '400px'}" style="padding-left:150px;margin-top: 10px">
        <Table border id="tableImpactUser2" height="400" width="700" :columns="table2.columns1"
               :data="table2.data1"></Table>
      </div>
      <div id="barSimple1" :style="{width: '50%', height: '400px'}"></div>
      <div id="barSimple2" :style="{width: '50%', height: '400px'}"></div>
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
      barSimple1: {
        chart: null,
        option: null,
        category: [],
        data: []
      },
      barSimple2:{
        chart: null,
        option: null,
        category: [],
        data: []
      },
      graphTest: {
        chart: null,
        option: null,
        data: [],
        links: [],
        cate: [{name: 'subGraph1'}]
      },
      graphTest2: {
        chart: null,
        option: null,
        data: [],
        links: [],
        cate: [{name: 'subGraph2'}]
      },
      table1: {
        columns1: [
          {
            title: 'id',
            key: 'rank'
          },
          {
            title: '昵称',
            key: 'name'
          },
          {
            title: '加入懂球帝天数',
            key: 'sex'
          },
          {
            title: '主队',
            key: 'liketeam'
          }
        ],
        data1: []
      },
      table2:
        {
          columns1: [
            {
              title: 'id',
              key: 'rank'
            },
            {
              title: '昵称',
              key: 'name'
            },
            {
              title: '加入懂球帝天数',
              key: 'sex'
            },
            {
              title: '主队',
              key: 'liketeam'
            }
          ],
          data1: []
        }
    }
  },
  mounted() {
    this.createGraph()
    this.createBarSimple1()
    this.createBarSimple2()
  },
  methods: {
    start() {
      this.addData();
    },
    createGraph() {
      let dom = document.getElementById("graphTest")
      this.graphTest.chart = this.$echarts.init(dom)
      this.graphTest.option = {}
      if (this.graphTest.option && typeof this.graphTest.option === "object") {
        this.graphTest.chart.setOption(this.graphTest.option, true);
      }

      let dom2 = document.getElementById("graphTest2")
      this.graphTest2.chart = this.$echarts.init(dom2)
      this.graphTest2.option = {}
      if (this.graphTest2.option && typeof this.graphTest2.option === "object") {
        this.graphTest2.chart.setOption(this.graphTest2.option, true);
      }

    },
    createBarSimple1(){
      let dom = document.getElementById("barSimple1")
      this.barSimple1.chart = this.$echarts.init(dom)
      this.barSimple1.option = {
        color: ['#1c8941'],
        // title: "barChartHomeTeam",
        tooltip: {
          show: true
        },
        legend: {
          data: ['数量']
        },
        xAxis: {
          type: 'category',
          data: this.barSimple1.category,
          //data:['lixiaot'],
          axisLabel: {
            interval: 0, //坐标刻度之间的显示间隔，默认就可以了（默认是不重叠）
            rotate: 38   //调整数值改变倾斜的幅度（范围-90到90）
          },
          grid: {
            left: '18%',
            bottom: '38%'
          }
        },
        yAxis: {
          type: 'value'
        },
        series: [
          {
            name: 'VALUE',
            type: 'bar',
            data: this.barSimple1.data,
            itemStyle: {
              normal: {
                label: {
                  show: true,  //开启显示
                  position: 'top',  //在上方显示
                  textStyle: {  //数值样式
                    color: 'black',
                    fontSize: 16
                  }
                }
              }
            }
          }
        ]
      }
      if (this.barSimple1.option && typeof this.barSimple1.option === "object") {
        this.barSimple1.chart.setOption(this.barSimple1.option, true);
      }
    },
    createBarSimple2(){
      let dom = document.getElementById("barSimple2")
      this.barSimple2.chart = this.$echarts.init(dom)
      this.barSimple2.option = {
        color: ['#1c8941'],
        // title: "barChartHomeTeam",
        tooltip: {
          show: true
        },
        legend: {
          data: ['数量']
        },
        xAxis: {
          type: 'category',
          data: this.barSimple2.category,
          axisLabel: {
            interval: 0, //坐标刻度之间的显示间隔，默认就可以了（默认是不重叠）
            rotate: 38   //调整数值改变倾斜的幅度（范围-90到90）
          },
          grid: {
            left: '18%',
            bottom: '38%'
          }
        },
        yAxis: {
          type: 'value'
        },
        series: [
          {
            name: 'VALUE',
            type: 'bar',
            data: this.barSimple2.data,
            itemStyle: {
              normal: {
                label: {
                  show: true,  //开启显示
                  position: 'top',  //在上方显示
                  textStyle: {  //数值样式
                    color: 'black',
                    fontSize: 16
                  }
                }
              }
            }
          }
        ]
      }
      if (this.barSimple2.option && typeof this.barSimple2.option === "object") {
        this.barSimple2.chart.setOption(this.barSimple2.option, true);
      }
    },
    addData() {
      this.updateData()
      this.barSimple1.chart.setOption({
        xAxis: {
          type: 'category',
          data: this.barSimple1.category
        },
        series: [{
          name: 'VALUE',
          data: this.barSimple1.data
        }]
      })
      this.barSimple2.chart.setOption({
        xAxis: {
          type: 'category',
          data: this.barSimple2.category
        },
        series: [{
          name: 'VALUE',
          data: this.barSimple2.data
        }]
      })
    },
    updateData() {
      this.$axios.get('/download/graphxdata/graph1.gexf')
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
              value: graph.nodes[i].name,
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
            tooltip: {
              formatter: function (params) {
                var info = '<span style="font-size:20px">'+ params.name+ ":" + params.value + '</span>'
                return info;
              },
              backgroundColor: "#575555",//提示标签背景颜色
              textStyle: {color: "#fff"} //提示标签字体颜色
            },
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


      this.$axios.get('/download/graphxdata/graph2.gexf')
        .then((response) => {
          console.log(response)
          let xml = response.data
          let graph = this.$echarts.dataTool.gexf.parse(xml)
          console.log(graph)
          // //设置需要展示的graph的nodes基本属性，后面需要用于序列的data里
          this.graphTest.data = []
          for (let i = 0; i < graph.nodes.length; i++) {
            //console.log(graph.nodes[i].name.split(',')[0])
            let cate = 'subGraph2'
            const obj = { // 关键！ 创建一个新对象
              name: graph.nodes[i].id,
              draggable: true,
              category: cate,
              value: graph.nodes[i].name
            }
            this.graphTest2.data.push(obj)
          }

          this.graphTest2.links = []
          for (let i = 0; i < graph.links.length; i++) {
            const obj = { // 关键！ 创建一个新对象
              source: graph.links[i].source,
              target: graph.links[i].target,
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
            tooltip: {
              formatter: function (params) {
                var info = '<span style="font-size:20px">'+ params.name+ ":" + params.value + '</span>'
                return info;
              },
              backgroundColor: "#575555",//提示标签背景颜色
              textStyle: {color: "#fff"} //提示标签字体颜色
            },
            draggable: true,
            series: [
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
                    case 'subGraph1':
                      return 20;
                      break;
                    case 'subGraph2':
                      return 25;
                      break;
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
                  edgeLength: 100
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


      this.$axios.get('/getList/getGraphxData')
        .then((response) => {
          //console.log(response.data.data)

          let array = []
          this.table1.data1 = [];
          array = JSON.parse(JSON.stringify(response.data.data.userResult1Array1))
          for (let i = 0; i < array.length; i++) {
            //console.log(array[i])
            const obj = { // 关键！ 创建一个新对象
              rank: array[i].id.$numberLong,
              name:  array[i].name,
              sex:   array[i].days,
              liketeam:  array[i].team
            }
            this.table1.data1.push(obj)
          }

          let array2 = []
          this.table2.data1 = [];
          array2 = JSON.parse(JSON.stringify(response.data.data.userResult1Array2))
          for (let i = 0; i < array2.length; i++) {
            //console.log(array2[i])
            const obj = { // 关键！ 创建一个新对象
              rank: array2[i].id.$numberLong,
              name:  array2[i].name,
              sex:   array2[i].days,
              liketeam:  array2[i].team
            }
            this.table2.data1.push(obj)
          }

          let array3 = []
          //console.log(response.data.data)
          this.barSimple1.category = [];
          this.barSimple1.data = [];
          array3 = JSON.parse(JSON.stringify(response.data.data.graphResultArray))
          for (let i = 0; i < array3.length; i++) {
            //console.log(array3[i].team + array3[i].count)
            this.barSimple1.category.push(array3[i].team)
            this.barSimple1.data.push(array3[i].count)
          }

          let array4 = []
          this.barSimple2.category = [];
          this.barSimple2.data = [];
          array4 = JSON.parse(JSON.stringify(response.data.data.graphResult2Array))

          //console.log("buuu")
          for (let i = 0; i < array4.length; i++) {
            //console.log(array3[i].team + array3[i].count)
            this.barSimple2.category.push(array4[i].name)
            this.barSimple2.data.push(array4[i].count)
          }
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

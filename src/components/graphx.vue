<template>
  <div id="Chart">
    {{ message }}
    <Button v-on:click="start()">start</Button>
    <div class="content">
      <!-- ******************************************************************************** -->
      <!-- 显示用户与用户之间的关注关系 -->
      <div id="relationChartUserAndUser" :style="{width: '50%', height: '600px'}"></div>
      <!-- 显示用户与球队之间的喜爱关系 -->
      <div id="relationChartUserAndTeam" :style="{width: '50%', height: '600px'}"></div>
      <!-- ******************************************************************************** -->

    </div>
  </div>
</template>

<script>
import china from '../assets/china'
import $ from 'jquery'

export default {
  name: 'Echart',
  data() {
    return {
      message: null,
      /*****/
      relationChartUserAndUser: {
        chart: null,
        data: [],
        links: []
      },
      relationChartUserAndTeam: {
        chart: null,
        data: [],
        links: []
      }
      /*****/
    }
  },
  mounted() {
    /*****/
    this.createRelationChartUserAndUser()
    this.createRelationChartUserAndTeam()
    /*****/
  },
  methods: {
    start() {
      this.addData();
    },
    randomData() {
      return Math.round(Math.random() * 500);
    },
    /*****************************************************************************************/
    createRelationChartUserAndTeam(){
      let dom = document.getElementById("relationChartUserAndTeam")
      this.relationChartUserAndTeam.chart = this.$echarts.init(dom)

      this.relationChartUserAndTeam.option = {
        title: {
          text: "用户和球队之间的喜爱关系",
          top: "bottom",
          left: "center",
          textStyle: {
            fontSize: 15,
          }
        },
        tooltip:{},
        legend: [{
          data: ["球队", "粉丝"]
        }],
        animationDuration: 1500,
        animationEasingUpdate: "quinticInOut",
        series: [{
          name: '用户和球队之间的喜爱关系',
          type: 'graph',
          force:{
            repulsion:1000
          },
          layout: "force",
          roam: true,//设置可以拖拽和缩放
          focusNodeAdjacency: true,//设置突出显示
          links: this.relationChartUserAndTeam.links,
          data: this.relationChartUserAndTeam.data,
          categories: [{
            name: "球队"
          }, {
            name: "粉丝"
          }],
        }]
      }
      if (this.relationChartUserAndTeam.option && typeof this.relationChartUserAndTeam.option === "object") {
        this.relationChartUserAndTeam.chart.setOption(this.relationChartUserAndTeam.option, true);
      }
    },
    createRelationChartUserAndUser(){
      let dom = document.getElementById("relationChartUserAndUser")
      this.relationChartUserAndUser.chart = this.$echarts.init(dom)
      this.relationChartUserAndUser.option = {
        title:{
          text: "用户和用户之间的关注关系",
          top: "bottom",
          left: "center",
          textStyle: {
            fontSize: 15,
          }
        },
        tooltip:{},
        animationDuration: 1500,
        animationEasingUpdate: "quinticInOut",
        series: [{
          name: '用户和用户之间的关注关系',
          type: 'graph',
          layout: "circular",
          roam: true,//设置可以拖拽和缩放
          label: {
            position: 'right',
            formatter: '{b}'
          },
          lineStyle: {
            color: 'source',
            curveness: 0.3
          },
          //focusNodeAdjacency: true,//设置突出显示
          links: this.relationChartUserAndUser.links,
          data: this.relationChartUserAndUser.data
        }]
      }
      if (this.relationChartUserAndUser.option && typeof this.relationChartUserAndUser.option === "object") {
        this.relationChartUserAndUser.chart.setOption(this.relationChartUserAndUser.option, true);
      }

    },
    /*********************************************************************************************/
    addData() {
      let that = this;
      setInterval(function () {
        that.updateData()
        /*********************************************************************************/
        that.relationChartUserAndUser.chart.setOption({
          series: [{
            name: '用户和用户之间的关注关系',
            type: 'graph',
            layout: "circular",
            roam: true,//设置可以拖拽和缩放
            //focusNodeAdjacency: true,//设置突出显示
            label: {
              position: 'right',
              formatter: '{b}'
            },
            lineStyle: {
              color: 'source',
              curveness: 0.3
            },
            links: that.relationChartUserAndUser.links,
            data: that.relationChartUserAndUser.data
          }]
        }),
          that.relationChartUserAndTeam.chart.setOption({
            series: [{
              name: '用户和球队之间的喜爱关系',
              type: 'graph',
              force:{
                repulsion:1000
              },
              layout: "force",
              roam: true,//设置可以拖拽和缩放
              focusNodeAdjacency: true,//设置突出显示
              links: that.relationChartUserAndTeam.links,
              data: that.relationChartUserAndTeam.data,
              categories: [{
                name: "球队"
              }, {
                name: "粉丝"
              }],
            }]
          })
          /*********************************************************************************/
      }, 1000)
      // if (this.lineChart.option && typeof this.lineChart.option === "object") {
      //   this.lineChart.chart.setOption(this.lineChart.option, true);
      // }
    },
    updateData() {
      this.$axios.post('/getList/getMap')
        .then((response) => {
          let array = []

        })
        .catch(function (error) {
          console.log(error)
        })
        .then(function () {
          // always executed
        })

      //在这里进行数据的获取，生成关系图
      /**********************************************************************/
      this.relationChartUserAndUser.data = []
      this.relationChartUserAndUser.data.push({id :"1",name :"ddd"},{id :"2",name :"ccc"})
      this.relationChartUserAndUser.links = []
      this.relationChartUserAndUser.links.push({source :"1",target :"2"})
      let myChart = this.relationChartUserAndUser.chart
      let myData = this.relationChartUserAndUser.data
      let myLinks = this.relationChartUserAndUser.links
      //alert("myname4")

      $.get('../data/mygraph1.gexf', function (xml) {
        alert("myname2")
        var graph = echarts.dataTool.gexf.parse(xml);
        alert("myname");
        graph.nodes.forEach(function (node) {
          alert(node);
          node.itemStyle = null;
          node.value = node.symbolSize;
          node.symbolSize /= 1.5;
          node.label = {
            normal: {
              show: node.symbolSize > 10
            }
          };
          node.category = node.attributes.modularity_class;
        });
        myData.push(graph.data);
        myLinks.push(graph.links);
        //myChart.setOption(option);
      }, 'xml');
      this.relationChartUserAndTeam.data = []
      this.relationChartUserAndTeam.data.push({id :"1",name :"江苏苏宁易购",category :0},{id :"2",name :"球迷1",category :1})
      this.relationChartUserAndTeam.links = []
      this.relationChartUserAndTeam.links.push({source :"1",target :"2"})
      /**********************************************************************/
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

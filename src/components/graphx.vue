<template>
  <div id="Chart">
    {{ message }}
    <Button v-on:click="start()">start</Button>
    <div class="content">
      <!-- ******************************************************************************** -->
      <!-- 显示用户与用户之间的关注关系 -->
      <!--<div id="relationChartUserAndUser" :style="{width: '50%', height: '600px'}"></div>-->
      <!-- 显示用户与球队之间的喜爱关系 -->
      <div id="relationChartUserAndTeam" :style="{width: '50%', height: '500px'}"></div>
      <!-- 显示影响力前十的用户的信息（昵称、性别、喜欢的球队） -->
      <div :stylr="{width: '50%' , height: '500px'}">
        <Table border id="tableImpactUser1" height="470" width="600" :columns="columns1" :data="data1"></Table>
        <span>影响力球迷</span>
      </div>
<!--      <div :stylr="{width: '30%' , height: '500px'}">-->
<!--        <Table border id="tableImpactUser2" height="470" width="450" :columns="columns2" :data="data2"></Table>-->
<!--        <span>影响力球迷</span>-->
<!--      </div>-->
      <!-- ******************************************************************************** -->

    </div>
  </div>
</template>

<script>
import china from '../assets/china'
import $ from 'jquery'
import echarts from 'echarts'
import dataTool from '../../build/dataTool.js'

export default {
  name: 'GraphxEchart',
  data() {
    return {
      // columns2: [
      //   {
      //     title: '球队',
      //     key: 'team'
      //   },
      //   {
      //     title: '大V球迷',
      //     key: 'biguser',
      //     width: 150,
      //     align: 'center',
      //     render: (h, params) => {
      //       return h('div', [
      //         h('Button', {
      //           props: {
      //             type: 'primary',
      //             size: 'small'
      //           },
      //           style: {
      //             marginRight: '5px'
      //           },
      //           on: {
      //             click: () => {
      //               this.show(params.index)
      //             }
      //           }
      //         }, 'View')
      //       ]);
      //     }
      //   },
      //   {
      //     title: '活跃球迷',
      //     key: 'acuser',
      //     width: 150,
      //     align: 'center',
      //     render: (h, params) => {
      //       return h('div', [
      //         h('Button', {
      //           props: {
      //             type: 'primary',
      //             size: 'small'
      //           },
      //           style: {
      //             marginRight: '5px'
      //           },
      //           on: {
      //             click: () => {
      //               this.show(params.index)
      //             }
      //           }
      //         }, 'View')
      //       ]);
      //     }
      //   }
      // ],
      // data2:[],

      message: null,
        columns1: [
          {
            title: '排名',
            key: 'rank'
          },
          {
            title: '昵称',
            key: 'name'
          },
          {
            title: '性别',
            key: 'sex'
          },
          {
            title: '喜欢的球队',
            key: 'liketeam'
          }
        ],
        data1: [],
      // },
      /*****/
      // relationChartUserAndUser: {
      //   chart: null,
      //   data: [],
      //   links: []
      // },
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
    // this.createRelationChartUserAndUser()
    this.createRelationChartUserAndTeam()
    //this.createTableImpactUser1()
    /*****/
  },
  methods: {
    start() {
      this.addData();
    },
    // randomData() {
    //   return Math.round(Math.random() * 500);
    // },
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
          itemStyle: {
            borderColor: '#fff',
            borderWidth: 1,
            shadowBlur: 10,
            shadowColor: 'rgba(0, 0, 0, 0.3)'
          },
          label: {
            position: 'right',
            formatter: '{b}'
          },
          lineStyle: {
            color: 'source',
            curveness: 0.3
          },
          emphasis: {
            lineStyle: {
              width: 10
            }
          },
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
    // createRelationChartUserAndUser(){
    //   let dom = document.getElementById("relationChartUserAndUser")
    //   this.relationChartUserAndUser.chart = this.$echarts.init(dom)
    //   this.relationChartUserAndUser.option = {
    //     title:{
    //       text: "用户和用户之间的关注关系",
    //       top: "bottom",
    //       left: "center",
    //       textStyle: {
    //         fontSize: 15,
    //       }
    //     },
    //     tooltip:{},
    //     animationDuration: 1500,
    //     animationEasingUpdate: "quinticInOut",
    //     series: [{
    //       name: '用户和用户之间的关注关系',
    //       type: 'graph',
    //       layout: "circular",
    //       circular: {
    //         rotateLabel: true
    //       },
    //       roam: true,//设置可以拖拽和缩放
    //       label: {
    //         position: 'right',
    //         formatter: '{b}'
    //       },
    //       // lineStyle: {
    //       //   color: 'source',
    //       //   curveness: 0.3
    //       // },
    //       //focusNodeAdjacency: true,//设置突出显示
    //       links: this.relationChartUserAndUser.links,
    //       data: this.relationChartUserAndUser.data
    //     }]
    //   }
    //   if (this.relationChartUserAndUser.option && typeof this.relationChartUserAndUser.option === "object") {
    //     this.relationChartUserAndUser.chart.setOption(this.relationChartUserAndUser.option, true);
    //   }

    // },
    /*********************************************************************************************/
    addData() {
      let that = this;
      setInterval(function () {
        that.updateData()
        /*********************************************************************************/
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
            itemStyle: {
              borderColor: '#fff',
              borderWidth: 1,
              shadowBlur: 10,
              shadowColor: 'rgba(0, 0, 0, 0.3)'
            },
            label: {
              position: 'right',
              formatter: '{b}'
            },
            lineStyle: {
              color: 'source',
              curveness: 0.3
            },
            emphasis: {
              lineStyle: {
                width: 10
              }
            },
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
      this.$axios.get('/getList/getGraphxData')
        .then((response) => {
          // alert('why?')
          let array = []
          this.data1 = [];
          //console.log(response.data.data.rankArray)
          array = JSON.parse(JSON.stringify(response.data.data.rankArray))
          for (let i = 0; i < array.length; i++) {
            console.log(array[i])
            const obj = { // 关键！ 创建一个新对象
              rank: array[i].id,
              name: '未知',
              sex: '未知',
              liketeam: '未知'
            }
            this.data1.push(obj)
          }

        })
        .catch(function (error) {
          console.log(error)
        })
        .then(function () {
          // always executed
        })


      //在这里进行数据的获取，生成关系图
      /**********************************************************************/
      this.relationChartUserAndTeam.data = []
      this.relationChartUserAndTeam.links = []
      let myChart = this.relationChartUserAndTeam.chart
      this.$axios. get('/download/mygraph.gexf').then(res => {
        let graph = echarts.dataTool.gexf.parse(res.data)
        graph.nodes.forEach(function (node) {
          //alert(node.name[1]);
          // node.itemStyle = null;
          // node.value = node.symbolSize;
          // node.symbolSize /= 1.5;
          // node.label = {
          //   normal: {
          //     show: node.symbolSize > 10
          //   }
          // };
          // if(node.name[1] == 'u'){
          //   //alert('yonghu')
          //   node.category = 1;
          // }else{
          //   node.category = 0;
          // }
          node.category = node.name[1] == 'u' ? 1 : 0;
        });
        graph.links.forEach(function (link){
          //alert(link.name)
          link.value = link.name;
        })
        myChart.setOption({
          series: [
            {
              name: '用户和球队之间的喜爱关系',
              type: 'graph',
              force:{
                repulsion:1000
              },
              layout: "force",
              roam: true,//设置可以拖拽和缩放
              focusNodeAdjacency: true,//设置突出显示
              edgeLabel: {
                normal: {
                  formatter:"{c}",
                  show:true
                }
              },
              edgeSymbol: ['none', 'arrow'],
              itemStyle: {
                borderColor: '#fff',
                borderWidth: 1,
                shadowBlur: 10,
                shadowColor: 'rgba(0, 0, 0, 0.3)'
              },
              label: {
                position: 'right',
                formatter: '{b}'
              },
              lineStyle: {
                color: 'source',
                curveness: 0.3
              },
              emphasis: {
                lineStyle: {
                  width: 10
                }
              },
              links: graph.links,
              data: graph.nodes,

              categories: [{
                name: "球队"
              }, {
                name: "粉丝"
              }],
            }
          ]
        });
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

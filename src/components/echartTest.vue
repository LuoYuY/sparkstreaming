<template>
  <div id="Chart">
    {{ message }}
    <Button v-on:click="start()">start</Button>
    <div class="content">
      <div id="map-wrap" :style="{width: '33%', height: '400px'}"></div>
      <div id="barChartSimple" :style="{width: '33%', height: '400px'}"></div>
      <!--      <div id="barChartStatic" :style="{width: '800px', height: '600px'}"></div>-->
      <div id="barChartHomeTeam" :style="{width: '33%', height: '400px'}"></div>
      <div id="lineChart" :style="{width: '33%', height: '400px'}"></div>
      <!-- 这里以后是地图 -->

      <!-- ******************************************************************************** -->
      <!-- 显示男女比例的饼状图 -->
      <div id="pieSex" :style="{width: '33%', height: '400px'}"></div>
      <!-- 显示用户与用户之间的关注关系 -->
      <div id="relationChartUserAndUser" :style="{width: '33%', height: '400px'}"></div>
      <!-- 显示用户与球队之间的喜爱关系 -->
      <div id="relationChartUserAndTeam" :style="{width: '33%', height: '400px'}"></div>
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
      mapChart: {
        chart: null,
        option: null,
        dataMap: []
      },
      lineChart: {
        chart: null,
        option: null,
        time: ['0-1', '1-2', '2-3', '3-4', '4-5', '5-6', '6-7', '7-8', '8-9', '9-10',
          '10-11', '11-12', '12-13', '13-14', '14-15', '15-16', '16-17', '17-18', '18-19', '19-20', '20-21', '21-22', '22-23', '23-24'],
        data: []
      },
      barChartSimple: {
        chart: null,
        option: null,
        category: ['cate1', 'cate2'],
        data: []
      },
      barChartStatic: {
        chart: null,
        option: null,
        category: ['cate1', 'cate2', 'cate3'],
        data: []
      },
      barChartHomeTeam: {
        chart: null,
        option: null,
        category: [],
        data: []
      },
      /*****/
      pieSex: {
        chart: null,
        data: []
      },
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
    this.createLineTable()
    this.createBarTable()
    this.createMap()
    this.createBarChartHomeTeam()
    /*****/
    this.createPieSex()
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
    createMap() {
      this.mapChart.chart = this.$echarts.init(document.getElementById('map-wrap'));
      this.mapChart.option = {
        geo: {
          map: 'china',//地图类型为中国地图,要是世界那就是world,要是省市区：例如beijing、shanghai
        },
        tooltip: {
          formatter: function (params) {
            var info = '<p style="font-size:8px">' + params.name + '</p><p style="font-size:8px">'+params.value+'人</p>'
            return info;
          },
          backgroundColor: "#575555",//提示标签背景颜色
          textStyle: {color: "#fff"} //提示标签字体颜色
        },
//左侧小导航图标
        visualMap: {
          align: "auto", //指定组件中手柄和文字的摆放位置.可选值为：‘auto’ 自动决定。‘left’ 手柄和label在右。‘right’ 手柄和label在左。‘top’ 手柄和label在下。‘bottom’ 手柄和label在上。
          left: "3%", //组件离容器左侧的距离,‘left’, ‘center’, ‘right’,‘20%’
          top: "3% ", //组件离容器上侧的距离,‘top’, ‘middle’, ‘bottom’,‘20%’
          right: "auto", //组件离容器右侧的距离,‘20%’
          bottom: "auto", //组件离容器下侧的距离,‘20%’
          orient: "vertical", //图例排列方向
          show: true,
          x: 'left',
          y: 'center',
          splitList: [
            {start: 50, end: 60}, {start: 40, end: 50},
            {start: 30, end: 40}, {start: 20, end: 30},
            {start: 10, end: 20}, {start: 0, end: 10},
          ],
          color: ['#e70707', '#f13131', '#f59797',
            '#eecece', '#eecece', '#f3eded'],
          itemWidth: 10,
          itemHeight: 5
        },
        series: [
          {
            name: '中国',
            type: 'map',
            mapType: 'china',

            label: {
              normal: {
                show: false,//显示省份标签
              },
              emphasis: {
                show: true,//对应的鼠标悬浮效果
              }
            },
            data: this.mapChart.dataMap
          }
        ]
      }
      this.mapChart.chart.setOption(this.mapChart.option)
    },
    createBarTable() {
      let dom = document.getElementById("barChartSimple")
      this.barChartSimple.chart = this.$echarts.init(dom)
      this.barChartSimple.option = {
        xAxis: {
          type: 'category',
          data: this.barChartSimple.category
        },
        yAxis: {
          type: 'value'
        },
        series: [
          {
            name: 'VALUE',
            type: 'bar',
            data: this.barChartSimple.data
          }
        ]
      }
      if (this.barChartSimple.option && typeof this.barChartSimple.option === "object") {
        this.barChartSimple.chart.setOption(this.barChartSimple.option, true);
      }
    },
    createBarChartHomeTeam() {
      let dom = document.getElementById("barChartHomeTeam")
      this.barChartHomeTeam.chart = this.$echarts.init(dom)
      // this.addData();
      this.barChartHomeTeam.option = {
        color: ['#1c8941'],
        // title: "barChartHomeTeam",
        tooltip: {
          show: true
        },
        legend: {
          data: ['人数']
        },
        xAxis: {
          type: 'category',
          data: this.barChartHomeTeam.category,
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
            data: this.barChartHomeTeam.data,
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
      if (this.barChartHomeTeam.option && typeof this.barChartHomeTeam.option === "object") {
        this.barChartHomeTeam.chart.setOption(this.barChartHomeTeam.option, true);
      }
    },
    createLineTable() {
      let dom = document.getElementById("lineChart")
      this.lineChart.chart = this.$echarts.init(dom)
      // this.addData();
      this.lineChart.option = {
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: this.lineChart.time
        },
        yAxis: {
          boundaryGap: [0, '200%'],
          type: 'value'
        },
        series: [
          {
            name: 'VALUE',
            type: 'line',
            smooth: true,
            symbol: 'none',
            stack: 'a',
            areaStyle: {
              normal: {}
            },
            data: this.lineChart.data
          }
        ]
      }
      if (this.lineChart.option && typeof this.lineChart.option === "object") {
        this.lineChart.chart.setOption(this.lineChart.option, true);
      }
    },
    /*****************************************************************************************/
    createPieSex(){
      let dom = document.getElementById("pieSex")
      this.pieSex.chart = this.$echarts.init(dom)
      this.pieSex.option = {
        title: {
          text: '用户男女比例',
          top: 'bottom',
          left: 'center'
        },
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c} ({d}%)'
        },
        legend: {
          orient: 'vertical',
          left: 'left',
          data: ['男', '女', '未知', '保密']
        },
      }
    },
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
        }),
        /*********************************************************************************/
        that.mapChart.chart.setOption({
          series: [{
            name: '中国',
            type: 'map',
            mapType: 'china',
            label: {
              normal: {
                show: false,//显示省份标签
              },
              emphasis: {
                show: true,//对应的鼠标悬浮效果
              }
            },
            data: that.mapChart.dataMap
          }]
        }),
        that.lineChart.chart.setOption({
          series: [{
            name: 'VALUE',
            data: that.lineChart.data
          }]
        })
        that.barChartSimple.chart.setOption({
          series: [{
            name: 'VALUE',
            data: that.barChartSimple.data
          }]
        })
        that.barChartHomeTeam.chart.setOption({
          xAxis: {
            type: 'category',
            data: that.barChartHomeTeam.category
          },
          series: [{
            name: 'VALUE',
            data: that.barChartHomeTeam.data
          }]
        })
      }, 1000)
      // if (this.lineChart.option && typeof this.lineChart.option === "object") {
      //   this.lineChart.chart.setOption(this.lineChart.option, true);
      // }
    },
    updateData() {
      this.$axios.post('/getList/getMap')
        .then((response) => {
          let array = []
          this.barChartHomeTeam.category = [];
          this.barChartHomeTeam.data = [];
          array = JSON.parse(JSON.stringify(response.data.data.teamArray))
          for (let i = 0; i < array.length; i++) {
            // const obj = { // 关键！ 创建一个新对象
            //   id: i + 1,
            //   name: array[i].name,
            //   reason: array[i].reason,
            //   createDate: array[i].createDate.slice(1),
            //   status: status
            // }
            this.barChartHomeTeam.category.push(array[i].hometeam)
            this.barChartHomeTeam.data.push(array[i].number)
          }

          let array2 = []
          this.mapChart.dataMap = [];
          array2 = JSON.parse(JSON.stringify(response.data.data.regionArray))
          for (let i = 0; i < array2.length; i++) {
            const obj = { // 关键！ 创建一个新对象
              name: array2[i].name,
              value: array2[i].value,
            }
            this.mapChart.dataMap.push(obj)
          }

          let specialMap = [];
          // 对dataMap进行处理，使其可以直接在页面上展示
          for (let i = 0; i < specialMap.length; i++) {
            for (let j = 0; j < this.mapChart.dataMap.length; j++) {
              if (specialMap[i] == this.mapChart.dataMap[j].name) {
                this.mapChart.dataMap[j].selected = true;
                break;
              }
            }
          }

          // [
          //   {name: '北京', value: '100'}
          // "data": {
          //   "regionArray": [
          //     {
          //       "北京": 8
          //     },
          //
          // this.message = response.data.status
          // console.log(response)
        })
        .catch(function (error) {
          console.log(error)
        })
        .then(function () {
          // always executed
        })

      this.lineChart.data = []
      for (let i = 0; i < 24; i++) {
        this.lineChart.data.push((Math.random() - 0.4) * 10 + this.lineChart.data[this.lineChart.data.length - 1]);
      }
      this.barChartSimple.data = []
      for (let i = 0; i < 2; i++) {
        // this.barChartSimple.data.shift();
        this.barChartSimple.data.push(Math.random() * 150);
      }
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

      $.get('../data/mygraph.gexf', function (xml) {
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

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
    }
  },
  mounted() {
    this.createLineTable()
    this.createBarTable()
    this.createMap()
    this.createBarChartHomeTeam()
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
    addData() {
      let that = this;
      setInterval(function () {
        that.updateData()
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

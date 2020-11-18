<template>
  <div id="Chart">
    {{ message }}
    <Button v-on:click="start()">start</Button>
    <div class="content">
      <div id="map-wrap" :style="{width: '500px', height: '500px'}"></div>

      <div id="barChartSimple" :style="{width: '800px', height: '600px'}"></div>
      <!--      <div id="barChartStatic" :style="{width: '800px', height: '600px'}"></div>-->
      <div id="lineChart" :style="{width: '800px', height: '600px'}"></div>
      <!-- 这里以后是地图 -->

    </div>
  </div>
</template>

<script>
import china from '../assets/china'

export default {
  name: 'Echart',
  data() {
    return {
      message: null,
      mapChart: {
        chart: null,
        option: null,
        data: []
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
      }
    }
  },
  mounted() {
    this.createLineTable()
    this.createBarTable()
    this.createMap()
  },
  methods: {
    start() {
      this.addData();
    },
    randomData() {
      return Math.round(Math.random() * 500);
    },
    createMap() {
      let dataMap = [
        {name: '北京', value: '100'}, {name: '天津', value: this.randomData()},
        {name: '上海', value: this.randomData()}, {name: '重庆', value: this.randomData()},
        {name: '河北', value: this.randomData()}, {name: '河南', value: this.randomData()},
        {name: '云南', value: this.randomData()}, {name: '辽宁', value: this.randomData()},
        {name: '黑龙江', value: this.randomData()}, {name: '湖南', value: this.randomData()},
        {name: '安徽', value: this.randomData()}, {name: '山东', value: this.randomData()},
        {name: '新疆', value: this.randomData()}, {name: '江苏', value: this.randomData()},
        {name: '浙江', value: this.randomData()}, {name: '江西', value: this.randomData()},
        {name: '湖北', value: this.randomData()}, {name: '广西', value: this.randomData()},
        {name: '甘肃', value: this.randomData()}, {name: '山西', value: this.randomData()},
        {name: '内蒙古', value: this.randomData()}, {name: '陕西', value: this.randomData()},
        {name: '吉林', value: this.randomData()}, {name: '福建', value: this.randomData()},
        {name: '贵州', value: this.randomData()}, {name: '广东', value: this.randomData()},
        {name: '青海', value: this.randomData()}, {name: '西藏', value: this.randomData()},
        {name: '四川', value: this.randomData()}, {name: '宁夏', value: this.randomData()},
        {name: '海南', value: this.randomData()}, {name: '台湾', value: this.randomData()},
        {name: '香港', value: this.randomData()}, {name: '澳门', value: this.randomData()}, {name: '南海诸岛', value: this.randomData()}
      ]
      let specialMap = [];
      // 对dataMap进行处理，使其可以直接在页面上展示
      for (var i = 0; i < specialMap.length; i++) {
        for (var j = 0; j < dataMap.length; j++) {
          if (specialMap[i] == dataMap[j].name) {
            dataMap[j].selected = true;
            break;
          }

        }
      }
      this.mapChart.chart = this.$echarts.init(document.getElementById('map-wrap'));
      this.mapChart.option = {
        geo: {
          map: 'china',//地图类型为中国地图,要是世界那就是world,要是省市区：例如beijing、shanghai
        },
        tooltip: {
          formatter: function (params) {
            var info = '<p style="font-size:18px">' + params.name + '</p><p style="font-size:14px">这里可以写一些，想展示在页面上的别的信息</p>'
            return info;
          },
          backgroundColor: "#ff7f50",//提示标签背景颜色
          textStyle: {color: "#fff"} //提示标签字体颜色
        },
//左侧小导航图标
        visualMap: {
          show: true,
          x: 'left',
          y: 'center',
          splitList: [
            {start: 500, end: 600}, {start: 400, end: 500},
            {start: 300, end: 400}, {start: 200, end: 300},
            {start: 100, end: 200}, {start: 0, end: 100},
          ],
          color: ['#e70707', '#f13131', '#f59797',
            '#eecece', '#eecece', '#f3eded']
        },
        series: [
          {
            name: '中国',
            type: 'map',
            mapType: 'china',

            label: {
              normal: {
                show: true,//显示省份标签
              },
              emphasis: {
                show: true,//对应的鼠标悬浮效果
              }
            },

            data: dataMap
          }
        ]
      }
      this.mapChart.chart.setOption(this.mapChart.option)
    },
    createBarTable() {
      let dom = document.getElementById("barChartSimple")
      this.barChartSimple.chart = this.$echarts.init(dom)
      // this.addData();
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
      }, 2000)
      // if (this.lineChart.option && typeof this.lineChart.option === "object") {
      //   this.lineChart.chart.setOption(this.lineChart.option, true);
      // }
    },
    updateData() {
      this.$axios.post('/getList/stream')
        .then((response) => {
          this.message = response.data.status
          console.log(response)
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
  display: flex;
}
</style>

<template>
  <div id="Chart">
    {{ message }}
    <Button v-on:click="start()">start</Button>
    <div class="content">
      <div id="lineChart" :style="{width: '800px', height: '600px'}"></div>
      <div id="barChartSimple" :style="{width: '800px', height: '600px'}"></div>
      <div id="barChartStatic" :style="{width: '800px', height: '600px'}"></div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'Echart',
  data() {
    return {
      message: null,
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
        category: ['cate1', 'cate2','cate3'],
        data: []
      }
    }
  },
  mounted() {
    this.createLineTable()
    this.createBarTable()
  },
  methods: {
    start() {
      this.addData();
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

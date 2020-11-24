<template>
  <div id="Chart">
    {{ message }}
    <Button v-on:click="start()">数据显示</Button>
    <Button v-on:click="stop">停止</Button>
    <Button v-on:click="startStreaming()">启动流写入</Button>


    <div class="content" style="margin-top: 50px">
      <div id="dynamicGraph" :style="{width: '33%', height: '400px'}">
        <DatePicker type="date"  format="yyyy-MM-dd" placeholder="right"  @on-change="barChartSimple.rightDate=$event" v-model="barChartSimple.rightDate" ></DatePicker>
        <DatePicker type="date"  format="yyyy-MM-dd" placeholder="left"  @on-change="barChartSimple.leftDate=$event" v-model="barChartSimple.leftDate" ></DatePicker>
        <Button v-on:click="getDynamicData">submit</Button>
        <div id="barChartSimple" :style="{width: '100%', height: '400px'}"></div>
        <p style="margin-top: -30px">{{ barChartSimple.title }}</p>
      </div>
      <div id="dateChart" :style="{width: '33%', height: '400px'}">
        <!--        v-model="lineChart.date"-->
        <DatePicker type="date"  format="yyyy-MM-dd" placeholder="时间"  @on-change="lineChart.date=$event" v-model="lineChart.date" ></DatePicker>
        <Button v-on:click="getDayData">submit</Button>
        <Button v-on:click="stop">stop</Button>
        <div id="lineChart" :style="{width: '100%', height: '400px'}"> </div>
      </div>
    </div>
  </div>
</template>

<script>
import china from '../assets/china'
require('echarts-wordcloud')
export default {
  name: 'Echart',
  data() {
    return {
      timer:null,
      message: null,
      lineChart: {
        chart: null,
        option: null,
        time: ['0-2h', '2-4h', '4-6h', '6-8h', '8-10h', '10-12h', '12-14h', '14-16h', '16-18h', '18-20h', '20-22h', '22-24h'],
        data: []
      },
      barChartSimple: {
        title: null,
        chart: null,
        option: null,
        leftDate:null,
        rightDate:null,
        time: ['0-2', '2-4', '4-6', '6-8', '8-10', '10-12', '12-14', '14-16', '16-18', '18-20', '20-22', '22-24'],
        category: ['比赛日', '非比赛日'],
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
    stop() {
      clearInterval(this.timer);
    },
    startStreaming() {
      alert(" in start ")
      this.$axios.get('/getList/start?type=comment')
        .then((response) => {
          console.log(response)
        })
        .catch(function (error) {
          console.log(error)
        })
        .then(function () {
          // always executed
        })
    },
    getDynamicData() {
      let arrayLeft = []
      let arrayRight = []
      console.log(this.barChartSimple.leftDate)
      console.log(this.barChartSimple.rightDate)
      this.$axios.get('/getList/getDayData?date=' + this.barChartSimple.leftDate)
        .then((response) => {
          arrayLeft = JSON.parse(JSON.stringify(response.data.data.obj.array))
        })
        .catch(function (error) {
          console.log(error)
        })
        .then(function () {
          // always executed
        })
      this.$axios.get('/getList/getDayData?date=' + this.barChartSimple.rightDate)
        .then((response) => {
          arrayRight= JSON.parse(JSON.stringify(response.data.data.obj.array))
        })
        .catch(function (error) {
          console.log(error)
        })
        .then(function () {
          // always executed
        })
      let that = this
      for(let i=0; i<that.barChartSimple.time.length; i++) {
        //clearTimeout(this.timer);  //清除延迟执行
        (function(i) {
          setTimeout(function() {
            console.log(i);
            that.barChartSimple.data = [];
            that.barChartSimple.title = that.barChartSimple.time[i];
            that.barChartSimple.data.push(arrayLeft[i])
            that.barChartSimple.data.push(arrayRight[i])
            console.log("left:"+arrayLeft[i])
            that.barChartSimple.chart.setOption({
              series: [{
                name: 'VALUE',
                data: that.barChartSimple.data
              }]
            });
          }, (i + 1) * 1000);
        })(i)
      }
    },
    getDayData() {
      console.log(this.lineChart.date)
      let that = this;
      this.timer = setInterval(function () {
        that.$axios.get('/getList/getDayData?date=' + that.lineChart.date)
          .then((response) => {
            that.lineChart.data = []
            let array = []
            array = JSON.parse(JSON.stringify(response.data.data.obj.array))
            //array = response.data.data.obj.array
            for (let i = 0; i < array.length; i++) {
              that.lineChart.data.push(array[i])
              console.log(array[i])
            }
          })
          .catch(function (error) {
            console.log(error)
          })
          .then(function () {
            // always executed
          })
        that.lineChart.chart.setOption({
          series: [{
            name: 'VALUE',
            data: that.lineChart.data
          }]
        });
      },1000)
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
        color: ['#e27a13'],
        // title: "barChartHomeTeam",
        tooltip: {
          show: true
        },
        xAxis: {
          type: 'category',
          data: this.lineChart.time,
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
            data: this.lineChart.data,
          }
        ]
      }
      if (this.lineChart.option && typeof this.lineChart.option === "object") {
        this.lineChart.chart.setOption(this.lineChart.option, true);
      }
    },
    addData() {
      let that = this;
      // this.timer = setInterval(function () {
      //   //that.updateData()
      // }, 1000)
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


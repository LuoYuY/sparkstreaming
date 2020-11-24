<template>
  <div id="Chart">
    {{ message }}
    <Button v-on:click="start()">start</Button>
    <Button v-on:click="stop">stop</Button>
    <div class="content" style="margin-top: 50px">
      <div id="map-wrap" :style="{width: '33%', height: '400px'}"></div>
      <div id="dynamicGraph" :style="{width: '33%', height: '400px'}">
        <DatePicker type="date"  format="yyyy-MM-dd" placeholder="left"  @on-change="barChartSimple.leftDate=$event" v-model="barChartSimple.leftDate" ></DatePicker>
        <DatePicker type="date"  format="yyyy-MM-dd" placeholder="right"  @on-change="barChartSimple.rightDate=$event" v-model="barChartSimple.rightDate" ></DatePicker>
        <Button v-on:click="getDynamicData">submit</Button>
        <p style="margin-top: 10px">{{ barChartSimple.title }}</p>
        <div id="barChartSimple" :style="{width: '100%', height: '400px'}"></div>
      </div>
      <!--      <div id="barChartStatic" :style="{width: '800px', height: '600px'}"></div>-->
      <div id="barChartHomeTeam" :style="{width: '33%', height: '400px'}"></div>
      <div id="dateChart" :style="{width: '33%', height: '400px'}">
<!--        v-model="lineChart.date"-->
        <DatePicker type="date"  format="yyyy-MM-dd" placeholder="时间"  @on-change="lineChart.date=$event" v-model="lineChart.date" ></DatePicker>
        <Button v-on:click="getDayData">submit</Button>
        <Button v-on:click="stop">stop</Button>
        <div id="lineChart" :style="{width: '100%', height: '400px'}"> </div>
      </div>
      <div id="genderChart" :style="{width: '33%', height: '400px'}"></div>
      <div id="wordChart" :style="{width: '33%', height: '400px'}"></div>
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
      mapChart: {
        chart: null,
        option: null,
        dataMap: []
      },
      lineChart: {
        chart: null,
        option: null,
        time: ['0-2', '2-4', '4-6', '6-8', '8-10', '10-12', '12-14', '14-16', '16-18', '18-20', '20-22', '22-24'],
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
      },
      barChartHomeTeam: {
        chart: null,
        option: null,
        category: [],
        data: []
      },
      genderChart: {
        chart: null,
        option: null,
        category: [],
        data: []
      },
      wordChart: {
        chart: null,
        option: null,
        data: []
      }
    }
  },
  mounted() {
    this.createLineTable()
    this.createBarTable()
    this.createMap()
    this.createBarChartHomeTeam()
    this.createGenderChart()
    this.createWordChart()
  },
  methods: {
    start() {
      this.addData();
    },
    stop() {
      clearInterval(this.timer);
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
            var info = '<span style="font-size:8px">' + params.name + '</span><span style="font-size:8px">' + params.value + '人</span>'
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
    createGenderChart() {
      let dom = document.getElementById("genderChart")
      this.genderChart.chart = this.$echarts.init(dom)
      this.genderChart.option = {
        title: {
          text: '性别比',
          // x 设置水平安放位置，默认左对齐，可选值：'center' ¦ 'left' ¦ 'right' ¦ {number}（x坐标，单位px）
          x: 'center',
          // y 设置垂直安放位置，默认全图顶端，可选值：'top' ¦ 'bottom' ¦ 'center' ¦ {number}（y坐标，单位px）
          y: 30,
          // itemGap设置主副标题纵向间隔，单位px，默认为10，
          backgroundColor: '#EEE',
          // 主标题文本样式设置
          textStyle: {
            fontSize: 26,
            fontWeight: 'bolder',
            color: '#000080'
          },
          // 副标题文本样式设置
          subtextStyle: {
            fontSize: 18,
            color: '#8B2323'
          }
        },
        legend: {
          // orient 设置布局方式，默认水平布局，可选值：'horizontal'（水平） ¦ 'vertical'（垂直）
          orient: 'vertical',
          // x 设置水平安放位置，默认全图居中，可选值：'center' ¦ 'left' ¦ 'right' ¦ {number}（x坐标，单位px）
          x: 'left',
          // y 设置垂直安放位置，默认全图顶端，可选值：'top' ¦ 'bottom' ¦ 'center' ¦ {number}（y坐标，单位px）
          y: 'center',
          itemWidth: 24,   // 设置图例图形的宽
          itemHeight: 18,  // 设置图例图形的高
          textStyle: {
            color: '#666'  // 图例文字颜色
          },
          // itemGap设置各个item之间的间隔，单位px，默认为10，横向布局时为水平间隔，纵向布局时为纵向间隔
          itemGap: 30,
          backgroundColor: '#eee',  // 设置整个图例区域背景颜色
          // data: ['北京','上海','广州','深圳','郑州']
          data: this.genderChart.category
        },
        series: [
          {
            name: '生源地',
            type: 'pie',
            // radius: '50%',  // 设置饼状图大小，100%时，最大直径=整个图形的min(宽，高)
            radius: ['30%', '60%'],  // 设置环形饼状图， 第一个百分数设置内圈大小，第二个百分数设置外圈大小
            center: ['50%', '50%'],  // 设置饼状图位置，第一个百分数调水平位置，第二个百分数调垂直位置
            // data: [
            //   {value:335, name:'北京'},
            //   {value:310, name:'上海'},
            //   {value:234, name:'广州'},
            //   {value:135, name:'深圳'},
            //   {value:148, name:'郑州'}
            // ],
            data: this.genderChart.data,
            // itemStyle 设置饼状图扇形区域样式
            itemStyle: {
              // emphasis：英文意思是 强调;着重;（轮廓、图形等的）鲜明;突出，重读
              // emphasis：设置鼠标放到哪一块扇形上面的时候，扇形样式、阴影
              emphasis: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(30, 144, 255，0.5)'
              }
            },
            // 设置值域的那指向线
            labelLine: {
              normal: {
                show: false   // show设置线是否显示，默认为true，可选值：true ¦ false
              }
            },
            // 设置值域的标签
            label: {
              normal: {
                position: 'inner',  // 设置标签位置，默认在饼状图外 可选值：'outer' ¦ 'inner（饼状图上）'
                // formatter: '{a} {b} : {c}个 ({d}%)'   设置标签显示内容 ，默认显示{b}
                // {a}指series.name  {b}指series.data的name
                // {c}指series.data的value  {d}%指这一部分占总数的百分比
                formatter: '{c}'
              }
            }
          }
        ],
        tooltip: {
          // trigger 设置触发类型，默认数据触发，可选值：'item' ¦ 'axis'
          trigger: 'item',
          showDelay: 20,   // 显示延迟，添加显示延迟可以避免频繁切换，单位ms
          hideDelay: 20,   // 隐藏延迟，单位ms
          backgroundColor: 'rgba(255,0,0,0.7)',  // 提示框背景颜色
          textStyle: {
            fontSize: '16px',
            color: '#000'  // 设置文本颜色 默认#FFF
          },
          // formatter设置提示框显示内容
          // {a}指series.name  {b}指series.data的name
          // {c}指series.data的value  {d}%指这一部分占总数的百分比
          formatter: '{b} : {c}个 ({d}%)'
        }
      }
      if (this.genderChart.option && typeof this.genderChart.option === "object") {
        this.genderChart.chart.setOption(this.genderChart.option, true);
      }
    },
    createWordChart() {
      let dom = document.getElementById("wordChart")
      this.wordChart.chart = this.$echarts.init(dom)
      this.wordChart.option = {
        title: {
          text: '昵称词云',//标题
          x: 'center',
          textStyle: {
            fontSize: 23
          }
        },
        backgroundColor: '#F7F7F7',
        tooltip: {
          show: true
        },
        series: [{
          type: 'wordCloud',
          drawOutOfBound:true,
          sizeRange: [6, 200],//画布范围
          rotationRange: [-45, 90],//数据翻转范围
          shape: 'circle',
          textPadding: 0,
          autoSize: {
            enable: true,
            minSize: 6
          },
          textStyle: {
            normal: {
              color: function() {
                return 'rgb(' + [
                  Math.round(Math.random() * 160),
                  Math.round(Math.random() * 160),
                  Math.round(Math.random() * 160)
                ].join(',') + ')';
              }
            },
            emphasis: {
              shadowBlur: 10,
              shadowColor: '#333'
            }
          },
          data: this.wordChart.data//数据
        }]
      }
      if (this.wordChart.option && typeof this.wordChart.option === "object") {
        this.wordChart.chart.setOption(this.wordChart.option, true);
      }
    },
    addData() {
      let that = this;
      this.timer = setInterval(function () {
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
        that.genderChart.chart.setOption({
          legend: {
            data: that.genderChart.category
          },
          series: [
            {
              type: 'pie',
              // radius: '50%',  // 设置饼状图大小，100%时，最大直径=整个图形的min(宽，高)
              radius: ['30%', '60%'],  // 设置环形饼状图， 第一个百分数设置内圈大小，第二个百分数设置外圈大小
              center: ['50%', '50%'],  // 设置饼状图位置，第一个百分数调水平位置，第二个百分数调垂直位置
              // data: [
              //   {value:335, name:'北京'},
              //   {value:310, name:'上海'},
              //   {value:234, name:'广州'},
              //   {value:135, name:'深圳'},
              //   {value:148, name:'郑州'}
              // ],
              data: that.genderChart.data,
              // itemStyle 设置饼状图扇形区域样式
              itemStyle: {
                // emphasis：英文意思是 强调;着重;（轮廓、图形等的）鲜明;突出，重读
                // emphasis：设置鼠标放到哪一块扇形上面的时候，扇形样式、阴影
                emphasis: {
                  shadowBlur: 10,
                  shadowOffsetX: 0,
                  shadowColor: 'rgba(30, 144, 255，0.5)'
                }
              },
              // 设置值域的那指向线
              labelLine: {
                normal: {
                  show: false   // show设置线是否显示，默认为true，可选值：true ¦ false
                }
              },
              // 设置值域的标签
              label: {
                normal: {
                  position: 'inner',  // 设置标签位置，默认在饼状图外 可选值：'outer' ¦ 'inner（饼状图上）'
                  // formatter: '{a} {b} : {c}个 ({d}%)'   设置标签显示内容 ，默认显示{b}
                  // {a}指series.name  {b}指series.data的name
                  // {c}指series.data的value  {d}%指这一部分占总数的百分比
                  formatter: '{c}'
                }
              }
            }
          ]
        })
        that.wordChart.chart.setOption({
          series: [{
            name: '热点分析',//数据提示窗标题
            type: 'wordCloud',
            data: that.wordChart.data
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

          let genderArray = [];
          this.genderChart.category = [];
          this.genderChart.data = [];
          // "genderArray": [
          //   {
          //     "number": 108,
          //     "gender": null,

          // {value:335, name:'北京'},
          genderArray = JSON.parse(JSON.stringify(response.data.data.genderArray))
          for (let i = 0; i < genderArray.length; i++) {
            if(genderArray[i].gender === null) {
              genderArray[i].gender = 'null'
            }
            const obj = { // 关键！ 创建一个新对象
              name: genderArray[i].gender,
              value: genderArray[i].number
            }
            this.genderChart.data.push(obj)
            this.genderChart.category.push(genderArray[i].gender);
          }

          // "wordArray": [
          //   {
          //     "number": 98,
          //     "_id": {
          //       "$oid": "5fb6723b4280fbd9dc0966e2"
          //     },
          //     "word": "的"
          //   },

          let wordArray = []
          this.wordChart.data = [];
          wordArray = JSON.parse(JSON.stringify(response.data.data.wordArray))
          for (let i = 0; i < wordArray.length; i++) {
            const obj = { // 关键！ 创建一个新对象
              name: wordArray[i].word,
              value: wordArray[i].number
            }
            this.wordChart.data.push(obj)
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

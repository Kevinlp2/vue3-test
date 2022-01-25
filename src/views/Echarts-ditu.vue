<template>
  <div class="echarts_ditu">
    <div id="myChart" :style="{ width: '100%', height: '100%' }"></div>
  </div>
</template>

<script>
  import  axios from 'axios'
  export default {
    name: "Echarts-ditu",
    data() {
      return {
        option: {},
      };
    },
    mounted() {

      let myChart = this.$echarts.init(document.getElementById("myChart"));

      axios.get('/api/chongqing.json').then(res=>{
        // console.log('数据:',res.data);
        this.$echarts.registerMap('sc', res.data, {});
        var option = {
          series: [{
            name: '重庆 ',
            type: 'map',
            mapType: 'sc',
            selectedMode : 'multiple',
            zoom: 1, //当前视角的缩放比例
            roam: true, //是否开启平游或缩放
            scaleLimit: { //滚轮缩放的极限控制
              min: 1,
              max: 6
            },
            tooltip: {
              triggerOn: "click",
              formatter: function (e, t, n) {
                // pageInstance.BindEvent(e);
                console.log(e);
                return e.name
              }
            },
            aspectScale: 0.85, //地图长度比

            itemStyle:{ //默认样式
              normal:{
                borderColor:'#39aad7',
                areaColor:'#93bee9',//背景颜色
                label:{
                  show: true,
                }
              }
            },
            emphasis:{ //鼠标移上去样式
              itemStyle:{
                areaColor:'#0571db',
              }
            },
            select:{ //点击选中后样式
              itemStyle:{
                areaColor:'#0571db',
              }
            }
          }]
        };
        myChart.setOption(option);


        myChart.on('click',function (param) {
          console.log('点击:',param);
        })
      })

    },
  }
</script>

<style scoped lang="less">
  .echarts_ditu{
    width: 100%;
    height: 100%;
  }

</style>
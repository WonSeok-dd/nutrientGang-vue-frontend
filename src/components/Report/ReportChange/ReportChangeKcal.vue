<template>

  <div class="fill-height" v-if="isKcalError">
      <v-row justify="center">
          <v-col cols="auto">
              <ServerErrorComponent/>
          </v-col>
      </v-row>
  </div>
  <div v-else>  
    <!--칼로리 정보-->
    <v-row class="mt-3">

      <!--날짜별 섭취 칼로리, (오늘날짜 섭취-날짜별 섭취칼로리)-->
      <v-col cols="auto">
        <h2>{{dateKcal}}<span class="grey--text font-weight-thin">kcal</span></h2>
        <div :class="KcalColor">
          <v-icon :color="KcalIconColor">{{KcalIcon}}</v-icon>{{differKcal}} <span class="grey--text">오늘보다</span>
        </div>
      </v-col>

      <v-spacer></v-spacer>

      <!--섭취 최대 칼로리, 섭취 최소 칼로리-->
      <v-col cols="auto">
        <div>
          <div class="text-right">
            <strong class="red--text">{{maxKcal}}kcal</strong> <span class="grey--text">MAX</span> 
          </div>
          <div class="text-right">
            <strong class="blue--text">{{minKcal}}kcal</strong> <span class="grey--text">MIN</span> 
          </div>
        </div>
      </v-col>
    </v-row>

    <!--칼로리 그래프-->
    <div class="py-3 px-1 border">
      <LineChartGenerator :chart-options="chartOptions" :chart-data="chartData"/>
    </div>
  </div>
</template>

<script>
const ServerErrorComponent = () => import("@/components/ServerErrorComponent.vue");
import { Line as LineChartGenerator } from 'vue-chartjs/legacy'
import {Chart as ChartJS, Title, Tooltip, Legend, LineElement, LinearScale, CategoryScale, PointElement} from 'chart.js'
import ChartDataLabels from 'chartjs-plugin-datalabels';
ChartJS.register(Title, Tooltip, Legend, LineElement, LinearScale, CategoryScale, PointElement, ChartDataLabels);

export default {
  name : 'ReportChangeKcal',
  components: {
    LineChartGenerator,
    "ServerErrorComponent" : ServerErrorComponent
  },

  props : {
    isKcalError : { type : Boolean},
    maxKcal : {type : Number},
    minKcal : {type : Number},
    recommendKcal : {type : Number},
    dateKcal : {type : Number},
    todayKcal : {type: Number},
    kcalLabels : {type : Array},
    kcalData : {type : Array},
  },


  data(){
    return {

      chartData: {
          labels: this.kcalLabels,
          datasets: [     
            {
              label: '칼로리 변화',

              backgroundColor: '#1870d5',    //점 색깔
              pointBorderColor: '#1870d5',   //점 주위 색깔
              borderColor: '#1870d5',        //그래프 색깔
              borderWidth: 2,             //그래프 두께
              
              tension: 0.5,               //휘어짐 정도

              data: this.kcalData,

              datalabels: {
                display : true,
                formatter: function() {
                  return '';
                },

                listeners: {
                  click: (context) => {
                    this.$emit('show-kcalData', this.kcalData[context.dataIndex]);
                  }
                },
              }
            },
          ]
      },
      
      chartOptions: {
        
        responsive: true,
        maintainAspectRatio: false,
        animation: {
          duration: 5000,
        },
        interaction : {
          mode : 'index',
          intersect : false
        },

        //그래프 특징
        plugins: {
              
            //그래프 종류 표시
            legend: {              
                display: true,
                align : 'end',
                fullSize : false,
                labels :{
                  boxWidth : 10,
                  font : {
                    family : 'Jua',
                    size : 13,
                  },
                },

                onClick: () => {
                  //pass
                },
            },

            //그래프 점 표시
            tooltip: {
                callbacks : {
                  //매개변수 -> return 변화 매개변수 
                  label : () => {
                    return '';
                  }
                },
                boxWidth: 10,
                titleFont: {
                  size: 13,
                  family : 'Jua'
                }
            },

            //그래프 제목 표시
            title : {
                display : true,
                font : {
                  family : 'Jua',
                  size : 20
                },
                text : '섭취 칼로리(점 클릭)'
            },
        },
        
        //x축, y축
        scales: {
          x: {
            display: false,
            ticks: {
              padding: 5
            },
            grid: {
              display: false
            },
          },

          y: {
            display : true,
            min : 0,
              
            //y축 label 설정
            ticks: {
              display : true,
              stepSize : 5,
              font : {
                family : 'Jua',
                size : 10,
              },

              callback : (value) => {
                const diff = this.recommendKcal - value;
                if(value % 500 === 0){
                  return value
                }else if( 0 <= diff && diff <= 5){
                  return '권장 칼로리'
                }
              }
            },
            
            grid : {
              display : true,         //이건 default
              drawOnChartArea : true, //이건 default
              drawBorder : false,      
              drawTicks : true,      
              color: function(context) {
                if(context.tick.label === '권장 칼로리'){
                  return 'black'
                }else{
                  return 'rgba(0, 0, 0, 0.1)'
                }
              },
              borderDash : [5,5],
              lineWidth : 1.5
            }

          }
        },
      }

    }
  },

  computed : {

    KcalIcon(){
      if (this.dateKcal - this.todayKcal > 0) {
        //오늘보다 초과
        return 'mdi-menu-up'

      }else if (this.dateKcal - this.todayKcal === 0){
        //오늘보다 유지
        return 'mdi-minus'
      }else{
        //오늘보다 감소
        return 'mdi-menu-down'
      }
    },

    KcalIconColor(){
      if (this.dateKcal - this.todayKcal > 0) {
        //오늘보다 초과
        return 'red'

      }else if (this.dateKcal - this.todayKcal === 0){
        //오늘보다 유지
        return 'grey'
      }else{
        //오늘보다 감소
        return 'blue'
      }
    },

    KcalColor(){
      if (this.dateKcal - this.todayKcal > 0) {
        //오늘보다 초과
        return 'red--text'

      }else if (this.dateKcal - this.todayKcal === 0){
        //오늘보다 유지
        return 'grey--text' 
      }else{
        //오늘보다 감소
        return 'blue--text' 
      }
    },

    differKcal(){
      return Math.abs(this.todayKcal - this.dateKcal);
    }
  }
}
</script>

<style  scoped>
.border {
  border: 3px solid ;
}
</style>
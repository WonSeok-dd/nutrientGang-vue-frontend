<template>

  <div class="fill-height mt-10" v-if="isError">
      <v-row justify="center">
          <v-col cols="auto">
              <ServerErrorComponent/>
          </v-col>
      </v-row>
  </div>
  <div class="text-center mt-10 border" v-else>
    <BarChartGenerator
      :chart-options="chartOptions"
      :chart-data="chartData"
    />
  </div>

</template>

<script>
const ServerErrorComponent = () => import("@/components/ServerErrorComponent.vue");
import Report from '@/api/Report'
import { Bar as BarChartGenerator } from 'vue-chartjs/legacy'
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale} from 'chart.js'
import ChartDataLabels from 'chartjs-plugin-datalabels';

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale, ChartDataLabels)

export default {
  name : 'ReportBalanceBarChart',
  props : {
    dates : {
        type : Array,
        default : () => [
          new Date(new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000).setDate(new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000).getDate() - 6)).toISOString().substr(0,10), 
          new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000).toISOString().substr(0,10)
        ]
    },
  },
  components: {
    BarChartGenerator,
    "ServerErrorComponent" : ServerErrorComponent

  },

  watch : {
    dates : {
      immediate : true,
      handler(dates){
        
        const begin = dates[0];
        const end = dates[1];

        //중요) 필요한 데이터 요청
        Report.getBalanceGraph(begin,end)
        .then((res) =>{
            console.log(res.data.message);
            if(res.data.isSuccess === true && res.data.code === 1000){
                //중요) 요청에 성공하였습니다.
                const weekPortionList = res.data.result.weekPortionList;
                const reverseList = [...weekPortionList].reverse();

                let portionLabels = [];
                let portionCarboData = [];
                let portionProteinData = [];
                let portionFatData = [];
                for (const weekPortion of reverseList){
                  
                  let date = weekPortion.date;
                  let dateArray = date.split('-');
                  const finalDate = dateArray[1] + '.' + dateArray[2];
                  portionLabels.push(finalDate);

                  let carbohydratePortion = weekPortion.carbohydratePortion;
                  const finalCarbohydratePortion = carbohydratePortion * 100;

                  let proteinPortion = weekPortion.proteinPortion;
                  const finalProteinPortion = proteinPortion * 100;

                  let fatPortion = weekPortion.fatPortion;
                  const finalFatPortion = fatPortion * 100;

                  portionCarboData.push(finalCarbohydratePortion);
                  portionProteinData.push(finalProteinPortion);
                  portionFatData.push(finalFatPortion);
                }

                this.chartData.labels = portionLabels;
                this.chartData.datasets[0].data = portionFatData;
                this.chartData.datasets[1].data = portionProteinData;
                this.chartData.datasets[2].data = portionCarboData;

            }else if (res.data.isSuccess === false && res.data.code === "NO_AUTHORIZATION"){
                //중요) 인증 정보 없으니까 로그아웃 후 리다이렉션
                //돌리기 -> 하지만 이미 레이아웃이 그려지기 전에 이미 재발행 받아서 로그인 페이지로 돌려지지 않음
                this.$store.dispatch('logout');
                this.$router.push({
                    name : "sign-in",
                });
            }
        })
        .catch((err)=>{
            //중요) 서버 오류입니다.
            //뜨기 -> alert메시지 뜨기
            console.log(err);
            this.isError = true;
        })
      }
    }
  },

  data() {
    return {

      //에러 판단
      isError : false,

      chartData: {
        labels: ['10.17','10.18','10.19','10.20','10.21','10.22','10.23'],
        datasets: [
          {
            label: '지방',
            stack: 'combined',
            type : 'bar',
            backgroundColor: 'rgb(255, 205, 86)',
            data: [30, 30, 30, 30, 30, 30, 30],
            datalabels: {
                display : false,
            },
          },
          {
            label: '단백질',
            stack: 'combined',
            type : 'bar',
            backgroundColor: 'rgb(54, 162, 235)',
            data: [10, 10, 10, 10, 10, 10, 10],
            datalabels: {
                display : false,
            },
          },
          {
            label: '탄수화물',
            stack: 'combined',
            type : 'bar',
            backgroundColor: 'rgb(255, 99, 132)',
            data: [60, 60, 60, 60, 60, 60, 60],
            datalabels: {
                display : false,
            },
          },
        ]
      },
      chartOptions: {
        responsive: true,
        maintainAspectRatio: false,
        animation: {
          duration: 5000,
        },
        scales: {
            x: {
              stacked: true,
              display: true,

              //x축 label 설정
              ticks: {
                padding: 10,
                font : {
                  family : 'Jua',
                  size : 10,
                },
              },

              grid: {
                display : true,         //이건 default
                drawOnChartArea : true, //이건 default
                drawBorder : true,      
                drawTicks : false,      
              },

            },
            y: {
              stacked: true,
              display : true,
              
              //y축 label 설정
              ticks: {
                display : true,
                stepSize : 5, 
                font : {
                  family : 'Jua',
                  size : 10,
                },

                callback : (value) =>{
                  if(value === 25){
                    return '25%'
                  }else if(value === 50){
                    return '50%'
                  }
                }
              },

              grid : {
                display : true,         //이건 default
                drawOnChartArea : true, //이건 default
                drawBorder : true,      
                drawTicks : true,      
                color: function(context) {
                
                  if (context.tick.value === 25) {
                    return 'rgb(255, 205, 86)';
                  }else if(context.tick.value === 50) {
                    return 'rgb(255, 99, 132)';
                  }
                },
              }

            }
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
                    label : (tooltipItem) => {
                        const text = tooltipItem.dataset.label + '(' + tooltipItem.formattedValue + '%)';
                        return text;
                    }
                },
                boxWidth: 10,
                titleFont: {
                    size: 14,
                    family : 'Jua'
                },
                bodyFont : {
                    size: 13,
                    family : 'Jua'
                },
            },

            //그래프 제목 표시
            title : {
                display : true,
                font : {
                    family : 'Jua',
                    size : 20
                },
                text : '일주일 간 섭취 비율(%)'
            },
        },
        
      }
    }
  }
}
</script>
<style  scoped>
.border {
  border: 3px solid ;
}
</style>
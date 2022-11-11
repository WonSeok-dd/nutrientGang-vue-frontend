<template>
  <div>
    <div class="mb-3">
        <v-chip-group mandatory active-class="primary--text" v-model="selectedTag">
          <v-chip v-for="tag in tags" :key="tag">
            {{ tag }}
          </v-chip>
        </v-chip-group>
    </div>

    <v-divider></v-divider>

    <!--칼로리 chip-->
    <div v-if="selectedTag === 0">
      <ReportChangeKcal
      v-on:show-kcalData="showKcalData"
      :isKcalError="isKcalError"
      :maxKcal="maxKcal"
      :minKcal="minKcal"
      :dateKcal="dateKcal"
      :todayKcal="todayKcal"
      :recommendKcal="recommendKcal"
      :kcalLabels="kcalLabels"
      :kcalData="kcalData"/>
    </div>

    <!--몸무게 chip-->
    <div v-else>
      <ReportChangeWeight
      v-on:show-weightData="showWeightData"
      :isKgError="isKcalError"
      :maxKg="maxKg"
      :minKg="minKg"
      :dateKg="dateKg"
      :todayKg="todayKg"
      :kgLabels="kgLabels"
      :kgData="kgData"/>
    </div>

  </div>
</template>

<script>
import Report from '@/api/Report';
const ReportChangeKcal = () => import("@/components/Report/ReportChange/ReportChangeKcal.vue");
const ReportChangeWeight = () => import("@/components/Report/ReportChange/ReportChangeWeight.vue");

export default {
    
    name : "ReportChange",

    components : {
      "ReportChangeKcal" : ReportChangeKcal,
      "ReportChangeWeight" : ReportChangeWeight,
    },

    mounted(){
      
      Report.getChangeKcal()
      .then((res) =>{
          this.isKcalError = false;
          console.log(res.data.message);
          if(res.data.isSuccess === true && res.data.code === 1000){
              //중요) 요청에 성공하였습니다.
              this.maxKcal = res.data.result.maxCalorie;
              this.minKcal = res.data.result.minCalorie;
              this.recommendKcal = res.data.result.needCalorie;

              const calorieInfoList = res.data.result.calorieInfoList;
              const reverseList = [...calorieInfoList].reverse();

              this.dateKcal = res.data.result.calorieInfoList[0].calorie;
              this.todayKcal = res.data.result.todayCalorie;

              this.kcalLabels = [];
              this.kcalData = [];
              for (const calorieInfo of reverseList){
                this.kcalLabels.push(calorieInfo.date);
                this.kcalData.push(calorieInfo.calorie)
              }

          }else if (res.data.isSuccess === false && res.data.code === "NO_AUTHORIZATION"){
              //중요) 인증 정보 없으니까 로그아웃 후 리다이렉션
              //돌리기 -> 하지만 이미 레이아웃이 그려지기 전에 이미 재발행 받아서 로그인 페이지로 돌려지지 않음
              this.$store.dispatch('logout');
              this.$router.push({
                  name : "sign-in",
              });
          }else{
            //중요) 건강정보를 찾을 수 없습니다.
            this.maxKcal = 0;
            this.minKcal = 0;
            this.recommendKcal = 0;

            this.dateKcal = 0;
            this.todayKcal = 0;

            this.kcalLabels = [];
            this.kcalData = [];
          }
      })
      .catch((err)=>{
          //중요) 서버 오류입니다.
          //뜨기 -> alert메시지 뜨기
          console.log(err);
          this.isKcalError = true;
      });

      Report.getChangeWeight()
      .then((res) =>{
          this.isKgError = false;
          console.log(res.data.message);
          if(res.data.isSuccess === true && res.data.code === 1000){
              //중요) 요청에 성공하였습니다.
              this.maxKg = res.data.result.maxWeight;
              this.minKg = res.data.result.minWeight;

              const weightInfoList = res.data.result.weightInfoList;
              const reverseList = [...weightInfoList].reverse();

              this.dateKg = res.data.result.weightInfoList[0].weight;
              this.todayKg = res.data.result.todayWeight; //이거필요

              this.kgLabels = [];
              this.kgData = [];
              for (const weightInfo of reverseList){
                this.kgLabels.push(weightInfo.date);
                this.kgData.push(weightInfo.weight)
              }

          }else if (res.data.isSuccess === false && res.data.code === "NO_AUTHORIZATION"){
              //중요) 인증 정보 없으니까 로그아웃 후 리다이렉션
              //돌리기 -> 하지만 이미 레이아웃이 그려지기 전에 이미 재발행 받아서 로그인 페이지로 돌려지지 않음
              this.$store.dispatch('logout');
              this.$router.push({
                  name : "sign-in",
              });
          }else{
            //중요) 건강정보를 찾을 수 없습니다.
            this.maxKg = 0;
            this.minKg = 0;

            this.dateKg = 0;
            this.todayKg = 0;

            this.kgLabels = [];
            this.kgData = [];
          }
      })
      .catch((err)=>{
          //중요) 서버 오류입니다.
          //뜨기 -> alert메시지 뜨기
          console.log(err);
          this.isKgError = true;
      });
    },

    data(){
        return {

            isKcalError : false,
            maxKcal : null,
            minKcal : null,
            recommendKcal : null,
            dateKcal : null,
            todayKcal: null,
            kcalLabels : null,
            kcalData : null,

            isKgError : false,
            maxKg : null,
            minKg : null,
            dateKg : null,
            todayKg : null,
            kgLabels : null,
            kgData : null,

            tags: ['칼로리', '몸무게'],
            selectedTag : null
        }
    },

    methods : {
      showKcalData(dateKcal){
        this.dateKcal = dateKcal;
      },

      showWeightData(dateKg){
        this.dateKg = dateKg
      }
    }
}
</script>

<style>

</style>
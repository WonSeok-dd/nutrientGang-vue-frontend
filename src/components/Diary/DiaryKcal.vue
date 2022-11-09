<template>
    <v-row align="center">

        <!--일일 권장 Kcal와 섭취 Kcal--> 
        <v-col cols="auto">
            <div>일일 권장</div>
            <strong class="black--text">{{recommendKcal}}kcal</strong>
            
            <div>
                <v-row align="center" no-gutters>
                    <v-col cols="auto" class="mr-1">
                        <div>섭취</div>
                    </v-col>
                    <v-col cols="auto">
                        <v-chip v-if="isKcalExcess" class="my-2" color="red" text-color="white" small>초과</v-chip>
                    </v-col>
                </v-row>
            </div>
            <strong class="black--text">{{dateKcal}}kcal</strong>
        </v-col>
        
        <v-spacer></v-spacer>
          
        <!--잔여 Kcal 그래프--> 
        <v-col cols="auto">
            <v-progress-circular :value="leftPercentKcal" 
            rotate="90" size="100" width="13" color="blue" button>
                <div class="text-center">
                    <strong class="grey--text">잔여</strong><br>
                    <strong class="grey--text">{{leftKcal}}kcal</strong>
                </div>
            </v-progress-circular>
        </v-col>
    </v-row>

</template>

<script>
import Diary from '@/api/Diary';
export default {
    name : 'DiaryKcal',
    props: {
        date : {
            type : String,
            default : (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10)
        },
    },

    watch : {
        date : {
            immediate : true,
            handler(date){

                //중요) 필요한 데이터 요청
                Diary.getKcal(date)
                .then((res) =>{
                    console.log(res.data.message);
                    if(res.data.isSuccess === true && res.data.code === 1000){
                        this.recommendKcal = res.data.result.needCalorie;
                        this.dateKcal = res.data.result.haveCalorie;
                    }else if (res.data.isSuccess === false && res.data.code === 2014){
                        this.recommendKcal = 0;
                        this.dateKcal = 0;
                    }else if (res.data.isSuccess === false && res.data.code === "NO_AUTHORIZATION"){
                        //
                    }
                })
                .catch((err)=>{
                    console.log('err',err);
                    this.recommendKcal = 0;
                    this.dateKcal = 0;
                })

            }
        }
    },

    data(){
        return {
            recommendKcal : 2067,     //일일 권장 Kcal
            dateKcal : 100,           //사용자의 날짜별 Kcal
        }
    },

    computed: {
        isKcalExcess(){
            return this.recommendKcal < this.dateKcal
        },

        leftKcal(){
            if (this.recommendKcal < this.dateKcal){
                return 0;
            }else{
                return this.recommendKcal - this.dateKcal;
            }
        },

        leftPercentKcal(){
            if (this.recommendKcal === 0){
                return 0;
            }
            return (this.dateKcal / this.recommendKcal) * 100
        },
    }
    
}
</script>

<style>

</style>
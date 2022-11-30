<template>
  <div class="fill-height" v-if="isError">
      <v-row justify="center">
          <v-col cols="auto" class="mt-5">
              <ServerErrorComponent/>
          </v-col>
      </v-row>
  </div>
  <div class="fill-height" v-else-if="isNotHealthInfoError">
        <v-row justify="center">
            <v-col cols="auto" class="mt-5">
                <NotHealthInfoComponent/>
            </v-col>
        </v-row>
  </div>
  <div v-else>

  </div>
</template>

<script>
const ServerErrorComponent = () => import("@/components/ErrorComponent/ServerErrorComponent.vue");
const NotHealthInfoComponent = () => import("@/components/ErrorComponent/NotHealthInfoComponent.vue");
import Modify from '@/api/Modify';
export default {
    name : 'HealthInfoModifyDialog',
    component : {
        "ServerErrorComponent" : ServerErrorComponent,
        "NotHealthInfoComponent" : NotHealthInfoComponent,
    },
    props : {
        "date" : String
    },

    watch : {
        date : {
            immediate : true,
            handler(date){
                
                //날짜별 회원정보 가져오기
                //중요) 필요한 데이터 요청
                Modify.getHealthInfo(date)
                .then((res) =>{
                    this.isError = false;
                    this.isNotHealthInfoError = false;
                    console.log(res.data.message);
                    if(res.data.isSuccess === true && res.data.code === 1000){
                        //중요) 요청에 성공하였습니다.

                        //성별
                        switch(res.data.result.gender){
                            case 'MALE':
                                this.$store.state.modifyInfoGender = 0;
                                break;
                            case 'FEMALE':
                                this.$store.state.modifyInfoGender = 1;
                                break;
                        }

                        //목표
                        switch(res.data.result.target){
                            case 'LOSS_WEIGHT':
                                this.$store.state.modifyInfoTarget = 0;
                                break;
                            case 'GAIN_MUSCLE':
                                this.$store.state.modifyInfoTarget = 1;
                                break;
                            case 'MAINTAIN_WEIGHT':
                                this.$store.state.modifyInfoTarget = 2;
                                break;
                        }

                        //활동량
                        switch(res.data.result.activity){
                            case 'SOFT_ACTIVITY':
                                this.$store.state.modifyInfoActivity = 0;
                                break;
                            case 'NORMAL_ACTIVITY':
                                this.$store.state.modifyInfoActivity = 1;
                                break;
                            case 'HARD_ACTIVITY':
                                this.$store.state.modifyInfoActivity = 2;
                                break;
                        }

                        //키, 몸무게
                        this.$store.state.modifyInfoHeight = res.data.result.height;
                        this.$store.state.modifyInfoWeight = res.data.result.weight;
                        
                    }else if (res.data.isSuccess === false && res.data.code === "NO_AUTHORIZATION"){
                        //중요) 인증 정보 없으니까 로그아웃 후 리다이렉션
                        //돌리기 -> 하지만 이미 레이아웃이 그려지기 전에 이미 재발행 받아서 로그인 페이지로 돌려지지 않음
                        this.$store.dispatch('logout');
                        this.$router.push({
                            name : "sign-in",
                        });
                    }else{
                        //중요) 건강정보를 찾을 수 없습니다.
                        this.isNotHealthInfoError = true;

                    }
                })
                .catch((err)=>{
                    //중요) 서버 오류입니다.
                    //뜨기 -> alert메시지 뜨기
                    console.log(err);
                    this.isNotHealthInfoError = false;

                    this.isError = true;
                });
            }
        }
    },

    data(){
        return {
            //에러 판단
            isError : false,
            isNotHealthInfoError : false,
        }
    }

}
</script>

<style>

</style>
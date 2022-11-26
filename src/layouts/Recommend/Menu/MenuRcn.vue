<template>
    <v-container fluid>
        
        <!--1. 제목-->
        <div class="text-center mb-10">
            <h1 class="text--primary font-weight-black">오늘의 메뉴 추천</h1>
        </div>

        <!--2. 메뉴 추천 Dialog-->
        <div class="mb-10">
            <MenuRcnDialog />
        </div>

        <div class="menu-border pa-3"> 
            <!--3. 오늘 날짜-->
            <div class="text-center">
                <h2 class="blue--text"><strong class="black--text">오늘 날짜:</strong> {{this.date}}</h2>
            </div>

            <!--4. 현재 세끼 정보 -->
            <div class="mb-10">
                <v-row align="center" justify="center">
                    <v-col cols="auto">
                        <h2 class="blue--text"><strong class="black--text">식사:</strong> {{this.meal}}</h2>
                    </v-col>
                    <v-col cols="auto">
                        <div>
                            <v-dialog v-model="mealDialog" scrollable max-width="300px">
                                <!--Dialog 유발-->
                                <template v-slot:activator="{ on, attrs }">
                                  <v-chip v-bind="attrs" v-on="on" label
                                  color="blue" dark>
                                    <v-icon left>mdi-checkbox-marked-outline</v-icon>
                                    선택
                                  </v-chip>
                                </template>

                                <!--Dialog 내용-->
                                <v-card class="text-center">
                                  <v-card-title class="justify-center">
                                    <div>식사 선택</div>
                                  </v-card-title>

                                  <v-divider></v-divider>

                                  <v-card-text class="justify-center" style="height: 300px;">
                                    <v-radio-group v-model="meal" column>
                                      <v-radio label="아침" value="아침"></v-radio>
                                      <v-radio label="점심" value="점심"></v-radio>
                                      <v-radio label="저녁" value="저녁"></v-radio>
                                    </v-radio-group>
                                  </v-card-text>

                                  <v-divider></v-divider>

                                  <v-card-actions class="justify-center">
                                    <v-btn color="blue darken-1" text
                                    @click="mealDialog = false">확인</v-btn>
                                  </v-card-actions>
                                </v-card>
                            </v-dialog>
                        </div>
                    </v-col>
                </v-row>
            </div>

            <!--5. 오늘 섭취 정보-->
            <div>
                <div class="text-center">
                    <h2 class="blue--text"><strong class="black--text">오늘 섭취 정보</strong></h2>
                </div>
                <div class="border pa-2 mb-1">
                    <DiaryKcal :date="date"/>
                </div>
                <div class="border pa-2">
                    <DiaryNutrient :date="date"/>
                </div>
            </div>
        </div>
        

    </v-container>
</template>

<script>
const MenuRcnDialog = () => import("@/components/Recommend/Menu/MenuRcnDialog.vue");
const DiaryKcal = () => import("@/components/Diary/DiaryKcal.vue");
const DiaryNutrient = () => import("@/components/Diary/DiaryNutrient.vue");

export default {
    name : 'MenuRcn',
    data(){
        return {
            //오늘 날짜
            date : (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),

            //식사 선택
            meal : '아침',
            mealDialog : false,
        }
    },

    components : {
        "MenuRcnDialog" : MenuRcnDialog,
        "DiaryNutrient" : DiaryNutrient,
        "DiaryKcal" : DiaryKcal,
    },

    watch : {
        meal : {
            immediate : true,
            handler(meal) {
                console.log(meal)
            }
        }
    }
}
</script>

<style scoped>
.border {
  border: 2px dashed;
  border-color: #80CAFF;
}
.menu-border{
  border: 2px dashed;
}
</style>
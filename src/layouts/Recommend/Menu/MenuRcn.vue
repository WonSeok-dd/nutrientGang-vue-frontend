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

        <!--3. 오늘 날짜-->
        <div>
            <h2 class="blue--text"><strong class="black--text">오늘 날짜:</strong> {{this.date}}</h2>
        </div>

        <!--4. 오늘 섭취 정보-->
        <div>
            <div>
                <h2 class="blue--text"><strong class="black--text">오늘 섭취 정보</strong></h2>
            </div>
            <div class="border pa-2 mb-1">
                <DiaryKcal :date="date"/>
            </div>
            <div class="border pa-2">
                <DiaryNutrient :date="date"/>
            </div>
        </div>

    </v-container>
</template>

<script>
const MenuRcnDialog = () => import("@/components/Recommend/MenuRcnDialog.vue");
const DiaryKcal = () => import("@/components/Diary/DiaryKcal.vue");
const DiaryNutrient = () => import("@/components/Diary/DiaryNutrient.vue");

export default {
    name : 'MenuRcn',
    data(){
        return {
            date : (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10)
        }
    },

    components : {
        "MenuRcnDialog" : MenuRcnDialog,
        "DiaryNutrient" : DiaryNutrient,
        "DiaryKcal" : DiaryKcal,
    }
}
</script>

<style scoped>
.border {
  border: 2px dashed;
  border-color: #80CAFF;
}
</style>
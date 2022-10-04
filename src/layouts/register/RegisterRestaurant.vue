<template>

    <v-container fluid>
        <!--제목-->
        <v-card class="text-center">
            <h1 class="text--primary font-weight-black">음식점 등록</h1>
        </v-card>

        <!--음식점 등록-->
        <v-card>
            <v-card-text class="text-center px-12 py-16">
                        
                <ValidationObserver ref="observer" v-slot="{invalid}">
                    <v-form @submit.prevent="submit">
                        

                        <!--음식점 이름-->
                        <v-card elevation="10" outlined>
                            <v-card-title class="text--primary font-weight-black">음식점 이름</v-card-title>
                            <v-card-text>
                                <ValidationProvider :rules="{
                                    required : true,
                                    }" name="음식점 이름" v-slot="{errors}">
                                    <v-text-field v-model="rtrName" label="음식점 이름" :error-messages="errors"
                                    prepend-icon="mdi-clipboard-outline" clearable 
                                    ></v-text-field>                                    
                                </ValidationProvider>
                            </v-card-text>
                        </v-card>

                        <v-divider class="mt-10 mb-10"></v-divider>


                        <!--음식점 주소-->
                        <v-card elevation="10" outlined>
                            <v-card-title class="text--primary font-weight-black">음식점 주소</v-card-title>
                            
                            <!--음식점 주소 입력-->
                            <v-card-text>
                                <ValidationProvider :rules="{
                                    required : true,
                                    address : true,
                                    }" name="음식점 주소" v-slot="{errors}">
                                    <v-text-field v-model="rtrLocation" label="음식점 주소" :error-messages="errors"
                                    prepend-icon="mdi-map-marker" clearable class="mt-4"
                                    ></v-text-field>
                                </ValidationProvider>
                            </v-card-text>
                            

                            <!--음식점 주소 다이얼로그 및 주소정보확인 버튼-->
                            <!--
                            <v-dialog v-model="rtrLocationdialog" width="500">
                                <template v-slot:activator="{ on, attrs }">
                                    <v-row justify="center" class="pd-5">


                                        <v-col cols="auto">
                                            <v-alert v-if="rtrLocationCheck" dense outlined type="success">해당 주소 정보는 올바른 위치 정보입니다.</v-alert>
                                            <v-alert v-else dense outlined type="error">해당 주소 정보는 올바른 위치 정보가 아닙니다.</v-alert>
                                        </v-col>


                                        <v-col cols="auto">
                                            <v-alert color="success" dark dense v-bind="attrs" v-on="on" @click="checkRtrLocation"> 
                                                <v-icon left>mdi-map-marker-radius</v-icon>주소 정보 확인
                                            </v-alert>
                                        </v-col>
                                    </v-row>
                                </template>

                                <v-card>
                                    <v-alert v-if="rtrLocationCheck" dense outlined type="success">해당 <strong>주소 정보</strong>는 올바른 <strong>위치 정보</strong>입니다.</v-alert>
                                    <v-alert v-else dense outlined type="error">해당 <strong>주소 정보</strong>는 올바른 <strong>위치 정보</strong>가 아닙니다.</v-alert>

                                    <v-card-actions>
                                        <v-btn v-if="rtrLocationCheck" color="success" text @click="rtrLocationdialog = false">확인</v-btn>
                                        <v-btn v-else color="error" text @click="rtrLocationdialog = false">확인</v-btn>
                                    </v-card-actions>
                                </v-card>
                            </v-dialog>
                            -->
                        </v-card>

                        <v-divider class="mt-10 mb-10"></v-divider>


                        <!--음식점 메뉴 - 반복문 -->
                        <v-card elevation="10" outlined v-for="menu,i in menulist" :key="i">
                            
                            <v-app-bar flat color="">
                                <v-spacer></v-spacer>
                                <v-btn color="blue" text fab @click="addMenu()"><v-icon>mdi-plus</v-icon></v-btn>
                                <v-btn color="blue" text fab @click="deleteMenu(i)"><v-icon>mdi-minus</v-icon></v-btn>
                            </v-app-bar>
                            
                            <v-card-title class="text--primary font-weight-black">메뉴{{i+1}}</v-card-title>
                            
                            <v-card-text>
                                <ValidationProvider :rules="{
                                    required : true,
                                    }" name="메뉴 이름" v-slot="{errors}">
                                    <v-text-field v-model="menulist[i].menuName" label="메뉴 이름" :error-messages="errors"
                                    prepend-icon="mdi-food-fork-drink" clearable class="mt-4"
                                ></v-text-field>
                                </ValidationProvider>
                                <ValidationProvider :rules="{
                                    required : true,
                                    }" name="메뉴 정보" v-slot="{errors}">
                                    <v-text-field v-model="menulist[i].menuInfo" label="메뉴 정보" :error-messages="errors"
                                    prepend-icon="mdi-food-fork-drink" clearable class="mt-4"
                                ></v-text-field>
                                </ValidationProvider>
                                
                                <v-row>
                                    <v-col cols="12" sm="12" md="6" lg="4">
                                        <ValidationProvider :rules="{
                                            required : true,
                                            numeric: true,
                                            }" name="탄수화물(g) 함유량" v-slot="{errors}">
                                            <v-text-field v-model="menulist[i].menuCarbo" label="탄수화물(g) 함유량" :error-messages="errors"
                                            prepend-icon="mdi-bowl" suffix="g"></v-text-field>
                                        </ValidationProvider>
                                    </v-col>
                                    <v-col cols="12" sm="12" md="6" lg="4">
                                        <ValidationProvider :rules="{
                                            required : true,
                                            numeric: true,
                                            }" name="단백질(g) 함유량" v-slot="{errors}">
                                            <v-text-field v-model="menulist[i].menuProtein" label="단백질(g) 함유량" :error-messages="errors"
                                            prepend-icon="mdi-fuel" suffix="g"></v-text-field>
                                        </ValidationProvider>
                                    </v-col>
                                    <v-col cols="12" sm="12" md="6" lg="4">
                                        <ValidationProvider :rules="{
                                            required : true,
                                            numeric: true,                                            
                                            }" name="지방(g) 함유량" v-slot="{errors}">
                                            <v-text-field v-model="menulist[i].menuFat" label="지방(g) 함유량" :error-messages="errors"
                                            prepend-icon="mdi-fire" suffix="g"></v-text-field>
                                        </ValidationProvider>
                                    </v-col>
                                </v-row>
                                
                            </v-card-text>
                        </v-card>

                        <v-btn type="submit" block x-large rounded color="primary" class="mt-4" :disabled="invalid" >등록하기</v-btn>

                    </v-form>
                </ValidationObserver>
            </v-card-text>

        </v-card>
    </v-container>

</template>

<script>
import axios from 'axios'
import {extend, ValidationObserver, ValidationProvider } from "vee-validate"
import {required , numeric} from "vee-validate/dist/rules"
extend('required', {
  ...required,
  message : '해당 필드는 필수값입니다.'
});
extend('numeric', {
    ...numeric,
    message : '해당 필드는 숫자로만 입력해야 합니다..'
})

extend('address', async (value) => {
    
    const kakao = window.kakao;
    let geocoder = new kakao.maps.services.Geocoder();

    const addressSearch = address => {
        return new Promise((resolve) => {
            
            geocoder.addressSearch(address, function(result, status) {
                if (status === kakao.maps.services.Status.OK) {
                    resolve(result);
                } else {
                    resolve(status)
                }
            });
        });
    };

    const result = await addressSearch(value)
    if (result === 'ZERO_RESULT'){
        return '해당 주소 정보는 없습니다.'
    }
    return true
});


export default {
    data(){
        return {

            rtrName: null,

            rtrLocation: null,
            //rtrLocationdialog : false,
            //rtrLocationCheck : false,

            menulist: [
                {
                    menuName: null,
                    menuInfo : null,
                    menuCarbo : null,
                    menuProtein : null,
                    menuFat : null
                },
            ],
        }
    },

    components : {
      ValidationObserver,
      ValidationProvider
    },

    methods : {
        async submit(){
            // 입력조건 유효성 결과
            const result = await this.$refs.observer.validate()
            
            // 입력조건 유효성 결과 만족시
            if (result){

                // 음식점 정보
                const rtr_info = {
                    rtrName : this.rtrName,
                    rtrLocation : this.rtrLocation,
                    menulist : this.menulist
                };

                await axios.post('/api/rtr/register', rtr_info)
                    .then(res => {
                        console.log(res)
                        this.$router.push('/')
                    })
                    .catch(err =>{
                        console.log(err.message)
                    })
            }
        },
        
        //메뉴등록 칸 추가 -> 버튼 클릭
        addMenu(){
            this.menulist.push({
                menuName : null,
                menuInfo : null,
            }); 
        },


        //메뉴등록 칸 제거 -> 버튼 클릭
        deleteMenu(idx){
            
            if (this.menulist.length  === 1){
                //pass
            }else{
                //위치 -1(끝) , 개수 1개
                this.menulist.splice(idx,1)
            }
        },

        //올바른 주소인지 확인 -> 버튼 클릭
        //checkRtrLocation(){
        //    const kakao = window.kakao
        //    let geocoder = new kakao.maps.services.Geocoder();
        //
        //    let base = this;
        //    geocoder.addressSearch(this.rtrLocation, function(res,status){
        //        if (status === kakao.maps.services.Status.OK){
        //
        //            base.rtrLocationCheck = true
        //            console.log(res[0].y, res[0].x)
        //        }else{
        //            base.rtrLocationCheck = false
        //            console.log('못찾음')
        //        }
        //    });
        //},
    },

}
</script>

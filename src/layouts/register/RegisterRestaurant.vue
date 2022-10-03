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

                        <v-card elevation="10" outlined>
                            <v-card-title class="text--primary font-weight-black">음식점 위치</v-card-title>

                            <v-card-text>
                                <ValidationProvider :rules="{
                                    required : true,
                                    }" name="음식점 위치" v-slot="{errors}">
                                    <v-text-field v-model="rtrLocation" label="음식점 위치" :error-messages="errors"
                                    prepend-icon="mdi-map-marker" clearable class="mt-4"
                                    ></v-text-field>
                                </ValidationProvider>
                            </v-card-text>
                            
                            <v-card-text>{{answer}}</v-card-text>

                            <v-card-text>
                                <v-btn color="primary" text @click="checkRtrLocation">확인</v-btn>
                            </v-card-text> 

                        </v-card>

                        <v-divider class="mt-10 mb-10"></v-divider>

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
                            </v-card-text>
                        </v-card>

                        <v-btn type="submit" block x-large rounded color="primary" class="mt-4" :disabled="invalid">등록하기</v-btn>

                    </v-form>
                </ValidationObserver>
            </v-card-text>
        </v-card>

    </v-container>

</template>

<script>
import axios from 'axios'
import {extend, ValidationObserver, ValidationProvider } from "vee-validate"
import {required} from "vee-validate/dist/rules"
extend('required', {
  ...required,
  message : '해당 필드는 필수값입니다.'
});

export default {
    data(){
        return {

            answer : null,

            rtrName: null,
            rtrLocation: null,

            menulist: [
                {
                    menuName: null,
                    menuInfo : null,
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

        checkRtrLocation(){
            const kakao = window.kakao
            let geocoder = new kakao.maps.services.Geocoder();

            let base = this;
            geocoder.addressSearch(this.rtrLocation, function(res,status){
                if (status === kakao.maps.services.Status.OK){

                    base.answer = `lat: ${res[0].y} lng: ${res[0].x}`
                    console.log(res[0].y, res[0].x)
                }else{
                    base.answer = `못찾음`
                    console.log('못찾음')
                }
            });
        },

        addMenu(){
            this.menulist.push({
                menuName : null,
                menuInfo : null,
            });
        },

        deleteMenu(idx){
            
            if (this.menulist.length  === 1){
                //pass
            }else{
                //위치 -1(끝) , 개수 1개
                this.menulist.splice(idx,1)
            }
        },
    },

}
</script>

<style>

</style>
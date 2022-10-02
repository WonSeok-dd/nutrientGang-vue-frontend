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
                        
                        <ValidationProvider :rules="{
                            required : true,
                            }" name="음식점 이름" v-slot="{errors}">
                            <v-text-field v-model="name" label="음식점 이름" :error-messages="errors"
                            prepend-icon="mdi-clipboard-outline" clearable 
                            ></v-text-field>                                    
                        </ValidationProvider>
                            
                        <ValidationProvider :rules="{
                            required : true,
                            }" name="음식점 위치" v-slot="{errors}">
                            <v-text-field v-model="location" label="음식점 위치" :error-messages="errors"
                            prepend-icon="mdi-map-marker" clearable class="mt-4"
                            ></v-text-field>
                        </ValidationProvider>

                        <ValidationProvider :rules="{
                            required : true,
                            }" name="음식점 메뉴" v-slot="{errors}">
                            <v-text-field v-model="menu" label="음식점 메뉴" :error-messages="errors"
                            prepend-icon="mdi-food-fork-drink" clearable class="mt-4"
                            ></v-text-field>
                        </ValidationProvider>

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

            name: null,
            
            location: null,

            menu : null
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
                    name : this.name,
                    location : this.location,

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
        }
    }
}
</script>

<style>

</style>
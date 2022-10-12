<template>

    <v-container fluid>
        <!--제목-->
        <v-card class="text-center">
            <h1 class="text--primary font-weight-black">음식점 수정</h1>
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
                        
                        <!--음식점 사진-->
                        <v-card elevation="10" outlined>
                            
                            <!--음식점 사진 확인 버튼-->
                            <v-card-title class="text--primary font-weight-black">음식점 사진</v-card-title>
                            
                            <!--음식점 사진 입력-->
                            <v-card-text>
                                <ValidationProvider :rules="{
                                    required : true,
                                    }" name="음식점 사진" v-slot="{errors}">
                                    <v-file-input v-model="rtrimg" label="음식점 사진" :error-messages="errors"
                                    accept="image/png, image/jpeg, image/bmp" outlined :show-size="1000"
                                    prepend-icon="mdi-camera-burst" clearable counter color="blue"
                                    @change="uploadAlbumFile">
                                        <template v-slot:selection="{ text }">
                                            <v-chip color="primary accent-4" dark label small>
                                              {{ text }}
                                            </v-chip>
                                        </template>
                                    </v-file-input>
                                </ValidationProvider>
                            </v-card-text>
                            
                            <!--음식점 사진 확인-->
                            <v-expansion-panels>
                                <v-expansion-panel>
                                    <v-expansion-panel-header>
                                        올린 이미지 확인
                                    </v-expansion-panel-header>
                                    <v-expansion-panel-content>
                                        <v-img :src="cImg" @error="changeNotDefault"
                                        height="200px" contain/>
                                    </v-expansion-panel-content>
                                </v-expansion-panel>
                            </v-expansion-panels>

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
                        <v-card elevation="10" outlined v-for="menu,i in rtrMenu" :key="i">
                            
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
                                    <v-text-field v-model="rtrMenu[i].menuName" label="메뉴 이름" :error-messages="errors"
                                    prepend-icon="mdi-food-fork-drink" clearable class="mt-4"
                                ></v-text-field>
                                </ValidationProvider>
                                <ValidationProvider :rules="{
                                    required : true,
                                    }" name="메뉴 정보" v-slot="{errors}">
                                    <v-text-field v-model="rtrMenu[i].menuInfo" label="메뉴 정보" :error-messages="errors"
                                    prepend-icon="mdi-food-fork-drink" clearable class="mt-4"
                                ></v-text-field>
                                </ValidationProvider>
                                
                                <v-row>
                                    <v-col cols="12" sm="12" md="6" lg="4">
                                        <ValidationProvider :rules="{
                                            required : true,
                                            numeric: true,
                                            }" name="탄수화물(g) 함유량" v-slot="{errors}">
                                            <v-text-field v-model="rtrMenu[i].menuCarbo" label="탄수화물(g) 함유량" :error-messages="errors"
                                            prepend-icon="mdi-bowl" clearable suffix="g"></v-text-field>
                                        </ValidationProvider>
                                    </v-col>
                                    <v-col cols="12" sm="12" md="6" lg="4">
                                        <ValidationProvider :rules="{
                                            required : true,
                                            numeric: true,
                                            }" name="단백질(g) 함유량" v-slot="{errors}">
                                            <v-text-field v-model="rtrMenu[i].menuProtein" label="단백질(g) 함유량" :error-messages="errors"
                                            prepend-icon="mdi-fuel" clearable suffix="g"></v-text-field>
                                        </ValidationProvider>
                                    </v-col>
                                    <v-col cols="12" sm="12" md="6" lg="4">
                                        <ValidationProvider :rules="{
                                            required : true,
                                            numeric: true,                                            
                                            }" name="지방(g) 함유량" v-slot="{errors}">
                                            <v-text-field v-model="rtrMenu[i].menuFat" label="지방(g) 함유량" :error-messages="errors"
                                            prepend-icon="mdi-fire" clearable suffix="g"></v-text-field>
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
import AWS from 'aws-sdk'
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
            
            geocoder.addressSearch(address, (result, status) => {
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
    
    props : {
        rtr : Object
    },

    data(){
        return {

            rtrName: this.rtr.rtrName,

            rtrimg : null,          //v-input 받아온 값
            rtrimgURL : null,       //s3에 업로드되면 얻기, POST요청 (afas.jpg)
            rtrimgPreURL : this.rtr.rtrimgURL,    //s3에 업로드되면 얻기, v-img:src (~)
            default_img : false,

            rtrLocation : this.rtr.rtrLocation,
            //rtrLocationdialog : false,
            //rtrLocationCheck : false,

            rtrMenu: this.rtr.rtrMenu,


            bucketRegion : 'ap-northeast-2',
            IdentityPoolId : 'ap-northeast-2:7361f497-478c-4d05-88c0-aaa4f9b759bd',
            href : 'https://photo-album-cluejws.s3.ap-northeast-2.amazonaws.com/', 
            albumBucketName : 'photo-album-cluejws', 
            albumName : 'rtr_album',          
        }
    },

    components : {
      ValidationObserver,
      ValidationProvider
    },

    computed :{
        //default_img:true -> defaultimg
        //default_img:false -> rtrimgPreURL
        cImg(){
            return this.default_img ? require('@/assets/default.png') : this.rtrimgPreURL;
        }
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
                    rtrimgURL : this.rtrimgURL,
                    rtrLocation : this.rtrLocation,
                    rtrMenu : this.rtrMenu
                };

                await axios.put('/api/rtr/update', rtr_info)
                    .then(res => {
                        console.log(res.data.success, res.data.message);
                        //this.$router.push('/')
                    })
                    .catch(err =>{
                        console.log(err.message)
                    })
            }
        },
        
        //메뉴등록 칸 추가 -> 버튼 클릭
        addMenu(){
            this.rtrMenu.push({
                menuName: null,
                menuInfo : null,
                menuCarbo : null,
                menuProtein : null,
                menuFat : null
            }); 
        },

        //메뉴등록 칸 제거 -> 버튼 클릭
        deleteMenu(idx){
            
            if (this.rtrMenu.length  === 1){
                //pass
            }else{
                //위치 -1(끝) , 개수 1개
                this.rtrMenu.splice(idx,1)
            }
        },

        //default_img = true -> false
        changeNotDefault(){
            this.default_img = false;
        },

        connectAWS(){
          AWS.config.update({
            region: this.bucketRegion,
            credentials: new AWS.CognitoIdentityCredentials({
                IdentityPoolId: this.IdentityPoolId
            })
          });
        },

        getS3(){
          var s3 = new AWS.S3({
            apiVersion: "2006-03-01",
            params: { Bucket: this.albumBucketName }
          });
          return s3;
        },

        uploadAlbumFile(){
            //AWS 연결
            this.connectAWS();

            //rtrimg 지울때 / 추가할때
            if (this.rtrimg === null){
                
                this.rtrimg = null
                this.rtrimgURL = null
                
                this.rtrimgPreURL = null;
                this.default_img = true;
            }else{
                
                //2. AWS 버킷에 업로드(1) 
                // 파일형식(.jpg) + 랜덤문자열 얻기
                let albumFileName = this.rtrimg.name;
                let form = albumFileName.split('.')[1];

                let randomString = new Date().getTime().toString(36);

                // 앨범이름 얻기
                let albumPhotosKey = encodeURIComponent(this.albumName) + "/";

                // photoKey: S3에 저장형식
                let photoKey = albumPhotosKey + randomString + '.'+ form;

                var upload = new AWS.S3.ManagedUpload({
                  params: {
                    Bucket: this.albumBucketName,
                    Key: photoKey,
                    Body: this.rtrimg,
                  }
                });

                //2. AWS 버킷에 업로드(2) 
                var promise = upload.promise();
                promise.then(
                    (data) => {
                        console.log(`파일 업로드: ${data}`);

                        //s3에 업로드되면 얻기, POST요청 (afas.jpg)
                        //s3에 업로드되면 얻기, v-img:src (~)
                        this.rtrimgURL = randomString + '.' + form;
                        
                        this.rtrimgPreURL = this.href + 'rtr_album/' + randomString + '.' + form;
                        this.default_img = false;

                    },
                    (err) => {
                       console.log(err)
                    }
                );
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

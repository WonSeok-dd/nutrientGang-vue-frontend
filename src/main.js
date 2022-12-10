import Vue from 'vue'
import App from './App.vue'

import { store } from "./store/store"
import { router } from "./router.js"

import vuetify from './plugins/vuetify'

import VueGeolocation from "vue-browser-geolocation"
import axios from 'axios'

Vue.config.productionTip = false
Vue.use(VueGeolocation)

new Vue({
  store : store,
  router : router,
  vuetify,
  beforeCreate(){
    // 완료시간
    const expiredTime = localStorage.getItem('access-token-expiresIn');

    // 현재 시간
    const curr = new Date();
    const utc = curr.getTime() + (curr.getTimezoneOffset() * 60 * 1000);
    const KR_TIME_DIFF = 9 * 60 * 60 * 1000;
    const kr_curr = new Date(utc + (KR_TIME_DIFF));
    const nowTime = kr_curr.getTime();

    //만료 토큰이 없다면 로그인,회원가입 페이지니까 로그인 페이지로 돌리기
    if (!expiredTime){
      // x(로그인,회원가입 페이지)
      this.$router.push({
        name : "sign-in",
      });

    }
    //만료 토큰이 있다면 재발행 판단
    else{

        // 현재시간>만료시간 재발행O
        if (nowTime > expiredTime){
      
          //1. localStorage에서 가져오기
          const accessToken = localStorage.getItem('access-token');
          const refreshToken = localStorage.getItem('refresh-token');
            
          const tokenObj = {
              accessToken : accessToken,
              refreshToken : refreshToken,
          }
        
          //2. 재발행 요청
          axios.post('http://54.180.116.95:3000/auth/reissue', tokenObj)
          .then(res => {
              console.log(res.data.message);
              if (res.data.isSuccess === true && res.data.code === 1000){
                  //중요) 요청에 성공하였습니다.
                  //1. localStoarge에 저장
                  const loginResult = res.data.result;
                  this.$store.commit('setLocalStorage', loginResult);
                  
                  //2. loginSuccess
                  this.$store.commit('loginSuccess', res.data.result.username);
                
              }else {
                  //중요) Refresh Token이 유효하지 않습니다, 로그아웃된 사용자입니다.
                  //돌리기 -> 로그인 페이지로 돌리기
                  this.$store.dispatch('logout')
                  .then(() => {
                    this.$router.push({
                      name : "sign-in",
                    })
                    .catch(()=>{
                      console.log("같은 페이지 입니다.")
                    });
                  });
              }
          })
          .catch(err => {
              //중요) 서버 오류 입니다.
              //돌리기 -> 로그인 페이지로 돌리기
              console.log(err.message);
              this.$store.dispatch('logout')
              .then(() => {
                this.$router.push({
                  name : "sign-in",
                })                    
                .catch(()=>{
                  console.log("같은 페이지 입니다.")
                });
              });
          })
        }
        // 현재시간>만료시간 재발행X
        else{
            //1. loginSuccess
            const userName = localStorage.getItem('user-name');
            this.$store.commit('loginSuccess', userName);
        }
    }


    

  },
  render: h => h(App)
}).$mount('#app')

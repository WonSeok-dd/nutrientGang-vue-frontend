import Vue from "vue"
import Vuex from "vuex"
import axios from 'axios'


Vue.use(Vuex);

export const store = new Vuex.Store({

    state : {
        infoTarget : 0,   //0:체중감량 1:근육증량 2:체중유지
        infoActivity : 0, //0:가벼운활동 1:일상적업무 2:심한활동
        infoGender : 0,   //0:남자 1:여자
        infoHeight : 180, //키
        infoWeight : 50,  //몸무게
        infoName : null,
        infoEmail : null,
        infoPassword : null,

        isLogin : false,
        isLoginError : false,
        LoginErrorMsg : "",

        userInfo : {
            user_name : "정원석"
        }
    },

    getters : {
        getUserInfo_name(state){
            if(state.isLogin){
                return state.userInfo.user_name;
            }

            return '';
        }
    },
    
    mutations : {
        

        //로그인 성공 시
        loginSuccess(state, payload){
            state.isLogin = true;
            state.isLoginError = false;

            state.userInfo = payload
        },
        
        //로그인 실패 시
        loginError(state, msg){
            state.isLogin = false;
            state.isLoginError = true;
            state.LoginErrorMsg = msg;

            setTimeout(()=>{
                state.isLoginError = false;
                state.LoginErrorMsg = '';
            },3000);
        },

        logout(state){
            state.isLogin = false;
            state.isLoginError = false;

            state.userInfo.user_name = "";
        },
    },

    actions : {
        login({dispatch ,commit}, loginObj){
            
            axios.post('/auth/login', loginObj)
            .then(res => {
                
                // 로그인 일치 정보 o (isSuccess: true, token: token)
                // 로그인 일치 정보 x (isSuccess: false, message)
                if (res.data.isSuccess === true){             // 로그인 일치 정보 o
                    
                    console.log(res.data.isSuccess, res.data.username);

                    //1. localStoarge에 token 저장(새로고침 방지)
                    let accessToken = res.data.result.tokenDto.accessToken;
                    let refreshToken = res.data.result.tokenDto.refreshToken;
                    let accessTokenExpiresIn = res.data.result.tokenDto.accessTokenExpiresIn;
                    localStorage.setItem('access-token', accessToken);
                    localStorage.setItem('refresh-token', refreshToken);
                    localStorage.setItem('access-token-expiresIn', accessTokenExpiresIn);
                    
                    //2. loginsuccess                     
                    let userInfo = {
                        user_name : res.data.username,
                    };
                    commit('loginSuccess', userInfo)

                    //3. getMemberInfo
                    dispatch('getMemberInfo');

                }else{                                     // 로그인 일치 정보 x      
                    console.log(res.data.isSuccess, res.data.message);
                    this.commit('loginError', res.data.message);
                }

            })
            .catch(err =>{
                console.log(err.message);
                this.commit('loginError', "서버와의 통신이 원할하지 않습니다.");
            })
        },

        getMemberInfo({commit}){
            
            //1. localStoarge에서 token 얻음(새로고침 방지)
            let token = localStorage.getItem('access-token');
            let config = {
                headers : {
                    'access-token' : token
                }
            };

            //2. token을 헤더에 포함시켜서 유저 정보를 요청
            axios.get('/api/user/auth', config)
            .then(res => {
                console.log(res);

                //auth o (isSuccess: true, user_name)
                //auth x (isSuccess: false, message)
                if (res.data.isSuccess === true){    //auth o
                    
                    console.log(res.data.isSuccess, res.data.username);
                    let userInfo = {
                        user_name : res.data.username,
                    };
                    commit('loginSuccess', userInfo)
                }else{                                  //auth x

                }
            })
            .catch(err => {
                console.log(err.message);
            });
        },

        logout({commit}) {

            localStorage.removeItem('access-token');
            localStorage.removeItem('refresh-token');
            localStorage.removeItem('access-token-expiresIn');

            commit('logout')
        },
    }
});
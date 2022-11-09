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
        LoginErrorMsg : '',

        userName : '',
    },

    getters : {
        getUserName(state){
            if(state.isLogin){
                return state.userName;
            }

            return '';
        },
    },
    
    mutations : {
        
        //localStorage에 저장
        setLocalStorage(state, tokenDto){
            
            const accessToken = tokenDto.accessToken;
            const refreshToken = tokenDto.refreshToken;
            const accessTokenExpiresIn = tokenDto.accessTokenExpiresIn;
            localStorage.setItem('access-token', accessToken);
            localStorage.setItem('refresh-token', refreshToken);
            localStorage.setItem('access-token-expiresIn', accessTokenExpiresIn);
        },

        //localStorage에 삭제
        removeLocalStorage(){
            
            localStorage.removeItem('access-token');
            localStorage.removeItem('refresh-token');
            localStorage.removeItem('access-token-expiresIn');
        },

        //로그인 성공 시
        loginSuccess(state, userName){
            state.isLogin = true;
            state.isLoginError = false;

            state.userName = userName;
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

            state.userName = '';
        },
    },

    actions : {
        
        // 로그인 버튼 클릭시 dispatch
        login({commit}, loginObj){
            
            axios.post('/auth/login', loginObj)
            .then(res => {
                
                if (res.data.isSuccess === true){             // 로그인 일치 정보 o
                    
                    console.log(res.data.isSuccess, res.data.result);
                    //1. localStoarge에 저장
                    commit('setLocalStorage', res.data.result.tokenDto);
                    
                    //2. loginSuccess
                    commit('loginSuccess', res.data.result.username);

                }else{                                     // 로그인 일치 정보 x      
                    console.log(res.data.isSuccess, res.data.message);
                    commit('loginError', res.data.message);
                }

            })
            .catch(err =>{
                console.log(err.message);
                commit('loginError', '서버와의 통신이 원할하지 않습니다.');
            })
        },


        //로그아웃 버튼 클릭시 dispatch
        logout({commit}) {

            //1. localStorage에 삭제
            commit('removeLocalStorage');

            //2. logout
            commit('logout')
        },

        //매 요청마다 권한 판단 오류 시 token 재발행
        reIssueToken({dispatch, commit}){

            //1. localStorage에서 가져오기
            const accessToken = localStorage.getItem('access-token');
            const refreshToken = localStorage.getItem('refresh-token');

            const tokenObj = {
                accessToken : accessToken,
                refreshToken : refreshToken,
            }
        
            axios.post('/auth/reissue', tokenObj)
            .then(res => {

                if (res.data.isSuccess === true && res.data.code === 1000){
                    
                    console.log(res.data.isSuccess, res.data.result);
                    //1. localStoarge에 저장
                    commit('setLocalStorage', res.data.result.tokenDto);
                    
                    //2. loginSuccess
                    commit('loginSuccess', res.data.result.username);

                }else {
                    console.log(res.data.isSuccess, res.data.message);
                    dispatch('logout')
                }
            })
            .catch(err => {
                console.log(err.message);
                dispatch('logout')
            })

        }
    }
});
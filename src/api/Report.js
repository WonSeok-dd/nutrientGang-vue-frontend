import interceptor from '../axios/interceptor.js'

export default {
    
    //변화추이
    //칼로리 변화
    getChangeKcal(){
        
        return interceptor({
            url: '/health/report/change/calorie',
            method: 'get',
        });
    },

    //몸무게 변화
    getChangeWeight(){

        return interceptor({
            url: '/health/report/change/weight',
            method: 'get',
        });
    },

    //영양균형
    //일주일 간 총 섭취 영양소 비율
    getBalancePortion(begin, end){

        return interceptor({
            url: '/health/report/balance/portion',
            method: 'get',
            params : {
                begin : begin,
                end : end
            }
        });
    },

    //일주일 간 섭취 영양소
    getBalanceDetail(begin, end){

        return interceptor({
            url: '/health/report/balance/detail',
            method: 'get',
            params : {
                begin : begin,
                end : end
            }
        });
    },

    //날짜별(일주일)간 섭취 비율
    getBalanceGraph(begin, end){

        return interceptor({
            url: '/health/report/balance/graph',
            method: 'get',
            params : {
                begin : begin,
                end : end
            }
        });
    },

    //식사기록
    //일주일 간 총 식사 비율
    getMealGraph(begin,end){
        return interceptor({
            url: '/health/report/meal/graph',
            method: 'get',
            params : {
                begin : begin,
                end : end
            }
        });
    },

    //일주일 간 식사여부 조회
    getMealList(begin,end){
        return interceptor({
            url: '/health/report/meal/list',
            method: 'get',
            params : {
                begin : begin,
                end : end
            }
        });
    }
}
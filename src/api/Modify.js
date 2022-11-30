import interceptor from '../axios/interceptor.js'

export default {
    
    //식사정보 수정 관련
    getMealInfo(mealId, meal){
        
        return interceptor({
            url: '/meal',
            method: 'get',
            params : {
                mealId : mealId,
                meal : meal
            }
        });
    },

    modifyFood(putObj, mealId, meal){
        
        return interceptor({
            url: '/modify/meal',
            method: 'put',
            params : {
                mealId : mealId,
                meal: meal
            },
            data : {
                ...putObj
            }
        });
    },

    deleteFood(mealId,meal){
        return interceptor({
            url: '/delete/meal',
            method: 'delete',
            params : {
                mealId : mealId,
                meal : meal
            }
        });
    },

    //건강정보 수정 관련
    getHealthInfo(date){
        
        return interceptor({
            url: '/healthMember',
            method: 'get',
            params : {
                date : date,
            }
        });
    }

}
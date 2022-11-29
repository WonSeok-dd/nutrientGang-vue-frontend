import interceptor from '../axios/interceptor.js'

export default {
    
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
    }

}
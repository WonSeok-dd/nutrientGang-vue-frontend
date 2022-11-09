import interceptor from '../axios/interceptor.js'

export default {
    
    getKcal(date){
        
        return interceptor({
            url: '/health/diary/calorie',
            method: 'get',
            params : {
                date :  date
            }
        });
    },

    getNutrient(date){

        return interceptor({
            url: '/health/diary/nutrient',
            method: 'get',
            params : {
                date :  date
            }
        });
    },

    getMeal(date){

        return interceptor({
            url: '/health/diary/nutrient',
            method: 'get',
            params : {
                date :  date
            }
        });
    }


}
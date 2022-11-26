import interceptor from '../axios/interceptor.js'

export default {
    
    getRcnMenu(date, meal){
        
        return interceptor({
            url: '/rcn/menu',
            method: 'get',
            params : {
                date : date,
                meal : meal
            }
        });
    },


}
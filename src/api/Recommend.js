import interceptor from '../axios/interceptor.js'

export default {
    
    getRcnMenu(meal){
        
        return interceptor({
            url: '/rcn/menu',
            method: 'get',
            params : {
                meal : meal
            }
        });
    },


}
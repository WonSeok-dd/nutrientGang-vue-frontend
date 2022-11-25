import interceptor from '../axios/interceptor.js'

export default {
    
    getFoodName(name){
        
        return interceptor({
            url: '/food',
            method: 'get',
            params : {
                name : name
            }
        });
    },

    registerFood(postObj){
        
        return interceptor({
            url: '/register/meal',
            method: 'post',
            data : {
                ...postObj
            }
        });
    }



}
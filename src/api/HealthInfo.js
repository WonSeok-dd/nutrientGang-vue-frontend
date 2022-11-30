import interceptor from '../axios/interceptor.js'

export default {
    
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
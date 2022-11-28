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

    getRcnRtr(menuName, lat, lng){

        return interceptor({
            url: '/rcn/rtr',
            method: 'get',
            params : {
                menuName : menuName,
                lat : lat,
                lng : lng
            }
        });
    }


}
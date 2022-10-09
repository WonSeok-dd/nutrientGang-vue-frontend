const href = 'https://photo-album-cluejws.s3.ap-northeast-2.amazonaws.com/rtr_album/';

const api = {
    restaurant : {
       restaurantAll(callback){
        const restaurants = [
            {
                rtrName : "동국 피자",
                rtrimgURL : href + 'l91g0ik8.png' ,
                rtrLocation: '충무로 10길', 
                rtrlat : 37.561395297835496, 
                rtrlng : 126.99566511579218,
                rtrMenu : [
                    {
                        menuName : '치즈피자',
                        menuInfo : '맛있는 치즈피자',
                        menuCarbo : 30,
                        menuProtein : 20,
                        menuFat: 10,
                    },                  
                    {
                        menuName : '불고기피자',
                        menuInfo : '지리는 불고기피자',
                        menuCarbo : 40,
                        menuProtein : 25,
                        menuFat: 16,
                    },
                ]
            },
            {

                rtrName : "고려 치킨",
                rtrimgURL : href + 'l91g0mq4.png' ,
                rtrLocation: '서애로 1길', 
                rtrlat : 37.56081417937829, 
                rtrlng : 126.99641214720350,
                rtrMenu : [
                    {
                        menuName : '후라이드 치킨',
                        menuInfo : '바삭한 후라이드, 올리브, 지린다. 오세요',
                        menuCarbo : 31,
                        menuProtein : 21,
                        menuFat: 11,
                    },                  
                    {
                        menuName : '양념 치킨',
                        menuInfo : '맛있는 맛있는 양념양념',
                        menuCarbo : 42,
                        menuProtein : 22,
                        menuFat: 12,
                    },
                    {
                        menuName : '간장 치킨',
                        menuInfo : '맛있는 맛있는 간장간장',
                        menuCarbo : 32,
                        menuProtein : 12,
                        menuFat: 42,
                    },
                ]
            },
            {
                rtrName : "서울 햄버거",
                rtrimgURL : href + 'l91g0q0b.png' ,
                rtrLocation: '서애로 15길 24', 
                rtrlat : 37.561543987013806, 
                rtrlng : 126.99640079394858,
                rtrMenu : [
                    {
                        menuName : '불고기 와퍼',
                        menuInfo : '너무 크다, 이거 어떻게 해야되냐',
                        menuCarbo : 33,
                        menuProtein : 23,
                        menuFat: 13,
                    },                  
                    {
                        menuName : '통새우 와퍼',
                        menuInfo : '새우 알러기 있니? 없으면 먹어',
                        menuCarbo : 44,
                        menuProtein : 24,
                        menuFat: 14,
                    },
                ]
            },
            {
                rtrName : "연세 서브웨이",
                rtrimgURL : href + 'l91g0u9k.png',
                rtrLocation: '충무로 1길', 
                rtrlat : 37.560944851198634,
                rtrlng : 126.99743643508589,
                rtrMenu : [
                    {
                        menuName : 'BLT 샌드위치',
                        menuInfo : '살뺄거야? 먹어야되 그러면',
                        menuCarbo : 35,
                        menuProtein : 25,
                        menuFat: 15,
                    },                  
                    {
                        menuName : '에그마요 샌드위치',
                        menuInfo : '느끼한데 괜찮아요',
                        menuCarbo : 46,
                        menuProtein : 26,
                        menuFat: 16,
                    },
                ]
            }
        ];

        callback({ success : true, restaurants })
       } 
    },

    temp_restaurant : {
        restaurantAll(callback){
            const restaurants = [
                {
                    seq: 398,
                    place : "temp음식점1",
                    info : "temp제육볶음",
                    lat : 37.56089076590386, 
                    lng : 126.99645175708804
                },
                {
                    seq : 399,
                    place : "temp음식점2",
                    info : "temp돈까스",
                    lat : 37.56081417997729, 
                    lng : 126.99641214720332
                },
                {
                    seq: 400,
                    place : "temp음식점3",
                    info : "temp초밥",
                    lat : 37.561543987013806, 
                    lng : 126.99640079394858
                },
                {
                    seq: 401,
                    place : "temp음식점4",
                    info : "temp햄버거",
                    lat : 37.560944851198634,
                    lng : 126.99743643508589
                }
            ];
    
            callback({ success : true, restaurants })
           } 
    }
}


export {api}
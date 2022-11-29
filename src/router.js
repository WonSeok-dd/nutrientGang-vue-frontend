import Vue from "vue"
import VueRouter from "vue-router"

const DefaultLayout = () => import("@/layouts/Default/index.vue");
const AuthenticationLayout = () => import("@/layouts/Auth/index.vue");
const MyPageLayout = () => import("@/layouts/MyPage/index.vue");
const RecommendLayout = () => import("@/layouts/Recommend/index.vue");
const SettingLayout = () => import("@/layouts/Setting/index.vue");


// DefaultLayout
const DashBoard = () => import("./components/DashBoard.vue")

//AuthenticationLayout
const SignIn = () => import('@/layouts/Auth/SignIn.vue')

const InfoFist = () => import("@/layouts/Auth/InfoFirstIn.vue");
const InfoSecond = () => import("@/layouts/Auth/InfoSecondIn.vue");
const InfoSignUp  = () => import("@/layouts/Auth/InfoSignUp.vue");

//MyPageLayout
const Diary = () => import("@/layouts/MyPage/Diary/Diary.vue");
const Report = () => import("@/layouts/MyPage/Report/Report.vue");

//RecommendLayout
const MenuRcn = () => import("@/layouts/Recommend/Menu/MenuRcn.vue");
const RestaurantRcn = () => import("@/layouts/Recommend/Restaurant/RestaurantRcn.vue");

//SettingLayout
//SettingLayout- Register
const WeightRegister = () => import("@/layouts/Setting/Register/Weight/WeightRegister.vue");

const MobileRegister = () =>import("@/layouts/Setting/Register/Image/MobileRegister.vue");
const TextRegister = () => import("@/layouts/Setting/Register/Image/TextRegister.vue");

const MealRegister = () => import("@/layouts/Setting/Register/Meal/MealRegister.vue");

//SettingLayout
//SettingLayout - Modify
const WeightModify = () => import("@/layouts/Setting/Modify/Weight/WeightModify.vue");

const MealModify = () => import("@/layouts/Setting/Modify/Meal/MealModify.vue");
const MealDetailModify = () => import("@/layouts/Setting/Modify/Meal/MealDetailModify.vue");


Vue.use(VueRouter)
const routes = [

    {
        path: "/",
        component : DefaultLayout,
        children : [

            {
                path :"",
                component : DashBoard
            },
        ]
    },

    {
        name : "authentication",
        path: "/authentication",
        component : AuthenticationLayout,
        children : [
            {
                name : 'info-first',
                path : 'info-first',
                component : InfoFist
            },
            {  
                name : 'info-second',
                path : 'info-second',
                component : InfoSecond,
            },
            {
                name : 'info-sign-up',
                path : 'info-sign-up',
                component : InfoSignUp
            },
            {
                name : 'sign-in',
                path : "sign-in",
                component : SignIn
            },
        ]
    },

    {
        path: "/mypage",
        component : MyPageLayout,
        children : [
            {   
                name : 'Diary',
                path : "diary",
                component : Diary,

            },
            {
                name : 'Report',
                path : "report",
                component : Report
            },
        ]
    },

    {
        path : '/recommend',
        component : RecommendLayout,
        children : [
            {
                name : "MenuRcn",
                path : 'menu',
                component : MenuRcn,
                props : true,
            },
            {
                name : "RestaurantRcn",
                path : 'restaurant',
                component : RestaurantRcn,
                props : true,
            }
        ]
    },

    {
        path : '/setting/register',
        component : SettingLayout,
        children : [
            {
                name : "WeightRegister",
                path : 'weight',
                component : WeightRegister,
                props : true,
            },
            {
                name : "MobileRegister",
                path : 'image/mobile',
                component : MobileRegister,
                props : true,
            },
            {
                name : "TextRegister",
                path : 'image/text',
                component : TextRegister,
                props : true,
            },
            {
                name : "MealRegister",
                path : 'meal',
                component : MealRegister,
                props : true,
            },
        ]
    },

    {
        path : '/setting/modify',
        component : SettingLayout,
        children : [
            {
                name : "WeightModify",
                path : 'weight',
                component : WeightModify,
                props : true,
            },
            {
                name : "MealModify",
                path : 'meal',
                component : MealModify,
                props : true,
            },
            {
                name : "MealDetailModify",
                path : 'meal/detail',
                component : MealDetailModify,
                props : true,
            },
        ]
    }

];

const router = new VueRouter({
    mode : "history",
    routes
})

export {router}; 
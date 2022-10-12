import Vue from "vue"
import VueRouter from "vue-router"

const DefaultLayout = () => import("@/layouts/default/index.vue")
const AuthenticationLayout = () => import("@/layouts/authentication/index.vue")
const RegisterLayout = () => import("@/layouts/register/index.vue")
const MyPageLayout = () => import("@/layouts/mypage/index.vue")

// DefaultLayout
const RestaurantList = () => import("@/layouts/default/RestaurantList.vue")

//AuthenticationLayout
const SignIn = () => import('@/layouts/authentication/SignIn.vue')
const SignUp = () => import("@/layouts/authentication/SignUp.vue")

//RegisterLayout
const RegisterRestaurant = () => import("@/layouts/register/RegisterRestaurant.vue")

//MyPageLayout
const MyPage = () => import("@/layouts/mypage/MyPage.vue")
const UpdateRestaurant = () => import("@/layouts/mypage/UpdateRestaurant.vue");


Vue.use(VueRouter)
const routes = [

    {
        path: "/",
        component : DefaultLayout,
        children : [

            {
                path :"",
                component : RestaurantList
            },
        ]
    },

    {   
        name : 'authentication',
        path: "/authentication",
        component : AuthenticationLayout,
        children : [
            {
                name : 'sign-up',
                path : 'sign-up',
                component : SignUp
            },
            {
                name : 'sign-in',
                path : "sign-in",
                component : SignIn
            },
        ]
    },

    {
        path: "/register",
        component : RegisterLayout,
        children : [
            {
                path : '',
                component : RegisterRestaurant
            },

        ]
    },

    {
        name : 'mypage',
        path: "/mypage",
        component : MyPageLayout,
        children : [
            {
                path : '',
                component : MyPage
            },
            {
                name : 'update',
                path : 'update',
                component : UpdateRestaurant,
                props : true
            }
        ]
    }
];

const router = new VueRouter({
    mode : "history",
    routes
})

export {router}; 
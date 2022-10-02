import Vue from "vue"
import VueRouter from "vue-router"

const DefaultLayout = () => import("@/layouts/default/index.vue")
const AuthenticationLayout = () => import("@/layouts/authentication/index.vue")
const RegisterLayout = () => import("@/layouts/register/index.vue")

// DefaultLayout
const RestaurantList = () => import("@/layouts/default/RestaurantList.vue")

//AuthenticationLayout
const SignIn = () => import('@/layouts/authentication/SignIn.vue')
const SignUp = () => import("@/layouts/authentication/SignUp.vue")

//RegisterLayout
const RegisterRestaurant = () => import("@/layouts/register/RegisterRestaurant.vue")


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
        path: "/authentication",
        component : AuthenticationLayout,
        children : [
            {
                path : 'sign-up',
                component : SignUp
            },
            {
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
];

const router = new VueRouter({
    mode : "history",
    routes
})

export {router}; 
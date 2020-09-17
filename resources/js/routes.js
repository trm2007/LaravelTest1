import VueRouter from 'vue-router'
import MainPage from "./components/MainPage.vue"

export default new VueRouter({
  mode: "history",
  routes: [
    // динамические сегменты начинаются с двоеточия
    { 
        path: "/admin", 
        component: MainPage 
    },
    { 
        path: "/admin/users/:UserId?", 
        component: () => import("./components/User.vue"), //User,
        name: "User",
        props: true
    },
    {
        path: "/admin/departments/:DepartmentId?",
        component: () => import("./components/Department.vue"), //Department,
        name: "Depatmernt",
        props: true
    }
  ]
});
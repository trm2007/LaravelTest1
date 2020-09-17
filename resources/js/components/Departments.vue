<template>
    <div class="container">
        <div class="row info light-gray">
            <h1 class="col-10">Отделы</h1>
            <router-link :to="{ name: 'Depatmernt' }" class="col-2">
                <button class="btn btn-info">New</button>
            </router-link>
        </div>
        <ul>
            <li v-for="Department in Departments" 
                 :key="Department.id" 
                 class="card mb-3"
                >
                <div class="row no-gutters">
                    <div class="col-md-3"><img :src="Department.logo ? Department.logo : '/storage/app/logo/stublogo.jpg'" 
                          class="card-img"
                    ></div>
                    <div class="col-md-8">
                        <div class="card-body">
                            <h5 class="card-title">
                                {{ Department.id }} . {{ Department.title }}
                            </h5>
                            <p class="card-text" v-if="Department.users && Department.users.length">Сотрудники</p>
                            <ul class="card-text">
                                <li v-for="User in Department.users"><small>{{ User.id }}. {{ User.name }}</small></li>
                            </ul>
                        </div>
                    </div>
                    <div class="col-md-1">
                        <router-link :to="{ name: 'Depatmernt', params: { DepartmentId: Department.id }}">
                            <button class="btn btn-primary">Edit</button>
                        </router-link>
                        <button class="btn btn-danger" @click="deleteDepartment(Department.id)">Delete</button>
                    </div>

                </div>
            </li>
        </ul>


        <nav aria-label="Page navigation">
          <ul class="pagination justify-content-center mt-2">
            <li v-for="Link in $store.state.Links"
                v-if="Link.url"
                :class="!Link.active ? 'page-item' : 'page-item active'"
                ><span 
                    class="page-link"
                    @click="$store.dispatch('getAllDepartments', Link.url)">{{ Link.label }}</span></li>
          </ul>
        </nav>

    </div>
</template>

<script>
import Store from "../store"

export default {
    data(){
        return {
            //Departments: []
        };
    },
    
    computed: {
        Departments () {
            return Store.state.Departments;
        }
    },
    mounted()
    {
        Store.dispatch("getAllDepartments");
    },
    methods: {
        deleteDepartment: function (DepartmentId){
            Store.dispatch("deleteDepartment", DepartmentId);
        }
    }
}
</script>
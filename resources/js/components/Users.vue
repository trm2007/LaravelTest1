<template>
    <div class="container">
        <div class="row info light-gray">
            <h1 class="col-10">Сотрудники</h1>
            <router-link :to="{ name: 'User' }" class="col-2">
                <button class="btn btn-info">New</button>
            </router-link>
        </div>
        <ul>
            <li v-for="User in Users" :key="User.id" class="card mb-3">
                <div class="row no-gutters">
                    <div class="col-md-3"><img :src="User.profile_photo_path  ? '/storage/' + User.profile_photo_path : '/storage/app/logo/stublogo.jpg'" 
                          class="card-img">
                    </div>
                    <div class="col-md-8">
                        <div class="card-body">
                            <h5 class="card-title">{{ User.id }} . {{ User.name }}</h5>
                            <p class="card-text">{{ User.email }}</p>
                        </div>
                    </div>
                    <div class="col-md-1">
                        <router-link :to="{ name: 'User', params: { UserId: User.id }}">
                            <button class="btn btn-primary">Edit</button>
                        </router-link>
                        <button class="btn btn-danger">Delete</button>
                    </div>
                </div>
            </li>
        </ul>

    </div>
</template>

<script>
import Store from "../store"

export default {
    data(){
        return {
            //Users: []
        };
    },
    computed: {
        Users () {
            return Store.state.Users;
        }
    },     
    mounted()
    {
        this.getAllUsers();
    },
    methods: {
        getAllUsers: function (){
            Store.dispatch("getAllUsers");
        }
    }
}
</script>
<template>
    <div v-if="UserId">
        <h1>Сотрудник {{ User.name }}</h1>
        <div>
            {{ User.id }} . {{ User.name }} . {{ User.email }}
        </div>

    </div>
</template>

<script>
import Store from "../store"

export default {
    props: {
        UserId: null
    },
    data(){
        return {
            //User: {}
        };
    },
    computed: {
        User () {
            return store.state.CurrentUser;
        }
    },    
    mounted()
    {
        if(!this.UserId) { return; }
        this.getUser(UserId);
        /*
        axios.get(UserId)
        .then(response => {
            this.User = response.data;
        } )
        .catch( E => console.log(E) );
         */
    },
    methods: {
        getUser: function (id){
            Store.commit("getUser", id)
        }
    }
}
</script>
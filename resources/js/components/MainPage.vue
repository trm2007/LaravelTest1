<template>
    <div class="content">
        <ul class="nav nav-tabs justify-content-center">
            <li class="nav-item">
                <span @click="TabModel=0" :class="TabModel==0 ? 'nav-link active' : 'nav-link'">Отделы</span>
            </li>
            <li class="nav-item">
                <span @click="TabModel=1" :class="TabModel==1 ? 'nav-link active' : 'nav-link'">Сотрудники</span>
            </li>
        </ul>
        <departments v-if="TabModel==0"></departments>
        <users v-if="TabModel==1"></users>
    </div>
</template>

<script>
import Users from "./Users";
import Departments from "./Departments";

export default {
        data() {
            return {
                TabModel: 0
            };
        },
        components: {
            Users,
            Departments
        }
}
</script>
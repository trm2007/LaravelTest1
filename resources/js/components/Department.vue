<template>
    <div class="container">
        <div class="content">
            <h1>{{ DepartmentId ? "Отдел - [" + Department.id + "]" : "Создание нового отдела" }}</h1>
            <form id="DepartmentForm" enctype="multipart/form-data" method="POST">
                <input type="hidden" name="_token" :value="csrf">
                <input type="hidden" name="_method" value="PATCH" v-if="DepartmentId">
                <input type="hidden" name="id" :value="Department.id ? Department.id : ''">
                <div class="form-group">
                    <label for="title">название отдела:</label><br>
                    <input type="text" 
                           name="title" 
                           v-model="Department.title" 
                           placeholder="название отдела"
                           class="form-control">
                </div>
                <div class="form-group">
                    <label for="comment">комментарий:</label><br>
                    <textarea name="comment" 
                              placeholder="комментарий" 
                              v-model="Department.comment"
                              class="form-control"></textarea>
                </div>
                <div class="form-group">
                    <label for="logo">Логотип:</label><br>
                    <img :src="CalculatedImage" 
                         style="max-width: 200px; cursor: pointer;" 
                         @click='pickFile'><br>
                    <input
                        type="text"
                        @click='pickFile' 
                        :value='Department.logo' 
                        name="logo"
                        placeholder="Выбрать новое изображение"
                        class="form-control">
                    <input
                        type="file"
                        style="display: none"
                        ref="image"
                        name="image"
                        accept="image/*"
                        @change="loadImageOnSrc"
                        class="form-control">
                </div>
                <div class="form-group">
                    <p v-for="User in Users"><input 
                        :key="User.id"
                        type="checkbox" 
                        name="Users[]"
                        :value="User.id"
                        v-model="DepartmentUsersIdArray"
                        class="form-check-input"> {{User.name + '-' + User.email}}</p>
                </div>
            </form>
            <button v-if="DepartmentId" class="btn btn-success" @click="saveDepartment">Сохранить</button>
            <button v-else class="btn btn-success" @click="createDepartment">Создать</button>
        </div>
    </div>
</template>

<script>
import Store from "../store"

export default {
    props: {
        DepartmentId: null
    },
    data(){
        return {
            csrf: csrf_token,
            ImageSrc: "",
//            ImageName: "",
//            SelectedUsers: [],
            SubLogoFileName: '/storage/app/logo/stublogo.jpg'
            //Department: {}
        };
    },
    computed: {
        // вычисляется, что передавать в атрибут src для тега img, 
        // это либо имя файла на сервере, либо данные (содержимое) самой картинки
        CalculatedImage: function ()
        {
            if (this.ImageSrc.length > 0) {
                return this.ImageSrc;
            }
            if(!this.Department.logo || !this.Department.logo.length)
            {
                return this.SubLogoFileName;
            }
            return '/'+this.Department.logo;
        },
        // используется в качестве модели для данных текущего отдела
        Department: {
            get(){
                return Store.state.CurrentDepartment;
            },
            set(Department){
                Store.commit('setCurrentDepartment', Department);
            }
        },
        // используется в качестве модели для сотрудников текущего отдела
        DepartmentUsersIdArray: {
            get(){
                return Store.state.CurrentDepartmentUsersIdArray;
            },
            set(DepartmentUsers){
                Store.commit('setDepartmentUsers', DepartmentUsers);
            }
        },
        // возвращает список всех сотрудников
        Users () {
            return Store.state.Users;
        }
    },
    watched()
    {
        DepartmentId: () => {
            this.getDepartment();
        };
    },
    created()
    {
        this.getDepartment();
        Store.dispatch("getAllUsers");
    },
    methods: {
        // если в адресе есть ID-отдела = DepartmentId
        // То запрос к серверу, иначе создается новый
        getDepartment: function(){
            if(!this.DepartmentId)
            {
                Store.dispatch("getNewDepartment");
            }
            else
            {
                Store.dispatch("getDepartment", this.DepartmentId);
            }
        },
        // эмуляция нажатия на выбор файла
        pickFile: function () {
            this.$refs.image.click ();
        },
        // получение сожержимого картинки из локального файла
        loadImageOnSrc: function (ev)
        {
            // если изменения произошли в результате выбора нового файла пользователем, то обрабатываем
            if (!ev.target.files || !ev.target.files.length) {
                console.log("Ничего не выбрано!");
                return;
            }
            const reader = new FileReader();
            // в обработчике события загрузки для объекта FileReader 
            // сохраняем данные файла в переменную this.ImageSrc
            reader.onload = e => {
                Store.commit('setImageFileObject', ev.target.files[0]);
//                this.Department.logo = ev.target.files[0];
//                this.ImageName = this.Department.logo.name;
                this.ImageSrc = e.target.result;
            };

            // работаем только с одним - первым (точнее нулевым в массиве) файлом
            reader.readAsDataURL(ev.target.files[0]);
        },
        // сохраняем данные отдела на сервере
        saveDepartment: function ()
        {
            Store.dispatch("saveDepartment", (new FormData(DepartmentForm)));
        },
        // сохраняем новый отдел
        createDepartment: function ()
        {
            Store.dispatch("createDepartment", (new FormData(DepartmentForm)));
        }
    }
}
</script>
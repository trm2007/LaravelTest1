import Vue from 'vue'
import Vuex from 'vuex'
import Router from "../routes.js"

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        // все сотрудники
        Users: [],
        // отображаемые отделы
        Departments: [],
        // редактируемый (текущий) сотрудник
        CurrentUser: {},
        // редактируемый (текущий) отдел
        CurrentDepartment: {},
        // список сотрудников для редактируемого отдела
        CurrentDepartmentUsersIdArray: [],
        // ссылки для пагинатора
        Links: [],
        
        // вспомогательный флаг, устанавливается в true во время загрузки данных с сервера
        LoadingFlag: false,
        
        // URL запросов...
        GetAllUsersURL: "/admin/users",
        GetAllDepartmentsURL: "/admin/departments",
        GetUserURL: "/admin/users",
        PostUserURL: "/admin/users",
        GetDepartmentURL: "/admin/departments",
        PostDepartmentURL: "/admin/departments",
        DeleteDepartmentURL: "/admin/departments"
    },
    getters: {
        
    },
    mutations: {
        setUsers(state, Users)
        {
            state.Users.splice(0,state.Users.length);
            if(!Users || !Users.length) {return;}
            Users.forEach( function(item) {
                state.Users.push(item);
            });
        },
        setDepartments(state, Departments)
        {
            state.Departments.splice(0,state.Departments.length);
            state.Links.splice(0,state.Links.length);
            if(!Departments.data || !Departments.data.length) {return;}
            Departments.data.forEach( function(item) {
                state.Departments.push(item);
            });
            if(!Departments.links || !Departments.links.length) {return;}
            Departments.links.forEach( function(item) {
                state.Links.push(item);
            });
        },
        setCurrentUser(state, CurrentUser)
        {
            state.CurrentUser = CurrentUser;
        },
        resetUsersIdArray(state)
        {
            if(state.CurrentDepartmentUsersIdArray.length)
            {
                state.CurrentDepartmentUsersIdArray.splice(0,state.CurrentDepartmentUsersIdArray.length);
                state.CurrentDepartmentUsersIdArray.length = 0;
            }
        },
        setCurrentDepartment(state, CurrentDepartment)
        {
            state.CurrentDepartment = CurrentDepartment;
            this.commit("resetUsersIdArray");
            if(CurrentDepartment.users && CurrentDepartment.users.length)
            {
                CurrentDepartment.users.forEach(item => {
                    state.CurrentDepartmentUsersIdArray.push(item.id);
                });
            }
        },
        setImageFileObject(state, LogoFileObject)
        {
            state.CurrentDepartment.image = LogoFileObject;
            state.CurrentDepartment.logo = LogoFileObject.name;
        },
        setDepartmentUsers(state, DepartmentUsers)
        {
            this.commit("resetUsersIdArray");

            DepartmentUsers.forEach( item => {
                state.CurrentDepartmentUsersIdArray.push(item);
            });
        },
        removeDepartmentFromArray(state, DepartmentId)
        {
            let id = state.Departments.findIndex( item => item.id == DepartmentId );
            if(id !== -1)
            {
                state.Departments.splice(id,1);
            }
        },
        clearCurrentDepartment(state)
        {
            this.commit("resetUsersIdArray");

            state.CurrentDepartment.id = null;
            state.CurrentDepartment.title = "";
            state.CurrentDepartment.logo = "";
            state.CurrentDepartment.comment = "";
            state.CurrentDepartment.image = {};
            state.CurrentDepartment.users = [];
        }
    },
    actions: {
        getAllUsers({commit, state})
        {
            state.LoadingFlag = true;
            axios.get( state.GetAllUsersURL )
            .then(response => {
                commit("setUsers", response.data);
                state.LoadingFlag = false;
            })
            .catch(function (error) {
                console.log(error);
                state.LoadingFlag = false;
            });
        },
        getUser({commit, state}, UserId)
        {
            state.LoadingFlag = true;
            axios.get( state.GetAllUsersURL +"/"+ UserId )
            .then(response => {
                commit("setCurrentUser", response.data);
                state.LoadingFlag = false;
            })
            .catch(function (error) {
                console.log(error);
                state.LoadingFlag = false;
            });
        },
        getAllDepartments({commit, state}, CurrentUrl)
        {
            state.LoadingFlag = true;
            if(!CurrentUrl) { CurrentUrl = state.GetAllDepartmentsURL; }
            axios.get( CurrentUrl )
            .then(response => {
                commit("setDepartments", response.data);
                state.LoadingFlag = false;
            })
            .catch(function (error) {
                console.log(error);
                state.LoadingFlag = false;
            });
        },
        getNewDepartment({commit})
        {
            commit("clearCurrentDepartment");
        },
        getDepartment({commit, state}, DepartmentId)
        {
            state.LoadingFlag = true;
            axios.get( state.GetDepartmentURL + "/" + DepartmentId )
            .then(response => {
                commit("setCurrentDepartment", response.data);
                state.LoadingFlag = false;
            })
            .catch(function (error) {
                console.log(error);
                state.LoadingFlag = false;
            });
        },
        saveDepartment({state, dispatch}, DepartmentFormData)
        {
            dispatch("commonSave", {DepartmentFormData: DepartmentFormData, id: state.CurrentDepartment.id});
        },
        createDepartment({dispatch}, DepartmentFormData)
        {
            dispatch("commonSave", {DepartmentFormData: DepartmentFormData, id: null});
        },
        commonSave({state, commit}, {DepartmentFormData, id})
        {
            if(!state.CurrentDepartment.title) { return; }
            state.LoadingFlag = true;
            let CurrentUrl = state.PostDepartmentURL;
            const headers = {
                                'Content-Type': 'multipart/form-data',
                                'X-CSRF-TOKEN': csrf_token
                            };
            if(id) { CurrentUrl = CurrentUrl + "/" + id; }
////            axios.post( CurrentUrl, DepartmentFormData, { "headers": headers } )
            axios.post( CurrentUrl, DepartmentFormData )
            .then(response => {
                commit("setCurrentDepartment", response.data);
                alert("Успешное сохранение!");
                if(!id) { Router.push({ name: 'Depatmernt', params: { DepartmentId: state.CurrentDepartment.id }}); } 
                state.LoadingFlag = false;
            })
            .catch(function (error) {
                console.log("commonSave Error:", error);
                state.LoadingFlag = false;
            });            
        },
        commonSave2: async function ({state, commit}, {DepartmentFormData, id})
        {
            if(state.CurrentDepartment.title)
            {
                let CurrentUrl = state.PostDepartmentURL;
                if(id) { CurrentUrl = CurrentUrl + "/" + id; }
                let response;
                try {
                response = await fetch( CurrentUrl, {
                    method: 'POST',
                    headers:  { 
                        'X-CSRF-TOKEN': csrf_token
                    },
                    body: DepartmentFormData
                });
                }
                catch(e){
                    console.log("commonSave Error:", e);
                }
                let result = await response.json();
                if( !result || result._error  )
                {
                    alert("Ошибка сохранения");
                    return;
                }
                //state.CurrentDepartment.logo = result.logo;
                alert("Успешное сохранение!");
                commit("setCurrentDepartment", result);
                if(!id) { Router.push({ name: 'Depatmernt', params: { DepartmentId: state.CurrentDepartment.id }}); } 
            }            
        },
        deleteDepartment: async function ({state, commit}, DepartmentId)
        {
            if(!confirm("Удалить отдел №" + DepartmentId)) {return;}
            
            let response = await fetch( state.DeleteDepartmentURL + "/" + DepartmentId, {
                method: 'DELETE',
                headers:  { 
                    'X-CSRF-TOKEN': csrf_token
                },
                body: {DepartmentId}
            });

            let result = await response.json();
            if( !result || result._error  )
            {
                alert("Ошибка удаления");
                return;
            }
            commit("removeDepartmentFromArray", DepartmentId);
        }
    }
});
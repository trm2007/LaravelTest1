(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[0],{

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/Department.vue?vue&type=script&lang=js&":
/*!*********************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/Department.vue?vue&type=script&lang=js& ***!
  \*********************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _store__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../store */ "./resources/js/store/index.js");
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/* harmony default export */ __webpack_exports__["default"] = ({
  props: {
    DepartmentId: null
  },
  data: function data() {
    return {
      csrf: csrf_token,
      ImageSrc: "",
      //            ImageName: "",
      //            SelectedUsers: [],
      SubLogoFileName: '/storage/app/logo/stublogo.jpg' //Department: {}

    };
  },
  computed: {
    // вычисляется, что передавать в атрибут src для тега img, 
    // это либо имя файла на сервере, либо данные (содержимое) самой картинки
    CalculatedImage: function CalculatedImage() {
      if (this.ImageSrc.length > 0) {
        return this.ImageSrc;
      }

      if (!this.Department.logo || !this.Department.logo.length) {
        return this.SubLogoFileName;
      }

      return '/' + this.Department.logo;
    },
    // используется в качестве модели для данных текущего отдела
    Department: {
      get: function get() {
        return _store__WEBPACK_IMPORTED_MODULE_0__["default"].state.CurrentDepartment;
      },
      set: function set(Department) {
        _store__WEBPACK_IMPORTED_MODULE_0__["default"].commit('setCurrentDepartment', Department);
      }
    },
    // используется в качестве модели для сотрудников текущего отдела
    DepartmentUsersIdArray: {
      get: function get() {
        return _store__WEBPACK_IMPORTED_MODULE_0__["default"].state.CurrentDepartmentUsersIdArray;
      },
      set: function set(DepartmentUsers) {
        _store__WEBPACK_IMPORTED_MODULE_0__["default"].commit('setDepartmentUsers', DepartmentUsers);
      }
    },
    // возвращает список всех сотрудников
    Users: function Users() {
      return _store__WEBPACK_IMPORTED_MODULE_0__["default"].state.Users;
    }
  },
  watched: function watched() {
    var _this = this;

    DepartmentId: (function () {
      _this.getDepartment();
    });
  },
  created: function created() {
    this.getDepartment();
    _store__WEBPACK_IMPORTED_MODULE_0__["default"].dispatch("getAllUsers");
  },
  methods: {
    // если в адресе есть ID-отдела = DepartmentId
    // То запрос к серверу, иначе создается новый
    getDepartment: function getDepartment() {
      if (!this.DepartmentId) {
        _store__WEBPACK_IMPORTED_MODULE_0__["default"].dispatch("getNewDepartment");
      } else {
        _store__WEBPACK_IMPORTED_MODULE_0__["default"].dispatch("getDepartment", this.DepartmentId);
      }
    },
    // эмуляция нажатия на выбор файла
    pickFile: function pickFile() {
      this.$refs.image.click();
    },
    // получение сожержимого картинки из локального файла
    loadImageOnSrc: function loadImageOnSrc(ev) {
      var _this2 = this;

      // если изменения произошли в результате выбора нового файла пользователем, то обрабатываем
      if (!ev.target.files || !ev.target.files.length) {
        console.log("Ничего не выбрано!");
        return;
      }

      var reader = new FileReader(); // в обработчике события загрузки для объекта FileReader 
      // сохраняем данные файла в переменную this.ImageSrc

      reader.onload = function (e) {
        _store__WEBPACK_IMPORTED_MODULE_0__["default"].commit('setImageFileObject', ev.target.files[0]); //                this.Department.logo = ev.target.files[0];
        //                this.ImageName = this.Department.logo.name;

        _this2.ImageSrc = e.target.result;
      }; // работаем только с одним - первым (точнее нулевым в массиве) файлом


      reader.readAsDataURL(ev.target.files[0]);
    },
    // сохраняем данные отдела на сервере
    saveDepartment: function saveDepartment() {
      _store__WEBPACK_IMPORTED_MODULE_0__["default"].dispatch("saveDepartment", new FormData(DepartmentForm));
    },
    // сохраняем новый отдел
    createDepartment: function createDepartment() {
      _store__WEBPACK_IMPORTED_MODULE_0__["default"].dispatch("createDepartment", new FormData(DepartmentForm));
    }
  }
});

/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/Department.vue?vue&type=template&id=7c01f6fd&":
/*!*************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/Department.vue?vue&type=template&id=7c01f6fd& ***!
  \*************************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("div", { staticClass: "container" }, [
    _c("div", { staticClass: "content" }, [
      _c("h1", [
        _vm._v(
          _vm._s(
            _vm.DepartmentId
              ? "Отдел - [" + _vm.Department.id + "]"
              : "Создание нового отдела"
          )
        )
      ]),
      _vm._v(" "),
      _c(
        "form",
        {
          attrs: {
            id: "DepartmentForm",
            enctype: "multipart/form-data",
            method: "POST"
          }
        },
        [
          _c("input", {
            attrs: { type: "hidden", name: "_token" },
            domProps: { value: _vm.csrf }
          }),
          _vm._v(" "),
          _vm.DepartmentId
            ? _c("input", {
                attrs: { type: "hidden", name: "_method", value: "PATCH" }
              })
            : _vm._e(),
          _vm._v(" "),
          _c("input", {
            attrs: { type: "hidden", name: "id" },
            domProps: { value: _vm.Department.id ? _vm.Department.id : "" }
          }),
          _vm._v(" "),
          _c("div", { staticClass: "form-group" }, [
            _c("label", { attrs: { for: "title" } }, [
              _vm._v("название отдела:")
            ]),
            _c("br"),
            _vm._v(" "),
            _c("input", {
              directives: [
                {
                  name: "model",
                  rawName: "v-model",
                  value: _vm.Department.title,
                  expression: "Department.title"
                }
              ],
              staticClass: "form-control",
              attrs: {
                type: "text",
                name: "title",
                placeholder: "название отдела"
              },
              domProps: { value: _vm.Department.title },
              on: {
                input: function($event) {
                  if ($event.target.composing) {
                    return
                  }
                  _vm.$set(_vm.Department, "title", $event.target.value)
                }
              }
            })
          ]),
          _vm._v(" "),
          _c("div", { staticClass: "form-group" }, [
            _c("label", { attrs: { for: "comment" } }, [
              _vm._v("комментарий:")
            ]),
            _c("br"),
            _vm._v(" "),
            _c("textarea", {
              directives: [
                {
                  name: "model",
                  rawName: "v-model",
                  value: _vm.Department.comment,
                  expression: "Department.comment"
                }
              ],
              staticClass: "form-control",
              attrs: { name: "comment", placeholder: "комментарий" },
              domProps: { value: _vm.Department.comment },
              on: {
                input: function($event) {
                  if ($event.target.composing) {
                    return
                  }
                  _vm.$set(_vm.Department, "comment", $event.target.value)
                }
              }
            })
          ]),
          _vm._v(" "),
          _c("div", { staticClass: "form-group" }, [
            _c("label", { attrs: { for: "logo" } }, [_vm._v("Логотип:")]),
            _c("br"),
            _vm._v(" "),
            _c("img", {
              staticStyle: { "max-width": "200px", cursor: "pointer" },
              attrs: { src: _vm.CalculatedImage },
              on: { click: _vm.pickFile }
            }),
            _c("br"),
            _vm._v(" "),
            _c("input", {
              staticClass: "form-control",
              attrs: {
                type: "text",
                name: "logo",
                placeholder: "Выбрать новое изображение"
              },
              domProps: { value: _vm.Department.logo },
              on: { click: _vm.pickFile }
            }),
            _vm._v(" "),
            _c("input", {
              ref: "image",
              staticClass: "form-control",
              staticStyle: { display: "none" },
              attrs: { type: "file", name: "image", accept: "image/*" },
              on: { change: _vm.loadImageOnSrc }
            })
          ]),
          _vm._v(" "),
          _c(
            "div",
            { staticClass: "form-group" },
            _vm._l(_vm.Users, function(User) {
              return _c("p", [
                _c("input", {
                  directives: [
                    {
                      name: "model",
                      rawName: "v-model",
                      value: _vm.DepartmentUsersIdArray,
                      expression: "DepartmentUsersIdArray"
                    }
                  ],
                  key: User.id,
                  staticClass: "form-check-input",
                  attrs: { type: "checkbox", name: "Users[]" },
                  domProps: {
                    value: User.id,
                    checked: Array.isArray(_vm.DepartmentUsersIdArray)
                      ? _vm._i(_vm.DepartmentUsersIdArray, User.id) > -1
                      : _vm.DepartmentUsersIdArray
                  },
                  on: {
                    change: function($event) {
                      var $$a = _vm.DepartmentUsersIdArray,
                        $$el = $event.target,
                        $$c = $$el.checked ? true : false
                      if (Array.isArray($$a)) {
                        var $$v = User.id,
                          $$i = _vm._i($$a, $$v)
                        if ($$el.checked) {
                          $$i < 0 &&
                            (_vm.DepartmentUsersIdArray = $$a.concat([$$v]))
                        } else {
                          $$i > -1 &&
                            (_vm.DepartmentUsersIdArray = $$a
                              .slice(0, $$i)
                              .concat($$a.slice($$i + 1)))
                        }
                      } else {
                        _vm.DepartmentUsersIdArray = $$c
                      }
                    }
                  }
                }),
                _vm._v(" " + _vm._s(User.name + "-" + User.email))
              ])
            }),
            0
          )
        ]
      ),
      _vm._v(" "),
      _vm.DepartmentId
        ? _c(
            "button",
            {
              staticClass: "btn btn-success",
              on: { click: _vm.saveDepartment }
            },
            [_vm._v("Сохранить")]
          )
        : _c(
            "button",
            {
              staticClass: "btn btn-success",
              on: { click: _vm.createDepartment }
            },
            [_vm._v("Создать")]
          )
    ])
  ])
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./resources/js/components/Department.vue":
/*!************************************************!*\
  !*** ./resources/js/components/Department.vue ***!
  \************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Department_vue_vue_type_template_id_7c01f6fd___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Department.vue?vue&type=template&id=7c01f6fd& */ "./resources/js/components/Department.vue?vue&type=template&id=7c01f6fd&");
/* harmony import */ var _Department_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Department.vue?vue&type=script&lang=js& */ "./resources/js/components/Department.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _Department_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _Department_vue_vue_type_template_id_7c01f6fd___WEBPACK_IMPORTED_MODULE_0__["render"],
  _Department_vue_vue_type_template_id_7c01f6fd___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/components/Department.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/components/Department.vue?vue&type=script&lang=js&":
/*!*************************************************************************!*\
  !*** ./resources/js/components/Department.vue?vue&type=script&lang=js& ***!
  \*************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Department_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/babel-loader/lib??ref--4-0!../../../node_modules/vue-loader/lib??vue-loader-options!./Department.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/Department.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Department_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/components/Department.vue?vue&type=template&id=7c01f6fd&":
/*!*******************************************************************************!*\
  !*** ./resources/js/components/Department.vue?vue&type=template&id=7c01f6fd& ***!
  \*******************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Department_vue_vue_type_template_id_7c01f6fd___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../node_modules/vue-loader/lib??vue-loader-options!./Department.vue?vue&type=template&id=7c01f6fd& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/Department.vue?vue&type=template&id=7c01f6fd&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Department_vue_vue_type_template_id_7c01f6fd___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Department_vue_vue_type_template_id_7c01f6fd___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ })

}]);
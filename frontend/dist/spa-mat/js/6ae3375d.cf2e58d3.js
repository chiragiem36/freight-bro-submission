(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["6ae3375d"],{"5cd1":function(t,e,n){},d2ba:function(t,e,n){"use strict";n.r(e);var a=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"row flex flex-center text-center"},[t.loading?n("div",{staticClass:"col-xs-12"},[n("q-spinner",{attrs:{color:"primary",size:"32px"}})],1):n("div",{staticClass:"col-xs-12"},[n("div",{staticClass:"row justify-center"},[n("q-field",{attrs:{label:"Project name"}},[n("q-input",{model:{value:t.name,callback:function(e){t.name=e},expression:"name"}})],1)],1),n("div",{staticClass:"row justify-center",staticStyle:{"margin-top":"20px"}},[n("q-btn",{attrs:{disabled:t.loading,color:"primary",icon:"add",label:"Create project"},on:{click:t.create}})],1)])])},s=[];a._withStripped=!0;n("7f7f");var i={data:function(){return{name:"",loading:!1}},methods:{create:function(){var t=this;0!==this.name.length&&(this.loading=!0,this.$http.post("/project/new",{name:this.name}).then(function(e){var n=t.$store.state.user.projects||[];n.push(e.body),t.$store.commit("user/setObj",{projects:n}),t.name=""}).catch(function(e){console.error(e),t.$q.notify({message:"Error adding new project"})}).then(function(){t.loading=!1}))}}},r=i,o=(n("ff64"),n("2877")),c=Object(o["a"])(r,a,s,!1,null,null,null);c.options.__file="NewProject.vue";e["default"]=c.exports},ff64:function(t,e,n){"use strict";var a=n("5cd1"),s=n.n(a);s.a}}]);
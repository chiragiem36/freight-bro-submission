(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["1a1710ea"],{"35ba":function(e,t,a){"use strict";var s=a("b260"),i=a.n(s);i.a},"851a":function(e,t,a){"use strict";a.r(t);var s=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"row justify-center"},[e.fetching?a("div",{staticClass:"col-xs-12"},[a("q-spinner",{staticStyle:{"margin-top":"100px"},attrs:{size:"36px",color:"primary"}})],1):a("div",{staticClass:"col-xs-12",staticStyle:{"overflow-y":"auto"},style:{"max-height":e.height-60+"px"}},[e._m(0),"info"===e.$route.name?a("div",{staticClass:"row justify-center",staticStyle:{"margin-top":"10px"}},[a("span",{staticClass:"text-bold"},[e._v("Full Path - ")]),a("span",{staticClass:"text-primary"},[e._v(e._s("/api/"+e.$store.state.user._id+"/"+e.$route.params.projectId+e.values.path))])]):e._e(),a("div",{staticClass:"row justify-center",staticStyle:{"margin-top":"20px"}},[a("q-select",{attrs:{options:e.options},model:{value:e.values.method,callback:function(t){e.$set(e.values,"method",t)},expression:"values.method"}}),a("q-input",{attrs:{placeholder:"Path | example - /get/users/list"},model:{value:e.values.path,callback:function(t){e.$set(e.values,"path",t)},expression:"values.path"}})],1),e._m(1),e._m(2),a("div",{staticClass:"row justify-center",staticStyle:{"margin-top":"5px"}},e._l(e.values.headers,function(t,s){return a("div",{key:s.toString(),staticClass:"col-xl-9 col-lg-9 col-sm-10 col-xs-12",staticStyle:{"margin-top":"5px"}},[a("div",{staticClass:"row justify-around"},[a("q-input",{attrs:{readonly:t.req,label:"key"},model:{value:t.key,callback:function(a){e.$set(t,"key",a)},expression:"header.key"}}),a("q-input",{attrs:{placeholder:"comma seperated",label:"value"},model:{value:t.value,callback:function(a){e.$set(t,"value",a)},expression:"header.value"}})],1)])})),a("div",{staticClass:"row justify-center",staticStyle:{"margin-top":"10px"}},[a("q-btn",{attrs:{label:"new",icon:"add",color:"orange-6"},on:{click:function(t){e.values.headers.push({key:"",value:""})}}})],1),"get"===e.values.method?[e._m(3),a("div",{staticClass:"row justify-center",staticStyle:{"margin-top":"20px"}},[a("q-select",{attrs:{"stack-label":"Response Type",options:e.resType},model:{value:e.values.response.type,callback:function(t){e.$set(e.values.response,"type",t)},expression:"values.response.type"}})],1),a("div",{staticClass:"row justify-center",staticStyle:{"margin-top":"5px"}},[a("q-input",{staticClass:"col-xs-10",attrs:{type:"textarea",placeholder:"Response body"},model:{value:e.values.response.value,callback:function(t){e.$set(e.values.response,"value",t)},expression:"values.response.value"}})],1)]:e._e(),a("div",{staticClass:"row justify-center",staticStyle:{"margin-top":"50px"}},[a("q-btn",{attrs:{label:"new"===e.$route.name?"add api":"save changes",icon:"new"===e.$route.name?"add":"save",color:"primary"},on:{click:e.add}})],1)],2)])},i=[function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"row justify-center",staticStyle:{"margin-top":"10px"}},[a("span",[e._v("REQEUST")])])},function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"row justify-center",staticStyle:{"margin-top":"20px"}},[a("span",[e._v("Required Headers")])])},function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"row justify-center",staticStyle:{"margin-top":"20px"}},[a("div",{staticClass:"col-xl-8 col-lg-8 col-sm-10 col-xs-12"},[a("div",{staticClass:"row justify-around"},[a("span",{staticClass:"col-xs-6 text-center"},[e._v("Key")]),a("span",{staticClass:"col-xs-6 text-center"},[e._v("Allowed Value")])])])])},function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"row justify-center",staticStyle:{"margin-top":"20px"}},[a("span",[e._v("Response")])])}];s._withStripped=!0;a("28a5"),a("456d"),a("f751"),a("ac6a"),a("cadf"),a("7f7f");var o={created:function(){"info"===this.$route.name&&this.fetchApiDetails()},data:function(){return{fetching:!1,values:{method:"get",path:"/",response:{type:"application/json",value:""},headers:[{key:"authkey",value:"*",req:!0},{key:"username",value:"*",req:!0},{key:"document_id",value:"*",req:!0}]},options:[{label:"GET",value:"get"},{label:"POST",value:"post"},{label:"PUT",value:"put"},{label:"DELETE",value:"delete"}],resType:[{label:"JSON",value:"application/json"},{label:"Text",value:"text/plain"},{label:"HTML",value:"text/html"}]}},watch:{"$route.path":function(){"info"===this.$route.name?this.fetchApiDetails():"new"===this.$route.nam&&(this.values={method:"get",path:"/",response:{type:"application/json",value:""},headers:[{key:"authkey",value:"*",req:!0},{key:"username",value:"*",req:!0},{key:"document_id",value:"*",req:!0}]})},"values.path":function(){"/"!==this.values.path[0]&&(this.values.path="/"+this.values.path)}},computed:{height:function(){return window.innerHeight}},methods:{alert:function(e){e.position="top-right",this.$q.notify(e)},fetchApiDetails:function(){var e=this;this.fetching=!0,this.$http.get("/project/id="+this.$route.params.projectId+"/api/method="+encodeURIComponent(this.$route.params.method)+"&path="+encodeURIComponent(this.$route.params.api)).then(function(t){var a={};Object.assign(a,t.body.api);var s=[];Object.keys(t.body.api.headers).forEach(function(e){s.push({key:e,value:t.body.api.headers[e].join(",")})}),a.headers=s,e.values=a}).catch(function(t){console.error(t),e.alert({message:"API not found",icon:"error",color:"negative"})}).then(function(){e.fetching=!1})},add:function(){var e=this,t={},a={};this.values.headers.forEach(function(e){t[e.key]=e.value.split(",")}),Object.assign(a,this.values),a.headers=t,this.fetching=!0,this.$http.put("/project/id="+this.$route.params.projectId+"/new-api",a).then(function(t){e.alert({message:"API created",color:"positive",icon:"check_circle"});var s=e.$store.state.user.project||{apis:[]};s.apis.push({path:a.path,method:a.method}),e.$store.commit("user/setObj",{project:s})}).catch(function(t){console.error(t),"API_EXIST"===t.code&&e.alert({message:"API with this path already exist",color:"negative",icon:"error"})}).then(function(){e.fetching=!1})}}},n=o,l=(a("35ba"),a("2877")),r=Object(l["a"])(n,s,i,!1,null,null,null);r.options.__file="Api.vue";t["default"]=r.exports},b260:function(e,t,a){}}]);
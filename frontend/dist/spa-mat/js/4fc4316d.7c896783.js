(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["4fc4316d"],{"3ea8":function(t,e,o){"use strict";o.r(e);var s=function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("div",{staticClass:"row"},[o("div",{staticClass:"col-xl-4 col-lg-4 col-md-5 col-sm-5 col-xs-12"},[o("div",{staticClass:"row justify-center items-center",staticStyle:{"border-right":"solid 1px rgb(210, 210, 210)"},style:{height:t.fullHeight-50+"px"}},[t.fetching?o("span",[o("q-spinner",{attrs:{size:"32px",color:"primary"}})],1):o("span",{staticClass:"col-xs-12 bg-grey-5 full-height list"},[o("menu-list",{attrs:{listData:t.listData}})],1)])]),o("router-view",{staticClass:"col-xl-8 col-lg-8 col-md-7 col-sm-7 col-xs-12",attrs:{name:"api"}})],1)},i=[];s._withStripped=!0;o("ac6a");var a={data:function(){return{fetching:!1}},components:{"menu-list":function(){return o.e("d03043b6").then(o.bind(null,"72c0"))}},created:function(){this.getProjectDetails()},watch:{"$route.params.projectId":function(){this.getProjectDetails()}},computed:{store:function(){return this.$store.state.user},fullHeight:function(){return window.innerHeight},listData:function(){var t=this,e=[];return this.store&&this.store.project&&this.store.project.apis.forEach(function(o){var s,i;"get"===o.method?(s="cloud_download",i="orange-7"):"post"===o.method||"put"===o.method?(s="backup",i="primary"):(s="delete",i="red-5"),e.push({_id:o.path,icon:{name:s,color:i},label:'<span class="uppercase text-bold text-'+i+'">'+o.method+"</span> | "+o.path,sub:"/api/"+t.$store.state.user._id+"/"+t.$route.params.projectId+o.path,to:"/projects/id="+t.$route.params.projectId+"/api="+encodeURIComponent(o.path)+"/method="+o.method})}),{name:"APIs",items:{action:function(){},class:["bg-white"],style:{"border-bottom":"solid 1px rgb(200, 200, 200)","padding-top":"15px","padding-bottom":"15px"},icon:{name:"",color:""}},new:{label:"New API",to:"/projects/id="+this.$route.params.projectId+"/new"},list:e}}},methods:{getProjectDetails:function(){var t=this;this.fetching=!0,this.$http.get("/project/id="+this.$route.params.projectId).then(function(e){200!==e.status&&304!==e.status||(t.$store.commit("user/setObj",{authenticated:!0}),t.$store.commit("user/setObj",e.body))}).catch(function(t){console.log(t)}).then(function(){t.fetching=!1})}}},n=a,r=(o("f04a"),o("2877")),c=Object(r["a"])(n,s,i,!1,null,null,null);c.options.__file="Project.vue";e["default"]=c.exports},e3ee:function(t,e,o){},f04a:function(t,e,o){"use strict";var s=o("e3ee"),i=o.n(s);i.a}}]);
(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2d0bdf56"],{"2de3":function(e,t,i){"use strict";i.r(t);var s=function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("AdminWrapper",[i("AdminComponent")],1)},r=[],n=function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("div",{staticClass:"h-auto"},[i("div",{staticClass:"d-flex justify-space-between p-1 align-center"},[i("VBtn",{attrs:{text:"",color:"primary"}},[e._v("Список користувачів")]),i("VBtn",{attrs:{color:"primary",outlined:""},on:{click:function(t){e.visible=!0}}},[i("VIcon",{attrs:{left:""}},[e._v("mdi-account-plus")]),e._v("Додати нового користувача")],1)],1),i("VDivider"),i("UsersList",{attrs:{users:e.users},on:{showEdit:e.showEdit}}),e.visible?i("add-users-dialog",{attrs:{visible:e.visible},on:{close:function(t){e.visible=!1},addUser:e.addUser}}):e._e(),e.visibleEdit?i("add-users-dialog",{attrs:{visible:e.visibleEdit,edit:!0,chosenUser:e.chosenUser},on:{close:function(t){e.visibleEdit=!1}}}):e._e()],1)},a=[],o=i("1da1"),l=(i("96cf"),function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("VDialog",{attrs:{persistent:e.edit},model:{value:e.visibility,callback:function(t){e.visibility=t},expression:"visibility"}},[i("VCard",{attrs:{width:"700"}},[e.edit?i("VCardTitle",[e._v(" Редагувати користувача ")]):i("VCardTitle",[e._v(" Додати користувача ")]),i("VCardText",[i("VRow",[i("VCol",{attrs:{cols:"6"}},[i("VTextField",{attrs:{label:"Ім`я","prepend-icon":"mdi-account",outlined:"",dense:"","hide-details":""},model:{value:e.user.name,callback:function(t){e.$set(e.user,"name",t)},expression:"user.name"}})],1),i("VCol",{attrs:{cols:"6"}},[i("VTextField",{attrs:{label:"Прізвище",outlined:"",dense:"","hide-details":""},model:{value:e.user.surname,callback:function(t){e.$set(e.user,"surname",t)},expression:"user.surname"}})],1)],1),i("VRow",[i("VCol",[i("VTextField",{attrs:{label:"Email","prepend-icon":"mdi-email",outlined:"",dense:"","hide-details":""},model:{value:e.user.email,callback:function(t){e.$set(e.user,"email",t)},expression:"user.email"}})],1)],1),i("VRow",[i("VCol",[i("VTextField",{attrs:{label:"Телефон","prepend-icon":"mdi-phone",outlined:"",dense:"","hide-details":"",prefix:"+380"},model:{value:e.user.phone,callback:function(t){e.$set(e.user,"phone",t)},expression:"user.phone"}})],1)],1),i("VRow",[i("VCol",{attrs:{cols:"6"}},[i("v-select",{attrs:{"prepend-icon":"mdi-shield-account",items:Object.values(e.categories),"item-value":e.edit?e.user.permission:"_id","item-text":"title",label:"Посада","hide-details":"",outlined:"",dense:""},scopedSlots:e._u([{key:"selection",fn:function(t){var s=t.item;return[i("v-chip",{attrs:{small:"",color:"primary"}},[e._v(e._s(s.title))])]}}]),model:{value:e.user.permission,callback:function(t){e.$set(e.user,"permission",t)},expression:"user.permission"}})],1),i("VCol",{attrs:{cols:"6"}},[i("VBtn",{attrs:{text:"",color:"primary"},on:{click:function(t){e.visibleAdd=!0}}},[i("VIcon",{attrs:{left:""}},[e._v("mdi-plus")]),e._v("Додати нову посаду")],1)],1)],1)],1),i("VDivider"),i("VCardActions",[i("VSpacer"),i("VBtn",{attrs:{color:"error",text:""},on:{click:e.onCancel}},[e._v(" Скасувати ")]),e.edit?i("VBtn",{attrs:{color:"primary"},on:{click:e.onUpdate}},[e._v(" Оновити ")]):i("VBtn",{attrs:{color:"primary"},on:{click:e.onCreate}},[e._v(" Створити ")])],1)],1),e.visibleAdd?i("add-new-permission-dialog",{attrs:{visibleAdd:e.visibleAdd},on:{close:function(t){e.visibleAdd=!1},added:e.addedPosition}}):e._e()],1)}),c=[],u=i("5530"),d=(i("b0c0"),i("cd89")),p=i("6731"),m=function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("VDialog",{attrs:{transition:"scroll-y-transition"},on:{"click:outside":function(t){return e.$v.$reset()}},model:{value:e.visibility,callback:function(t){e.visibility=t},expression:"visibility"}},[i("VCard",{attrs:{width:"500"}},[i("VCardTitle",[e._v(" Додати нову посаду ")]),i("VCardText",[i("VRow",[i("VCol",[i("VTextField",{attrs:{label:"Назва посади","prepend-icon":"mdi-shield-account",outlined:"",dense:"","hide-details":!e.NameError.length,"error-messages":e.NameError},model:{value:e.permission,callback:function(t){e.permission=t},expression:"permission"}})],1)],1)],1),i("VCardActions",[i("VSpacer"),i("VBtn",{attrs:{color:"primary"},on:{click:e.onCreate}},[e._v(" Додати посаду ")])],1)],1)],1)},v=[],h=i("1dce"),f=i("b5ae"),b={mixins:[h["validationMixin"]],validations:{permission:{required:f["required"]}},props:{visibleAdd:{require:!0}},data:function(){return{permission:""}},methods:{onCreate:function(){var e=this;return Object(o["a"])(regeneratorRuntime.mark((function t(){var i,s;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:if(e.$v.$touch(),e.$v.$invalid){t.next=14;break}return t.prev=2,i=[],i.title=e.permission,t.next=7,d["a"].createPosition(Object(u["a"])({},i));case 7:s=t.sent,e.$emit("added",s),t.next=14;break;case 11:t.prev=11,t.t0=t["catch"](2),alert(t.t0);case 14:case"end":return t.stop()}}),t,null,[[2,11]])})))()}},computed:{NameError:function(){var e=[];return this.$v.permission.$dirty?(!this.$v.permission.required&&e.push("Назва посади обов`язкове поле для заповнення"),e):e},visibility:{get:function(){return this.visibleAdd},set:function(){this.permission="",this.$emit("close")}}}},x=b,_=i("2877"),V=Object(_["a"])(x,m,v,!1,null,null,null),g=V.exports,w={components:{AddNewPermissionDialog:g},name:"add-users-dialog",props:{visible:{require:!0},edit:{require:!1},chosenUser:{require:!1}},data:function(){return{categories:[],user:[],visibleAdd:!1}},mounted:function(){this.getChosenUser(),this.getPositions()},methods:{getChosenUser:function(){this.chosenUser&&(this.user=this.chosenUser,this.user.permission=this.user.position.title)},getPositions:function(){var e=this;return Object(o["a"])(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.prev=0,t.next=3,d["a"].getAll();case 3:e.categories=t.sent,t.next=9;break;case 6:t.prev=6,t.t0=t["catch"](0),alert(t.t0);case 9:case"end":return t.stop()}}),t,null,[[0,6]])})))()},onCancel:function(){this.user=[],this.$emit("close")},onCreate:function(){var e=this;return Object(o["a"])(regeneratorRuntime.mark((function t(){var i;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.prev=0,i=[],i.name=e.user.name,i.surname=e.user.surname,i.email=e.user.email,i.phone=e.user.phone,i.position=e.user.permission,t.next=9,p["a"].addNewUser(Object(u["a"])({},i));case 9:e.user=[],e.$emit("addUser"),t.next=16;break;case 13:t.prev=13,t.t0=t["catch"](0),alert(t.t0);case 16:case"end":return t.stop()}}),t,null,[[0,13]])})))()},addedPosition:function(e){this.categories.push(e),this.visibleAdd=!1},onUpdate:function(){var e=this;return Object(o["a"])(regeneratorRuntime.mark((function t(){var i;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.prev=0,console.log("tut"),i=[],i.id=e.user._id,i.name=e.user.name,i.surname=e.user.surname,i.email=e.user.email,i.phone=e.user.phone,i.position=e.user.permission,console.log(i),t.next=12,p["a"].update(Object(u["a"])({},i));case 12:e.$emit("addUser",i),t.next=18;break;case 15:t.prev=15,t.t0=t["catch"](0),alert(t.t0);case 18:case"end":return t.stop()}}),t,null,[[0,15]])})))()}},computed:{visibility:{get:function(){return this.visible},set:function(){this.$emit("close")}}}},C=w,k=Object(_["a"])(C,l,c,!1,null,null,null),y=k.exports,$=function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("v-simple-table",{staticClass:"p-1",scopedSlots:e._u([{key:"default",fn:function(){return[i("thead",[i("tr",[i("th",{staticClass:"text-left"},[e._v("#")]),i("th",{staticClass:"text-left"},[e._v("Назва")]),i("th",{staticClass:"text-left"},[e._v("Телефон")]),i("th",{staticClass:"text-left"},[e._v("Пошта")]),i("th",{staticClass:"text-left"},[e._v("Посада")]),i("th",{staticClass:"text-left"},[e._v("Дія")])])]),i("tbody",e._l(e.users,(function(t,s){return i("tr",{key:t.id},[i("td",[e._v(e._s(s+1))]),i("td",[e._v(e._s(t.name||"--")+" "+e._s(t.surname||"--"))]),i("td",[e._v(e._s(t.phone||"--"))]),i("td",[e._v(e._s(t.email||"--"))]),i("td",[e._v(e._s(t.position.title||"--"))]),i("td",[i("VBtn",{attrs:{small:"",color:"primary"},on:{click:function(i){return e.editUser(t)}}},[i("VIcon",[e._v(" mdi-account-edit")])],1)],1)])})),0)]},proxy:!0}])})},U=[],A={props:{users:{type:Array,require:!1}},methods:{editUser:function(e){this.$emit("showEdit",e)}}},E=A,j=Object(_["a"])(E,$,U,!1,null,null,null),R=j.exports,O={components:{AddUsersDialog:y,UsersList:R},mounted:function(){this.getUser()},methods:{addUser:function(){this.getUser(),this.visible=!1},getUser:function(){var e=this;return Object(o["a"])(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.prev=0,t.next=3,p["a"].getAll();case 3:e.users=t.sent,t.next=9;break;case 6:t.prev=6,t.t0=t["catch"](0),alert(t.t0);case 9:case"end":return t.stop()}}),t,null,[[0,6]])})))()},showEdit:function(e){this.chosenUser=e,this.visibleEdit=!0}},data:function(){return{visible:!1,visibleEdit:!1,chosenUser:[],users:[]}}},T=O,q=Object(_["a"])(T,n,a,!1,null,null,null),B=q.exports,D=i("a2db"),P={components:{AdminComponent:B,AdminWrapper:D["a"]}},F=P,N=Object(_["a"])(F,s,r,!1,null,null,null);t["default"]=N.exports}}]);
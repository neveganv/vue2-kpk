(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-3327b332"],{"2ffd":function(t,e,i){},3548:function(t,e,i){t.exports=i.p+"img/logo-admin.00653c1e.svg"},"3a8f":function(t,e,i){"use strict";i.r(e);var n=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("AdminWrapper",[i("NewsComponent")],1)},s=[],a=i("a2db"),o=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",[i("v-tabs",{model:{value:t.tabs,callback:function(e){t.tabs=e},expression:"tabs"}},[i("v-tab",{attrs:{href:"#simpleNews"}},[t._v("Новини")]),i("v-tab",{attrs:{href:"#recentNews"}},[t._v("Круті новини (треба норм назви)")])],1),i("v-tabs-items",{model:{value:t.tabs,callback:function(e){t.tabs=e},expression:"tabs"}},[i("v-tab-item",{attrs:{value:"simpleNews"}},[i("VDivider"),i("SimpleNewComponent")],1),i("v-tab-item",{attrs:{value:"recentNews"}},[i("VDivider"),i("RecentNewsComponent")],1)],1)],1)},l=[],r=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"simple-new"},[i("VRow",{staticClass:"p-1",attrs:{justify:"end"}},[i("VBtn",{attrs:{outlined:"",color:"primary"},on:{click:function(e){t.visible=!0}}},[i("v-icon",{attrs:{left:""}},[t._v(" mdi-newspaper-plus ")]),t._v("Створити новину ")],1)],1),i("VRow",[i("VCol",[i("NewsList")],1)],1),i("AddNewDialog",{attrs:{visible:t.visible},on:{close:function(e){t.visible=!1}}})],1)},c=[],d=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("VRow",[i("VCol",[i("v-item-group",[i("v-row",t._l(8,(function(e){return i("v-col",{key:e,attrs:{cols:"12",md:"3"}},[i("v-item",{scopedSlots:t._u([{key:"default",fn:function(n){n.active;var s=n.toggle;return[i("v-card",{staticClass:"align-end",attrs:{width:"400",color:""},on:{click:s}},[i("v-img",{attrs:{height:"140","lazy-src":"https://picsum.photos/350/165?random",src:"https://picsum.photos/350/165?random"},scopedSlots:t._u([{key:"placeholder",fn:function(){return[i("v-row",{staticClass:"fill-height ma-0",attrs:{align:"center",justify:"center"}},[i("v-progress-circular",{attrs:{indeterminate:"",color:"primary "}})],1)]},proxy:!0}],null,!0)}),i("v-card-actions",[i("div",{staticClass:"new-title"},[i("span",[t._v("Заголовок новини "+t._s(e))])]),i("v-spacer"),i("v-btn",{attrs:{icon:"",color:"error darken-1"},on:{click:function(t){t.stopPropagation()}}},[i("v-icon",[t._v("mdi-delete")])],1)],1)],1)]}}],null,!0)})],1)})),1)],1)],1)],1)},u=[],m={},p=m,v=(i("92f0"),i("2877")),f=Object(v["a"])(p,d,u,!1,null,"469f4571",null),V=f.exports,b=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("VDialog",{model:{value:t.visibility,callback:function(e){t.visibility=e},expression:"visibility"}},[i("VCard",{attrs:{width:"700"}},[i("VCardTitle",[t._v(" Створити Новину ")]),i("VCardText",[i("VRow",[i("VCol",{attrs:{cols:"6"}},[i("v-select",{attrs:{"prepend-icon":"mdi-shape",items:Object.values(t.categories),"item-value":"value","item-text":"name",label:"Категорія","hide-details":"",outlined:"",dense:""},scopedSlots:t._u([{key:"selection",fn:function(e){var n=e.item;return[i("v-chip",{attrs:{small:"",color:"primary"}},[t._v(t._s(n.name))])]}}]),model:{value:t.news.category,callback:function(e){t.$set(t.news,"category",e)},expression:"news.category"}})],1),i("VCol",{attrs:{cols:"6"}},[i("VBtn",{attrs:{text:"",color:"primary"},on:{click:function(e){t.visibleAdd=!0}}},[i("VIcon",{attrs:{left:""}},[t._v("mdi-plus")]),t._v("Додати нову категорію")],1)],1)],1),i("VRow",[i("VCol",[i("VTextField",{attrs:{label:"Заголовок","prepend-icon":"mdi-clipboard-text",outlined:"",dense:"","hide-details":""},model:{value:t.news.title,callback:function(e){t.$set(t.news,"title",e)},expression:"news.title"}})],1)],1),i("VRow",[i("VCol",[i("v-file-input",{attrs:{dense:"",counter:"",label:"Головна картинка",placeholder:"Головна картинка","prepend-icon":"mdi-camera",outlined:"",accept:"image/png, image/jpeg, image/svg","show-size":1e3,rules:t.rules},scopedSlots:t._u([{key:"selection",fn:function(e){var n=e.index,s=e.text;return[n<2?i("v-chip",{attrs:{label:"",small:""}},[t._v(" "+t._s(s)+" ")]):2===n?i("span",{staticClass:"text-overline grey--text text--darken-3 mx-2"},[t._v(" +"+t._s(t.news.main_img.length-2)+" File(s) ")]):t._e()]}}]),model:{value:t.news.main_img,callback:function(e){t.$set(t.news,"main_img",e)},expression:"news.main_img"}})],1)],1),t._v(" тут буде едітор, но його поки немає ")],1),i("VCardActions",[i("VSpacer"),i("VBtn",{attrs:{color:"error",text:""},on:{click:t.onCancel}},[t._v(" Скасувати ")]),i("VBtn",{attrs:{color:"primary"},on:{click:t.onCreate}},[t._v(" Створити ")])],1)],1),i("add-new-category-dialog",{attrs:{visibleAdd:t.visibleAdd},on:{close:function(e){t.visibleAdd=!1}}})],1)},g=[],_=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("VDialog",{attrs:{transition:"scroll-y-transition"},model:{value:t.visibility,callback:function(e){t.visibility=e},expression:"visibility"}},[i("VCard",{attrs:{width:"500"}},[i("VCardTitle",[t._v(" Додати нову категорію новини ")]),i("VCardText",[i("VRow",[i("VCol",[i("VTextField",{attrs:{label:"Назва категорії","prepend-icon":"mdi-shape",outlined:"",dense:"","hide-details":""},model:{value:t.category,callback:function(e){t.category=e},expression:"category"}})],1)],1)],1),i("VCardActions",[i("VSpacer"),i("VBtn",{attrs:{color:"primary"},on:{click:t.onCreate}},[t._v(" Створити категорію ")])],1)],1)],1)},h=[],w=i("bc3a"),y=i.n(w),x={props:{visibleAdd:{require:!0}},data:function(){return{category:""}},methods:{onCreate:function(){console.log(this.category),y.a.post("/api/newsCaregory",{name:this.category})}},computed:{visibility:{get:function(){return this.visibleAdd},set:function(){this.category="",this.$emit("close")}}}},C=x,I=Object(v["a"])(C,_,h,!1,null,null,null),k=I.exports,L={components:{AddNewCategoryDialog:k},data:function(){return{rules:[function(t){return!t||t.size<3e6||"Зображення повинне бути менше 3 MB!"}],categories:[{id:1,name:"Категорія 1",value:"first1"},{id:2,name:"Категорія 12",value:"first2"},{id:3,name:"Категорія 13",value:"first3"}],content:["fdsfdfdsfdsfdf",1,"dssad"],news:[],visibleAdd:!1}},props:{visible:{require:!0}},methods:{onCancel:function(){this.news=[],this.$emit("close")},onCreate:function(){console.log(this.news),y.a.post("/api/news",{categoryName:this.news.category,title:this.news.titlem,main_img:this.news.main_img,content:this.content})}},computed:{visibility:{get:function(){return this.visible},set:function(){this.$emit("close")}}}},N=L,A=Object(v["a"])(N,b,g,!1,null,null,null),S=A.exports,$={components:{NewsList:V,AddNewDialog:S},data:function(){return{visible:!1}}},T=$,j=(i("932a"),Object(v["a"])(T,r,c,!1,null,"651f5cfc",null)),D=j.exports,R=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"simple-new"},[i("VRow",{staticClass:"p-1",attrs:{justify:"end"}},[i("VBtn",{attrs:{outlined:"",color:"primary"},on:{click:function(e){t.visible=!0}}},[i("v-icon",{attrs:{left:""}},[t._v(" mdi-newspaper-plus ")]),t._v("Створити новину ")],1)],1),i("VRow",[i("VCol",[i("NewsList")],1)],1),i("AddNewDialog",{attrs:{visible:t.visible},on:{close:function(e){t.visible=!1}}})],1)},O=[],E=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("VRow",[i("VCol",[i("v-item-group",[i("v-row",t._l(8,(function(e){return i("v-col",{key:e,attrs:{cols:"12",md:"3"}},[i("v-item",{scopedSlots:t._u([{key:"default",fn:function(n){n.active;var s=n.toggle;return[i("v-card",{staticClass:"align-end",attrs:{width:"400",color:""},on:{click:s}},[i("v-img",{attrs:{height:"140","lazy-src":"https://picsum.photos/350/165?random",src:"https://picsum.photos/350/165?random"},scopedSlots:t._u([{key:"placeholder",fn:function(){return[i("v-row",{staticClass:"fill-height ma-0",attrs:{align:"center",justify:"center"}},[i("v-progress-circular",{attrs:{indeterminate:"",color:"primary "}})],1)]},proxy:!0}],null,!0)}),i("v-card-actions",[i("div",{staticClass:"new-title"},[i("span",[t._v("Заголовок новини "+t._s(e))])]),i("v-spacer"),i("v-btn",{attrs:{icon:"",color:"error darken-1"},on:{click:function(t){t.stopPropagation()}}},[i("v-icon",[t._v("mdi-delete")])],1)],1)],1)]}}],null,!0)})],1)})),1)],1)],1)],1)},B=[],z={},U=z,F=(i("509a"),Object(v["a"])(U,E,B,!1,null,"04ae1a30",null)),q=F.exports,P=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("VDialog",{model:{value:t.visibility,callback:function(e){t.visibility=e},expression:"visibility"}},[i("VCard",{attrs:{width:"700"}},[i("VCardTitle",[t._v(" Створити Круту Новину ")]),i("VCardText",[i("VRow",[i("VCol",[i("VTextField",{attrs:{label:"Заголовок","prepend-icon":"mdi-clipboard-text",outlined:"",dense:"","hide-details":""},model:{value:t.news.title,callback:function(e){t.$set(t.news,"title",e)},expression:"news.title"}})],1)],1),i("VRow",[i("VCol",[i("v-file-input",{attrs:{dense:"",counter:"",label:"Головна картинка",placeholder:"Головна картинка","prepend-icon":"mdi-camera",outlined:"",accept:"image/png, image/jpeg, image/svg","show-size":1e3,rules:t.rules},scopedSlots:t._u([{key:"selection",fn:function(e){var n=e.index,s=e.text;return[n<2?i("v-chip",{attrs:{label:"",small:""}},[t._v(" "+t._s(s)+" ")]):2===n?i("span",{staticClass:"text-overline grey--text text--darken-3 mx-2"},[t._v(" +"+t._s(t.news.main_img.length-2)+" File(s) ")]):t._e()]}}]),model:{value:t.news.main_img,callback:function(e){t.$set(t.news,"main_img",e)},expression:"news.main_img"}})],1)],1)],1),i("VCardActions",[i("VSpacer"),i("VBtn",{attrs:{color:"error",text:""},on:{click:t.onCancel}},[t._v(" Скасувати ")]),i("VBtn",{attrs:{color:"primary"},on:{click:t.onCreate}},[t._v(" Створити ")])],1)],1)],1)},M=[],G={data:function(){return{rules:[function(t){return!t||t.size<3e6||"Зображення повинне бути менше 3 MB!"}],news:[]}},props:{visible:{require:!0}},methods:{onCancel:function(){this.news=[],this.$emit("close")},onCreate:function(){console.log(this.news)}},computed:{visibility:{get:function(){return this.visible},set:function(){this.$emit("close")}}}},J=G,W=Object(v["a"])(J,P,M,!1,null,null,null),Y=W.exports,H={components:{NewsList:q,AddNewDialog:Y},data:function(){return{visible:!1}}},K=H,Q=(i("3eb2"),Object(v["a"])(K,R,O,!1,null,"ad67d3ee",null)),X=Q.exports,Z={components:{SimpleNewComponent:D,RecentNewsComponent:X,NewsList:V,AddNewDialog:S},data:function(){return{tabs:null}}},tt=Z,et=Object(v["a"])(tt,o,l,!1,null,"4765f848",null),it=et.exports,nt={components:{NewsComponent:it,AdminWrapper:a["a"]}},st=nt,at=Object(v["a"])(st,n,s,!1,null,null,null);e["default"]=at.exports},"3eb2":function(t,e,i){"use strict";i("7606")},"509a":function(t,e,i){"use strict";i("9e05")},"6b9b":function(t,e,i){},7606:function(t,e,i){},"92f0":function(t,e,i){"use strict";i("9ecc")},"932a":function(t,e,i){"use strict";i("c808")},"9d66":function(t,e,i){"use strict";i("6b9b")},"9e05":function(t,e,i){},"9ecc":function(t,e,i){},a2db:function(t,i,n){"use strict";var s=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("VApp",[i("div",[i("v-app-bar",{staticStyle:{height:"65px",top:"0","z-index":"1"},attrs:{color:"white"}},[i("VAppBarNavIcon",{on:{click:function(e){t.mini=!t.mini}}}),i("div",{staticClass:"admin-logo ml-4"},[i("img",{attrs:{src:n("3548"),alt:""}})]),i("VSpacer"),i("VBtn",{staticClass:"mr-5",attrs:{icon:""}},[i("v-badge",{attrs:{overlap:"",content:"99+"}},[i("VIcon",[t._v("mdi-bell")])],1)],1),i("UserDropDown",{attrs:{tmpUserName:t.tmpUserName}})],1)],1),i("v-navigation-drawer",{class:{fixed:t.fixed},staticStyle:{top:"65px",height:"calc(100vh - 65px)"},attrs:{permanent:"",absolute:"","mini-variant":!t.mini},model:{value:t.mini,callback:function(e){t.mini=e},expression:"mini"}},[i("VDivider"),i("VList",{attrs:{nav:"",dense:""}},[i("VListItemGroup",{attrs:{color:"primary"}},[i("VListItem",{attrs:{to:{path:"/admin"}}},[i("VListItemIcon",[i("VIcon",[t._v("mdi-view-dashboard")])],1),i("VListItemTitle",[t._v("Головна")])],1),i("VListItem",{attrs:{to:{path:"/admin-news"}}},[i("VListItemIcon",[i("VIcon",[t._v("mdi-newspaper-variant")])],1),i("VListItemTitle",[t._v("Новини")])],1),i("VListItem",{attrs:{to:{path:"/admin-shedule"}}},[i("VListItemIcon",[i("VIcon",[t._v("mdi-calendar")])],1),i("VListItemTitle",[t._v("Календарик(тестово)")])],1)],1),i("VListGroup",{staticClass:"listGroupMenu",attrs:{value:t.specialitiesSelector},scopedSlots:t._u([{key:"activator",fn:function(){return[i("VListItemIcon",[i("VIcon",[t._v("mdi-folder-account")])],1),i("VListItemTitle",[t._v("Спеціальності")])]},proxy:!0}])},[i("VListItem",{attrs:{to:{path:"/2"}}},[i("VListItemIcon",[i("VIcon",[t._v("mdi-folder-account")])],1),i("VListItemTitle",[t._v("Крута спеціальність")])],1),i("VListItem",{attrs:{to:{path:"/3"}}},[i("VListItemIcon",[i("VIcon",[t._v("mdi-folder-account")])],1),i("VListItemTitle",[t._v("Не крута спеціальність")])],1),i("VListItem",{attrs:{to:{path:"/add"}}},[i("VListItemIcon",[i("VIcon",[t._v("mdi-folder-account")])],1),i("VListItemTitle",[t._v("Додати")])],1)],1),i("VListItem",{on:{click:function(e){t.visible=!0}}},[i("VListItemIcon",[i("VIcon",[t._v("mdi-playlist-plus")])],1),i("VListItemTitle",[t._v("Додати")])],1)],1)],1),i("v-main",[i("v-container",{staticClass:"content-block_wrap",style:t.mini?"padding-left: 276px;":"padding-left: 76px;",attrs:{fluid:""}},[i("VCard",{staticClass:"content-block_wrap-card"},[t._t("default")],2)],1)],1),i("AddNewPageDialog",{attrs:{visible:t.visible},on:{close:function(e){t.visible=!1}}})],1)},a=[],o=(n("c7cd"),function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("VMenu",{attrs:{"offset-y":""},scopedSlots:t._u([{key:"activator",fn:function(e){var n=e.on,s=e.attrs;return[i("span",t._g(t._b({},"span",s,!1),n),[i("span",{staticClass:"d-flex align-center"},[i("Avatar",{attrs:{name:t.tmpUserName,size:"40"}}),"false"===s["aria-expanded"]?i("VIcon",[t._v("mdi-menu-down")]):i("VIcon",[t._v("mdi-menu-up")])],1)])]}}])},[i("VCard",[i("VList",[i("VListItem",[i("VListItemAvatar",[i("Avatar",{attrs:{name:t.tmpUserName,size:"50"}})],1),i("VListItemContent",[i("VListItemTitle",[t._v("Ростик Урдейчук")]),i("VListItemSubtitle",[t._v("admin@gmail.com")])],1)],1),i("VDivider"),i("VListItem",{attrs:{dense:""},on:{click:t.onSettings}},[i("VListItemIcon",[i("VIcon",[t._v("mdi-cog")])],1),i("VListItemTitle",[t._v("Налаштування")])],1),i("VListItem",{attrs:{dense:""},on:{click:t.onLeft}},[i("VListItemIcon",[i("VIcon",[t._v("mdi-account-arrow-left")])],1),i("VListItemTitle",[t._v("Вийти")])],1)],1)],1)],1)}),l=[],r=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",[i("v-avatar",{attrs:{color:"primary",size:t.size}},[i("span",{staticClass:"white--text text-h6"},[t._v(t._s(t.firstLetter))])])],1)},c=[],d=(n("a15b"),n("d81d"),n("ac1f"),n("1276"),n("b0c0"),{name:"Avatar",props:{size:{required:!1,default:32},name:{required:!0}},computed:{firstLetter:function(){var t=Array.prototype.map.call(this.name.split(" "),(function(t){return t.substring(0,1).toUpperCase()})).join("");return t}}}),u=d,m=(n("9d66"),n("2877")),p=Object(m["a"])(u,r,c,!1,null,"670470f5",null),v=p.exports,f={props:{tmpUserName:{require:!0}},components:{Avatar:v},methods:{onSettings:function(){console.log(123)},onLeft:function(){console.log("left")}}},V=f,b=Object(m["a"])(V,o,l,!1,null,null,null),g=b.exports,_=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("VDialog",{model:{value:t.visibility,callback:function(e){t.visibility=e},expression:"visibility"}},[i("VCard",{attrs:{width:"500"}},[i("VCardTitle",[t._v(" Додати нову сторінку ")]),i("VCardText",[i("VRow",[i("VCol",[i("VTextField",{attrs:{label:"Назва Сторінки","prepend-icon":"mdi-application-edit",outlined:"",dense:"","hide-details":""},model:{value:t.page.name,callback:function(e){t.$set(t.page,"name",e)},expression:"page.name"}})],1)],1),i("VRow",[i("VCol",[i("VTextField",{attrs:{label:"Тип Сторінки (тут напевно чот над зробить вибірку якусь)","prepend-icon":"mdi-application-cog",outlined:"",dense:"","hide-details":""},model:{value:t.page.type,callback:function(e){t.$set(t.page,"type",e)},expression:"page.type"}})],1)],1),i("VRow",[i("VCol",[i("v-select",{attrs:{items:Object.values(t.categories),attach:"","item-value":"value","item-text":"name","prepend-icon":"mdi-shield-account",outlined:"",dense:"",label:"Права доступу",multiple:""},scopedSlots:t._u([{key:"selection",fn:function(e){var n=e.item;return[i("v-chip",{attrs:{small:"",color:"primary"}},[t._v(t._s(n.name))])]}}]),model:{value:t.page.permissions,callback:function(e){t.$set(t.page,"permissions",e)},expression:"page.permissions"}})],1)],1)],1),i("VCardActions",[i("VSpacer"),i("VBtn",{attrs:{color:"primary"},on:{click:t.onCreate}},[t._v(" Додати Сторінку ")])],1)],1)],1)},h=[],w={data:function(){return{page:[],categories:[{id:1,name:"Адмін",value:"admin"},{id:2,name:"Менеджер",value:"manager"}]}},props:{visible:{require:!0}},methods:{onCreate:function(){console.log(this.page)}},computed:{visibility:{get:function(){return this.visible},set:function(){this.$emit("close")}}}},y=w,x=Object(m["a"])(y,_,h,!1,null,null,null),C=x.exports,I={components:{UserDropDown:g,AddNewPageDialog:C},created:function(){window.addEventListener("scroll",this.handleScroll)},destroyed:function(){window.removeEventListener("scroll",this.handleScroll),clearInterval(this.intervalFetchData),console.log("destroyed")},data:function(){return{mini:!0,specialitiesSelector:!1,fixed:!1,tmpUserName:"Ростик Урдейчук",visible:!1}},methods:{handleScroll:function(){this.fixed=window.pageYOffset>55},addNewPage:function(){console.log(e)}}},k=I,L=(n("c513"),Object(m["a"])(k,s,a,!1,null,null,null));i["a"]=L.exports},c513:function(t,e,i){"use strict";i("2ffd")},c808:function(t,e,i){}}]);
(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-1c6ba33a"],{"16c1":function(e,t,n){"use strict";n("538c")},2995:function(e,t,n){"use strict";var i=n("1da1"),r=(n("96cf"),n("bae0")),s="/api/news",a="/api/newsCategory";t["a"]={addSimpleNew:function(e){return Object(i["a"])(regeneratorRuntime.mark((function t(){var n;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,r["a"].post("".concat(s,"/add"),e);case 2:return n=t.sent,t.abrupt("return",null===n||void 0===n?void 0:n.data);case 4:case"end":return t.stop()}}),t)})))()},getAllNews:function(){return Object(i["a"])(regeneratorRuntime.mark((function e(){var t;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,r["a"].post("".concat(s,"/getAllNews"));case 2:return t=e.sent,e.abrupt("return",null===t||void 0===t?void 0:t.data);case 4:case"end":return e.stop()}}),e)})))()},addSimpleNewCategory:function(e){return Object(i["a"])(regeneratorRuntime.mark((function t(){var n;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,r["a"].post("".concat(a,"/addCategory"),e);case 2:return n=t.sent,t.abrupt("return",null===n||void 0===n?void 0:n.data);case 4:case"end":return t.stop()}}),t)})))()},getSimpleNewsCategories:function(){return Object(i["a"])(regeneratorRuntime.mark((function e(){var t;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,r["a"].post("".concat(a,"/getAll"));case 2:return t=e.sent,e.abrupt("return",null===t||void 0===t?void 0:t.data);case 4:case"end":return e.stop()}}),e)})))()},updateSimpleNews:function(e){return Object(i["a"])(regeneratorRuntime.mark((function t(){var n;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,r["a"].post("".concat(s,"/update"),e);case 2:return n=t.sent,t.abrupt("return",null===n||void 0===n?void 0:n.data);case 4:case"end":return t.stop()}}),t)})))()}}},"321f":function(e,t,n){"use strict";n("3f81")},"3a8f":function(e,t,n){"use strict";n.r(t);var i=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("AdminWrapper",[n("NewsComponent")],1)},r=[],s=n("a2db"),a=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",[n("v-tabs",{model:{value:e.tabs,callback:function(t){e.tabs=t},expression:"tabs"}},[n("v-tab",{attrs:{href:"#simpleNews"}},[e._v("Новини")]),n("v-tab",{attrs:{href:"#recentNews"}},[e._v("Круті новини (треба норм назви)")])],1),n("v-tabs-items",{model:{value:e.tabs,callback:function(t){e.tabs=t},expression:"tabs"}},[n("v-tab-item",{attrs:{value:"simpleNews"}},[n("VDivider"),n("SimpleNewComponent")],1),n("v-tab-item",{attrs:{value:"recentNews"}},[n("VDivider"),n("RecentNewsComponent")],1)],1)],1)},o=[],c=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"simple-new"},[n("VRow",{staticClass:"p-1",attrs:{justify:"end"}},[n("VBtn",{attrs:{outlined:"",color:"primary"},on:{click:function(t){e.visible=!0}}},[n("v-icon",{attrs:{left:""}},[e._v(" mdi-newspaper-plus ")]),e._v("Створити новину ")],1)],1),n("VRow",[n("VCol",[n("NewsList",{attrs:{news:e.news},on:{show:e.showNews}})],1)],1),e.visible?n("AddNewDialog",{attrs:{visible:e.visible},on:{addNews:e.addNews,close:function(t){e.visible=!1}}}):e._e(),e.visibleEdit?n("AddNewDialog",{attrs:{visibleEdit:e.visibleEdit,chosenNews:e.clickNews},on:{close:function(t){e.visibleEdit=!1}}}):e._e()],1)},l=[],u=n("1da1"),d=(n("96cf"),function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("VRow",[n("VCol",[n("v-item-group",[n("v-row",e._l(e.news,(function(t){return n("v-col",{key:t._id,attrs:{cols:"12",md:"3"}},[n("v-item",{scopedSlots:e._u([{key:"default",fn:function(i){i.active;return[n("v-card",{staticClass:"align-end",attrs:{width:"auto",color:""},on:{click:function(n){return e.detailNew(t)}}},[n("v-btn",{staticClass:"category",attrs:{absolute:"",top:"",left:"",color:"primary",tile:""}},[e._v(" "+e._s(t.category.name)+" ")]),t.main_img?n("v-img",{attrs:{height:"140","lazy-src":t.main_img,src:t.main_img},scopedSlots:e._u([{key:"placeholder",fn:function(){return[n("v-row",{staticClass:"fill-height ma-0",attrs:{align:"center",justify:"center"}},[n("v-progress-circular",{attrs:{indeterminate:"",color:"primary "}})],1)]},proxy:!0}],null,!0)}):n("v-img",{attrs:{height:"140",src:"https://picsum.photos/350/165?random"}}),n("v-card-actions",[n("div",{staticClass:"new-title"},[n("span",[e._v(e._s(t.title||"--"))])]),n("v-spacer"),n("v-btn",{attrs:{icon:"",color:"error darken-1"},on:{click:function(e){e.stopPropagation()}}},[n("v-icon",[e._v("mdi-delete")])],1)],1)],1)]}}],null,!0)})],1)})),1)],1)],1)],1)}),v=[],p={props:{news:{require:!0}},mounted:function(){console.log("Новини",this.news)},methods:{detailNew:function(e){this.$emit("show",e),console.log(e)}}},m=p,w=(n("321f"),n("2877")),g=Object(w["a"])(m,d,v,!1,null,"51ee3127",null),h=g.exports,f=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("VDialog",{on:{"click:outside":function(t){return e.$v.$reset()}},model:{value:e.visibility,callback:function(t){e.visibility=t},expression:"visibility"}},[n("VCard",{attrs:{width:"700"}},[e.visibleEdit?n("VCardTitle",[e._v(" Оновити новину")]):n("VCardTitle",[e._v(" Створити Новину ")]),n("VCardText",[n("VRow",[n("VCol",{attrs:{cols:"6"}},[n("v-select",{attrs:{"prepend-icon":"mdi-shape",items:Object.values(e.categories),"item-value":"_id","item-text":"name",label:"Категорія","error-messages":e.CategoryError,"hide-details":!e.CategoryError.length,outlined:"",clearable:"",dense:""},scopedSlots:e._u([{key:"selection",fn:function(t){var i=t.item;return[n("v-chip",{attrs:{small:"",color:"primary"}},[e._v(e._s(i.name))])]}}]),model:{value:e.news.category,callback:function(t){e.$set(e.news,"category",t)},expression:"news.category"}})],1),n("VCol",{attrs:{cols:"6"}},[n("VBtn",{attrs:{text:"",color:"primary"},on:{click:function(t){e.visibleAdd=!0}}},[n("VIcon",{attrs:{left:""}},[e._v("mdi-plus")]),e._v("Додати нову категорію")],1)],1)],1),n("VRow",[n("VCol",[n("VTextField",{attrs:{label:"Заголовок","prepend-icon":"mdi-clipboard-text",outlined:"",dense:"","hide-details":!e.TitleError.length,"error-messages":e.TitleError},model:{value:e.news.title,callback:function(t){e.$set(e.news,"title",t)},expression:"news.title"}})],1)],1),n("VRow",[n("VCol",[n("v-file-input",{attrs:{dense:"",counter:"",label:"Головна картинка",placeholder:"Головна картинка","prepend-icon":"mdi-camera",outlined:"",accept:"image/png, image/jpeg, image/svg","show-size":1e3,rules:e.rules,"error-messages":e.MainImageError,"hide-details":!e.MainImageError.length},on:{change:e.onFileChange},scopedSlots:e._u([{key:"selection",fn:function(t){var i=t.index,r=t.text;return[i<2?n("v-chip",{attrs:{label:"",small:""}},[e._v(" "+e._s(r)+" ")]):2===i?n("span",{staticClass:"text-overline grey--text text--darken-3 mx-2"},[e._v(" +"+e._s(e.news.main_img.length-2)+" File(s) ")]):e._e()]}}]),model:{value:e.news.main_img,callback:function(t){e.$set(e.news,"main_img",t)},expression:"news.main_img"}})],1)],1),e._v(" тут буде едітор, но його поки немає ")],1),n("VCardActions",[n("VSpacer"),n("VBtn",{attrs:{color:"error",text:""},on:{click:e.onCancel}},[e._v(" Скасувати ")]),e.visibleEdit?n("VBtn",{attrs:{color:"primary"},on:{click:e.onUpdate}},[e._v("Оновити")]):n("VBtn",{attrs:{color:"primary"},on:{click:e.onCreate}},[e._v(" Створити ")])],1)],1),n("add-new-category-dialog",{attrs:{visibleAdd:e.visibleAdd},on:{addCategory:e.addCategory,close:function(t){e.visibleAdd=!1}}})],1)},b=[],_=n("5530"),y=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("VDialog",{attrs:{transition:"scroll-y-transition"},on:{"click:outside":function(t){return e.$v.$reset()}},model:{value:e.visibility,callback:function(t){e.visibility=t},expression:"visibility"}},[n("VCard",{attrs:{width:"500"}},[n("VCardTitle",[e._v(" Додати нову категорію новини ")]),n("VCardText",[n("VRow",[n("VCol",[n("VTextField",{attrs:{label:"Назва категорії","prepend-icon":"mdi-shape",outlined:"",dense:"","hide-details":!e.NameError.length,"error-messages":e.NameError},model:{value:e.category,callback:function(t){e.category=t},expression:"category"}})],1)],1)],1),n("VCardActions",[n("VSpacer"),n("VBtn",{attrs:{color:"primary"},on:{click:e.onCreate}},[e._v(" Створити категорію ")])],1)],1)],1)},x=[],C=(n("b0c0"),n("2995")),k=n("1dce"),N=n("b5ae"),V={mixins:[k["validationMixin"]],validations:{category:{required:N["required"]}},props:{visibleAdd:{require:!0}},data:function(){return{category:""}},methods:{onCreate:function(){var e=this;return Object(u["a"])(regeneratorRuntime.mark((function t(){var n;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:if(e.$v.$touch(),e.$v.$invalid){t.next=15;break}return t.prev=2,n=[],n.name=e.category,t.next=7,C["a"].addSimpleNewCategory(Object(_["a"])({},n));case 7:e.$emit("addCategory",n),e.$v.$reset(),e.category="",t.next=15;break;case 12:t.prev=12,t.t0=t["catch"](2),alert(t.t0);case 15:case"end":return t.stop()}}),t,null,[[2,12]])})))()}},computed:{NameError:function(){var e=[];return this.$v.category.$dirty?(!this.$v.category.required&&e.push("Назва категорії обов`язкове поле для заповнення"),e):e},visibility:{get:function(){return this.visibleAdd},set:function(){this.category="",this.$emit("close")}}}},$=V,R=Object(w["a"])($,y,x,!1,null,null,null),E=R.exports,j={mixins:[k["validationMixin"]],components:{AddNewCategoryDialog:E},data:function(){return{rules:[function(e){return!e||e.size<3e6||"Зображення повинне бути менше 3 MB!"}],categories:[],news:[],visibleAdd:!1,base64image:""}},validations:{news:{title:{required:N["required"]},main_img:{required:N["required"]},category:{required:N["required"]}}},props:{visible:{require:!1},visibleEdit:{require:!1},chosenNews:{require:!1}},mounted:function(){this.getCategories(),this.getChosenNews()},methods:{addCategory:function(){this.visibleAdd=!1,this.getCategories()},getChosenNews:function(){console.log("chosen news",this.chosenNews),this.chosenNews&&(this.news=this.chosenNews,this.news.permission=this.news.position.title,console.log("ch",this.chosenNews),console.log("Класі новини: ",this.news))},onCancel:function(){this.news=[],this.$v.$reset(),this.$emit("close")},onCreate:function(){var e=this;return Object(u["a"])(regeneratorRuntime.mark((function t(){var n;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:if(e.$v.$touch(),e.$v.$invalid){t.next=18;break}return t.prev=2,n=[],n.title=e.news.title,n.category=e.news.category,n.main_img=e.base64image,console.log("params",n),t.next=10,C["a"].addSimpleNew(Object(_["a"])({},n));case 10:e.news=[],e.$emit("addNews",n),e.$v.$reset(),t.next=18;break;case 15:t.prev=15,t.t0=t["catch"](2),alert(t.t0);case 18:case"end":return t.stop()}}),t,null,[[2,15]])})))()},onUpdate:function(){var e=this;return Object(u["a"])(regeneratorRuntime.mark((function t(){var n;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.prev=0,n=[],n.id=e.news._id,n.title=e.news.title,n.category=e.news.category,n.main_img=e.news.main_img,t.next=8,C["a"].updateSimpleNews(Object(_["a"])({},n));case 8:e.$emit("close"),e.news=[],t.next=15;break;case 12:t.prev=12,t.t0=t["catch"](0),alert(t.t0);case 15:case"end":return t.stop()}}),t,null,[[0,12]])})))()},onFileChange:function(e){var t=this;if(e){var n=new FileReader;n.readAsDataURL(e),n.onload=function(e){t.base64image=e.target.result}}},getCategories:function(){var e=this;return Object(u["a"])(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.prev=0,t.next=3,C["a"].getSimpleNewsCategories();case 3:e.categories=t.sent,t.next=9;break;case 6:t.prev=6,t.t0=t["catch"](0),alert(t.t0);case 9:case"end":return t.stop()}}),t,null,[[0,6]])})))()}},computed:{visibility:{get:function(){return!0===this.visible?this.visible:this.visibleEdit},set:function(){this.$emit("close")}},CategoryError:function(){var e=[];return this.$v.news.category.$dirty?(!this.$v.news.category.required&&e.push("Категорія обов`язкове поле для заповнення"),e):e},TitleError:function(){var e=[];return this.$v.news.title.$dirty?(!this.$v.news.title.required&&e.push("Заголовок обов`язкове поле для заповнення"),e):e},MainImageError:function(){var e=[];return this.$v.news.main_img.$dirty?(!this.$v.news.main_img.required&&e.push("Головна картинка обов`язкове поле для заповнення"),e):e}}},A=j,O=Object(w["a"])(A,f,b,!1,null,null,null),S=O.exports,q={components:{NewsList:h,AddNewDialog:S},data:function(){return{visible:!1,visibleEdit:!1,news:[],clickNews:[]}},mounted:function(){this.getNews()},methods:{addNews:function(){this.visible=!1,this.getNews()},updateNews:function(){this.edit=!1,this.getNews()},showNews:function(e){this.visibleEdit=!0,this.clickNews=e},getNews:function(){var e=this;return Object(u["a"])(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.prev=0,t.next=3,C["a"].getAllNews();case 3:e.news=t.sent,console.log(e.news),t.next=10;break;case 7:t.prev=7,t.t0=t["catch"](0),alert(t.t0);case 10:case"end":return t.stop()}}),t,null,[[0,7]])})))()},showEdit:function(e){this.news=e,this.visibleEdit=!0}}},D=q,T=(n("16c1"),Object(w["a"])(D,c,l,!1,null,"7ebe2162",null)),B=T.exports,F=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"simple-new"},[n("VRow",{staticClass:"p-1",attrs:{justify:"end"}},[n("VBtn",{attrs:{outlined:"",color:"primary"},on:{click:function(t){e.visible=!0}}},[n("v-icon",{attrs:{left:""}},[e._v(" mdi-newspaper-plus ")]),e._v("Створити новину ")],1)],1),n("VRow",[n("VCol",[n("NewsList")],1)],1),n("AddNewDialog",{attrs:{visible:e.visible},on:{close:function(t){e.visible=!1}}})],1)},M=[],z=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("VRow",[n("VCol",[n("v-item-group",[n("v-row",e._l(8,(function(t){return n("v-col",{key:t,attrs:{cols:"12",md:"3"}},[n("v-item",{scopedSlots:e._u([{key:"default",fn:function(i){i.active;var r=i.toggle;return[n("v-card",{staticClass:"align-end",attrs:{width:"auto",color:""},on:{click:r}},[n("v-img",{attrs:{height:"140","lazy-src":"https://picsum.photos/350/165?random",src:"https://picsum.photos/350/165?random"},scopedSlots:e._u([{key:"placeholder",fn:function(){return[n("v-row",{staticClass:"fill-height ma-0",attrs:{align:"center",justify:"center"}},[n("v-progress-circular",{attrs:{indeterminate:"",color:"primary "}})],1)]},proxy:!0}],null,!0)}),n("v-card-actions",[n("div",{staticClass:"new-title"},[n("span",[e._v("Заголовок новини "+e._s(t))])]),n("v-spacer"),n("v-btn",{attrs:{icon:"",color:"error darken-1"},on:{click:function(e){e.stopPropagation()}}},[n("v-icon",[e._v("mdi-delete")])],1)],1)],1)]}}],null,!0)})],1)})),1)],1)],1)],1)},L=[],I={},U=I,J=(n("517c"),Object(w["a"])(U,z,L,!1,null,"62f838f6",null)),P=J.exports,W=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("VDialog",{model:{value:e.visibility,callback:function(t){e.visibility=t},expression:"visibility"}},[n("VCard",{attrs:{width:"700"}},[n("VCardTitle",[e._v(" Створити Круту Новину ")]),n("VCardText",[n("VRow",[n("VCol",[n("VTextField",{attrs:{label:"Заголовок","prepend-icon":"mdi-clipboard-text",outlined:"",dense:"","hide-details":""},model:{value:e.news.title,callback:function(t){e.$set(e.news,"title",t)},expression:"news.title"}})],1)],1),n("VRow",[n("VCol",[n("v-file-input",{attrs:{dense:"",counter:"",label:"Головна картинка",placeholder:"Головна картинка","prepend-icon":"mdi-camera",outlined:"",accept:"image/png, image/jpeg, image/svg","show-size":1e3,rules:e.rules},scopedSlots:e._u([{key:"selection",fn:function(t){var i=t.index,r=t.text;return[i<2?n("v-chip",{attrs:{label:"",small:""}},[e._v(" "+e._s(r)+" ")]):2===i?n("span",{staticClass:"text-overline grey--text text--darken-3 mx-2"},[e._v(" +"+e._s(e.news.main_img.length-2)+" File(s) ")]):e._e()]}}]),model:{value:e.news.main_img,callback:function(t){e.$set(e.news,"main_img",t)},expression:"news.main_img"}})],1)],1)],1),n("VCardActions",[n("VSpacer"),n("VBtn",{attrs:{color:"error",text:""},on:{click:e.onCancel}},[e._v(" Скасувати ")]),n("VBtn",{attrs:{color:"primary"},on:{click:e.onCreate}},[e._v(" Створити ")])],1)],1)],1)},G=[],H={data:function(){return{rules:[function(e){return!e||e.size<3e6||"Зображення повинне бути менше 3 MB!"}],news:[]}},props:{visible:{require:!0}},methods:{onCancel:function(){this.news=[],this.$emit("close")},onCreate:function(){console.log(this.news)}},computed:{visibility:{get:function(){return this.visible},set:function(){this.$emit("close")}}}},K=H,Q=Object(w["a"])(K,W,G,!1,null,null,null),X=Q.exports,Y={components:{NewsList:P,AddNewDialog:X},data:function(){return{visible:!1}}},Z=Y,ee=(n("3eb2"),Object(w["a"])(Z,F,M,!1,null,"ad67d3ee",null)),te=ee.exports,ne={components:{SimpleNewComponent:B,RecentNewsComponent:te,NewsList:h,AddNewDialog:S},data:function(){return{tabs:null}}},ie=ne,re=Object(w["a"])(ie,a,o,!1,null,"4765f848",null),se=re.exports,ae={components:{NewsComponent:se,AdminWrapper:s["a"]}},oe=ae,ce=Object(w["a"])(oe,i,r,!1,null,null,null);t["default"]=ce.exports},"3eb2":function(e,t,n){"use strict";n("7606")},"3f81":function(e,t,n){},"517c":function(e,t,n){"use strict";n("c8ca")},"538c":function(e,t,n){},7606:function(e,t,n){},c8ca:function(e,t,n){}}]);
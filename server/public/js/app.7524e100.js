(function(e){function t(t){for(var r,o,c=t[0],i=t[1],s=t[2],f=0,l=[];f<c.length;f++)o=c[f],Object.prototype.hasOwnProperty.call(u,o)&&u[o]&&l.push(u[o][0]),u[o]=0;for(r in i)Object.prototype.hasOwnProperty.call(i,r)&&(e[r]=i[r]);d&&d(t);while(l.length)l.shift()();return a.push.apply(a,s||[]),n()}function n(){for(var e,t=0;t<a.length;t++){for(var n=a[t],r=!0,o=1;o<n.length;o++){var c=n[o];0!==u[c]&&(r=!1)}r&&(a.splice(t--,1),e=i(i.s=n[0]))}return e}var r={},o={app:0},u={app:0},a=[];function c(e){return i.p+"js/"+({}[e]||e)+"."+{"chunk-2d0e9709":"f19817c1","chunk-2f9970a5":"ab7526b8","chunk-3327b332":"c2a201fc","chunk-6144fff7":"338e5bbb"}[e]+".js"}function i(t){if(r[t])return r[t].exports;var n=r[t]={i:t,l:!1,exports:{}};return e[t].call(n.exports,n,n.exports,i),n.l=!0,n.exports}i.e=function(e){var t=[],n={"chunk-2f9970a5":1,"chunk-3327b332":1,"chunk-6144fff7":1};o[e]?t.push(o[e]):0!==o[e]&&n[e]&&t.push(o[e]=new Promise((function(t,n){for(var r="css/"+({}[e]||e)+"."+{"chunk-2d0e9709":"31d6cfe0","chunk-2f9970a5":"36304fe8","chunk-3327b332":"7bb86dc2","chunk-6144fff7":"36304fe8"}[e]+".css",u=i.p+r,a=document.getElementsByTagName("link"),c=0;c<a.length;c++){var s=a[c],f=s.getAttribute("data-href")||s.getAttribute("href");if("stylesheet"===s.rel&&(f===r||f===u))return t()}var l=document.getElementsByTagName("style");for(c=0;c<l.length;c++){s=l[c],f=s.getAttribute("data-href");if(f===r||f===u)return t()}var d=document.createElement("link");d.rel="stylesheet",d.type="text/css",d.onload=t,d.onerror=function(t){var r=t&&t.target&&t.target.src||u,a=new Error("Loading CSS chunk "+e+" failed.\n("+r+")");a.code="CSS_CHUNK_LOAD_FAILED",a.request=r,delete o[e],d.parentNode.removeChild(d),n(a)},d.href=u;var p=document.getElementsByTagName("head")[0];p.appendChild(d)})).then((function(){o[e]=0})));var r=u[e];if(0!==r)if(r)t.push(r[2]);else{var a=new Promise((function(t,n){r=u[e]=[t,n]}));t.push(r[2]=a);var s,f=document.createElement("script");f.charset="utf-8",f.timeout=120,i.nc&&f.setAttribute("nonce",i.nc),f.src=c(e);var l=new Error;s=function(t){f.onerror=f.onload=null,clearTimeout(d);var n=u[e];if(0!==n){if(n){var r=t&&("load"===t.type?"missing":t.type),o=t&&t.target&&t.target.src;l.message="Loading chunk "+e+" failed.\n("+r+": "+o+")",l.name="ChunkLoadError",l.type=r,l.request=o,n[1](l)}u[e]=void 0}};var d=setTimeout((function(){s({type:"timeout",target:f})}),12e4);f.onerror=f.onload=s,document.head.appendChild(f)}return Promise.all(t)},i.m=e,i.c=r,i.d=function(e,t,n){i.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},i.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},i.t=function(e,t){if(1&t&&(e=i(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(i.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var r in e)i.d(n,r,function(t){return e[t]}.bind(null,r));return n},i.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return i.d(t,"a",t),t},i.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},i.p="/",i.oe=function(e){throw console.error(e),e};var s=window["webpackJsonp"]=window["webpackJsonp"]||[],f=s.push.bind(s);s.push=t,s=s.slice();for(var l=0;l<s.length;l++)t(s[l]);var d=f;a.push([0,"chunk-vendors"]),n()})({0:function(e,t,n){e.exports=n("56d7")},"56d7":function(e,t,n){"use strict";n.r(t);n("e260"),n("e6cf"),n("cca6"),n("a79d");var r=n("2b0e"),o=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("VApp",[n("RouterView")],1)},u=[],a={name:"App"},c=a,i=(n("5c0b"),n("2877")),s=Object(i["a"])(c,o,u,!1,null,null,null),f=s.exports,l=n("2f62"),d=n("1da1"),p=(n("96cf"),n("6731")),h={actions:{getUser:function(e){return Object(d["a"])(regeneratorRuntime.mark((function t(){var n;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,p["a"].getClientsList(10);case 2:n=t.sent,console.log(n),e.commit("updateUser",n);case 5:case"end":return t.stop()}}),t)})))()}},mutations:{updateUser:function(e,t){e.user=t}},state:{user:[]},getters:{AllUser:function(e){return e.user}}};r["default"].use(l["a"]);var m=new l["a"].Store({modules:{user:h}}),v=(n("d3b7"),n("3ca3"),n("ddb0"),n("8c4f"));r["default"].use(v["a"]);var g=[{path:"/",name:"main-page",component:function(){return n.e("chunk-2d0e9709").then(n.bind(null,"8e17"))}},{path:"/admin",name:"admin-page-auth",component:function(){return n.e("chunk-2f9970a5").then(n.bind(null,"2de3"))}},{path:"/admin-news",name:"admin-page-news",component:function(){return n.e("chunk-3327b332").then(n.bind(null,"3a8f"))}},{path:"/admin-shedule",name:"admin-page-shedule",component:function(){return n.e("chunk-6144fff7").then(n.bind(null,"0828"))}}],b=new v["a"]({mode:"history",base:"/",routes:g}),y=b,w=n("ce5b"),k=n.n(w);n("bf40");r["default"].use(k.a);var j={},O=new k.a(j);r["default"].config.productionTip=!1,new r["default"]({router:y,vuetify:O,store:m,render:function(e){return e(f)}}).$mount("#app")},"5c0b":function(e,t,n){"use strict";n("9c0c")},6731:function(e,t,n){"use strict";var r=n("1da1"),o=(n("96cf"),n("bc3a")),u=n.n(o),a={get:function(e){return u.a.get("".concat(e))},post:function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{};return u.a.post(t,n)},delete:function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};return u.a.delete(e,t)},put:function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{};return u.a.put(e,t,n)},postExternal:function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{};return u.a.post(e,t,n)}},c="https://jsonplaceholder.typicode.com",i="/users";t["a"]={getClientsList:function(e){return Object(r["a"])(regeneratorRuntime.mark((function t(){var n;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,a.get("".concat(c).concat(i,"?_limit=")+e);case 2:return n=t.sent,t.abrupt("return",null===n||void 0===n?void 0:n.data);case 4:case"end":return t.stop()}}),t)})))()}}},"9c0c":function(e,t,n){}});
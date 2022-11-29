"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[446],{9613:(t,e,n)=>{n.d(e,{Zo:()=>u,kt:()=>m});var r=n(9496);function a(t,e,n){return e in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}function i(t,e){var n=Object.keys(t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(t);e&&(r=r.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),n.push.apply(n,r)}return n}function o(t){for(var e=1;e<arguments.length;e++){var n=null!=arguments[e]?arguments[e]:{};e%2?i(Object(n),!0).forEach((function(e){a(t,e,n[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(n)):i(Object(n)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(n,e))}))}return t}function l(t,e){if(null==t)return{};var n,r,a=function(t,e){if(null==t)return{};var n,r,a={},i=Object.keys(t);for(r=0;r<i.length;r++)n=i[r],e.indexOf(n)>=0||(a[n]=t[n]);return a}(t,e);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(t);for(r=0;r<i.length;r++)n=i[r],e.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(t,n)&&(a[n]=t[n])}return a}var p=r.createContext({}),c=function(t){var e=r.useContext(p),n=e;return t&&(n="function"==typeof t?t(e):o(o({},e),t)),n},u=function(t){var e=c(t.components);return r.createElement(p.Provider,{value:e},t.children)},s={inlineCode:"code",wrapper:function(t){var e=t.children;return r.createElement(r.Fragment,{},e)}},d=r.forwardRef((function(t,e){var n=t.components,a=t.mdxType,i=t.originalType,p=t.parentName,u=l(t,["components","mdxType","originalType","parentName"]),d=c(n),m=a,f=d["".concat(p,".").concat(m)]||d[m]||s[m]||i;return n?r.createElement(f,o(o({ref:e},u),{},{components:n})):r.createElement(f,o({ref:e},u))}));function m(t,e){var n=arguments,a=e&&e.mdxType;if("string"==typeof t||a){var i=n.length,o=new Array(i);o[0]=d;var l={};for(var p in e)hasOwnProperty.call(e,p)&&(l[p]=e[p]);l.originalType=t,l.mdxType="string"==typeof t?t:a,o[1]=l;for(var c=2;c<i;c++)o[c]=n[c];return r.createElement.apply(null,o)}return r.createElement.apply(null,n)}d.displayName="MDXCreateElement"},233:(t,e,n)=>{n.r(e),n.d(e,{assets:()=>p,contentTitle:()=>o,default:()=>s,frontMatter:()=>i,metadata:()=>l,toc:()=>c});var r=n(7161),a=(n(9496),n(9613));const i={},o="action utils",l={unversionedId:"api/action-utils",id:"api/action-utils",title:"action utils",description:"Another alternative to avoid creating nested structures with the type and URL is using these functions.",source:"@site/docs/api/action-utils.md",sourceDirName:"api",slug:"/api/action-utils",permalink:"/api-entity/docs/api/action-utils",draft:!1,tags:[],version:"current",frontMatter:{},sidebar:"tutorialSidebar",previous:{title:"abort",permalink:"/api-entity/docs/api/abort"},next:{title:"actions",permalink:"/api-entity/docs/api/actions"}},p={},c=[],u={toc:c};function s(t){let{components:e,...n}=t;return(0,a.kt)("wrapper",(0,r.Z)({},u,n,{components:e,mdxType:"MDXLayout"}),(0,a.kt)("h1",{id:"action-utils"},"action utils"),(0,a.kt)("p",null,"Another alternative to avoid creating nested structures with the type and URL is using these functions."),(0,a.kt)("table",null,(0,a.kt)("thead",{parentName:"table"},(0,a.kt)("tr",{parentName:"thead"},(0,a.kt)("th",{parentName:"tr",align:null},"action"),(0,a.kt)("th",{parentName:"tr",align:null},"type"))),(0,a.kt)("tbody",{parentName:"table"},(0,a.kt)("tr",{parentName:"tbody"},(0,a.kt)("td",{parentName:"tr",align:null},"get"),(0,a.kt)("td",{parentName:"tr",align:null},"GET")),(0,a.kt)("tr",{parentName:"tbody"},(0,a.kt)("td",{parentName:"tr",align:null},"post"),(0,a.kt)("td",{parentName:"tr",align:null},"POST")),(0,a.kt)("tr",{parentName:"tbody"},(0,a.kt)("td",{parentName:"tr",align:null},"put"),(0,a.kt)("td",{parentName:"tr",align:null},"PUT")),(0,a.kt)("tr",{parentName:"tbody"},(0,a.kt)("td",{parentName:"tr",align:null},"patch"),(0,a.kt)("td",{parentName:"tr",align:null},"PATCH")),(0,a.kt)("tr",{parentName:"tbody"},(0,a.kt)("td",{parentName:"tr",align:null},"del"),(0,a.kt)("td",{parentName:"tr",align:null},"DELETE")))),(0,a.kt)("p",null,"Here I'm using the example above by replacing the object configuration with helper functions."),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-ts"},'import { put, post, get } from "api-entity";\n\nconst posts = createServiceEntity({\n  actions: {\n    all: get("/"),\n    update: put("/:id"),\n    add: post("/"),\n    byIdComments: get("/:id/comments", (value) => value.data),\n  },\n});\n')))}s.isMDXComponent=!0}}]);
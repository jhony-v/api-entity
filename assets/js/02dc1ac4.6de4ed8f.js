"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[0],{9613:(e,t,n)=>{n.d(t,{Zo:()=>u,kt:()=>d});var r=n(9496);function o(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function s(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function a(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?s(Object(n),!0).forEach((function(t){o(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):s(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function i(e,t){if(null==e)return{};var n,r,o=function(e,t){if(null==e)return{};var n,r,o={},s=Object.keys(e);for(r=0;r<s.length;r++)n=s[r],t.indexOf(n)>=0||(o[n]=e[n]);return o}(e,t);if(Object.getOwnPropertySymbols){var s=Object.getOwnPropertySymbols(e);for(r=0;r<s.length;r++)n=s[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(o[n]=e[n])}return o}var c=r.createContext({}),p=function(e){var t=r.useContext(c),n=t;return e&&(n="function"==typeof e?e(t):a(a({},t),e)),n},u=function(e){var t=p(e.components);return r.createElement(c.Provider,{value:t},e.children)},l={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},m=r.forwardRef((function(e,t){var n=e.components,o=e.mdxType,s=e.originalType,c=e.parentName,u=i(e,["components","mdxType","originalType","parentName"]),m=p(n),d=o,y=m["".concat(c,".").concat(d)]||m[d]||l[d]||s;return n?r.createElement(y,a(a({ref:t},u),{},{components:n})):r.createElement(y,a({ref:t},u))}));function d(e,t){var n=arguments,o=t&&t.mdxType;if("string"==typeof e||o){var s=n.length,a=new Array(s);a[0]=m;var i={};for(var c in t)hasOwnProperty.call(t,c)&&(i[c]=t[c]);i.originalType=e,i.mdxType="string"==typeof e?e:o,a[1]=i;for(var p=2;p<s;p++)a[p]=n[p];return r.createElement.apply(null,a)}return r.createElement.apply(null,n)}m.displayName="MDXCreateElement"},9541:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>c,contentTitle:()=>a,default:()=>l,frontMatter:()=>s,metadata:()=>i,toc:()=>p});var r=n(7161),o=(n(9496),n(9613));const s={},a="Using native request",i={unversionedId:"usage/using-native-request",id:"usage/using-native-request",title:"Using native request",description:"Using native requests and passing directly the path, It works with GET methods.",source:"@site/docs/usage/using-native-request.md",sourceDirName:"usage",slug:"/usage/using-native-request",permalink:"/api-entity/docs/usage/using-native-request",draft:!1,tags:[],version:"current",frontMatter:{},sidebar:"tutorialSidebar",previous:{title:"Using external adapter",permalink:"/api-entity/docs/usage/using-external-adapter"}},c={},p=[],u={toc:p};function l(e){let{components:t,...n}=e;return(0,o.kt)("wrapper",(0,r.Z)({},u,n,{components:t,mdxType:"MDXLayout"}),(0,o.kt)("h1",{id:"using-native-request"},"Using native request"),(0,o.kt)("p",null,"Using native requests and passing directly the path, It works with GET methods."),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-ts"},'import { createServiceEntity } from "api-entity";\n\nconst posts = createServiceEntity({\n  baseUrl: "https://jsonplaceholder.typicode.com",\n  entity: "posts",\n  actions: {\n    all: "/",\n    byId: "/:id",\n    byIdComments: "/:id/comments",\n    postComments: async ({ actions, params }) => {\n      const post = await actions.byId(params);\n      const comments = await actions.byIdComments(params);\n      return {\n        post,\n        comments,\n      };\n    },\n  },\n});\n\nposts.all().then(console.log);\nposts.byId({ id: 1 }).then(console.log);\nposts.byIdComments({ id: 2 }).then(console.log);\nposts.postComments({ id: 3 }).then(console.log);\n')))}l.isMDXComponent=!0}}]);
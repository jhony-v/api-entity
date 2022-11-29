"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[53],{1109:e=>{e.exports=JSON.parse('{"pluginId":"default","version":"current","label":"Next","banner":null,"badge":false,"noIndex":false,"className":"docs-version-current","isLast":true,"docsSidebars":{"tutorialSidebar":[{"type":"link","label":"Overview","href":"/docs/intro","docId":"intro"},{"type":"link","label":"Problem","href":"/docs/problem","docId":"problem"},{"type":"category","label":"api","collapsible":true,"collapsed":true,"items":[{"type":"link","label":"abort","href":"/docs/api/abort","docId":"api/abort"},{"type":"link","label":"action utils","href":"/docs/api/action-utils","docId":"api/action-utils"},{"type":"link","label":"actions","href":"/docs/api/actions","docId":"api/actions"},{"type":"link","label":"adapter","href":"/docs/api/adapter","docId":"api/adapter"},{"type":"link","label":"baseUrl","href":"/docs/api/baseUrl","docId":"api/baseUrl"},{"type":"link","label":"configureServiceEntity","href":"/docs/api/configureServiceEntity","docId":"api/configureServiceEntity"},{"type":"link","label":"createServiceEntity","href":"/docs/api/createServiceEntity","docId":"api/createServiceEntity"},{"type":"link","label":"entity","href":"/docs/api/entity","docId":"api/entity"}]},{"type":"link","label":"Typescript","href":"/docs/typescript","docId":"typescript"},{"type":"category","label":"usage","collapsible":true,"collapsed":true,"items":[{"type":"link","label":"Using external adapter","href":"/docs/usage/using-external-adapter","docId":"usage/using-external-adapter"},{"type":"link","label":"Using native request","href":"/docs/usage/using-native-request","docId":"usage/using-native-request"}]}]},"docs":{"api/abort":{"id":"api/abort","title":"abort","description":"If you desire to abort some actions for some reason, executing them is pretty straightforward.","sidebar":"tutorialSidebar"},"api/action-utils":{"id":"api/action-utils","title":"action utils","description":"Another alternative to avoid creating nested structures with the type and URL is using these functions.","sidebar":"tutorialSidebar"},"api/actions":{"id":"api/actions","title":"actions","description":"Here, actions are part fundamental to modeling our API requests indeed.","sidebar":"tutorialSidebar"},"api/adapter":{"id":"api/adapter","title":"adapter","description":"If you are usually accustomed to using an external library like Axios, you can pass the instance to the adapter property, and it will be resolved internally.","sidebar":"tutorialSidebar"},"api/baseUrl":{"id":"api/baseUrl","title":"baseUrl","description":"Base URL of the endpoint; when you create this one, this will be automatically attached alongside the entity and action\'s path properties automatically.","sidebar":"tutorialSidebar"},"api/configureServiceEntity":{"id":"api/configureServiceEntity","title":"configureServiceEntity","description":"Another approach to getting a centralized store is using a configuration that wraps multiple entities and resolves them with the same adapter, base URL, or global settings. The entities will be instanced once created this function and won\'t be reflected on performance.","sidebar":"tutorialSidebar"},"api/createServiceEntity":{"id":"api/createServiceEntity","title":"createServiceEntity","description":"This function allows you to create a full list of actions respecting the base entity (optional for advance cases). As you see, it basically requires an entity and actions. Likewise, actions are part fundamental of the library since those grant you the choise to model easy endpoints or make custom functions if you want to take absolutely control of the flow.","sidebar":"tutorialSidebar"},"api/entity":{"id":"api/entity","title":"entity","description":"Name the base URL that will be attached to the action\'s path. Let\'s see some examples below.","sidebar":"tutorialSidebar"},"intro":{"id":"intro","title":"Overview","description":"Throughout an exploratory experience, I\'ve been noticed that in different projects, our API\'s endpoints aren\'t structured appropriately, or rather, it is merely tough to scale them by repeting some URLs.","sidebar":"tutorialSidebar"},"problem":{"id":"problem","title":"Problem","description":"Nowadays, our FrontEnd applications use countless endpoints, despite dividing them into multiple layers or entities, but there is still a problem because of the quantity of boilerplate we need to write, bind the URL, create methods, pass parameters, and so on. Therefore, the following implementation mostly removes these problems through an intuitive API.","sidebar":"tutorialSidebar"},"typescript":{"id":"typescript","title":"Typescript","description":"Actions automatically will resolve async functions with generic types. But it\'s entirely possible to pass a custom type or interface to overwrite the default definitions.","sidebar":"tutorialSidebar"},"usage/using-external-adapter":{"id":"usage/using-external-adapter","title":"Using external adapter","description":"Using axios as an adapter or if you prefer another, you\'ll be able to do it.","sidebar":"tutorialSidebar"},"usage/using-native-request":{"id":"usage/using-native-request","title":"Using native request","description":"Using native requests and passing directly the path, It works with GET methods.","sidebar":"tutorialSidebar"}}}')}}]);
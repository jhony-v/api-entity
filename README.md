# api-entity

Create service entities according to your API agnostic to the framework you are using.

## Problem

Nowadays, our FrontEnd applications use countless endpoints, despite dividing them into multiple layers or entities, but there is still a problem because of the quantity of boilerplate we need to write, bind the URL, create methods, pass parameters, and so on. Therefore, the following implementation mostly removes these problems through an intuitive API.

## Usage

### Native request

Using native requests and passing directly the path, It works with GET methods.

```ts
import { createServiceEntity } from "api-entity";

const posts = createServiceEntity({
  baseUrl: "https://jsonplaceholder.typicode.com",
  entity: "posts",
  actions: {
    all: "/",
    byId: "/:id",
    byIdComments: "/:id/comments",
    postComments: async ({ actions, params }) => {
      const post = await actions.byId(params);
      const comments = await actions.byIdComments(params);
      return {
        post,
        comments,
      };
    },
  },
});

posts.all().then(console.log);
posts.byId({ id: 1 }).then(console.log);
posts.byIdComments({ id: 2 }).then(console.log);
posts.postComments({ id: 3 }).then(console.log);
```

### Using external adapter

Using axios as an adapter or if you prefer another, you'll be able to do it.

```ts
import axios from "axios";
import { createServiceEntity } from "api-entity";

// custom service with axios
const placeholderService = axios.create({
  baseURL: "https://jsonplaceholder.typicode.com",
});

const posts = createServiceEntity({
  entity: "posts",
  actions: {
    byId: {
      path: "/:id",
    },
    all: {
      path: "/",
      resolve: (value) => value.data,
    },
    create: {
      path: "/",
      type: "post",
    },
    update: {
      path: "/:id",
      type: "put",
    },
    delete: {
      path: "/:id",
      type: "delete",
    },
  },
  adapter: placeholderService,
});

posts.all().then(console.log);
posts.byId({ id: 1 }).then(console.log);
```

## API

### entity

### baseUrl

### actions

### adapter

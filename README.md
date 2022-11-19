# api-entity

Create service entities according to your API agnostic to the framework you are using.

## Usage

Using axios as an adapter

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

Using native requests and passing directly the path, It works with GET methods.

```ts
const posts = createServiceEntity({
  baseUrl: "https://jsonplaceholder.typicode.com",
  entity: "posts",
  actions: {
    all: "/",
    byId: "/:id",
    byIdComments: "/:id/comments",
  },
});

posts.all().then(console.log);
posts.byId({ id: 1 }).then(console.log);
posts.byIdComments({ id: 2 }).then(console.log);
```

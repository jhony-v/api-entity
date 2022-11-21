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

Name the base URL that will be attached to the action's path. Let's see some examples below.

- `posts`: /posts, /posts/1 /posts/1/comments
- `comments`: /comments, /comments/1

### baseUrl

Base URL of the endpoint; when you create this one, this will be automatically attached alongside the entity and action's path properties automatically.

Let's take a handful of the initial example and see how that resolves it.

```ts
const posts = createServiceEntity({
  baseUrl: "https://jsonplaceholder.typicode.com",
  entity: "posts",
  actions: {
    all: "/", // Internally create the path: https://jsonplaceholder.typicode.com/posts/
  },
});
```

> If you are using an adapter, you don't require adding that property 🤓.

### actions

Here, actions are part fundamental to modeling our API requests indeed.

Each action corresponds to a specific endpoint, likewise, these can be declared in three distinct manners.

1. Using the path

```ts
const posts = createServiceEntity({
  actions: {
    all: "/",
    byId: "/:id",
    summary: "/summary",
    byIdComments: "/:id:/comments",
  },
});
```

2. Using an object configurable

```ts
const posts = createServiceEntity({
  actions: {
    all: {
      path: "/",
    },
    update: {
      path: "/:id",
      type: "put",
    },
    add: {
      path: "/",
      type: "post",
    },
    byIdComments: {
      path: "/:id:/comments",
      resolve: (value) => value.data, // optional whether you want to manipulate the response and return a new data
    },
  },
});
```

3. Creating functions for complex manipulations

```ts
const posts = createServiceEntity({
  actions: {
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
```

### adapter

If you are usually accustomed to using an external library like Axios, you can pass the instance to the adapter property, and it will be resolved internally.

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

// Custom service with axios
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

- posts:
  - `/posts`
  - `/posts/1`
  - `/posts/1/comments`
- comments:
  - `/comments`
  - `/comments/top`

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

2. Using an object customizable

```ts
const posts = createServiceEntity({
  actions: {
    all: {
      path: "/", // You don't need to add the type "get", default it is
    },
    add: {
      path: "/",
      type: "post",
    },
    byIdComments: {
      path: "/:id:/comments",
      // Optional whether you want to manipulate the response and return a new data
      resolve: (value) => value.data,
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

### abort

If you desire to abort some actions for some reason, executing them is pretty straightforward.

To revoke a request, you have the property "abort", followed by the method's name.

```ts
const posts = createServiceEntity({
  actions: {
    all: "/",
    byId: "/:id",
  },
});

posts.all().then(console.log);
posts.abort.all(); // abort request of "all" method
posts.byId({ id: 1 }).then(console.log);
posts.abort.byId(); // abort request of "byId" method
```

### action utils

Another alternative to avoid creating nested structures with the type and URL is using these functions.

| action | type   |
| ------ | ------ |
| get    | GET    |
| post   | POST   |
| put    | PUT    |
| patch  | PATCH  |
| del    | DELETE |

Here I'm using the example above by replacing the object configuration with helper functions.

```ts
import { put, post, get } from "api-entity";

const posts = createServiceEntity({
  actions: {
    all: get("/"),
    update: put("/:id"),
    add: post("/"),
    byIdComments: get("/:id:/comments", (value) => value.data),
  },
});
```

### adapter

If you are usually accustomed to using an external library like Axios, you can pass the instance to the adapter property, and it will be resolved internally.

## Using types

Actions automatically will resolve async functions with generic types. But it's entirely possible to pass a custom type or interface to overwrite the default definitions.

```ts
import { put, post, get } from "api-entity";

type Params = { id: string };
type Payload = {
  title: string;
};

interface PostService {
  all(): Promise<object[]>;
  byId(params: Params): Promise<object>;
  update(params: Params & Payload): Promise<object>;
  add(payload: Payload): Promise<object>;
}

const posts = createServiceEntity<PostService>({
  actions: {
    all: get("/"),
    byId: get("/:id"),
    update: put("/:id"),
    add: post("/"),
  },
});
```

### configureServiceEntity

Another approach to getting a centralized store is using a configuration that wraps multiple entities and resolves them with the same adapter, base URL, or global settings. The entities will be instanced once created this function and won't be reflected on performance.

Each entity's property will be used as the entity property. Therefore, you can use it by accessing through the same name and calling their methods.

```ts
import { post, get, createServiceEntity, configureServiceEntity } from "api-entity";

const posts = createServiceEntity({
  actions: {
    all: get("/"),
    byId: get("/:id"),
    add: post("/"),
  },
});

const users = createServiceEntity({
  actions: {
    all: "/",
    byId: "/:id",
  },
});

const services = configureServiceEntity({
  baseUrl: "https://jsonplaceholder.typicode.com",
  entities: { posts, users },
});

// https://jsonplaceholder.typicode.com/users/
services.users.all().then(console.log);

// https://jsonplaceholder.typicode.com/posts/
services.posts.all().then(console.log);
```

[View a full example here 👈](https://codesandbox.io/s/api-entity-example-6twbrv)

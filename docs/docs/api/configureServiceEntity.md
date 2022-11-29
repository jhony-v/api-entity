# configureServiceEntity

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

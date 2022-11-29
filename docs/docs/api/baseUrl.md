# baseUrl

Base URL of the endpoint; when you create this one, this will be automatically attached alongside the entity and action's path properties automatically.

Let's take a handful of the initial example and see how that resolves it.

```ts
const posts = createServiceEntity({
  baseUrl: "https://jsonplaceholder.typicode.com",
  entity: "posts",
  actions: {
    // Internally create the path: https://jsonplaceholder.typicode.com/posts/
    all: "/",
  },
});
```

> If you are using an adapter, you don't require adding that property 🤓.

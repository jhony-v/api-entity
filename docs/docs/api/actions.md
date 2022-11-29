# actions

Here, actions are part fundamental to modeling our API requests indeed.

Each action corresponds to a specific endpoint, likewise, these can be declared in three distinct manners.

1. Using the path

```ts
const posts = createServiceEntity({
  actions: {
    all: "/",
    byId: "/:id",
    summary: "/summary",
    byIdComments: "/:id/comments",
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
      path: "/:id/comments",
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

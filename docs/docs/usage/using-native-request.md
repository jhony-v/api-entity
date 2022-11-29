# Using native request

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

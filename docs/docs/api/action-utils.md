# action utils

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
    byIdComments: get("/:id/comments", (value) => value.data),
  },
});
```

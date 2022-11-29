# Typescript

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

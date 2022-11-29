# createServiceEntity

This function allows you to create a full list of actions respecting the base entity (optional for advance cases). As you see, it basically requires an entity and actions. Likewise, actions are part fundamental of the library since those grant you the choise to model easy endpoints or make custom functions if you want to take absolutely control of the flow.

```ts
import { get, createServiceEntity } from "api-entity";

const posts = createServiceEntity({
  entity: "posts",
  actions: {
    byIdComments: "/:id/comments",
    byId: "/:id",
  },
});
```

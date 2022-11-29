# abort

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

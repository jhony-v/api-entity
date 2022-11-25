import { ConfigServicesEntity, EntityReturn, ReturnConfigServices } from "./types";

export default function configureServiceEntity<
  Entities extends { [key in keyof Entities]: EntityReturn<{}> },
  Adapter extends {} = {}
>(config: ConfigServicesEntity<Entities, Adapter>) {
  const { entities, baseUrl, adapter } = config;
  const services = {} as ReturnConfigServices<Entities>;

  for (const name in entities) {
    const currentEntity = entities[name];
    currentEntity.configure({
      baseUrl,
      adapter,
      entity: name,
    });
    const actions = currentEntity.setupActions();
    services[name] = { ...currentEntity, ...actions };
  }

  return services;
}

import { EntityConfig, EntityReturn, ResolveAsyncRequestProps } from "./types";
import { createPath } from "./utility";
import fetcher from "./utility/fetcher";

const resolveAdapter = <T>(adapter: T | any) => {
  const resolver = async <Params, Resolve = any>(
    props: ResolveAsyncRequestProps<Params>
  ): Promise<Resolve> => {
    const { path, params, type } = props;
    return adapter[type || "get"](path, params ?? {});
  };
  return resolver;
};

export default function createServiceEntity<Actions extends {}, Adapter extends {}>(
  config: EntityConfig<Actions, Adapter>
) {
  const { actions, entity, adapter, baseUrl } = config;
  const finalActions = {} as EntityReturn<Actions>;
  const request = resolveAdapter(adapter);

  for (let actionName in actions) {
    const action = actions[actionName];
    finalActions[actionName] = (params = undefined) => {
      const path = createPath({
        entity,
        path: action.path,
        params,
        baseUrl,
      });

      return new Promise(async (resolve, reject) => {
        try {
          const buildAdapterCallback = adapter ? request : fetcher;
          const response = await buildAdapterCallback({
            type: action.type,
            path,
            params,
          });
          if (action.resolve) {
            const resolver = action.resolve(response);
            resolve(resolver);
          }
          resolve(response);
        } catch (error) {
          reject(Error(error as string));
        }
      });
    };
  }

  return finalActions;
}

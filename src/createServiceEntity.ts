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

  for (const actionName in actions) {
    const action = actions[actionName];
    const isActionFullPath = typeof action === "string";
    finalActions[actionName] = (params = undefined) => {
      const path = createPath({
        path: isActionFullPath ? action : action.path,
        entity,
        params,
        baseUrl,
      });

      return new Promise(async (resolve, reject) => {
        try {
          const buildAdapterCallback = adapter ? request : fetcher;
          const response = await buildAdapterCallback({
            type: isActionFullPath ? "get" : action.type,
            path,
            params,
          });
          if (!isActionFullPath && action.resolve) {
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

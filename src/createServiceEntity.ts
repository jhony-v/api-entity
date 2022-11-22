import { AbortActions, EntityActions, EntityConfig, EntityReturn } from "./types";
import createPath from "./utility/createPath";
import fetcher from "./utility/fetcher";
import resolveAdapter from "./utility/resolveAdapter";

export default function createServiceEntity<Actions extends {}, Adapter extends {} = {}>(
  config: EntityConfig<Actions, Adapter>
): EntityReturn<Actions> {
  const { actions, entity, adapter, baseUrl } = config;
  const finalActions = {} as EntityActions<Actions>;
  const abort = {} as AbortActions<Actions>;
  const request = resolveAdapter(adapter);

  for (const actionName in actions) {
    const action = actions[actionName];
    const isActionFullPath = typeof action === "string";
    const controller = new AbortController();

    abort[actionName] = () => controller.abort();

    //@ts-ignore
    finalActions[actionName] = async (params = undefined) => {
      if (typeof action === "function") {
        const filterActions = { ...finalActions };
        delete filterActions[actionName];
        return action({ actions: { ...filterActions, abort }, params });
      }

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
            signal: controller.signal,
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

  return {
    ...finalActions,
    abort,
  };
}

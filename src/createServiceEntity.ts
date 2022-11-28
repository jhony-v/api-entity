import {
  AbortActions,
  Action,
  ActionFunction,
  CustomEntityConfig,
  EntityActions,
  EntityConfig,
  EntityReturn,
} from "./types";
import createAbortController from "./utility/createAbortController";
import createPath from "./utility/createPath";
import fetcher from "./utility/fetcher";
import resolveAdapter from "./utility/resolveAdapter";

export default function createServiceEntity<Actions extends {}, Adapter extends {} = {}>(
  config: EntityConfig<Actions, Adapter>
): EntityReturn<Actions> {
  const finalActions = {} as EntityActions<Actions>;
  const abort = {} as AbortActions<Actions>;

  function configure(customConfig: CustomEntityConfig<Adapter>) {
    if (customConfig.baseUrl) {
      config.baseUrl = customConfig.baseUrl;
    }
    if (customConfig.adapter) {
      config.adapter = customConfig.adapter;
    }
    if (!config.entity) {
      config.entity = customConfig.entity;
    }
  }

  function setupActions() {
    const { actions, entity, adapter, baseUrl } = config;
    const request = resolveAdapter(adapter);

    for (const actionName in actions) {
      const action = actions[actionName] as Action | ActionFunction;
      const isActionFullPath = typeof action === "string";
      const controller = createAbortController();

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
              ...(controller.signal && {
                signal: controller.signal,
              }),
            });

            if (!isActionFullPath && action.resolve) {
              const resolver = action.resolve(response);
              resolve(resolver);
            }

            resolve(response);
          } catch (error) {
            reject(new Error(error as string));
          }
        });
      };
    }
    return finalActions;
  }

  if (config.entity && (config.baseUrl || config.adapter)) {
    setupActions();
  }

  return {
    ...finalActions,
    abort,
    setupActions,
    configure,
  };
}

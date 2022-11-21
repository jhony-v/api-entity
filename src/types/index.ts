export type ActionType = "get" | "post" | "patch" | "put" | "delete";

type ActionFunction<Params extends {} = {}, Response extends {} = {}, Actions = {}> = (context: {
  actions: Actions;
  params?: Params;
}) => Promise<Response>;

export type Action = {
  /** Url of the endpoint without the base entity */
  readonly path: string;

  /** Type of request, by default it is "get"  */
  readonly type?: ActionType;

  /** Personalize the value resolved */
  resolve?<Output>(value: Output): Output;
};

export type EntityConfig<Actions extends {} = {}, Adapter extends {} = {}> = {
  /** Base path for a entity */
  entity: string;
  baseUrl?: string;

  /** Configure endpoints or methods */
  actions: {
    [Property in keyof Actions]:
      | ((Actions[Property] & Action) | string)
      | ActionFunction<any, any, Omit<EntityReturn<Actions>, Property>>;
  };

  /** Adaptar to make requests */
  adapter?: Adapter;
};

export type AbortActions<Actions> = {
  [Property in keyof Actions]: () => void;
};

export type EntityActions<Actions> = {
  [Property in keyof Actions]: <P, T = {}>(params?: P) => Promise<T>;
};

export type EntityReturn<Actions> = EntityActions<Actions> & {
  /** Property with an list of methods to abort each actions whether it'is necessary */
  abort: AbortActions<Actions>;
};

export type ResolveAsyncRequestProps<Params> = {
  /** Url of the endpoint */
  path: string;

  /** Type of http action */
  type?: ActionType;

  /** Object of parameters referencing to the value in path following the next pattern :name */
  params?: Params;

  /** Binding AbortController */
  signal: AbortSignal;
};

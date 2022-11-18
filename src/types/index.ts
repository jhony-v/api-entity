export type ActionType = "get" | "post" | "patch" | "put" | "delete";

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
    [Property in keyof Actions]: Actions[Property] & Action;
  };

  /** Adaptar to make requests */
  adapter?: Adapter;
};

export type EntityReturn<Actions> = {
  [Property in keyof Actions]: <P, T = {}>(params?: P) => Promise<T>;
};

export type ResolveAsyncRequestProps<Params> = {
  path: string;
  type?: ActionType;
  params?: Params;
};

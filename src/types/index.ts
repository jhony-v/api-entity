export type ActionType = "get" | "post" | "patch" | "put" | "delete";

export type EntityBaseConfig<Adapter = {}> = {
  /** Base path for a entity */
  entity?: string;

  /** Base http domain */
  baseUrl?: string;

  /** Adapter to make requests */
  adapter?: Adapter;
};

export type ActionFunction<
  Params extends {} = {},
  Response extends {} = {},
  Actions = {}
> = (context: {
  /** Access to the other actions inside the entity */
  actions: Actions;

  /** Parameters that you can pass at the time it is invoked */
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
  /** Configure endpoints or methods */
  actions: {
    [Property in keyof Actions]:
      | Action
      | string
      | ActionFunction<
          Actions[Property] extends (params: infer Params) => Promise<unknown> ? Params & {} : {},
          Actions[Property] extends (...args: any) => Promise<unknown>
            ? Awaited<ReturnType<Actions[Property]>>
            : {},
          Omit<EntityReturn<Actions>, Property>
        >;
  };
} & EntityBaseConfig<Adapter>;

export type AbortActions<Actions> = {
  /** Functions to abort actions */
  [Property in keyof Actions]: () => void;
};

export type EntityActions<Actions> = {
  /**
   * Return action with custom type definition passed as a prop
   * Otherwise, return a default promise function
   */
  [Property in keyof Actions]: Actions[Property] extends (
    value: infer Params
  ) => Promise<infer Return>
    ? (params?: Params) => Promise<Return>
    : <Params, Response = {}>(params?: Params) => Promise<Response>;
};

export type EntityReturn<Actions> = EntityActions<Actions> &
  EntityBaseConfig & {
    /** Property with an list of methods to abort each actions whether it's necessary */
    abort: AbortActions<Actions>;

    /** initialize actions */
    setupActions(): EntityActions<Actions>;

    /** Personalize configuration of actions and other properties of initial config */
    configure(customConfig: CustomEntityConfig<{}>): void;
  };

export type CustomEntityConfig<Actions> = EntityBaseConfig<Actions>;

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

export type ConfigServicesEntity<Entities, Adapter> = {
  /** Object of "EntityConfig" */
  entities: Entities;

  /** Adapter to make requests */
  adapter?: Adapter;

  /** Base http domain */
  baseUrl?: string;
};

export type ReturnConfigServices<Entities> = {
  [Property in keyof Entities]: Omit<Entities[Property], "setupActions" | "configure" | "adapter">;
};

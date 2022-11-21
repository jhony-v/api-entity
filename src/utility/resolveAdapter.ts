import { ResolveAsyncRequestProps } from "../types";

export default function resolveAdapter<T>(adapter: T | any) {
  const resolver = async <Params, Resolve = any>(
    props: ResolveAsyncRequestProps<Params>
  ): Promise<Resolve> => {
    const { path, params, type, signal } = props;
    const getParams = params ?? {};
    return adapter[type || "get"](path, { ...getParams, signal });
  };
  return resolver;
}

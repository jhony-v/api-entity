import { ResolveAsyncRequestProps } from "../types";

/**
 * Default fetcher using Fetch API
 */

export default function fetcher<Props>(props: ResolveAsyncRequestProps<Props>) {
  const { type, signal, path, params } = props;
  const parseMethod = (type || "get").toUpperCase();
  return fetch(path, {
    method: parseMethod,
    headers: {
      "Content-Type": "application/json",
    },
    signal,
    ...(parseMethod !== "GET" && {
      body: JSON.stringify(params),
    }),
  }).then((response) => response.json());
}

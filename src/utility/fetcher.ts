import { ResolveAsyncRequestProps } from "../types";

export default function fetcher<Props>(props: ResolveAsyncRequestProps<Props>) {
  const parseMethod = (props.type || "get").toUpperCase();
  return fetch(props.path, {
    method: parseMethod,
    headers: {
      "Content-Type": "application/json",
    },
    ...(parseMethod !== "GET"
      ? {
          body: JSON.stringify(props.params),
        }
      : {}),
  }).then((response) => response.json());
}

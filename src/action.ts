import { METHOD } from "./constants";

export const post = createAction(METHOD.POST);
export const del = createAction(METHOD.DELETE);
export const get = createAction(METHOD.GET);
export const patch = createAction(METHOD.PATCH);
export const put = createAction(METHOD.PUT);

function createAction(type: METHOD) {
  return <T>(path: string, resolve?: (val: T) => T) => ({ path, type, resolve });
}

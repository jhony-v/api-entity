import { METHOD } from "./constants";
import { Action, ActionType } from "./types";

export const post = createAction(METHOD.POST);
export const del = createAction(METHOD.DELETE);
export const get = createAction(METHOD.GET);
export const patch = createAction(METHOD.PATCH);
export const put = createAction(METHOD.PUT);

function createAction(type: ActionType) {
  return (path: string, resolve?: <T>(val: T) => T): Action => ({ path, type, resolve });
}

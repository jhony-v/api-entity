export default function createAbortController() {
  if (typeof AbortController !== "undefined") {
    return new AbortController();
  }
  return {
    abort: () => null,
    signal: null,
  };
}

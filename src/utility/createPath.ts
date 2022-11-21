type CreatePathProps<T> = {
  entity: string;
  path: string;
  params?: T;
  baseUrl?: string;
};

const createPath = <T>({
  entity,
  params,
  baseUrl,
  path: inputPath,
}: CreatePathProps<T>): string => {
  let path = `/${entity}${inputPath}`;
  const existsParams = params && Object.keys(params).length !== 0;
  if (existsParams) {
    const matches = path.match(/:\w+/gi) || [];
    matches.forEach((matchItem) => {
      const name = matchItem.substring(1);
      path = path.replace(matchItem, (params as any)[name]);
    });
  }
  if (baseUrl) {
    path = `${baseUrl}${path}`;
  }
  return path;
};

export default createPath;

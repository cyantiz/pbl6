export const getQueryObjectFromSearch = (params: { search: string }) => {
  const { search } = params;

  const queryObject: Record<string, string[] | string> = {};

  if (search) {
    const searchParams = new URLSearchParams(search);

    for (const [key, value] of searchParams.entries()) {
      if (queryObject[key]) {
        if (Array.isArray(queryObject[key])) {
          (queryObject[key] as string[]).push(value);
        } else {
          queryObject[key] = [queryObject[key] as string, value];
        }
      } else {
        queryObject[key] = value;
      }
    }
  }

  return queryObject;
};

export type PaginationResponse<T> = {
  values: T[];
  total: number;
  pageSize: number;
  totalPage: number;
  page: number;
  nextPage: number | null;
};

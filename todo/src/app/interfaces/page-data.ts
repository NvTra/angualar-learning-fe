export interface IPageData<T> {
  pageIndex: number;
  pageSize: number;
  totalCount: number;
  totalPages: number;
  data: T[];
}

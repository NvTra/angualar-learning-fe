export interface IRequestPayLoad {
  username: string;
  pageIndex: number;
  pageSize: number;
  sorting: ISorting;
}
interface ISorting {
  direction: number;
  field: string;
}

// interface Result {
//   code: number;
//   message: string;
// }

interface Result<T = any> {
  code: number;
  message: string;
  data?: T;
}

interface SearchModel {
  searchText?: string;
  sort?: string;
  asc?: false;
}

interface PageSearchModel extends SearchModel {
  pageIndex: number;
  pageSize: number;
}

interface PageResult<T> {
  pageIndex: number;
  pageSize: number;
  list: Array<T>;
  total?: number;
}

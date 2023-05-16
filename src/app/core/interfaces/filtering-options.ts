export interface FilteringOptions {
  search: string,
  sortBy: 'followers' | 'repositories' | 'joined',
  sortDirection: 'asc' | 'dsc',
  pageNumber: number,
  pageSize: number,
}

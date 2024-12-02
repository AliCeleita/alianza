export interface Page<T> {
  content: Array<T>
  last: boolean
  totalElements: number
  totalPages: number
  size: number
  number: number
  sort: Sort
  first: boolean
  numberOfElements: number
  empty: boolean
}

export interface Sort {
  empty: boolean
  sorted: boolean
  unsorted: boolean
}

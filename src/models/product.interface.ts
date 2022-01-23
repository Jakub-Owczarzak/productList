export interface ProductBase {
  name: string;
  quantity: number;
  date: Date;
  description: string;
  email: string;
}

export interface ProductId {
  id: number;
}

export interface Product extends ProductId, ProductBase {}

export type SortingDirection = "desc" | "asc";
export type ColumnNames =
  | "id"
  | "name"
  | "description"
  | "date"
  | "quantity"
  | "email";

export interface SortProducts {
  columnName: ColumnNames;
  sortDirection: SortingDirection;
}
export interface sortingOptions {
  id: SortingDirection;
  name: SortingDirection;
  date: SortingDirection;
  description: SortingDirection;
  quantity: SortingDirection;
  email: SortingDirection;
}

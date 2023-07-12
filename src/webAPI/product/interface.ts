export interface Product {
  CategoryId: number;
  createdAt: string;
  id: number;
  image: string;
  info: string;
  is_deleted: false;
  name: string;
  status: 0 | 1;
  updatedAt: string;
}

export interface Category {
  id: number;
  name: string;
  is_deleted: boolean;
  createdAt: string;
  updatedAt: string;
  Products: Product[];
}

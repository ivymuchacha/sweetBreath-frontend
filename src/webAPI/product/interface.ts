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

export interface ProductFeature {
  ProductId: number;
  createdAt: string;
  id: number;
  is_deleted: boolean;
  name: string;
  price: number;
  promo_price: number;
  stock: number;
  updatedAt: string;
}

export interface ProductWithFeature extends Product {
  CategoryId: number;
  Features: ProductFeature[];
}

export interface Category {
  id: number;
  name: string;
  is_deleted: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CategoryWithProduct extends Category {
  Products: Product[];
}

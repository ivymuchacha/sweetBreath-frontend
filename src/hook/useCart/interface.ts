import { Product, ProductFeature } from "@/webAPI/product/interface";

export interface CartType {
  productId: Product["id"];
  productName: Product["name"];
  image: Product["image"];
  featureId: ProductFeature["id"];
  feature: ProductFeature["name"];
  price: ProductFeature["promo_price"];
  stock: ProductFeature["stock"];
  count: number;
  subTotal: number;
}

import { ProductFeature } from "@/webAPI/product/interface";

export interface Feature extends ProductFeature {
  count: number;
}

import { Product, ProductFeature } from "@/webAPI/product/interface";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

const CART_PAGE_URL = "/cart";
const CART_LOCAL_STORAGE_KEY = "cart";

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

const useCart = () => {
  const [cart, setCart] = useState<CartType[]>([]);

  useEffect(() => {
    const currentCart = localStorage.getItem(CART_LOCAL_STORAGE_KEY);
    if (currentCart) {
      setCart(JSON.parse(currentCart));
    }
  }, []);

  const history = useHistory();
  const handleCartChange = (item: CartType) => {
    if (
      cart?.some(
        ({ productId, featureId }) =>
          item.productId === productId && featureId === item.featureId
      )
    ) {
      if (
        window.confirm("您的購物車已經有相同物品囉！要前往購物車頁面修改嗎？")
      ) {
        history.push(CART_PAGE_URL);
        return;
      }
    }
    const newCart = [...cart, item];
    setCart(newCart);
    localStorage.setItem(CART_LOCAL_STORAGE_KEY, JSON.stringify(newCart));
    history.push(CART_PAGE_URL);
  };

  return {
    cart,
    onCartChange: handleCartChange
  };
};

export default useCart;

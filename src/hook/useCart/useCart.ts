import { useEffect, useState } from "react";
import { CartType } from "./interface";
// import { isItemExist } from "./utils";
import { CART_LOCAL_STORAGE_KEY } from "./constants";
import { Product } from "@/webAPI/product/interface";
import { isSameItem } from "./utils";

interface UpdateCartItemProps {
  item: CartType;
  validator?: ({ item, cart }: { item: CartType; cart: CartType[] }) => void;
}

const useCart = () => {
  const [cart, setCart] = useState<CartType[]>([]);

  useEffect(() => {
    const currentCart = localStorage.getItem(CART_LOCAL_STORAGE_KEY);
    if (currentCart) {
      setCart(JSON.parse(currentCart));
    }
  }, []);

  const handleCartChange = (newCart: CartType[]) => {
    setCart(newCart);
    localStorage.setItem(CART_LOCAL_STORAGE_KEY, JSON.stringify(newCart));
  };

  const updateCartItem = ({ item, validator }: UpdateCartItemProps) => {
    try {
      if (validator) {
        validator({ item, cart });
      }
      const itemIndex = cart.findIndex((compareItem) =>
        isSameItem({
          targetItem: item,
          compareItem
        })
      );
      const newCart = [...cart];
      if (itemIndex > -1) {
        newCart[itemIndex] = item;
      } else {
        newCart.push(item);
      }
      handleCartChange(newCart);
    } catch (e: unknown) {
      console.warn("validate fail", e);
      throw e;
    }
  };

  const deleteCartItem = ({
    productId,
    featureId
  }: {
    productId: CartType["productId"];
    featureId: CartType["featureId"];
  }) => {
    const newCart = [...cart].filter(
      (item) =>
        !isSameItem({
          targetItem: {
            productId,
            featureId
          },
          compareItem: item
        })
    );
    handleCartChange(newCart);
  };

  return {
    cart,
    updateCartItem,
    deleteCartItem
  };
};

export default useCart;

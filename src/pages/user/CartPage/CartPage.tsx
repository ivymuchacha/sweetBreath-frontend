import { useMemo } from "react";
import CartList from "./CartList";
import CartSummary from "./CartSummary";
import {
  BackToHome,
  CartContainer,
  CartTitle,
  CartContent,
  CartListContainer,
  CartEmpty
} from "./style";
import { useCart } from "@/hook";
import { CartType } from "@/hook/useCart/interface";

const CartPage = () => {
  const { cart, updateCartItem, deleteCartItem } = useCart();

  const totalPrice = useMemo(() => {
    let currentTotal = 0;
    for (let i = 0; i < cart.length; i++) {
      currentTotal += cart[i].price * cart[i].count;
    }
    return currentTotal;
  }, [cart]);

  // 減少商品數
  const handleClickDown = (cartItem: CartType) => {
    if (cartItem.count === 1) {
      if (window.confirm("是否移除商品？")) {
        deleteCartItem(cartItem);
      }
      return;
    }
    updateCartItem({
      item: {
        ...cartItem,
        count: cartItem.count - 1,
        subTotal: (cartItem.count - 1) * cartItem.price
      }
    });
  };

  // 增加商品數
  const handleClickUp = (cartItem: CartType) => {
    try {
      updateCartItem({
        item: {
          ...cartItem,
          count: cartItem.count + 1,
          subTotal: (cartItem.count + 1) * cartItem.price
        },
        validator: ({ item }) => {
          if (item.count > item.stock) {
            alert(`Sorry...此商品目前庫存: ${cartItem.stock}`);
            throw new Error("stock run out");
          }
        }
      });
    } catch {
      return;
    }
  };

  return (
    <CartContainer>
      <CartTitle>購物車</CartTitle>
      {cart.length > 0 ? (
        <>
          <CartContent>
            <CartListContainer>
              {cart.map((cartItem) => (
                <CartList
                  key={`${cartItem.productId}_${cartItem.feature}`}
                  cartItem={cartItem}
                  handleClickDown={handleClickDown}
                  handleClickUp={handleClickUp}
                />
              ))}
            </CartListContainer>
            <CartSummary totalPrice={totalPrice} />
          </CartContent>
        </>
      ) : (
        <CartEmpty>
          <h3>購物車目前沒有商品唷！</h3>
          <BackToHome to='/products'>回商品頁逛逛</BackToHome>
        </CartEmpty>
      )}
    </CartContainer>
  );
};

export default CartPage;

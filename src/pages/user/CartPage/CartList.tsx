import { PlusCircleOutlined, MinusCircleOutlined } from "@ant-design/icons";
import { THEME } from "@/constants/theme";
import {
  CounterArea,
  CartItemContainer,
  CartItemContent,
  CartItemFeature,
  CartItemTitle,
  CartItemPrice,
  ImgLink,
  OderItemDetails
} from "./style";
import { CartType } from "@/hook/useCart/interface";

interface CartListProps {
  cartItem: CartType;
  handleClickDown: (item: CartType) => void;
  handleClickUp: (item: CartType) => void;
}

const CartList = ({
  cartItem,
  handleClickDown,
  handleClickUp
}: CartListProps) => (
  <CartItemContainer>
    <ImgLink
      to={`/product/${cartItem.productId}`}
      target='_blank'
      style={{ backgroundImage: `url(${cartItem.image})` }}></ImgLink>
    <CartItemContent>
      <CartItemTitle to={`/product/${cartItem.productId}`} target='_blank'>
        <span>{cartItem.productName}</span>
        <CartItemFeature>{cartItem.feature}</CartItemFeature>
      </CartItemTitle>
      <OderItemDetails>
        <CounterArea>
          <MinusCircleOutlined
            style={{
              width: "34px",
              height: "34px",
              padding: "2px",
              cursor: "pointer",
              color: THEME.colors.mainPrimary
            }}
            onClick={() => {
              handleClickDown(cartItem);
            }}
          />
          <span>{cartItem.count}</span>
          <PlusCircleOutlined
            style={{
              width: "34px",
              height: "34px",
              padding: "2px",
              cursor: "pointer",
              color: THEME.colors.mainPrimary
            }}
            onClick={() => {
              handleClickUp(cartItem);
            }}
          />
        </CounterArea>
        <CartItemPrice>NT$ {cartItem.price}</CartItemPrice>
      </OderItemDetails>
    </CartItemContent>
  </CartItemContainer>
);

export default CartList;

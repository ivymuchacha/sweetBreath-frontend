import React from "react";
import PropTypes from "prop-types";
import { PlusCircleOutlined, MinusCircleOutlined } from "@ant-design/icons";
import { theme } from "@constants/theme";
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

export function CartList({ cartItem, handleClickDown, handleClickUp }) {
  return (
    <CartItemContainer>
      <ImgLink
        to={`/product/${cartItem.id}`}
        target='_blank'
        style={{ backgroundImage: `url(${cartItem.image})` }}></ImgLink>
      <CartItemContent>
        <CartItemTitle to={`/product/${cartItem.id}`} target='_blank'>
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
                color: theme.colors.mainPrimary
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
                color: theme.colors.mainPrimary
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
}

CartList.propTypes = {
  cartItem: PropTypes.shape({
    id: PropTypes.number,
    image: PropTypes.string,
    feature: PropTypes.string,
    productName: PropTypes.string,
    count: PropTypes.number,
    price: PropTypes.number
  }),
  handleClickDown: PropTypes.func,
  handleClickUp: PropTypes.func
};

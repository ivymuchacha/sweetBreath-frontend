import {
  ButtonContainer,
  CartSummaryContainer,
  SubmitButton,
  Subtotal,
  OrderTotalPrice
} from "./style";

interface CartSummaryProps {
  totalPrice: number;
}

const CartSummary = ({ totalPrice }: CartSummaryProps) => {
  return (
    <CartSummaryContainer>
      <h2>訂單摘要</h2>
      <Subtotal>
        <div>商品總計</div>
        <div>NT$ {totalPrice}</div>
      </Subtotal>
      <Subtotal>
        <div>運費總計</div>
        <div>NT$ 0</div>
      </Subtotal>
      <OrderTotalPrice>
        總付款金額：<b>NT$ {totalPrice}</b>
      </OrderTotalPrice>
      <ButtonContainer>
        <SubmitButton to='/checkout'>前往結帳</SubmitButton>
      </ButtonContainer>
    </CartSummaryContainer>
  );
};

export default CartSummary;

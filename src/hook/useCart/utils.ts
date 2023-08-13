import { CartType } from "./interface";

export const isSameItem = ({
  targetItem,
  compareItem
}: {
  targetItem: Pick<CartType, "featureId" | "productId">;
  compareItem: Pick<CartType, "featureId" | "productId">;
}) =>
  targetItem.productId === compareItem.productId &&
  targetItem.featureId === compareItem.featureId;

interface IsItemExistProps {
  cart: CartType[];
  item: CartType;
}
export const isItemExist = ({ cart, item: targetItem }: IsItemExistProps) =>
  cart.some((compareItem) =>
    isSameItem({
      targetItem,
      compareItem
    })
  );

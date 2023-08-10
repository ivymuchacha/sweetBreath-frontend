import { MinusCircleOutlined, PlusCircleOutlined } from "@ant-design/icons";
import {
  CounterArea,
  Feature,
  FeatureList,
  FeatureName,
  ProductCounter,
  ProductPrice,
  ProductPrices,
  ProductPromoPrice,
  ProductStorage
} from "./style";
import { THEME } from "@/constants/theme";
import { Feature as FeatureType } from "./interface";

interface FeatureItemProps {
  featureItem: FeatureType;
  onMinus: () => void;
  onPlus: () => void;
}

const FeatureItem = ({ featureItem, onMinus, onPlus }: FeatureItemProps) => {
  return (
    <FeatureList>
      <Feature>
        <FeatureName>{featureItem.name}</FeatureName>
        <ProductPrices>
          <ProductPromoPrice>
            {featureItem.promo_price
              ? "$" + featureItem.promo_price
              : "$" + featureItem.price}
          </ProductPromoPrice>
          {featureItem.promo_price ? (
            <ProductPrice>${featureItem.price} </ProductPrice>
          ) : (
            ""
          )}
        </ProductPrices>
      </Feature>
      <ProductCounter>
        <ProductStorage>庫存：{featureItem.stock}</ProductStorage>
        <CounterArea>
          <MinusCircleOutlined
            style={{
              width: "32px",
              height: "32px",
              cursor: "pointer",
              color: THEME.colors.mainPrimary
            }}
            onClick={onMinus}
          />
          <span>{featureItem.count}</span>
          <PlusCircleOutlined
            style={{
              width: "32px",
              height: "32px",
              cursor: "pointer",
              color: THEME.colors.mainPrimary
            }}
            onClick={onPlus}
          />
        </CounterArea>
      </ProductCounter>
    </FeatureList>
  );
};

export default FeatureItem;

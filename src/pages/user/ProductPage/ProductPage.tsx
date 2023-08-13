import { useState, useEffect, useCallback } from "react";
import { useHistory, useParams } from "react-router-dom";
import { getProduct, getCategory } from "@/webAPI";
import { useLoadingContext } from "@/context";
import Loading from "@/components/Loading";
import {
  Content,
  CategoryBar,
  Caption1,
  Caption2,
  Product,
  ProductImage,
  ProductDesc,
  ProductHead,
  ProductTitle,
  ProductName,
  AddToLove,
  ProductContent,
  ErrorHint,
  AddToCart,
  Button
} from "./style";
import { Category, ProductWithFeature } from "@/webAPI/product/interface";
import type { Feature as FeatureType } from "./interface";
import FeatureItem from "./FeatureItem";
import { CartUtils, useCart } from "@/hook/useCart";

const CART_PAGE_URL = "/cart";

export default function ProductPage() {
  const { isLoading, setIsLoading } = useLoadingContext();
  const history = useHistory();
  const { id } = useParams<{ id: string }>();
  const [categories, setCategories] = useState<Category[]>();
  const [product, setProduct] =
    useState<Omit<ProductWithFeature, "Features">>();
  const [feature, setFeature] = useState<FeatureType[]>();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const { updateCartItem } = useCart();

  const fetchProduct = useCallback(async () => {
    setIsLoading(true);
    const categoryRes = await getCategory();
    setCategories(categoryRes?.data);

    const productRes = await getProduct(+id);
    if (!productRes?.data) return;
    const { Features, ...productDetail } = productRes.data;
    setProduct({ ...productDetail });
    setFeature(
      Features.map((feature) => ({
        ...feature,
        count: 0
      }))
    );
    setIsLoading(false);
  }, []);

  useEffect(() => {
    fetchProduct();
  }, [fetchProduct]);

  const handleMinus = (id: number) => {
    if (!feature) return;
    const itemIndex = feature.findIndex((item) => item.id === id) ?? -1;
    if (itemIndex >= 0 && feature[itemIndex].count > 0) {
      const newFeature = feature.concat();
      newFeature[itemIndex] = {
        ...newFeature[itemIndex],
        count: newFeature[itemIndex].count - 1
      };
      setFeature(newFeature);
    }
  };

  const handlePlus = (id: number) => {
    if (!feature) return;
    const itemIndex = feature.findIndex((item) => item.id === id) ?? -1;
    if (itemIndex >= 0 && feature[itemIndex].count < feature[itemIndex].stock) {
      const newFeature = feature.concat();
      newFeature[itemIndex] = {
        ...newFeature[itemIndex],
        count: newFeature[itemIndex].count + 1
      };
      setFeature(newFeature);
    }
  };

  const handleAddToCart = () => {
    if (!feature || !product) return;

    let addFeatureList = feature.filter((item) => item.count !== 0);
    if (addFeatureList.length === 0) {
      setErrorMessage("沒有可新增項目");
      return;
    }

    for (let newItem of addFeatureList) {
      const item = {
        productId: product.id,
        productName: product.name,
        image: product.image,
        featureId: newItem.id,
        feature: newItem.name,
        price: newItem.promo_price ?? newItem.price,
        stock: newItem.stock,
        count: newItem.count,
        subTotal: newItem.promo_price
          ? newItem.count * newItem.promo_price
          : newItem.count * newItem.price
      };
      try {
        updateCartItem({
          item,
          validator: ({ item, cart }) => {
            if (cart && CartUtils.isItemExist({ cart, item })) {
              if (
                window.confirm(
                  "您的購物車已經有相同物品囉！要前往購物車頁面修改嗎？"
                )
              ) {
                history.push(CART_PAGE_URL);
              }
              throw new Error(`${item.productName}_${item.feature} duplicate`);
            }
          }
        });
      } catch {
        return;
      }
    }

    history.push(CART_PAGE_URL);
  };

  return (
    <Content>
      {isLoading ? (
        <Loading />
      ) : (
        <>
          {product && (
            <CategoryBar>
              <Caption1>
                {categories &&
                  categories.length > 0 &&
                  categories.filter(
                    (category) => category.id === product.CategoryId
                  )[0].name}
              </Caption1>
              <Caption2>{product.name}</Caption2>
            </CategoryBar>
          )}
          {product && (
            <Product>
              <ProductImage>
                <img src={product.image} alt='product'></img>
              </ProductImage>
              <ProductDesc>
                <ProductHead>
                  <ProductTitle>
                    <ProductName>{product.name}</ProductName>
                    <AddToLove>
                      <span>❤</span>
                    </AddToLove>
                  </ProductTitle>
                  <ProductContent>{product.info}</ProductContent>
                </ProductHead>
                {feature?.map((featureItem) => (
                  <FeatureItem
                    key={featureItem.id}
                    featureItem={featureItem}
                    onMinus={() => handleMinus(featureItem.id)}
                    onPlus={() => handlePlus(featureItem.id)}
                  />
                ))}
                {errorMessage && <ErrorHint>{errorMessage}</ErrorHint>}
                <AddToCart>
                  <Button onClick={handleAddToCart}>加入購物車</Button>
                </AddToCart>
              </ProductDesc>
            </Product>
          )}
        </>
      )}
    </Content>
  );
}

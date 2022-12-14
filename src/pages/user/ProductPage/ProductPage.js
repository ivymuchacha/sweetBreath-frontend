import React, { useState, useEffect, useContext } from "react";
import { useHistory, useParams } from "react-router-dom";
import { PlusCircleOutlined, MinusCircleOutlined } from "@ant-design/icons";
import { getProduct, getCategory } from "../../../webAPI/productAPI";
import { LoadingContext } from "../../../contexts";
import { theme } from "../../../constants/theme";
import Loading from "../../../components/Loading";
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
  FeatureList,
  Feature,
  FeatureName,
  ProductPrices,
  ProductPromoPrice,
  ProductPrice,
  ProductCounter,
  ProductStorage,
  CounterArea,
  Error,
  AddToCart,
  Button,
} from "./style";

export default function ProductPage() {
  const { isLoading, setIsLoading } = useContext(LoadingContext);
  const history = useHistory();
  const { id } = useParams();
  const [categories, setCategories] = useState([]);
  const [product, setProduct] = useState();
  const [cart, setCart] = useState([]);
  const [feature, setFeature] = useState([]);
  const [errorMessage, setErrorMessage] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    getCategory().then((ans) => {
      setCategories(ans.data);
    });
    getProduct(id).then((res) => {
      const features = res.data.Features.map((feature) => {
        feature.number = 1;
        return feature;
      });
      const { CategoryId, id, image, info, name } = res.data;
      setProduct({ CategoryId, id, image, info, name });
      setFeature(features);
      setIsLoading(false);
    });
  }, [setIsLoading]);

  useEffect(() => {
    let data = JSON.parse(localStorage.getItem("cart")) || [];
    if (data) {
      setCart(data);
    }
  }, []);

  const handleClickDown = (id) => {
    const newFeature = feature.map((item) => {
      let newItem = item;
      if (newItem.id === id) {
        if (newItem.number !== 0) {
          newItem.number = newItem.number - 1;
        }
      }
      return newItem;
    });
    setFeature(newFeature);
  };

  const handleClickUp = (id, stock) => {
    const newFeature = feature.map((item) => {
      let newItem = item;
      if (newItem.id === id) {
        if (newItem.number < stock) {
          newItem.number = newItem.number + 1;
        }
      }
      return newItem;
    });
    setFeature(newFeature);
  };

  const handleAddToCart = () => {
    let addFeatureList = feature.filter((item) => item.number !== 0);

    // ????????????????????????????????? 0
    if (addFeatureList.length === 0) return setErrorMessage(true);

    addFeatureList.map((newItem) => {
      // ???????????????????????????
      let sameItem = cart.find((cartItem) => {
        return (
          cartItem.id === newItem.ProductId && cartItem.feature === newItem.name
        );
      });

      if (sameItem) {
        // true: ????????????????????? CartPage
        if (
          window.confirm("??????????????????????????????????????????????????????????????????????????????")
        )
          history.push("/cart");
      } else {
        // false: ????????????
        setCart(
          cart.push({
            id: product.id,
            productName: product.name,
            feature: newItem.name,
            count: newItem.number,
            price: newItem.promo_price ? newItem.promo_price : newItem.price,
            subTotal: newItem.promo_price
              ? newItem.number * newItem.promo_price
              : newItem.number * newItem.price,
            image: product.image,
            stock: newItem.stock,
          })
        );
        localStorage.setItem("cart", JSON.stringify(cart));
        history.push("/cart");
      }
    });
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
                {categories.length > 0 &&
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
                <img src={product.image} alt="product"></img>
              </ProductImage>
              <ProductDesc>
                <ProductHead>
                  <ProductTitle>
                    <ProductName>{product.name}</ProductName>
                    <AddToLove>
                      <span>???</span>
                    </AddToLove>
                  </ProductTitle>
                  <ProductContent>{product.info}</ProductContent>
                </ProductHead>
                {feature.map((featureItem) => (
                  <FeatureList key={featureItem.id}>
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
                      <ProductStorage>?????????{featureItem.stock}</ProductStorage>
                      <CounterArea>
                        <MinusCircleOutlined
                          style={{
                            width: "32px",
                            height: "32px",
                            cursor: "pointer",
                            color: theme.colors.mainPrimary,
                          }}
                          onClick={() => {
                            handleClickDown(featureItem.id);
                          }}
                        />
                        <span>{featureItem.number}</span>
                        <PlusCircleOutlined
                          style={{
                            width: "32px",
                            height: "32px",
                            cursor: "pointer",
                            color: theme.colors.mainPrimary,
                          }}
                          onClick={() => {
                            handleClickUp(featureItem.id, featureItem.stock);
                          }}
                        />
                      </CounterArea>
                    </ProductCounter>
                  </FeatureList>
                ))}
                <Error errorMessage={errorMessage}>???????????????</Error>
                <AddToCart>
                  <Button onClick={handleAddToCart}>???????????????</Button>
                </AddToCart>
              </ProductDesc>
            </Product>
          )}
        </>
      )}
    </Content>
  );
}

import { useState, useEffect, Suspense } from "react";
import {
  Product,
  ProductLink,
  ProductImage,
  Pointer,
  ProductName,
  RecommendContent,
  BlankCard
} from "./style";
import { useLoadingContext } from "@/context";
import { getCategoryAndLaunchedProducts } from "@/webAPI/product";
import type { Product as ProductType } from "@/webAPI/product/interface";
import { ScaleLoader } from "react-spinners";
import Loading from "@/components/Loading";

interface RecommendItemProps {
  itemLink: string;
  itemImg: string;
  itemName: string;
}

function RecommendItem({ itemLink, itemImg, itemName }: RecommendItemProps) {
  return (
    <Product>
      <Suspense fallback={<ScaleLoader />}>
        <ProductLink to={itemLink}>
          <ProductImage src={itemImg}></ProductImage>
          <Pointer>
            <span>➜</span>
          </Pointer>
          <ProductName>{itemName}</ProductName>
        </ProductLink>
      </Suspense>
    </Product>
  );
}

export default function ProductRecommend() {
  const { isLoading, setIsLoading } = useLoadingContext();
  const [products, setProducts] = useState<ProductType[]>();

  const fetchData = async () => {
    setIsLoading(true);
    const res = await getCategoryAndLaunchedProducts();
    const mostPopularCategory = res?.[0];

    setProducts(mostPopularCategory?.Products);
    setIsLoading(false);
  };
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <RecommendContent>
      {isLoading ? (
        <Loading />
      ) : (
        <>
          {products &&
            products.map((product) => (
              <RecommendItem
                itemLink={`/product/${product.id}`}
                itemImg={product.image}
                itemName={product.name}
                key={product.id}
              />
            ))}
          <BlankCard />
          <BlankCard />
        </>
      )}
    </RecommendContent>
  );
}

import { useState, useEffect, useCallback } from "react";
import { scrollToAnchor } from "@/components/Anchor";
import { useLoadingContext } from "@/context";
import Loading from "@/components/Loading";
import {
  Content,
  H1,
  Category,
  CategoryName,
  CategorySection,
  CategoryTitle,
  ProductList,
  BlankCard
} from "./style";
import Products from "./Products";
import { getCategoryAndLaunchedProducts } from "@/webAPI";
import type { CategoryWithProduct as CategoryItem } from "@/webAPI/product/interface";

export default function ProductListPage() {
  const { isLoading, setIsLoading } = useLoadingContext();
  const [categories, setCategories] = useState<CategoryItem[]>();

  const fetchCategories = useCallback(async () => {
    setIsLoading(true);
    const res = await getCategoryAndLaunchedProducts();
    setCategories(res);
    setIsLoading(false);
  }, []);

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  return (
    <Content>
      <H1>MENU</H1>
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <Category>
            {categories?.map((category) => (
              <CategoryName
                key={category.id}
                onClick={() => scrollToAnchor(String(category.id))}>
                {category.name}
              </CategoryName>
            ))}
          </Category>

          {categories?.map((category) => (
            <CategorySection key={category.id}>
              <CategoryTitle id={String(category.id)}>
                {category.name}
              </CategoryTitle>
              <ProductList>
                <Products products={category.Products} />
                <BlankCard />
                <BlankCard />
              </ProductList>
            </CategorySection>
          ))}
        </>
      )}
    </Content>
  );
}

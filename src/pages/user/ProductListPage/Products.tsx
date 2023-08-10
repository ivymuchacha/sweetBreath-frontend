import {
  Product,
  ProductLink,
  ProductImage,
  Pointer,
  ProductName,
} from "./style";
import PropTypes from "prop-types";
import React from "react";

export default function Products({ products }) {
  return products.map((product) => (
    <Product key={product.id}>
      <ProductLink to={"/product/" + product.id}>
        <ProductImage
          style={{ backgroundImage: `url(${product.image})` }}
        ></ProductImage>
        <Pointer>
          <span>➜</span>
        </Pointer>
        <ProductName>{product.name}</ProductName>
      </ProductLink>
    </Product>
  ));
}

Products.propTypes = {
  products: PropTypes.arrayOf(PropTypes.object),
};

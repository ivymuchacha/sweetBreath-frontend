import { ProductInfo, AdminName, AdminInput } from "./style";
import PropTypes from "prop-types";
import React from "react";

export default function Question({ name, title, value, handleChange }) {
  return (
    <ProductInfo>
      <AdminName>{title}</AdminName>
      <AdminInput
        placeholder={title}
        name={name}
        value={value}
        onChange={handleChange}
      ></AdminInput>
    </ProductInfo>
  );
}

Question.propTypes = {
  name: PropTypes.string,
  title: PropTypes.string,
  value: PropTypes.string,
  handleChange: PropTypes.func,
};

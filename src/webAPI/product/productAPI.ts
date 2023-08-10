import axios from "axios";
import { getAuthToken } from "@/utils/authToken";
import { BASE_API_URL } from "../constants";
import { Category, CategoryWithProduct, ProductWithFeature } from "./interface";
import { APIRes } from "../interface";

///// 產品分類管理

// 撈取未刪除分類
// export const getCategory = () => {
//   return fetch(`${BASE_API_URL}/category`).then((res) => res.json());
// };

export const getCategory = async () => {
  try {
    const res = await axios.get<{ data: Category[]; ok: 1 | 0 }>(
      `${BASE_API_URL}/category`
    );
    return res.data;
  } catch (e: unknown) {
    console.log(e);
  }
};

// 以分類撈取所有產品 API
export const getCategoryAndProducts = () => {
  return fetch(`${BASE_API_URL}/category/products`).then((res) => res.json());
};

export const getCategoryAndLaunchedProducts = async () => {
  try {
    const res = await axios.get<APIRes<CategoryWithProduct[]>>(
      `${BASE_API_URL}/category/product`
    );
    return res.data.data;
  } catch (e: unknown) {
    console.log(e);
  }
};

// 撈取單一商品規格 API
export const getProduct = async (productId: number) => {
  try {
    const res = await axios.get<{ data: ProductWithFeature; ok: 1 | 0 }>(
      `${BASE_API_URL}/product/${productId}`
    );
    return res.data;
  } catch (e: unknown) {
    console.log(e);
  }
};

// 新增商品
export const addProduct = (
  name,
  image,
  info,
  CategoryId,
  feature,
  price,
  promo_price,
  stock
) => {
  const token = getAuthToken();
  return fetch(`${BASE_API_URL}/product`, {
    method: "POST",
    headers: {
      authorization: `Bearer ${token}`,
      "content-type": "application/json"
    },
    body: JSON.stringify({
      name,
      image,
      info,
      CategoryId,
      feature_name: feature,
      price,
      promo_price,
      stock
    })
  }).then((res) => res.json());
};

// 編輯商品
export const editProduct = (id, name, image, status, info, categoryId) => {
  const token = getAuthToken();
  return fetch(`${BASE_API_URL}/product/${id}`, {
    method: "PUT",
    headers: {
      authorization: `Bearer ${token}`,
      "content-type": "application/json"
    },
    body: JSON.stringify({
      name,
      image,
      status,
      info,
      CategoryId: categoryId
    })
  }).then((res) => res.json());
};

// 刪除商品
export const deleteProduct = (productId) => {
  const token = getAuthToken();
  return fetch(`${BASE_API_URL}/product/${productId}`, {
    method: "DELETE",
    headers: {
      authorization: `Bearer ${token}`,
      "content-type": "application/json"
    }
  }).then((res) => res.json());
};

// 新增規格
export const addFeature = (id, name, price, promo_price, stock) => {
  const token = getAuthToken();
  return fetch(`${BASE_API_URL}/feature/${id}`, {
    method: "POST",
    headers: {
      authorization: `Bearer ${token}`,
      "content-type": "application/json"
    },
    body: JSON.stringify({
      name,
      price,
      promo_price,
      stock
    })
  }).then((res) => res.json());
};

// 編輯規格
export const editFeature = (id, name, price, promo_price, stock) => {
  const token = getAuthToken();
  return fetch(`${BASE_API_URL}/feature/${id}`, {
    method: "PUT",
    headers: {
      authorization: `Bearer ${token}`,
      "content-type": "application/json"
    },
    body: JSON.stringify({
      name,
      price,
      promo_price,
      stock
    })
  }).then((res) => res.json());
};

// 刪除規格
export const deleteFeature = (id) => {
  const token = getAuthToken();
  return fetch(`${BASE_API_URL}/feature/${id}`, {
    method: "DELETE",
    headers: {
      authorization: `Bearer ${token}`,
      "content-type": "application/json"
    }
  }).then((res) => res.json());
};

///// 產品分類管理

// 新增分類 API
export const addCategory = (addInputValue) => {
  const token = getAuthToken();
  return fetch(`${BASE_API_URL}/category`, {
    method: "POST",
    headers: {
      authorization: `Bearer ${token}`,
      "content-type": "application/json"
    },
    body: JSON.stringify({
      name: addInputValue
    })
  }).then((res) => res.json());
};

// 編輯分類 API
export const editCategory = (id, name) => {
  const token = getAuthToken();
  return fetch(`${BASE_API_URL}/category/${id}`, {
    method: "PUT",
    headers: {
      authorization: `Bearer ${token}`,
      "content-type": "application/json"
    },
    body: JSON.stringify({
      name: `${name}`
    })
  }).then((res) => res.json());
};

// 刪除分類 API
export const deleteCategory = (id) => {
  const token = getAuthToken();
  return fetch(`${BASE_API_URL}/category/${id}`, {
    method: "DELETE",
    headers: {
      authorization: `Bearer ${token}`,
      "content-type": "application/json"
    }
  }).then((res) => res.json());
};

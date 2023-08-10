import { getAuthToken } from "@/utils/authToken";
import { BASE_API_URL } from "../constants";
import axios from "axios";

// 建立訂單
export const createOrder = (orderDetail) => {
  const token = getAuthToken();
  return fetch(`${BASE_API_URL}/orders`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      authorization: `Bearer ${token}`
    },
    body: JSON.stringify(orderDetail)
  })
    .then((res) => res.json())
    .then((data) => data);
};

// 取得特定買家訂單
export const getUserOrders = async (id: number) => {
  const token = getAuthToken();
  try {
    const res = await axios.get<{ ok: 0 | 1; data?: [] }>(
      `${BASE_API_URL}/order/${id}`,
      {
        headers: { authorization: `Bearer ${token}` }
      }
    );
    return res.data;
  } catch (error: unknown) {
    throw error;
  }
};

// 管理員撈取所有訂單
export const getOrders = () => {
  const token = getAuthToken();
  return fetch(`${BASE_API_URL}/orders`, {
    headers: {
      authorization: `Bearer ${token}`
    }
  }).then((res) => res.json());
};

// 編輯訂單
export const editOrder = (editData) => {
  const token = getAuthToken();
  return fetch(`${BASE_API_URL}/order/${editData.orderNumber}`, {
    method: "PUT",
    headers: {
      authorization: `Bearer ${token}`,
      "content-type": "application/json"
    },
    body: JSON.stringify({
      is_paid: editData.isPaid,
      is_sent: editData.isSent,
      is_done: editData.isDone,
      is_cancel: editData.isCancel,
      status: "is_done"
    })
  }).then((res) => res.json());
};

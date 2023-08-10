import { getAuthToken } from "@/utils/authToken";
import { BASE_API_URL } from "../constants";
import axios, { AxiosError } from "axios";
import { User } from "./interface";
import { APIRes } from "../interface";

interface RegisterProps extends Pick<User, "username" | "email"> {
  fullName: User["fullname"];
  password: string;
}

export const register = async ({
  fullName,
  username,
  email,
  password
}: RegisterProps) => {
  try {
    const res = await axios.post(
      `${BASE_API_URL}/register`,
      {
        fullname: fullName,
        username,
        email,
        password
      },
      {
        headers: { "content-type": "application/json" }
      }
    );
    return res.data;
  } catch (error: unknown) {
    console.warn(error);
  }
};

interface LoginProps {
  username: string;
  password: string;
}
export const login = async ({ username, password }: LoginProps) => {
  try {
    const data = {
      username,
      password
    };
    const res = await axios.post<{
      ok: 0 | 1;
      message?: string;
      token?: string;
    }>(`${BASE_API_URL}/login`, data, {
      headers: { "content-type": "application/json" }
    });
    return res.data?.token;
  } catch (error: unknown) {
    throw new Error(
      (
        error as AxiosError<{
          status: 0;
          message: string;
        }>
      ).response?.data.message
    );
  }
};

export const getMe = async (authToken: string) => {
  try {
    const res = await axios.get(`${BASE_API_URL}/me`, {
      headers: { authorization: `Bearer ${authToken}` }
    });
    return res.data;
  } catch (error: unknown) {
    throw error;
  }
};

export const getUser = async () => {
  const authToken = getAuthToken();
  try {
    const res = await axios.get<{ ok: 0 | 1; data?: User & { id: number } }>(
      `${BASE_API_URL}/user`,
      {
        headers: { authorization: `Bearer ${authToken}` }
      }
    );
    return res.data;
  } catch (error: unknown) {
    throw error;
  }
};

export const getAllUser = () => {
  const token = getAuthToken();
  return fetch(`${BASE_API_URL}/users`, {
    method: "GET",
    headers: {
      authorization: `Bearer ${token}`
    }
  }).then((res) => res.json());
};

interface EditUserProps
  extends Pick<User, "fullname" | "email" | "birthday" | "address"> {}

export const editUser = async ({
  fullname,
  email,
  birthday,
  address
}: EditUserProps) => {
  const authToken = getAuthToken();
  try {
    const res = await axios.put<{ ok: 0 | 1; data?: User & { id: number } }>(
      `${BASE_API_URL}/user`,
      {
        fullname,
        email,
        birthday,
        address
      },
      {
        headers: {
          authorization: `Bearer ${authToken}`,
          "content-type": "application/json"
        }
      }
    );
    return res.data;
  } catch (error: unknown) {
    throw error;
  }
};

export const editUserStatus = (
  id: number,
  is_admin: boolean,
  status: string
) => {
  const token = getAuthToken();
  fetch(`${BASE_API_URL}/users/${id}`, {
    method: "PUT",
    headers: {
      authorization: `Bearer ${token}`,
      "content-type": "application/json"
    },
    body: JSON.stringify({
      is_admin,
      status
    })
  }).then((res) => res.json());
};

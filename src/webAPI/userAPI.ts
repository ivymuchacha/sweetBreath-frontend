import { getAuthToken } from "@utils/authToken";
import { BASE_API_URL } from "./constants";

export const register = (fullName, username, email, password) => {
  return fetch(`${BASE_API_URL}/register`, {
    method: "POST",
    headers: {
      "content-type": "application/json"
    },
    body: JSON.stringify({
      fullName,
      username,
      email,
      password
    })
  }).then((res) => res.json());
};

export const login = (username, password) => {
  return fetch(`${BASE_API_URL}/login`, {
    method: "POST",
    headers: {
      "content-type": "application/json"
    },
    body: JSON.stringify({
      username,
      password
    })
  }).then((res) => res.json());
};

export const getMe = () => {
  const token = getAuthToken();
  return fetch(`${BASE_API_URL}/me`, {
    headers: {
      authorization: `Bearer ${token}`
    }
  })
    .then((res) => res.json())
    .then((data) => {
      // console.log(data);
      return data;
    });
};

export const getUser = () => {
  const token = getAuthToken();
  return fetch(`${BASE_API_URL}/user`, {
    method: "GET",
    headers: {
      authorization: `Bearer ${token}`
    }
  })
    .then((res) => res.json())
    .then((data) => {
      // console.log(data);
      return data;
    });
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

export const editUser = (fullname, email, birthday, address) => {
  const token = getAuthToken();
  return fetch(`${BASE_API_URL}/user`, {
    method: "PUT",
    headers: {
      authorization: `Bearer ${token}`,
      "content-type": "application/json"
    },
    body: JSON.stringify({
      fullname: `${fullname}`,
      email: `${email}`,
      birthday: `${birthday}`,
      address: `${address}`
    })
  })
    .then((res) => res.json())
    .then((data) => {
      return data;
    });
};

export const editUserStatus = (id, is_admin, status) => {
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

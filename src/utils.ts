import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const TOKEN_NAME = "token";

export const setAuthToken = (token: string) => {
  localStorage.setItem(TOKEN_NAME, token);
};

export const getAuthToken = () => {
  return localStorage.getItem(TOKEN_NAME);
};

export const useScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
};

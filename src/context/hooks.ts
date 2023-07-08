import { useContext } from "react";
import { AuthContext, LoadingContext } from "./contexts";
import { AuthContextType, LoadingContextType } from "./interfaces";

export const useAuthContext = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("AuthContext in not exist");
  }
  return context;
};

export const useLoadingContext = (): LoadingContextType => {
  const context = useContext(LoadingContext);
  if (!context) {
    throw new Error("LoadingContext in not exist");
  }
  return context;
};

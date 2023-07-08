import { createContext } from "react";
import { AuthContextType, LoadingContextType } from "./interfaces";

export const AuthContext = createContext<AuthContextType | null>(null);

export const LoadingContext = createContext<LoadingContextType | null>(null);

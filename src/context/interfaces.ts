export type User = {
  username: string;
  password: string;
  fullname: string;
  email: string;
  address: string;
  birthday: string;
  is_admin: boolean;
  status: boolean;
  socialmedia_id: string;
};

export interface AuthContextType {
  user: User | null;
  setUser: (user: AuthContextType["user"]) => void;
}

export interface LoadingContextType {
  isLoading: boolean;
  isLoadingGetMe: boolean;
  setIsLoading: (isLoading: LoadingContextType["isLoading"]) => void;
}

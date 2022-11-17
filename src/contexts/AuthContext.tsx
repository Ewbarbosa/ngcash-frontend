import { createContext, ReactNode, useState } from 'react'

type AuthContextData = {
  user: UserProps;
  isAuthenticated: boolean;
  signIn: (credentials: SignInProps) => Promise<void>;
}

type UserProps = {
  id: number;
  username: string;
}

type SignInProps = {
  username: string;
  password: string;
}

type AuthProviderProps = {
  children: ReactNode;
}

export const AuthContext = createContext({} as AuthContextData)

export function AuthProvider({ children }: AuthProviderProps) {

  const [user, setUser] = useState<UserProps>();
  const isAuthenticated = !!user;

  async function signIn() {
    alert('Clicou');
  }
  return (
    <AuthContext.Provider value={{user, isAuthenticated, signIn}}>
      {children}
    </AuthContext.Provider>
  )
}
import { createContext, ReactNode, useState, useEffect } from 'react'
import { destroyCookie, setCookie, parseCookies } from 'nookies'
import Router from 'next/router'

import { api } from '../services/apiClient'
import { toast } from 'react-toastify'

type UserProps = {
  id: number;
  username: string;
}

type AuthContextData = {
  user: UserProps;
  isAuthenticated: boolean;
  signIn: (credentials: SignInProps) => Promise<void>;
  signOut: () => void;
  signUp: (credentials: SignInProps) => Promise<void>
}

type SignInProps = {
  username: string;
  password: string;
}

type AuthProviderProps = {
  children: ReactNode;
}

export const AuthContext = createContext({} as AuthContextData)

export function signOut() {
  try {
    destroyCookie(undefined, '@ngcash.token');
    Router.push('/')
  } catch {
    console.log('Erro ao deslogar');
  }
}

export function AuthProvider({ children }: AuthProviderProps) {

  const [user, setUser] = useState<UserProps>();
  const isAuthenticated = !!user;

  useEffect(() => {
    const { '@ngcash.token': token } = parseCookies();

    if (token) {
      api.get('/me').then(response => {
        const { id, username } = response.data;

        setUser({
          id,
          username
        })
      })
        .catch(() => {
          signOut();
        })
    }
  }, [])

  async function signUp({ username, password }: SignInProps) {
    try {
      const response = await api.post('/user', {
        username,
        password
      })

      toast.success(response.status)
      alert(response.status)

      Router.push('/');

    } catch (err) {
      toast.error('Erro ao criar conta' + err)
      alert(err)
    }
  }

  async function signIn({ username, password }: SignInProps) {
    try {
      const response = await api.post('/session', {
        username,
        password
      })

      //console.log(response.data)

      const { id, token } = response.data;

      setCookie(undefined, '@ngcash.token', token, {
        maxAge: 60 * 60 * 24, // vai expirar em 1 dia
        path: "/" // caminhos com acesso ao cookie
      })

      setUser({
        id,
        username
      })

      api.defaults.headers['Authorization'] = `Bearer ${token}`

      // redirecionar para a pagina principal
      Router.push('/dashboard')

    } catch {
      toast.warning('Usuario/Senha invalido')
      console.log('erro ao acessar')
    }
  }
  return (
    <AuthContext.Provider value={{ user, isAuthenticated, signIn, signOut, signUp }}>
      {children}
    </AuthContext.Provider>
  )
}
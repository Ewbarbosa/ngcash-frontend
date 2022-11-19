import axios, { AxiosError } from 'axios'
import { parseCookies } from 'nookies'
import { AuthTokenError } from './errors/AuthTokenError';
import { signOut } from '../contexts/AuthContext'
export function setupApiClient(ctx = undefined) {
    let cookies = parseCookies(ctx);

    const api = axios.create({
        baseURL: 'http://192.168.15.10:3333',
        headers: {
            Authorization: `Bearer ${cookies['@ngcash.token']}`
        }
    })

    api.interceptors.response.use(response => {
        return response;
    }, (err: AxiosError) => {
        if (err.response.status === 401) {
            // deslogar se não for autorizado
            if (typeof window !== undefined) {
                signOut();
            } else {
                return Promise.reject(new AuthTokenError())
            }
        }

        return Promise.reject(err);
    })

    return api;
}
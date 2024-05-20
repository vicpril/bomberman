import axios, { InternalAxiosRequestConfig } from 'axios'
import { USER_LOCALSTORAGE_KEY } from '@/shared/const/localStorage'
// eslint-disable-next-line fsd-project/layer-imports
import { LoginResponseData } from '@/entities/User'

type OriginRequest = InternalAxiosRequestConfig<any> & {
    _isRetry?: boolean
}

export const $api = axios.create({
    withCredentials: true,
    baseURL: __API__,
})

$api.interceptors.request.use((config) => {
    const token = localStorage.getItem(USER_LOCALSTORAGE_KEY || '')
    if (token) {
        config.headers.Authorization = `Bearer ${token}`
    }
    return config
})

$api.interceptors.response.use(
    (config) => config,
    async (error) => {
        const originalRequest = error.config as OriginRequest

        if (error.response.status === 401 && error.config && !error.config._isRetry) {
            originalRequest._isRetry = true
            try {
                const response = await axios.get<LoginResponseData>(`${__API__}/refresh`, {
                    withCredentials: true,
                })
                localStorage.setItem(USER_LOCALSTORAGE_KEY, response.data.accessToken)
                return $api.request(originalRequest)
            } catch (error) {
                console.log('🚀 получена 401')
            }
        }
        throw error
    },
)

export const $apiJson = axios.create({
    baseURL: __API_JSON__,
    headers: {
        Authorization: JSON.stringify(localStorage.getItem(USER_LOCALSTORAGE_KEY) || ''),
    },
})

import axios from 'axios'
import { USER_LOCALSTORAGE_KEY } from '@/shared/const/localStorage'

export const $api = axios.create({
    baseURL: __API__,
    headers: {
        Authorization: JSON.stringify(localStorage.getItem(USER_LOCALSTORAGE_KEY) || ''),
    },
})

export const $apiJson = axios.create({
    baseURL: __API_JSON__,
    headers: {
        Authorization: JSON.stringify(localStorage.getItem(USER_LOCALSTORAGE_KEY) || ''),
    },
})

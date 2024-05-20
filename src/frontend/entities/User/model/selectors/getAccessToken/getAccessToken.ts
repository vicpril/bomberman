import { USER_LOCALSTORAGE_KEY } from '@/shared/const/localStorage'

export const getAccessToken = () => localStorage.getItem(USER_LOCALSTORAGE_KEY) || ''

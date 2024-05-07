import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { USER_LOCALSTORAGE_KEY } from '../const/localStorage'

// Define a service using a base URL and expected endpoints
export const rtkApiJson = createApi({
    reducerPath: 'rtkApi',
    baseQuery: fetchBaseQuery({
        baseUrl: __API_JSON__,
        prepareHeaders(headers) {
            const token = localStorage.getItem(USER_LOCALSTORAGE_KEY)
            if (token) {
                headers.set('Authorization', token)
            }
            return headers
        },
    }),
    endpoints: () => ({}),
})

import { ApiErrorCode } from '../const/errors'

export interface ResponseErrorData {
    message: string
    code: ApiErrorCode
    errors: ApiErrorCode[] | undefined
}

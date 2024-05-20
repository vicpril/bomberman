import { API_ERROR_MESSAGE, ApiErrorCode } from '@api/config/ApiErrorCodes'
import { ValidationError } from 'express-validator'

export const bodyErrorsFormatter = ({ msg }: ValidationError) => msg

export class ApiError extends Error {
    public status: number

    public code: string

    public errors: ApiError[]

    constructor(
        status: number,
        code?: ApiErrorCode,
        message: string = code ? API_ERROR_MESSAGE[code] : '',
        errors: ApiError[] = [],
    ) {
        super(message)
        this.status = status
        this.code = code ?? API_ERROR_MESSAGE.SERVER_ERROR
        this.errors = errors
    }

    public getJson() {
        return {
            code: this.code,
            message: this.message,
            errors: this.errors.length ? this.errors : undefined,
        }
    }

    public static UnauthorizedError() {
        return new ApiError(401, ApiErrorCode.NO_AUTH)
    }

    // public static BadRequest(errors: unknown[] = [], message = API_ERROR_CODES.BAD_REQUEST) {
    //     return new ApiError(400, 'BAD_REQUEST', message, errors)
    // }
    public static BadRequest(code: ApiErrorCode, message = API_ERROR_MESSAGE[code]) {
        return new ApiError(400, code, message)
    }

    public static BadRequestWithValidator(code: ApiErrorCode, errors: ValidationError[]) {
        return new ApiError(400, code, API_ERROR_MESSAGE[code], errors.map(bodyErrorsFormatter))
    }
}

export enum ApiErrorCode {
    SERVER_ERROR = 'SERVER_ERROR',
    NO_AUTH = 'NO_AUTH',
    BAD_REQUEST = 'BAD_REQUEST',
    REGISTRATION_USERNAME_REQUIRED = 'REGISTRATION_USERNAME_REQUIRED',
    REGISTRATION_USERNAME_EXISTS = 'REGISTRATION_USERNAME_EXISTS',
    REGISTRATION_PASSWORD_REQUIRED = 'REGISTRATION_PASSWORD_REQUIRED',
    PROFILE_EDIT_INCORRECT_USER_DATA = 'PROFILE_EDIT_INCORRECT_USER_DATA',
    PROFILE_EDIT_INCORRECT_USER_AGE = 'PROFILE_EDIT_INCORRECT_USER_AGE',
    PROFILE_EDIT_INCORRECT_USER_COUNTRY = 'PROFILE_EDIT_INCORRECT_USER_COUNTRY',
    PROFILE_EDIT_INCORRECT_FIRATNAME = 'PROFILE_EDIT_INCORRECT_FIRATNAME',
    PROFILE_EDIT_INCORRECT_LASTNAME = 'PROFILE_EDIT_INCORRECT_LASTNAME',
    PROFILE_EDIT_INCORRECT_USERNAME = 'PROFILE_EDIT_INCORRECT_USERNAME',
    PROFILE_EDIT_NO_DATA = 'PROFILE_EDIT_NO_DATA',
    LOGIN_WRONG_CREDENTIALS = 'LOGIN_WRONG_CREDENTIALS',
    NOT_FOUND = 'NOT_FOUND',
    USER_NOT_FOUND = 'USER_NOT_FOUND',
}

export const API_ERROR_MESSAGE: Record<ApiErrorCode, string> = {
    SERVER_ERROR: 'Непредвиденная ошибка на сервере',
    NO_AUTH: 'Пользователь не авторизован',
    BAD_REQUEST: 'Ошибки в заполнении формы',
    REGISTRATION_USERNAME_REQUIRED: 'Имя пользователя обязательное поле',
    REGISTRATION_USERNAME_EXISTS: 'Пользователь с таким именем уже существует',
    REGISTRATION_PASSWORD_REQUIRED: 'Пароль обязательное поле',
    PROFILE_EDIT_INCORRECT_USER_DATA: 'Имя и Фамилия обязательны',
    PROFILE_EDIT_INCORRECT_USER_AGE: 'Некорректный возраст',
    PROFILE_EDIT_INCORRECT_USER_COUNTRY: 'Некорректный регион',
    PROFILE_EDIT_INCORRECT_USERNAME: 'Имя пользователя обязательное поле',
    PROFILE_EDIT_NO_DATA: 'Данные не указаны',
    LOGIN_WRONG_CREDENTIALS: 'Не верный игрок или пароль',
    NOT_FOUND: 'Данные не найдены',
    USER_NOT_FOUND: 'Игрок не найден',
    PROFILE_EDIT_INCORRECT_FIRATNAME: 'Имя обязательное поле',
    PROFILE_EDIT_INCORRECT_LASTNAME: 'Фамилия  обязательное поле',
}

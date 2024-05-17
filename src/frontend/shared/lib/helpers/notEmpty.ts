export const notEmpty = <T>(value: T | boolean | null | undefined): value is T => Boolean(value)

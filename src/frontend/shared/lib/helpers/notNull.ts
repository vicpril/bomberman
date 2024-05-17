export const notNull = <T>(value: T | null | undefined): value is T => Boolean(value)

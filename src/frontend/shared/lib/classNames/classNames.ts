export type Mods = Record<string, string | boolean | undefined>

export function classNames(
  baseClass: string,
  mods: Mods = {},
  additionals: (string| undefined)[] = [],
): string {
  return [
    baseClass,
    ...additionals,
    ...Object.entries(mods)
      .filter(([_, bool]) => !!bool)
      .map(([classNames]) => classNames),
  ].join(' ')
}

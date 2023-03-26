export const findFirstDiffPos = (a: string, b: string) => {
  let i = 0
  if (a === b) return -1
  while (a[i] === b[i]) i++
  return i
}

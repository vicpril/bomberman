function exhaustiveCheck(param: never) {
  console.warn(`Необработанное значение '${param}'`)
}

export default exhaustiveCheck

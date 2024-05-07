const BASE_SYMBOL_WIDTH_PX = 17

const SYMBOLS_MAP_WIDTH_PX = new Map<string, number>()
    .set(' ', 11)
    .set('{', 11)
    .set('}', 11)
    .set('"', 13)
    .set('[', 8)
    .set(']', 8)
    .set('(', 8)
    .set(')', 8)
    .set('|', 6)
    .set(':', 6)
    .set(';', 6)
    .set('.', 6)
    .set(',', 6)
    .set("'", 6)

const coefFor16px = 18.3 / BASE_SYMBOL_WIDTH_PX

const getBaseSymbolWidth = (str?: string | null): number =>
    SYMBOLS_MAP_WIDTH_PX.get(str?.[0] || '') ?? BASE_SYMBOL_WIDTH_PX

export const getSymbolWidth = (str: string) => getBaseSymbolWidth(str) * coefFor16px

const getBaseSymbolsLength = (str: string): number =>
    str.split('').reduce((acc, curr) => acc + getBaseSymbolWidth(curr), 0)

export const getSymbolsLength = (str: string) => getBaseSymbolsLength(str) * coefFor16px

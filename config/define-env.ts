import dotenv from 'dotenv'
import { BuildEnv } from './types'

export function defineEnv(mode: BuildEnv['mode'] = 'development') {
    const postfix = mode === 'development' ? '' : `.${mode}`
    // const postfix = `.production`
    // const postfix = ``

    dotenv.config({
        path: `.env${postfix}`,
    })
}

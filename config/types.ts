import { Configuration } from 'webpack'

export type BuildMode = Configuration['mode']

export interface BuildEnv {
    mode?: BuildMode
    port?: number
    root?: string
    url?: string
    apiUrl?: string
    jsonServerUrl?: string
    socketsUrl?: string
}

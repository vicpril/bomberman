import { Configuration } from 'webpack'

export type BuildMode = Configuration['mode']

export interface BuildEnv {
  mode?: BuildMode,
  port?: number,
  apiUrl?: string,
  root?: string
}

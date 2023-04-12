import { BuildMode } from '../../../types'

export interface BuildPaths {
  entry: string
  output: string
  src: string
  root: string
}

export interface BuildOptions {
  mode: BuildMode,
  paths: BuildPaths,
  isDev: boolean,
  port: number,
  apiUrl: string
}

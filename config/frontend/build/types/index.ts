import { BuildMode } from '../../../types'

export interface BuildPaths {
  entry: string
  output: string
  html: string
  src: string
}

export interface BuildOptions {
  mode: BuildMode,
  paths: BuildPaths,
  isDev: boolean,
  port: number,
  apiUrl: string
}

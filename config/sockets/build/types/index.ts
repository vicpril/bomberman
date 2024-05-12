import { Configuration } from 'webpack'

export type BuildMode = Configuration['mode']

export interface BuildPaths {
  entry: string
  output: string
  src: string
  root: string
  socketsUrl: string
  socketsPath: string
}

export interface BuildOptions {
  mode: BuildMode,
  paths: BuildPaths,
  isDev: boolean,
  port: number,
}

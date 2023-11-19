import { BuildMode } from '../../../types'

export interface BuildPaths {
  entry: string
  output: string
  html: string
  src: string
  public: string
  socketsUrl: string
  apiUrl: string,
  jsonServerUrl: string,
}

export interface BuildOptions {
  mode: BuildMode,
  paths: BuildPaths,
  isDev: boolean,
  port: number,
  project: 'frontend' | 'storybook' | 'tests'
}

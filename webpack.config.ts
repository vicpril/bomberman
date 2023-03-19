import webpack from 'webpack'
import frontendConfig from './config/frontend/webpack.config'
import { BuildEnv } from './config/types'

export default (env: BuildEnv): webpack.Configuration[] => [
  frontendConfig(env),
]

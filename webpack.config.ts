import webpack from 'webpack'
import frontendConfig from './config/frontend/webpack.config'
import { BuildEnv } from './config/types'

// export default (env: BuildEnv): webpack.Configuration[] => [
//   frontendConfig(env),
// ]

// компонентные тесты cypress  не запускаются с конфигурацией из массива
export default (env: BuildEnv): webpack.Configuration => frontendConfig(env)

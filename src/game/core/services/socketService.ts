// import { SOCKETS_API_URL } from 'api/config'
import { io } from 'socket.io-client'
// import { IS_PROD } from '../../../../webpackConfigs/env';

// export const socket = io(__SOCKETS_URL__, {
//   // path: IS_PROD ? '/sockets' : '/socket.io',
//   withCredentials: true,
// })
export const socketConnect = () => io(__SOCKETS_URL__, {
  // path: IS_PROD ? '/sockets' : '/socket.io',
  withCredentials: true,
})

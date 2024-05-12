import { io } from 'socket.io-client'

export const socketConnect = () =>
    io(__SOCKETS_URL__, {
        path: __SOCKETS_PATH__,
        withCredentials: true,
    })

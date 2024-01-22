import React, { ReactNode } from 'react';
import { Socket, io } from 'socket.io-client';

export const SocketContext = React.createContext<Socket | null>(null);

interface Params {
    children: ReactNode;
}

export function SocketProvider({ children }: Params) {
    console.log(import.meta.env.VITE_API_URI, import.meta.env.VITE_SOCKET_PATH);
    const socket: Socket = io(import.meta.env.VITE_API_URI || window.location.origin, {
        timeout: 10001,
        transports: ['websocket'],
        path: import.meta.env.VITE_SOCKET_PATH
    });

    return <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>;
}

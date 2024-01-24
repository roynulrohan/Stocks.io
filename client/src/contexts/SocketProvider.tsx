import React, { ReactNode } from 'react';
import { Socket, io } from 'socket.io-client';

export const SocketContext = React.createContext<Socket | null>(null);

interface Params {
    children: ReactNode;
}

export function SocketProvider({ children }: Params) {
    const socket: Socket = io(import.meta.env.VITE_API_URI || window.location.origin, {
        timeout: 3000,
        transports: ['websocket'],
    });

    return <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>;
}

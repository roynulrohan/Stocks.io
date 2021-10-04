import React, { useContext } from 'react';
import { io } from 'socket.io-client';

const SocketContext = React.createContext(null);

export function useSocket() {
    return useContext(SocketContext);
}

interface Params {
    children: Object;
}

export function SocketProvider({ children }: Params) {
    const socket: any = io('http://localhost:4000', {
        timeout: 10001,
        transports: ['websocket'],
    });

    return <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>;
}

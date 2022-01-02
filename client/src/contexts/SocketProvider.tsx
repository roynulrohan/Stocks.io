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
    console.log(process.env.REACT_APP_API_URI, window.location.origin);
    const socket: any = io(process.env.REACT_APP_API_URI || window.location.origin, {
        timeout: 10001,
        transports: ['websocket'],
    });

    return <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>;
}

import { useContext } from 'react';
import { SocketContext } from './SocketProvider';

export function useSocket() {
    return useContext(SocketContext);
}

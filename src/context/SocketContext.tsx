import React, { createContext } from 'react';
import { Socket } from 'socket.io-client';
import { DefaultEventsMap } from 'socket.io-client/build/typed-events';
import useSocket from '../hooks/useSocket';

// Todo lo que se defina aquí estará disponible en sus hijos


type Props = {
    children: React.ReactNode;
};

export type GlobalContent = {
    online: boolean;
    socket?: Socket<DefaultEventsMap, DefaultEventsMap>
};

export const SocketContext = createContext<GlobalContent>({
    online: false
});

export const SocketProvider = ({ children }: Props) => {

    const { socket, online } = useSocket('http:localhost:8080');

    return (
        <SocketContext.Provider value={ {socket, online} }>
            { children }
        </SocketContext.Provider>
    )
};
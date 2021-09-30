import React, { FC } from 'react'
import HomePage from './pages/HomePage'
import { SocketProvider } from './context/SocketContext'

const BandNamesApp: FC = () => {
    return (
        <SocketProvider>
            <HomePage />
        </SocketProvider>
    )
};

export default BandNamesApp;
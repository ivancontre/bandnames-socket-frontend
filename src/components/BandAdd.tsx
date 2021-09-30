import React, { FC, ReactElement, useContext, useState }  from 'react';
import { SocketContext } from '../context/SocketContext';

const BandAdd: FC = (): ReactElement => {

    const [name, setName] = useState<string>('');

    const { socket } = useContext(SocketContext);

    const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (name.trim().length > 0) {
            socket?.emit('band-add', { name });
            setName('');
        }

    };

    return (
        <>
            <h3>Agregar Banda</h3>

            <form onSubmit={ onSubmit }>
                <input 
                    className="form-control"
                    placeholder="Nombre de banda"
                    value={ name }
                    onChange={ (event) => setName(event.target.value)}
                />    
            </form>   
        </>
    )
}

export default BandAdd;
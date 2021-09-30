import React, { FC, ReactElement, useContext, useEffect, useState }  from 'react';
import { SocketContext } from '../context/SocketContext';

interface IBand {
	id: string;
    name: string;
    votes: number;
};

const BandList: FC = (): ReactElement => {

    const { socket } = useContext(SocketContext);
    const [bands, setBands] = useState<Array<IBand>>([]);

    useEffect(() => {
		socket?.on('band-list', (data) => {
			setBands(data)
		});

        return () => {
            socket?.off('band-list')
        }

	}, [socket]);

    const increaseVotes = (id: string) => {
        socket?.emit('band-vote', { id });
    };

	const removeBand = (id: string) => {
		socket?.emit('band-remove', { id });
	};

    const changeName = (event: React.ChangeEvent<HTMLInputElement>, id: string) => {
        const newName = event.target.value;

        setBands(bands => bands.map(band => {
            if (band.id === id) {
                band.name = newName;
            }

            return band;
        }));

    };

    const onLostFocus = (id: string, name: string) => {
        socket?.emit('band-change-name', { id, name });
    };

    

    const createRows = () => {
        return (
            bands.map((band) => 
                <tr key={ band.id }>
                    <td>
                        <button 
                            className="btn btn-primary" 
                            onClick={() => increaseVotes(band.id)}
                        > 
                            +1 
                        </button>
                    </td>
                    <td>
                        <input 
                            className="form-control" 
                            onChange={(event) => changeName(event, band.id)} 
                            onBlur={() => onLostFocus(band.id, band.name)}
                            value={ band.name } 
                        />
                    </td>
                    <td>
                        <h3>
                            { band.votes }
                        </h3>
                    </td>
                    <td>
                        <button 
                            className="btn btn-danger" 
                            onClick={() => removeBand(band.id)}
                        >
                            Borrar
                        </button>
                    </td>
                </tr>
            )            
        )
    };

    return (
        <>
            <h3>Bandas actuales</h3>

            <table className="table table-stripped">
                <thead>
                    <tr>
                        <th></th>
                        <th>Nombre</th>
                        <th>Votos</th>
                        <th>Borrar</th>
                    </tr>
                </thead>
                <tbody>
                    { createRows() }
                </tbody>
            </table>  
        </>
    )
}

export default BandList;
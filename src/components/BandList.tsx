import React, { FC, ReactElement, useEffect, useState }  from 'react';

interface IBand {
	id: string;
    name: string;
    votes: number;
};

type BandListProps = {
    data: IBand[];
    vote: Function;
    remove: Function;
    changeNameBand: Function;
};

const BandList: FC<BandListProps> = ({ data, vote, remove, changeNameBand }): ReactElement => {

    const [bands, setBands] = useState<Array<IBand>>(data);

    useEffect(() => {
        setBands(data);
    }, [data]);


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
        console.log(id, name);
        changeNameBand(id, name);
    };

    

    const createRows = () => {
        return (
            bands.map((band) => 
                <tr key={ band.id }>
                    <td>
                        <button className="btn btn-primary" onClick={() => vote(band.id)}> +1 </button>
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
                        <button className="btn btn-danger" onClick={() => remove(band.id)}>Borrar</button>
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
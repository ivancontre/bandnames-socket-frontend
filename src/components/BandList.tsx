import React, { FC, ReactElement, useEffect, useState }  from 'react';

interface IBand {
	id: string;
    name: string;
    votes: number;
};

type BandListProps = {
    data: IBand[]
};

const BandList: FC<BandListProps> = ({ data }): ReactElement => {


    const [bands, setBands] = useState<Array<IBand>>(data);

    useEffect(() => {
        setBands(data);
    }, [data]);

    const createRows = () => {
        return (
            bands.map((band) => 
                <tr key={ band.id }>
                    <td>
                        <button className="btn btn-primary"> +1 </button>
                    </td>
                    <td>
                        <input className="form-control" value={ band.name } />
                    </td>
                    <td>
                        <h3>
                            { band.votes }
                        </h3>
                    </td>
                    <td>
                        <button className="btn btn-danger">Borrar</button>
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
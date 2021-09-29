import React, { FC, ReactElement }  from 'react';

const BandAdd: FC = (): ReactElement => {
    return (
        <>
            <h3>Agregar Banda</h3>

            <form>
                <input 
                    className="form-control"
                    placeholder="Nombre de banda"
                />    
            </form>   
        </>
    )
}

export default BandAdd;
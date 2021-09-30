import React, { FC, ReactElement, useState }  from 'react';

type BandProps = {
    addBand: Function;
};


const BandAdd: FC<BandProps> = ({ addBand }): ReactElement => {

    const [name, setName] = useState<string>('');


    const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (name.trim().length > 0) {
            addBand(name);
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
import React, { FC, ReactElement, useEffect, useState }  from 'react';
import io, { Socket }from 'socket.io-client';
import { DefaultEventsMap } from 'socket.io-client/build/typed-events';

import BandAdd from './components/BandAdd';
import BandList from './components/BandList';


const connectSocketServer = () => {
	const socket = io('http://localhost:8080', {
		transports: ['websocket']
	}).connect();
	
	return socket;
};

interface IBand {
	id: string;
    name: string;
    votes: number;
};
  

const App: FC = (): ReactElement => {


	const [socket] = useState<Socket<DefaultEventsMap, DefaultEventsMap>>(connectSocketServer());
	const [online, setOnline] = useState<boolean>(false);
	const [bands, setBands] = useState<Array<IBand>>([]);

	useEffect(() => {
		setOnline(socket.connected);
	}, [socket]);


	useEffect(() => {

		socket.on('connect', () => {
			setOnline(true);
		});
		
	}, [socket]);

	useEffect(() => {

		socket.on('disconnect', () => {
			setOnline(false);
		});

	}, [socket]);

	useEffect(() => {
		socket.on('band-list', (data) => {
			setBands(data)
		});

	}, [socket]);

	const increaseVotes = (id: string) => {
        socket.emit('band-vote', { id });
    };

	const removeBand = (id: string) => {
		socket.emit('band-remove', { id });
	};

	const changeNameBand = (id: string, name: string) => {
		socket.emit('band-change-name', { id, name });
	};

	const addBand = (name: string) => {
		socket.emit('band-add', { name });
	};

  	return (
    	<div className="container">
			<div className="alert">
				<p>
					Service status:
					{
						online 
							? <span className="text-success"> Online</span>
							: <span className="text-danger"> Offline</span>
					}					
					
				</p>
			</div>

			<h1>BandNames</h1>
			<hr />

			<div className="row">
				<div className="col-8">
					<BandList data={bands} vote={ increaseVotes } remove={ removeBand } changeNameBand={ changeNameBand } />
				</div>
			</div>

			<div className="row">
				<div className="col-8">
					<BandAdd addBand={ addBand } />
				</div>
			</div>
    	</div>
  	);
};

export default App;
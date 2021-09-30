import React, { FC, useContext, useEffect } from 'react';
import {Chart, registerables} from 'chart.js'
import { SocketContext } from '../context/SocketContext';
Chart.register(...registerables)

interface IBand {
	id: string;
    name: string;
    votes: number;
};

const BandChart: FC = () => {
    let myChart: Chart<"bar", number[], string>;

    const { socket } = useContext(SocketContext);

    useEffect(() => {
		socket?.on('band-list', (data) => {
			createChart(data);
		});

        return () => {
            socket?.off('band-list');
        }

	}, [socket]);
   
    const createChart = (bands: IBand[]) => {

        const ctx = (document.getElementById('myChart') as HTMLCanvasElement).getContext('2d');

        myChart && myChart.destroy();

        myChart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: bands.map(band => band.name),
                datasets: [{
                    label: '# of Votes',
                    data: bands.map(band => band.votes),
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(255, 206, 86, 0.2)',
                        'rgba(75, 192, 192, 0.2)',
                        'rgba(153, 102, 255, 0.2)',
                        'rgba(255, 159, 64, 0.2)'
                    ],
                    borderColor: [
                        'rgba(255, 99, 132, 1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(75, 192, 192, 1)',
                        'rgba(153, 102, 255, 1)',
                        'rgba(255, 159, 64, 1)'
                    ],
                    borderWidth: 1
                }]
            },
            options: {
                indexAxis: 'y',
                animation: false,
                scales: {
                    x: {
                        stacked: true
                    }
                }
            }
        });
    }
    return (
        <canvas id="myChart" height="50"></canvas>
    )
};

export default BandChart;
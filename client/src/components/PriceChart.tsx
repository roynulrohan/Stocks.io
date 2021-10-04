import React, { useEffect } from 'react';
import { Chart, registerables } from 'chart.js';
import { useSocket } from '../contexts/SocketProvider';

const PriceChart = (props: any) => {
    const { id, legendDisplay, xDisplay, yDisplay, ticker, currPrice, styleSet } = props;
    Chart.register(...registerables);
    const socket: any = useSocket();

    useEffect(() => {
        let mounted = true;

        const skipped = (ctx: any, value: any) => (ctx.p0.skip || ctx.p1.skip ? value : undefined);
        const down = (ctx: any, value: any) => (ctx.p0.parsed.y > ctx.p1.parsed.y ? value : undefined);

        const ctx = document.getElementById(id);
        const data = {
            labels: [currPrice?.toFixed(2) || 0],
            datasets: [
                {
                    data: [0],
                    label: 'Price',
                    backgroundColor: '#10B981',
                    borderColor: '#10B981',
                    segment: {
                        borderColor: (ctx: any) => skipped(ctx, 'rgb(0,0,0,0.2)') || down(ctx, 'rgb(192,75,75)'),
                        borderDash: (ctx: any) => skipped(ctx, [6, 6]),
                    },
                },
            ],
        };

        if (data.datasets[0].data.length === 1) {
            for (let i = 0; i < 5; i++) {
                data.labels.push(new Date().getTime());
                data.datasets[0].data.push(Math.random() * (200 - 1) + 1).toFixed(2);
            }
        }

        const optionsSet: any = {
            fill: false,
            interaction: {
                intersect: false,
            },
            radius: 0,
            animation: true,
            plugins: {
                legend: {
                    display: legendDisplay,
                },
            },
            responsive: true,
            scales: {
                x: {
                    display: xDisplay,
                },
                y: {
                    display: yDisplay,
                },
            },
        };

        const chartDrawn = new Chart(ctx, {
            type: 'line',
            data: data,
            options: optionsSet,
        });

        socket.on(ticker, (msg: any) => {
            if (mounted) {
                let length = data.labels.length;
                if (length > 6) {
                    data.datasets[0].data.shift();
                    data.labels.shift();
                }

                data.labels.push(new Date().getTime());
                data.datasets[0].data.push(parseFloat(msg)).toFixed(2);
                chartDrawn.update();
            }
        });

        return () => {
            mounted = false;
            chartDrawn.destroy();

            socket && socket?.off(ticker);
        };
    }, [id, legendDisplay, xDisplay, yDisplay, socket, ticker, currPrice]);

    return (
        <div className={styleSet}>
            <canvas id={id}></canvas>
        </div>
    );
};

export default PriceChart;

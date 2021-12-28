import React, { useEffect } from 'react';
import { Chart, registerables } from 'chart.js';
import { useSocket } from '../contexts/SocketProvider';
import { StockUpdate } from '../types';
import { motion } from 'framer-motion';

const PriceChart = React.memo((props: any) => {
    const { id, legendDisplay, xDisplay, yDisplay, ticker, initialPrice, styleSet } = props;
    Chart.register(...registerables);
    const socket: any = useSocket();

    useEffect(() => {
        let mounted = true;

        const skipped = (ctx: any, value: any) => (ctx.p0.skip || ctx.p1.skip ? value : undefined);
        const down = (ctx: any, value: any) => (ctx.p0.parsed.y > ctx.p1.parsed.y ? value : undefined);

        const ctx = document.getElementById(id);

        const sessionData: any = JSON.parse(window.sessionStorage.getItem(ticker) || '{}');

        const data = {
            labels: sessionData?.labels ? [...sessionData?.labels, new Date().toLocaleTimeString()] : [new Date().toLocaleTimeString()],
            datasets: [
                {
                    data: sessionData?.data ? [...sessionData?.data, initialPrice] : [parseFloat(initialPrice)],
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
            for (let i = 1; i < 25; i++) {
                data.labels.unshift(new Date().toLocaleTimeString());
                data.datasets[0].data.unshift(
                    parseFloat(
                        (
                            Math.random() * (initialPrice + initialPrice * 0.05 - (initialPrice + initialPrice * -0.05)) +
                            (initialPrice + initialPrice * -0.05)
                        ).toFixed(2)
                    )
                );
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
                    ticks: {
                        // For a category axis, the val is the index so the lookup via getLabelForValue is needed
                        callback: function (val: string, index: number): any {
                            // Hide every 2nd tick label
                            return index % 2 === 0 ? this.getLabelForValue(val) : '';
                        },
                        getLabelForValue: (val: string) => {},
                    },
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

        socket.on(ticker, (priceData: StockUpdate) => {
            if (mounted) {
                data.labels.push(new Date().toLocaleTimeString());
                data.datasets[0].data.push(priceData.price).toFixed(2);

                let length = data.datasets[0].data.length;

                if (length > 25) {
                    // data.datasets[0].data.shift();
                    // data.labels.shift();

                    data.datasets[0].data = data.datasets[0].data.slice(-25);
                    data.labels = data.labels.slice(-25);
                }
                chartDrawn.update();

                window.sessionStorage.setItem(ticker, JSON.stringify({ data: data.datasets[0].data || [], labels: data.labels || [] }));
            }
        });

        return () => {
            mounted = false;
            chartDrawn.destroy();

            socket && socket?.off(ticker);

            window.sessionStorage.setItem(ticker, JSON.stringify({ data: data.datasets[0].data || [], labels: data.labels || [] }));
        };
    }, [id, legendDisplay, xDisplay, yDisplay, socket, ticker, initialPrice]);

    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.5, delay: 0.25 }} className={styleSet}>
            <canvas id={id}></canvas>
        </motion.div>
    );
});

export default PriceChart;

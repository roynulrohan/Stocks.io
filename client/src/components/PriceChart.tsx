import React, { useEffect, useRef } from 'react';
import { Chart, registerables } from 'chart.js';
import { motion } from 'framer-motion';

const PriceChart = React.memo((props: any) => {
    const { id, legendDisplay, xDisplay, yDisplay, ticker, initialPrice, currentPrice, styleSet } = props;
    Chart.register(...registerables);
    const isMounted = useRef(false);
    const data = useRef<any>({});
    const chartDrawn = useRef<any>({});

    useEffect(() => {
        isMounted.current = true;

        const skipped = (ctx: any, value: any) => (ctx.p0.skip || ctx.p1.skip ? value : undefined);
        const down = (ctx: any, value: any) => (ctx.p0.parsed.y > ctx.p1.parsed.y ? value : undefined);

        const ctx = document.getElementById(id);

        const sessionData: any = JSON.parse(window.sessionStorage.getItem(ticker) || '{}');

        data.current = {
            labels: sessionData?.labels ? sessionData?.labels: [new Date().toLocaleTimeString()],
            datasets: [
                {
                    data: sessionData?.data ? sessionData?.data : [parseFloat(initialPrice)],
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

        if (data.current.datasets[0].data.length === 1) {
            for (let i = 1; i < 25; i++) {
                data.current.labels.unshift(new Date().toLocaleTimeString());
                data.current.datasets[0].data.unshift(
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
                        getLabelForValue: (val: string) => {
                            val
                        },
                    },
                },
                y: {
                    display: yDisplay,
                },
            },
        };

        // @ts-ignore
        chartDrawn.current = new Chart(ctx, {
            type: 'line',
            data: data.current,
            options: optionsSet,
        });

        return () => {
            isMounted.current = false;
            chartDrawn.current.destroy();

            window.sessionStorage.setItem(ticker, JSON.stringify({ data: data.current.datasets[0].data || [], labels: data.current.labels || [] }));
        };
    }, [id, legendDisplay, xDisplay, yDisplay, ticker]);

    useEffect(() => {
        if (isMounted.current && data.current && chartDrawn.current && currentPrice !== -1) {
            data.current.labels.push(new Date().toLocaleTimeString());
            data.current.datasets[0].data.push(currentPrice).toFixed(2);
            let length = data.current.datasets[0].data.length;
            if (length > 25) {
                // data.datasets[0].data.shift();
                // data.labels.shift();
                data.current.datasets[0].data = data.current.datasets[0].data.slice(-25);
                data.current.labels = data.current.labels.slice(-25);
            }
            chartDrawn.current.update();
            window.sessionStorage.setItem(ticker, JSON.stringify({ data: data.current.datasets[0].data || [], labels: data.current.labels || [] }));
        }
    }, [currentPrice]);

    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.5, delay: 0.25 }} className={styleSet}>
            <canvas id={id} className='!w-full !h-full'></canvas>
        </motion.div>
    );
});

export default PriceChart;

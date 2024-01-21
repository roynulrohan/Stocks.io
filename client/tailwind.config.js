/** @type {import('tailwindcss').Config} */
export default {
    darkMode: 'class',
    content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
    theme: {
        extend: {
            colors: {
                darkField: '#1B1A21',
                darkCard: '#292C38',
                darkBg: '#24252D',
            },
            minHeight: {
                64: '16rem',
                panel: '35rem',
            },
            minWidth: {
                44: '11rem',
                panel: '35rem',
            },
            height: {
                panel: '35rem',
            },
            width: {
                panel: '35rem',
            },
        },
    },
    plugins: [],
};

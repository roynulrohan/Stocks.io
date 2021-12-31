module.exports = {
    purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
    darkMode: 'class', // or 'media' or 'class'
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
    variants: {
        extend: {},
    },
    plugins: [],
};
